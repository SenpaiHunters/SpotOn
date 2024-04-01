function triggerDownload(jsonData, filename) {
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url); // Clean up the object URL
}

async function exportOptions() {
  try {
    const [syncOptions, localOptions] = await Promise.all([
      chrome.storage.sync.get(),
      chrome.storage.local.get()
    ]);
    const allOptions = { sync: syncOptions, local: localOptions };
    triggerDownload(JSON.stringify(allOptions), "SpotOn_Options.json");
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
    const promises = [];
    if (importedOptions.sync) {
      promises.push(chrome.storage.sync.set(importedOptions.sync));
    }
    if (importedOptions.local) {
      promises.push(chrome.storage.local.set(importedOptions.local));
    }
    await Promise.all(promises);
    alert("All options imported successfully!");
    window.location.reload();
  } catch (error) {
    console.error("Error during import:", error);
    alert("Error importing options. Please check the console for more details.");
  }
}

document.getElementById('exportOptionsButton').addEventListener('click', exportOptions);
document.getElementById('importOptionsButton').addEventListener('click', () => {
  document.getElementById('importOptionsInput').click();
});
document.getElementById('importOptionsInput').addEventListener('change', importOptions);