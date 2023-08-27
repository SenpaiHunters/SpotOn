// Inside colorHistory.html script
const backToMainPageButton = document.getElementById("backToMainPageButton");
backToMainPageButton.addEventListener("click", function () {
  window.close(); // Close the new tab or window
});

document.addEventListener("DOMContentLoaded", function () {
  const colorViewerContainer = document.getElementById("colorViewerContainer");
  const removeAllButton = document.getElementById("removeAllButton");
  const backButton = document.getElementById("backButton");
  const colorFormatSelect = document.getElementById("colorFormat");
  const totalColorsSavedMessage = document.getElementById(
    "totalColorsSavedMessage"
  );

  class ColorHistory {
    constructor() {
      this.savedColors = this.getSavedColors();
      this.displaySavedColors(); // Automatically display saved colors on page load
    }
    getSavedColors() {
      const savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
      return savedColors;
    }

    addColor(color) {
      this.savedColors.push(color);
      localStorage.setItem("savedColors", JSON.stringify(this.savedColors));
    }

    removeColor(color) {
      this.savedColors = this.savedColors.filter((c) => c !== color);
      localStorage.setItem("savedColors", JSON.stringify(this.savedColors));
    }

    removeAllColors() {
      localStorage.removeItem("savedColors");
      this.savedColors = [];
    }

    displaySavedColors() {
      colorViewerContainer.innerHTML = ""; // Clear the container before adding color viewers

      if (this.savedColors.length === 0) {
        // If no colors are saved, display a message
        colorViewerContainer.innerHTML = "<p>No colors saved yet.</p>";
      } else {
        this.savedColors.forEach((color) => this.createColorViewer(color));
      }
    }

    createColorViewer(color) {
      const colorViewer = document.createElement("div");
      colorViewer.className = "color-viewer";
      colorViewer.style.backgroundColor = color;

      const colorValue = document.createElement("span");
      colorValue.textContent = color;
      colorValue.style.color = getContrastingTextColor(color);
      colorViewer.appendChild(colorValue);

      const copyButton = this.createCopyButton(color);
      const removeButton = this.createRemoveButton(color);

      colorViewer.appendChild(copyButton);
      colorViewer.appendChild(removeButton);

      colorViewerContainer.appendChild(colorViewer);
    }

    createCopyButton(color) {
      const copyButton = document.createElement("button");
      copyButton.textContent = "Copy";
      copyButton.addEventListener("click", () => this.copyToClipboard(color));
      return copyButton;
    }

    createRemoveButton(color) {
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        this.removeColor(color);
        this.displaySavedColors();
      });
      return removeButton;
    }

    // Event delegation for copy and remove buttons
    handleButtonClicks(event) {
      const target = event.target;
      if (target.classList.contains("copy-button")) {
        const color = target.dataset.color;
        this.copyToClipboard(color);
      } else if (target.classList.contains("remove-button")) {
        const color = target.dataset.color;
        this.removeColor(color);
        this.displaySavedColors();
      }
    }

    getTotalColorsSaved() {
      return this.savedColors.length;
    }

    displaySavedColors() {
      colorViewerContainer.innerHTML = ""; // Clear the container before adding color viewers

      if (this.savedColors.length === 0) {
        // If no colors are saved, display a message
        const noColorsMessage = document.createElement("p");
        noColorsMessage.textContent = "No colors saved yet.";
        colorViewerContainer.appendChild(noColorsMessage);
      } else {
        // Display the total colors saved
        totalColorsSavedMessage.textContent = `Total Colors Saved: ${this.getTotalColorsSaved()}`;

        // Create color viewers for each saved color
        this.savedColors.forEach((color) => this.createColorViewer(color));
      }
    }

    // Function to update the text color when the format changes
    updateTextColor(color, format) {
      if (format === "hex") {
        return getContrastingTextColor(color);
      } else if (format === "rgb") {
        const { r, g, b } = extractRGBValues(color);
        return getContrastingTextColor(r, g, b);
      } else if (format === "rgba") {
        const { r, g, b } = extractRGBValues(color);
        return getContrastingTextColor(r, g, b);
      } else if (format === "hsl") {
        const { r, g, b } = extractRGBValues(color);
        return getContrastingTextColor(r, g, b);
      }
      return "#ffffff"; // Default to white color
    }

    copyToClipboard(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    copyColorInFormat(color, format) {
      let convertedColor;
      if (format === "hex") {
        convertedColor = color;
      } else if (format === "rgb") {
        convertedColor = hexToRGB(color);
      } else if (format === "rgba") {
        convertedColor = hexToRGBA(color);
      } else if (format === "hsl") {
        convertedColor = hexToHSL(color);
      }

      this.copyToClipboard(convertedColor);
    }
  }

  const colorHistory = new ColorHistory();

  // Function to get the color value from the URL query parameters
  function getColorFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("color");
  }

  // Function to convert hex to RGB format
  function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Function to calculate the relative luminance of a color
  function calculateRelativeLuminance(r, g, b) {
    const sRGB = [r / 255, g / 255, b / 255];
    for (let i = 0; i < sRGB.length; i++) {
      if (sRGB[i] <= 0.03928) {
        sRGB[i] /= 12.92;
      } else {
        sRGB[i] = Math.pow((sRGB[i] + 0.055) / 1.055, 2.4);
      }
    }
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  }

  // Function to choose appropriate text color based on background color
  function getContrastingTextColor(color) {
    const { r, g, b } = extractRGBValues(color);
    const luminance = calculateRelativeLuminance(r, g, b);
    return luminance > 0.179 ? "#000000" : "#ffffff";
  }

  // Function to extract RGB values from color string
  function extractRGBValues(color) {
    if (color.startsWith("#")) {
      // Hex format: #RRGGBB
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return { r, g, b };
    } else {
      // RGB or RGBA format: rgb(R, G, B) or rgba(R, G, B, A)
      const values = color.match(/\d+/g);
      const r = parseInt(values[0]);
      const g = parseInt(values[1]);
      const b = parseInt(values[2]);
      return { r, g, b };
    }
  }

  // Function to convert hex to HSL format
  function hexToHSL(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return `hsl(${h * 360}, ${s * 100}%, ${l * 100}%)`;
  }

  // Function to get the color value from the URL query parameters
  function getColorFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("color");
  }

  // Back button functionality
  backButton.addEventListener("click", function () {
    // Navigate back to the previous page (color.html)
    window.history.back();
  });

  // Remove all button functionality
  removeAllButton.addEventListener("click", function () {
    colorHistory.removeAllColors();
    colorHistory.displaySavedColors(); // Auto-update the color history display
  });

  // Event listener for the "Copy Color As" select element
  colorFormatSelect.addEventListener("change", function () {
    const selectedFormat = colorFormatSelect.value;
    const currentColor = colorViewerContainer.style.backgroundColor;
    const textColor = colorHistory.updateTextColor(
      currentColor,
      selectedFormat
    );
    colorViewerContainer.querySelector("span").style.color = textColor;
    colorHistory.copyColorInFormat(currentColor, selectedFormat);
  });

  // Update the initial color value display on page load
  const selectedColor = getColorFromURL();
  if (selectedColor) {
    colorHistory.addColor(selectedColor);
  }
});
