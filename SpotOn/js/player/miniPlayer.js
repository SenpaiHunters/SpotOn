const getElement = id => document.getElementById(id);

async function initialize() {
  const [tab] = await chrome.tabs.query({ url: ["*://open.spotify.com/*"] });
  if (!tab) return;
  await updateInfo(tab.id);
}

async function updateInfo(tabId) {
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      func: getPlayerInfo,
    });
    if (result) updateInfoHelper(result);
  } catch (error) {
    console.error('Failed to update info:', error);
  }
}

function getSongInfo() {
  return `${getElement('title').textContent} - ${getElement('artist').textContent}`;
}

function setupEventListeners() {
  getElement('copy_info')?.addEventListener('click', copySongInfo);
  getElement('search_genius')?.addEventListener('click', searchGenius);
}

async function copySongInfo() {
  try {
    await navigator.clipboard.writeText(getSongInfo());
    console.log('Song info copied to clipboard');
  } catch (error) {
    console.error('Failed to copy song info:', error);
  }
}

function searchGenius() {
  const searchQuery = encodeURIComponent(getSongInfo());
  window.open(`https://genius.com/search?q=${searchQuery}`, '_blank');
}

function updateInfoHelper({ title, artist, coverArtUrl }) {
  getElement("title").textContent = title;
  getElement("artist").textContent = artist;
  getElement("cover_art").src = coverArtUrl;
}

function getPlayerInfo() {
  const title = document.querySelector("a[data-testid=context-item-link]")?.textContent || '';
  const artist = document.querySelector("a[data-testid=context-item-info-artist]")?.textContent || '';
  const coverArtUrl = document.querySelector("img[data-testid=cover-art-image]")?.src || '';
  return { title, artist, coverArtUrl };
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initialize();
});
