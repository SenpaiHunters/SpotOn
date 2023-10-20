// Function to handle changes to the website title
function handleTitleChange(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList" && mutation.target.nodeName === "TITLE") {
      const currentTitle = mutation.target.innerText;
      console.log(`Website Title changed to: ${currentTitle}`);
      // You can perform any action here when the title changes
    }
  }
}

// Create a MutationObserver to watch for changes in the <title> element
const observer = new MutationObserver(handleTitleChange);

// Start observing changes in the <title> element
observer.observe(document.querySelector("head title"), {
  subtree: true,
  characterData: true,
  childList: true,
});
