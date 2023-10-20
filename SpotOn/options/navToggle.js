(function () {
  "use strict";

  const style = {
    leftSidebarCollapsedClassName: "SST-left-sidebar-collapsed",
    containerSelector: "div.Root__top-container, .sqKERfoKl4KwrtHqcKOd",
    navbarSelector: ".BdcvqBAid96FaHAmPYw_",
    mainviewSelector:
      ".main-view-container .main-view-container__scroll-node .os-content .main-view-container__scroll-node-child",
    topbarSelector: ".QuHe04rU4bj0Z5U9E2Tk",
    nowplayingbarSelector: ".JG5J9NWJkaUO9fiKECMA",
  };

  function addStyle(css) {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
  }

  addStyle(`
    .${style.leftSidebarCollapsedClassName} ${style.topbarSelector},
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
    @media screen and (max-width: 700px) {
      body {
        min-width: unset;
      }
      ${style.nowplayingbarSelector} {
        width: 100%;
        min-width: unset;
        max-width: 100vh;
        min-height: 70px;
        max-height: 100%;
        padding: 10px 20px;
        height: unset;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      ${style.nowplayingbarSelector} .now-playing-bar__left {
        width: auto;
        order: 1;
        display: none;
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
  `);

  const toggleLeftSidebar = () => {
    const body = document.body;
    const leftSidebar = document.querySelector(style.navbarSelector);

    body.classList.toggle(style.leftSidebarCollapsedClassName);
    leftSidebar.style.transform = body.classList.contains(
      style.leftSidebarCollapsedClassName
    )
      ? "translateX(-100%)"
      : "translateX(0)";
    leftSidebar.style.opacity = body.classList.contains(
      style.leftSidebarCollapsedClassName
    )
      ? 0
      : 1;
  };

  const toggleNowPlayingBar = () => {
    const nowPlayingBar = document.querySelector(style.nowplayingbarSelector);
    nowPlayingBar.classList.toggle(style.leftSidebarCollapsedClassName);
    nowPlayingBar.style.display = nowPlayingBar.classList.contains(
      style.leftSidebarCollapsedClassName
    )
      ? "none"
      : "block";
  };

  function onLoad(callback) {
    if (document.readyState === "complete") {
      callback();
    } else {
      window.addEventListener("load", callback);
    }
  }

  function initialize() {
    const combinator = {
      on(passedCombination, callback) {
        const combination = passedCombination.map((c) => c.toLowerCase());
        let buffer = [];
        let skipNextKeyUp = false;

        const isCombinationMet = () =>
          buffer.toString() === combination.toString();

        document.addEventListener("keydown", (e) => {
          const key = e.key.toLowerCase();
          buffer.push(key);

          if (isCombinationMet()) {
            buffer.pop();
            if (buffer.length) skipNextKeyUp = true;

            callback();
          }
        });

        document.addEventListener("keyup", (e) => {
          if (skipNextKeyUp) {
            skipNextKeyUp = false;
            return;
          }
          buffer = [];
        });
      },
    };

    onLoad(() => {
      combinator.on(["control", "shift", "a"], toggleLeftSidebar);
      combinator.on(["control", "shift", "s"], toggleNowPlayingBar);

      const checkMainViewExist = setInterval(() => {
        const mainview = document.querySelector(style.mainviewSelector);
        if (mainview) {
          const toggler = document.createElement("div");
          toggler.classList.add("nav-bar-toggler");
          toggler.onmousedown = (evt) => {
            evt.preventDefault();
            toggleLeftSidebar();
          };
          toggler.onmouseenter = () => {
            toggler.style.background = "linear-gradient(#e66465, #9198e5)";
          };
          toggler.onmouseleave = () => {
            toggler.style.background = "";
          };
          mainview.appendChild(toggler);
          clearInterval(checkMainViewExist);
        }
      }, 500);
    });
  }

  initialize();
})();
