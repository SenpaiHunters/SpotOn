/**
 * Background Manager - Handles background processes and extension lifecycle.
 * 
 * This module manages:
 * - Extension installation and updates
 * - Context menu integration
 * - Hotkey commands
 * - Tab updates and CSS injection
 * - Spotify search integration
 * - Feature initialization
 * 
 * The background manager works by:
 * 1. Setting up context menus and commands
 * 2. Handling extension installation/updates
 * 3. Managing tab updates and CSS injection
 * 4. Processing hotkey commands
 * 5. Maintaining extension state
 * 
 * @class BackgroundManager
 * @property {Object} settings - Extension settings and state
 * @property {Object} commands - Registered hotkey commands
 * 
 */

class BackgroundManager {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.initializeCommands();
        this.initializeTabUpdates();
        this.initializeInstallHandler();
    }

    initializeInstallHandler() {
        chrome.runtime.onInstalled.addListener(async ({ reason, previousVersion }) => {
            if (reason === 'install' || reason === 'update') {
                try {
                    // Check if this is an update from version 3.1.0 or lower
                    if (reason === 'update' && previousVersion && this.isVersionLowerOrEqual(previousVersion, '3.1.0')) {
                        // Show update notice
                        chrome.tabs.create({
                            url: chrome.runtime.getURL('update-notice.html')
                        });
                    }

                    const result = await chrome.storage.sync.get('settings');
                    if (!result.settings) {
                        // console.log('[SpotOn] Initializing default settings...');
                        await chrome.storage.sync.set({
                            settings: {
                                spoton: true, righter: true, font: true, fontLsize: true,
                                shadow: true, roundAlbumArt: true, spinAlbum: true, thickerPB: true,
                                rainbowProgressbar: false, rainbowControls: true, reducedTransparency: false,
                                lyricsColor: false, disableHi: true, hideMusixmatch: true, hideMusicVids: false,
                                hideMerch: false, hidePremButton: true, hidePodcasts: true,
                                hideOnTour: false, hidePiP: false, hideScroll: false, hideVolBar: false,
                                hideAlbumArt: false, hideAppearsOn: false,
                                hideFansLiked: false, hideFeatArtist: false,
                                hideNPB: false, hideNPV: false, hideSDura: false, hideSHeart: false,
                                hideCB: false, hideSpotifyOffers: false, hideArtistPick: false,
                                hideDevicePicker: false, hideLyricsButton: false,
                                hidePIcon: false, hideHi: false,
                                hideAbout: false, hometopsel: true, footernomore: true,
                                byeappthing: true, removeLikedCover: false, youwontlike: false,
                                removeMoreLike: false, removeDiscoveron: false, hiddenPDura: false,
                                hiddenPHeart: false, hiddenPInfo: false, hiddenSPL: false,
                                hiddenSAlbum: false, hiddenSDate: false,
                                hiddenSInfo: false, hiddenSTime: false, scrollNPB: false,
                                hiddenNPVqueue: false, hiddenNPVtour: true, hiddenNPVartist: false,
                                hiddenNPVcredits: false
                            }
                        });
                        // console.log('[SpotOn] Default settings initialized successfully');
                    } else {
                        // console.log('[SpotOn] Settings already exist, skipping initialization');
                    }
                    await chrome.storage.local.remove(['spoton-custom-css']);
                    // console.log('[SpotOn] Cleared old CSS from localStorage');
                } catch (error) {
                    console.error('[SpotOn] Error initializing settings:', error);
                }
            }
        });
    }

    initializeCommands() {
        chrome.commands.onCommand.addListener(async (command) => {
            try {
                const tabs = await chrome.tabs.query({ url: "https://open.spotify.com/*" });
                await Promise.all(tabs.map(tab => this.sendCommandToTab(command, tab.id)));
            } catch (error) {
                console.error(`[SpotOn Hotkeys] Error sending command '${command}':`, error);
            }
        });
    }

    async sendCommandToTab(command, tabId) {
        try {
            await chrome.scripting.executeScript({
                target: { tabId },
                func: (command) => {
                    const findAndClick = (command) => {
                        const DENY = ".extension-lyrics-button";
                        const VALUE_SET = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

                        const animate = (e) => {
                            e.style.transition = 'transform 0.4s ease-in-out';
                            e.style.transform = 'scale(1.2)';
                            setTimeout(() => e.style.transform = 'scale(1)', 200);
                        };

                        const clickAndAnimate = (e) => {
                            if (!e) throw new Error("Element not found");
                            e.click();
                            animate(e);
                        };

                        const usingSlider = (selector, goUp) => {
                            const slider = document.querySelector(selector);
                            if (!slider) return;
                            const value = parseInt(goUp ? slider.max : slider.min);
                            VALUE_SET.call(slider, value);
                            slider.dispatchEvent(new Event("change", { value, bubbles: true }));
                        };

                        const commandSelectors = {
                            "play-pause": [".spoticon-play-16", ".spoticon-pause-16", "[data-testid=control-button-play]", "[data-testid=control-button-pause]", "[data-testid=control-button-playpause]"],
                            "next": [".spoticon-skip-forward-16", "[data-testid=control-button-skip-forward]"],
                            "previous": [".spoticon-skip-back-16", "[data-testid=control-button-skip-back]"],
                            "shuffle": [".spoticon-shuffle-16", "[data-testid=control-button-shuffle]"],
                            "repeat": [".spoticon-repeat-16", ".spoticon-repeatonce-16", "[data-testid=control-button-repeat]"],
                            "like": ["button[aria-label='Add to Liked Songs']"],
                            "volume-mute": [".volume-bar__icon-button.control-button", "[data-testid=volume-bar-toggle-mute-button]"],
                        };

                        const usingSelector = (command) => {
                            const selectors = commandSelectors[command];
                            if (!selectors) throw new Error(`Selector for command '${command}' not found`);
                            const selector = selectors.map(s => `${s}:not(${DENY})`).join(", ");
                            const element = document.querySelector(selector);
                            if (element) clickAndAnimate(element);
                        };

                        if (["volume-up", "volume-down"].includes(command)) {
                            usingSlider("[class*=volume] input[type=range]", command === "volume-up");
                        } else if (["seek-forward", "seek-backward"].includes(command)) {
                            usingSlider("[class=playback-bar] input[type=range]", command === "seek-forward");
                        } else {
                            usingSelector(command);
                        }
                    };

                    findAndClick(command);
                },
                args: [command]
            });
        } catch (error) {
            console.error(`[SpotOn Hotkeys] Error executing '${command}':`, error);
        }
    }

    initializeTabUpdates() {
        chrome.tabs.onUpdated.removeListener(this.handleTabUpdate);
        chrome.tabs.onUpdated.addListener(this.handleTabUpdate.bind(this));
    }

    async handleTabUpdate(tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete' && tab.url?.startsWith('https://open.spotify.com/')) {
            // console.log('[SpotOn] Spotify tab loaded, applying saved CSS');
            const { navColor, lyricsColor } = await chrome.storage.sync.get(['navColor', 'lyricsColor']);
            // console.log('[SpotOn] Retrieved color values:', { navColor, lyricsColor });

            try {
                await chrome.scripting.executeScript({
                    target: { tabId },
                    func: () => {
                        // console.log('[SpotOn] Removing existing styles');
                        const existingStyles = [
                            document.getElementById('spoton-color-theme'),
                            document.getElementById('spoton-custom-css')
                        ].filter(Boolean);
                        existingStyles.forEach(style => {
                            // console.log('[SpotOn] Removing style:', style.id);
                            style.remove();
                        });
                    }
                });
            } catch (error) {
                console.error('[SpotOn] Error removing existing styles:', error);
            }

            if (navColor || lyricsColor) {
                // console.log('[SpotOn] Generating color theme CSS with values:', { navColor, lyricsColor });
                let colorThemeCSS = '';

                if (navColor) {
                    colorThemeCSS += `
.sqKERfoKl4KwrtHqcKOd,
.JG5J9NWJkaUO9fiKECMA,
.OTfMDdomT5S7B5dbYTT8,
.EhyK_jJzB2PcWXd5lg24,
#context-menu[aria-labelledby="device-picker-icon-button"]:has(#device-picker-header [data-testid="animated-now-playing"]),
.aCtCKL9BxAoHeVZS0uRs.bk509U3ZhZc9YBJAmoPB,
.uV8q95GGAb2VDtL3gpYa,
.lYpiKR_qEjl1jGGyEvsA,
div#Desktop_LeftSidebar_Id,
.AzO2ondhaHJntbGy_3_S,
div#Desktop_LeftSidebar_Id,
.Nw1INlIyra3LT1JjvoqH,
#main > div.Root.encore-dark-theme > div.ZQftYELq0aOsg6tPbVbV > div.JG5J9NWJkaUO9fiKECMA,
.pGU_qEtNT1qWKjrRbvan,
.EZFyDnuQnx5hw78phLqP {
    ${navColor.includes('http') ?
                            `background-image: url(${navColor}) !important;
         background-size: cover !important;
         background-attachment: fixed !important;
         background-repeat: no-repeat !important;
         background-blend-mode: soft-light !important;` :
                            `background-color: ${navColor} !important;`}
    overflow-x: none !important;
}`;
                }

                if (lyricsColor) {
                    colorThemeCSS += `
.nw6rbs8R08fpPn7RWW2w.aeO5D7ulxy19q4qNBrkk {
    color: ${lyricsColor} !important;
}`;
                }

                try {
                    // console.log('[SpotOn] Applying color theme CSS:', colorThemeCSS);
                    await chrome.scripting.executeScript({
                        target: { tabId },
                        func: (css) => {
                            // console.log('[SpotOn] Creating color theme style element');
                            const style = document.createElement('style');
                            style.id = 'spoton-color-theme';
                            style.textContent = css;
                            document.head.appendChild(style);
                            // console.log('[SpotOn] Color theme style applied');
                        },
                        args: [colorThemeCSS]
                    });
                } catch (error) {
                    console.error('[SpotOn] Error applying color theme CSS:', error);
                }
            }
        }
    }

    async handleSpotifySearch(query) {
        const encodedQuery = encodeURIComponent(query);
        const url = `https://open.spotify.com/search/${encodedQuery}`;
        await chrome.tabs.create({ url });
    }

    async openSpotify() {
        await chrome.tabs.create({ url: 'https://open.spotify.com' });
    }

    async injectFeatures(tabId) {
        try {
            const settings = await chrome.storage.sync.get('settings');
            if (settings.settings) {
                chrome.tabs.sendMessage(tabId, {
                    type: 'INIT_FEATURES',
                    settings: settings.settings
                });
            }
        } catch (error) {
            console.error('Error injecting features:', error);
        }
    }

    // Helper method to compare versions
    isVersionLowerOrEqual(version1, version2) {
        const v1 = version1.split('.').map(Number);
        const v2 = version2.split('.').map(Number);

        for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
            const num1 = v1[i] || 0;
            const num2 = v2[i] || 0;
            if (num1 < num2) return true;
            if (num1 > num2) return false;
        }
        return true;
    }
}

const backgroundManager = new BackgroundManager();

chrome.runtime.onInstalled.addListener(async () => {
    const { customCSS } = await chrome.storage.local.get('customCSS');
    const tabs = await chrome.tabs.query({ url: 'https://open.spotify.com/*' });

    for (const tab of tabs) {
        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (cssId) => {
                    const existingStyle = document.getElementById(cssId);
                    if (existingStyle) existingStyle.remove();
                },
                args: ['spoton-custom-css']
            });

            if (customCSS) {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (css, cssId) => {
                        const style = document.createElement('style');
                        style.id = cssId;
                        style.textContent = css;
                        document.head.appendChild(style);
                    },
                    args: [customCSS, 'spoton-custom-css']
                });
            }
        } catch (error) {
            console.error('Error handling CSS in tab:', error);
        }
    }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.startsWith('https://open.spotify.com/')) {
        // console.log('[SpotOn] Spotify tab loaded, applying saved CSS');
        const [localStorageResult, syncStorageResult] = await Promise.all([
            chrome.storage.local.get(['spoton-custom-css']),
            chrome.storage.sync.get(['navColor', 'lyricsColor'])
        ]);

        const savedCSS = localStorageResult['spoton-custom-css'];
        const { navColor, lyricsColor } = syncStorageResult;

        if (savedCSS) {
            try {
                await chrome.scripting.executeScript({
                    target: { tabId },
                    func: (cssId) => {
                        const existingStyle = document.getElementById(cssId);
                        if (existingStyle) existingStyle.remove();
                    },
                    args: ['spoton-custom-css']
                });

                await chrome.scripting.executeScript({
                    target: { tabId },
                    func: (css, cssId) => {
                        const style = document.createElement('style');
                        style.id = cssId;
                        style.textContent = css;
                        document.head.appendChild(style);
                    },
                    args: [savedCSS, 'spoton-custom-css']
                });
            } catch (error) {
                console.error('[SpotOn] Error applying CSS to new tab:', error);
            }
        } else if (navColor || lyricsColor) {
            let css = '';

            if (navColor) {
                css += `
.sqKERfoKl4KwrtHqcKOd,
.JG5J9NWJkaUO9fiKECMA,
.OTfMDdomT5S7B5dbYTT8,
.EhyK_jJzB2PcWXd5lg24,
#context-menu[aria-labelledby="device-picker-icon-button"]:has(#device-picker-header [data-testid="animated-now-playing"]),
.aCtCKL9BxAoHeVZS0uRs.bk509U3ZhZc9YBJAmoPB,
.uV8q95GGAb2VDtL3gpYa,
.lYpiKR_qEjl1jGGyEvsA,
div#Desktop_LeftSidebar_Id,
.AzO2ondhaHJntbGy_3_S,
div#Desktop_LeftSidebar_Id,
.Nw1INlIyra3LT1JjvoqH,
#main > div.Root.encore-dark-theme > div.ZQftYELq0aOsg6tPbVbV > div.JG5J9NWJkaUO9fiKECMA,
.pGU_qEtNT1qWKjrRbvan,
.EZFyDnuQnx5hw78phLqP {
    ${navColor.includes('http') ?
                        `background-image: url(${navColor}) !important;
         background-size: cover !important;
         background-attachment: fixed !important;
         background-repeat: no-repeat !important;
         background-blend-mode: soft-light !important;` :
                        `background-color: ${navColor} !important;`}
    overflow-x: none !important;
}`;
            }

            if (lyricsColor) {
                css += `
.nw6rbs8R08fpPn7RWW2w.aeO5D7ulxy19q4qNBrkk {
    color: ${lyricsColor} !important;
}`;
            }

            if (css) {
                try {
                    await chrome.scripting.executeScript({
                        target: { tabId },
                        func: (css, cssId) => {
                            const style = document.createElement('style');
                            style.id = cssId;
                            style.textContent = css;
                            document.head.appendChild(style);
                        },
                        args: [css, 'spoton-custom-css']
                    });
                } catch (error) {
                    console.error('[SpotOn] Error applying generated CSS to new tab:', error);
                }
            }
        }
    }
}); 