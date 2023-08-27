window.onload = function () {
  const onoff = document.getElementById("toggle_button");
  let isEnabled = true;

  // Function to update button state
  function updateButtonState() {
    onoff.innerHTML = `<i class="fas ${
      isEnabled ? "fa-toggle-on" : "fa-toggle-off"
    }"></i> ${isEnabled ? "Enable" : "Disable"}`;
  }

  // Line to pull and update the stats
  function updateExtensionStatus(boolValue) {
    isEnabled = boolValue;
    updateButtonState();
  }

  // Bool and error logging
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { txt: "check", bool: "" },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error(
            "Error sending message to content script:",
            chrome.runtime.lastError
          );
        } else {
          if (response === undefined || response.status === undefined) {
            console.log("Content script response undefined");
          } else {
            isEnabled = response.status === 1;
            updateButtonState();
            console.log(isEnabled ? "Enabled" : "Disabled");
          }
        }
      }
    );
  });

  // Allows for the click button
  // Enabled or disable
  function toggleExtension() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const boolValue = !isEnabled;
      const toggleText = boolValue ? "enable" : "disable";

      chrome.tabs.sendMessage(
        tabs[0].id,
        { txt: toggleText, bool: boolValue.toString() },
        function (response) {
          if (chrome.runtime.lastError) {
            console.error(
              "Error sending message to content script:",
              chrome.runtime.lastError
            );
          } else {
            console.log("Response from content script:", response);
            if (response !== undefined && response.status !== undefined) {
              console.log("Content script response:", response.status);
            }
          }
        }
      );

      updateExtensionStatus(boolValue);
    });
  }

  // Click event listener to toggle the extension
  onoff.addEventListener("click", toggleExtension);
};
