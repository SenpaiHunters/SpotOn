document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    colorInput: document.getElementById("colorInput"),
    lyricsColorInput: document.getElementById("lyricsColorInput"),
    lyricsFontSizeInput: document.getElementById("lyricsFontSizeInput"),
    colorPreview: document.getElementById('colorPreview') || createPreview('colorPreview'),
    lyricsPreview: document.getElementById('lyricsPreview') || createPreview('lyricsPreview')
  };

  loadSettings(elements);

  elements.colorInput.addEventListener("input", () => handleInput('customColor', elements.colorInput.value, elements.colorPreview));
  elements.lyricsColorInput.addEventListener("input", () => handleLyricsInput({ color: elements.lyricsColorInput.value }, elements.lyricsPreview));
  elements.lyricsFontSizeInput.addEventListener("input", () => handleLyricsInput({ fontSize: elements.lyricsFontSizeInput.value }, elements.lyricsPreview));
});

const loadSettings = (elements) => {
  chrome.storage.sync.get(["customColor", "customLyrics"], ({ customColor, customLyrics = {} }) => {
    elements.colorInput.value = customColor || '';
    elements.lyricsColorInput.value = customLyrics.color || '';
    elements.lyricsFontSizeInput.value = customLyrics.fontSize || '';
    updatePreview(elements.colorPreview, customColor, 'color');
    updateLyricsPreview(elements.lyricsPreview, customLyrics);
  });
};

const handleInput = (key, value, preview) => {
  updatePreview(preview, value, 'color');
  saveToStorage(key, value);
};

const handleLyricsInput = (options, preview) => {
  updateLyricsPreview(preview, options);
  saveToStorage('customLyrics', options, true);
};

const saveToStorage = (key, value, merge = false) => {
  if (merge) {
    chrome.storage.sync.get({ [key]: {} }, (obj) => {
      chrome.storage.sync.set({ [key]: { ...obj[key], ...value } });
    });
  } else {
    chrome.storage.sync.set({ [key]: value });
  }
};

const updatePreview = (preview, value, type) => {
  resetStyles(preview);
  applyStyles(preview, value, type);
};

const updateLyricsPreview = (preview, { color, fontSize } = {}) => {
  resetStyles(preview);
  applyStyles(preview, color, 'color');
  preview.style.fontSize = fontSize || '';
};

const createPreview = (id) => {
  const preview = document.createElement('div');
  preview.id = id;
  document.body.appendChild(preview);
  return preview;
};

const resetStyles = (element) => {
  element.style = '';
  element.style.cssText = "width: calc(30vw); height: calc(30vh); margin-top: 10px; border: 1px solid #000; padding: 5px;";
};

const applyStyles = (element, value, type) => {
  if (type === 'color') {
    element.style.background = isGradient(value) || isImageUrl(value) ? value : '';
    element.style.backgroundColor = !element.style.background ? value : '';
    element.style.cssText += "width: 100px; height: 100px; margin-left: 40px;";
  }
};

const isGradient = (value) => value.includes("gradient");
const isImageUrl = (value) => /\.(jpeg|jpg|png|gif)$/i.test(value);
