window.navToggle = function () {
  console.log("MenubarToggle function running");

  ("use strict");

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
          console.log("Hotkey combination detected. Callback executed.");
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

  const onLoad = (callback) => {
    if (document.readyState === "complete") {
      callback();
      console.log("Page is already fully loaded. Callback executed.");
    } else {
      window.addEventListener("load", callback);
      console.log(
        "Page is loading. Callback registered for when the page is fully loaded."
      );
    }
  };

  const style = {
    leftSidebarCollapsedClassName: "SST-left-sidebar-collapsed",
    containerSelector: "div.Root__top-container, .sqKERfoKl4KwrtHqcKOd",
    navbarSelector: ".BdcvqBAid96FaHAmPYw_",
    mainviewSelector:
      ".main-view-container .main-view-container__scroll-node .os-content .main-view-container__scroll-node-child",
    topbarSelector: ".QuHe04rU4bj0Z5U9E2Tk",
    nowplayingbarSelector: ".JG5J9NWJkaUO9fiKECMA",
  };

  const addStyle = (css) => {
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
    console.log("Added style to the document:", style);
  };

  // Add styles to the document
  addStyle(`
  .${style.leftSidebarCollapsedClassName} ${style.topbarSelector} {
    max-width: -webkit-fill-available;
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

  function toggleLeftSidebar() {
    const body = document.body;
    const leftSidebar = document.querySelector(style.navbarSelector);
    const mainView = document.querySelector(style.mainviewSelector);

    body.classList.toggle(style.leftSidebarCollapsedClassName);
    leftSidebar.style.display = body.classList.contains(
      style.leftSidebarCollapsedClassName
    )
      ? "none"
      : "block";
    mainView.style.width = body.classList.contains(
      style.leftSidebarCollapsedClassName
    )
      ? "100%"
      : "";
    console.log(
      "Toggled left sidebar. Left Sidebar:",
      leftSidebar,
      "Main View:",
      mainView
    );
  }

  function toggleNowPlayingBar() {
    const nowPlayingBar = document.querySelector(style.nowplayingbarSelector);
    nowPlayingBar.classList.toggle(style.leftSidebarCollapsedClassName);
    nowPlayingBar.style.display = nowPlayingBar.classList.contains(
      style.leftSidebarCollapsedClassName
    )
      ? "none"
      : "block";
    console.log("Toggled Now Playing Bar. Now Playing Bar:", nowPlayingBar);
  }

  onLoad(() => {
    combinator.on(["control", "shift", "a"], toggleLeftSidebar); // nav bar toggle
    combinator.on(["control", "shift", "s"], toggleNowPlayingBar); // now playing bar toggle
    // trobleshoot the accuracy of 50%

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
        console.log("Added toggler to the main view:", toggler);
      }
    }, 500);
  });
};

navToggle(); // Call the function immediately to execute the code

document.addEventListener("keydown", (e) => {
  const keyCombination = ["Control", "Shift", "A"]; // Change the hotkey combination here
  const keyPressed = e.key;
  if (
    keyCombination.every((key) => e.getModifierState(key)) &&
    keyPressed === keyCombination[keyCombination.length - 1]
  ) {
    navToggle.toggleLeftSidebar(); // Call the toggleLeftSidebar function when the hotkey is pressed
    console.log("Hotkey pressed. ToggleLeftSidebar called.");
  }
  if (
    keyCombination.every((key) => e.getModifierState(key)) &&
    keyPressed === "S"
  ) {
    navToggle.toggleNowPlayingBar(); // Call the toggleNowPlayingBar function when the hotkey is pressed
    console.log("Hotkey pressed. ToggleNowPlayingBar called.");
  }
});

console.log("MenubarToggle initialized successfully.");
