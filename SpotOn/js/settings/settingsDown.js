document.addEventListener("DOMContentLoaded", async () => {
  const buttons = {
    downloadAlbumArt: "getAlbumArtURL",
    lockTheme: "lock",
    unlockTheme: "unlock"
  };

  const anchor = document.createElement("a");
  anchor.style.display = "none";
  document.body.appendChild(anchor);

  Object.entries(buttons).forEach(([id, message]) => {
    document.getElementById(id)?.addEventListener("click", () => sendMessage(message));
  });

  async function sendMessage(message) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const response = await chrome.tabs.sendMessage(tab.id, { txt: message });
      if (message === "getAlbumArtURL") {
        downloadAlbumArt(response.albumArtURL);
      } else {
        console.log(`Theme: ${response.themeState}, Extension: ${response.extensionEnabled}`);
      }
    } catch (error) {
      console.error(`Error: '${message}':`, error);
    }
  }

  async function downloadAlbumArt(url) {
    if (!url) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      img.onload = async () => {
        const scaleFactor = prompt("Scale factor (1=original, 2=double):", "4") || "4";
        const scale = Math.max(parseFloat(scaleFactor), 1) || 4;
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          const newImgUrl = URL.createObjectURL(blob);
          anchor.href = newImgUrl;
          anchor.download = "spotify_album_art.png";
          anchor.click();
          URL.revokeObjectURL(newImgUrl);
        }, 'image/png');
      };
    } catch (error) {
      console.error("Error downloading album art:", error);
    }
  }

  sendMessage("check");
});