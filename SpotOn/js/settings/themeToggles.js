const modeSelect = document.getElementById("mode-select");
const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const bodyElement = document.body;

const getSystemTheme = () => systemThemeMediaQuery.matches ? "dark" : "light";

const applyAndSaveMode = mode => {
  const effectiveMode = mode === "automatic" ? getSystemTheme() : mode;
  bodyElement.setAttribute("data-theme", effectiveMode);
  localStorage.setItem("selectedMode", mode);
}

const initializeTheme = () => {
  const selectedMode = localStorage.getItem("selectedMode") || "automatic";
  applyAndSaveMode(selectedMode);
  modeSelect.value = selectedMode;
}

initializeTheme();

modeSelect.onchange = () => applyAndSaveMode(modeSelect.value);

systemThemeMediaQuery.addEventListener('change', () => {
  if (modeSelect.value === "automatic") {
    applyAndSaveMode("automatic");
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  const powerButton = document.getElementById('material-power-button');
  const stateIndicator = document.getElementById('state-indicator');

  if (!powerButton || !stateIndicator) {
    console.error('Required elements not found');
    return;
  }

  const getExtensionEnabled = async () => {
    const { extensionEnabled } = await chrome.storage.sync.get('extensionEnabled');
    return extensionEnabled;
  };

  const updateUI = async () => {
    const isEnabled = await getExtensionEnabled();
    powerButton.querySelector('span').style.color = isEnabled ? 'green' : 'red';
    stateIndicator.textContent = isEnabled ? 'Extension is Enabled' : 'Extension is Disabled';
  };

  const toggleExtension = async () => {
    const currentStatus = await getExtensionEnabled();
    const newStatus = !currentStatus;
    await chrome.storage.sync.set({ extensionEnabled: newStatus });

    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab?.id) {
      await chrome.tabs.sendMessage(activeTab.id, { txt: newStatus ? "enable" : "disable", bool: newStatus.toString() });
    }

    updateUI();
  };

  powerButton.onclick = toggleExtension;

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'extension_state_changed') {
      updateUI();
    }
  });

  updateUI();
});