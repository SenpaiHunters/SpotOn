(function () {
  "use strict";

  const saveButton = document.getElementById("save");
  const settingsButton = document.getElementById("settingsButton");
  const countElements = {
    onCount: document.getElementById("on-count"),
    offCount: document.getElementById("off-count"),
    totalCount: document.getElementById("total-count"),
    onPercentage: document.getElementById("on-percentage"),
    offPercentage: document.getElementById("off-percentage")
  };

  const defaultOptions = {
    addLyricsButton: true, righter: true, roundAlbumArt: true, rainbowControls: true,
    hiddenPIcon: false, hiddenPAlbum: false, hiddenPDate: false, hiddenPDura: false,
    hiddenPHeart: false, hiddenPInfo: false, hiddenSPL: false, hiddenSTime: false,
    hiddenSInfo: false, hiddenSAlbum: false, hiddenSDate: false, hiddenSHeart: false,
    hideSpotifyOffers: false, hiddenSDura: false, scrollNPB: false, removeprembutton: true,
    removemusixmatch: true, spinAlbum: true, navToggle: true, footernomore: true,
    byeappthing: true, fontLsize: true, hideCB: false, removeVolBar: false,
    removeOnTour: false, removeFeatArtist: false, removeFansLiked: false,
    removeAppearsOn: false, removeDiscovergraphy: false, removePodcasts: true, hiddenAbout: false,
    hiddenArtistPick: false, removeNPB: false, thickerPB: true, hiddenNPVqueue: false,
    removeNPV: false, hiddenNPVtour: true, hiddenNPVartist: false, featInDev: false,
    featinDev: false, rainbowProgressbar: false, shadow: true, hiddenLyricsButton: false,
    hiddenDevicePicker: false, removeAlbumArt: false, reducedTransparency: false,
    lyricsColor: false, removeMerch: false, removeScroll: false, hiddenNPVcredits: false,
    darkness: false, fontMain: true, removeLikedCover: false, hometopsel: false,
    youwontlike: false, contextApp: false, removeMusicVids: false,
  };

  const defaultOptionsKeys = Object.keys(defaultOptions);
  const totalCount = defaultOptionsKeys.length;
  countElements.totalCount.textContent = totalCount;

  const checkboxElements = defaultOptionsKeys.reduce((elements, id) => {
    elements[id] = document.getElementById(id);
    return elements;
  }, {});

  function updateToggleCounts() {
    const onCount = defaultOptionsKeys.reduce((count, id) => count + (checkboxElements[id].checked ? 1 : 0), 0);
    const offCount = totalCount - onCount;

    countElements.onCount.textContent = onCount;
    countElements.offCount.textContent = offCount;
    countElements.onPercentage.textContent = `${calculatePercentage(onCount)}%`;
    countElements.offPercentage.textContent = `${calculatePercentage(offCount)}%`;
  }

  function calculatePercentage(part) {
    return ((part / totalCount) * 100).toFixed(2);
  }

  function saveOptions() {
    const options = gatherOptions();
    chrome.storage.sync.set(options, () => {
      if (chrome.runtime.lastError) {
        alert('Error saving options: ' + chrome.runtime.lastError.message);
      } else {
        updateToggleCounts();
        openSpotifyTab();
      }
    });
  }

  // Expose saveOptions to a globe scope
  window.saveOptions = saveOptions;

  function gatherOptions() {
    return defaultOptionsKeys.reduce((options, id) => {
      options[id] = checkboxElements[id].checked;
      return options;
    }, {});
  }

  function restoreAndUpdateOptions() {
    chrome.storage.sync.get(defaultOptions, (items) => {
      if (chrome.runtime.lastError) {
        alert('Error restoring options: ' + chrome.runtime.lastError.message);
      } else {
        defaultOptionsKeys.forEach(id => {
          checkboxElements[id].checked = items[id];
        });
        updateToggleCounts();
      }
    });
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

  document.addEventListener("DOMContentLoaded", restoreAndUpdateOptions);
  saveButton.addEventListener("click", saveOptions);
  settingsButton.addEventListener("click", openSpotifyTab);
})();