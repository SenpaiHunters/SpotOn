document.addEventListener("DOMContentLoaded", function () {
  // Function to apply the theme color to CSS variables
  function applyThemeColor(themeColor) {
    document.documentElement.style.setProperty("--theme-color", themeColor);
  }

  // Function to apply the opposite theme color to CSS variables
  function applyOppositeThemeColor(oppositeColor) {
    document.documentElement.style.setProperty(
      "--opposite-color",
      oppositeColor
    );
  }

  // Function to reset the background color to default
  function clearBackgroundColor() {
    const defaultBackgroundColor = "#ffffff"; // Change this to your desired default background color
    applyThemeColor(defaultBackgroundColor);

    // Save the default background color to localStorage
    localStorage.setItem("themeColor", defaultBackgroundColor);

    // Update the color picker value to the default color
    colorPicker.value = defaultBackgroundColor;
    manualColorInput.value = defaultBackgroundColor;

    // Reset the opposite color theme
    applyOppositeThemeColor("#000000"); // You can set the opposite color as needed
  }

  // Function to calculate the opposite color
  function calculateOppositeColor(color) {
    // Basic inversion of RGB values
    if (color.startsWith("#")) {
      // Hex color
      const hex = color.slice(1); // Remove the #
      const invertedHex = (0xffffff ^ parseInt(hex, 16))
        .toString(16)
        .padStart(6, "0");
      return `#${invertedHex}`;
    } else if (color.startsWith("rgb(")) {
      // RGB color
      const rgb = color.match(/\d+/g).map(Number);
      const invertedRgb = rgb.map((value) => 255 - value);
      return `rgb(${invertedRgb.join(", ")})`;
    }
    // Add support for other color formats as needed

    // Default to black if the format is not recognized
    return "#000000";
  }

  // Get the color picker element
  const colorPicker = document.getElementById("color-picker");

  // Add an event listener to detect changes in the color picker
  colorPicker.addEventListener("input", (event) => {
    // Get the chosen color
    const chosenColor = event.target.value;

    // Calculate the opposite color (you can use a function for this)
    const oppositeColor = calculateOppositeColor(chosenColor);

    // Save the chosen color and its opposite to localStorage
    localStorage.setItem("themeColor", chosenColor);
    localStorage.setItem("oppositeColor", oppositeColor);

    // Apply the chosen color immediately
    applyThemeColor(chosenColor);
    applyOppositeThemeColor(oppositeColor);

    // Update the manual color input value
    manualColorInput.value = chosenColor;
  });

  // Manual color input method
  const manualColorInput = document.getElementById("manual-color-input");
  const applyManualColorButton = document.getElementById("apply-manual-color");

  applyManualColorButton.addEventListener("click", () => {
    const manualColor = manualColorInput.value;

    // Function to validate and apply the color
    const applyColor = (color) => {
      // Save the manual color to localStorage
      localStorage.setItem("themeColor", color);

      // Calculate the opposite color (you can use a function for this)
      const oppositeColor = calculateOppositeColor(color);
      localStorage.setItem("oppositeColor", oppositeColor);

      // Apply the color and its opposite immediately
      applyThemeColor(color);
      applyOppositeThemeColor(oppositeColor);
    };

    // Check for valid color formats including gradients
    if (
      /^#([0-9A-Fa-f]{3}){1,2}$/.test(manualColor) ||
      /^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/.test(manualColor) ||
      /^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, (0(\.\d{1,2})?|1(\.0{1,2})?)\)$/.test(
        manualColor
      ) ||
      /^[a-zA-Z]+$/.test(manualColor) || // Check for color names
      /^(linear|radial)-gradient\(/.test(manualColor) // Check for gradients
    ) {
      applyColor(manualColor);
    } else {
      console.error(
        "Invalid color format. Please use hex, RGB, RGBA, color names, or gradient."
      );
      alert(
        "Invalid color format. Please use hex, RGB, RGBA, color names, or gradient."
      );
    }
  });

  // Get the "Clear Background" button by its ID
  const clearBackgroundButton = document.getElementById("clear-background");

  // Add a click event listener to the "Clear Background" button
  clearBackgroundButton.addEventListener("click", clearBackgroundColor);

  // On page load, retrieve the saved theme color and its opposite from localStorage and apply them
  const savedThemeColor = localStorage.getItem("themeColor");
  const savedOppositeColor = localStorage.getItem("oppositeColor");
  if (savedThemeColor && savedOppositeColor) {
    applyThemeColor(savedThemeColor);
    applyOppositeThemeColor(savedOppositeColor);
    colorPicker.value = savedThemeColor; // Set the color picker value
    manualColorInput.value = savedThemeColor; // Set the manual color input value
  }
});
