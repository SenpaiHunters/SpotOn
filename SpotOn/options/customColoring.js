const customColor = {
  div: null,
  toggleButton: null,
  showControlsButton: null,
  popup: null,
  showControlsHidden: true,
};

const createButton = (id, text, clickHandler) => {
  const button = document.createElement("button");
  button.id = id;
  button.textContent = text;
  button.addEventListener("click", clickHandler);
  return button;
};

const createInput = (type, id, placeholder) => {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  if (placeholder) input.placeholder = placeholder;
  return input;
};

const applyCustomColorToPage = () => {
  if (customColor.div) return;

  customColor.div = document.createElement("div");
  customColor.div.classList.add("customColor");

  const colorPickerInput = createInput("color", "color-picker");
  const manualColorInput = createInput(
    "text",
    "manual-color-input",
    "Enter color value"
  );

  const applyButton = createButton("apply-manual-color", "Apply", () => {
    const color = manualColorInput.value;
    document.documentElement.style.setProperty("--custom-bg-color", color);
    localStorage.setItem("customColor", color);
    customColor.div.style.background = color;
  });

  const clearBackgroundButton = createButton(
    "clear-background",
    "Clear Background",
    () => {
      customColor.div.style.background = "";
      document.documentElement.style.removeProperty("--custom-bg-color");
    }
  );

  customColor.toggleButton = createButton(
    "toggle-custom-color",
    "Hide Controls",
    () => {
      const controlsVisible =
        !customColor.div.style.display ||
        customColor.div.style.display === "block";
      customColor.div.style.display = controlsVisible ? "none" : "block";
      customColor.toggleButton.textContent = controlsVisible
        ? "Show Controls"
        : "Hide Controls";
      customColor.popup.style.display = controlsVisible ? "block" : "none";
      customColor.showControlsHidden = controlsVisible;
      customColor.showControlsButton.style.display =
        customColor.showControlsHidden ? "none" : "inline";
    }
  );

  customColor.popup = document.createElement("div");
  customColor.popup.classList.add("customPopup");
  customColor.popup.style.display = "none";

  customColor.showControlsButton = createButton(
    "show-custom-color",
    "Show Controls",
    () => {
      customColor.div.style.display = "block";
      customColor.toggleButton.textContent = "Hide Controls";
      customColor.showControlsButton.style.display = "none";
      customColor.showControlsHidden = true;
    }
  );
  customColor.showControlsButton.style.display = "none";

  const showControlsDiv = document.createElement("div");
  showControlsDiv.appendChild(customColor.showControlsButton);

  customColor.div.append(
    colorPickerInput,
    manualColorInput,
    applyButton,
    clearBackgroundButton,
    customColor.toggleButton,
    customColor.popup
  );

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        const targetElement = document.querySelector(".eSg4ntPU2KQLfpLGXAww");
        if (targetElement && !targetElement.contains(customColor.div)) {
          targetElement.appendChild(customColor.div);
        }
      }
    }
  });

  observer.observe(document, { childList: true, subtree: true });

  colorPickerInput.addEventListener("input", () => {
    const chosenColor = colorPickerInput.value;
    document.documentElement.style.setProperty(
      "--custom-bg-color",
      chosenColor
    );
    customColor.div.style.background = chosenColor;
    manualColorInput.value = chosenColor;
  });

  manualColorInput.addEventListener("input", () => {
    const enteredColor = manualColorInput.value;
    document.documentElement.style.setProperty(
      "--custom-bg-color",
      enteredColor
    );
    customColor.div.style.background = enteredColor;
    colorPickerInput.value = enteredColor;
  });

  const savedColor = localStorage.getItem("customColor");
  if (savedColor) {
    document.documentElement.style.setProperty("--custom-bg-color", savedColor);
    customColor.div.style.background = savedColor;
  }
};

applyCustomColorToPage();
