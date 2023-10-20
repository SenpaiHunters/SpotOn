(function () {
  "use strict";

  // Function to handle the right-click event
  function handleRightClick(event) {
    console.log("Right-click event:", event);
    console.log("Right-click target:", event.target);

    // Block right-click if not the specific image element
    if (event.target.tagName.toLowerCase() !== "img") {
      event.preventDefault();
      console.log("Right-click blocked");
    }
  }

  // Add a listener for the contextmenu event on the entire document
  window.document.addEventListener("contextmenu", handleRightClick, true);

  // Display a warning message in the console
  console.warn("The copying of this code is strictly prohibited.");

  // Export a variable to indicate that right-click blocking is enabled
  window.__ENABLE_RIGHT_CLICK_SETUP = true;
})();
