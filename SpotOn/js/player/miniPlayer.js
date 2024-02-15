const getElement = id => document.getElementById(id);

async function initialize() {
  const tabs = await chrome.tabs.query({ url: ["*://open.spotify.com/*"] });
  if (!tabs.length) return;
  await updateInfo(tabs[0].id);
  setupCopyButton();  
}

async function updateInfo(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: getPlayerInfo,
  });
  if (result) updateInfoHelper(result);
}

document.addEventListener('DOMContentLoaded', (event) => {
  setupCopyButton();
});

function getSongInfo() {
  const title = getElement('title').innerText;
  const artist = getElement('artist').innerText;
  return `${title} - ${artist}`;
}

async function setupCopyButton() {
  const copyButton = getElement('copy_info');
  if (!copyButton) return;

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(getSongInfo());
      console.log('Song info copied to clipboard');
    } catch (err) {
      console.error('Failed to copy song info', err);
    }
  });
}

document.getElementById('search_genius').addEventListener('click', () => {
  const searchQuery = encodeURIComponent(getSongInfo());
  window.open(`https://genius.com/search?q=${searchQuery}`, '_blank');
});

async function updateInfoHelper({ title, artist, coverArtUrl }) {
  getElement("title").innerText = title;
  getElement("artist").innerText = artist;
  getElement("cover_art").setAttribute("src", coverArtUrl);
}

function getPlayerInfo() {
  const title = document.querySelector("a[data-testid=context-item-link]").textContent;
  const artist = document.querySelector("a[data-testid=context-item-info-artist]").textContent;
  const coverArtUrl = document.querySelector("img[data-testid=cover-art-image]").getAttribute("src");

  return { title, artist, coverArtUrl };
}

initialize();