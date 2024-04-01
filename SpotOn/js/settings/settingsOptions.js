document.addEventListener("DOMContentLoaded", function () {
  const colorInput = document.getElementById("colorInput");
  const lyricsColorInput = document.getElementById("lyricsColorInput");
  const lyricsFontSizeInput = document.getElementById("lyricsFontSizeInput");

  chrome.storage.sync.get(["customColor", "customLyrics"], function (result) {
    const { customColor, customLyrics } = result;
    colorInput.value = customColor || '';
    lyricsColorInput.value = customLyrics?.color || '';
    lyricsFontSizeInput.value = customLyrics?.fontSize || '';
    updatePreview('colorPreview', customColor, 'color');
    updateLyricsPreview(customLyrics);
  });

  colorInput.addEventListener("input", () => handleInput('customColor', colorInput.value));
  lyricsColorInput.addEventListener("input", () => handleLyricsInput({ color: lyricsColorInput.value }));
  lyricsFontSizeInput.addEventListener("input", () => handleLyricsInput({ fontSize: lyricsFontSizeInput.value }));
});

function handleInput(key, value) {
  updatePreview('colorPreview', value, 'color');
  saveToStorage(key, value);
}

function handleLyricsInput(options) {
  updateLyricsPreview(options);
  saveToStorage('customLyrics', options, true);
}

function saveToStorage(key, value, merge = false) {
  const setStorage = (newValue) => chrome.storage.sync.set({ [key]: newValue });
  if (merge) {
    chrome.storage.sync.get({ [key]: {} }, (obj) => setStorage({ ...obj[key], ...value }));
  } else {
    setStorage(value);
  }
}

function updatePreview(id, value, type) {
  let preview = document.getElementById(id) || createPreview(id);
  resetStyles(preview);
  applyStyles(preview, value, type);
}

function updateLyricsPreview({ color, fontSize } = {}) {
  const preview = document.getElementById('lyricsPreview') || createPreview('lyricsPreview');
  resetStyles(preview);
  applyStyles(preview, color, 'color');
  preview.style.fontSize = fontSize || '';
}

function createPreview(id) {
  const preview = document.createElement('div');
  preview.id = id;
  document.body.appendChild(preview);
  return preview;
}

function resetStyles(element) {
  element.style = '';
  element.style.cssText = "width: calc(30vw); height: calc(30vh); margin-top: 10px; border: 1px solid #000; padding: 5px;";
}

function applyStyles(element, value, type) {
  if (type === 'color') {
    element.style.background = isGradient(value) || isImageUrl(value) ? value : '';
    element.style.backgroundColor = !element.style.background ? value : '';
    element.style.cssText += "width: 100px; height: 100px; margin-left: 40px;";
  }
}

function isGradient(value) {
  return value.includes("gradient");
}

function isImageUrl(value) {
  return /\.(jpeg|jpg|png|gif)$/i.test(value);
}