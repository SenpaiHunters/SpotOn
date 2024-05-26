function triggerDownload(jsonData, filename) {
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function exportOptions() {
  try {
    const [syncOptions, localOptions] = await Promise.all([
      chrome.storage.sync.get(),
      chrome.storage.local.get()
    ]);
    const allOptions = { sync: syncOptions, local: localOptions };
    triggerDownload(JSON.stringify(allOptions), "SpotOn_Options.json");
    alert("Exporting options...");
  } catch (error) {
    console.error("Export Error:", error);
    alert("Failed to export options. See console for details.");
  }
}

async function importOptions(event) {
  const file = event.target.files[0];
  if (!file) {
    alert("No file selected for import.");
    return;
  }

  try {
    const text = await file.text();
    const importedOptions = JSON.parse(text);
    await Promise.all([
      importedOptions.sync && chrome.storage.sync.set(importedOptions.sync),
      importedOptions.local && chrome.storage.local.set(importedOptions.local)
    ]);
    updateUI(importedOptions.sync); // Update UI with the new settings
    window.saveOptions(); // Call saveOptions from settings.js
  } catch (error) {
    console.error("Import Error:", error);
    alert("Failed to import options. Check console for details.");
  }
}

function updateUI(settings) {
  for (const key in settings) {
    const element = document.getElementById(key);
    if (element && element.type === 'checkbox') {
      element.checked = settings[key];
    }
  }
}

document.getElementById('exportOptionsButton').addEventListener('click', exportOptions);
document.getElementById('importOptionsButton').addEventListener('click', () => {
  document.getElementById('importOptionsInput').click();
});
document.getElementById('importOptionsInput').addEventListener('change', importOptions);