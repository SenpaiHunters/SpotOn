// Function to open the color history page in a new tab or window
function openColorHistoryPage() {
  window.open("colorHistory.html", "_blank");
}

// Function to navigate back in history
function goBack() {
  window.history.back();
}

// Event listener for the "View Color History" button
const viewHistoryButton = document.getElementById("viewHistoryButton");
viewHistoryButton.addEventListener("click", openColorHistoryPage);

// Event listener for the "Back" button
const backButton = document.getElementById("backButton"); // Replace with actual back button ID
backButton.addEventListener("click", goBack);

// Function to open the color options page in a new tab or window
function openColorOptionsPage() {
  window.open("colorOptions.html", "_blank");
}

// Event listener for the "Color Options" button
const colorOptionsButton = document.getElementById("colorOptionsButton");
colorOptionsButton.addEventListener("click", openColorOptionsPage);

// color.js
document.addEventListener("DOMContentLoaded", function () {
  const colorBox = document.getElementById("colorBox");
  const colorValue = document.getElementById("colorValue");
  const colorFormatSelect = document.getElementById("colorFormat");
  let selectedColor = "#FFFFFF";

  const colorInput = document.getElementById("colorInput");
  colorInput.addEventListener("input", handleColorInputChange);

  function handleColorInputChange() {
    selectedColor = colorInput.value;
    colorBox.style.backgroundColor = selectedColor;
    updateColorValue(selectedColor);
    saveColorToStorage(selectedColor);
  }

  colorFormatSelect.addEventListener("change", handleColorFormatChange); // Updated function name

  function handleColorFormatChange() {
    // Updated function name
    updateColorValue(selectedColor);
  }

  const copyButton = document.getElementById("copyButton");
  copyButton.addEventListener("click", handleCopyButtonClick);

  function handleCopyButtonClick() {
    const colorFormat = colorFormatSelect.value;
    const formattedColor = getColorValue(selectedColor, colorFormat);

    copyToClipboard(formattedColor);
    alert("Color copied to clipboard: " + formattedColor);

    saveColorToStorage(selectedColor);
    displaySavedColors();
  }

  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  // Function to convert hex to RGB format
  function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Function to convert hex to RGBA format with opacity set to 1
  function hexToRGBA(hex) {
    return `rgba(${parseInt(
      hex.slice(1, 3),
      16
    )}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, 1)`;
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

    // Convert to percentage and round to 2 decimal places
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  // Function to get the color value in the specified format
  function getColorValue(color, format) {
    switch (format) {
      case "hex":
        return color;
      case "rgb":
        return hexToRGB(color);
      case "rgba":
        return hexToRGBA(color);
      case "hsl":
        return hexToHSL(color);
      default:
        return color;
    }
  }

  // Function to update the color value display based on the selected format
  function updateColorValue(color) {
    const colorFormat = colorFormatSelect.value;
    const formattedColor = getColorValue(color, colorFormat);

    colorValue.textContent = formattedColor;
    // colorValue.style.color = formattedColor;
    // colorValue.style.backgroundColor = formattedColor;
  }

  // Function to save the selected color to localStorage
  function saveColorToStorage(color) {
    let savedColors = JSON.parse(localStorage.getItem("savedColors")) || [];
    savedColors.push(color);
    localStorage.setItem("savedColors", JSON.stringify(savedColors));
  }

  // Function to display the saved colors from localStorage
  function displaySavedColors() {
    const savedColors = localStorage.getItem("savedColors");
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      const savedColorsList = document.getElementById("savedColorsList");
      savedColorsList.innerHTML = "";

      parsedColors.forEach((color) => {
        const colorItem = document.createElement("li");
        colorItem.textContent = color;
        savedColorsList.appendChild(colorItem);
      });
    }
  }

  // Update the initial color value display on page load
  updateColorValue(selectedColor);

  // Display the saved colors on page load
  displaySavedColors();
});
