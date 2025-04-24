/**
 * ContentManager - A class that manages the Spotify web player customization and theme features.
 * 
 * This class handles:
 * - Theme customization (spoton, righter, font, etc.)
 * - UI toggles (shadows, album art effects, progress bars, etc.)
 * - Element visibility control (hiding various Spotify UI elements)
 * - Dynamic background based on album art
 * - Feature state persistence using Chrome storage
 * - Real-time UI updates through mutation observers
 * 
 * The manager works by:
 * 1. Loading saved settings from Chrome storage
 * 2. Creating and managing CSS style nodes for each feature
 * 3. Observing DOM changes to apply features dynamically
 * 4. Handling background image updates based on current track
 * 5. Managing feature toggles and their persistence
 * 
 * @class ContentManager
 * @property {Object} state - Map of feature names to their enabled states
 * @property {Object} featureToCSS - Mapping of feature names to their CSS file names
 * @property {Map} styleNodes - Active style nodes for each feature
 * @property {boolean} themeLock - Whether theme changes are locked
 * @property {string|null} savedBackgroundImage - Cached background image URL
 * @property {boolean} initialized - Whether the manager has been initialized
 * @property {MutationObserver|null} coverArtObserver - Observer for album art changes
 * @property {boolean} coverArtObserverObserving - Whether the observer is active
 */

class ContentManager {
    constructor() {
        this.state = {
            features: {
                // Theme features
                spoton: true,
                righter: true,
                font: true,

                // UI toggles
                shadow: false,
                roundAlbumArt: false,
                spinAlbum: false,
                thickerPB: false,
                rainbowProgressbar: false,
                rainbowControls: false,
                reducedTransparency: false,

                // Hide elements
                hideMusixmatch: false,
                hideMusicVids: false,
                hideMerch: false,
                hidePremButton: false,
                hidePodcasts: false,
                hideNewStuff: false,
                hideOnTour: false,
                hidePiP: false,
                hideScroll: false,
                hideVolBar: false,
                hideAlbumArt: false,
                hideAppearsOn: false,
                hideFansLiked: false,
                hideFeatArtist: false,
                hideNPB: false,
                hideNPV: false,
                hideSDura: false,
                hideSHeart: false,
                hideCB: false,
                hideSpotifyOffers: false,
                hideArtistPick: false,
                hideDevicePicker: false,
                hideLyricsButton: false,
                hidePIcon: false,
                hideHi: false,
                hideAbout: false
            },
            themeLock: false,
            savedBackgroundImage: null,
            initialized: false,
            lastSettingsSave: 0,
            settingsSaveQueue: new Set(),
            settingsSaveRetryCount: 0
        };

        this.featureToCSS = {
            // Theme features
            spoton: 'spoton.css',
            righter: 'righter.css',
            font: 'fontMain.css',
            fontLsize: 'fontLsize.css',

            // UI toggles
            shadow: 'shadow.css',
            roundAlbumArt: 'roundAlbumArt.css',
            spinAlbum: 'spinAlbum.css',
            thickerPB: 'thickerPB.css',
            rainbowProgressbar: 'rainbowProgressbar.css',
            rainbowControls: 'rainbowControls.css',
            reducedTransparency: 'reducedTransparency.css',
            lyricsColor: 'lyricsColor.css',
            disableHi: 'disableHi.css',

            // Hide/remove elements
            hideMusixmatch: 'removemusixmatch.css',
            hideMusicVids: 'removeMusicVids.css',
            hideMerch: 'removeMerch.css',
            hidePremButton: 'removeprembutton.css',
            hidePodcasts: 'removePodcasts.css',
            hideNewStuff: 'removeNewStuff.css',
            hideOnTour: 'removeOnTour.css',
            hidePiP: 'removePiP.css',
            hideScroll: 'removeScroll.css',
            hideVolBar: 'removeVolBar.css',
            hideAlbumArt: 'removeAlbumArt.css',
            hideAppearsOn: 'removeAppearsOn.css',
            hideFansLiked: 'removeFansLiked.css',
            hideFeatArtist: 'removeFeatArtist.css',
            hideNPB: 'removeNPB.css',
            hideNPV: 'removeNPV.css',
            hideCB: 'hideCB.css',
            hideSpotifyOffers: 'hideSpotifyOffers.css',
            hideArtistPick: 'hiddenArtistPick.css',
            hideDevicePicker: 'hiddenDevicePicker.css',
            hideLyricsButton: 'hiddenLyricsButton.css',
            hidePIcon: 'hiddenPIcon.css',
            hideHi: 'disableHi.css',
            hideAbout: 'hiddenAbout.css',
            hometopsel: 'hometopsel.css',
            footernomore: 'footernomore.css',
            byeappthing: 'byeappthing.css',
            removeLikedCover: 'removeLikedCover.css',
            youwontlike: 'youwontlike.css',
            removeMoreLike: 'removeMoreLike.css',
            removeDiscoveron: 'removeDiscovergraphy.css',
            hiddenPDura: 'hiddenPDura.css',
            hiddenPHeart: 'hiddenPHeart.css',
            hiddenPInfo: 'hiddenPInfo.css',
            hiddenSPL: 'hiddenSPL.css',
            hiddenSAlbum: 'hiddenSAlbum.css',
            hiddenSDate: 'hiddenSDate.css',
            hiddenSInfo: 'hiddenSInfo.css',
            hiddenSTime: 'hiddenSTime.css',
            scrollNPB: 'scrollNPB.css',
            hiddenNPVqueue: 'hiddenNPVqueue.css',
            hiddenNPVtour: 'hiddenNPVtour.css',
            hiddenNPVartist: 'hiddenNPVartist.css',
            hiddenNPVcredits: 'hiddenNPVcredits.css',
        };

        this.styleNodes = new Map();
        this.coverArtObserver = null;
        this.coverArtObserverObserving = false;
        this.settingsSaveTimeout = null;
        this.MAX_RETRIES = 3;
        this.MIN_SAVE_INTERVAL = 5000;

        this.initialize();
    }

    async initialize() {
        await this.loadSettings();
        this.createStyleNode();
        this.setupMutationObserver();
        this.setupMessageListener();

        if (!this.state.initialized) {
            this.applyAllFeatures();
            this.state.initialized = true;
        }

        this.initializeAlbumArtObserver();
    }

    initializeAlbumArtObserver() {
        const coverArtImage = document.querySelector("[data-testid=cover-art-image]");
        if (!coverArtImage) {
            requestAnimationFrame(() => this.initializeAlbumArtObserver());
            return;
        }

        const backgroundSheet = document.getElementById("background") || this.createBackgroundSheet();
        this.updateBackgroundImage(backgroundSheet, coverArtImage.src);
        this.manageObserver(coverArtImage, backgroundSheet);
    }

    manageObserver(coverArtImage, backgroundSheet) {
        if (!this.coverArtObserver) {
            this.coverArtObserver = new MutationObserver(changes => {
                for (const change of changes) {
                    if (change.attributeName === "src") {
                        this.updateBackgroundImage(backgroundSheet, coverArtImage.src);
                        break;
                    }
                }
            });
        }

        const shouldObserve = !this.state.themeLock && !this.coverArtObserverObserving;
        const shouldDisconnect = this.state.themeLock && this.coverArtObserverObserving;

        if (shouldObserve) {
            this.coverArtObserver.observe(coverArtImage, { attributes: true, attributeFilter: ['src'] });
            this.coverArtObserverObserving = true;
        } else if (shouldDisconnect) {
            this.coverArtObserver.disconnect();
            this.coverArtObserverObserving = false;
        }
    }

    setupMutationObserver() {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType === 1) {
                        const coverArt = node.querySelector('[data-testid="CoverSlotCollapsed__container"] img');
                        if (coverArt) this.manageCoverArt(coverArt);
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            switch (message.type) {
                case 'TOGGLE_FEATURE':
                    this.toggleFeature(message.feature, message.enabled);
                    sendResponse({ success: true });
                    break;
                case 'GET_FEATURES':
                    sendResponse({ features: this.state.features });
                    break;
                case 'TOGGLE_THEME_LOCK':
                    this.state.themeLock = message.locked;
                    if (this.state.themeLock && this.state.savedBackgroundImage) {
                        this.restoreSavedBackground();
                    } else if (!this.state.themeLock) {
                        this.initializeAlbumArtObserver();
                    }
                    sendResponse({ success: true });
                    break;
            }
            return true;
        });
    }

    async loadSettings() {
        try {
            const settings = await chrome.storage.sync.get('features');
            if (settings.features) {
                this.state.features = { ...this.state.features, ...settings.features };
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    async saveSettings() {
        try {
            await chrome.storage.sync.set({ features: this.state.features });
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    }

    applyAllFeatures() {
        this.styleNodes.forEach((style, feature) => {
            style.remove();
            this.styleNodes.delete(feature);
        });

        Object.entries(this.state.features).forEach(([feature, enabled]) => {
            if (enabled) {
                const normalizedFeature = feature === 'removeScroll' ? 'hideScroll' : feature;
                this.applyFeature(normalizedFeature);
            }
        });
    }

    async toggleFeature(feature, enabled) {
        if (this.state.features[feature] === enabled) return;

        this.state.features[feature] = enabled;
        this.state.settingsSaveQueue.add(feature);
        await this.saveSettingsWithRateLimit();

        if (enabled) {
            await this.applyFeature(feature);
        } else {
            this.removeFeature(feature);
        }
    }

    async saveSettingsWithRateLimit() {
        const now = Date.now();

        if (this.settingsSaveTimeout) {
            clearTimeout(this.settingsSaveTimeout);
        }

        if (now - this.state.lastSettingsSave < this.MIN_SAVE_INTERVAL) {
            this.settingsSaveTimeout = setTimeout(() => this.saveSettingsWithRateLimit(), this.MIN_SAVE_INTERVAL);
            return;
        }

        try {
            const featuresToSave = Array.from(this.state.settingsSaveQueue);
            this.state.settingsSaveQueue.clear();

            if (featuresToSave.length > 0) {
                await chrome.storage.sync.set({ features: this.state.features });
                this.state.lastSettingsSave = Date.now();
                this.state.settingsSaveRetryCount = 0;
            }
        } catch (error) {
            console.error('Error saving settings:', error);

            if (error.message.includes('MAX_WRITE_OPERATIONS_PER_MINUTE') &&
                this.state.settingsSaveRetryCount < this.MAX_RETRIES) {
                this.state.settingsSaveRetryCount++;
                const retryDelay = Math.min(60000 * this.state.settingsSaveRetryCount, 300000);
                this.settingsSaveTimeout = setTimeout(() => this.saveSettingsWithRateLimit(), retryDelay);
            }
        }
    }

    async applyFeature(feature) {
        const styleId = `spoton-${feature}-style`;
        if (document.getElementById(styleId)) return;

        try {
            const cssFileName = this.featureToCSS[feature];
            if (!cssFileName) {
                console.warn(`No CSS file mapping found for feature: ${feature}`);
                return;
            }

            const cssUrl = chrome.runtime.getURL(`css/${cssFileName}`);
            const response = await fetch(cssUrl);

            if (!response.ok) {
                console.warn(`CSS file not found or error loading: ${cssFileName}`);
                return;
            }

            const css = await response.text();
            if (!css) {
                console.warn(`Empty CSS content for: ${cssFileName}`);
                return;
            }

            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = css;
            document.head.appendChild(style);

            this.styleNodes.set(feature, style);
        } catch (error) {
            console.error(`Error loading CSS for ${feature}:`, error);
        }
    }

    removeFeature(feature) {
        const styleId = `spoton-${feature}-style`;
        const style = document.getElementById(styleId);
        if (style) {
            style.remove();
            this.styleNodes.delete(feature);
        }
    }

    createStyleNode() {
        if (!document.getElementById('spoton-theme-style')) {
            const style = document.createElement('style');
            style.id = 'spoton-theme-style';
            document.head.appendChild(style);
        }
    }

    manageCoverArt(coverArt) {
        if (!coverArt) return;

        coverArt.addEventListener('load', () => {
            if (!this.state.themeLock) {
                this.updateBackgroundImage(this.createBackgroundSheet(), coverArt.src);
            }
        });
    }

    createBackgroundSheet() {
        const backgroundSheet = document.createElement("style");
        backgroundSheet.id = "background";
        document.head.appendChild(backgroundSheet);
        return backgroundSheet;
    }

    updateBackgroundImage(sheet, imageUrl) {
        if (!this.state.themeLock) {
            this.state.savedBackgroundImage = imageUrl;
            sheet.textContent = `:root { --backimg: url(${imageUrl}); }`;
        }
    }

    restoreSavedBackground() {
        const backgroundSheet = document.getElementById("background");
        if (backgroundSheet && this.state.savedBackgroundImage) {
            this.updateBackgroundImage(backgroundSheet, this.state.savedBackgroundImage);
        }
    }

    getAlbumArtBackground() {
        const coverArtImage = document.querySelector("[data-testid=cover-art-image]");
        return coverArtImage ? coverArtImage.src : null;
    }

    disableAlbumArtBackground() {
        const backgroundSheet = document.getElementById("background");
        if (backgroundSheet) {
            backgroundSheet.remove();
        }
        if (this.coverArtObserver) {
            this.coverArtObserver.disconnect();
            this.coverArtObserverObserving = false;
        }
        this.state.savedBackgroundImage = null;
    }
}

// Initialize the content manager immediately
const contentManager = new ContentManager(); 