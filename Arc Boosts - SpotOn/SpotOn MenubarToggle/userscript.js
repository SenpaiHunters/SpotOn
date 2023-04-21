// ==UserScript==
// @name          SpotOn MenubarToggler
// @namespace     https://github.com/SenpaiHunters/SpotOn
// @icon          https://github.com/SenpaiHunters/SpotOn/blob/Main/SpotOn%20logo.png?raw=true
// @description	  This is apart of the SpotOn library, for more infomation check the SpotOn website!
// @author        Kami
// @version       1.0
// @match         https://open.spotify.com/*
// @match         http://*.open.spotify.com/*
// @supportURL    https://github.com/SenpaiHunters/SpotOn/issues
// @grant         GM.xmlHttpRequest
// @grant         GM.setValue
// @grant         GM.getValue
// @grant         GM_addStyle
// @run-at        document-start
// @license       MIT
// @copyright     2022, Kami
// ==/UserScript==


/*
 * # SpotOn MenubarToggler is apart of the SpotOn library, this can be either a standalone extension or used in conjunction with SpotOn!
 *
 * Made By Kami
 *
 * Copyright 2022, Kami.
 *
 *
 * # Socials
 * SpotOn Website: spoton.framer.website/
 * Twitter: Kami_YT_
 * GitHub: github.com/senpaihunters/spoton
 */


// Menu bar toggle
(function MenubarToggle() {
  console.log("MenubarToggle function running");
  'use strict';

  const combinator = {
    on(passedCombination, callback) {
      const combination = passedCombination.map(c => c.toLowerCase());
      let buffer = [];
      let skipNextKeyUp = false;

      const isCombinationMet = () => buffer.toString() === combination.toString();

      document.addEventListener('keydown', e => {
        const key = e.key.toLowerCase();
        buffer.push(key);

        if (isCombinationMet()) {
          buffer.pop();
          if (buffer.length) skipNextKeyUp = true;

          callback();
        }
      });

      document.addEventListener('keyup', e => {
        if (skipNextKeyUp) {
          skipNextKeyUp = false;
          return;
        }
        buffer = [];
      });
    }
  };

  const onLoad = callback => {
    const loadedStates = ['loaded', 'interactive', 'complete'];
    if (loadedStates.includes(document.readyState)) {
      callback();
    }
    else {
      window.addEventListener('load', () => {
        callback();
      });
    }
  };

  const style = {
    leftSidebarCollapsedClassName: 'SST-left-sidebar-collapsed',
    containerSelector: '.Root__top-container',
    navbarSelector: '.Root__nav-bar',
    mainviewSelector: '.Root__main-view',
    topbarSelector: '.Root__top-bar header',
    nowplayingbarSelector: '.Root__now-playing-bar footer .now-playing-bar',
  };

  GM_addStyle(`
.${style.leftSidebarCollapsedClassName} ${style.topbarSelector} {
  max-width: 100vw;
}
${style.containerSelector} {
  transition: .2s;
}
.${style.leftSidebarCollapsedClassName} ${style.navbarSelector} {
  width: 0;
  opacity: 0;
  transition: width .2s, opacity .2s;
}
${style.mainviewSelector} {
  transition: width .2s;
}
${style.mainviewSelector} > div.nav-bar-toggler {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 7px;
  height: 100%;
  display: block;
}
${style.mainviewSelector} > div.nav-bar-toggler:hover {
  cursor: e-resize;
  content: linear-gradient(#e66465, #9198e5);
}
  `);

  GM_addStyle(`
body {
  font-family: Microsoft Yahei;
}
@media screen and (max-width: 700px) {
  body {
    min-width: unset;
  }
  ${style.nowplayingbarSelector} {
    width: 100%;
    min-width: unset;
    max-width: 100vw;
    min-height: 70px;
    padding: 10px 20px;
    height: unset;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  ${style.nowplayingbarSelector} .now-playing-bar__left {
      width: auto;
      order: 1;
  }
  ${style.nowplayingbarSelector} .now-playing-bar__center {
      width: 100%;
      order: 3;
  }
  ${style.nowplayingbarSelector} .now-playing-bar__right {
      max-width: 25%;
      min-width: unset;
      order: 2;
  }
  ${style.nowplayingbarSelector} .now-playing-bar__right__inner {
      width: 100%;
  }
}

  `)

  function toggleSideBar() {
    const body = document.body;
    const nowPlayingBar = document.querySelector(style.nowplayingbarSelector);
  if (nowPlayingBar) {
    nowPlayingBar.classList.toggle(style.leftSidebarCollapsedClassName);
  }
  body.classList.toggle(style.leftSidebarCollapsedClassName);
}
  onLoad(() => {
    combinator.on(['command', 'shift', 'a'], () => {
      toggleSideBar();
    });

    const checkMainViewExist = setInterval(() => {
      const mainview = document.querySelector(style.mainviewSelector);
      if (mainview) {
        const toggler = document.createElement('div');
        toggler.classList.add('nav-bar-toggler')
        toggler.onmousedown = (evt) => {
          evt.preventDefault();
          toggleSideBar();
        }
        mainview.appendChild(toggler);
        clearInterval(checkMainViewExist);
      }
    }, 500)

  });
})();

// END //
