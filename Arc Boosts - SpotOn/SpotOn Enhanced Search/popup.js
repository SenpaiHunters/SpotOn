function submit(submitType) {

  // Get form data
  const form = document.getElementById('form');
  const data = Object.fromEntries(new FormData(form));

  // Trim empty inputs
  const given = Object.keys(data).filter(value => data[value].length >= 1);

  // Format search queries
  const searchQueries = given.map(value => {
    return `${value}:"${data[value]}"`
  })

  // URL encode search query
  const encodedQuery = encodeURIComponent(searchQueries.join(' '));
  const url = `https://open.spotify.com/search/${encodedQuery}`;

  // Open url in app or web
  if (submitType === 'app') {
    chrome.tabs.create({ active: true, url: `spotify://${url}` });
  } else {
    chrome.tabs.create({ active: true, url: url });
  }
}

// Add onclick listeners
document.getElementById("webSearch").addEventListener("click", () => submit('web'));
document.getElementById("appSearch").addEventListener("click", () => submit('app'));