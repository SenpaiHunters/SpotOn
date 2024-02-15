(function () {
  "use strict";

  const style = {
    leftSidebarCollapsedClassName: "left-sidebar-collapsed",
    nowPlayingBarCollapsedClassName: "now-playing-bar-collapsed",
    navbarSelector: ".BdcvqBAid96FaHAmPYw_",
    mainviewSelector: ".main-view-container .main-view-container__scroll-node .os-content .main-view-container__scroll-node-child",
    nowplayingbarSelector: ".JG5J9NWJkaUO9fiKECMA",
  };

  const addStyle = (() => {
    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    return (css) => {
      styleElement.innerHTML += css;
    };
  })();

  addStyle(`
    .${style.leftSidebarCollapsedClassName} ${style.navbarSelector} {
      width: 0;
      opacity: 0;
      transition: width .2s, opacity .2s;
    }
    .${style.nowPlayingBarCollapsedClassName} ${style.nowplayingbarSelector} {
      display: none;
    }
    ${style.mainviewSelector} > div.nav-bar-toggler {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: 7px;
      height: 100vh;
      overflow-y: auto;
      border-top-left-radius: 20px;
      display: block;
    }
    ${style.mainviewSelector} > div.nav-bar-toggler:hover {
      cursor: e-resize;
      content: linear-gradient(45deg, #e66465, #f08dbd, #9198e5, #7c64e5);
    }
  `);

  const toggleElement = (selector, className, transform) => {
    const element = document.querySelector(selector);
    const isCollapsed = document.body.classList.toggle(className);
    element.style.transform = isCollapsed ? transform[0] : transform[1];
    document.body.style.overflowX = isCollapsed ? 'hidden' : 'auto';
  };

  const setupListeners = () => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === 'hide_sidebar') {
        toggleElement(style.navbarSelector, style.leftSidebarCollapsedClassName, ["translateX(-100%)", "translateX(0)"]);
      } else if (message.action === 'hide_npb') {
        document.body.classList.toggle(style.nowPlayingBarCollapsedClassName);
      }
    });
  };

  const observeMainView = () => {
    const observer = new MutationObserver((mutations, obs) => {
      const mainview = document.querySelector(style.mainviewSelector);
      if (mainview) {
        const toggler = document.createElement("div");
        toggler.classList.add("nav-bar-toggler");
        toggler.onmousedown = (evt) => {
          evt.preventDefault();
          toggleElement(style.navbarSelector, style.leftSidebarCollapsedClassName, ["translateX(-100%)", "translateX(0)"]);
        };
        mainview.appendChild(toggler);
        obs.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  const initialize = () => {
    if (document.readyState === "complete") {
      setupListeners();
      observeMainView();
    } else {
      window.addEventListener("load", () => {
        setupListeners();
        observeMainView();
      });
    }
  };

  initialize();
})();