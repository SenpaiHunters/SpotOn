(function () {
  "use strict";

  const saveButton = document.getElementById("save");
  const settingsButton = document.getElementById("settingsButton");
  const checkboxElements = {};
  const countElements = {
    onCount: document.getElementById("on-count"),
    offCount: document.getElementById("off-count"),
    totalCount: document.getElementById("total-count"),
    onPercentage: document.getElementById("on-percentage"),
    offPercentage: document.getElementById("off-percentage")
  };

  const defaultOptions = {
    addLyricsButton: true,
    righter: true,
    roundAlbumArt: true,
    rainbowControls: true,
    hiddenPIcon: false,
    hiddenPAlbum: false,
    hiddenPDate: false,
    hiddenPDura: false,
    hiddenPHeart: false,
    hiddenPInfo: false,
    hiddenSPL: false,
    hiddenSTime: false,
    hiddenSInfo: false,
    hiddenSAlbum: false,
    hiddenSDate: false,
    hiddenSHeart: false,
    hideSpotifyOffers: false, 
    hiddenSDura: false,
    scrollNPB: false,
    removeprembutton: true,
    removemusixmatch: true,
    spinAlbum: true,
    navToggle: true,
    footernomore: true,
    byeappthing: true,
    fontLsize: true,
    hideCB: false,
    removeVolBar: false,
    scrollbar: true,
    enableLogging: false,
    removeOnTour: false,
    removeFeatArtist: false,
    removeFansLiked: false,
    removeAppearsOn: false,
    removeDiscovergraphy: false,
    removePodcasts: true,
    hiddenAbout: false,
    hiddenArtistPick: false,
    removeNPB: false,
    thickerPB: true,
    hiddenNPVqueue: false,
    removeNPV: false,
    hiddenNPVtour: true,
    hiddenNPVartist: false,
    featInDev: false,
    featinDev: false,
    rainbowProgressbar: false,
    shadow: true,
    hiddenLyricsButton: false,
    hiddenDevicePicker: false,
    removeAlbumArt: false,
    reducedTransparency: false,
    lyricsColor: false,
    removeMerch: false,
    removeScroll: false,
    hiddenNPVcredits: false,
    darkness: false,
    fontMain: true,
    removeLikedCover: false,
    hometopsel: false,
    youwontlike: false,
  };

  function updateToggleCounts() {
    const onCount = Object.values(checkboxElements).filter(el => el.checked).length;
    const totalCount = Object.keys(defaultOptions).length;
    const offCount = totalCount - onCount;

    countElements.onCount.textContent = onCount;
    countElements.offCount.textContent = offCount;
    countElements.totalCount.textContent = totalCount;
    countElements.onPercentage.textContent = calculatePercentage(onCount, totalCount) + '%';
    countElements.offPercentage.textContent = calculatePercentage(offCount, totalCount) + '%';
  }

  function calculatePercentage(part, total) {
    return ((part / total) * 100).toFixed(2);
  }

  async function saveOptions() {
    try {
      const options = gatherOptions();
      await chrome.storage.sync.set(options);
      await restoreOptions();
      updateToggleCounts();
      openSpotifyTab();
    } catch (error) {
      console.error('Error saving options:', error);
    }
  }

  function gatherOptions() {
    return Object.keys(defaultOptions).reduce((acc, id) => {
      acc[id] = checkboxElements[id].checked;
      return acc;
    }, {});
  }

  async function restoreOptions() {
    try {
      const items = await chrome.storage.sync.get(defaultOptions);
      for (const [id, value] of Object.entries(items)) {
        const checkbox = checkboxElements[id] || document.getElementById(id);
        if (checkbox) {
          checkboxElements[id] = checkbox;
          checkbox.checked = value;
        }
      }
      updateToggleCounts();
    } catch (error) {
      console.error('Error restoring options:', error);
    }
  }

  function openSpotifyTab() {
    chrome.tabs.query({ url: "https://open.spotify.com/*" }, function (tabs) {
      if (tabs.length) {
        chrome.tabs.update(tabs[0].id, { active: true }, () => chrome.tabs.reload(tabs[0].id));
      } else {
        chrome.tabs.create({ url: "https://open.spotify.com/" });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", restoreOptions);
  saveButton.addEventListener("click", saveOptions);
  settingsButton.addEventListener("click", openSpotifyTab);
})();