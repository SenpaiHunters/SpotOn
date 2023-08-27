// button method one
/*
function addButtonToElement(targetSelector, buttonText, buttonUrl, iconUrl) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
          // Create the new button container (containing icon and text)
          const newButtonContainer = document.createElement("a");
          newButtonContainer.setAttribute("aria-label", buttonText);
          newButtonContainer.setAttribute(
            "data-testid",
            "github-button-now-playing"
          );
          newButtonContainer.setAttribute("class", "icon-button");
          newButtonContainer.setAttribute("href", buttonUrl);
          newButtonContainer.setAttribute("target", "_blank"); // Open link in a new tab
          newButtonContainer.style.display = "flex"; // flex
          newButtonContainer.style.alignItems = "center";
          newButtonContainer.style.justifyContent = "center";
          newButtonContainer.style.marginRight = "8px"; // Add spacing between this button and the existing buttons
          newButtonContainer.style.padding = "4px 12px"; // Adjust the padding as needed
          newButtonContainer.style.color = "#b3b3b3"; // Set the color for the text

          // Create the new icon element
          const newIcon = document.createElement("div");
          newIcon.style.width = "44px"; // Adjust the size for the smaller icon
          newIcon.style.height = "40px"; // Adjust the height for the smaller icon
          newIcon.style.borderRadius = "50%"; // Make it a circular icon
          newIcon.style.opacity = "1"; // Set the opacity to semi-transparent
          newIcon.style.transition = "transform 0.2s ease-out"; // Add a slight transition effect on hover
          newIcon.style.backgroundImage = `url('${iconUrl}')`;
          newIcon.style.backgroundSize = "cover"; // Make sure the icon fits inside the button
          newIcon.style.backgroundPosition = "center"; // Center the icon inside the button

          // Add hover effect to the icon
          newIcon.addEventListener("mouseenter", () => {
            newIcon.style.transform = "scale(1.1)"; // Slightly scale up the icon on hover
            newIcon.style.opacity = "1"; // Increase the opacity on hover
          });
          newIcon.addEventListener("mouseleave", () => {
            newIcon.style.transform = "scale(1)"; // Reset the scale on hover exit
            newIcon.style.opacity = "0.5"; // Reset the opacity on hover exit
          });

          // Create the new text element
          const newText = document.createElement("span");
          newText.textContent = buttonText; // Set the button text
          newText.style.fontFamily =
            "var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif))"; // Set the font family for the text
          newText.style.fontSize = "1rem"; // Set the font size for the text
          newText.style.fontWeight = "700"; // Set the font weight for the text
          newText.style.boxSizing = "border-box"; // Box sizing
          newText.style.marginBlock = "0px"; // Box sizing
          newText.style.color = "white"; // Set the color for the text

          // Append the icon and text elements to the button container
          newButtonContainer.appendChild(newIcon);
          newButtonContainer.appendChild(newText);

          // Append the new button container to the target element
          targetElement.appendChild(newButtonContainer);

          // Disconnect the observer once the button is added
          observer.disconnect();
          break;
        }
      }
    }
  });

  const targetNode = document.querySelector(targetSelector);
  if (targetNode) {
    // If the target element is already available, add the button immediately
    addButtonToElement(targetSelector, buttonText, buttonUrl, iconUrl);
  } else {
    // If the target element is not available yet, start observing for changes
    observer.observe(document, { childList: true, subtree: true });
  }
}

// Call the function to add the new button to the action bar row
addButtonToElement(
  ".eSg4ntPU2KQLfpLGXAww",
  "GitHub",
  "https://github.com/senpaihunters/spoton",
  "https://user-images.githubusercontent.com/103985728/244695129-ea96ab3d-1092-4584-bdd5-afcb8625d121.png"
);

// Call the function to add the new button to the Now Playing Bar
addButtonToElement(
  ".EZFyDnuQnx5hw78phLqP",
  "Off to GitHub we go!",
  "https://github.com/senpaihunters/spoton",
  "https://user-images.githubusercontent.com/103985728/244695129-ea96ab3d-1092-4584-bdd5-afcb8625d121.png"
);
*/
// button method two
function addGitHubButtonToActionBarRow() {
  const targetSelector = ".eSg4ntPU2KQLfpLGXAww";

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        const actionBarRow = document.querySelector(targetSelector);
        if (actionBarRow) {
          // Create the new button
          const newButton = document.createElement("a");
          newButton.setAttribute("aria-label", "Visit GitHub");
          newButton.setAttribute("data-testid", "github-button");
          newButton.setAttribute("class", "Button-sc-1dqy6lx-0 DjJKP"); // Use the appropriate class for the Spotify theme
          newButton.setAttribute(
            "href",
            "https://github.com/senpaihunters/spoton"
          );
          newButton.setAttribute("target", "_blank"); // Open link in a new tab
          newButton.textContent = "GitHub"; // Set the button text
          newButton.style.backgroundColor = "#1DB954"; // Match the Spotify green color
          newButton.style.color = "#fff"; // White text color
          newButton.style.padding = "8px 16px"; // Adjust the padding as needed
          newButton.style.fontSize = "14px"; // Adjust the font size as needed
          newButton.style.borderRadius = "500px"; // Make it a circular button
          newButton.style.opacity = "1"; // Set the opacity to fully visible
          newButton.style.zIndex = "9999"; // Set a high z-index value to make sure it's on top
          newButton.style.marginRight = "8px"; // Add spacing between this button and the existing buttons
          newButton.style.transition = "transform 0.2s ease-out"; // Add a slight transition effect on hover

          // Add hover effect
          newButton.addEventListener("mouseenter", () => {
            newButton.style.transform = "scale(1.05)";
          });
          newButton.addEventListener("mouseleave", () => {
            newButton.style.transform = "scale(1)";
          });

          // Append the new button to the action bar row
          actionBarRow.appendChild(newButton);

          // Disconnect the observer once the button is added
          observer.disconnect();
          break;
        }
      }
    }
  });

  const targetNode = document.querySelector(targetSelector);
  if (targetNode) {
    // If the target element is already available, add the button immediately
    addGitHubButtonToActionBarRow();
  } else {
    // If the target element is not available yet, start observing for changes
    observer.observe(document, { childList: true, subtree: true });
  }
}

// Call the function to add the new button to the action bar row
function addGitHubButtonToNowPlayingBar() {
  // const targetSelector = ".mwpJrmCgLlVkJVtWjlI1"; // Replace this selector with the actual selector for the Now Playing Bar
  const targetSelector = ".EZFyDnuQnx5hw78phLqP"; // New selector for the specified element

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        const nowPlayingBar = document.querySelector(targetSelector);
        if (nowPlayingBar) {
          // Create the new button container (containing icon and text)
          const newButtonContainer = document.createElement("a");
          newButtonContainer.setAttribute("aria-label", "Visit GitHub");
          newButtonContainer.setAttribute(
            "data-testid",
            "github-button-now-playing"
          );
          newButtonContainer.setAttribute("class", "icon-button");
          newButtonContainer.setAttribute(
            "href",
            "https://github.com/senpaihunters/spoton"
          );
          newButtonContainer.setAttribute("target", "_blank"); // Open link in a new tab
          newButtonContainer.style.display = "flex"; // flex
          newButtonContainer.style.alignItems = "center";
          newButtonContainer.style.justifyContent = "center";
          newButtonContainer.style.marginTop = "0px"; // Center the icon inside the button
          // newButtonContainer.style.marginLeft = "-1px"; // Center the icon inside the button
          newButtonContainer.style.marginRight = "352px"; // Center the icon inside the button
          // newButtonContainer.style.marginRight = "8px"; // Add spacing between this button and the existing buttons
          newButtonContainer.style.padding = "4px 12px"; // Adjust the gao for the smaller icon
          newButtonContainer.style.color = "#b3b3b3"; // Set the color for the text -- orignally #ffffff

          // Create the new icon element
          const newIcon = document.createElement("div");
          newIcon.style.width = "44px"; // Adjust the size for the smaller icon
          newIcon.style.gap = "20px"; // Adjust the gao for the smaller icon
          newIcon.style.height = "40px"; // Adjust the height for the smaller icon
          newIcon.style.borderRadius = "50%"; // Make it a circular icon
          newIcon.style.opacity = "1"; // Set the opacity to semi-transparent
          newIcon.style.transition = "transform 0.2s ease-out"; // Add a slight transition effect on hover
          newIcon.style.backgroundImage =
            "url('https://user-images.githubusercontent.com/103985728/244695129-ea96ab3d-1092-4584-bdd5-afcb8625d121.png')"; // Replace this with your icon URL
          newIcon.style.backgroundSize = "cover"; // Make sure the icon fits inside the button
          newIcon.style.backgroundPosition = "center"; // Center the icon inside the button

          // Add hover effect to the icon
          newIcon.addEventListener("mouseenter", () => {
            newIcon.style.transform = "scale(1.1)"; // Slightly scale up the icon on hover
            newIcon.style.opacity = "1"; // Increase the opacity on hover
          });
          newIcon.addEventListener("mouseleave", () => {
            newIcon.style.transform = "scale(1)"; // Reset the scale on hover exit
            newIcon.style.opacity = "0.5"; // Reset the opacity on hover exit
          });

          // Create the new text element
          const newText = document.createElement("span");
          newText.textContent = "Off to GitHub we go!"; // Text we want
          newText.style.fontFamily =
            "var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif))"; // Set the font family for the text (you can change this to your desired font) -- Arial, sans-serif
          newText.style.fontSize = "1rem"; // Set the font size for the text -- 14px
          newText.style.fontWeight = "700"; // Set the font size for the text -- 14px
          newText.style.boxSizing = "border-box"; // box sizing
          newText.style.marginBlock = "0px"; // box sizing
          newText.style.color = "white"; // Set the color for the text -- orignally #ffffff

          // Append the icon and text elements to the button container
          newButtonContainer.appendChild(newIcon);
          newButtonContainer.appendChild(newText);

          // Append the new button container to the Now Playing Bar
          nowPlayingBar.appendChild(newButtonContainer);

          // Disconnect the observer once the button is added
          observer.disconnect();
          break;
        }
      }
    }
  });

  const targetNode = document.querySelector(targetSelector);
  if (targetNode) {
    // If the target element is already available, add the button immediately
    addGitHubButtonToNowPlayingBar();
  } else {
    // If the target element is not available yet, start observing for changes
    observer.observe(document, { childList: true, subtree: true });
  }
}

// Call the function to add the new button to the Now Playing Bar
addGitHubButtonToNowPlayingBar();

addGitHubButtonToActionBarRow();

//
// Use a watermark
//

/**
 * Add a watermark to any websites top right side


let logoImg = document.createElement("img");
logoImg.src =
  "https://user-images.githubusercontent.com/103985728/235338288-be1251b1-0074-4560-9c02-bff7bacef367.png";
logoImg.style.position = "fixed";
logoImg.style.top = "10px"; // add a slight indent from the top
logoImg.style.right = "10px"; // add a slight indent from the right
logoImg.style.width = "70px"; // you can adjust the size to fit your logo
logoImg.style.opacity = "0.5"; // change the value to adjust the opacity (0-1)
logoImg.style.zIndex = "9999"; // set a high z-index value to make sure it's on top
logoImg.style.padding = "5px"; // add a slight padding to the logo element
logoImg.style.overflow = "hidden"; // prevent scrolling on the logo element
logoImg.setAttribute("draggable", "false"); // disable dragging of the logo element
logoImg.addEventListener("contextmenu", function (e) {
  // disable right-click menu on the logo element
  e.preventDefault();
});
logoImg.style.pointerEvents = "none"; // allow clicking on elements behind the logo
document.body.appendChild(logoImg);
*/
//
//
//
//
//
//
/*
function addButtonForPopOut() {
  const targetSelector = ".eSg4ntPU2KQLfpLGXAww";

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        const actionBarRow = document.querySelector(targetSelector);
        if (actionBarRow) {
          // Create the new button
          const popOutButton = document.createElement("button");
          popOutButton.setAttribute("aria-label", "Open Popup");
          popOutButton.setAttribute("data-testid", "popup-button");
          popOutButton.setAttribute("class", "Button-sc-3322dpla"); // Use the appropriate class for the Spotify theme
          popOutButton.textContent = "Open Popup"; // Set the button text
          popOutButton.style.backgroundColor = "#1DB954"; // Match the Spotify green color
          popOutButton.style.color = "#fff"; // White text color
          popOutButton.style.padding = "8px 16px"; // Adjust the padding as needed
          popOutButton.style.fontSize = "14px"; // Adjust the font size as needed
          popOutButton.style.borderRadius = "500px"; // Make it a circular button
          popOutButton.style.opacity = "1"; // Set the opacity to fully visible
          popOutButton.style.zIndex = "9999"; // Set a high z-index value to make sure it's on top
          popOutButton.style.marginRight = "8px"; // Add spacing between this button and the existing buttons
          popOutButton.style.transition = "transform 0.2s ease-out"; // Add a slight transition effect on hover
          popOutButton.style.backgroundImage =
            "url('https://github.com/SenpaiHunters/Pictures/blob/main/SpotOn%20Pics/Resources/Assets/EaselIconArrow.png?raw=true')"; // Replace this with your icon URL
          // https://github.com/SenpaiHunters/Pictures/blob/main/SpotOn%20Pics/Resources/Assets/EaselIconArrow.png?raw=true

          // Add hover effect
          popOutButton.addEventListener("mouseenter", () => {
            popOutButton.style.transform = "scale(1.05)";
          });
          popOutButton.addEventListener("mouseleave", () => {
            popOutButton.style.transform = "scale(1)";
          });

          // Add click event listener to open the options page
          popOutButton.addEventListener("click", () => {
            const optionsPageURL = chrome.runtime.getURL("options.html");
            console.log("Button clicked");
            chrome.tabs.create({ url: optionsPageURL });
          });

          // Append the new button to the action bar row
          actionBarRow.appendChild(popOutButton);

          // Disconnect the observer once the button is added
          observer.disconnect();
          break;
        }
      }
    }
  });

  const targetNode = document.querySelector(targetSelector);
  if (targetNode) {
    // If the target element is already available, add the button immediately
    addButtonForPopOut();
  } else {
    // If the target element is not available yet, start observing for changes
    observer.observe(document, { childList: true, subtree: true });
  }
}

// Call the function to add the new button
addButtonForPopOut();
*/
// Scroll to top, which doesn't work... yay
/*
function addScrollToTopButton() {
  const targetSelector = ".qHWqOt_TYlFxiF0Dm2fD";

  const targetNode = document.querySelector(targetSelector);
  if (!targetNode) {
    const observer = new MutationObserver(() => {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        observer.disconnect();
        addScrollToTopButton();
      }
    });

    observer.observe(document, { childList: true, subtree: true });
    return;
  }

  // Create the new button
  const scrollToTopButton = document.createElement("button");
  scrollToTopButton.setAttribute("aria-label", "Scroll to Top");
  scrollToTopButton.setAttribute("data-testid", "scroll-to-top-button");
  scrollToTopButton.setAttribute("class", "the-yeeter"); // Use the appropriate class for the Spotify theme
  scrollToTopButton.textContent = "Scroll to Top"; // Set the button text
  scrollToTopButton.style.background = "radial-gradient(black, transparent)"; // Match the Spotify green color
  scrollToTopButton.style.color = "#fff"; // White text color
  scrollToTopButton.style.padding = "8px 16px"; // Adjust the padding as needed
  scrollToTopButton.style.fontSize = "14px"; // Adjust the font size as needed
  scrollToTopButton.style.borderRadius = "500px"; // Make it a circular button
  scrollToTopButton.style.opacity = "1"; // Set the opacity to fully visible
  scrollToTopButton.style.zIndex = "9999"; // Set a high z-index value to make sure it's on top
  scrollToTopButton.style.marginRight = "8px"; // Add spacing between this button and the existing buttons
  scrollToTopButton.style.transition = "transform 0.2s ease-out"; // Add a slight transition effect on hover

  // Add hover effect
  scrollToTopButton.addEventListener("mouseenter", () => {
    scrollToTopButton.style.transform = "scale(1.05)";
  });
  scrollToTopButton.addEventListener("mouseleave", () => {
    scrollToTopButton.style.transform = "scale(1)";
  });

  // When the user scrolls down 20px from the top of the document, show the button
  window.addEventListener("scroll", () => {
    const mybutton = document.querySelector(".the-yeeter");
    if (mybutton) {
      if (window.scrollY > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  });

  // When the user clicks on the button, scroll to the top of the document
  scrollToTopButton.addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });

  // Append the new button to the target element
  targetNode.appendChild(scrollToTopButton);
}

// Call the function to add the new button
addScrollToTopButton();
*/
