// settingsExtra.js
// Function to show/hide options based on search term
const filterOptions = (searchTerm) => {
  const options = document.querySelectorAll(".option");
  let odd = false;

  options.forEach((option) => {
    const label = option.querySelector("label").textContent.toLowerCase();
    const displayOption = label.includes(searchTerm) ? "block" : "none";
    option.style.display = displayOption;

    if (displayOption === "block") {
      option.classList.toggle("odd", odd);
      odd = !odd;
    }
  });
};

// Debounce function to reduce the search input event frequency
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Function to handle tab navigation using keyboard (Arrow keys and Enter key)
function handleKeyboardNavigation(event) {
  const tabHeadings = document.querySelectorAll(".tab-heading");
  const currentSelectedIndex = Array.from(tabHeadings).findIndex((heading) =>
    heading.classList.contains("selected")
  );

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    const newIndex =
      (currentSelectedIndex - 1 + tabHeadings.length) % tabHeadings.length;
    tabHeadings[newIndex].click();
  } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    const newIndex = (currentSelectedIndex + 1) % tabHeadings.length;
    tabHeadings[newIndex].click();
  } else if (event.key === "Enter") {
    event.currentTarget.click();
  }
}

// Save and restore search term from local storage
function saveSearchTerm(searchTerm) {
  localStorage.setItem("searchTerm", searchTerm);
}

function restoreSearchTerm() {
  const searchTerm = localStorage.getItem("searchTerm") || "";
  document.getElementById("searchBar").value = searchTerm;
  filterOptions(searchTerm.toLowerCase());
}

// Seach bar and tab headings event listeners
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener(
    "input",
    debounce(() => {
      const searchTerm = searchBar.value.trim().toLowerCase();
      filterOptions(searchTerm);
      saveSearchTerm(searchTerm);
    }, 300)
  );

  const tabHeadings = document.querySelectorAll(".tab-heading");
  tabHeadings.forEach((heading) => {
    heading.addEventListener("click", () => handleTabNavigation(heading));
    heading.addEventListener("keydown", handleKeyboardNavigation);
    heading.tabIndex = 0;
  });

  restoreSearchTerm();
});

// Function to handle tab navigation
function handleTabNavigation(heading) {
  const tabHeadings = document.querySelectorAll(".tab-heading");
  const optionGroups = document.querySelectorAll(".option-group");

  tabHeadings.forEach((tab) => tab.classList.remove("selected"));
  heading.classList.add("selected");

  const targetId = heading.getAttribute("data-for");

  optionGroups.forEach((group) => {
    group.classList.toggle("hidden", group.id !== targetId);
  });
}

// Function to open Spotify tab or create one if none exists
function openSpotifyTab() {
  chrome.tabs.query({ url: "https://*.spotify.com/*" }, function (tabs) {
    if (tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, { active: true });
    } else {
      chrome.tabs.create({ url: "https://www.spotify.com" });
    }
  });
}

// Back to Spotify button event listener
const backToSpotifyButton = document.getElementById("backToSpotifyButton");
backToSpotifyButton.addEventListener("click", function (event) {
  event.preventDefault();
  openSpotifyTab();
});

// Function to add a "Reset" button to clear the search bar and show all options
function addResetButton() {
  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.addEventListener("click", function () {
    document.getElementById("searchBar").value = "";
    filterOptions(""); // Show all options
    saveSearchTerm(""); // Save an empty search term
  });

  const searchBarContainer = document.querySelector(".search-bar-container");
  searchBarContainer.appendChild(resetButton);
}

// Call the function to add the "Reset" button
addResetButton();
