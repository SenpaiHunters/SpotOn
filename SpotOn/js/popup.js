/**
 * Popup Manager - Handles the extension's popup interface and user interactions.
 * 
 * This module manages:
 * - Feature toggles and settings UI
 * - Theme selection and customization (dark/light/custom)
 * - Theme locking functionality
 * - Now playing track information display
 * - Quick actions (copy track info, search Genius, download album art)
 * - Settings import/export functionality
 * - CSS editor and color theming
 * 
 * The popup works by:
 * 1. Initializing UI elements and event listeners
 * 2. Loading saved settings from Chrome storage
 * 3. Setting up real-time track information updates
 * 4. Managing theme state and transitions
 * 5. Handling user interactions and feature toggles
 * 
 * @module PopupManager
 * @property {Object} elements - DOM elements used in the popup
 * @property {SpotifyAPI} spotifyAPI - Instance of Spotify API manager
 * @property {Object} currentTrack - Current playing track information
 * @property {string} currentTheme - Current theme mode (dark/light/custom)
 * @property {boolean} isThemeLocked - Whether theme changes are locked
 * @property {Object} customColors - Custom theme color settings
 * 
 * @event DOMContentLoaded - Initializes the popup interface
 * @event click - Handles user interactions with buttons and controls
 * @event change - Manages theme and color picker changes
 */

import { SpotifyAPI } from './utils/spotify-api.js';
import { featureConfig } from './utils/feature-config.js';
import { ColorTheming } from './utils/color-theming.js';

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        currentTrack: null,
        isDownloading: false,
        currentTheme: 'dark', // Default to dark theme
        themeOrder: ['dark', 'custom'],
        currentThemeIndex: 0,
        isThemeLocked: false,
        customColors: null // Initialize as null, will be set from storage
    };

    const elements = {
        // Tabs
        tabButtons: document.querySelectorAll('.tab-button'),
        featuresContainer: document.getElementById('features-container'),
        cssEditorSection: document.getElementById('css-editor-section'),

        // Settings panel
        settingsPanel: document.getElementById('settings-panel'),
        settingsToggle: document.getElementById('settings-toggle'),
        closeSettings: document.getElementById('close-settings'),

        // Theme controls
        themeSelect: document.getElementById('theme-select'),
        customTheme: document.getElementById('custom-theme'),
        primaryColor: document.getElementById('primary-color'),
        secondaryColor: document.getElementById('secondary-color'),
        themeToggleButton: document.getElementById('theme-toggle'),
        themeIcon: document.getElementById('theme-toggle')?.querySelector('.icon'),
        themeLockButton: document.getElementById('theme-lock'),

        // Now playing
        albumArt: document.getElementById('album-art'),
        trackTitle: document.getElementById('track-title'),
        trackArtist: document.getElementById('track-artist'),

        // Quick actions
        copyInfo: document.getElementById('copy-info'),
        searchGenius: document.getElementById('search-genius'),
        downloadArt: document.getElementById('download-art'),

        // Settings actions
        exportSettings: document.getElementById('export-settings'),
        importSettings: document.getElementById('import-settings'),
        importFile: document.getElementById('import-file')
    };

    const spotifyAPI = new SpotifyAPI();
    let updateNowPlayingInterval;

    function generateFeatureSections() {
        const container = elements.featuresContainer;
        container.innerHTML = '';

        Object.entries(featureConfig).forEach(([tabId, config]) => {
            const section = document.createElement('section');
            section.id = `${tabId}-features`;
            section.className = 'features-section';
            if (tabId === 'main') section.classList.add('active');

            const featureGrid = document.createElement('div');
            featureGrid.className = 'feature-grid';

            if (config.sections) {
                config.sections.forEach(sectionConfig => {
                    const sectionTitle = document.createElement('h4');
                    sectionTitle.textContent = sectionConfig.title;
                    featureGrid.appendChild(sectionTitle);
                    sectionConfig.features.forEach(feature => featureGrid.appendChild(createFeatureItem(feature)));
                });
            } else {
                config.features.forEach(feature => featureGrid.appendChild(createFeatureItem(feature)));
            }

            section.appendChild(featureGrid);
            container.appendChild(section);
        });
    }

    function createFeatureItem(feature) {
        const item = document.createElement('div');
        item.className = 'feature-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = feature.id;
        checkbox.className = 'feature-toggle';

        const label = document.createElement('label');
        label.htmlFor = feature.id;
        label.textContent = feature.label;

        item.appendChild(checkbox);
        item.appendChild(label);
        return item;
    }

    function setupEventListeners() {
        // Quick actions
        elements.downloadArt?.addEventListener('click', handleDownloadClick);
        elements.copyInfo?.addEventListener('click', copyTrackInfo);
        elements.searchGenius?.addEventListener('click', searchOnGenius);

        // Tab switching
        elements.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                elements.tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const tab = button.dataset.tab;
                if (tab === 'css') {
                    elements.featuresContainer.style.display = 'none';
                    elements.cssEditorSection.style.display = 'block';
                    new ColorTheming();
                } else {
                    elements.featuresContainer.style.display = 'block';
                    elements.cssEditorSection.style.display = 'none';
                    document.querySelectorAll('.features-section').forEach(section => section.classList.remove('active'));
                    document.getElementById(`${tab}-features`).classList.add('active');
                }
            });
        });

        // Settings panel
        elements.settingsToggle?.addEventListener('click', () => {
            elements.settingsPanel.classList.add('active');
            // Ensure color pickers are set to current values when opening settings
            if (state.customColors) {
                if (elements.primaryColor) elements.primaryColor.value = state.customColors.primary;
                if (elements.secondaryColor) elements.secondaryColor.value = state.customColors.secondary;
            }
        });
        elements.closeSettings?.addEventListener('click', () => elements.settingsPanel.classList.remove('active'));

        // Theme controls
        if (elements.themeToggleButton && elements.themeIcon) {
            elements.themeToggleButton.addEventListener('click', () => {
                state.currentThemeIndex = (state.currentThemeIndex + 1) % state.themeOrder.length;
                const newTheme = state.themeOrder[state.currentThemeIndex];
                state.currentTheme = newTheme;
                updateThemeIcon();

                if (newTheme === 'custom') {
                    elements.settingsPanel.classList.add('active');
                    elements.themeSelect.value = 'custom';
                    elements.customTheme.style.display = 'block';
                    // Ensure color pickers are set to current values
                    if (state.customColors) {
                        if (elements.primaryColor) elements.primaryColor.value = state.customColors.primary;
                        if (elements.secondaryColor) elements.secondaryColor.value = state.customColors.secondary;
                        applyCustomColors(state.customColors);
                    }
                } else {
                    elements.customTheme.style.display = 'none';
                    // Reset to dark theme colors immediately
                    const root = document.documentElement;
                    root.style.setProperty('--accent-color', '#9b59b6');
                    root.style.setProperty('--accent-color-bright', '#af7ac5');
                    root.style.setProperty('--accent-color-dark', '#8e44ad');
                    root.style.setProperty('--secondary-color', '#6c5ce7');
                    document.body.classList.remove('custom-theme');
                }
                
                // Single storage operation
                chrome.storage.sync.set({ 
                    theme: newTheme,
                    customColors: newTheme === 'custom' ? state.customColors : null
                });
            });
        }

        // Theme lock
        if (elements.themeLockButton) {
            chrome.storage.sync.get(['themeLock'], result => {
                state.isThemeLocked = result.themeLock || false;
                updateThemeLockButton();
            });

            elements.themeLockButton.addEventListener('click', () => {
                state.isThemeLocked = !state.isThemeLocked;
                updateThemeLockButton();
                chrome.storage.sync.set({ themeLock: state.isThemeLocked });
                chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: 'TOGGLE_THEME_LOCK',
                        locked: state.isThemeLocked
                    });
                });
            });
        }

        // Feature toggles
        document.querySelectorAll('.feature-toggle').forEach(toggle => {
            toggle.addEventListener('change', () => saveFeature(toggle.id, toggle.checked));
        });

        // Settings actions
        elements.exportSettings?.addEventListener('click', exportSettings);
        elements.importSettings?.addEventListener('click', () => elements.importFile?.click());
        elements.importFile?.addEventListener('change', importSettings);

        if (elements.primaryColor && elements.secondaryColor) {
            const updateCustomColors = () => {
                state.customColors = {
                    primary: elements.primaryColor.value,
                    secondary: elements.secondaryColor.value
                };
                applyCustomColors(state.customColors);
                // Debounced storage update
                clearTimeout(state.colorUpdateTimeout);
                state.colorUpdateTimeout = setTimeout(() => {
                    chrome.storage.sync.set({
                        theme: 'custom',
                        customColors: state.customColors
                    });
                }, 100);
            };

            elements.primaryColor.addEventListener('change', updateCustomColors);
            elements.secondaryColor.addEventListener('change', updateCustomColors);
        }

        if (elements.themeSelect) {
            elements.themeSelect.addEventListener('change', (e) => {
                const selectedTheme = e.target.value;
                if (selectedTheme === 'custom') {
                    elements.customTheme.style.display = 'block';
                    elements.settingsPanel.classList.add('active');
                    // Ensure color pickers are set to current values
                    if (state.customColors) {
                        if (elements.primaryColor) elements.primaryColor.value = state.customColors.primary;
                        if (elements.secondaryColor) elements.secondaryColor.value = state.customColors.secondary;
                        applyCustomColors(state.customColors);
                    }
                } else {
                    elements.customTheme.style.display = 'none';
                    // Reset to dark theme colors immediately
                    const root = document.documentElement;
                    root.style.setProperty('--accent-color', '#9b59b6');
                    root.style.setProperty('--accent-color-bright', '#af7ac5');
                    root.style.setProperty('--accent-color-dark', '#8e44ad');
                    root.style.setProperty('--secondary-color', '#6c5ce7');
                    document.body.classList.remove('custom-theme');
                }
                chrome.storage.sync.set({ theme: selectedTheme });
            });
        }
    }

    function updateThemeIcon() {
        const theme = state.themeOrder[state.currentThemeIndex];
        if (elements.themeIcon) {
            elements.themeIcon.src = `assets/svg/${theme === 'dark' ? 'moon' : 'palette'}.svg`;
            elements.themeIcon.alt = `${theme.charAt(0).toUpperCase()}${theme.slice(1)} Theme`;
            elements.themeIcon.dataset.theme = theme;
        }
    }

    function updateThemeLockButton() {
        if (elements.themeLockButton) {
            const icon = elements.themeLockButton.querySelector('.icon');
            elements.themeLockButton.dataset.locked = state.isThemeLocked;
            icon.src = state.isThemeLocked ? 'assets/svg/lock.svg' : 'assets/svg/unlocked.svg';
            icon.alt = state.isThemeLocked ? 'Lock' : 'Unlock';
        }
    }

    async function handleDownloadClick() {
        if (state.isDownloading) return;
        try {
            state.isDownloading = true;
            await downloadAlbumArt();
        } finally {
            state.isDownloading = false;
        }
    }

    async function loadSettings() {
        try {
            const settings = await chrome.storage.sync.get('settings');
            if (settings.settings) {
                Object.entries(settings.settings).forEach(([feature, enabled]) => {
                    const toggle = document.getElementById(feature);
                    if (toggle) toggle.checked = enabled;
                });
            }
            updateNowPlaying();
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    async function loadTheme() {
        try {
            const result = await chrome.storage.sync.get(['theme', 'customColors']);
            if (result.theme) {
                state.currentTheme = result.theme;
                state.currentThemeIndex = state.themeOrder.indexOf(result.theme);
                if (result.customColors) {
                    state.customColors = result.customColors;
                }
                applyTheme(state.currentTheme, state.customColors);
            } else {
                applyTheme('auto');
            }
        } catch (error) {
            console.error('Error loading theme:', error);
            applyTheme('auto');
        }
    }

    function applyTheme(theme, customColors = null) {
        document.body.classList.remove('custom-theme');
        if (theme === 'custom' && customColors) {
            document.body.classList.add('custom-theme');
            applyCustomColors(customColors);
        }
        if (elements.themeSelect) elements.themeSelect.value = theme;
        if (elements.customTheme) elements.customTheme.style.display = theme === 'custom' ? 'block' : 'none';
    }

    function applyCustomColors(colors) {
        const root = document.documentElement;
        if (colors.primary) {
            root.style.setProperty('--accent-color', colors.primary);
            root.style.setProperty('--accent-color-bright', lightenColor(colors.primary, 20));
            root.style.setProperty('--accent-color-dark', darkenColor(colors.primary, 20));
        }
        if (colors.secondary) {
            root.style.setProperty('--secondary-color', colors.secondary);
        }
    }

    function lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1);
    }

    function darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return '#' + (
            0x1000000 +
            (R > 0 ? (R < 255 ? R : 255) : 0) * 0x10000 +
            (G > 0 ? (G < 255 ? G : 255) : 0) * 0x100 +
            (B > 0 ? (B < 255 ? B : 255) : 0)
        ).toString(16).slice(1);
    }

    function saveFeature(feature, enabled) {
        chrome.storage.sync.get('settings', data => {
            const settings = data.settings || {};
            settings[feature] = enabled;
            chrome.storage.sync.set({ settings }, () => {
                chrome.tabs.query({ url: 'https://open.spotify.com/*' }, tabs => {
                    tabs.forEach(tab => {
                        chrome.tabs.sendMessage(tab.id, {
                            type: 'TOGGLE_FEATURE',
                            feature,
                            enabled
                        });
                    });
                });
            });
        });
    }

    function updateNowPlaying() {
        spotifyAPI.getNowPlaying().then(track => {
            if (track) {
                state.currentTrack = track;
                if (track.albumArt) {
                    elements.albumArt.src = track.albumArt;
                    elements.albumArt.onerror = () => {
                        elements.albumArt.src = 'assets/icon128.png';
                    };
                }
                elements.trackTitle.textContent = track.title || 'No track playing';
                elements.trackArtist.textContent = track.artist || 'Unknown artist';
            } else {
                elements.albumArt.src = 'assets/icon128.png';
                elements.trackTitle.textContent = 'No track playing';
                elements.trackArtist.textContent = 'Unknown artist';
            }
        }).catch(error => {
            console.error('Error getting now playing:', error);
            elements.albumArt.src = 'assets/icon128.png';
            elements.trackTitle.textContent = 'Error fetching track info';
            elements.trackArtist.textContent = 'Please try again';
        });
    }

    function copyTrackInfo() {
        if (!state.currentTrack) return;
        const text = `${state.currentTrack.title} - ${state.currentTrack.artist}`;
        navigator.clipboard.writeText(text);
        showToast('Track info copied!');
    }

    function searchOnGenius() {
        if (!state.currentTrack) return;
        const query = encodeURIComponent(`${state.currentTrack.title} ${state.currentTrack.artist}`);
        window.open(`https://genius.com/search?q=${query}`, '_blank');
    }

    async function downloadAlbumArt() {
        if (!state.currentTrack?.albumArt) {
            showToast('No album art available to download');
            return;
        }

        try {
            if (!spotifyAPI.spotifyTab) {
                await spotifyAPI.findSpotifyTab();
                if (!spotifyAPI.spotifyTab) {
                    showToast('Could not find Spotify tab');
                    return;
                }
            }

            const [result] = await chrome.scripting.executeScript({
                target: { tabId: spotifyAPI.spotifyTab.id },
                func: () => {
                    const albumArtElements = Array.from(document.querySelectorAll("img[data-testid=cover-art-image]"));
                    if (albumArtElements.length === 0) {
                        const altElements = Array.from(document.querySelectorAll('img[alt=""]'))
                            .filter(img => img.src.includes('scdn.co/image'));
                        return altElements.map(img => ({
                            src: img.src,
                            width: img.naturalWidth,
                            height: img.naturalHeight
                        }));
                    }
                    return albumArtElements.map(img => ({
                        src: img.src,
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    }));
                }
            });

            const imageUrl = result?.result?.length > 0
                ? result.result.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0].src
                : state.currentTrack.albumArt;

            const response = await fetch(imageUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${state.currentTrack.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_album_art.${blob.type.split('/')[1] || 'jpg'}`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading album art:', error);
            showToast('Error downloading album art');
        }
    }

    function exportSettings() {
        chrome.storage.sync.get(null, settings => {
            const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'spoton-settings.json';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    function importSettings(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => {
            try {
                const settings = JSON.parse(e.target.result);
                chrome.storage.sync.set(settings, () => {
                    loadSettings();
                    showToast('Settings imported successfully!');
                });
            } catch (error) {
                showToast('Error importing settings: Invalid file format');
            }
        };
        reader.readAsText(file);
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    function initialize() {
        generateFeatureSections();
        loadSettings();
        loadTheme();
        setupEventListeners();
        updateNowPlaying();
        updateNowPlayingInterval = setInterval(updateNowPlaying, 1000);
    }

    initialize();

    // Cleanup on unload
    window.addEventListener('unload', () => {
        if (updateNowPlayingInterval) clearInterval(updateNowPlayingInterval);
    });
}); 