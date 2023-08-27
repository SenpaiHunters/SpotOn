// addDownloadButton
/* button that works, but requires a reload to fetch the art again */

(function () {
  "use strict";

  async function downloadImage(imageSrc) {
    console.log("Start downloading image:", imageSrc);
    try {
      const image = await fetch(imageSrc);
      const imageBlob = await image.blob();
      const imageURL = URL.createObjectURL(imageBlob);

      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "album_art.jpg";

      // Add an event listener for the load event to log the completion
      link.addEventListener("load", () => {
        URL.revokeObjectURL(imageURL); // Clean up the URL object
        console.log("Download completed:", imageSrc);
      });

      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }

  function createDownloadButton() {
    const downloadButton = document.createElement("button");
    downloadButton.setAttribute("aria-label", "Download Album Art");
    downloadButton.setAttribute("data-testid", "download-button");
    downloadButton.setAttribute("class", "icon-button");
    downloadButton.style.display = "flex";
    downloadButton.style.flexDirection = "column";
    downloadButton.style.alignItems = "center";
    downloadButton.style.justifyContent = "center";
    downloadButton.style.marginRight = "-2px";
    downloadButton.style.padding = "8px";
    downloadButton.style.marginBottom = "-10px";
    downloadButton.style.color = "#fff";
    downloadButton.style.backgroundColor = "transparent";
    downloadButton.style.border = "none";
    downloadButton.style.borderRadius = "50%";
    downloadButton.style.cursor = "pointer";
    downloadButton.style.transition =
      "transform 0.2s ease-out, opacity 0.2s ease-out";
    downloadButton.setAttribute("title", "Download Album Art");

    const icon = document.createElement("div");
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.backgroundImage =
      "url('https://github.com/SenpaiHunters/Pictures/blob/main/SpotOn%20Pics/Resources/Assets/Download.png?raw=true')";
    icon.style.backgroundSize = "cover";
    icon.style.backgroundPosition = "center";
    icon.style.fill = "currentcolor";
    icon.style.animation = "rainbow-text 30s infinite";
    icon.style.filter = "brightness(0) invert(1)";

    const dot = document.createElement("div");
    dot.style.width = "6px";
    dot.style.height = "6px";
    dot.style.backgroundColor = "#1ED760";
    dot.style.borderRadius = "50%";
    dot.style.marginTop = "4px";
    dot.style.opacity = 0;
    downloadButton.appendChild(icon);
    downloadButton.appendChild(dot);

    downloadButton.addEventListener("mouseenter", () => {
      downloadButton.style.transform = "scale(1.1)";
      downloadButton.lastElementChild.style.opacity = 1;
    });

    downloadButton.addEventListener("mouseleave", () => {
      downloadButton.style.transform = "scale(1)";
      downloadButton.lastElementChild.style.opacity = 0;
    });

    downloadButton.addEventListener("click", () => {
      const metas = document.getElementsByTagName("meta");
      for (let i = 0; i < metas.length; i++) {
        if (
          metas[i].hasAttribute("property") &&
          metas[i].getAttribute("property") === "og:image"
        ) {
          const imageSrc = metas[i].content;
          downloadImage(imageSrc);
          break;
        }
      }
    });

    return downloadButton;
  }

  function addDownloadButtonToNowPlayingBar() {
    const targetSelectors = [".deomraqfhIAoSB3SgXpu", ".oUsSfFiifMPXqW0kHjR6"]; // Update with the appropriate selectors for the now playing bar
    // .mwpJrmCgLlVkJVtWjlI1 -- nope
    // .oUsSfFiifMPXqW0kHjR6 -- ??

    const nowPlayingBar = document.querySelector(targetSelectors);
    if (!nowPlayingBar) return;

    if (nowPlayingBar.querySelector('[data-testid="download-button"]')) {
      // If the download button is already added, return
      return;
    }

    const downloadButton = createDownloadButton();
    nowPlayingBar.appendChild(downloadButton);
  }

  // Observe mutations on the common ancestor to all now-playing-bars
  const observer = new MutationObserver(() => {
    addDownloadButtonToNowPlayingBar();
  });

  // Observe the whole document, so you don't need to querySelector again
  observer.observe(document, { childList: true, subtree: true });

  // Call the function once immediately to add the button on page load
  addDownloadButtonToNowPlayingBar();
})();

/* request it in a new tab
(function () {
  "use strict";

  function openImageInNewTab(imageSrc) {
    window.open(imageSrc, "_blank");
    console.log("Image opened in new tab:", imageSrc);
  }

  function createDownloadButton() {
    const downloadButton = document.createElement("button");
    downloadButton.setAttribute("aria-label", "Download Album Art");
    downloadButton.setAttribute("data-testid", "download-button");
    downloadButton.setAttribute("class", "icon-button");
    downloadButton.style.cursor = "pointer";
    downloadButton.style.transition =
      "transform 0.2s ease-out, opacity 0.2s ease-out";
    downloadButton.setAttribute("title", "Download Album Art");

    const icon = document.createElement("div");
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.backgroundImage =
      "url('https://github.com/SenpaiHunters/Pictures/blob/main/SpotOn%20Pics/Resources/Assets/Download.png?raw=true')";
    icon.style.backgroundSize = "cover";
    icon.style.backgroundPosition = "center";
    icon.style.fill = "currentcolor";
    icon.style.animation = "rainbow-text 30s infinite";
    icon.style.filter = "brightness(0) invert(1)";

    downloadButton.appendChild(icon);

    downloadButton.addEventListener("mouseenter", () => {
      downloadButton.style.transform = "scale(1.1)";
    });

    downloadButton.addEventListener("mouseleave", () => {
      downloadButton.style.transform = "scale(1)";
    });

    downloadButton.addEventListener("click", () => {
      const imageSrc = document.querySelector(
        'meta[property="og:image"]'
      ).content;
      // Add a confirmation to download
      if (confirm("Are you sure you want to download this album art?")) {
        openImageInNewTab(imageSrc);
      }
    });

    return downloadButton;
  }

  function addDownloadButtonToNowPlayingBar() {
    const targetSelector = ".deomraqfhIAoSB3SgXpu"; // Update with the appropriate selector for the now playing bar

    const nowPlayingBar = document.querySelector(targetSelector);
    if (!nowPlayingBar) return;

    if (nowPlayingBar.querySelector('[data-testid="download-button"]')) {
      // If the download button is already added, return
      return;
    }

    const downloadButton = createDownloadButton();
    nowPlayingBar.appendChild(downloadButton);
  }

  // Observe mutations on the common ancestor to all now-playing-bars
  const observer = new MutationObserver(() => {
    addDownloadButtonToNowPlayingBar();
  });

  // Observe the whole document, so you don't need to querySelector again
  observer.observe(document, { childList: true, subtree: true });

  // Call the function once immediately to add the button on page load
  addDownloadButtonToNowPlayingBar();
})();
*/

/* Another method to downloading
(function () {
  "use strict";

  function downloadImage(imageSrc) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", imageSrc, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: "image/jpeg" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "album_art.jpg";
        link.click();
        console.log("Download completed:", imageSrc);
      } else {
        console.error("Error downloading image:", xhr.statusText);
      }
    };
    xhr.onerror = function () {
      console.error("Error downloading image:", xhr.statusText);
    };
    xhr.send();
  }

  function createDownloadButton() {
    const downloadButton = document.createElement("button");
    downloadButton.setAttribute("aria-label", "Download Album Art");
    downloadButton.setAttribute("data-testid", "download-button");
    downloadButton.setAttribute("class", "icon-button");
    downloadButton.style.cursor = "pointer";
    downloadButton.style.transition =
      "transform 0.2s ease-out, opacity 0.2s ease-out";
    downloadButton.setAttribute("title", "Download Album Art");

    const icon = document.createElement("div");
    icon.style.width = "24px";
    icon.style.height = "24px";
    icon.style.backgroundImage =
      "url('https://github.com/SenpaiHunters/Pictures/blob/main/SpotOn%20Pics/Resources/Assets/Download.png?raw=true')";
    icon.style.backgroundSize = "cover";
    icon.style.backgroundPosition = "center";
    icon.style.fill = "currentcolor";
    icon.style.animation = "rainbow-text 30s infinite";
    icon.style.filter = "brightness(0) invert(1)";

    downloadButton.appendChild(icon);

    downloadButton.addEventListener("mouseenter", () => {
      downloadButton.style.transform = "scale(1.1)";
    });

    downloadButton.addEventListener("mouseleave", () => {
      downloadButton.style.transform = "scale(1)";
    });

    downloadButton.addEventListener("click", () => {
      const imageSrc = document.querySelector(
        'meta[property="og:image"]'
      ).content;
      // Add a confirmation to download
      if (confirm("Are you sure you want to download this album art?")) {
        downloadImage(imageSrc);
      }
    });

    return downloadButton;
  }

  function addDownloadButtonToNowPlayingBar() {
    const targetSelectors = [".deomraqfhIAoSB3SgXpu", ".PeNI572tTpqsN23o3QhJ"]; // Update with the appropriate selectors for the now playing bar

    const nowPlayingBar = document.querySelector(targetSelectors);
    if (!nowPlayingBar) return;

    if (nowPlayingBar.querySelector('[data-testid="download-button"]')) {
      // If the download button is already added, return
      return;
    }

    const downloadButton = createDownloadButton();
    nowPlayingBar.appendChild(downloadButton);
  }

  // Observe mutations on the common ancestor to all now-playing-bars
  const observer = new MutationObserver(() => {
    addDownloadButtonToNowPlayingBar();
  });

  // Observe the whole document, so you don't need to querySelector again
  observer.observe(document, { childList: true, subtree: true });

  // Call the function once immediately to add the button on page load
  addDownloadButtonToNowPlayingBar();
})();
*/
