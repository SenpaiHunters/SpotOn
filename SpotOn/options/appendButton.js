function addColorPickerButtonToNowPlayingBar() {
  const targetSelector = ".mwpJrmCgLlVkJVtWjlI1"; // Replace this selector with the actual selector for the Now Playing Bar

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        const nowPlayingBar = document.querySelector(targetSelector);
        if (nowPlayingBar) {
          // Create the new button container (containing icon and dot)
          const colorPickerButton = document.createElement("button");
          colorPickerButton.setAttribute("aria-label", "Open Color Picker");
          colorPickerButton.setAttribute("data-testid", "color-picker-button");
          colorPickerButton.setAttribute("class", "icon-button");
          colorPickerButton.style.display = "flex";
          colorPickerButton.style.flexDirection = "column"; // Set flex-direction to column to stack the icon and dot
          colorPickerButton.style.alignItems = "center";
          colorPickerButton.style.justifyContent = "center";
          colorPickerButton.style.marginRight = "-2px"; // 8px
          colorPickerButton.style.padding = "8px";
          colorPickerButton.style.marginBottom = "-10px";
          colorPickerButton.style.color = "#fff";
          colorPickerButton.style.backgroundColor = "transparent"; // Set the background color as transparent
          colorPickerButton.style.border = "none";
          colorPickerButton.style.borderRadius = "50%"; // Make the button a circle
          colorPickerButton.style.cursor = "pointer";
          colorPickerButton.style.transition =
            "transform 0.2s ease-out, opacity 0.2s ease-out";
          colorPickerButton.setAttribute("title", "Open Color Picker"); // Set the tooltip text

          // Create the icon element
          const icon = document.createElement("div");
          icon.style.width = "24px";
          icon.style.height = "24px";
          icon.style.backgroundImage =
            "url('https://github.com/SenpaiHunters/Pictures/blob/main/SpotOn%20Pics/Resources/BettereyeDropper.png?raw=true')"; // Replace this with the path to your icon image
          icon.style.backgroundSize = "cover";
          icon.style.backgroundPosition = "center";
          icon.style.fill = "currentcolor";
          icon.style.animation = "rainbow-text 30s infinite";
          icon.style.filter = "brightness(0) invert(1)"; // Add a filter to make the icon white (invert the colors)

          // Create the dot element
          const dot = document.createElement("div");
          dot.style.width = "6px";
          dot.style.height = "6px";
          dot.style.backgroundColor = "#1ED760"; // Set the color of the dot as desired
          dot.style.borderRadius = "50%";
          dot.style.marginTop = "4px"; // Adjust the margin as needed to position the dot
          dot.style.opacity = 0; // Start with the dot hidden

          // Add hover effect to the button
          colorPickerButton.addEventListener("mouseenter", () => {
            colorPickerButton.style.transform = "scale(1.1)";
            dot.style.opacity = 1; // Show the dot when hovering
          });
          colorPickerButton.addEventListener("mouseleave", () => {
            colorPickerButton.style.transform = "scale(1)";
            dot.style.opacity = 0; // Hide the dot when not hovering
          });

          // Append the icon and dot to the button container
          colorPickerButton.appendChild(icon);
          colorPickerButton.appendChild(dot);

          // Append the new button container to the Now Playing Bar
          nowPlayingBar.appendChild(colorPickerButton);

          // Add a click event listener to open the color picker popup
          colorPickerButton.addEventListener("click", () => {
            // Open the extension popup using chrome.runtime API
            chrome.runtime.sendMessage({ openPopup: true });
          });

          // Disconnect the observer once the button is added
          observer.disconnect();
          break;
        }
      }
    }
  });

  const targetNode = document.querySelector(targetSelector);
  if (targetNode) {
    // If the target element is already available, add the button immediately
    addColorPickerButtonToNowPlayingBar();
  } else {
    // If the target element is not available yet, start observing for changes
    observer.observe(document, { childList: true, subtree: true });
  }
}

// Call the function to add the new button to the Now Playing Bar
addColorPickerButtonToNowPlayingBar();
