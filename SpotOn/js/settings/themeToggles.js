// Constants
const THEME_MODES = {
  AUTOMATIC: 'automatic',
  DARK: 'dark',
  LIGHT: 'light'
};

// DOM elements
const modeSelect = document.getElementById('mode-select');
const bodyElement = document.body;
const powerButton = document.getElementById('material-power-button');
const stateIndicator = document.getElementById('state-indicator');

// Theme management
const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const getSystemTheme = () => systemThemeMediaQuery.matches ? THEME_MODES.DARK : THEME_MODES.LIGHT;

const applyAndSaveMode = mode => {
  const effectiveMode = mode === THEME_MODES.AUTOMATIC ? getSystemTheme() : mode;
  bodyElement.setAttribute('data-theme', effectiveMode);
  localStorage.setItem('selectedMode', mode);
};

const initializeTheme = () => {
  const selectedMode = localStorage.getItem('selectedMode') || THEME_MODES.AUTOMATIC;
  applyAndSaveMode(selectedMode);
  modeSelect.value = selectedMode;
};

// Extension state management
const getExtensionEnabled = async () => {
  const { extensionEnabled } = await chrome.storage.sync.get('extensionEnabled');
  return extensionEnabled;
};

const updateUI = async () => {
  const isEnabled = await getExtensionEnabled();
  powerButton.querySelector('span').style.color = isEnabled ? 'green' : 'red';
  stateIndicator.textContent = `Extension is ${isEnabled ? 'Enabled' : 'Disabled'}`;
};

const toggleExtension = async () => {
  const newStatus = !(await getExtensionEnabled());
  await chrome.storage.sync.set({ extensionEnabled: newStatus });

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (activeTab?.id) {
    await chrome.tabs.sendMessage(activeTab.id, {
      txt: newStatus ? 'enable' : 'disable',
      bool: newStatus.toString()
    });
  }

  updateUI();
};

// Event listeners
modeSelect.addEventListener('change', () => applyAndSaveMode(modeSelect.value));

systemThemeMediaQuery.addEventListener('change', () => {
  if (modeSelect.value === THEME_MODES.AUTOMATIC) {
    applyAndSaveMode(THEME_MODES.AUTOMATIC);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'extension_state_changed') {
    updateUI();
  }
});

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  if (!powerButton || !stateIndicator) {
    console.error('Required elements not found');
    return;
  }

  initializeTheme();
  powerButton.addEventListener('click', toggleExtension);
  updateUI();
});
