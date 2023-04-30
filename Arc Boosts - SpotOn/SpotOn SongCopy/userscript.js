// ==UserScript==
// @name          SpotOn SongCopy
// @namespace     https://github.com/SenpaiHunters/SpotOn
// @icon          https://github.com/SenpaiHunters/SpotOn/blob/Main/SpotOn%20logo.png?raw=true
// @description	  This extension/userscript is apart of the SpotOn library, this (SpotOn SongCopy) is to be used WITH SpotOn but can be used by it's self, the main focus is to add a `Copy track info`, which does as it states, copies track info.
// @author        Kami
// @version       0.7
// @match         https://open.spotify.com/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant         GM.setClipboard
// @grant         GM_setClipboard
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


/*
 * # Check out my other SpotOn Projects!
 * GitHub: https://github.com/senpaihunters/spoton
 * Website: https://spoton.framer.website/
 * 
 # Install
 * Install Tampermonkey, Violentmonkey or Greasemonkey
 * Copy this file
 * Paste all the content into a script and save
 * You're done!
 *
 * # Feel like thanking me for my hard work?
 *
 * Totally optional but _truly, deeply_ appreciated and brings a great smile to my face,
 * and inspires me to keep working. ;-)
 *
 * Check my socials out - https://linktr.ee/SenpaiHunter
 * Support (application support + any help) via discord - https://discord.gg/pjNn2M22ct
 * YouTube - https://www.youtube.com/@Kami_YT (I also make AMVs if that interests you)
 * Help Support Me -  https://www.buymeacoffee.com/KamiAMVS
 *
 * # Latest release notes
 * Check out the GitHub (https://github.com/SenpaiHunters/SpotOn)
 * 
 */

(function CopyTrackInfo() {
    console.log("CopyTrackInfo function running");
    const translations = {
      en: ['Copy track info', 'Copied: %s'],
    }
    let [menuString, copiedString] = translations.en
    for (const lang in translations) {
      if (navigator.language.startsWith(lang)) {
        [menuString, copiedString] = translations[lang]
        // console.log(lang + ' <- ' + navigator.language) - Allow for lang other then Eng.
        break
      }
    }
  
    let showInfoID
    const showInfo = function (str) {
      window.clearTimeout(showInfoID)
      if (!document.getElementById('copied_song_info_outer')) {
        document.head.appendChild(document.createElement('style')).innerHTML = '#copied_song_info_outer {z-index: 20000;height:0;margin: -62px auto 0;padding-bottom: 62px;pointer-events: none;display: inline-block;}#copied_song_info_inner {max-width: none;display: inline-block;background: #2e77d0;border-radius: 8px;box-shadow: 0 4px 12px 4px rgba(0,0,0,.5);color: #fff;font-size: 16px;line-height: 20px;max-width: 450px;opacity: 1;padding: 12px 36px;text-align: center;transition: none .5s cubic-bezier(.3,0,.4,1);transition-property: opacity;}'
        $('<div id="copied_song_info_outer"><div id="copied_song_info_inner"></div></div>').appendTo('.Root__main-view')
      }
      const copiedSongInfoOuter = $('#copied_song_info_outer')
      const copiedSongInfoInner = $('#copied_song_info_inner')
  
      copiedSongInfoOuter.css('display', 'inline-block')
      copiedSongInfoInner.css('opacity', 1)
      copiedSongInfoInner.html(str.replace('\n', '<br>\n'))
  
      showInfoID = window.setTimeout(function () {
        copiedSongInfoInner.css('opacity', 0)
        showInfoID = window.setTimeout(function () {
          copiedSongInfoOuter.css('display', 'none')
        }, 700)
      }, 4000)
    }
  
    const getSongTitle = function ($titlenodes) {
      let titleText
  
      if ($titlenodes && $titlenodes.length > 0) {
        titleText = $titlenodes.text()
        if (titleText && titleText.trim()) {
          return titleText.trim()
        }
      }
  
      if ($('.track-info__name').length > 0) {
        titleText = $('.track-info__name')[0].innerText
        if (titleText && titleText.trim()) {
          return titleText.trim()
        }
      }
  
      return ''
    }
  
    const getArtistName = function ($artistnodes) {
      let artistText
  
      if (typeof $artistnodes === 'string') {
        return $artistnodes.trim()
      }
  
      if ($artistnodes) {
        const artistTextNodes = $artistnodes.not((i, e) => e.className)
        if (artistTextNodes.length === 1) {
          artistText = artistTextNodes.text()
          if (artistText && artistText.trim()) {
            return artistText.trim()
          }
        } else if (artistTextNodes.length > 1) {
          artistText = artistTextNodes.map((i, e) => e.textContent.trim()).get()
          artistText = artistText.join(', ')
          return artistText.trim()
        }
  
        // If in playlist:
        if ($artistnodes.find('.ellipsis-one-line').length > 0) {
          artistText = $artistnodes.find('.ellipsis-one-line')[0].innerText
          if (artistText && artistText.trim()) {
            return artistText.trim()
          }
        }
        if ($artistnodes.find('.standalone-ellipsis-one-line').length > 0) {
          artistText = $artistnodes.find('.standalone-ellipsis-one-line')[0].innerText
          if (artistText && artistText.trim()) {
            return artistText.trim()
          }
        }
  
        if ($artistnodes.find('a[href^="/artist/"]').length > 0) {
          return $.map($artistnodes.find('a[href^="/artist/"]'), (element) => $(element).text().trim()).join(', ')
        }
      }
  
      if (document.location.pathname.startsWith('/artist/')) {
        if ($('.content.artist>div h1').length > 0) {
          artistText = $('.content.artist>div h1')[0].textContent
          if (artistText && artistText.trim()) {
            return artistText.trim()
          }
        } else {
          if ($('.Root__main-view h1').length > 0) {
            artistText = $('.Root__main-view h1')[0].textContent
            if (artistText && artistText.trim()) {
              return artistText.trim()
            }
          }
        }
      }
  
      if (document.location.pathname.startsWith('/album/')) {
        artistText = document.querySelector('.os-content h1').textContent
        if (artistText && artistText.trim()) {
          return artistText.trim()
        }
      }
  
      if ($('.track-info__artists').length > 0) {
        artistText = $('.track-info__artists')[0].innerText
        if (artistText && artistText.trim()) {
          return artistText.trim()
        }
      }
  
      return ''
    }
  
    const populateContextMenu = function (ev) {
      console.debug('populateContextMenu')
      let $this = $(this)
  
      let menu = $('.react-contextmenu--visible')
      if (!menu[0]) {
        menu = $('#context-menu-root')
      }
      if (!menu[0]) {
        menu = $('#context-menu')
      }
  
      let title = $this.find('.tracklist-name')
      if (title.length === 0) {
        title = $this.find('div[data-testid="tracklist-row"] .standalone-ellipsis-one-line')
      }
      if (title.length === 0) {
        title = $this.find('div[role="gridcell"] img').parent().find('.standalone-ellipsis-one-line')
      }
      if (title.length === 0 && $this.hasClass('now-playing')) {
        title = $this.find('.ellipsis-one-line>.ellipsis-one-line').eq(0)
      }
      let artist = $this.find('.artists-album span')
      if (artist.length === 0 && $this.hasClass('now-playing')) {
        artist = $this.find('.ellipsis-one-line>.ellipsis-one-line').eq(1)
      }
      if (artist.length === 0 && title.length === 0 && $this.find('[data-testid="nowplaying-track-link"]')) {
        title = $this.find('[data-testid="nowplaying-track-link"]')
        artist = $this.find('[data-testid="nowplaying-artist"]')
      }
      if (artist.length === 0) {
        if ($this.find('.second-line').length !== 0) {
          artist = $this.find('.second-line') // If in playlist
        }
        if ($this.parents('.now-playing').length !== 0) {
          // Copy fof NPB
          $this = $($this.parents('.now-playing')[0])
          if ($this.find('.ellipsis-one-line a[href^="/artist/"]').length !== 0) {
            artist = $this.find('.ellipsis-one-line a[href^="/artist/"]')
            title = $this.find('a[data-testid="nowplaying-track-link"]')
          }
        }
        if ($this.parents('.Root__now-playing-bar').length !== 0) {
          $this = $($this.parents('.Root__now-playing-bar')[0])
          if ($this.find('.ellipsis-one-line a[href^="/artist/"],.standalone-ellipsis-one-line a[href^="/artist/"]').length !== 0) {
            artist = $this.find('.ellipsis-one-line a[href^="/artist/"],.standalone-ellipsis-one-line a[href^="/artist/"]')
            title = $this.find('.ellipsis-one-line a[href^="/album/"],.ellipsis-one-line a[href^="/track/"],.standalone-ellipsis-one-line a[href^="/album/"],.standalone-ellipsis-one-line a[href^="/track/"]')
          } else if ($this.find('[data-testid="context-item-info-artist"]').length !== 0) {
            artist = $this.find('a[data-testid="context-item-info-artist"][href^="/artist/"],[data-testid="context-item-info-artist"] a[href^="/artist/"]')
            title = $this.find('[data-testid="context-item-info-title"] a[href^="/album/"],[data-testid="context-item-info-title"] a[href^="/track/"]')
          } else if ($this.find('a[href^="/artist/"],a[href^="/album/"],a[href^="/track/"]').length > 1) {
            artist = $this.find('a[href^="/artist/"]')
            title = $this.find('a[href^="/album/"],a[href^="/track/"]')
          }
        }
  
        const artistGridCell = $this.find('*[role="gridcell"] a[href^="/artist/"]')
        if (artistGridCell.length > 0) {
          artist = artistGridCell.parent()
          title = $(artistGridCell.parent().parent().find('span')[0])
          if (artist.has(title)) {
            if (artist.parent().parent().find('div.standalone-ellipsis-one-line').length) {
              title = $(artist.parent().parent().find('div.standalone-ellipsis-one-line')[0])
            }
          }
        }
  
        const artistContent = $('.content.artist>div h1')
        if (artistContent.length > 0) {
          // Artist page
          artist = artistContent[0].textContent
        }
      }
  
      if (title && artist && menu[0]) {
        const titleText = getSongTitle(title)
        const artistText = getArtistName(artist)
        if (!titleText || !artistText) {
          return
        }
  
        // Create context menu entry
        if (menu.attr('id').startsWith('context-menu')) {
          let entry = menu.find('.gmcopytrackinfo')
          if (entry.length === 0 || !entry[0]) {
            let li = menu.find('li')
            if (li.length > 4) {
              li = $(li[4])
            } else {
              li = $(li[0])
            }
            entry = $('<li role="presentation"><button role="menuitem" tabindex="-1"><span as="span" dir="auto">' + menuString + '</span></button></li>')
              .appendTo(li)
              .click(function (ev) {
                // Copy strings to clipboard
                const s = entry.data('gmcopy')
                if (typeof GM_setClipboard !== 'undefined') {
                  GM_setClipboard(s)
                } else if (GM.setClipboard) {
                  GM.setClipboard(s)
                } else {
                  navigator.clipboard.writeText(s)
                }
                showInfo(copiedString.replace('%s', s))
                menu.parent().remove()
              })
              // Allow copy classes from an existing entry
            entry.addClass('gmcopytrackinfo')
            entry.addClass(li.attr('class'))
            entry.find('button').addClass(li.find('button').attr('class'))
            entry.find('button span').addClass(li.find('button span').attr('class'))
          }
          entry.data('gmcopy', artistText + ' - ' + titleText)
        }
      }
    }
  
    const onContextMenu = function (ev) {
      // Wait for the React context menu to open
      const t = this
      window.setTimeout(function () {
        populateContextMenu.call(t, ev)
      }, 200)
    }
  
    const bindEvents = function () {
      // Remove all events and then reattach them
      if ($('.react-contextmenu-wrapper').length > 0) {
        $('.react-contextmenu-wrapper').unbind('.gmcopytrackinfo').bind('contextmenu.gmcopytrackinfo', onContextMenu)
      } else {
        $('*[data-testid="tracklist-row"],.now-playing,*[data-testid="now-playing-widget"]').unbind('.gmcopytrackinfo').bind('contextmenu.gmcopytrackinfo', onContextMenu)
      }
    }
  
    window.setTimeout(bindEvents, 500)
  
    window.setInterval(bindEvents, 1000)
  })()
  
  
  // END //
