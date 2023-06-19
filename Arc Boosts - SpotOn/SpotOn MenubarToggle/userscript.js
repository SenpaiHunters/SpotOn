// ==UserScript==
// @name          SpotOn MenubarToggler
// @namespace     https://github.com/SenpaiHunters/SpotOn
// @description   This is a part of the SpotOn library, for more information check the SpotOn website!
// @author        Kami
// @version       2.1
// @match         https://open.spotify.com/*
// @match         http://*.open.spotify.com/*
// @supportURL    https://github.com/SenpaiHunters/SpotOn/issues
// @run-at        document-start
// @license       MIT
// ==/UserScript==

(function() {
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
    if (document.readyState === 'complete') {
      callback();
    } else {
      window.addEventListener('load', callback);
    }
  };

  const style = {
    leftSidebarCollapsedClassName: 'SST-left-sidebar-collapsed',
    containerSelector: 'div.Root__top-container',
    navbarSelector: '.BdcvqBAid96FaHAmPYw_',
    mainviewSelector: '.main-view-container .main-view-container__scroll-node .os-content .main-view-container__scroll-node-child',
    topbarSelector: '.QuHe04rU4bj0Z5U9E2Tk', // .PHgyArRLVFknlaOm31ID
    nowplayingbarSelector: '.nav-ylx [data-testid="now-playing-bar"] :first-child:has([data-testid="player-controls"])',
  };

  const addStyle = (css) => {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
  };

  addStyle(`
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
      display: none;
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

  addStyle(`
    body {
      font-family: "Microsoft Yahei";
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
        display: none !important;
      }
      ${style.nowplayingbarSelector} .now-playing-bar__left {
        width: auto;
        order: 1;
        display: none;
      }
      ${style.nowplayingbarSelector} .now-playing-bar__center {
        width: 100%;
        order: 3;
        display: none;
      }
      ${style.nowplayingbarSelector} .now-playing-bar__right {
        max-width: 25%;
        min-width: unset;
        display: none;
        order: 2;
      }
      ${style.nowplayingbarSelector} .now-playing-bar__right__inner {
        width: 100%;
        display: none !important;
      }
    }
  `);

  function toggleSidebar() {
    const body = document.body;
    const nowPlayingBar = document.querySelector(style.nowplayingbarSelector);
    const leftSidebar = document.querySelector(style.navbarSelector);
    const mainView = document.querySelector(style.mainviewSelector);
    if (nowPlayingBar) {
      nowPlayingBar.classList.toggle(style.leftSidebarCollapsedClassName);
    }
    body.classList.toggle(style.leftSidebarCollapsedClassName);
    leftSidebar.style.display = nowPlayingBar.classList.contains(style.leftSidebarCollapsedClassName) ? 'none' : 'block';
    mainView.style.width = nowPlayingBar.classList.contains(style.leftSidebarCollapsedClassName) ? '100%' : '';
    nowPlayingBar.style.display = nowPlayingBar.classList.contains(style.leftSidebarCollapsedClassName) ? 'display' : 'none';
  }

  onLoad(() => {
    combinator.on(['command', 'shift', 'a'], toggleSidebar);

    const checkMainViewExist = setInterval(() => {
      const mainview = document.querySelector(style.mainviewSelector);
      if (mainview) {
        const toggler = document.createElement('div');
        toggler.classList.add('nav-bar-toggler');
        toggler.onmousedown = (evt) => {
          evt.preventDefault();
          toggleSidebar();
        };
        mainview.appendChild(toggler);
        clearInterval(checkMainViewExist);
      }
    }, 500);
  });
})();
