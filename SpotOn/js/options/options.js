// Set a constant for the delay before clearing status messages
const STATUS_DELAY = 750;

// Function to set a status message and hide it after a delay
function setStatusMessage(message, success = true) {
  const status = document.getElementById("status");
  // Set the message and apply appropriate CSS classes for styling
  status.textContent = message;
  status.classList.remove("success", "error");
  status.classList.add(success ? "success" : "error");

  // Clear the status message after a delay
  setTimeout(() => {
    status.textContent = "";
  }, STATUS_DELAY);
}

// Asynchronous function to save options to Chrome storage
async function saveOptions() {
  // Show a status message indicating the saving process
  setStatusMessage("Saving options...");

  // Get the selected theme value from the HTML element
  const themeSelected = document.getElementById("themeSelector").value;

  try {
    // Store the selected theme value in Chrome storage using a Promise
    await new Promise((resolve) => {
      chrome.storage.sync.set({ themeSelected }, resolve);
    });

    // Update the status message to indicate successful options saving
    setStatusMessage("Options saved.", true);

    // Reload the active tab to apply changes immediately
    reloadActiveTab();
    console.log("Options saved:", { themeSelected });
  } catch (error) {
    // If an error occurs, show an error status message and log the error
    setStatusMessage("Failed to save options.", false);
    console.error("Error saving options:", error);
  }
}

// Function to reload the currently active tab
function reloadActiveTab() {
  // Query for the active tab and update its URL to trigger a reload
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
  });
}

// Function to restore options from Chrome storage
function restoreOptions() {
  // Show a status message indicating the loading process
  setStatusMessage("Loading options...");

  // Retrieve the stored theme selection from Chrome storage
  chrome.storage.sync.get({ themeSelected: "default.css" }, (items) => {
    // Set the stored theme value in the theme selector element
    document.getElementById("themeSelector").value = items.themeSelected;

    // Update the status message to indicate successful options loading
    setStatusMessage("Options loaded.", true);
    console.log("Restoring options:", items);
  });
}

// Function to open a new tab with the specified URL
function openNewTab(url) {
  window.open(url, "_blank");
}

// When the DOM content is loaded, restore options from storage
document.addEventListener("DOMContentLoaded", restoreOptions);

// Attach an event listener to the "Save" button to trigger options saving
document.getElementById("save").addEventListener("click", saveOptions);

// Attach event listeners to various buttons to perform specific actions
document.getElementById("settingsButton").addEventListener("click", () => {
  openNewTab("settings.html");
});

document.getElementById("colorPickerButton").addEventListener("click", () => {
  // Redirect to the "color.html" page
  window.location.href = "color.html";
});

document.getElementById("colorPageButton").addEventListener("click", () => {
  // Open a new tab to the "colorOptions.html" page
  openNewTab("colorOptions.html");
});
