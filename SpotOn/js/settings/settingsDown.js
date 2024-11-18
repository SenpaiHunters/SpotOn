document.addEventListener("DOMContentLoaded", async () => {
  const toggleButton = document.getElementById("toggleThemeLock");
  const anchor = document.createElement("a");
  anchor.style.display = "none";
  document.body.appendChild(anchor);

  // Centralized function to query active tab and send message
  async function queryTabAndSendMessage(message) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) throw new Error("No active tab found");
      return await chrome.tabs.sendMessage(tab.id, { txt: message });
    } catch (error) {
      console.error(`Error with tab operation '${message}':`, error);
      throw error; // Rethrow to handle specific cases outside
    }
  }

  // Update button based on theme lock status
  function updateButton(locked) {
    toggleButton.innerHTML = locked ? '<i class="fas fa-lock"></i> Unlock Theme' : '<i class="fas fa-lock-open"></i> Lock Theme';
    toggleButton.classList.toggle('is-danger', locked);
    toggleButton.classList.toggle('is-warning', !locked);
  }

  // Toggle theme lock and update button
  async function toggleThemeLock() {
    try {
      const response = await queryTabAndSendMessage("toggleLock");
      updateButton(response.themeLocked);
    } catch (error) {
      console.error("Error toggling theme lock:", error);
    }
  }

  // Check initial theme lock status
  async function checkInitialThemeLock() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab) throw new Error("No active tab found");
      if (!tab.url.startsWith("https://open.spotify.com/")) {
        console.log("Not on Spotify tab, skipping theme lock check");
        return;
      }
      const response = await chrome.tabs.sendMessage(tab.id, { txt: "checkLock" });
      if (chrome.runtime.lastError) {
        console.log("Content script not ready, retrying in 1 second");
        setTimeout(checkInitialThemeLock, 1000);
        return;
      }
      updateButton(response.themeLocked);
    } catch (error) {
      console.error("Error checking initial theme lock:", error);
      updateButton(false);
    }
  }

  // Handle album art download
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
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          const newImgUrl = URL.createObjectURL(blob);
          anchor.href = newImgUrl;
          anchor.download = "SpotOn_Album_Art.png";
          anchor.click();
          URL.revokeObjectURL(newImgUrl);
        }, 'image/png');
      };
      img.onerror = () => console.error("Error loading image from blob.");
    } catch (error) {
      console.error("Error downloading album art:", error);
    }
  }

  // Event listeners
  toggleButton.addEventListener("click", toggleThemeLock);
  document.getElementById("downloadAlbumArt")?.addEventListener("click", async () => {
    try {
      const response = await queryTabAndSendMessage("getAlbumArtURL");
      downloadAlbumArt(response.albumArtURL);
    } catch (error) {
      console.error("Error initiating album art download:", error);
    }
  });

  checkInitialThemeLock();
});