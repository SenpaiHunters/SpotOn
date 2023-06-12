window.onload = async function () {
  const onoff = document.getElementById("toggle_button");
  const nowPlayingColor = document.getElementById("nowPlayingColor");
  const navBarColor = document.getElementById("navBarColor");
  const songColor = document.getElementById("songColor");
  const albumArt = document.getElementById("albumArt");
  const hideSongDate = document.getElementById("hideSongDate");
  const hideSongNumbering = document.getElementById("hideSongNumbering");
  const queryOptions = { active: true, currentWindow: true };

  try {
    const options = await chrome.storage.sync.get([
      "enabled",
      "nowPlayingColor",
      "navBarColor",
      "songColor",
      "albumArt",
      "hideSongDate",
      "hideSongNumbering",
    ]);

    onoff.checked = options.enabled === "true";
    nowPlayingColor.value = options.nowPlayingColor || "";
    navBarColor.value = options.navBarColor || "";
    songColor.value = options.songColor || "";
    albumArt.value = options.albumArt || "";
    hideSongDate.value = options.hideSongDate || "hidden";
    hideSongNumbering.value = options.hideSongNumbering || "hidden";
  } catch (error) {
    console.error("Error retrieving storage data:", error);
  }

  function enableFeature(tabId) {
    return new Promise((resolve) => {
      console.log("Sending enable");
      chrome.tabs.sendMessage(
        tabId,
        { txt: "enable", bool: "true" },
        function (response) {
          console.log(response.status);
          resolve();
        }
      );
    });
  }

  function disableFeature(tabId) {
    return new Promise((resolve) => {
      console.log("Sending disable");
      chrome.tabs.sendMessage(
        tabId,
        { txt: "disable", bool: "false" },
        function (response) {
          console.log(response.status);
          resolve();
        }
      );
    });
  }

  function updateOptions() {
    chrome.tabs.query(queryOptions, (tabs) => {
      const tabId = tabs[0].id;
      const options = {
        enabled: onoff.checked ? "true" : "false",
        nowPlayingColor: nowPlayingColor.value,
        navBarColor: navBarColor.value,
        songColor: songColor.value,
        albumArt: albumArt.value,
        hideSongDate: hideSongDate.value,
        hideSongNumbering: hideSongNumbering.value,
      };

      chrome.storage.sync.set(options, function () {
        console.log("Options updated");
        chrome.tabs.sendMessage(tabId, { txt: "updateOptions", options });
      });

      // Apply the options to your SpotOn code
      applyOptions(options);
    });
  }

  onoff.addEventListener("click", function () {
    toggleFeature();
    updateOptions();
  });

  nowPlayingColor.addEventListener("change", updateOptions);
  navBarColor.addEventListener("change", updateOptions);
  songColor.addEventListener("change", updateOptions);
  albumArt.addEventListener("change", updateOptions);
  hideSongDate.addEventListener("change", updateOptions);
  hideSongNumbering.addEventListener("change", updateOptions);

  function toggleFeature() {
    chrome.tabs.query(queryOptions, (tabs) => {
      const tabId = tabs[0].id;
      if (onoff.checked) {
        enableFeature(tabId)
          .then(() => {
            console.log("Enabled");
          })
          .catch((error) => {
            console.error("Error enabling feature:", error);
          });
      } else {
        disableFeature(tabId)
          .then(() => {
            console.log("Disabled");
          })
          .catch((error) => {
            console.error("Error disabling feature:", error);
          });
      }
    });
  }

  function checkFeatureStatus() {
    return new Promise((resolve) => {
      chrome.tabs.query(queryOptions, (tabs) => {
        console.log("Checking status");
        chrome.tabs.sendMessage(
          tabs[0].id,
          { txt: "check", bool: "" },
          function (response) {
            if (response == undefined) {
              document.getElementsByClassName("container")[0].innerHTML =
                '<a id="title"> Open in Spotify for options </a>';
            } else {
              if (response.status == 1) {
                onoff.checked = true;
                console.log("Enabled");
              } else {
                onoff.checked = false;
                console.log("Disabled");
              }
            }
            resolve();
          }
        );
      });
    });
  }

  await checkFeatureStatus();
};
