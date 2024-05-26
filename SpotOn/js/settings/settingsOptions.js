document.addEventListener("DOMContentLoaded", function () {
  const colorInput = document.getElementById("colorInput");
  const lyricsColorInput = document.getElementById("lyricsColorInput");
  const lyricsFontSizeInput = document.getElementById("lyricsFontSizeInput");
  const colorPreview = document.getElementById('colorPreview') || createPreview('colorPreview');
  const lyricsPreview = document.getElementById('lyricsPreview') || createPreview('lyricsPreview');

  chrome.storage.sync.get(["customColor", "customLyrics"], function (result) {
    const { customColor, customLyrics } = result;
    colorInput.value = customColor || '';
    lyricsColorInput.value = customLyrics?.color || '';
    lyricsFontSizeInput.value = customLyrics?.fontSize || '';
    updatePreview(colorPreview, customColor, 'color');
    updateLyricsPreview(lyricsPreview, customLyrics);
  });

  colorInput.addEventListener("input", () => handleInput('customColor', colorInput.value, colorPreview));
  lyricsColorInput.addEventListener("input", () => handleLyricsInput({ color: lyricsColorInput.value }, lyricsPreview));
  lyricsFontSizeInput.addEventListener("input", () => handleLyricsInput({ fontSize: lyricsFontSizeInput.value }, lyricsPreview));
});

function handleInput(key, value, preview) {
  updatePreview(preview, value, 'color');
  saveToStorage(key, value);
}

function handleLyricsInput(options, preview) {
  updateLyricsPreview(preview, options);
  saveToStorage('customLyrics', options, true);
}

function saveToStorage(key, value, merge = false) {
  if (merge) {
    chrome.storage.sync.get({ [key]: {} }, (obj) => {
      chrome.storage.sync.set({ [key]: { ...obj[key], ...value } });
    });
  } else {
    chrome.storage.sync.set({ [key]: value });
  }
}

function updatePreview(preview, value, type) {
  resetStyles(preview);
  applyStyles(preview, value, type);
}

function updateLyricsPreview(preview, { color, fontSize } = {}) {
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