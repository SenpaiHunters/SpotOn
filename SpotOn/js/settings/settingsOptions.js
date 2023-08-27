document.addEventListener("DOMContentLoaded", function () {
  const customOptionInputs = [
    "borderRadiusInput",
    "paddingInput",
    "heightInput",
    "widthInput",
  ];

  const customLyricsInputs = [
    "lpaddingInput",
    "lheightInput",
    "lwidthInput",
    "lcolorInput",
    "lfontInput",
  ];

  const nowPlayingViewInputs = [
    "nowPlayingViewColorInput",
    "nowPlayingViewImageInput",
    "nowPlayingViewBorderRadiusInput",
    "nowPlayingViewHeightInput",
  ];

  const progressBarSettingsInputs = [
    "pColorInput",
    "pBGColorInput",
    "pAFGColorInput",
    "pFGColorInput",
  ];

  // Retrieve saved options from Chrome storage
  chrome.storage.sync.get(
    [
      "customOptions",
      "customColor",
      "customLyrics",
      "nowPlayingView",
      "progressBarSettings",
    ],
    function (obj) {
      let customOptions = obj.customOptions;
      let customColor = obj.customColor;
      let customLyrics = obj.customLyrics;
      let nowPlayingView = obj.nowPlayingView;
      let progressBarSettings = obj.progressBarSettings;

      // Set the option input values if they exist
      customOptionInputs.forEach((inputId) => {
        const input = document.getElementById(inputId);
        if (customOptions && customOptions[inputId]) {
          input.value = customOptions[inputId];
        }
        input.addEventListener("input", function () {
          saveCustomOptions(inputId, input.value);
        });
      });

      // Set the color input value if it exists
      const colorInput = document.getElementById("colorInput");
      if (customColor) {
        colorInput.value = customColor;
        updateColorPreview("colorPreview", customColor);
      }
      colorInput.addEventListener("input", function () {
        const colorValue = colorInput.value;
        updateColorPreview("colorPreview", colorValue);
        saveCustomColor(colorValue);
      });

      // Set the lyrics input values if they exist
      customLyricsInputs.forEach((inputId) => {
        const input = document.getElementById(inputId);
        if (customLyrics && customLyrics[inputId]) {
          input.value = customLyrics[inputId];
        }
        input.addEventListener("input", function () {
          saveCustomLyricsOption(inputId, input.value);
          updateColorPreview("lcolorPreview", input.value);
        });
      });

      // Set Now Playing View options if they exist
      nowPlayingViewInputs.forEach((inputId) => {
        const input = document.getElementById(inputId);
        if (nowPlayingView && nowPlayingView[inputId]) {
          input.value = nowPlayingView[inputId];
        }
        input.addEventListener("input", function () {
          saveNowPlayingViewOption(inputId, input.value);
          updateColorPreview("nowPlayingViewColorPreview", input.value);
        });
      });

      // Set progress bar settings if they exist
      progressBarSettingsInputs.forEach((inputId) => {
        const input = document.getElementById(inputId);
        if (progressBarSettings && progressBarSettings[inputId]) {
          input.value = progressBarSettings[inputId];
        }
        input.addEventListener("input", function () {
          saveProgressBarSetting(inputId, input.value);
          // Update any previews or UI elements related to progress bar settings
        });
      });

      // Update the color previews for lyrics and now playing view
      updateColorPreview("lcolorPreview", customLyrics.lcolorInput);
      updateColorPreview(
        "nowPlayingViewColorPreview",
        nowPlayingView.nowPlayingViewColorInput
      );
    }
  );
});

function saveCustomOptions(inputId, value) {
  chrome.storage.sync.get("customOptions", function (obj) {
    let customOptions = obj.customOptions || {};
    customOptions[inputId] = value;
    chrome.storage.sync.set({ customOptions });
  });
}

function saveCustomColor(colorValue) {
  chrome.storage.sync.set({ customColor: colorValue }, function () {
    console.log("Custom color saved:", colorValue);
  });
}

function saveCustomLyricsOption(inputId, value) {
  chrome.storage.sync.get("customLyrics", function (obj) {
    let customLyrics = obj.customLyrics || {};
    customLyrics[inputId] = value;
    chrome.storage.sync.set({ customLyrics });
  });
}

// Function to save progress bar settings
function saveProgressBarSetting(inputId, value) {
  chrome.storage.sync.get("progressBarSettings", function (obj) {
    let progressBarSettings = obj.progressBarSettings || {};
    progressBarSettings[inputId] = value;
    chrome.storage.sync.set({ progressBarSettings });
  });
}

function saveNowPlayingViewOption(inputId, value) {
  chrome.storage.sync.get("nowPlayingView", function (obj) {
    let nowPlayingView = obj.nowPlayingView || {};
    nowPlayingView[inputId] = value;
    chrome.storage.sync.set({ nowPlayingView });
  });
}

function updateColorPreview(previewId, value) {
  const preview = document.getElementById(previewId);

  // Clear previous styles
  preview.style.background = "";
  preview.style.backgroundImage = "";
  preview.style.backgroundRepeat = "";
  preview.style.backgroundSize = "";
  preview.style.backgroundAttachment = "";
  preview.style.backgroundBlendMode = "";
  preview.style.width = "";
  preview.style.height = "";

  // Check if the value is a gradient or image URL
  if (
    value.startsWith("linear-gradient") ||
    value.startsWith("radial-gradient")
  ) {
    preview.style.background = value;
    preview.style.width = "calc(30vw)"; // Adjust the width as needed
    preview.style.height = "calc(30vh)"; // Adjust the height as needed
  } else if (value.match(/\.(jpeg|jpg|png|gif)$/i)) {
    preview.style.backgroundImage = `url("${value}")`;
    preview.style.backgroundRepeat = "no-repeat";
    preview.style.backgroundSize = "contain";
    preview.style.backgroundAttachment = "inherit";
    preview.style.backgroundBlendMode = "soft-light";
    preview.style.width = "calc(30vw)"; // Adjust the width as needed
    preview.style.height = "calc(30vh)"; // Adjust the height as needed
    preview.style.marginTop = "10px";
    preview.style.border = "border: 1px solid #000";
  } else {
    preview.style.backgroundColor = value;
    preview.style.width = "100px";
    preview.style.height = "100px"; // Adjust the height as needed
    preview.style.marginLeft = "40px";
    preview.style.marginTop = "10px";
    preview.style.border = "border: 1px solid #000";
  }

  // Save the preview value to Chrome storage
  chrome.storage.sync.set({ [previewId]: value });
}
