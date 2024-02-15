window.onload = () => {
  const settingsPanel = document.getElementById('settings-panel');
  const importExportPopup = document.querySelector('.import-export-popup');
  const versionElement = document.getElementById("versionNumber");
  const groups = document.querySelectorAll('.option-group');

  document.getElementById('settings-button').addEventListener('click', () => {
    settingsPanel.style.display = 'block';
  });

  document.getElementById('settings-back-button').addEventListener('click', () => {
    settingsPanel.style.display = 'none';
  });

  document.querySelectorAll('.mode-dropdown > .theme-icon, .mode-dropdown > .theme-text').forEach(element => {
    element.addEventListener('click', () => {
      importExportPopup.style.display = importExportPopup.style.display === 'block' ? 'none' : 'block';
    });
  });

  document.getElementById('backButton').addEventListener('click', (event) => {
    event.stopPropagation();
    importExportPopup.style.display = 'none';
  });

  document.querySelectorAll('h1, h2').forEach(header => {
    const content = header.nextElementSibling;
    const chevron = header.querySelector('.fas');
    const headerText = header.textContent;
    const toggleContent = () => {
      content.classList.toggle('collapsed');
      chevron.style.transform = content.classList.contains('collapsed') ? 'rotate(180deg)' : 'rotate(0deg)';
      localStorage.setItem(headerText, content.classList.contains('collapsed') ? 'collapsed' : 'expanded');
    };

    header.addEventListener('click', toggleContent);

    if (localStorage.getItem(headerText) === 'collapsed') {
      content.classList.add('collapsed');
      chevron.style.transform = 'rotate(180deg)';
    }
  });

  const fetchManifest = async () => {
    try {
      const response = await fetch("/manifest.json");
      const manifest = await response.json();
      if (versionElement) versionElement.textContent = `Current version: V. ${manifest.version}`;
    } catch (error) {
      console.error("Error fetching or parsing manifest:", error);
    }
  };
  fetchManifest();

  document.getElementById('section-select').addEventListener('change', function() {
    groups.forEach(group => group.style.display = 'none');
    const selectedGroup = document.getElementById(this.value);
    if (selectedGroup) {
      selectedGroup.style.display = 'block';
    }
  });
};
