(function () {
  "use strict";

  const STATUS_DELAY = 250;

  // Set status message and hide it after a delay
  function setStatusMessage(message, success = true) {
    const status = document.getElementById("status");
    status.textContent = message;
    status.classList.remove("success", "error");
    status.classList.add(success ? "success" : "error");

    setTimeout(() => {
      status.textContent = "";
    }, STATUS_DELAY);
  }

  async function saveOptions() {
    setStatusMessage("Saving options...");

    const options = gatherOptions();

    try {
      await saveOptionsToStorage(options);

      setStatusMessage("Options saved.", true);

      openSpotifyTab();
      reloadActiveTab();
    } catch (error) {
      setStatusMessage("Failed to save options.", false);
      console.error("Error saving options:", error);
    }
  }

  function gatherOptions() {
    const checkboxIds = [
      "addLyricsButton",
      "righter",
      "roundAlbumArt",
      "rainbowControls",
      "hiddenPIcon",
      "hiddenPAlbum",
      "hiddenPDate",
      "hiddenPDura",
      "hiddenPHeart",
      "hiddenPInfo",
      "hiddenSPL",
      "hiddenSTime",
      "dynamicArt",
      "removeFeatArtist",
      "scrollNPB",
      "removeprembutton",
      "spinAlbum",
      "removeAppearsOn",
      "navToggle",
      "footernomore",
      "byeappthing",
      "fontLsize",
      "hideCB",
      "removeVolBar",
      "scrollbar",
      "enableDebugMode",
      "enableLogging",
      "removePodcasts",
      "hiddenMerch",
      "hiddenAbout",
      "hiddenArtistPick",
      "removeNPB",
      "thickerPB",
      "hiddenNPVqueue",
      "removeNPV",
      "removeFansLiked",
      "removeOnTour",
      "hiddenNPVtour",
      "removeDiscovergraphy",
      "hiddenNPVartist",
      "featInDev",
      "featinDev",
      "addColortoNPB",
      "addDownloadButton",
      "rainbowProgressbar",
      "shadow",
      "hiddenLyricsButton",
      "hiddenDevicePicker",
      "removeAlbumArt",
      "reducedTransparency",
      "lyricsColor",
      "removeMerch",
    ];

    return checkboxIds.reduce((acc, id) => {
      acc[id] = document.getElementById(id).checked;
      return acc;
    }, {});
  }

  async function saveOptionsToStorage(options) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(options, function () {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  function openSpotifyTab() {
    chrome.tabs.query({ url: "https://open.spotify.com/*" }, function (tabs) {
      if (tabs.length > 0) {
        const spotifyTab = tabs[0];
        chrome.tabs.update(spotifyTab.id, { active: true }, function () {
          chrome.tabs.reload(spotifyTab.id);
        });
      } else {
        // If no open Spotify tab is found, you can open a new tab here
        chrome.tabs.create({ url: "https://open.spotify.com/" });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.getElementById("save").addEventListener("click", saveOptions);
  document.getElementById("settingsButton").addEventListener("click", () => {
    openSpotifyTab();
    reloadActiveTab();
  });

  async function restoreOptions() {
    const status = document.getElementById("status");
    status.textContent = "Loading options...";
    status.classList.remove("success", "error");

    const defaultOptions = {
      addLyricsButton: true,
      righter: true,
      roundAlbumArt: true,
      rainbowControls: true,
      dynamicArt: true,
      hiddenPIcon: false,
      hiddenPAlbum: false,
      hiddenPDate: false,
      hiddenPDura: false,
      hiddenPHeart: false,
      hiddenPInfo: false,
      hiddenSPL: false,
      hiddenSTime: false,
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
      enableDebugMode: false,
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
      addColortoNPB: false,
      addDownloadButton: false,
      rainbowProgressbar: false,
      shadow: true,
      hiddenLyricsButton: false,
      hiddenDevicePicker: false,
      removeAlbumArt: false,
      reducedTransparency: false,
      lyricsColor: false,
      removeMerch: false,
    };

    try {
      const items = await loadOptionsFromStorage(defaultOptions);

      for (const [id, value] of Object.entries(items)) {
        const checkbox = document.getElementById(id);
        if (checkbox) {
          checkbox.checked = value;
        }
      }

      setStatusMessage("Options loaded.");
      status.classList.add("success");
    } catch (error) {
      console.error("Error loading options:", error);
      status.textContent = "Error loading options.";
      status.classList.add("error");
    }
  }

  async function loadOptionsFromStorage(defaultOptions) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(defaultOptions, function (items) {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(items);
        }
      });
    });
  }
})();
