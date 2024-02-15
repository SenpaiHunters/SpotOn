const sendMessage = (message) => new Promise(resolve => chrome.runtime.sendMessage(message, resolve));
const setStorage = (key, value) => chrome.storage.sync.set({ [key]: value });
const getStorage = (keys) => new Promise(resolve => chrome.storage.sync.get(keys, resolve));

document.addEventListener("DOMContentLoaded", async () => {
  const { defaultTargetLanguage, lyricsColor, autoTranslate } = await getStorage(["defaultTargetLanguage", "lyricsColor", "autoTranslate"]);
  const languageSelect = document.getElementById("languageSelect");
  const lyricsColorPicker = document.getElementById("lyricsColorPicker");
  const autoTranslateCheckbox = document.getElementById("autoTranslateCheckbox");

  lyricsColorPicker.value = lyricsColor || "#00ff00";
  autoTranslateCheckbox.checked = !!autoTranslate;

  languageSelect.addEventListener("change", () => setStorage("defaultTargetLanguage", languageSelect.value));
  autoTranslateCheckbox.addEventListener("change", () => setStorage("autoTranslate", autoTranslateCheckbox.checked));

  for (let language of languages) {
    let option = document.createElement("option");
    option.value = language.code;
    option.text = language.name;
    option.selected = language.code === defaultTargetLanguage;
    languageSelect.appendChild(option);
  }
});

document.getElementById("lyricsColorPicker").addEventListener("change", (event) => {
  const newColor = event.target.value;
  setStorage("lyricsColor", newColor);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "updateLyricsColor", color: newColor });
  });
});

document.getElementById("translateButton").addEventListener("click", async () => {
  const targetLanguage = document.getElementById("languageSelect").value;
  setStorage("defaultTargetLanguage", targetLanguage);
  await sendMessage({ action: "translate-song-lyrics", targetLanguage });
});