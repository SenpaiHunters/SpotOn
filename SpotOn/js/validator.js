const stylePreviewBox = document.getElementById("stylePreviewBox");
const cssInput = document.getElementById("cssInput");

// Use a timeout variable to manage the delayed update
let timeoutId;

// Event listener for input changes
cssInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(updateStylePreview, 900); // Adjust the delay as needed (in milliseconds)
});

// Event listener for the "Delete" keydown and keyup events
cssInput.addEventListener("keydown", (event) => {
  if (event.key === "Delete") {
    isClearing = true;
  }
});

cssInput.addEventListener("keyup", (event) => {
  if (event.key === "Delete") {
    isClearing = false;
    updateStylePreview();
  }
});

// Create and add the "Clear" button dynamically
const clearButton = document.createElement("button");
clearButton.textContent = "Clear";
clearButton.addEventListener("click", () => {
  cssInput.value = "";
  isClearing = true;
  updateStylePreview();
  isClearing = false;
});
cssInput.parentNode.insertBefore(clearButton, cssInput.nextSibling);

// Function to update the style preview
function updateStylePreview() {
  const cssStyles = cssInput.value;
  stylePreviewBox.style.cssText = ""; // Clear previous styles

  // Consolidated the checks for rgba, rgb, hsl, hex, color names, and gradients
  if (
    cssStyles.startsWith("rgba(") ||
    cssStyles.startsWith("rgb(") ||
    cssStyles.startsWith("hsla(") ||
    cssStyles.startsWith("hsl(") ||
    cssStyles.startsWith("#") ||
    (window.Color && window.Color[cssStyles.toLowerCase()]) // Check for color names
  ) {
    stylePreviewBox.style.backgroundColor = cssStyles;
    stylePreviewBox.style.backgroundImage = "none";
  } else if (cssStyles.startsWith("linear-gradient(")) {
    stylePreviewBox.style.backgroundImage = cssStyles;
    stylePreviewBox.style.backgroundColor = "transparent";
  } else if (cssStyles.match(/^https?:\/\/.+/)) {
    stylePreviewBox.style.backgroundImage = `url('${cssStyles}')`;
    stylePreviewBox.style.backgroundColor = "transparent";
  } else if (
    cssStyles.startsWith("--") ||
    cssStyles.startsWith("radial-gradient")
  ) {
    stylePreviewBox.style.backgroundColor = `var(${cssStyles})`;
    stylePreviewBox.style.backgroundImage = "none";
  } else {
    // Condition check and only show alert when needed
    if (!isClearing && cssStyles.trim() !== "") {
      alert(
        "Invalid input. Please enter a valid color, gradient, image URL, or CSS variable."
      );
    }
  }
}
