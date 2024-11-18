console.log('import.js loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');

  const exportButton = document.getElementById('exportOptionsButton');
  const importButton = document.getElementById('importOptionsButton');
  const importInput = document.getElementById('importOptionsInput');

  console.log('Export button:', exportButton);
  console.log('Import button:', importButton);
  console.log('Import input:', importInput);

  if (exportButton) {
    exportButton.addEventListener('click', () => {
      console.log('Export button clicked');
      exportOptions();
    });
  } else {
    console.error('Export button not found');
  }

  if (importButton && importInput) {
    importButton.addEventListener('click', () => {
      console.log('Import button clicked');
      importInput.click();
    });
    importInput.addEventListener('change', (event) => {
      console.log('Import input changed');
      importOptions(event);
    });
  } else {
    console.error('Import button or input not found');
  }
});

// Utility function for downloading files
const triggerDownload = (data, filename, type = 'application/json') => {
  console.log('Triggering download:', filename);
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Export options function
const exportOptions = async () => {
  console.log('Exporting options');
  try {
    const [sync, local] = await Promise.all([
      chrome.storage.sync.get(),
      chrome.storage.local.get()
    ]);
    console.log('Sync data:', sync);
    console.log('Local data:', local);
    triggerDownload(JSON.stringify({ sync, local }), 'SpotOn_Options.json');
    alert('Options exported successfully.');
  } catch (error) {
    console.error('Export Error:', error);
    alert('Failed to export options. See console for details.');
  }
};

// Import options function
const importOptions = async (event) => {
  console.log('Importing options');
  const file = event.target.files[0];
  if (!file) {
    alert('No file selected for import.');
    return;
  }

  try {
    const fileContent = await file.text();
    console.log('File content:', fileContent);
    const { sync, local } = JSON.parse(fileContent);
    await Promise.all([
      sync && chrome.storage.sync.set(sync),
      local && chrome.storage.local.set(local)
    ]);
    updateUI(sync);
    if (typeof window.saveOptions === 'function') {
      window.saveOptions();
    } else {
      console.error('saveOptions function not found');
    }
    alert('Options imported successfully.');
  } catch (error) {
    console.error('Import Error:', error);
    alert('Failed to import options. Check console for details.');
  }
};

// Update UI function
const updateUI = (settings) => {
  console.log('Updating UI with settings:', settings);
  Object.entries(settings).forEach(([key, value]) => {
    const element = document.getElementById(key);
    if (element?.type === 'checkbox') {
      element.checked = value;
    }
  });
};
