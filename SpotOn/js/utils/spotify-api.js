/**
 * Spotify API Manager - Handles Spotify Web Player interaction and control.
 * 
 * This module manages:
 * - Track information retrieval
 * - Tab management
 * - Real-time updates
 * 
 * The API manager works by:
 * 1. Finding and monitoring Spotify tabs
 * 2. Setting up media controls
 * 3. Polling for track information
 * 4. Handling playback commands
 * 5. Managing state updates
 * 
 * @class SpotifyAPI
 * @property {Object|null} spotifyTab - Active Spotify tab information
 * @property {Object|null} currentTrack - Current playing track information
 * @property {boolean} isPlaying - Current playback state
 * @property {number|null} pollingInterval - Interval ID for track updates
 * 
 */

export class SpotifyAPI {
    constructor() {
        this.spotifyTab = null;
        this.currentTrack = null;
        this.isPlaying = false;
        this.pollingInterval = null;
        this.initialize();
    }

    async initialize() {
        await this.findSpotifyTab();
        this.startPolling();
    }

    async findSpotifyTab() {
        const tabs = await chrome.tabs.query({ url: 'https://open.spotify.com/*' });
        this.spotifyTab = tabs[0];
        if (this.spotifyTab) {
            // Do an immediate fetch when we find the tab
            await this.fetchTrackInfo();
        }
    }

    startPolling() {
        // Clear any existing interval
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
        }

        // Start with a faster initial poll
        this.pollingInterval = setInterval(() => this.fetchTrackInfo(), 500);
    }

    async fetchTrackInfo() {
        if (!this.spotifyTab) {
            // console.log('No Spotify tab found, attempting to find one...');
            await this.findSpotifyTab();
            return;
        }

        try {
            const [result] = await chrome.scripting.executeScript({
                target: { tabId: this.spotifyTab.id },
                func: () => {
                    // console.log('Starting track info fetch...');

                    // Primary selectors for track info
                    const titleElement = document.querySelector("a[data-testid=context-item-link]");
                    const artistElement = document.querySelector("a[data-testid=context-item-info-artist]");
                    const pauseButton = document.querySelector("[data-testid=control-button-pause]");

                    // Fallback selectors if primary ones fail
                    const fallbackTitleElement = document.querySelector("div[data-testid=now-playing-widget] a");
                    const fallbackArtistElement = document.querySelector("div[data-testid=now-playing-widget] span");

                    // Get all album art images and find the highest quality one
                    const albumArtElements = Array.from(document.querySelectorAll("img[data-testid=cover-art-image]"));

                    let highestQualityArt = null;
                    
                    if (albumArtElements.length > 0) {
                        // Sort by image dimensions (higher quality = larger dimensions)
                        highestQualityArt = albumArtElements.sort((a, b) => {
                            const aPixels = a.naturalWidth * a.naturalHeight;
                            const bPixels = b.naturalWidth * b.naturalHeight;
                            return bPixels - aPixels;
                        })[0];
                    } else {
                        console.warn('No album art elements found, checking alternative selectors...');
                        // Try alternative selectors
                        const altAlbumArtElements = Array.from(document.querySelectorAll('img[alt=""]'));
                        
                        if (altAlbumArtElements.length > 0) {
                            highestQualityArt = altAlbumArtElements
                                .filter(img => img.src.includes('scdn.co/image'))
                                .sort((a, b) => {
                                    const aPixels = a.naturalWidth * a.naturalHeight;
                                    const bPixels = b.naturalWidth * b.naturalHeight;
                                    return bPixels - aPixels;
                                })[0];
                        }
                    }

                    // Use primary selectors with fallbacks
                    const title = titleElement?.textContent?.trim() || fallbackTitleElement?.textContent?.trim() || 'Unknown Title';
                    const artist = artistElement?.textContent?.trim() || fallbackArtistElement?.textContent?.trim() || 'Unknown Artist';
                    const albumArt = highestQualityArt?.src || '';

                    if (!title || !artist) {
                        console.log('Missing required track info, returning null');
                        return null;
                    }

                    return {
                        title,
                        artist,
                        albumArt,
                        isPlaying: !!pauseButton
                    };
                }
            });

            if (result && result.result) {
                const track = result.result;
                if (JSON.stringify(track) !== JSON.stringify(this.currentTrack)) {
                    this.currentTrack = track;
                    this.notifyTrackChange();
                }
            }
        } catch (error) {
            console.error('Error fetching track info:', error);
            // Try to recover by finding the tab again
            this.spotifyTab = null;
            await this.findSpotifyTab();
        }
    }

    notifyTrackChange() {
        chrome.runtime.sendMessage({
            type: 'SPOTIFY_UPDATE',
            data: this.currentTrack
        });
    }

    async getNowPlaying() {
        return this.currentTrack;
    }
} 