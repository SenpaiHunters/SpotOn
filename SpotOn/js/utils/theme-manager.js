/**
 * Theme Manager - Handles theme customization and background image management.
 * 
 * This module manages:
 * - Theme application and removal
 * - Background image based on album art
 * - Theme lock state
 * - Dynamic CSS injection
 * - Theme state persistence
 * 
 * The theme manager works by:
 * 1. Initializing theme state
 * 2. Setting up message listeners for theme control
 * 3. Managing background image updates
 * 4. Handling theme lock state
 * 5. Applying and removing theme styles
 * 
 * @class ThemeManager
 * @property {boolean} themeLock - Whether theme changes are locked
 * @property {string|null} savedBackgroundImage - Cached background image URL
 * @property {boolean} initialized - Whether the manager has been initialized
 * @property {number} startTime - Performance timestamp for initialization
 * 
 */

export class ThemeManager {
    constructor() {
        this.themeLock = false;
        this.savedBackgroundImage = null;
        this.initialized = false;
        this.startTime = performance.now();
        this.initialize();
    }

    initialize() {
        if (this.initialized) return;
        this.initialized = true;
        this.initSkin();
        this.setupMessageListener();
    }

    setupMessageListener() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            const { action, txt, bool } = message;

            if (action === "init") {
                this.initSkin();
                return;
            }

            switch (txt) {
                case "toggleLock":
                    this.themeLock = !this.themeLock;
                    this.savedBackgroundImage = this.themeLock ? this.getAlbumArtBackground() : this.savedBackgroundImage;
                    this.restoreSkinState();
                    sendResponse({ themeLocked: this.themeLock });
                    break;
                case "checkLock":
                    sendResponse({ themeLocked: this.themeLock });
                    return true;
                case "disable":
                    if (bool === "false" && !this.themeLock) {
                        this.removeSkin();
                        sendResponse({ status: "disabled" });
                    }
                    break;
                case "enable":
                    if (bool === "true" && !this.themeLock) {
                        this.initSkin(true);
                        sendResponse({ status: "enabled" });
                    }
                    break;
                case "getAlbumArtURL":
                    sendResponse({ albumArtURL: this.getCoverArtURL() });
                    break;
            }
        });
    }

    initSkin(force = false) {
        if (!this.themeLock || force) {
            this.addStyleToDocument(this.getCSS(force));
        }
        this.addObserverIfDesiredNodeAvailable();
    }

    addStyleToDocument(css) {
        let styleNode = document.getElementById("spoton-theme") || this.createStyleNode();
        styleNode.textContent = css;
    }

    createStyleNode() {
        const styleNode = document.createElement("style");
        styleNode.id = "spoton-theme";
        styleNode.type = "text/css";
        document.head.appendChild(styleNode);
        return styleNode;
    }

    removeSkin() {
        if (!this.themeLock) {
            document.getElementById("spoton-theme")?.remove();
        }
    }

    getCSS(force = false) {
        // The CSS is now loaded from spoton.css
        return '';
    }

    addObserverIfDesiredNodeAvailable() {
        const coverArtImage = document.querySelector("[data-testid=cover-art-image]");
        if (!coverArtImage) {
            requestAnimationFrame(() => this.addObserverIfDesiredNodeAvailable());
            return;
        }

        let backgroundSheet = document.getElementById("background") || this.createBackgroundSheet();
        this.updateBackgroundImage(backgroundSheet, coverArtImage.src);
        this.manageObserver(coverArtImage, backgroundSheet);
    }

    createBackgroundSheet() {
        let backgroundSheet = document.createElement("style");
        backgroundSheet.id = "background";
        document.head.appendChild(backgroundSheet);
        return backgroundSheet;
    }

    manageObserver(coverArtImage, backgroundSheet) {
        if (!window.coverArtObserver) {
            window.coverArtObserver = new MutationObserver(changes => {
                for (const change of changes) {
                    if (change.attributeName === "src") {
                        this.updateBackgroundImage(backgroundSheet, coverArtImage.src);
                        break;
                    }
                }
            });
        }

        const shouldObserve = !this.themeLock && !window.coverArtObserverObserving;
        const shouldDisconnect = this.themeLock && window.coverArtObserverObserving;

        if (shouldObserve) {
            window.coverArtObserver.observe(coverArtImage, { attributes: true, attributeFilter: ['src'] });
            window.coverArtObserverObserving = true;
        } else if (shouldDisconnect) {
            window.coverArtObserver.disconnect();
            window.coverArtObserverObserving = false;
        }
    }

    updateBackgroundImage(sheet, imageUrl) {
        if (!this.themeLock) {
            sheet.textContent = `:root { --backimg: url(${imageUrl}); }`;
        }
    }

    getAlbumArtBackground() {
        const coverArt = document.querySelector("[data-testid=cover-art-image]");
        if (!coverArt) return null;

        // Get the full resolution URL by checking the class
        const url = coverArt.src;
        // Return the original URL which should be the highest quality available
        return url;
    }

    getCoverArtURL() {
        return this.getAlbumArtBackground();
    }

    restoreSkinState() {
        const backgroundSheet = document.getElementById("background");
        if (backgroundSheet && this.savedBackgroundImage) {
            this.updateBackgroundImage(backgroundSheet, this.savedBackgroundImage);
        }
    }
} 