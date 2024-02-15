// Theming
const modeSelect = document.getElementById("mode-select");
let savedMode = localStorage.getItem("selectedMode") || "automatic";

const applyMode = mode => {
  if (mode === "automatic") {
    mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
  } else if (mode === "grey") {
    mode = "grey";
  }
  document.body.setAttribute("data-theme", mode);
  return mode;
}

const saveMode = mode => {
  localStorage.setItem("selectedMode", mode);
  chrome.storage.sync.set({ selectedMode: mode });
}

const changeMode = mode => {
  saveMode(applyMode(mode));
}

chrome.storage.sync.get("selectedMode", data => {
  const mode = applyMode(data.selectedMode || savedMode);
  modeSelect.value = mode;
});

modeSelect.addEventListener("change", () => {
  changeMode(modeSelect.value);
});