function triggerDownload(dataURL, filename) {
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function exportOptions() {
  try {
    const [syncOptions, localOptions] = await Promise.all([
      chrome.storage.sync.get(),
      chrome.storage.local.get()
    ]);
    const allOptions = { sync: syncOptions, local: localOptions };
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(allOptions))}`;
    triggerDownload(dataStr, "SpotOn_Options.json");
  } catch (error) {
    console.error("Error during export:", error);
    alert("Error exporting options.");
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
      importedOptions.sync ? chrome.storage.sync.set(importedOptions.sync) : null,
      importedOptions.local ? chrome.storage.local.set(importedOptions.local) : null
    ]);
    alert("All options imported successfully!");
  } catch (error) {
    console.error("Error during import:", error);
    alert("Error importing options. Please ensure the selected file is a valid JSON file.");
  }
}

document.getElementById('exportOptionsButton')?.addEventListener('click', exportOptions);
document.getElementById('importOptionsButton')?.addEventListener('click', () => {
  const importInput = document.getElementById('importOptionsInput');
  if (importInput) {
    importInput.click();
  }
});
document.getElementById('importOptionsInput')?.addEventListener('change', importOptions);