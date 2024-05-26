const searchInput = document.getElementById("search-input");
const defaultContent = document.getElementById("default-content");
const matchCountElement = document.getElementById('match-count');
const optionGroups = document.querySelectorAll(".option-group");
const optionLabels = document.querySelectorAll(".option label");

const toggleDisplay = (element, show) => {
  element.style.display = show ? "block" : "none";
};

const createHighlightStyle = () => {
  if (!document.querySelector('#highlight-style')) {
    const style = document.createElement('style');
    style.id = 'highlight-style';
    style.type = 'text/css';
    style.textContent = '.highlight { background-color: var(--highlight); }';
    document.head.appendChild(style);
  }
};

const updatePlaceholder = (placeholder) => {
  searchInput.placeholder = placeholder;
};

const updateMatchCount = (count) => {
  if (count) {
    matchCountElement.textContent = `Matches found: ${count}`;
  } else {
    matchCountElement.textContent = "No matches found. Try different keywords.";
  }
};

const highlightMatchingText = (text, term) => {
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, "<span class='highlight'>$1</span>");
};

searchInput.addEventListener("input", () => {
  const term = searchInput.value.trim().toLowerCase();
  let matchCount = 0;

  optionGroups.forEach(group => {
    toggleDisplay(group, group.id === "default-content");
  });

  if (term) {
    optionLabels.forEach(label => {
      const text = label.textContent.toLowerCase();
      if (text.includes(term)) {
        const optionGroup = label.closest(".option-group");
        toggleDisplay(optionGroup, true);
        label.innerHTML = highlightMatchingText(label.textContent, term);
        matchCount++;
      } else {
        label.innerHTML = label.textContent;
      }
    });

    updatePlaceholder("Try another word");
    updateMatchCount(matchCount);
    toggleDisplay(defaultContent, matchCount === 0);
  } else {
    updatePlaceholder("Start typing to search...");
    updateMatchCount(0);
    toggleDisplay(defaultContent, true);
  }
});

createHighlightStyle();