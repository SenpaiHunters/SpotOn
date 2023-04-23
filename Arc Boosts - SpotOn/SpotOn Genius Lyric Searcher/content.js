// ==UserScript==
// @name          SpotOn GeniusLyricSearcher
// @namespace     https://github.com/SenpaiHunters/SpotOn
// @icon          https://github.com/SenpaiHunters/SpotOn/blob/Main/SpotOn%20logo.png?raw=true
// @description	  Apart of the SpotOn library, this one allows for you to connect to Genius.com and search lyrics if Spotify doesn't have it + more.
// @author        Kami
// @version       0.7
// @match         https://open.spotify.com/*
// @match         https://genius.com/songs/new
// @require       https://greasyfork.org/scripts/406698-geniuslyrics/code/GeniusLyrics.js
// @supportURL    https://github.com/SenpaiHunters/SpotOn/issues
// @grant         GM.xmlHttpRequest
// @grant         GM.setValue
// @grant         GM.getValue
// @grant         GM.registerMenuCommand
// @grant         GM_openInTab
// @grant         GM_addStyle
// @grant         GM_deleteValue
// @connect       genius.com
// @sandbox       JavaScript
// @run-at        document-start
// @license       MIT
// @copyright     2022, Kami
// ==/UserScript==

// Paste this into a userscript manager!!!

(function GeniusLyricSearch() {
'use strict'

const scriptName = 'No Spotify Lyrics? Then Lets Check Genius!'
let genius
let resizeLeftContainer
let resizeContainer
let optionCurrentSize = 20.0
GM.getValue('optioncurrentsize', optionCurrentSize).then(function (value) {
  optionCurrentSize = value
})

function closeModalUIs () {
        console.log("Genius function running");
  document.querySelectorAll('.modal_ui_spotify_genius_lyrics').forEach(div => div.remove())
}

function alertUI (text, buttons = { OK: true }) {
  return new Promise(function (resolve) {
    const bg = document.body.appendChild(document.createElement('div'))
    bg.style.display = 'block'
    bg.style.position = 'fixed'
    bg.style.backgroundColor = 'rgba(0,0,0,1)'
    bg.style.top = '0'
    bg.style.left = '0'
    bg.style.width = '100%'
    bg.style.height = '100%'
    bg.style.zIndex = '999'
    bg.classList.add('modal_ui_spotify_genius_lyrics')
    const div = bg.appendChild(document.createElement('div'))
    div.style.display = 'block'
    div.style.position = 'fixed'
    div.style.backgroundColor = '#bbb'
    div.style.top = '50%'
    div.style.left = '50%'
    div.style.transform = 'translate(-50%, -50%)'
    div.style.padding = '20px'
    div.style.borderRadius = '10px'
    div.style.boxShadow = '0 0 10px 0 rgba(0,0,0,0.5)'
    div.style.zIndex = '1000'
    div.style.width = '400px'
    div.style.height = 'auto'
    div.style.textAlign = 'center'
    div.style.fontSize = '20px'
    div.style.lineHeight = '1'
    div.style.fontFamily = 'sans-serif'
    div.style.color = 'black'
    div.style.wordBreak = 'break-word'
    div.style.overflowWrap = 'break-word'
    div.style.whiteSpace = 'pre-wrap'
    div.style.overflow = 'auto'
    div.style.maxHeight = '80%'
    div.style.maxWidth = '80%'
    div.innerHTML = text
    const buttonDiv = div.appendChild(document.createElement('div'))
    buttonDiv.style.marginTop = '20px'
    Object.entries(buttons).forEach(function (pair) {
      const button = buttonDiv.appendChild(document.createElement('button'))
      button.style.margin = '0 10px'
      button.style.padding = '10px'
      button.style.borderRadius = '5px'
      button.style.border = 'none'
      button.style.backgroundColor = '#ddd'
      button.style.color = 'black'
      button.style.fontFamily = 'sans-serif'
      button.style.fontSize = '16px'
      button.style.cursor = 'pointer'
      button.innerHTML = pair[0]
      button.addEventListener('click', function () {
        bg.remove()
        resolve(pair[1])
      })
    })
  })
}

function confirmUI (text) {
  return alertUI(text, {
    OK: true,
    Cancel: false
  })
}

function setFrameDimensions (container, iframe, bar) {
  iframe.style.width = container.clientWidth - 6 + 'px'
  try {
    iframe.style.height = (document.querySelector('.Root__nav-bar nav,nav.Root__nav-bar').clientHeight + document.querySelector('.Root__now-playing-bar').clientHeight - bar.clientHeight) + 'px'
  } catch (e) {
    console.error(e)
    iframe.style.height = document.documentElement.clientHeight + 'px'
  }
}

function onResize () {
  const iframe = document.getElementById('lyricsiframe')
  if (iframe) {
    iframe.style.width = document.getElementById('lyricscontainer').clientWidth - 1 + 'px'
    try {
      iframe.style.height = (document.querySelector('.Root__nav-bar nav,nav.Root__nav-bar').clientHeight + document.querySelector('.Root__now-playing-bar').clientHeight - document.querySelector('.lyricsnavbar').clientHeight) + 'px'
    } catch (e) {
      console.error(e)
      iframe.style.height = document.documentElement.clientHeight + 'px'
    }
  }
}
function initResize () {
  window.addEventListener('mousemove', onMouseMoveResize)
  window.addEventListener('mouseup', stopResize)
  window.removeEventListener('resize', onResize)
}
function onMouseMoveResize (e) {
  optionCurrentSize = 100 - (e.clientX / document.body.clientWidth * 100)
  resizeLeftContainer.style.width = (100 - optionCurrentSize) + '%'
  resizeContainer.style.width = optionCurrentSize + '%'
}
function stopResize () {
  window.removeEventListener('mousemove', onMouseMoveResize)
  window.removeEventListener('mouseup', stopResize)
  window.addEventListener('resize', onResize)
  onResize()
  GM.setValue('optioncurrentsize', optionCurrentSize)
}
function getCleanLyricsContainer () {
  document.querySelectorAll('.loadingspinner').forEach((spinner) => spinner.remove())

  const topContainer = document.querySelector('.Root__top-container')
  if (!document.getElementById('lyricscontainer')) {
    topContainer.style.width = (100 - optionCurrentSize) + '%'
    topContainer.style.float = 'left'
    resizeContainer = document.createElement('div')
    resizeContainer.id = 'lyricscontainer'
    resizeContainer.style = 'min-height: 100%; width: ' + optionCurrentSize + '%; position: relative; z-index: 1; float:left;background-color: rgb(80, 80, 80);background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgb(18, 18, 18))'
    topContainer.parentNode.insertBefore(resizeContainer, topContainer.nextSibling)
  } else {
    resizeContainer = document.getElementById('lyricscontainer')
    resizeContainer.innerHTML = ''
    topContainer.parentNode.insertBefore(resizeContainer, topContainer.nextSibling)
  }
  resizeLeftContainer = topContainer
  resizeContainer.style.zIndex = 10

  return document.getElementById('lyricscontainer')
}

function onNewSongPlaying () {
  closeModalUIs()
}

async function onNoResults (songTitle, songArtistsArr) {
  const showSpotifyLyricsEnabled = await GM.getValue('show_spotify_lyrics', true)
  const submitSpotifyLyricsEnabled = await GM.getValue('submit_spotify_lyrics', true)
  const submitSpotifyLyricsIgnored = JSON.parse(await GM.getValue('submit_spotify_lyrics_ignore', '[]'))

  const key = songTitle + ' - ' + songArtistsArr.join(', ')
  if (submitSpotifyLyricsIgnored.indexOf(key) !== -1) {
    // User has previously clicked "Cancel" on the confirm dialog for this song
    console.debug('onNoResults() Key "' + key + '" is ignored')
    return
  }

  if (showSpotifyLyricsEnabled && document.querySelector('[data-testid="lyrics-button"]')) {
    // Open lyrics if they are not already open
    if (!document.querySelector('[data-testid="fullscreen-lyric"]')) {
      document.querySelector('[data-testid="lyrics-button"]').click()
    }
    // Wait one second for lyrics to open
    window.setTimeout(async function () {
      const lyrics = Array.from(document.querySelectorAll('[data-testid="fullscreen-lyric"]')).map(div => div.textContent).join('\n')
      if (submitSpotifyLyricsEnabled && lyrics && lyrics.trim()) {
        // Add this song to the ignored list so we don't ask again
        GM.getValue('submit_spotify_lyrics_ignore', '[]').then(async function (s) {
          const arr = JSON.parse(s)
          arr.push(key)
          await GM.setValue('submit_spotify_lyrics_ignore', JSON.stringify(arr))
        })
        // Ask user if they want to submit the lyrics
        closeModalUIs()
        if (await confirmUI(`Genius.com doesn't have the lyrics for this song but Spotify has the lyrics. Would you like to submit the lyrics from Spotify to Genius.com?\n(You need a Genius.com account to do this)\n${songTitle} by ${songArtistsArr.join(', ')}`)) {
          submitLyricsToGenius(songTitle, songArtistsArr, lyrics)
        } else {
          // Once (globally) show the suggestion to disable this feature
          GM.getValue('suggest_to_disable_submit_spotify_lyrics', true).then(async function (suggestToDisable) {
            if (suggestToDisable) {
              alertUI('You can disable this suggestion in the options of the script.')
              GM.setValue('suggest_to_disable_submit_spotify_lyrics', false)
            }
          })
        }
      }
    }, 1000)
  }
}

function submitLyricsToGenius (songTitle, songArtistsArr, lyrics) {
  GM.setValue('submitToGenius', JSON.stringify({
    lyrics,
    songTitle,
    songArtistsArr
  })).then(function () {
    GM_openInTab('https://genius.com/songs/new')
  })
}

async function fillGeniusForm () {
  const data = JSON.parse(await GM.getValue('submitToGenius', '{}'))
  await GM.setValue('submitToGenius', '{}')
  if ('lyrics' in data && 'songTitle' in data && 'songArtistsArr' in data) {
    document.getElementById('song_primary_artist').value = data.songArtistsArr.join(', ')
    document.getElementById('song_title').value = data.songTitle
    document.getElementById('song_lyrics').value = data.lyrics

    // Create keyup event on song name, to generate the warning about duplicates
    const evt = new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: 'e', char: 'e' })
    document.getElementById('song_primary_artist').dispatchEvent(evt)
    document.getElementById('song_title').dispatchEvent(evt)
  }
}

function hideLyrics () {
  addLyricsButton()
  document.querySelectorAll('.loadingspinner').forEach((spinner) => spinner.remove())
  if (document.getElementById('lyricscontainer')) {
    document.getElementById('lyricscontainer').parentNode.removeChild(document.getElementById('lyricscontainer'))
    const topContainer = document.querySelector('.Root__top-container')
    topContainer.style.width = '100%'
    topContainer.style.removeProperty('float')
  }
}

function listSongs (hits, container, query) {
  if (!container) {
    container = getCleanLyricsContainer()
  }
  container.style.backgroundColor = 'rgba(0,0,0,.8)'

  // Back to search button
  const backToSearchButton = document.createElement('a')
  backToSearchButton.href = '#'
  backToSearchButton.appendChild(document.createTextNode('Back to search'))
  backToSearchButton.addEventListener('click', function backToSearchButtonClick (ev) {
    ev.preventDefault()
    if (query) {
      showSearchField(query)
    } else if (genius.current.artists) {
      showSearchField(genius.current.artists + ' ' + genius.current.title)
    } else {
      showSearchField()
    }
  })

  const separator = document.createElement('span')
  separator.setAttribute('class', 'second-line-separator')
  separator.setAttribute('style', 'padding:0px 3px')
  separator.appendChild(document.createTextNode('•'))

  // Hide button
  const hideButton = document.createElement('a')
  hideButton.href = '#'
  hideButton.appendChild(document.createTextNode('Hide'))
  hideButton.addEventListener('click', function hideButtonClick (ev) {
    ev.preventDefault()
    hideLyrics()
  })

  // List search results
  const trackhtml = `
<div class="geniushiticon">
  <div class="geniushiticonout">
    <span style="color:silver;font-size:1.0em">🅖</span>
  </div>
  <div class="geniushiticonover">
    <span style="opacity:0.7;font-size:1.5em">📄</span>
  </div>
</div>
<div class="geniushitname">
  <div class="track-name-wrapper tracklist-top-align">
    <div class="tracklist-name ellipsis-one-line" dir="auto">$title</div>
    <div class="second-line">
      <span class="ellipsis-one-line" dir="auto">$artist</span>
      <span class="second-line-separator" aria-label="in album">•</span>
      <span class="ellipsis-one-line" dir="auto">👁 <span style="font-size:0.8em">$stats.pageviews</span></span>
      <span class="second-line-separator" aria-label="in album">•</span>
      <span class="geniusbadge">$lyrics_state</span>
    </div>
  </div>
</div>`
  container.innerHTML = '<section class="tracklist-container"><ol class="tracklist geniushits" style="width:99%"></ol></section>'

  container.insertBefore(hideButton, container.firstChild)
  container.insertBefore(separator, container.firstChild)
  container.insertBefore(backToSearchButton, container.firstChild)

  const ol = container.querySelector('ol.tracklist')
  const searchresultsLengths = hits.length
  const title = genius.current.title
  const artists = genius.current.artists
  const onclick = function onclick () {
    genius.f.rememberLyricsSelection(title, artists, this.dataset.hit)
    genius.f.showLyrics(JSON.parse(this.dataset.hit), searchresultsLengths)
  }
  hits.forEach(function forEachHit (hit) {
    const li = ol.appendChild(document.createElement('li'))
    li.setAttribute('class', 'tracklist-row')
    li.setAttribute('role', 'button')
    li.innerHTML = trackhtml.replace(/\$title/g, hit.result.title_with_featured).replace(/\$artist/g, hit.result.primary_artist.name).replace(/\$lyrics_state/g, hit.result.lyrics_state).replace(/\$stats\.pageviews/g, 'pageviews' in hit.result.stats ? genius.f.metricPrefix(hit.result.stats.pageviews, 1) : ' - ')
    li.dataset.hit = JSON.stringify(hit)

    li.addEventListener('click', onclick)

    const geniushitname = li.querySelector('.geniushitname')
    if (geniushitname.clientWidth > (li.clientWidth - 30)) {
      geniushitname.style.width = (li.clientWidth - 30) + 'px'
      geniushitname.classList.add('runningtext')
    }
  })
}

const songTitleQuery = 'a[data-testid="nowplaying-track-link"],.Root__now-playing-bar .ellipsis-one-line a[href^="/track/"],.Root__now-playing-bar .ellipsis-one-line a[href^="/album/"],.Root__now-playing-bar .standalone-ellipsis-one-line a[href^="/album/"],[data-testid="context-item-info-title"] a[href^="/album/"],[data-testid="context-item-info-title"] a[href^="/track/"]'

function addLyrics (force, beLessSpecific) {
  let songTitle = document.querySelector(songTitleQuery).innerText
  songTitle = genius.f.cleanUpSongTitle(songTitle)

  let musicIsPlaying = false
  if (document.querySelector('.now-playing-bar .player-controls__buttons .control-button.control-button--circled')) {
    musicIsPlaying = document.querySelector('.now-playing-bar .player-controls__buttons .control-button.control-button--circled').className.toLowerCase().indexOf('pause') !== -1
  } else if (document.querySelector('.Root__now-playing-bar .player-controls__buttons button')) {
    document.querySelectorAll('.Root__now-playing-bar .player-controls__buttons button').forEach(function (button) {
      if (button.getAttribute('aria-label') === 'Pause' ||
          button.innerHTML.indexOf('M3 2h3v12H3zM10 2h3v12h-3z') !== -1 ||
          button.innerHTML.indexOf('M3 2h3v12H3zm7 0h3v12h-3z') !== -1 ||
          button.innerHTML.indexOf('M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0') !== -1
      ) {
        musicIsPlaying = true
      }
    })
  }

  const songArtistsArr = []
  document.querySelectorAll('.Root__now-playing-bar .ellipsis-one-line a[href^="/artist/"],.Root__now-playing-bar .standalone-ellipsis-one-line a[href^="/artist/"],a[data-testid="context-item-info-artist"][href^="/artist/"],[data-testid="context-item-info-artist"] a[href^="/artist/"]').forEach((e) => songArtistsArr.push(e.innerText))

  genius.f.loadLyrics(force, beLessSpecific, songTitle, songArtistsArr, musicIsPlaying)
}

let lastPos = null
function updateAutoScroll () {
  let pos = null
  try {
    const els = document.querySelectorAll('.Root__now-playing-bar [data-testid="playback-position"],.Root__now-playing-bar [data-testid="playback-duration"]')
    if (els.length !== 2) {
      throw new Error(`Expected 2 playback elements, found ${els.length}`)
    }
    const [current, total] = Array.from(els).map(e => e.textContent.trim()).map(s => s.split(':').reverse().map((d, i, a) => parseInt(d) * Math.pow(60, i)).reduce((a, c) => a + c, 0))
    pos = current / total
  } catch (e) {
    // Could not parse current song position
    pos = null
    console.debug(`Could not parse song position: ${e}`)
  }
  if (pos != null && !Number.isNaN(pos) && lastPos !== pos) {
    genius.f.scrollLyrics(pos)
    lastPos = pos
  }
}

function showSearchField (query) {
  const b = getCleanLyricsContainer()
  const div = b.appendChild(document.createElement('div'))
  div.style = 'padding:5px'
  div.appendChild(document.createTextNode('Search genius.com: '))

  // Hide button
  const hideButton = div.appendChild(document.createElement('a'))
  hideButton.href = '#'
  hideButton.style = 'float: right; padding-right: 10px;'
  hideButton.appendChild(document.createTextNode('Hide'))
  hideButton.addEventListener('click', function hideButtonClick (ev) {
    ev.preventDefault()
    hideLyrics()
  })

  const br = div.appendChild(document.createElement('br'))
  br.style.clear = 'right'

  div.style.paddingRight = '15px'
  const input = div.appendChild(document.createElement('input'))
  input.style = 'width:92%;border:0;border-radius:500px;padding:8px 5px 8px 25px;text-overflow:ellipsis'
  input.placeholder = 'Search genius.com...'
  if (query) {
    input.value = query
  } else if (genius.current.artists) {
    input.value = genius.current.artists
  }
  input.addEventListener('change', function onSearchLyricsButtonClick () {
    this.style.color = 'black'
    if (input.value) {
      genius.f.searchByQuery(input.value, b)
    }
  })
  input.addEventListener('keyup', function onSearchLyricsKeyUp (ev) {
    this.style.color = 'black'
    if (ev.keyCode === 13) {
      ev.preventDefault()
      if (input.value) {
        genius.f.searchByQuery(input.value, b)
      }
    }
  })
  input.focus()
  const mag = div.appendChild(document.createElement('div'))
  mag.style.marginTop = '-27px'
  mag.style.marginLeft = '3px'
  mag.appendChild(document.createTextNode('🔎'))
}

function addLyricsButton () {
  if (document.getElementById('showlyricsbutton')) {
    return
  }
  const b = document.createElement('div')
  b.setAttribute('id', 'showlyricsbutton')
    // change the size of the 🅖 icon off to the right hand side
  b.setAttribute('style', 'position:absolute; top: 0px; right:0px; font-size:10px; color:rgb(255, 192, 203, 0.9); cursor:pointer; z-index:3000;')
  b.setAttribute('title', 'Load lyrics from genius.com')
  b.appendChild(document.createTextNode('🅖'))
  b.addEventListener('click', function onShowLyricsButtonClick () {
    genius.option.autoShow = true // Temporarily enable showing lyrics automatically on song change
    window.clearInterval(genius.iv.main)
    genius.iv.main = window.setInterval(main, 2000)
    b.remove()
    addLyrics(true)
  })
  document.body.appendChild(b)
  if (b.clientWidth < 10) {
    b.setAttribute('style', 'position:absolute; top: 0px; right:0px; font-size:14px; background-color:rgb(255, 192, 203, 0.9); color:rgb(255, 192, 203, 0.9); cursor:pointer; z-index:3000;border:1px solid #ffff64;border-radius: 100%;padding: 0px 5px;font-size: 10px;')
    b.innerHTML = 'G'
  }
}

function configShowSpotifyLyrics (div) {
  // Input: Show lyrics from Spotify if no lyrics found on genius.com
  const id = 'input945455'

  const input = div.appendChild(document.createElement('input'))
  input.type = 'checkbox'
  input.id = id
  GM.getValue('show_spotify_lyrics', true).then(function (v) {
    input.checked = v
  })

  const label = div.appendChild(document.createElement('label'))
  label.setAttribute('for', id)
  label.appendChild(document.createTextNode('Open lyrics from Spotify if no lyrics found on genius.com'))

  const onChange = function onChangeListener () {
    GM.setValue('show_spotify_lyrics', input.checked)
  }
  input.addEventListener('change', onChange)
}

function configSubmitSpotifyLyrics (div) {
  // Input: Submit lyrics from Spotify to genius.com
  const id = 'input337565'

  const input = div.appendChild(document.createElement('input'))
  input.type = 'checkbox'
  input.id = id
  input.setAttribute('title', '...in case Spotify has lyrics that genius.com does not have')
  GM.getValue('submit_spotify_lyrics', true).then(function (v) {
    input.checked = v
  })

  const label = div.appendChild(document.createElement('label'))
  label.setAttribute('for', id)
  label.appendChild(document.createTextNode('Suggest to submit lyrics from Spotify to genius.com'))
  label.setAttribute('title', '...in case Spotify has lyrics that genius.com does not have')

  const onChange = function onChangeListener () {
    GM.setValue('submit_spotify_lyrics', input.checked)
  }
  input.addEventListener('change', onChange)
}

function addCss () {
  document.head.appendChild(document.createElement('style')).innerHTML = `
  .lyricsiframe {
    opacity:0.5;
    transition:opacity 2s;
    margin:0px;
    padding:0px;
  }
  .loadingspinnerholder {
    position:absolute;
    top:100px;
    left:100px;
    cursor:progress
  }
  .lyricsnavbar span,.lyricsnavbar a:link,.lyricsnavbar a:visited {
    color: rgb(179, 179, 179);
    text-decoration:none;
    transition:color 400ms;
  }
  .lyricsnavbar a:hover,.lyricsnavbar span:hover {
    color:white;
    text-decoration:none;
  }
  .geniushits li {
    cursor:pointer
  }
  .geniushits li:hover {
    background-color: #fff5;
    border-radius: 5px;
  }
  .geniushits li .geniushiticonout {
    display:inline-block
  }
  .geniushits li:hover .geniushiticonout {
    display:none
  }
  .geniushits li .geniushiticonover {
    display:none
  }
  .geniushits li:hover .geniushiticonover {
    display:inline-block
  }
  .geniushiticon {
    width:25px;
    height:2em;
    display:inline-block;
  }
  .geniushitname {
    display:inline-block;
    position: relative;
    overflow:hidden
  }
  .geniushitname .tracklist-name {
    font-size: 16px;
    font-weight: 400;
    color:white;
  }
  .geniushitname.runningtext .tracklist-name {
    display: inline-block;
    position: relative;
    animation: 3s linear 0s infinite alternate runtext;
  }
  .geniushits .second-line-separator {
    opacity: 0.7
  }
  .geniushitname .geniusbadge {
    color: rgb(255, 192, 203);
    background-color: rgb(255, 192, 203);
    border-radius: 3px;
    text-transform: uppercase;
    font-size: 9px;
    line-height: 10px;
    min-width: 16px;
    height: 16px;
    padding: 0 2px;
    margin: 0 3px;
  }
  @keyframes runtext {
    0%, 25% {
      transform: translateX(0%);
      left: 0%;
    }
    75%, 100% {
      transform: translateX(-100%);
      left: 100%;
    }
  }
  `
}

function main () {
  if (document.querySelector('.Root__now-playing-bar .playback-bar') && document.querySelector(songTitleQuery)) {
    if (genius.option.autoShow) {
      addLyrics()
    } else {
      addLyricsButton()
    }
  }
}
    window.setInterval(function removeAds () {
  // Remove "premium" button
    try {
      const button = document.querySelector('.Root__top-bar header>button')
      if (button && button.outerHTML.toLowerCase().indexOf('premium') !== -1) {
        button.style.display = 'none'
      }
    } catch (e) {
      console.warn(e)
    }
    // Remove "install app" button
    try {
      const button = document.querySelector('a[href*="/download"]')
      if (button) {
        button.parentNode.style.display = 'none'
      }
    } catch (e) {
      console.warn(e)
    }
  }, 3000)

  genius = geniusLyrics({
    GM,
    scriptName,
    scriptIssuesURL: 'https://github.com/SenpaiHunters/SpotOn/issues',
    scriptIssuesTitle: 'Report problem: https://github.com/SenpaiHunters/SpotOn/issues',
    domain: 'https://open.spotify.com',
    emptyURL: 'https://open.spotify.com/robots.txt',
    main,
    addCss,
    listSongs,
    showSearchField,
    addLyrics,
    hideLyrics,
    getCleanLyricsContainer,
    setFrameDimensions,
    initResize,
    onResize,
    config: [configShowSpotifyLyrics, configSubmitSpotifyLyrics],
    toggleLyricsKey: {
      shiftKey: true,
      ctrlKey: false,
      altKey: false,
      key: 'L'
    },
    onNoResults,
    onNewSongPlaying
  })

  GM.registerMenuCommand(scriptName + ' - Show lyrics', () => addLyrics(true))
  GM.registerMenuCommand(scriptName + ' - Options', () => genius.f.config())
  window.setInterval(updateAutoScroll, 7000)
}
)();

/* END */
