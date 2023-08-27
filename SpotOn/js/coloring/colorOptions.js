// Inside colorHistory.html script
const backToMainPageButton = document.getElementById("backToMainPageButton");
backToMainPageButton.addEventListener("click", function () {
  window.close(); // Close the new tab or window
});

// Function to convert a HEX color code to RGB format
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `RGB(${r}, ${g}, ${b})`;
}

// Function to convert a HEX color code to RGBA format with a specified alpha value
function hexToRgba(hex, alpha) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `RGBA(${r}, ${g}, ${b}, ${alpha})`;
}

// Function to convert a HEX color code to HSL format
function hexToHsl(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const rNormalized = r / 255;
  const gNormalized = g / 255;
  const bNormalized = b / 255;

  const maxColor = Math.max(rNormalized, gNormalized, bNormalized);
  const minColor = Math.min(rNormalized, gNormalized, bNormalized);
  let h, s, l;

  if (maxColor === minColor) {
    h = s = 0; // achromatic
  } else {
    const d = maxColor - minColor;
    s = l > 0.5 ? d / (2 - maxColor - minColor) : d / (maxColor + minColor);
    switch (maxColor) {
      case rNormalized:
        h =
          (gNormalized - bNormalized) / d + (gNormalized < bNormalized ? 6 : 0);
        break;
      case gNormalized:
        h = (bNormalized - rNormalized) / d + 2;
        break;
      case bNormalized:
        h = (rNormalized - gNormalized) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `HSL(${h}, ${s}%, ${l}%)`;
}

// Get references to HTML elements
const hexColorInput = document.getElementById("hexColor");
const conversionTypeSelect = document.getElementById("conversionType");
const colorBox = document.getElementById("colorBox");
const gradientColorsInput = document.getElementById("gradientColors");
const gradientDirectionSelect = document.getElementById("gradientDirection");
const gradientBox = document.getElementById("gradientBox");

// Function to update the color display box
function updateColorBox(color) {
  colorBox.style.backgroundColor = color;
}

// Function to update the gradient display box
function updateGradientBox(gradient) {
  gradientBox.style.backgroundImage = gradient;
}

// Function to convert a HEX color based on the conversion type and alpha value
function convertHexColor(hexColor, conversionType, alpha = 1) {
  if (conversionType === "rgb") {
    return hexToRgb(hexColor);
  } else if (conversionType === "rgba") {
    return hexToRgba(hexColor, alpha);
  } else if (conversionType === "hsl") {
    return hexToHsl(hexColor);
  }
  return hexColor; // Default case
}

// Function to update the color conversion result and display box
function updateColorConversionResult(convertedColor) {
  updateColorBox(convertedColor);
  document.getElementById("colorConversionResult").textContent = convertedColor;
}

// Function to update the gradient generation result and display box
function updateGradientGenerationResult(gradient) {
  updateGradientBox(gradient);
  document.getElementById("gradientGenerationResult").textContent = gradient;
}

// Event listener for HEX color input change
hexColorInput.addEventListener("input", () => {
  const hexColor = hexColorInput.value;
  const conversionType = conversionTypeSelect.value;
  const alpha = 0.5; // Default alpha value

  const convertedColor = convertHexColor(hexColor, conversionType, alpha);
  updateColorConversionResult(convertedColor);
});

// Event listener for conversion type change
conversionTypeSelect.addEventListener("change", () => {
  const hexColor = hexColorInput.value;
  const conversionType = conversionTypeSelect.value;
  const alpha = 0.5; // Default alpha value

  const convertedColor = convertHexColor(hexColor, conversionType, alpha);
  updateColorConversionResult(convertedColor);
});

// Event listener for gradient direction change
gradientDirectionSelect.addEventListener("change", () => {
  const gradientColors = gradientColorsInput.value.split(",");
  const gradientDirection = gradientDirectionSelect.value;

  const gradient = generateLinearGradient(gradientColors, gradientDirection);
  updateGradientGenerationResult(gradient);
});

// Event listener for gradient colors input change
gradientColorsInput.addEventListener("input", () => {
  const gradientColors = gradientColorsInput.value.split(",");
  const gradientDirection = gradientDirectionSelect.value;

  const gradient = generateLinearGradient(gradientColors, gradientDirection);
  updateGradientGenerationResult(gradient);
});

// Get references to copy buttons
const copyColorResultButton = document.getElementById("copyColorResult");
const copyGradientResultButton = document.getElementById("copyGradientResult");

// Event listener to copy color conversion result to clipboard
copyColorResultButton.addEventListener("click", () => {
  const colorConversionResult = document.getElementById(
    "colorConversionResult"
  ).textContent;
  copyToClipboard(colorConversionResult);
});

// Event listener to copy gradient generation result to clipboard
copyGradientResultButton.addEventListener("click", () => {
  const gradientGenerationResult = document.getElementById(
    "gradientGenerationResult"
  ).textContent;
  copyToClipboard(gradientGenerationResult);
});

// Default alpha value
const DEFAULT_ALPHA = 0.5;

// Function to copy text to clipboard
function copyToClipboard(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

// Function to generate linear gradient
function generateLinearGradient(colors, direction) {
  return `linear-gradient(${direction}, ${colors.join(", ")})`;
}

// Additional gradient options for the gradient generator
const gradientPresets = document.getElementById("gradientPresets");

gradientPresets.addEventListener("change", () => {
  const selectedPreset = gradientPresets.value;

  if (selectedPreset === "warm") {
    gradientColorsInput.value = "#FF4500, #FF6347, #FF7F50";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "cool") {
    gradientColorsInput.value = "#00BFFF, #87CEEB, #ADD8E6";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "rainbow") {
    gradientColorsInput.value =
      "#FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8B00FF";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "earth") {
    gradientColorsInput.value =
      "#008000, #ADFF2F, #FFFF00, #FFA500, #CD853F, #8B4513";
    gradientDirectionSelect.value = "to bottom";
  } else if (selectedPreset === "pastel") {
    gradientColorsInput.value =
      "#FFB6C1, #FFD700, #87CEEB, #98FB98, #DDA0DD, #FFA500";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "vibrant") {
    gradientColorsInput.value =
      "#FF5733, #FFC300, #85C1E9, #28B463, #7D3C98, #F1C40F";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "ocean") {
    gradientColorsInput.value =
      "#5DADE2, #76D7C4, #3498DB, #A569BD, #1ABC9C, #E74C3C";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "candy") {
    gradientColorsInput.value =
      "#FF1493, #FF69B4, #FFD700, #FFA500, #00FF00, #00FFFF";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "neon") {
    gradientColorsInput.value =
      "#FF00FF, #00FF00, #00FFFF, #FFD700, #FF4500, #FF1493";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "retro") {
    gradientColorsInput.value =
      "#FF3366, #33FFCC, #9933FF, #FFFF66, #FF6600, #33CC33";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "oceanBreeze") {
    gradientColorsInput.value =
      "#87CEEB, #D1DBBD, #F0FFF0, #77DD77, #6CC417, #4CC552";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "purpleDream") {
    gradientColorsInput.value =
      "#9400D3, #8A2BE2, #7B68EE, #483D8B, #4B0082, #8A2BE2";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "roseGold") {
    gradientColorsInput.value =
      "#B76E79, #E8A4A3, #F9D4D4, #FDE0E0, #FCF2F2, #EFD9D8";
    gradientDirectionSelect.value = "to right";
  } else if (selectedPreset === "azureSky") {
    gradientColorsInput.value =
      "#87CEEB, #D1DBBD, #F0FFF0, #77DD77, #6CC417, #E0FFFF";
    gradientDirectionSelect.value = "to right";
  }
  // Add more presets here...

  const gradient = generateLinearGradient(
    gradientColorsInput.value.split(","),
    gradientDirectionSelect.value
  );
  updateGradientGenerationResult(gradient);
});

// Additional gradient options for the gradient generator
const clearColorsButton = document.getElementById("clearColorsButton");

addColorButton.addEventListener("click", () => {
  const newColorInput = document.createElement("input");
  newColorInput.type = "color";
  gradientColorsInput.appendChild(newColorInput);
});

clearColorsButton.addEventListener("click", () => {
  gradientColorsInput.innerHTML = "";
});

// Additional options for the hex color converter
const alphaSlider = document.getElementById("alphaSlider");
const alphaValue = document.getElementById("alphaValue");

alphaSlider.addEventListener("input", () => {
  const alpha = alphaSlider.value;
  alphaValue.textContent = alpha;

  const convertedColor = convertHexColor(
    hexColorInput.value,
    conversionTypeSelect.value,
    alpha
  );
  updateColorConversionResult(convertedColor);
});

// Event listener for adding a custom color
addColorButton.addEventListener("click", () => {
  const customColor = addColorInput.value;
  gradientColors.push(customColor);

  gradientColorsInput.value = gradientColors.join(",");
  const gradientDirection = gradientDirectionSelect.value;

  const gradient = generateLinearGradient(gradientColors, gradientDirection);
  updateGradientGenerationResult(gradient);
});

// Event listener for clearing colors
clearColorsButton.addEventListener("click", () => {
  gradientColors = [];
  gradientColorsInput.value = "";
  gradientBox.style.backgroundImage = "";
  gradientBox.style.backgroundColor = "";
  gradientGenerationResult.textContent = "";
});

// Event listener for generating gradient with custom options
generateGradientButton.addEventListener("click", () => {
  const customGradientDirection = customGradientDirectionInput.value + "deg";
  const useColorInterpolation = colorInterpolationCheckbox.checked;
  const useRepeatingGradient = repeatingGradientCheckbox.checked;

  const gradient = generateCustomGradient(
    gradientColors,
    customGradientDirection,
    useColorInterpolation,
    useRepeatingGradient
  );

  updateGradientGenerationResult(gradient);
});
