console.log("%cSpotOn Started", "font-size: 40px; padding-bottom: 3px; color: white; text-shadow: -1px -1px #2e51a2, 1px -1px #2e51a2, -1px 1px #2e51a2, 1px 1px #2e51a2, 2px 2px #2e51a2, 3px 3px #2e51a2;");

// Select the parent element that is consistent and won't change.
const container = document.body;

let lastLoggedSong = ""; // Variable to keep track of the last logged song name.

// Function to handle mutation observations
const handleMutations = (mutations) => {
  const liveRegionElement = document.querySelector('span[aria-live="polite"][role="status"]');
  if (!liveRegionElement) return;

  const liveRegionText = liveRegionElement.textContent.trim();
  // Check if the song name has changed since the last log and is not blank.
  if (liveRegionText && liveRegionText !== lastLoggedSong) {
    console.log(liveRegionText);
    lastLoggedSong = liveRegionText; // Update the last logged song name.
  }
};

// Create a MutationObserver to observe changes in the container.
const observer = new MutationObserver((mutations) => {
  // Check if any mutation is related to childList or subtree.
  const isRelevantMutation = mutations.some(mutation => mutation.type === "childList" || mutation.type === "subtree");
  if (isRelevantMutation) {
    handleMutations(mutations);
  }
});

// Start observing the container for changes in child elements and subtree.
observer.observe(container, {
  childList: true,
  subtree: true,
  characterData: true
});

// This should be called when your application or the relevant part of your page is unloaded or no longer needs the observer.
function disconnectObserver() {
  observer.disconnect();
  console.log("MutationObserver disconnected to avoid memory leaks.");
}
// May lead to errors, add log to check when disconnected.