document.addEventListener("DOMContentLoaded", function () {
  const colorInput = document.getElementById("colorInput");
  const lyricsColorInput = document.getElementById("lyricsColorInput");
  const lyricsFontSizeInput = document.getElementById("lyricsFontSizeInput");

  chrome.storage.sync.get(["customColor", "customLyrics"], function ({ customColor, customLyrics }) {
    if (customColor) {
      colorInput.value = customColor;
      updateColorPreview(customColor);
    }

    if (customLyrics) {
      lyricsColorInput.value = customLyrics.color || '';
      lyricsFontSizeInput.value = customLyrics.fontSize || '';
      updateLyricsPreview(customLyrics);
    }
  });

  colorInput.addEventListener("input", () => handleColorInput(colorInput.value));
  lyricsColorInput.addEventListener("input", () => handleLyricsInput({ color: lyricsColorInput.value }));
  lyricsFontSizeInput.addEventListener("input", () => handleLyricsInput({ fontSize: lyricsFontSizeInput.value }));
});

function createLyricsPreview() {
  const lyricsPreview = document.createElement('div');
  lyricsPreview.id = 'lyricsPreview';
  document.body.appendChild(lyricsPreview);
  return lyricsPreview;
}

function handleColorInput(value) {
  updateColorPreview(value);
  saveToStorage('customColor', value);
}

function handleLyricsInput(options) {
  updateLyricsPreview(options);
  saveToStorage('customLyrics', options, true);
}

function saveToStorage(key, value, merge = false) {
  if (merge) {
    chrome.storage.sync.get({ [key]: {} }, (obj) => {
      const newValue = { ...obj[key], ...value };
      chrome.storage.sync.set({ [key]: newValue }, () => {
        console.log(`Saved ${key}:`, newValue);
      });
    });
  } else {
    chrome.storage.sync.set({ [key]: value }, () => {
      console.log(`Saved ${key}:`, value);
    });
  }
}

function updateColorPreview(value) {
  const preview = document.getElementById('colorPreview') || createPreview('colorPreview');
  resetStyles(preview);
  applyStyles(preview, value, 'color');
}

function updateLyricsPreview({ color, fontSize }) {
  const preview = document.getElementById('lyricsPreview');
  resetStyles(preview);
  applyStyles(preview, color, 'color');
  if (fontSize) {
    preview.style.fontSize = fontSize;
  }
}

function createPreview(id) {
  const preview = document.createElement('div');
  preview.id = id;
  document.body.appendChild(preview);
  return preview;
}

function resetStyles(element) {
  element.style = '';
  element.style.width = "calc(30vw)";
  element.style.height = "calc(30vh)";
  element.style.marginTop = "10px";
  element.style.border = "1px solid #000";
  element.style.padding = "5px";
}

function applyStyles(element, value, type) {
  if (type === 'color' && (isGradient(value) || isImageUrl(value))) {
    element.style.background = value;
  } else if (type === 'color') {
    element.style.backgroundColor = value;
  }
  if (type === 'color') {
    element.style.width = "100px";
    element.style.height = "100px";
    element.style.marginLeft = "40px";
  }
}

function isGradient(value) {
  return value.startsWith("linear-gradient") || value.startsWith("radial-gradient");
}

function isImageUrl(value) {
  return /\.(jpeg|jpg|png|gif)$/i.test(value);
}