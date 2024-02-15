document.addEventListener('DOMContentLoaded', async () => {
  const powerButton = document.getElementById('material-power-button');
  const stateIndicator = document.getElementById('state-indicator');

  if (!powerButton || !stateIndicator) {
    console.error('Required elements not found');
    return;
  }

  // Consolidate UI update logic
  const updateUI = async () => {
    const { extensionEnabled: isEnabled } = await chrome.storage.sync.get('extensionEnabled');
    const powerButtonIcon = powerButton.querySelector('span');
    powerButtonIcon.style.color = isEnabled ? 'green' : 'red';
    stateIndicator.textContent = isEnabled ? 'Extension is Enabled' : 'Extension is Disabled';
  };

  // Simplify message sending and UI update
  const toggleExtension = async () => {
    const { extensionEnabled: currentStatus } = await chrome.storage.sync.get('extensionEnabled');
    const newStatus = !currentStatus;
    await chrome.storage.sync.set({ extensionEnabled: newStatus });

    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab?.id) {
      await chrome.tabs.sendMessage(activeTab.id, { txt: newStatus ? "enable" : "disable", bool: newStatus.toString() });
    }

    updateUI();
  };

  powerButton.addEventListener('click', toggleExtension);

  // Handle external messages to update UI
  chrome.runtime.onMessage.addListener((request) => {
    if (request.message === 'extension_state_changed') {
      updateUI();
    }
  });

  // Initial UI update
  updateUI();
});