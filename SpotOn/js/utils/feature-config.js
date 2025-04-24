/**
 * Feature Configuration - Defines available features and their organization.
 * 
 * This module provides:
 * - Feature categorization
 * - UI organization
 * - Feature metadata
 * - Default states
 * 
 * The configuration is organized into sections:
 * 1. Main features (core functionality)
 * 2. Visual features (UI customization)
 * 3. Hide features (element visibility control)
 * 
 * @module FeatureConfig
 * @property {Object} main - Main feature configuration
 * @property {Object} visual - Visual feature configuration
 * @property {Object} hide - Hide feature configuration
 * 
 */

export const featureConfig = {
    main: {
        title: 'Main',
        features: [
            { id: 'spoton', label: 'SpotOn Theme' },
            { id: 'righter', label: 'Righter' },
            { id: 'font', label: 'Custom Font' },
            { id: 'fontLsize', label: 'Large Font' },
        ]
    },
    visual: {
        title: 'Visual',
        features: [
            { id: 'shadow', label: 'Shadow Effects' },
            { id: 'roundAlbumArt', label: 'Round Album Art' },
            { id: 'spinAlbum', label: 'Spin Album' },
            { id: 'thickerPB', label: 'Thicker Progress Bar' },
            { id: 'rainbowProgressbar', label: 'Rainbow Progress Bar' },
            { id: 'rainbowControls', label: 'Rainbow Controls' },
            { id: 'reducedTransparency', label: 'Reduced Transparency' },
            { id: 'lyricsColor', label: 'Enable auto color shifting for lyrics' },
            { id: 'disableHi', label: 'Disable highlight' }
        ]
    },
    hide: {
        title: 'Hide',
        sections: [
            {
                title: 'Interface Elements',
                features: [
                    { id: 'hideMusixmatch', label: 'Hide Musixmatch' },
                    { id: 'hideMusicVids', label: 'Hide Music Videos' },
                    { id: 'hideMerch', label: 'Hide Merch' },
                    { id: 'hidePremButton', label: 'Hide Premium Button' },
                    { id: 'removeScroll', label: 'Remove scrollbars' },
                    { id: 'hometopsel', label: 'Remove top home selector' },
                    { id: 'footernomore', label: 'Remove footer' },
                    { id: 'byeappthing', label: 'Remove Install button' }
                ]
            },
            {
                title: 'Content',
                features: [
                    { id: 'hidePodcasts', label: 'Hide Podcasts' },
                    { id: 'hideNewStuff', label: 'Hide New Stuff' },
                    { id: 'hideOnTour', label: 'Hide On Tour' },
                    { id: 'hideAppearsOn', label: 'Hide Appears On' },
                    { id: 'hideFansLiked', label: 'Hide Fans Also Like' },
                    { id: 'hideFeatArtist', label: 'Hide Featured Artists' },
                    { id: 'hideSpotifyOffers', label: 'Remove Spotify offers' },
                    { id: 'removeLikedCover', label: 'Remove Liked Songs Cover Art' },
                    { id: 'youwontlike', label: 'Remove "You May Also Like"' },
                    { id: 'removeMoreLike', label: 'Remove "More Of What You Like"' },
                    { id: 'removeDiscoveron', label: 'Remove Discover On box' }
                ]
            },
            {
                title: 'Player Elements',
                features: [
                    { id: 'hideNPB', label: 'Hide Now Playing Bar' },
                    { id: 'hideNPV', label: 'Hide Now Playing View' },
                    { id: 'hideVolBar', label: 'Hide Volume Bar' },
                    { id: 'hidePiP', label: 'Hide PiP' },
                    { id: 'scrollNPB', label: 'Make NPB hide below player' },
                    { id: 'hiddenNPVqueue', label: 'Remove queue in Now Playing View' },
                    { id: 'hiddenNPVtour', label: 'Remove on tour in Now Playing View' },
                    { id: 'hiddenNPVartist', label: 'Remove about this artist in Now Playing View' },
                    { id: 'hiddenNPVcredits', label: 'Remove credits section in Now Playing View' }
                ]
            },
            {
                title: 'Song Info',
                features: [
                    { id: 'hiddenPDura', label: 'Hide duration of a song' },
                    { id: 'hiddenPHeart', label: 'Hide heart icon' },
                    { id: 'hiddenPInfo', label: 'Hide playlist info' },
                    { id: 'hiddenSPL', label: 'Hide Song\'s Album/Playlist' },
                    { id: 'hiddenSAlbum', label: 'Hide songs album' },
                    { id: 'hiddenSDate', label: 'Hide Song\'s Date' },
                    { id: 'hiddenSInfo', label: 'Remove top info header' },
                    { id: 'hiddenSTime', label: 'Hide Date Added' }
                ]
            }
        ]
    }
}; 