const TranslateSongLyrics = "translate-song-lyrics", SongLyricsClass = "esRByMgBY3TiENAsbDHA", LyricsLoaded = "lyrics-loaded";
let lyricsColor = "#C07CB4";

const translateText = async (text, targetLanguage) => {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url);
  const data = await response.json();
  const translation = data[0]?.map(item => item[0]).join(" ");
  if (!translation) throw new Error("Translation failed.");
  return translation;
};

const updateLyricsColor = (newColor) => {
  lyricsColor = newColor;
  document.querySelectorAll(`.${LyricsLoaded}`).forEach(element => element.style.color = lyricsColor);
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateLyricsColor") updateLyricsColor(message.color);
});

chrome.storage.sync.get("lyricsColor", (data) => {
  if (data.lyricsColor) updateLyricsColor(data.lyricsColor);
});

const translateLyrics = async (element, targetLanguage) => {
  const existingTranslation = element.querySelector(`.${LyricsLoaded}`);
  const text = element.innerText;
  if (text) {
    const translation = await translateText(text, targetLanguage);
    if (translation && translation.toLowerCase() !== text.toLowerCase()) {
      if (existingTranslation) existingTranslation.textContent = translation;
      else {
        element.textContent = '';
        const p = document.createElement("p");
        p.className = LyricsLoaded;
        p.style.color = lyricsColor;
        p.textContent = translation;
        element.appendChild(p);
      }
    }
  }
};

const translateSongLyrics = async (targetLanguage) => {
  const lyricsElements = document.querySelectorAll(`.${SongLyricsClass} div:not(.${LyricsLoaded})`);
  for (const element of lyricsElements) await translateLyrics(element, targetLanguage);
};

const observeDivContent = (div) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.parentElement?.classList.contains(SongLyricsClass)) {
          chrome.storage.sync.get(["autoTranslate", "defaultTargetLanguage"], async (data) => {
            if (data.autoTranslate) await translateLyrics(node, data.defaultTargetLanguage);
          });
        }
      });
    });
  });
  observer.observe(div, { childList: true, subtree: true });
};

const targetDiv = document.querySelector(`.${SongLyricsClass}`) || document.body;
observeDivContent(targetDiv);