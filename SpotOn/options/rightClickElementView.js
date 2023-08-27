(function () {
  "use strict";

  window.document.addEventListener(
    "contextmenu",
    (event) => {
      console.log("Right-click event:", event);
      console.log("Right-click target:", event.target);

      // Block right-click if not the specific image element
      if (event.target.tagName.toLowerCase() !== "img") {
        event.preventDefault();
        console.log("Right-click blocked");
      }
    },
    true
  );

  console.warn("The copying of this code is strictly prohibited.");

  window.__ENABLE_RIGHT_CLICK_SETUP = true;
})();
