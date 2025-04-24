/**
 * CSS Manager - Handles custom CSS management and application.
 * 
 * This module manages:
 * - CSS editor functionality
 * - CSS import/export
 * - CSS example loading
 * - CSS validation
 * - CSS application to Spotify tabs
 * 
 * The CSS manager works by:
 * 1. Loading saved CSS on initialization
 * 2. Providing editor interface
 * 3. Handling CSS file operations
 * 4. Managing CSS examples
 * 5. Applying CSS to Spotify tabs
 * 
 * @module CSSManager
 * @property {HTMLElement} cssEditor - CSS editor textarea element
 * @property {HTMLElement} saveCssButton - Save CSS button
 * @property {HTMLElement} importCssButton - Import CSS button
 * @property {HTMLElement} exportCssButton - Export CSS button
 * @property {HTMLElement} cssExamplesDropdown - CSS examples dropdown
 * @property {HTMLElement} cssError - Error message display
 * @property {string} CSS_ID - Unique identifier for custom CSS
 * 
 */

// CSS Manager functionality
const cssEditor = document.getElementById('css-editor');
const saveCssButton = document.getElementById('save-css');
const importCssButton = document.getElementById('import-css');
const exportCssButton = document.getElementById('export-css');
const cssExamplesDropdown = document.getElementById('css-examples-dropdown');
const cssError = document.getElementById('css-error');

// Unique identifier for our CSS
const CSS_ID = 'spoton-custom-css';

// Load saved CSS when popup opens
document.addEventListener('DOMContentLoaded', async () => {
    const { customCSS } = await chrome.storage.local.get('customCSS');
    if (customCSS) {
        cssEditor.value = customCSS;
    }
    loadCSSExamples();
});

// Save CSS to storage and apply to page
saveCssButton.addEventListener('click', async () => {
    try {
        const css = cssEditor.value;
        await chrome.storage.local.set({ customCSS: css });
        
        // Apply CSS to all Spotify tabs
        const tabs = await chrome.tabs.query({ url: 'https://open.spotify.com/*' });
        for (const tab of tabs) {
            // Remove any existing custom CSS
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (cssId) => {
                    const existingStyle = document.getElementById(cssId);
                    if (existingStyle) {
                        existingStyle.remove();
                    }
                },
                args: [CSS_ID]
            });
            
            // Apply new CSS if it exists
            if (css) {
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (css, cssId) => {
                        const style = document.createElement('style');
                        style.id = cssId;
                        style.textContent = css;
                        document.head.appendChild(style);
                    },
                    args: [css, CSS_ID]
                });
            }
        }
        
        cssError.textContent = 'CSS saved and applied successfully!';
        cssError.style.color = 'var(--success)';
        setTimeout(() => {
            cssError.textContent = '';
        }, 3000);
    } catch (error) {
        console.error('Error saving/applying CSS:', error);
        cssError.textContent = 'Error saving/applying CSS: ' + error.message;
        cssError.style.color = 'var(--error)';
    }
});

// Import CSS from file
importCssButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.css';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                cssEditor.value = e.target.result;
            };
            reader.readAsText(file);
        }
    };
    input.click();
});

// Export CSS to file
exportCssButton.addEventListener('click', () => {
    const css = cssEditor.value;
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spoton-custom.css';
    a.click();
    URL.revokeObjectURL(url);
});

// Load CSS examples from GitHub
async function loadCSSExamples() {
    try {
        const response = await fetch('https://api.github.com/repos/SenpaiHunters/SpotOnThemes/contents/example-css');
        if (!response.ok) throw new Error('Failed to fetch CSS examples');
        
        const files = await response.json();
        const cssFiles = files.filter(file => file.name.endsWith('.css'));
        
        cssExamplesDropdown.innerHTML = '<option value="">Select Example</option>';
        cssFiles.forEach(file => {
            const option = document.createElement('option');
            option.value = file.download_url;
            option.textContent = file.name.replace('.css', '');
            cssExamplesDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading CSS examples:', error);
        cssError.textContent = 'Error loading CSS examples';
        cssError.style.color = 'var(--error)';
    }
}

// Load selected CSS example
cssExamplesDropdown.addEventListener('change', async (e) => {
    const url = e.target.value;
    if (!url) return;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch CSS example');
        
        const css = await response.text();
        cssEditor.value = css;
    } catch (error) {
        console.error('Error loading CSS example:', error);
        cssError.textContent = 'Error loading CSS example';
        cssError.style.color = 'var(--error)';
    }
}); 