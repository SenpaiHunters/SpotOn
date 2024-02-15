const $ = document.getElementById.bind(document);
const { local: storage } = chrome.storage;
const cssCache = new Map();

const [themeSelector, cssEditor, themeNameInput, errorElement, githubLink, cssExamplesDropdown, generatedCSS] = 
  ['themeSelector', 'cssEditor', 'themeName', 'error', 'githubLink', 'cssExamplesDropdown', 'generatedCSS'].map($);

async function getThemes() {
  const { themes = {} } = await storage.get('themes');
  return themes;
}

function setThemes(themes) {
  return storage.set({ themes });
}

async function updateTheme(name, css) {
  const themes = await getThemes();
  themes[name] = css;
  await setThemes(themes);
}

async function loadThemes() {
  const { themes = {}, lastSelectedTheme } = await storage.get(['themes', 'lastSelectedTheme']);
  const themeKeys = Object.keys(themes);
  themeSelector.innerHTML = themeKeys.map(name => `<option>${name}</option>`).join('');
  const selectedTheme = lastSelectedTheme || themeKeys[0];
  themeSelector.value = selectedTheme;
  cssEditor.value = themes[selectedTheme] || '';
}

async function handleThemeChange(themeName) {
  await storage.set({ lastSelectedTheme: themeName });
  cssEditor.value = (await getThemes())[themeName] || '';
}

async function importThemeFromGithub(githubLink) {
  if (!githubLink.endsWith('.css')) {
    displayError('The link must end in .css');
    return;
  }

  const rawLink = githubLink.replace('github.com', 'raw.githubusercontent.com').replace('/blob', '');
  try {
    const response = await fetch(rawLink);
    const data = await response.text();
    const fileName = rawLink.split('/').pop();
    const themeName = fileName.replace('.css', '');
    const themes = await getThemes();

    if (!themes[themeName] || confirm(`This theme already exists. Do you want to overwrite it?`)) {
      themes[themeName] = data;
      await setThemes(themes);
      cssEditor.value = data;
      themeNameInput.value = themeName;
      errorElement.textContent = '';
      await loadThemes();
    }
  } catch (error) {
    console.error('Error:', error);
    displayError('An error occurred while fetching the CSS file.');
  }
}

async function exportTheme(themeName) {
  const themes = await getThemes();
  const css = themes[themeName];
  if (css) {
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${themeName}.css`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

async function deleteTheme(themeName) {
  const themes = await getThemes();
  if (themes[themeName]) {
    if (confirm(`Are you sure you want to delete the theme "${themeName}"?`)) {
      delete themes[themeName];
      await setThemes(themes);
      await loadThemes();
    }
  } else {
    displayError('Theme does not exist.');
  }
}

async function importDefaultThemes() {
  try {
    const response = await fetch('https://api.github.com/repos/SenpaiHunters/SpotOnThemes/contents/themes/downloads');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const files = await response.json();
    const cssFiles = files.filter(file => file.name.endsWith('.css'));

    const existingThemes = await getThemes();
    let newThemes = {};

    const themesToImport = cssFiles
      .map(file => file.name.slice(0, -4)) // Remove '.css' from the end of the filename
      .filter(themeName => !existingThemes.hasOwnProperty(themeName));

    if (themesToImport.length > 0) {
      const userConfirmed = Object.keys(existingThemes).length === 0 || 
        confirm(`There are new themes available: ${themesToImport.join(', ')}. Do you want to import them?`);

      if (userConfirmed) {
        await Promise.all(themesToImport.map(async themeName => {
          const file = cssFiles.find(file => file.name.slice(0, -4) === themeName);
          const themeResponse = await fetch(file.download_url);
          if (!themeResponse.ok) throw new Error(`HTTP error! status: ${themeResponse.status}`);
          newThemes[themeName] = await themeResponse.text();
        }));

        await setThemes({ ...existingThemes, ...newThemes });
        await loadThemes();
      }
    } else {
      alert('No new themes to import.');
    }
  } catch (error) {
    console.error('Error importing default themes:', error);
  }
}

async function loadCSSExamples() {
  try {
    const response = await fetch('https://api.github.com/repos/SenpaiHunters/SpotOnThemes/contents/example-css');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const files = await response.json();
    const options = files
      .filter(file => file.name.endsWith('.css'))
      .map(file => {
        const nameWithoutExtension = file.name.slice(0, -4);
        return `<option value="${nameWithoutExtension}">${nameWithoutExtension}</option>`;
      })
      .join('');
    cssExamplesDropdown.innerHTML = options;

    if (files.length > 0) {
      const firstCSSName = files[0].name.slice(0, -4);
      await updateGeneratedCSS(firstCSSName);
    }
  } catch (error) {
    console.error('Error loading CSS examples:', error);
  }
}

async function updateGeneratedCSS(cssName) {
  const cachedCSS = cssCache.get(cssName);
  if (cachedCSS) {
    generatedCSS.value = cachedCSS;
    return;
  }
  try {
    const response = await fetch(`https://raw.githubusercontent.com/SenpaiHunters/SpotOnThemes/main/example-css/${cssName}.css`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const css = await response.text();
    cssCache.set(cssName, css);
    generatedCSS.value = css; // Set the value directly after caching
  } catch (error) {
    console.error('Error fetching CSS:', error);
  }
}

function registerAsyncEventListeners() {
  $('saveButton').addEventListener('click', saveTheme);
  $('fileInput').addEventListener('change', importThemeFromFile);
  $('renameThemeButton').addEventListener('click', renameTheme);
  $('copyToClipboardButton').addEventListener('click', copyToClipboard);
  $('checkForNewThemesButton').addEventListener('click', importDefaultThemes);
  $('loadFromGithubButton').addEventListener('click', () => importThemeFromGithub(githubLink.value));
  $('exportThemeButton').addEventListener('click', () => exportTheme(themeSelector.value));
  $('themeSelector').addEventListener('change', (e) => handleThemeChange(e.target.value));
  $('deleteThemeButton').addEventListener('click', () => deleteTheme(themeSelector.value));
  cssExamplesDropdown.addEventListener('change', (e) => updateGeneratedCSS(e.target.value));
}

async function saveTheme() {
  const css = cssEditor.value;
  const themeName = themeSelector.value;
  if (themeName) {
    await updateTheme(themeName, css);
    chrome.runtime.sendMessage({ action: 'update-custom-css', css });
  } else {
    displayError('Please select a theme to save.');
  }
}

async function importThemeFromFile({ target: { files: [file] } }) {
  if (file) {
    const reader = new FileReader();
    reader.onload = async ({ target: { result: css } }) => {
      const themeName = file.name.replace('.css', '');
      themeNameInput.value = themeName;
      await updateTheme(themeName, css);
      await loadThemes();
      themeSelector.value = themeName;
      cssEditor.value = css;
    };
    reader.readAsText(file);
  }
}

async function renameTheme() {
  const oldThemeName = themeSelector.value;
  const newThemeName = themeNameInput.value;
  if (oldThemeName && newThemeName && oldThemeName !== newThemeName) {
    const themes = await getThemes();
    if (themes[oldThemeName]) {
      themes[newThemeName] = themes[oldThemeName];
      delete themes[oldThemeName];
      await setThemes(themes);
      await loadThemes();
      themeSelector.value = newThemeName;
    }
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(generatedCSS.value).catch(error => {
      console.error('Error copying text to clipboard:', error);
  });
}

function displayError(message) {
  errorElement.textContent = message;
  setTimeout(() => { errorElement.textContent = ''; }, 5000);
}

window.addEventListener('load', async () => {
  await loadCSSExamples();
  await checkAndImportDefaultThemes();
  await loadCustomCSS();
  registerAsyncEventListeners();
});

async function checkAndImportDefaultThemes() {
  const { defaultThemesImported = false } = await storage.get('defaultThemesImported');
  if (!defaultThemesImported) {
    await importDefaultThemes();
    await storage.set({ defaultThemesImported: true });
  }
}

async function loadCustomCSS() {
  const { customCSS = '' } = await storage.get('customCSS');
  cssEditor.value = customCSS;
  await loadThemes();
}

chrome.runtime.onInstalled.addListener(importDefaultThemes);