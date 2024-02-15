const addHighlightClass = () => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '.highlight { background-color: var(--highlight); }';
  document.head.appendChild(style);
};

const hideOptionGroups = () => {
  const optionGroups = document.querySelectorAll(".option-group:not(#default-content)");
  optionGroups.forEach(group => group.style.display = "none");
};

const highlightMatchingText = (option, searchInput) => {
  const regex = new RegExp(`(${searchInput})`, 'gi');
  option.innerHTML = option.textContent.replace(regex, "<span class='highlight'>$1</span>");
};

const searchInput = document.getElementById("search-input");
const defaultContent = document.getElementById("default-content");
const matchCountElement = document.getElementById('match-count');

const handleNoResultsFound = () => {
  searchInput.placeholder = "Try another word";
  defaultContent.style.display = "block";
};

const displayMatchCount = matchCount => {
  matchCountElement.textContent = `Matches found: ${matchCount}`;
};

const resetSearchInput = () => {
  searchInput.placeholder = "Search...";
};

const removeExistingHighlights = () => {
  const highlighted = document.querySelectorAll(".highlight");
  highlighted.forEach(highlight => highlight.outerHTML = highlight.innerHTML);
};

const showDefaultContent = () => {
  defaultContent.style.display = "block";
};

const removeMatchCount = () => {
  matchCountElement.textContent = "";
};

searchInput.addEventListener("input", () => {
  const searchInputValue = searchInput.value.toLowerCase();
  let matchCount = 0;

  hideOptionGroups();

  if (searchInputValue.trim() !== "") {
    const options = document.querySelectorAll(".option label");
    options.forEach(option => {
      if (option.textContent.toLowerCase().includes(searchInputValue)) {
        option.closest(".option-group").style.display = "block";
        highlightMatchingText(option, searchInputValue);
        matchCount++;
      }
    });

    const visibleGroups = document.querySelectorAll('.option-group[style="display: block;"]');
    visibleGroups.length === 0 ? handleNoResultsFound() : null;
    displayMatchCount(matchCount);
  } else {
    resetSearchInput();
    removeExistingHighlights();
    showDefaultContent();
    removeMatchCount();
  }
});

addHighlightClass();