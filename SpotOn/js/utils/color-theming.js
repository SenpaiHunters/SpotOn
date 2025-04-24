/**
 * Color Theming Manager - Handles color customization for Spotify UI elements.
 * 
 * This module manages:
 * - Navigation bar color customization
 * - Lyrics color customization
 * - Color preview functionality
 * - Color validation
 * - CSS generation and injection
 * 
 * The color theming manager works by:
 * 1. Initializing color inputs and previews
 * 2. Loading saved color values
 * 3. Handling color input changes
 * 4. Validating color values
 * 5. Generating and applying CSS
 * 
 * @class ColorTheming
 * @property {HTMLElement} navColorInput - Navigation color input
 * @property {HTMLElement} lyricsColorInput - Lyrics color input
 * @property {HTMLElement} navColorPreview - Navigation color preview
 * @property {HTMLElement} lyricsColorPreview - Lyrics color preview
 * 
 */

export class ColorTheming {
    constructor() {
        // console.log('[SpotOn] Initializing ColorTheming...');
        this.navColorInput = document.getElementById('nav-color');
        this.lyricsColorInput = document.getElementById('lyrics-color');
        this.navColorPreview = document.getElementById('nav-color-preview');
        this.lyricsColorPreview = document.getElementById('lyrics-color-preview');

        if (!this.navColorInput || !this.lyricsColorInput || !this.navColorPreview || !this.lyricsColorPreview) {
            console.error('[SpotOn] Failed to find required elements:', {
                navColorInput: !!this.navColorInput,
                lyricsColorInput: !!this.lyricsColorInput,
                navColorPreview: !!this.navColorPreview,
                lyricsColorPreview: !!this.lyricsColorPreview
            });
            return;
        }

        this.initialize();

        // Listen for storage changes to update colors when they change in other tabs
        chrome.storage.onChanged.addListener((changes, namespace) => {
            // console.log('[SpotOn] Storage changed:', changes);
            if (namespace === 'sync') {
                if (changes.navColor) {
                    this.navColorInput.value = changes.navColor.newValue;
                    this.updatePreview('nav', changes.navColor.newValue);
                }
                if (changes.lyricsColor) {
                    this.lyricsColorInput.value = changes.lyricsColor.newValue;
                    this.updatePreview('lyrics', changes.lyricsColor.newValue);
                }
                this.updateCSS();
            }
        });

        // Listen for tab updates to reapply CSS
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            // console.log('[SpotOn] Tab updated:', { tabId, changeInfo, url: tab.url });
            if (changeInfo.status === 'complete' && tab.url?.startsWith('https://open.spotify.com/')) {
                // console.log('[SpotOn] Spotify tab loaded, applying saved CSS');
                this.applySavedCSS();
            }
        });
    }

    async initialize() {
        // console.log('[SpotOn] Loading saved colors...');
        const { navColor, lyricsColor } = await chrome.storage.sync.get(['navColor', 'lyricsColor']);

        // console.log('[SpotOn] Retrieved saved values:', { navColor, lyricsColor });

        if (navColor) {
            this.navColorInput.value = navColor;
            this.updatePreview('nav', navColor);
        }

        if (lyricsColor) {
            this.lyricsColorInput.value = lyricsColor;
            this.updatePreview('lyrics', lyricsColor);
        }

        // Add event listeners
        this.navColorInput.addEventListener('input', () => this.handleInput('nav'));
        this.lyricsColorInput.addEventListener('input', () => this.handleInput('lyrics'));
        // console.log('[SpotOn] Event listeners added');

        // Apply initial CSS if we have saved values
        if (navColor || lyricsColor) {
            // console.log('[SpotOn] Applying initial CSS with saved values');
            this.updateCSS();
        }
    }

    handleInput(type) {
        // console.log(`[SpotOn] Handling ${type} color input`);
        const input = type === 'nav' ? this.navColorInput : this.lyricsColorInput;
        const value = input.value.trim();
        // console.log(`[SpotOn] Input value:`, value);

        if (this.isValidColor(value) || (type === 'nav' && this.isValidImageUrl(value))) {
            // console.log(`[SpotOn] Valid ${type} input detected`);
            this.updatePreview(type, value);
            this.saveToStorage(type, value);
            this.updateCSS();
        } else {
            // console.log(`[SpotOn] Invalid ${type} input`);
        }
    }

    updatePreview(type, value) {
        // console.log(`[SpotOn] Updating ${type} preview with value:`, value);
        const preview = type === 'nav' ? this.navColorPreview : this.lyricsColorPreview;

        if (this.isValidImageUrl(value)) {
            // console.log(`[SpotOn] Setting image preview for ${type}`);
            preview.style.backgroundImage = `url(${value})`;
            preview.style.backgroundColor = 'transparent';
        } else {
            // console.log(`[SpotOn] Setting color preview for ${type}`);
            preview.style.backgroundImage = 'none';
            preview.style.backgroundColor = value;
        }
    }

    isValidColor(value) {
        // Check for hex color
        const isHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
        // Check for rgb/rgba color
        const isRgb = /^rgb(a)?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(,\s*[\d.]+)?\)$/.test(value);

        // console.log(`[SpotOn] Color validation for ${value}:`, { isHex, isRgb });
        return isHex || isRgb;
    }

    isValidImageUrl(value) {
        const isValid = /\.(jpeg|jpg|png|gif|webp)$/i.test(value) || value.startsWith('http');
        // console.log(`[SpotOn] Image URL validation for ${value}:`, isValid);
        return isValid;
    }

    saveToStorage(type, value) {
        // console.log(`[SpotOn] Saving ${type} color to storage:`, value);
        chrome.storage.sync.set({ [type + 'Color']: value }, () => {
            if (chrome.runtime.lastError) {
                console.error('[SpotOn] Error saving to storage:', chrome.runtime.lastError);
            } else {
                // console.log(`[SpotOn] Successfully saved ${type} color`);
            }
        });
    }

    updateCSS() {
        // console.log('[SpotOn] Updating CSS...');
        const navColor = this.navColorInput.value.trim();
        const lyricsColor = this.lyricsColorInput.value.trim();

        // console.log('[SpotOn] Current values:', { navColor, lyricsColor });

        let css = '';

        // Only add nav color CSS if there's a valid value
        if (navColor && (this.isValidColor(navColor) || this.isValidImageUrl(navColor))) {
            // console.log('[SpotOn] Generating navigation bar CSS');
            css += `
/* Navigation Bar Styling */
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
}
`;
        }

        // Only add lyrics color CSS if there's a valid value
        if (lyricsColor && this.isValidColor(lyricsColor)) {
            // console.log('[SpotOn] Generating lyrics CSS');
            css += `
/* Lyrics Styling */
.nw6rbs8R08fpPn7RWW2w.aeO5D7ulxy19q4qNBrkk {
    color: ${lyricsColor} !important;
}
`;
        }

        // Only inject CSS if we have valid values
        if (css) {
            // console.log('[SpotOn] Generated CSS:', css);
            this.injectCSS(css);
        } else {
            // console.log('[SpotOn] No valid CSS to inject');
        }
    }

    injectCSS(css) {
        // console.log('[SpotOn] Starting CSS injection process');
        chrome.tabs.query({ url: "*://*.spotify.com/*" }, (tabs) => {
            // console.log('[SpotOn] Found Spotify tabs:', tabs.length);
            tabs.forEach(tab => {
                // console.log(`[SpotOn] Injecting CSS into tab ${tab.id}`);
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (css) => {
                        // console.log('[SpotOn] Executing script in tab');
                        // Remove any existing style
                        const existingStyle = document.getElementById('spoton-color-theme');
                        if (existingStyle) {
                            // console.log('[SpotOn] Removing existing style');
                            existingStyle.remove();
                        }

                        // Create and append new style
                        // console.log('[SpotOn] Creating new style element');
                        const style = document.createElement('style');
                        style.id = 'spoton-color-theme';
                        style.textContent = css;
                        document.head.appendChild(style);
                        // console.log('[SpotOn] Style injected successfully');
                    },
                    args: [css]
                }, (result) => {
                    if (chrome.runtime.lastError) {
                        console.error('[SpotOn] Error injecting CSS:', chrome.runtime.lastError);
                    } else {
                        // console.log('[SpotOn] CSS injection result:', result);
                    }
                });
            });
        });
    }

    async applySavedCSS() {
        // console.log('[SpotOn] Checking for saved CSS...');
        const { navColor, lyricsColor } = await chrome.storage.sync.get(['navColor', 'lyricsColor']);

        if (navColor || lyricsColor) {
            // console.log('[SpotOn] Found saved colors, generating CSS');
            this.updateCSS();
        } else {
            // console.log('[SpotOn] No saved colors found');
        }
    }
}
