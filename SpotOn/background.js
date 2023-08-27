async function sendCommandToTab(command, tab) {
  // Developed by Kami, lightweight JavaScript for global media keys.
  // Options can be configured in the extension settings.
  // Replace 'Arc' with 'Chrome' if using Chrome browser.
  function findAndClick(command) {
    const DENY = ".extension-lyrics-button";
    const VALUE_SET = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      "value"
    ).set;

    function animate(e) {
      try {
        const animateStep = (i) => {
          e.style.transform = i % 2 === 1 ? "scale(1.2)" : null;
          if (i === 0) return;
          setTimeout(() => animateStep(i - 1), 80);
        };
        animateStep(3);
      } catch (_) {}
    }

    function clickAndAnimate(e) {
      if (!e) throw new Error("Element not found");
      e.click();
      animate(e);
    }

    function usingSlider(selector, goUp) {
      const slider = document.querySelector(selector);
      const value = parseInt(goUp ? slider.max : slider.min);
      VALUE_SET.call(slider, value);
      slider.dispatchEvent(new Event("change", { value, bubbles: true }));
    }

    function usingVolumeSlider(command) {
      usingSlider("[class*=volume] input[type=range]", command == "volume-up");
    }

    function usingSeekSlider(command) {
      usingSlider(
        "[class=playback-bar] input[type=range]",
        command == "seek-forward"
      );
    }

    function usingSelector(command) {
      const spoticon = (x) => `.control-button.spoticon-${x}-16`;
      const testid = (x) => `[data-testid=${x}]`;
      const selectors = {
        "play-pause": [
          spoticon("play"),
          spoticon("pause"),
          testid("control-button-play"),
          testid("control-button-pause"),
          testid("control-button-playpause"),
        ],
        next: [spoticon("skip-forward"), testid("control-button-skip-forward")],
        previous: [spoticon("skip-back"), testid("control-button-skip-back")],
        shuffle: [spoticon("shuffle"), testid("control-button-shuffle")],
        repeat: [
          spoticon("repeat"),
          spoticon("repeatonce"),
          testid("control-button-repeat"),
        ],
        like: [".control-button-heart", testid("add-button")],
        "volume-mute": [
          ".volume-bar__icon-button control-button",
          testid("volume-bar-toggle-mute-button"),
        ],
      }[command];
      if (!selectors) throw "";
      const selector = selectors.map((s) => `${s}:not(${DENY})`).join(", ");
      clickAndAnimate(document.querySelector(selector));
    }

    function usingSvg(command) {
      const paths = {
        "play-pause": [
          "M0 0h16v16H0z",
          "M4.018 14L14.41 8 4.018 2z",
          "M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z",
          "M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z",
        ],
        next: [
          "M11 3v4.119L3 2.5v11l8-4.619V13h2V3z",
          "M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z",
        ],
        previous: [
          "M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z",
          "M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z",
        ],
        shuffle: [
          "M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z",
          "M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z",
        ],
        like: [
          "M13.764 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253A4.05 4.05 0 00.974 5.61c0 1.089.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195A4.052 4.052 0 0014.96 5.61a4.057 4.057 0 00-1.196-2.883zm-.722 5.098L8.58 13.048c-.307.36-.921.36-1.228 0L2.864 7.797a3.072 3.072 0 01-.905-2.187c0-.826.321-1.603.905-2.187a3.091 3.091 0 012.191-.913 3.05 3.05 0 011.957.709c.041.036.408.351.954.351.531 0 .906-.31.94-.34a3.075 3.075 0 014.161.192 3.1 3.1 0 01-.025 4.403z",
          "M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z",
          "M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z",
          "M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z",
          "M11.75 8a.75.75 0 01-.75.75H8.75V11a.75.75 0 01-1.5 0V8.75H5a.75.75 0 010-1.5h2.25V5a.75.75 0 011.5 0v2.25H11a.75.75 0 01.75.75z",
          "M0 8a8 8 0 1116 0A8 8 0 010 8zm11.748-1.97a.75.75 0 00-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 10-1.061 1.06l2.466 2.467 5.53-5.53z",
        ],
        repeat: [
          "M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z",
          "M5 5v-.5V4c-2.2.3-4 2.2-4 4.5 0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.7 3.3 5.3 5 5zM10.5 12H6v-1.5l-3.5 2 3.5 2V13h4.5c1.9 0 3.5-1.2 4.2-2.8-.5.3-1 .5-1.5.6-.7.7-1.6 1.2-2.7 1.2zM11.5 0C9 0 7 2 7 4.5S9 9 11.5 9 16 7 16 4.5 14 0 11.5 0zm.9 7h-1.3V3.6H10v-1h.1c.2 0 .3 0 .4-.1.1 0 .3-.1.4-.2.1-.1.2-.2.2-.3.1-.1.1-.2.1-.3v-.1h1.1V7z",
          "M5 5V4c-2.2.3-4 2.2-4 4.5 0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.7 3.3 5.3 5 5zm5.5 7H6v-1.5l-3.5 2 3.5 2V13h4.5c1.9 0 3.5-1.2 4.2-2.8-.5.3-1 .5-1.5.6-.7.7-1.6 1.2-2.7 1.2zm1-12C9 0 7 2 7 4.5S9 9 11.5 9 16 7 16 4.5 14 0 11.5 0zm.9 7h-1.3V3.6H10v-1h.1c.2 0 .3 0 .4-.1.1 0 .3-.1.4-.2.1-.1.2-.2.2-.3.1-.1.1-.2.1-.3v-.1h1.1V7z",
          "M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z",
          "M0 4.75A3.75 3.75 0 013.75 1h.75v1.5h-.75A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5zM12.25 2.5h-.75V1h.75A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25z",
        ],
        "seek-forward": [
          "M6 5h4v1.5l3.464-2L10 2.5V4H6C3.25 4 1 6.25 1 9s2.25 5 5 5v-1c-2.206 0-4-1.794-4-4s1.794-4 4-4zm1.935 3.739a1.306 1.306 0 01-.32.332c-.13.096-.281.172-.451.228a1.956 1.956 0 01-.562.092v.752h1.36v3.856h1.096V8.327h-.96c-.026.15-.08.287-.163.412zm6.139 2.628a1.664 1.664 0 00-.399-.592 1.747 1.747 0 00-.612-.368 2.295 2.295 0 00-.78-.128c-.191 0-.387.03-.584.092-.197.061-.357.15-.479.268l.327-1.352h2.376v-.96h-3.128l-.688 2.872c.037.016.106.041.204.076l.308.108.309.108.212.076c.096-.112.223-.206.38-.28.157-.075.337-.112.54-.112.133 0 .264.021.392.064a.97.97 0 01.336.188.907.907 0 01.233.316c.058.128.088.274.088.44a.941.941 0 01-.3.721.995.995 0 01-.328.196 1.19 1.19 0 01-.404.068c-.16 0-.306-.025-.436-.076a1.03 1.03 0 01-.569-.532 1.171 1.171 0 01-.1-.4l-1.04.248c.02.224.086.439.195.644.109.205.258.388.444.548.186.16.406.287.66.38.253.093.534.14.844.14.336 0 .636-.052.9-.156.264-.104.487-.245.672-.424.184-.179.325-.385.424-.62a1.91 1.91 0 00.148-.752c0-.3-.049-.566-.145-.801z",
          "M13.536 4.5h-1.473a.75.75 0 100 1.5H16V2.063a.75.75 0 00-1.5 0v1.27A8.25 8.25 0 103.962 15.887a.75.75 0 10.827-1.25A6.75 6.75 0 1113.535 4.5z",
        ],
        "seek-backward": [
          "M10 4.001H6V2.5l-3.464 2L6 6.5V5h4c2.206 0 4 1.794 4 4s-1.794 4-4 4v1c2.75 0 5-2.25 5-5s-2.25-4.999-5-4.999zM2.393 8.739c-.083.126-.19.236-.32.332a1.642 1.642 0 01-.452.229 1.977 1.977 0 01-.56.092v.752h1.36V14h1.096V8.327h-.96c-.027.15-.081.287-.164.412zm5.74 2.036a1.762 1.762 0 00-.612-.368 2.295 2.295 0 00-.78-.128c-.191 0-.387.031-.584.092a1.188 1.188 0 00-.479.268l.327-1.352H8.38v-.96H5.252l-.688 2.872c.037.017.105.042.204.076l.308.108.309.107.212.076c.096-.112.223-.205.38-.28.157-.075.337-.112.54-.112.133 0 .264.021.392.063.128.043.24.105.336.188a.907.907 0 01.233.316c.059.128.088.275.088.44a.927.927 0 01-.628.916 1.19 1.19 0 01-.404.068c-.16 0-.306-.025-.435-.076a1.046 1.046 0 01-.34-.212.992.992 0 01-.229-.32 1.171 1.171 0 01-.1-.4l-1.04.248c.021.225.086.439.195.645.109.205.258.388.444.548.187.16.406.287.66.38.253.093.534.14.844.14.336 0 .636-.052.9-.156.264-.104.487-.246.672-.424.184-.179.325-.385.424-.62.099-.235.148-.485.148-.752 0-.298-.049-.565-.145-.8a1.686 1.686 0 00-.399-.591z",
          "M2.464 4.5h1.473a.75.75 0 110 1.5H0V2.063a.75.75 0 011.5 0v1.27a8.25 8.25 0 1110.539 12.554.75.75 0 01-.828-1.25A6.75 6.75 0 102.464 4.5z",
        ],
        "volume-mute": [
          "M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z",
          "M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z",
        ],
      }[command];
      if (!paths) throw "";
      const selector = paths.map((p) => `button svg path[d="${p}"]`).join(", ");
      if (!selector) throw "";
      let e = document.querySelector(selector);
      if (!e) throw "<path> not found";
      while (!!e && !!e.tagName && e.tagName.toLowerCase() !== "button")
        e = e.parentNode;
      clickAndAnimate(e);
    }

    if (command == "volume-up" || command == "volume-down") {
      try {
        usingVolumeSlider(command);
        console.log(`[SpotOn Hotkeys] Changed volume slider for '${command}'.`);
      } catch (error) {
        console.error(
          `[SpotOn Hotkeys] Error while changing volume slider for '${command}': ${error}`
        );
      }
      return;
    }

    try {
      usingSelector(command);
      console.log(
        `[SpotOn Hotkeys] Executed selector-based action for '${command}'.`
      );
      return;
    } catch (error) {
      try {
        usingSvg(command);
        console.log(
          `[SpotOn Hotkeys] Executed SVG-based action for '${command}'.`
        );
        return;
      } catch (error) {
        if (command == "seek-forward" || command == "seek-backward") {
          try {
            usingSeekSlider(command);
            console.log(
              `[SpotOn Hotkeys] Changed seek slider for '${command}'.`
            );
            return;
          } catch (error) {
            console.error(
              `[SpotOn Hotkeys] Error while changing seek slider for '${command}': ${error}`
            );
          }
        }
        console.error(
          `[SpotOn Hotkeys] Error while executing '${command}': ${error}`
        );
      }
    }
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: findAndClick,
    args: [command],
  });
}

chrome.commands.onCommand.addListener(async function (command) {
  const tabs = await chrome.tabs.query({ url: "https://open.spotify.com/*" });

  tabs.forEach(async function (tab) {
    try {
      await sendCommandToTab(command, tab);
      console.log(
        `[SpotOn Hotkeys] Sent command '${command}' to tab ${tab.id}.`
      );
    } catch (error) {
      console.error(
        `[SpotOn Hotkeys] Error while sending command '${command}' to tab ${tab.id}: ${error}`
      );
    }
  });
});

//
chrome.runtime.onInstalled.addListener(function (object) {
  const pages = {
    download: "download.html",
  };

  if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    for (const pageName in pages) {
      const pageURL = chrome.runtime.getURL(pages[pageName]);
      chrome.tabs.create({ url: pageURL });
    }
  }
});

// Color Picker
// Background script to handle the message and open the popup
chrome.runtime.onMessage.addListener(({ openPopup }) => {
  if (openPopup) {
    // Open the color picker popup
    chrome.windows.create({
      url: "color.html",
      type: "popup",
      width: 400,
      height: 500,
    });
  }
});

// Toggle SpotOn
let isEnabled = true;

function updateExtensionStatus(boolValue) {
  isEnabled = boolValue;
}

function toggleExtension() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const boolValue = !isEnabled;
    const toggleText = boolValue ? "enable" : "disable";

    chrome.tabs.sendMessage(
      tabs[0].id,
      { txt: toggleText, bool: boolValue.toString() },
      function (response) {
        if (chrome.runtime.lastError) {
          console.error(
            "Error sending message to content script:",
            chrome.runtime.lastError
          );
        } else {
          console.log("Response from content script:", response);
          if (response !== undefined && response.status !== undefined) {
            console.log("Content script response:", response.status);
          }
        }
      }
    );

    updateExtensionStatus(boolValue);
  });
}

chrome.commands.onCommand.addListener(function (command) {
  if (command === "toggle_spoton") {
    toggleExtension();
  }
});
//
// END
//

// Right click menu actions
(() => {
  "use strict";

  const Command = {
    Search: "SpotOn-extension-search",
    OpenSpotify: "SpotOn-extension-open-spotify",
    CreatePlaylist: "SpotOn-extension-create-playlist",
    NewReleases: "SpotOn-extension-new-releases",
    YourLibrary: "SpotOn-extension-your-library",
    CloseTab: "SpotOn-extension-CloseTab",
  };

  const actions = [
    {
      id: Command.Search,
      title: '🔍 Search Spotify for "%s"',
      contexts: ["selection"],
      handler: (info) => {
        if (info.menuItemId === Command.Search) {
          chrome.tabs.create(
            {
              url: `https://open.spotify.com/search/${info.selectionText}`,
            },
            (tab) => {
              if (chrome.runtime.lastError) {
                console.error("Error creating tab:", chrome.runtime.lastError);
              } else {
                console.log("Tab created:", tab);
              }
            }
          );
        }
      },
    },
    {
      id: Command.CreatePlaylist,
      title: "🔨 Open Playlists",
      contexts: ["page"],
      handler: () => {
        openSpotifyTab("https://open.spotify.com/collection/playlists");
      },
    },
    {
      id: Command.OpenSpotify,
      title: "🎧 Open Spotify In Tab",
      contexts: ["page"],
      handler: () => {
        openSpotifyTab("https://open.spotify.com/");
      },
    },
    {
      id: Command.NewReleases,
      title: "🆕 New Releases",
      contexts: ["page"],
      handler: () => {
        openSpotifyTab("https://open.spotify.com/browse/new-releases");
      },
    },
    {
      id: Command.YourLibrary,
      title: "📚 Your Library",
      contexts: ["page"],
      handler: () => {
        openSpotifyTab("https://open.spotify.com/collection/library");
      },
    },
    {
      id: Command.CloseTab,
      title: "🌂 Close Current Tab",
      contexts: ["page"],
      handler: () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (chrome.runtime.lastError) {
            console.error("Error querying tabs:", chrome.runtime.lastError);
          } else {
            const tab = tabs[0];
            chrome.tabs.remove(tab.id, () => {
              if (chrome.runtime.lastError) {
                console.error("Error removing tab:", chrome.runtime.lastError);
              } else {
                console.log("Tab closed:", tab);
              }
            });
          }
        });
      },
    },
  ];

  function openSpotifyTab(url) {
    chrome.tabs.query({ url: "https://open.spotify.com/*" }, (tabs) => {
      if (tabs && tabs.length > 0) {
        const spotifyTab = tabs.find((tab) => tab.url === url);
        if (spotifyTab) {
          chrome.tabs.update(
            spotifyTab.id,
            { active: true },
            handleTabUpdateError
          );
        } else {
          chrome.tabs.create({ url }, handleTabCreateError);
        }
      } else {
        chrome.tabs.create({ url }, handleTabCreateError);
      }
    });
  }

  function handleCommand(command) {
    if (command === Command.OpenSpotify) {
      openSpotifyTab("https://open.spotify.com/");
    } else if (command === Command.Search) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!chrome.runtime.lastError) {
          const selectionText = tabs[0].title;
          chrome.tabs.create(
            {
              url: `https://open.spotify.com/search/${selectionText}`,
            },
            handleTabCreateError
          );
        }
      });
    }
    // Add logic for other commands if need be
  }

  function initialize() {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([
          {
            conditions: [new chrome.declarativeContent.PageStateMatcher({})],
            actions: [new chrome.declarativeContent.ShowPageAction()],
          },
        ]);
      });

      actions.forEach(({ id, title, contexts }) => {
        chrome.contextMenus.create(
          { id, title, contexts },
          handleContextMenuError
        );
      });
    });

    chrome.commands.onCommand.addListener(handleCommand);

    chrome.contextMenus.onClicked.addListener((info) => {
      const action = actions.find((a) => a.id === info.menuItemId);
      if (action && action.handler) {
        action.handler(info);
      }
    });
  }

  function handleContextMenuError() {
    if (chrome.runtime.lastError) {
      console.error("Error creating context menu:", chrome.runtime.lastError);
    }
  }

  function handleTabUpdateError(updatedTab) {
    if (chrome.runtime.lastError) {
      console.error("Error updating tab:", chrome.runtime.lastError);
    }
  }

  function handleTabCreateError(newTab) {
    if (chrome.runtime.lastError) {
      console.error("Error creating tab:", chrome.runtime.lastError);
    }
  }

  initialize();
})();
/*
 * Refined from the original 900 line sucker lmaooo
 */
//
//
//
//
// Checkbox functions for the settings.html
//

// Add functions for Artist pick on artist page
// Also hide their About, Merch, Discover On, Artist Playlist, Appears on, Fans also like -- iddk

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    console.log("Tab updated:", tab.url);

    const startTime = performance.now(); // Start measuring loading time

    chrome.storage.sync.get(
      [
        "themeSelected",
        "addLyricsButton",
        "righter",
        "roundAlbumArt",
        "rainbowControls",
        "dynamicArt",
        "hiddenSDate",
        "hiddenSNumber",
        "scrollNPB",
        "hiddenSDura",
        "hiddenSAlbum",
        "hiddenSHeart",
        "hiddenSinfo",
        "removeOnTour",
        "hiddenSPL",
        "hiddenPIcon",
        "hiddenSTime",
        "removeprembutton",
        "removemusixmatch",
        "spinAlbum",
        "navToggle",
        "footernomore",
        "byeappthing",
        "fontLsize",
        "removeFeatArtist",
        "hideCB",
        "removeVolBar",
        "Scrollbar",
        "forceContextMenu",
        "enableDebugMode",
        "enableLogging",
        "removePodcasts",
        "hiddenAbout",
        "hiddenArtistPick",
        "removeNPB",
        "thickerPB",
        "hiddenNPVqueue",
        "removeFansLiked",
        "removeAppearsOn",
        "removeNPV",
        "hiddenNPVtour",
        "featInDev",
        "featinDev",
        "addColortoNPB",
        "addDownloadButton",
        "rainbowProgressbar",
        "shadow",
        "hiddenLyricsButton",
        "hiddenDevicePicker",
        "lyricsColor",
        "reducedTransparency",
        "removeDiscoveron",
        "removeDiscovergraphy",
        "removeMerch",
        "hideSpotifyOffers",
      ],
      function (obj) {
        console.log("Storage values:", obj);
        let themeSelected = obj ? obj.themeSelected : "default.css";
        let addLyricsButton =
          obj && typeof obj.addLyricsButton === "boolean"
            ? obj.addLyricsButton
            : true;
        let navToggle =
          obj && typeof obj.navToggle === "boolean" ? obj.navToggle : true;
        let righter =
          obj && typeof obj.righter === "boolean" ? obj.righter : true;
        let roundAlbumArt =
          obj && typeof obj.roundAlbumArt === "boolean"
            ? obj.roundAlbumArt
            : true;
        let rainbowControls =
          obj && typeof obj.rainbowControls === "boolean"
            ? obj.rainbowControls
            : true;
        let dynamicArt =
          obj && typeof obj.dynamicArt === "boolean" ? obj.dynamicArt : true;
        let hiddenSDate =
          obj && typeof obj.hiddenSDate === "boolean" ? obj.hiddenSDate : false;
        let hiddenSNumber =
          obj && typeof obj.hiddenSNumber === "boolean"
            ? obj.hiddenSNumber
            : false;
        let hiddenSDura =
          obj && typeof obj.hiddenSDura === "boolean" ? obj.hiddenSDura : false;
        let hiddenSAlbum =
          obj && typeof obj.hiddenSAlbum === "boolean"
            ? obj.hiddenSAlbum
            : false;
        let hiddenSHeart =
          obj && typeof obj.hiddenSHeart === "boolean"
            ? obj.hiddenSHeart
            : false;
        let hiddenSinfo =
          obj && typeof obj.hiddenSinfo === "boolean" ? obj.hiddenSinfo : false;
        let hiddenSPL =
          obj && typeof obj.hiddenSPL === "boolean" ? obj.hiddenSPL : false;
        let hiddenPIcon =
          obj && typeof obj.hiddenPIcon === "boolean" ? obj.hiddenPIcon : false;
        let hiddenSTime =
          obj && typeof obj.hiddenSTime === "boolean" ? obj.hiddenSTime : false;
        let scrollNPB =
          obj && typeof obj.scrollNPB === "boolean" ? obj.scrollNPB : false;
        let removeprembutton =
          obj && typeof obj.removeprembutton === "boolean"
            ? obj.removeprembutton
            : true;
        let removemusixmatch =
          obj && typeof obj.removemusixmatch === "boolean"
            ? obj.removemusixmatch
            : true;
        let spinAlbum =
          obj && typeof obj.spinAlbum === "boolean" ? obj.spinAlbum : true;
        let footernomore =
          obj && typeof obj.footernomore === "boolean"
            ? obj.footernomore
            : true;
        let byeappthing =
          obj && typeof obj.byeappthing === "boolean" ? obj.byeappthing : true;
        let fontLsize =
          obj && typeof obj.fontLsize === "boolean" ? obj.fontLsize : true;
        let hideCB =
          obj && typeof obj.hideCB === "boolean" ? obj.hideCB : false;
        let removeVolBar =
          obj && typeof obj.removeVolBar === "boolean"
            ? obj.removeVolBar
            : false;
        let scrollbar =
          obj && typeof obj.scrollbar === "boolean" ? obj.scrollbar : false;
        let enableDebugMode =
          obj && typeof obj.enableDebugMode === "boolean"
            ? obj.enableDebugMode
            : false;
        let enableLogging =
          obj && typeof obj.enableLogging === "boolean"
            ? obj.enableLogging
            : false;
        let removePodcasts =
          obj && typeof obj.removePodcasts === "boolean"
            ? obj.removePodcasts
            : true;
        let hiddenAbout =
          obj && typeof obj.hiddenAbout === "boolean" ? obj.hiddenAbout : false;
        let hiddenArtistPick =
          obj && typeof obj.hiddenArtistPick === "boolean"
            ? obj.hiddenArtistPick
            : false;
        let removeNPB =
          obj && typeof obj.removeNPB === "boolean" ? obj.removeNPB : false;
        let thickerPB =
          obj && typeof obj.thickerPB === "boolean" ? obj.thickerPB : true;
        let hiddenNPVqueue =
          obj && typeof obj.hiddenNPVqueue === "boolean"
            ? obj.hiddenNPVqueue
            : false;
        let removeNPV =
          obj && typeof obj.removeNPV === "boolean" ? obj.removeNPV : false;
        let hiddenNPVtour =
          obj && typeof obj.hiddenNPVtour === "boolean"
            ? obj.hiddenNPVtour
            : true;
        let hiddenNPVartist =
          obj && typeof obj.hiddenNPVartist === "boolean"
            ? obj.hiddenNPVartist
            : false;
        let featInDev =
          obj && typeof obj.featInDev === "boolean" ? obj.featInDev : false;
        let featinDev =
          obj && typeof obj.featinDev === "boolean" ? obj.featinDev : false;
        let addColortoNPB =
          obj && typeof obj.addColortoNPB === "boolean"
            ? obj.addColortoNPB
            : false;
        let addDownloadButton =
          obj && typeof obj.addDownloadButton === "boolean"
            ? obj.addDownloadButton
            : false;
        let rainbowProgressbar =
          obj && typeof obj.rainbowProgressbar === "boolean"
            ? obj.rainbowProgressbar
            : false;
        let shadow = obj && typeof obj.shadow === "boolean" ? obj.shadow : true;
        let hiddenLyricsButton =
          obj && typeof obj.hiddenLyricsButton === "boolean"
            ? obj.hiddenLyricsButton
            : false;
        let hiddenDevicePicker =
          obj && typeof obj.hiddenDevicePicker === "boolean"
            ? obj.hiddenDevicePicker
            : false;
        let removeAlbumArt =
          obj && typeof obj.removeAlbumArt === "boolean"
            ? obj.removeAlbumArt
            : false;
        let lyricsColor =
          obj && typeof obj.lyricsColor === "boolean" ? obj.lyricsColor : false;
        let hideSpotifyOffers =
          obj && typeof obj.hideSpotifyOffers === "boolean"
            ? obj.hideSpotifyOffers
            : false;
        let reducedTransparency =
          obj && typeof obj.reducedTransparency === "boolean"
            ? obj.reducedTransparency
            : false;
        let removeMerch =
          obj && typeof obj.removeMerch === "boolean" ? obj.removeMerch : false;
        let removeDiscoveron =
          obj && typeof obj.removeDiscoveron === "boolean"
            ? obj.removeDiscoveron
            : false;
        let removeDiscovergraphy =
          obj && typeof obj.removeDiscovergraphy === "boolean"
            ? obj.removeDiscovergraphy
            : false;
        let removeFeatArtist =
          obj && typeof obj.removeFeatArtist === "boolean"
            ? obj.removeFeatArtist
            : false;
        let removeOnTour =
          obj && typeof obj.removeOnTour === "boolean"
            ? obj.removeOnTour
            : false;
        let removeFansLiked =
          obj && typeof obj.removeFansLiked === "boolean"
            ? obj.removeFansLiked
            : false;
        let removeAppearsOn =
          obj && typeof obj.removeAppearsOn === "boolean"
            ? obj.removeAppearsOn
            : false;

        if (scrollNPB) {
          console.log("Inserting scrollNPB.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/scrollNPB.css`],
          });
        }

        if (removePodcasts) {
          console.log("Inserting removePodcasts.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removePodcasts.css`],
          });
        }

        if (hiddenNPVqueue) {
          console.log("Inserting hiddenNPVqueue.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/hiddenNPVqueue.css`],
          });
        }

        if (hideSpotifyOffers) {
          console.log("Inserting hideSpotifyOffers.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/hideSpotifyOffers.css`],
          });
        }

        if (shadow) {
          console.log("Inserting shadow.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/shadow.css`],
          });
        }

        if (removeNPV) {
          console.log("Inserting removeNPV.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeNPV.css`],
          });
        }

        if (removeFeatArtist) {
          console.log("Inserting removeFeatArtist.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeFeatArtist.css`],
          });
        }

        if (hiddenNPVtour) {
          console.log("Inserting hiddenNPVtour.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/hiddenNPVtour.css`],
          });
        }

        if (removeDiscoveron) {
          console.log("Inserting removeDiscoveron.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeDiscoveron.css`],
          });
        }

        if (hiddenNPVartist) {
          console.log("Inserting hiddenNPVartist.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/hiddenNPVartist.css`],
          });
        }

        if (hiddenLyricsButton) {
          console.log("Inserting hiddenLyricsButton.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/hiddenLyricsButton.css`],
          });
        }

        if (hiddenDevicePicker) {
          console.log("Inserting hiddenDevicePicker.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/hiddenDevicePicker.css`],
          });
        }

        if (removeOnTour) {
          console.log("Inserting removeOnTour.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeOnTour.css`],
          });
        }

        if (removeAppearsOn) {
          console.log("Inserting removeAppearsOn.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeAppearsOn.css`],
          });
        }

        if (lyricsColor) {
          console.log("Inserting lyricsColor.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/lyricsColor.css`],
          });
        }

        if (removeDiscovergraphy) {
          console.log("Inserting removeDiscovergraphy.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeDiscovergraphy.css`],
          });
        }

        if (removeFansLiked) {
          console.log("Inserting removeFansLiked.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeFansLiked.css`],
          });
        }

        if (removeAlbumArt) {
          console.log("Inserting removeAlbumArt.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeAlbumArt.css`],
          });
        }

        if (righter) {
          console.log("Inserting righter.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/righter.css`],
          });
        }

        if (fontLsize) {
          console.log("Inserting fontLsize.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/fontLsize.css`],
          });
        }

        if (hideCB) {
          console.log("Inserting hideCB.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/hideCB.css`],
          });
        }

        if (footernomore) {
          console.log("Inserting footernomore.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/footernomore.css`],
          });
        }

        if (thickerPB) {
          console.log("Inserting thickerPB.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/thickerPB.css`],
          });
        }

        if (byeappthing) {
          console.log("Inserting byeappthing.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/byeappthing.css`],
          });
        }

        if (spinAlbum) {
          console.log("Inserting spinAlbum.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/spinAlbum.css`],
          });
        }

        if (removeVolBar) {
          console.log("Inserting removeVolBar.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeVolBar.css`],
          });
        }

        if (roundAlbumArt) {
          console.log("Inserting roundAlbumArt.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/roundAlbumArt.css`],
          });
        }

        if (removeprembutton) {
          console.log("Inserting removeprembutton.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/removeprembutton.css`],
          });
        }

        if (dynamicArt) {
          console.log("Inserting dynamicArt.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/dynamicArt.css`],
          });
        }

        if (addLyricsButton) {
          console.log("Executing addLyrics.js");
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["/options/addLyrics.js"],
          });
        }

        if (addColortoNPB) {
          console.log("Executing appendButton.js");
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["/options/appendButton.js"],
          });
        }

        if (addDownloadButton) {
          console.log("Executing addDownloadButton.js");
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["/options/addDownloadButton.js"],
          });
        }

        if (enableDebugMode) {
          console.log("Executing enableDebugMode.js");
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["/options/rightClickElementView.js"],
          });
        }

        if (enableLogging) {
          console.log("Executing enableLogging.js");
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["/options/logging.js"],
          });
        }

        if (featInDev) {
          console.log("Executing featInDev.js");
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["/options/featInDev.js"],
          });
        }

        if (featinDev) {
          console.log("Inserting featinDev.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/featinDev.css"],
          });
        }

        if (hiddenSDate) {
          console.log("Inserting hiddenSDate.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSDate.css"],
          });
        }

        if (removemusixmatch) {
          console.log("Inserting removemusixmatch.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/removemusixmatch.css"],
          });
        }

        if (hiddenSTime) {
          console.log("Inserting hiddenSTime.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSTime.css"],
          });
        }

        if (hiddenSNumber) {
          console.log("Inserting hiddenSNumber.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSNumber.css"],
          });
        }

        if (hiddenSDura) {
          console.log("Inserting hiddenSDura.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSDura.css"],
          });
        }

        if (hiddenSAlbum) {
          console.log("Inserting hiddenSAlbum.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSAlbum.css"],
          });
        }

        if (hiddenSHeart) {
          console.log("Inserting hiddenSHeart.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSHeart.css"],
          });
        }

        if (rainbowProgressbar) {
          console.log("Inserting rainbowProgressbar.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/rainbowProgressbar.css"],
          });
        }

        if (hiddenSinfo) {
          console.log("Inserting hiddenSinfo.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSinfo.css"],
          });
        }

        if (removeMerch) {
          console.log("Inserting removeMerch.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/removeMerch.css"],
          });
        }

        if (hiddenSPL) {
          console.log("Inserting hiddenSPL.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenSPL.css"],
          });
        }

        if (hiddenPIcon) {
          console.log("Inserting hiddenPIcon.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenPIcon.css"],
          });
        }

        if (hiddenAbout) {
          console.log("Inserting hiddenAbout.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenAbout.css"],
          });
        }

        if (hiddenArtistPick) {
          console.log("Inserting hiddenArtistPick.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/hiddenArtistPick.css"],
          });
        }

        if (removeNPB) {
          console.log("Inserting removeNPB.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./options/removeNPB.css"],
          });
        }

        if (rainbowControls) {
          console.log("Inserting rainbowControls.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/rainbowControls.css`],
          });
        }

        if (navToggle) {
          console.log("Executing navToggle.js");
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["/options/navToggle.js"],
          });
        }

        if (scrollbar) {
          console.log("Inserting Scrollbar.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/Scrollbar.css`],
          });
        }

        if (reducedTransparency) {
          console.log("Inserting reducedTransparency.css");
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [`./options/reducedTransparency.css`],
          });
        }

        console.log("Inserting themeSelected:", themeSelected);
        chrome.scripting.insertCSS({
          target: { tabId: tabId },
          files: [`./themes/${themeSelected}`],
        });

        const endTime = performance.now(); // Stop measuring loading time
        const loadingTime = endTime - startTime;
        console.log("Script loading time:", loadingTime, "ms");
      }
    );
  }
});

/* this was my try at an improved version but it seems to not work...
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    console.log("Tab updated:", tab.url);

    const startTime = performance.now(); // Start measuring loading time

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
      forceContextMenu: false,
      enableDebugMode: false,
      enableLogging: false,
      hiddenMerch: false,
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
    };

    chrome.storage.sync.get(["userOptions"], function (items) {
      const userOptions = items.userOptions || {};
      const options = { ...defaultOptions, ...userOptions };

      const cssFiles = [
        "scrollNPB.css",
        "removePodcasts.css",
        "hiddenNPVqueue.css",
        "shadow.css",
        "removeNPV.css",
        "themeSelected.css",
        "righter.css",
        "roundAlbumArt.css",
        "rainbowControls.css",
        "dynamicArt.css",
        "hiddenSDate.css",
        "hiddenSNumber.css",
        "scrollNPB.css",
        "hiddenSDura.css",
        "hiddenSAlbum.css",
        "hiddenSHeart.css",
        "hiddenSinfo.css",
        "hiddenSPL.css",
        "hiddenPIcon.css",
        "hiddenSTime.css",
        "removeprembutton.css",
        "removemusixmatch.css",
        "spinAlbum.css",
        "footernomore.css",
        "byeappthing.css",
        "fontLsize.css",
        "hideCB.css",
        "removeVolBar.css",
        "Scrollbar.css",
        "removePodcasts.css",
        "hiddenAbout.css",
        "hiddenArtistPick.css",
        "removeNPB.css",
        "thickerPB.css",
        "hiddenNPVqueue.css",
        "removeNPV.css",
        "hiddenNPVtour.css",
        "featinDev.css",
        "addColortoNPB.css",
        "rainbowProgressbar.css",
        "shadow.css",
      ];

      cssFiles.forEach((cssFile) => {
        console.log(`Inserting ${cssFile}`);
        chrome.scripting.insertCSS({
          target: { tabId: tabId },
          files: [`./options/${cssFile}`],
        });
      });

      const jsFiles = [
        "appendButton.js",
        "addLyrics.js",
        "addDownloadButton.js",
        "forceContextMenu.js",
        "enableDebugMode.js",
        "enableLogging.js",
        "featInDev.js",
        "navToggle.js",
      ];

      jsFiles.forEach((jsFile) => {
        console.log(`Executing ${jsFile}`);
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [`./options/${jsFile}`],
        });
      });

      console.log("Inserting themeSelected:", options.themeSelected);
      chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: [`./themes/${options.themeSelected}`],
      });

      const endTime = performance.now(); // Stop measuring loading time
      const loadingTime = endTime - startTime;
      console.log("Script loading time:", loadingTime, "ms");
    });
  }
});
*/
//
//
//

// Background.js
// Custom Options
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  // Ensure the changeInfo status is "complete" before applying customizations
  if (changeInfo.status === "complete") {
    chrome.storage.sync.get(
      [
        "customOptions",
        "customColor",
        "customLyrics",
        "customNPB",
        "nowPlayingView",
        "progressBarSettings",
      ],
      function (obj) {
        if (chrome.runtime.lastError) {
          console.error(
            "Error retrieving custom options:",
            chrome.runtime.lastError
          );
          return;
        }

        const customOptions = obj.customOptions;
        const customColor = obj.customColor;
        const customLyrics = obj.customLyrics;
        // const customNPB = obj.customNPB;
        // const progressBarSettings = obj.progressBarSettings;

        console.log("Custom Options:", customOptions);
        console.log("Custom Color:", customColor);
        console.log("Custom Lyrics:", customLyrics);
        //console.log("Custom Now Playing Bar:", customNPB);
        // console.log("Custom Progess bar:", progressBarSettings);

        // Check if customOptions is empty, and if so, set default values
        if (!customOptions) {
          // Default customOptions values
          const defaultOptions = {
            borderRadiusInput: "10px",
            // paddingInput: "10px",
            // heightInput: "100px",
            // widthInput: "100px",
          };
          // Save default values to storage
          chrome.storage.sync.set({ customOptions: defaultOptions });
          // Assign defaultOptions to customOptions to apply default CSS
          customOptions = defaultOptions;
        }

        // Check if customColor is empty, and if so, set default value
        if (!customColor) {
          // Default customColor value (light red)
          const defaultColor = "radial-gradient(pink, transparent, lightpink)";
          // https://user-images.githubusercontent.com/103985728/258636474-4d775c93-9e64-4abc-ae9b-335205775016.gif
          // Save default value to storage
          chrome.storage.sync.set({ customColor: defaultColor });
          // Assign defaultColor to customColor to apply default CSS
          customColor = defaultColor;
        }

        // Check if customLyrics is empty, and if so, set default values
        if (!customLyrics) {
          // Default customLyrics values
          const defaultLyrics = {
            // lpaddingInput: "5px",
            // lheightInput: "40px",
            // lwidthInput: "100%",
            lcolorInput: "wheat",
            // lfontInput: "12px",
          };
          // Save default values to storage
          chrome.storage.sync.set({ customLyrics: defaultLyrics });
          // Assign defaultLyrics to customLyrics to apply default CSS
          customLyrics = defaultLyrics;
        }

        // Apply custom options to the desired element
        if (customOptions) {
          const optionsCSS = `
            .sqKERfoKl4KwrtHqcKOd {
              /* Nav bar pt.1 */
              border-radius: ${customOptions.borderRadius} !important;
              padding: ${customOptions.padding} !important;
              height: ${customOptions.height} !important;
              width: ${customOptions.width} !important;
            }
          `;
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: optionsCSS,
          });
          console.log("Applied Custom Options:", optionsCSS);
        }

        if (customColor) {
          const colorCSS = `
          /* Nav bar pt.2 color */
          .sqKERfoKl4KwrtHqcKOd {
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
          .BdcvqBAid96FaHAmPYw_ {
            overflow-x: none !important;
          }
          .ifVI2CEdOZGgMWIUN2Cw {
            background: transparent !important;
            background-color: transparent !important;
          }
          /* Now Playing bar */
          .JG5J9NWJkaUO9fiKECMA {
            background-color: ${customColor} !important;
            background: ${customColor} !important;
            background: var(${customColor}) !important;
            background-image: url('${customColor}') !important;
            background-image: var(${customColor}) !important;
            background-image: ${customColor} !important;
            border-radius: 45px !important;
            min-height: -webkit-fill-available !important;
            height: -webkit-fill-available !important;
            width: -webkit-fill-available !important;
            background-size: cover !important;
            background-attachment: fixed !important;
            background-repeat: no-repeat !important;
            background-blend-mode: soft-light !important;
            }
            /* Now Playing View */
            .AzO2ondhaHJntbGy_3_S {
              background-color: transparent !important;
            }
            /* Nav bar */
            .EZFyDnuQnx5hw78phLqP {
              background-color: transparent !important;
            }
            /* top bar thingo */
            /* .T1xI1RTSFU7Wu94UuvE6,
             [data-right-sidebar-hidden] .PHgyArRLVFknlaOm31ID,
            .ZQftYELq0aOsg6tPbVbV {
              background-color: ${customColor} !important;
              background: ${customColor} !important;
              background: var(${customColor}) !important;
              background-image: url('${customColor}') !important;
              background-image: var(${customColor}) !important;
              background-image: ${customColor} !important;
              border-radius: 45px !important;
              background-size: cover !important;
              background-attachment: fixed !important;
              background-repeat: no-repeat !important;
              background-blend-mode: soft-light !important;
            }*/
            .deomraqfhIAoSB3SgXpu {
              transform: translateX(28px) !important;
            }
            /* now playing view */
            .OTfMDdomT5S7B5dbYTT8 {
              background-color: ${customColor} !important;
              background: ${customColor} !important;
              background: var(${customColor}) !important;
              background-image: url('${customColor}') !important;
              background-image: var(${customColor}) !important;
              background-image: ${customColor} !important;
              border-radius: 30px !important;
              min-height: -webkit-fill-available !important;
              height: -webkit-fill-available !important;
              width: -webkit-fill-available !important;
              background-size: cover !important;
              background-attachment: fixed !important;
              background-repeat: no-repeat !important;
              background-blend-mode: soft-light !important;
            }
            /* Keyboard shortcuts */
            .EhyK_jJzB2PcWXd5lg24 {
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
              border-radius: 30px !important;
            }
            /* Streaming to device */
            #context-menu
              [aria-labelledby="device-picker-icon-button"]:has(
                #device-picker-header [data-testid="animated-now-playing"]
              ),
              .aCtCKL9BxAoHeVZS0uRs.bk509U3ZhZc9YBJAmoPB {
              background-color: ${customColor} !important;
              background: ${customColor} !important;
              background: var(${customColor}) !important;
              background-image: url('${customColor}') !important;
              background-image: var(${customColor}) !important;
              background-image: ${customColor} !important;
              background-size: cover !important;
              background-attachment: fixed !important;
              background-repeat: no-repeat !important;
              border-radius: 35px !important;
            }
            /* Credits */
            .uV8q95GGAb2VDtL3gpYa,
            .Nw1INlIyra3LT1JjvoqH,
            .pGU_qEtNT1qWKjrRbvan {
              background-color: ${customColor} !important;
              background: ${customColor} !important;
              background: var(${customColor}) !important;
              background-image: url('${customColor}') !important;
              background-image: var(${customColor}) !important;
              background-image: ${customColor} !important;
              background-size: cover !important;
              background-attachment: fixed !important;
              background-repeat: no-repeat !important;
            }
            .pGU_qEtNT1qWKjrRbvan {
              border-top-right-radius: 20px !important;
              border-top-left-radius: 20px !important;
            }
            .Nw1INlIyra3LT1JjvoqH {
              border-bottom-right-radius: 20px !important;
              border-bottom-left-radius: 20px !important;
            }
          `;
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: colorCSS,
          });
          console.log("Applied Custom Color:", colorCSS);
        }

        /*
        // Now playing bar options
        if (customNPB) {
          const customNPBCSS = `
           /* now playing bar */
        /* .spotify__container--is-web #main .nav-ylx [data-testid="now-playing-bar"]
            .OTfMDdomT5S7B5dbYTT8 {
             background-color: ${customNPB.color} !important;
             background-image: url(${customNPB.img}) !important;
             background-size: cover !important;
             background-attachment: fixed !important;
             background-repeat: no-repeat !important;
             background-blend-mode: soft-light !important;
             border-left: 120px dotted rgba(0,0,0,.01) !important;
             border-radius: ${customNPB.borderRadius} !important; /* deafult 70px
             height: ${customNPB.height} !important; /* default height 83px
             padding-right: 10px !important;
             min-height: -webkit-fill-available !important;
             width: -webkit-fill-available !important;
             /* additions
             border-left: 120px dotted rgba(0, 0, 0, 0.01) !important;
             border-radius: 70px !important;
             height: 83px !important;
           }
         `;
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: customNPBCSS,
          });
          console.log("Applied Custom Now Playing Bar:", customNPBCSS);
        }
        */

        // Settings for custom progess bar
        /*
        if (progressBarSettings) {
          const progressBarSettings = `
         /* Now Playing Bar (NPB)
          .playback-bar *, .w699O0LgQRghXyl3bs9u, .TywOcKZEqNynWecCiATc, .p1ULRzPc4bD8eQ4T_wyp, .nav-ylx .GD2gbRtcs5dOjMGAM_Y4,
          .TywOcKZEqNynWecCiATc {
          --is-active-fg-color: ${progressBarSettings.pAFGColor} !important;
          --bg-color: ${progressBarSettings.pBGColor} !important;
          --fg-color: ${progressBarSettings.pFGColor} !important;
          /* ${progressBarSettings.pColor}
          --progress-bar-height: 6px !important;
          }
          .epWhU7hHGktzlO_dop6z {
            background-color: pink !important;
          }

          /* Progess bar, (inner progress bar) how long has the song gone on for?
          div[data-testid="progress-bar-background"] div div {
                   background-image: ${progressBarSettings.pColor} !important;
                   /* ↑ nice little linear gradient - linear-gradient(to right, rgba(73, 0, 255, 1), rgba(96, 0, 255, 1) 20%, rgba(119, 0, 255, 1) 40%, rgba(141, 23, 232, 1) 60%, rgba(141, 23, 232, 0.8) 80%, rgba(141, 23, 232, 0.6)) !important;
                   border-radius: 20px !important;
                   margin: 1px !important;
                   /* Increase/decrease margin to make the bar smaller or larger
               }
               /* Progress bar background
               [data-testid="now-playing-bar"] [data-testid="player-controls"] [data-testid="playback-progressbar"] .w699O0LgQRghXyl3bs9u {
              background-color: ${progressBarSettings.pColor} !important;
          }
       `;
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: progressBarSettings,
          });
          console.log(
            "Applied Custom Progress bar settings:",
            progressBarSettings
          );
        }
        */

        // Settings for custom Lyrics
        if (customLyrics) {
          const optionsCSS = `
         .NiCdLCpp3o2z6nBrayOn.MEjuIn9iTBQbnCqHpkoQ {
           padding: ${customLyrics.lpaddingInput} !important;
           height: ${customLyrics.lheightInput} !important;
           width: ${customLyrics.lwidthInput} !important;
           color: ${customLyrics.lcolorInput} !important;
         }
         .os-content
         .main-view-container__scroll-node-child
         [aria-label="Spotify"]
         .esRByMgBY3TiENAsbDHA {
           font-size: ${customLyrics.lfontInput} !important;
           text-align: justify !important;
           text-indent: 3px !important;
         }
       `;
          chrome.scripting.insertCSS({
            target: { tabId: tabId },
            css: optionsCSS,
          });
          console.log("Applied Custom Lyrics:", optionsCSS);
        }
        // END
        // add more after this
      }
    );
    // END of custom options
  }
});
