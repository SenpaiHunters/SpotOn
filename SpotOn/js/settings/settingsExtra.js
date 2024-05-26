window.onload = () => {
  const settingsPanel = document.getElementById('settings-panel');
  const importExportPopup = document.querySelector('.import-export-popup');
  const versionElement = document.getElementById("versionNumber");
  const groups = document.querySelectorAll('.option-group');
  const modeDropdownItems = document.querySelectorAll('.mode-dropdown > .theme-icon, .mode-dropdown > .theme-text');
  const headers = document.querySelectorAll('h1, h2');

  document.getElementById('settings-button').onclick = () => settingsPanel.style.display = 'block';
  document.getElementById('settings-back-button').onclick = () => settingsPanel.style.display = 'none';
  document.getElementById('backButton').onclick = (event) => {
    event.stopPropagation();
    importExportPopup.style.display = 'none';
  };

  modeDropdownItems.forEach(element => {
    element.onclick = () => {
      importExportPopup.style.display = importExportPopup.style.display === 'block' ? 'none' : 'block';
    };
  });

  headers.forEach(header => {
    const content = header.nextElementSibling;
    const chevron = header.querySelector('.fas');
    const headerText = header.textContent.trim();
    const toggleContent = () => {
      const isCollapsed = content.classList.toggle('collapsed');
      chevron.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
      localStorage.setItem(headerText, isCollapsed ? 'collapsed' : 'expanded');
    };

    header.onclick = toggleContent;

    if (localStorage.getItem(headerText) === 'collapsed') {
      content.classList.add('collapsed');
      chevron.style.transform = 'rotate(180deg)';
    }
  });

  const fetchManifest = async () => {
    try {
      const response = await fetch("/manifest.json");
      const manifest = await response.json();
      versionElement.textContent = `Current version: V. ${manifest.version}`;
    } catch (error) {
      console.error("Error fetching or parsing manifest:", error);
    }
  };
  fetchManifest();

  document.getElementById('section-select').onchange = function () {
    groups.forEach(group => group.style.display = 'none');
    const selectedGroup = document.getElementById(this.value);
    if (selectedGroup) selectedGroup.style.display = 'block';
  };
};