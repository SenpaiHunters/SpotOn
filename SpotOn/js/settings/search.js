const searchInput = document.getElementById("search-input");
const defaultContent = document.getElementById("default-content");
const matchCountElement = document.getElementById('match-count');

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
  matchCountElement.textContent = count ? `Matches found: ${count}` : "";
};

const highlightMatchingText = (text, term) => {
  const regex = new RegExp(`(${term})`, 'gi');
  return text.replace(regex, "<span class='highlight'>$1</span>");
};

searchInput.addEventListener("input", () => {
  const term = searchInput.value.trim().toLowerCase();
  let matchCount = 0;

  document.querySelectorAll(".option-group").forEach(group => {
    toggleDisplay(group, group.id === "default-content");
  });

  if (term) {
    document.querySelectorAll(".option label").forEach(label => {
      const text = label.textContent.toLowerCase();
      if (text.includes(term)) {
        const optionGroup = label.closest(".option-group");
        toggleDisplay(optionGroup, true);
        label.innerHTML = highlightMatchingText(label.textContent, term);
        matchCount++;
      } else {
        label.innerHTML = label.textContent; // Remove any previous highlights
      }
    });

    updatePlaceholder("Try another word");
    updateMatchCount(matchCount);
    toggleDisplay(defaultContent, matchCount === 0);
  } else {
    updatePlaceholder("Search...");
    updateMatchCount();
    toggleDisplay(defaultContent, true);
  }
});

createHighlightStyle();