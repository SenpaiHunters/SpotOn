function addColorPickerButtonToNowPlayingBar() {
  const targetSelector = ".mwpJrmCgLlVkJVtWjlI1";

  const createColorPickerButton = () => {
    const nowPlayingBar = document.querySelector(targetSelector);
    if (
      nowPlayingBar &&
      !nowPlayingBar.querySelector('[data-testid="color-picker-button"]')
    ) {
      const colorPickerButton = document.createElement("button");
      colorPickerButton.setAttribute("aria-label", "Open Color Picker");
      colorPickerButton.setAttribute("data-testid", "color-picker-button");
      colorPickerButton.classList.add("icon-button");
      colorPickerButton.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: -2px;
        padding: 8px;
        margin-bottom: -10px;
        background-color: transparent;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.2s ease-out, opacity 0.2s ease-out;
      `;
      colorPickerButton.title = "Open Color Picker";

      const icon = document.createElement("div");
      icon.style.cssText = `
        width: 24px;
        height: 24px;
        background-image: url('https://github.com/SenpaiHunters/Pictures/blob/main/SpotOn%20Pics/Resources/BettereyeDropper.png?raw=true');
        background-size: cover;
        background-position: center;
      `;

      const dot = document.createElement("div");
      dot.style.cssText = `
        width: 6px;
        height: 6px;
        background-color: #1ED760;
        border-radius: 50%;
        margin-top: 4px;
        opacity: 0;
      `;

      colorPickerButton.addEventListener("mouseenter", () => {
        colorPickerButton.style.transform = "scale(1.1)";
        dot.style.opacity = 1;
      });

      colorPickerButton.addEventListener("mouseleave", () => {
        colorPickerButton.style.transform = "scale(1)";
        dot.style.opacity = 0;
      });

      colorPickerButton.appendChild(icon);
      colorPickerButton.appendChild(dot);

      colorPickerButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({ openPopup: true });
      });

      nowPlayingBar.appendChild(colorPickerButton);
    }
  };

  const targetNode = document.querySelector(targetSelector);
  if (targetNode) {
    createColorPickerButton();
  } else {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length) {
          createColorPickerButton();
        }
      }
    });

    observer.observe(document, { childList: true, subtree: true });
  }
}

addColorPickerButtonToNowPlayingBar();
