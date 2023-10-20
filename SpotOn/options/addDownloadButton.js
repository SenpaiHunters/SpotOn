(function () {
  "use strict";

  let currentImageSrc = null;

  async function downloadImage(imageSrc) {
    try {
      const imageBlob = await fetch(imageSrc).then((response) => {
        if (!response.ok) {
          throw new Error("Image download failed");
        }
        return response.blob();
      });

      const imageURL = URL.createObjectURL(imageBlob);

      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "album_art.jpg";

      link.addEventListener("load", () => {
        URL.revokeObjectURL(imageURL);
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
    downloadButton.classList.add("icon-button");
    downloadButton.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: -2px;
      padding: 8px;
      margin-bottom: -10px;
      color: #fff;
      background-color: transparent;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    `;
    downloadButton.setAttribute("title", "Download Album Art");

    const icon = document.createElement("div");
    icon.style.cssText = `
      width: 24px;
      height: 24px;
      background-image: url('https://github.com/SenpaiHunters/Pictures/blob/main/SpotOn%20Pics/Resources/Assets/Download.png?raw=true');
      background-size: cover;
      background-position: center;
      fill: currentcolor;
      animation: rainbow-text 30s infinite;
      filter: brightness(0) invert(1);
    `;

    const dot = document.createElement("div");
    dot.style.cssText = `
      width: 6px;
      height: 6px;
      background-color: #1ED760;
      border-radius: 50%;
      margin-top: 4px;
      opacity: 0;
    `;

    downloadButton.appendChild(icon);
    downloadButton.appendChild(dot);

    downloadButton.addEventListener("mouseenter", () => {
      downloadButton.style.transform = "scale(1.1)";
      dot.style.opacity = 1;
    });

    downloadButton.addEventListener("mouseleave", () => {
      downloadButton.style.transform = "scale(1)";
      dot.style.opacity = 0;
    });

    downloadButton.addEventListener("click", () => {
      if (currentImageSrc) {
        downloadImage(currentImageSrc);
      }
    });

    return downloadButton;
  }

  function addDownloadButtonToNowPlayingBar() {
    const targetSelectors = [".deomraqfhIAoSB3SgXpu", ".oUsSfFiifMPXqW0kHjR6"];
    const nowPlayingBar = document.querySelector(targetSelectors.join(", "));

    if (
      !nowPlayingBar ||
      nowPlayingBar.querySelector('[data-testid="download-button"]')
    ) {
      return;
    }

    const downloadButton = createDownloadButton();
    nowPlayingBar.appendChild(downloadButton);
  }

  const observer = new MutationObserver(() => {
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      currentImageSrc = ogImageMeta.content;
    }
    addDownloadButtonToNowPlayingBar();
  });

  observer.observe(document, { childList: true, subtree: true });

  addDownloadButtonToNowPlayingBar();
})();
