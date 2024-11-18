// Utility functions
const openTab = (url, isActive = true) => chrome.tabs.create({ url, active: isActive });
const closeCurrentTab = () => chrome.tabs.query({ active: true, currentWindow: true }, tabs => chrome.tabs.remove(tabs[0].id));
const openSpotifyTab = () => {
  chrome.tabs.query({ url: "https://open.spotify.com/*" }, tabs => {
    tabs.length ? chrome.tabs.update(tabs[0].id, { active: true }) : openTab("https://open.spotify.com/");
  });
};

// Hotkeys
const sendCommandToTab = async (command, tabId) => {
  const findAndClick = (command) => {
    const DENY = ".extension-lyrics-button";
    const VALUE_SET = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

    const animate = (e) => {
      e.style.transition = 'transform 0.4s ease-in-out';
      e.style.transform = 'scale(1.2)';
      setTimeout(() => e.style.transform = 'scale(1)', 200);
    };

    const clickAndAnimate = (e) => {
      if (!e) throw new Error("Element not found");
      e.click();
      animate(e);
    };

    const usingSlider = (selector, goUp) => {
      const slider = document.querySelector(selector);
      if (!slider) return;
      const value = parseInt(goUp ? slider.max : slider.min);
      VALUE_SET.call(slider, value);
      slider.dispatchEvent(new Event("change", { value, bubbles: true }));
    };

    const commandSelectors = {
      "play-pause": [".spoticon-play-16", ".spoticon-pause-16", "[data-testid=control-button-play]", "[data-testid=control-button-pause]", "[data-testid=control-button-playpause]"],
      next: [".spoticon-skip-forward-16", "[data-testid=control-button-skip-forward]"],
      previous: [".spoticon-skip-back-16", "[data-testid=control-button-skip-back]"],
      shuffle: [".spoticon-shuffle-16", "[data-testid=control-button-shuffle]"],
      repeat: [".spoticon-repeat-16", ".spoticon-repeatonce-16", "[data-testid=control-button-repeat]"],
      like: ["button[aria-label='Add to Liked Songs']"],
      "volume-mute": [".volume-bar__icon-button.control-button", "[data-testid=volume-bar-toggle-mute-button]"],
    };

    const usingSelector = (command) => {
      const selectors = commandSelectors[command];
      if (!selectors) throw new Error(`Selector for command '${command}' not found`);
      const selector = selectors.map(s => `${s}:not(${DENY})`).join(", ");
      const element = document.querySelector(selector);
      if (element) clickAndAnimate(element);
    };

    if (["volume-up", "volume-down"].includes(command)) {
      usingSlider("[class*=volume] input[type=range]", command === "volume-up");
    } else if (["seek-forward", "seek-backward"].includes(command)) {
      usingSlider("[class=playback-bar] input[type=range]", command === "seek-forward");
    } else {
      usingSelector(command);
    }
  };

  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: findAndClick,
      args: [command],
    });
  } catch (error) {
    console.error(`[SpotOn Hotkeys] Error executing '${command}':`, error);
  }
};

// Event Listeners
chrome.commands.onCommand.addListener(async (command) => {
  try {
    const tabs = await chrome.tabs.query({ url: "https://open.spotify.com/*" });
    await Promise.all(tabs.map(tab => sendCommandToTab(command, tab.id)));
  } catch (error) {
    console.error(`[SpotOn Hotkeys] Error sending command '${command}':`, error);
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle_extension") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleExtension" });
    });
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: command });
    });
  }
});

// Right click actions
const Command = {
  Search: "SpotOn-extension-search",
  OpenSpotify: "SpotOn-extension-open-spotify",
  CreatePlaylist: "SpotOn-extension-create-playlist",
  CloseTab: "SpotOn-extension-CloseTab",
};

const contextMenus = [
  {
    id: Command.Search,
    title: '🔍 Search Spotify for "%s"',
    contexts: ["selection"],
    handler: info => openTab(`https://open.spotify.com/search/${encodeURIComponent(info.selectionText)}`),
  },
  {
    id: Command.OpenSpotify,
    title: "🎧 Open Spotify In Tab",
    contexts: ["page"],
    handler: openSpotifyTab,
  },
  {
    id: Command.CreatePlaylist,
    title: "🔨 Open Playlists",
    contexts: ["page"],
    handler: () => openTab("https://open.spotify.com/collection/playlists", false),
  },
  {
    id: Command.CloseTab,
    title: "❌ Close Current Tab",
    contexts: ["page"],
    handler: closeCurrentTab,
  },
];

const initializeContextMenus = () => {
  chrome.runtime.onInstalled.addListener(() => {
    contextMenus.forEach(({ id, title, contexts }) => {
      chrome.contextMenus.create({ id, title, contexts }, () => {
        if (chrome.runtime.lastError) console.error("Error creating context menu:", chrome.runtime.lastError);
      });
    });
  });

  chrome.contextMenus.onClicked.addListener(info => {
    const action = contextMenus.find(a => a.id === info.menuItemId);
    if (action) action.handler(info);
  });
};

initializeContextMenus();

// Theme locking
let themeLocked = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.txt === "lock" && typeof message.bool === "boolean") {
    themeLocked = message.bool;
    sendResponse({ status: themeLocked ? "theme_locked" : "theme_unlocked" });
  }
});

// Default options and option handling
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

const optionScripts = {
  featInDev: "featInDev.js",
  navToggle: "navToggle.js",
  addLyricsButton: "addLyrics.js",
};

const handleOption = (option, tabId, options) => {
  if (!options[option]) return;

  const fileToInject = optionScripts[option] ? `./options/${optionScripts[option]}` : `./options/${option}.css`;
  const method = optionScripts[option] ? 'executeScript' : 'insertCSS';

  chrome.scripting[method]({
    target: { tabId },
    files: [fileToInject],
  });
};

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.storage.sync.set({ ...defaultOptions, extensionEnabled: true });
  }
});

chrome.tabs.onUpdated.addListener((tabId, { status }, tab) => {
  if (status === "complete" && tab.url.startsWith("https://open.spotify.com/")) {
    chrome.storage.sync.get(null, options => {
      Object.keys(options).forEach(option => {
        if (options[option]) {
          handleOption(option, tabId, options);
        }
      });
    });
  }
});

// Custom options and CSS management
const generateLyricsCSS = (customLyrics) => `
  .nw6rbs8R08fpPn7RWW2w.aeO5D7ulxy19q4qNBrkk {
    color: ${customLyrics.color} !important;
    font-size: ${customLyrics.fontSize}px !important;
  }
`;

const generateColorCSS = (customColor) => `
  .sqKERfoKl4KwrtHqcKOd,
  .JG5J9NWJkaUO9fiKECMA,
  .OTfMDdomT5S7B5dbYTT8,
  .EhyK_jJzB2PcWXd5lg24,
  #context-menu[aria-labelledby="device-picker-icon-button"]:has(#device-picker-header [data-testid="animated-now-playing"]),
  .aCtCKL9BxAoHeVZS0uRs.bk509U3ZhZc9YBJAmoPB,
  .uV8q95GGAb2VDtL3gpYa,
  .lYpiKR_qEjl1jGGyEvsA,
  div#Desktop_LeftSidebar_Id,
  .AzO2ondhaHJntbGy_3_S,
  div#Desktop_LeftSidebar_Id,
  .Nw1INlIyra3LT1JjvoqH,
  #main > div.Root.encore-dark-theme > div.ZQftYELq0aOsg6tPbVbV > div.JG5J9NWJkaUO9fiKECMA,
  .pGU_qEtNT1qWKjrRbvan,
  .EZFyDnuQnx5hw78phLqP {
    background-color: ${customColor} !important;
    background: ${customColor} !important;
    background: var(${customColor}) !important;
    background-image: url('${customColor}') !important;
    background-image: var(${customColor}) !important;
    background-image: ${customColor} !important;
    background-size: cover !important;
    background-attachment: fixed !important;
    background-repeat: no-repeat !important;
    background-blend-mode: soft-light !important;
    overflow-x: none !important;
  }
`;

const insertCSS = (tabId, css) => {
  chrome.scripting.insertCSS({
    target: { tabId },
    css,
  });
};

const applyCustomizations = async (tabId) => {
  try {
    const { customColor, customLyrics } = await chrome.storage.sync.get(["customColor", "customLyrics"]);
    if (customColor) insertCSS(tabId, generateColorCSS(customColor));
    if (customLyrics) insertCSS(tabId, generateLyricsCSS(customLyrics));
  } catch (error) {
    console.error("Error retrieving options:", error);
  }
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "complete") {
    applyCustomizations(tabId);
  }
});

// Custom CSS Manager
class CustomCSSManager {
  constructor() {
    this.css = '';
    this.initListeners();
  }

  async applyToTab(tabId) {
    if (!this.css || !tabId) return;
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        function: (newCss) => {
          const styleId = 'custom-css';
          let style = document.getElementById(styleId);
          if (!style) {
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
          }
          style.textContent = newCss;
        },
        args: [this.css]
      });
    } catch (error) {
      console.error('Error applying custom CSS to tab:', error);
    }
  }

  async updateCSS(newCss) {
    if (newCss === this.css) return;
    this.css = newCss;
    await chrome.storage.local.set({ customCSS: newCss });
    const tabs = await chrome.tabs.query({ url: "https://open.spotify.com/*" });
    tabs.forEach(tab => this.applyToTab(tab.id));
  }

  initListeners() {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "update-custom-css") {
        this.updateCSS(message.css);
      }
    });

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === "complete" && tab.url.startsWith("https://open.spotify.com/")) {
        this.injectContentScript(tabId);
      }
    });
  }

  async injectContentScript(tabId) {
    try {
      const response = await chrome.tabs.sendMessage(tabId, { action: "checkInit" });
      if (!response || !response.initialized) {
        await chrome.scripting.executeScript({
          target: { tabId },
          files: ["options/addLyrics.js"]
        });
        console.log("Content script injected successfully");
      }
      chrome.tabs.sendMessage(tabId, { action: "init" });
    } catch (error) {
      console.error("Error injecting content script:", error);
    }
  }
}

new CustomCSSManager();
