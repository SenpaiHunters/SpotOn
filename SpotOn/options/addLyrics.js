console.log("Script started loading...");

const STAT_ENABLED = 1;
const STAT_DISABLED = 0;

let stat = STAT_ENABLED;
const startTime = performance.now();

initSkin();

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sendResponse) {
  console.log(message.txt);

  if (message.txt === "disable" && message.bool === "false") {
    removeSkin();
    sendResponse({ status: "disabled" });
    stat = STAT_DISABLED;
  } else if (message.txt === "enable" && message.bool === "true") {
    initSkin(true);
    sendResponse({ status: "enabled" });
    stat = STAT_ENABLED;
  } else if (message.txt === "check" || message.txt === "das") {
    sendResponse({ status: stat });
  }
}

function initSkin(das) {
  console.log("CSS Functions Starting");

  function addStyleToDocument(css) {
    const node = document.createElement("style");
    node.setAttribute("id", "skin");
    node.type = "text/css";
    node.appendChild(document.createTextNode(css));
    const heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      heads[0].appendChild(node);
    } else {
      document.documentElement.appendChild(node);
    }
  }

  if (typeof GM_addStyle !== "undefined") {
    GM_addStyle(getCSS(das));
  } else if (typeof PRO_addStyle !== "undefined") {
    PRO_addStyle(getCSS(das));
  } else if (typeof addStyle !== "undefined") {
    addStyle(getCSS(das));
  } else {
    addStyleToDocument(getCSS(das));
  }

  addObserverIfDesiredNodeAvailable();
}

function removeSkin() {
  const el = document.getElementById("skin");
  if (el !== null) {
    el.remove();
  }
  localStorage.setItem("skin", false);
}

function getCSS(das) {
  let css = `@charset "UTF-8";
    /*------Created by Kami--------*/

    :root {
      /*- Misc -*/
      --overlay-heavy: rgba(0, 0, 0, 0.4);
      --standard-ease: 350ms cubic-bezier(0.215, 0.61, 0.355, 1);
      --main-border-radius: 25px;
      --white: rgb(255, 255, 255);
      --hoverback: rgba(255, 255, 255, 0.1);
      --blur: 20px;
      --hovercolor: rgba(0, 0, 0, 0.2);
      --icons: var(--white);
      /* ↑ #ffa79b*/
    }
/* more css after this */
    .encore-dark-theme {
      --text-subdued: rgba(255, 255, 255, 0.878) !important;
    }

    /* Now Playing Bar - Album cover */
    .deomraqfhIAoSB3SgXpu {
      transform: translateX(-80px) !important; /* -80 */
    }

    /* whats new */
    .kpRBcW:hover,
    .RowButton-sc-xxkq4e-0.hIehTT:hover,
    .bgTbzH:hover::after,
    button.encore-over-media-set.I4p8r1UNjIGk9yv3H2Ms,
    .kpRBcW {
      background: var(--hovercolor) !important;
      background-color: var(--hovercolor) !important;
      border-radius: 11px !important;
    }

    span.Type__TypeElement-sc-goli3j-0.bGROfl.lgo_zhUnwxG2Qan4WLBY {
      padding: 2px !important;
    }

    ._MBf1tVqzfo2AefcuHwv {
      width: 1200px !important;
    }

    span.sQnWbTOGnPZBNn3lZTtI {
      margin-top: -7px !important;
    }

    /* nav bar - heart icon for liked songs */
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE.dNphEfQzPRaQufS04jUm
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-overflow.os-host-overflow-y.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition
      > div.os-padding
      > div
      > div
      > div
      > div
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div
      > img,
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-overflow.os-host-overflow-y.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition
      > div.os-padding
      > div
      > div
      > div
      > div:nth-child(2)
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div
      > img,
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-overflow.os-host-overflow-y.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition
      > div.os-padding
      > div
      > div
      > div
      > div
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div
      > img,
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE.dNphEfQzPRaQufS04jUm
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition.os-host-scrollbar-vertical-hidden
      > div.os-padding
      > div
      > div
      > div
      > div
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div
      > img,
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition.os-host-scrollbar-vertical-hidden
      > div.os-padding
      > div
      > div
      > div
      > div:nth-child(2)
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div
      > img,
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition.os-host-scrollbar-vertical-hidden
      > div.os-padding
      > div
      > div
      > div
      > div
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div
      > img,
    div.os-padding
      > div
      > div
      > div.main-view-container__scroll-node-child
      > main
      > section
      > div
      > div:nth-child(3)
      > div
      > div
      > div:nth-child(2)
      > div
      > div
      > div
      > div
      > img,
    div.os-padding
      > div
      > div
      > div.main-view-container__scroll-node-child
      > main
      > section
      > div:nth-child(4)
      > div
      > div
      > div:nth-child(2)
      > div
      > div
      > div
      > div
      > img,
    div.os-padding
      > div
      > div
      > div.main-view-container__scroll-node-child
      > main
      > section
      > div
      > div
      > div.contentSpacing
      > div:nth-child(1)
      > div
      > div
      > div
      > div
      > div:nth-child(2)
      > div
      > div
      > div
      > div
      > img,
    div.os-padding
      > div
      > div
      > div
      > main
      > div
      > section
      > div:nth-child(2)
      > div.contentSpacing
      > div
      > div:nth-child(2)
      > div:nth-child(2)
      > div
      > div
      > div:nth-child(1)
      > div
      > img,
    div.os-padding
      > div
      > div
      > div.main-view-container__scroll-node-child
      > main
      > section
      > div
      > div:nth-child(3)
      > div
      > div:nth-child(2)
      > div
      > div
      > div:nth-child(1)
      > div
      > img,
    .h4HgbO_Uu1JYg5UGANeQ.iSbqnFdjb1SuyJ3uWydl .VpYFchIiPg3tPhBGyynT > span,
    .odcjv30UQnjaTv4sylc0,
    .VqUjiYOlfxlk_lFOusZ7,
    [data-testid="root"]
      [aria-label="Top\ bar\ and\ user\ menu"]
      span:has(.ellipsis-one-line),
    [role="row"]
      [data-testid="tracklist-row"]
      [aria-colindex="\x31 "]
      [data-encore-id="type"]::hover,
    .contentSpacing
      [data-testid="playlist-tracklist"]
      [aria-rowindex="\x34 "]
      [data-testid="tracklist-row"]::hover,
    [role="row"]
      [data-testid="tracklist-row"]
      [aria-colindex="\x31 "]
      [data-encore-id="type"]::hover,
    [role="row"]
      [data-testid="tracklist-row"]
      [aria-colindex="\x31 "]
      [data-encore-id="type"]::before,
    [role="row"]
      [data-testid="tracklist-row"]
      [aria-colindex="\x31 "]
      [data-encore-id="type"]::after,
    ._5814e6eb4f933d11bfa18c01b92eff76-scss,
    .WBTm60_TPRG_oYwBuS7_,
    .eFyQzR,
    link-subtle ATUzFKub89lzvkmvhpyE,
    a.link-subtle.ATUzFKub89zvkmvhpyE,
    .os-content
      .main-view-container__scroll-node-child
      .main-view-container__mh-footer-container
      [data-testid="footer-div"] {
      display: none !important;
    }

    /* test */
    main[hide-ads~="premium"] {
      display: none !important;
    }

    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE.dNphEfQzPRaQufS04jUm
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-overflow.os-host-overflow-y.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition
      > div.os-padding
      > div
      > div
      > div
      > div
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div,
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-overflow.os-host-overflow-y.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition
      > div.os-padding
      > div
      > div
      > div
      > div:nth-child(2)
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div,
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-overflow.os-host-overflow-y.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition
      > div.os-padding
      > div
      > div
      > div
      > div
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div,
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE.dNphEfQzPRaQufS04jUm
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition.os-host-scrollbar-vertical-hidden
      > div.os-padding
      > div
      > div
      > div
      > div
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div,
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition.os-host-scrollbar-vertical-hidden
      > div.os-padding
      > div
      > div
      > div
      > div:nth-child(2)
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div,
    #main
      > div.Root.encore-dark-theme
      > div.ZQftYELq0aOsg6tPbVbV
      > div.BdcvqBAid96FaHAmPYw_
      > nav
      > div.EZFyDnuQnx5hw78phLqP.hjb8tUL3rpUa0ez4ZtAj
      > div.PpUTJL2NIYDUnmfzVIbE
      > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden._K79lE9KrIAkl_bUSSUM.os-host-transition.os-host-scrollbar-vertical-hidden
      > div.os-padding
      > div
      > div
      > div
      > div
      > ul
      > div
      > div:nth-child(2)
      > li.ufICQKJq0XJE5iiIsZfj.caTDfb6Oj7a5_8jBLUSo.vOp2HlcPkxOHebo3If32.VNdHKKznHkpJ0VHoDmai.eZnAGhYcXE4Bt0a7958z.ratGUXdpLCkyXZNaJryg.cuH8l_VHkTiz_NYVslQe.qEiVyQ28VnOKb0LeijqL
      > div
      > div
      > div.Areas__HeaderSideArea-sc-8gfrea-1.ljvfQS
      > div
      > div {
      background: var(--hoverback) !important;
      content: url("https://user-images.githubusercontent.com/103985728/244695129-ea96ab3d-1092-4584-bdd5-afcb8625d121.png") !important;
    }

    /*- nav bar icon padding -*/
    .ojrThQm1wxR2gZ6GntJB.Ks_qLLEMUQzP7ejeQCwQ {
      padding: 3px !important;
      /* 5px 1px 7px */
    }

    .ojrThQm1wxR2gZ6GntJB.Ks_qLLEMUQzP7ejeQCwQ:hover {
      background-color: var(--hoverback) !important;
      background: var(--hoverback) !important;
    }

    .ojrThQm1wxR2gZ6GntJB.Ks_qLLEMUQzP7ejeQCwQ:hover::after {
      background-color: var(--hovercolor) !important;
      background: var(--hovercolor) !important;
    }

    .C3pBU1DsOUJJOAv89ZFT {
      margin-top: 100px !important;
    }

    .Z35BWOA10YGn5uc9YgAp .zXwER4Lsqq_e7fVVaPkZ {
      background-color: transparent !important;
    }

    /*- Now Playing Bar (NPB) -*/
    .spotify__container--is-web #main .nav-ylx [data-testid="now-playing-bar"],
    .JG5J9NWJkaUO9fiKECMA {
      border-left: 120px dotted rgba(0, 0, 0, 0.01) !important;
      /* That weird left nav incon~ */
      border-radius: 70px !important;
      height: 83px !important;
      padding-right: 10px !important;
      min-height: -webkit-fill-available !important;
      width: -webkit-fill-available !important;
    }

    /*- album hovering on the nav bar - FIX -*/
    .RowButton-sc-xxkq4e-0.hIehTT:hover,
    .gLSzhA:hover::after,
    .RowButton-sc-xxkq4e-0.hIehTT:hover::after,
    .RowButton-sc-xxkq4e-0.hIehTT:hover::before,
    .fJGlei:hover::after {
      background: var(--hovercolor) !important;
      background-color: var(--hovecolor) !important;
      border-radius: 16px !important;
    }

    /*- Follow artist -*/
    [dir="ltr"] .eSg4ntPU2KQLfpLGXAww > :not(:last-child) {
      margin-right: 37px !important;
      border-radius: 30px !important;
    }

    /* when clicking on an artist's button it brings an expanded view out, this is that -- hopefully */
    .GenericModal__overlay.GenericModal__overlay--animated.GenericModal__overlay--afterOpen {
      background-color: var(--hoverback) !important;
      background: var(--hoverback) !important;
    }

    /* Playlist nav bar icons for folders */
    .vreceNX3ABcxyddeS83B div,
    .vreceNX3ABcxyddeS83B,
    .g4PZpjkqEh5g7xDpCr2K *,
    .g4PZpjkqEh5g7xDpCr2K:hover,
    .doNNoL:hover,
    .DHzyoCWhWjunaSpGo3fm,
    .DHzyoCWhWjunaSpGo3fm:hover,
    .vreceNX3ABcxyddeS83B.nZSNG58XEPTX69mkNi9n.g3kBhX1E4EYEC2NFhhxG {
      background: transparent !important;
    }

    #main > div.Root.encore-dark-theme > div > nav > div,
    .Root__main-view,
    #main > div.Root.encore-dark-theme > div > div:nth-child(2),
    #main
      > div.Root.encore-dark-theme
      > div
      > div:nth-child(1)
      > header
      > div:nth-child(1),
    #main
      > div.Root.encore-dark-theme
      > div
      > div:nth-child(1)
      > header
      > div:nth-child(1)
      > div,
    div.os-padding
      > div
      > div
      > div.main-view-container__scroll-node-child
      > div
      > div,
    .ZQftYELq0aOsg6tPbVbV,
    .jEMA2gVoLgPQqAFrPhFw,
    .PHgyArRLVFknlaOm31ID,
    ._8b45c1ef6e792bfe1014b26c48673e5a-scss,
    .i0XB7255K_4QFLJsSGc_,
    .cASFVN,
    ._mSbAWxlXgc2ONtpnuXQ:before,
    ._mSbAWxlXgc2ONtpnuXQ:after,
    #main
      > div.Root.encore-dark-theme
      > div
      > div.Root__now-playing-bar
      > footer
      > div
      > div
      > div
      > div
      > div
      > div:before,
    #main
      > div.Root.encore-dark-theme
      > div
      > div.Root__now-playing-bar
      > footer
      > div
      > div
      > div
      > div
      > div
      > div:after,
    .nav-ylx .jEMA2gVoLgPQqAFrPhFw,
    .t1hN4Ju87afc5N5fDTnm,
    #main > div.Root.encore-dark-theme.nav-ylx > div > nav > div,
    .Root__main-view,
    .Root__left-sidebar,
    #main
      > div.Root.encore-dark-theme.nav-ylx
      > div
      > div:nth-child(1)
      > header
      > div:nth-child(1),
    #main
      > div.Root.encore-dark-theme.nav-ylx
      > div
      > div:nth-child(1)
      > header
      > div:nth-child(1)
      > div,
    .Root__left-sidebar.hasYLXSidebar,
    .BdcvqBAid96FaHAmPYw_,
    ._7b6273541d969069bb18c4fcae4120e7-scss,
    .e2JzVB2WkGm7GMT8rkEg,
    .kYBlAcRblnjQ6kKW4JCy,
    #main > div.Root.encore-dark-theme > div > nav > div > div > div > div > div,
    div.os-padding
      > div
      > div
      > div.main-view-container__scroll-node-child
      > main
      > div
      > nav {
      background: none !important;
    }

    /* Quick search (cmd + K) */
    div#search-modal-listbox,
    .zi377dMLSwXnFiejYnRa.aIWRvSjvEN4rTMCIi4vG,
    .wIyyGaSPOHR78wksX3Us,
    .zi377dMLSwXnFiejYnRa,
    ._p8ywioveAdTZ8yZmPfr,
    .sFFh5DkVxeEcgBGFOvUE {
      background: var(--hovercolor) !important;
      background-color: var(--hovercolor) !important;
    }

    ._p8ywioveAdTZ8yZmPfr,
    .kUkjSLUuPyag37OAbVPH.sKrYQkHlFOyAc0bM142q,
    .kUkjSLUuPyag37OAbVPH:hover,
    .kUkjSLUuPyag37OAbVPH.sKrYQkHlFOyAc0bM142q:hover {
      border-top-right-radius: 20px !important;
      border-top-left-radius: 20px !important;
      border-bottom-left-radius: 20px !important;
      border-bottom-right-radius: 20px !important;
    }

    /*- Search -*/
    .QO9loc33XC50mMRUCIvf {
      background: var(--hovercolor) !important;
      background-color: var(--hovercolor) !important;
      color: white !important;
    }

    /* Nav bar being sent to the top -- fix -- allows for better spacing */
    [data-testid="root"]
      [data-testid="now-playing-bar"]
      :first-child:has([data-testid="player-controls"]) {
      margin-top: 10px !important;
    }

    /* Nav bar :hover */
    .TxO7Ee8iwqBpkgznKHsd:hover,
    .TxO7Ee8iwqBpkgznKHsd:active {
      background-color: var(--hoverback) !important;
      color: var(--icons) !important;
    }

    /* Change the color of the song title in the bottom left */
    /* Song name */
    div[data-testid="context-item-info-title"] span a {
      color: white;
    }

    /* hovering on songs */
    [data-testid="track-list"]
      [role="presentation"]
      [role="presentation"]:has([data-testid="add-button"]) {
      border-radius: var(--main-border-radius) !important;
    }

    /* Change the background color of the playlist cover cards */
    .LunqxlFIupJw_Dkx6mNx {
      background-color: var(--hovercolor) !important;
    }

    /* Changes within a playlist */

    /* Play/pause/info bar */
    div.contentSpacing {
      background-color: transparent !important;
    }

    /* Number, title, album, date added, timings */
    .dZPmmYYhskhqHJCAruvI.wTUruPetkKdWAR1dd6w4 div {
      color: var(--icons) !important;
    }

    .T1xI1RTSFU7Wu94UuvE6 {
      background-color: transparent !important;
    }

    header.facDIsOQo9q7kiWc4jSg {
      margin-top: -46px !important;
      border-radius: 40px !important;
    }

    /* Footer Bar when listening on other devices */
    .Type__TypeElement-sc-goli3j-0.bNyYSN.gQoa8JTSpjSmYyABcag2.encore-bright-accent-set.T3hkVxXuSbCYOD2GIeQd {
      background-color: transparent !important;
      color: white !important;
    }

    .WFRr38dFOxh75JyzSTj5.encore-bright-accent-set.IbmaxRtjqCjqTBpFwCgw {
      border-color: grey !important;
    }

    /*- Play/Pause Icon -*/
    [data-testid="play-button"] > :first-child {
      background-color: transparent !important;
    }

    /* Numbering on the numbers for # - more so spacing */
    [role="row"]
      [data-testid="tracklist-row"]
      [aria-colindex="\x31 "]
      [data-encore-id="type"] {
      margin-top: -5px !important;
    }
    .contentSpacing.NXiYChVp4Oydfxd7rT5r.RMDSGDMFrx8eXHpFphqG {
      margin-top: -120px !important;
    }

    /* top padding -- where home etc stuff is */
    .jEMA2gVoLgPQqAFrPhFw {
      padding-top: 50px !important;
    }

    /* Now playing view */
    .AzO2ondhaHJntbGy_3_S,
    button.hd6a3g_3QyF8MFL0wWs1 {
      background: transparent !important;
      border-radius: 30px !important;
    }

    .PeNI572tTpqsN23o3QhJ {
      background: var(--hovercolor) !important;
      border-radius: 20px !important;
    }

    /* Border for keys */
    [tabindex="\x30"] kbd {
      border: 2px solid var(--bg-color) !important;
      background-color: rgba(0, 0, 0, 0.2);
    }

    /* right click menu */
    [role="menu"] [role="presentation"] :first-child:has(.ellipsis-one-line) {
      background: var(--hoverback) !important;
      border-radius: var(--main-border-radius) !important;
    }
    /* NOTE */
    /*
      */

    .SboKmDrCTZng7t4EgNoM,
    div#trippy-7,
    .SboKmDrCTZng7t4EgNoM,
    div#trippy-7,
    .SboKmDrCTZng7t4EgNoM {
      background: var(--hovercolor) !important;
      transition-duration: 0.2s !important;
      transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1) !important;
    }

    .ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi[aria-colcount="5"]
      .wTUruPetkKdWAR1dd6w4 {
      display: grid !important;
    }

    /* Nav Bar (NB) */
    .no-focus-outline #main .nav-ylx [aria-label="Main"],
    .sqKERfoKl4KwrtHqcKOd {
      border-radius: 45px !important;
      min-height: -webkit-fill-available !important;
      height: -webkit-fill-available !important;
      width: -webkit-fill-available !important;
    }

    /* nav bar bottom scroll padding */
    ._K79lE9KrIAkl_bUSSUM {
      height: 945px !important;
      border-radius: 50px !important;
    }

    .os-viewport,
    .os-theme-spotify .os-viewport,
    .os-host-overflow > .os-padding,
    .os-viewport {
      padding: 6px !important;
    }

    .ifVI2CEdOZGgMWIUN2Cw.kJ_Q4aphh_uCJCZdzPpD:not(.dNphEfQzPRaQufS04jUm) {
      padding-bottom: calc(var(--nav-bar-width) - 20px) !important;
    }

    .H0HbpIM3UrcupWIAjLWu {
      background-color: transparent !important;
    }

    /* streaming to which device bar -- pushed into the nav bar -- the footer bar when streaming to a device */
    .gQoa8JTSpjSmYyABcag2.T3hkVxXuSbCYOD2GIeQd {
      padding-right: 30px !important;
      padding-top: 1px !important;
      margin: -10px !important;
      -webkit-box-orient: horizontal !important;
      -webkit-box-direction: normal !important;
      -webkit-box-pack: end !important;
      -ms-flex-pack: end !important;
      -webkit-box-align: center !important;
      -ms-flex-align: center !important;
      --text-end-padding: 73.5px !important;
      display: inline-flex !important;
      -ms-flex-direction: row !important;
      flex-direction: row !important;
      height: -1px !important;
      justify-content: flex-end !important;
      padding-bottom: 36px !important;
      position: relative !important;
      align-items: center !important;
      align-content: center !important;
      flex-wrap: nowrap !important;
    }

    /* Top info / playlist / liked songs / creator / amount / time */
    .main-view-container__scroll-node-child [data-testid="playlist-page"] {
      margin-top: 0px !important;
    }

    /* Song thingos use full width available */
    .contentSpacing {
      max-width: -webkit-fill-available !important;
    }

    /* Streaming to device */
    #context-menu
      [aria-labelledby="device-picker-icon-button"]:has(
        #device-picker-header [data-testid="animated-now-playing"]
      ) {
      background-image: var(--str-bg) !important;
      background: var(--str-color);
      background-size: cover !important;
      background-attachment: fixed !important;
      background-repeat: no-repeat !important;
      border-radius: 35px !important;
    }

    [aria-expanded="false"]
      [data-tippy-root=""]
      #context-menu
      [data-popper-arrow=""],
    .NY718ElwUbdZDytyiOBX * {
      background: red !important;
    }

    /*- Watermark -*/
    .main-view-container__scroll-node
      .os-content
      .main-view-container__scroll-node-child
      [data-testid="settings-page"]::after {
      content: "CSS/JS made by Kami. Specifically made for SpotOn (https://github.com/senpaihunters/spoton), any distrubtion is prohibited, unless contacted and allowed otherwise.";
      cursor: auto;
    }

    .hwP4Oum2PB765sb8jigI,
    .HVCCFeUiHVwZVv74p34a,
    .zi377dMLSwXnFiejYnRa {
      border-radius: 0px !important;
      margin: 0 0px #000 !important;
      padding: 0 0px #000 !important;
    }

    .DG9CsoFIptJhAneKoo_F {
      margin-top: -105px;
      margin-bottom: 26px;
    }

    .ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi[aria-colcount="5"]
      .wTUruPetkKdWAR1dd6w4 {
      border-radius: 32px !important;
    }

    a.btn.btn-fg-green {
      padding-top: 2em !important;
      padding-bottom: 2em !important;
    }

    .btn.btn-fg-green {
      padding-top: 2em !important;
      padding-bottom: 2em !important;
    }

    .middle-align.progress-bar__slider {
      transform: scale(0.7) !important;
      border: 0px solid rgb(0, 0, 0, 1) !important;
      background: radial-gradient(
        at left top,
        rgba(255, 255, 255, 1),
        var(--playCol),
        rgba(0, 0, 0, 1)
      ) !important;
    }

    .volume-bar .middle-align.progress-bar__slider {
      border: 0px solid rgb(30, 30, 30) !important;
    }

    .now-playing-bar__right__inner {
      padding-right: 6px !important;
    }

    .accountPage .icon,
    .downloadPage-inner {
      margin-top: 50px;
    }

    .tUwyjggD2n5KvEtP5z1B {
      cursor: auto;

      min-height: -webkit-fill-available !important;
      height: -webkit-fill-available !important;
      width: -webkit-fill-available !important;
      padding-top: 20px !important;
    }

    .fhrvNw,
    .rEN7ncpaUeSGL9z0NGQR,
    Fb61sprjhh75aOITDnsJ {
      font-size: 3rem !important;
      display: table-column !important;
      text-align: -webkit-match-parent !important;
      font-family: auto !important;
      margin-top: 0px !important;
      width: -webkit-fill-available !important;
    }

    @supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
      :root,
      #main,
      .Root {
        background-image: var(--backimg);
        display: block;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-size: cover;
        transition-duration: 0.7s;
        background-position: center;
        background-color: #282828;
      }

      .backgroundDIV {
        display: none;
      }

      ._7d5bb5bfd500c0c322fb865b69181717-scss,
      ._34098cfd13d48e2910679f35aea2c377-scss,
      ._26d9e31a05dd5fba3afe1b281ae2cf9e-scss,
      .d59cf4c9f065f7dc76a93e2823013414-scss,
      ._48e360f8825a4f1e777dae4da035dc61-scss
        ._2ad467a52f00fff4e36adb25e591bf7c-scss,
      ._60cb742e518d084c3c959007b9463b51-scss,
      .react-contextmenu,
      .SearchInputBox,
      .sessionInfo {
        -webkit-backdrop-filter: blur(var(--blur));
        backdrop-filter: blur(var(--blur));
      }

      .backgroundDIV {
        background-image: var(--backimg);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-size: cover;
        transition-duration: 0.7s;
        background-position: center;
        background-color: #282828;
        filter: blur(10px);
        /*blur - 50px original*/
        width: 100vw;
        height: 100vh;
        position: absolute;
      }

      #main > div.Root.encore-dark-theme > div,
      #context-menu > ul,
      #context-menu > div > ul {
        backdrop-filter: blur(30px);
      }

      /*same as above*/

      #context-menu > ul,
      #context-menu > div > ul {
        overflow: visible;
      }

      #main > div.Root.encore-dark-theme > div,
      .nav-alt #main > div.Root.encore-dark-theme > div,
      */ .nav-alt .QO9loc33XC50mMRUCIvf,
      .J6VTd7VdGN2PM_oXCAyH,
      #context-menu > ul,
      #context-menu > div > ul {
        background-color: var(--overlay-heavy);
      }

      .Root__nav-bar,
      .nav-alt .Root__main-view,
      .nav-alt .Root__nav-bar,
      .Root__fixed-top-bar {
        background: transparent;
      }

      .nav-alt #main > div.Root.encore-dark-theme > div {
        padding: 0px;
      }

      .Root__fixed-top-bar {
        padding-top: 10px;
        padding-left: 120px;
      }

      .H0HbpIM3UrcupWIAjLWu {
        bacground-color: transparent !important;
      }

      /* Bottom padding */
      .os-viewport,
      .os-theme-spotify .os-viewport,
      .os-host-overflow > .os-padding,
      .os-viewport {
        padding: 8px !important;
      }

      button.RowButton-sc-xxkq4e-0.iQutdu:hover {
        -webkit-tap-highlight-color: rgba(105, 88, 88, 0) !important;
      }

      #main > div.Root.encore-dark-theme.nav-ylx > div:nth-child(2) {
        padding: 0 !important;
      }

      .active * {
        background: transparent !important;
      }

      .Root__now-playing-bar {
        padding: 8px !important;
      }

      .EZFyDnuQnx5hw78phLqP {
        padding-bottom: 0px !important;
      }

      #main > div.Root.encore-dark-theme.nav-ylx > div:nth-child(2) {
        padding: 0;
        padding-top: 7px;
        background-color: var(--overlay-heavy);
      }

      .y2UicQnlTq148rL8Y0jp {
        box-shadow: -1px 8px 5px -5px black !important;
      }

      #main
        > div.Root.encore-dark-theme.nav-alt
        > div
        > div.Root__fixed-top-bar
        > div:nth-child(2)
        > a:hover {
        filter: brightness(1.5);
        background: none;
      }

      #main
        > div.Root.encore-dark-theme.nav-alt
        > div
        > div.Root__fixed-top-bar
        > div:nth-child(1) {
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: end;
      }

      #main
        > div.Root.encore-dark-theme.nav-alt
        > div
        > div.Root__fixed-top-bar
        > div:nth-child(2)
        > a {
        position: absolute;
        left: 34px;
        top: 24px;
        width: 150px;
        background-color: transparent;
        justify-content: flex-start;
      }

      #main
        > div.Root.encore-dark-theme.nav-alt
        > div
        > div.Root__fixed-top-bar
        > div:nth-child(2)
        > a:after {
        margin-top: 12px;
        margin-left: 39px;
        content: "Home";
        position: absolute;
        color: rgb(215 214 215);
        top: 0;
        left: 0;
        z-index: -1;
      }

      .link-subtle {
        color: #ffffffe0;
      }

      .GKnnhbExo0U9l7Jz2rdc:active,
      .GKnnhbExo0U9l7Jz2rdc:focus,
      .GKnnhbExo0U9l7Jz2rdc:hover,
      .moDRd9td0KtitPDzR7OJ,
      .moDRd9td0KtitPDzR7OJ:focus,
      .moDRd9td0KtitPDzR7OJ:hover {
        color: #fff;
      }

      .ec1b5762556429ac3aeedbae72433491-scss {
        color: #ffffffe0 !important;
      }

      div.os-padding > div > div > ul > div > div:nth-child(2) > div {
        border-radius: 5px;
      }

      #context-menu > ul,
      #context-menu > div > ul,
      ._K79lE9KrIAkl_bUSSUM,
      .PpUTJL2NIYDUnmfzVIbE,
      .EZFyDnuQnx5hw78phLqP,
      .XTk61Y8OkBdUT6Wj4F6i.VfDGbMWaJe9rcefizTNk,
      .WIPpgUp9J37Dwd0ZJnv0 .Root__main-view,
      .B0VIs50K6LXh5MDmmmJs,
      .B0VIs50K6LXh5MDmmmJs:hover,
      .odcjv30UQnjaTv4sylc0,
      .Ws8Ec3GREpT5PAUesr9b,
      .DuEPSADpSwCcO880xjUG,
      .wC9sIed7pfp47wZbmU6m,
      .KDlcc1SFTcA90eMUcn5P,
      .tsv7E_RBBw6v0XTQlcRo,
      .zi377dMLSwXnFiejYnRa,
      .aIWRvSjvEN4rTMCIi4vG,
      .G8UNZJv4HT1kOIolA_e7,
      .encore-light-theme,
      .encore-light-theme,
      .encore-base-set,
      .MQQEonum615k8mGkliT_,
      .CU0wnmWejIvyEsRRtSac,
      .R2w_sH83CJU9Yhnu0xyt,
      .PiyAiXdQULEnWAHP0tu1,
      .odcjv30UQnjaTv4sylco:focus,
      odcjv30UQnjaTv4sylcO:hover,
      [dir="ltr"] .JdlKTdpMquftpMwwegZo,
      .odciv30UOniaTv4svlc0_[data-context-menu-open="true"],
      .zrvvPyoxE6wQNqnu0yWA,
      .hwP4Oum2PB765sb8jigI,
      div.Root__now-playing-bar > footer > div:nth-child(2) *,
      .ejNsts52hRq0uZcc_NXi,
      .uhDzVbFHyCQDH6WrWZaC,
      .AJqEY1gblQDvIgjU0jAH,
      .react-contextmenu-wrapper,
      .I3EivnXTjYMpSbPUiYEg,
      .g6ZgzRfiHjsTLskeyI0J:focus,
      .g6ZgzRfiHjsTLskeyI0J:hover,
      .g6ZgzRfiHjsTLskeyI0J,
      [dir="ltr"] .g6ZgzRfiHjsTLskeyI0J,
      .fLS8v3_EfBadEerbGVoR,
      .LunqxlFIupJw_Dkx6mNx,
      html.spotify__container--is-web body,
      .qJOhHoRcFhHJpEQ2CwFT.koyeY6AgGRPmyPITi7yO,
      .uV8q95GGAb2VDtL3gpYa,
      .aCtCKL9BxAoHeVZS0uRs,
      .pHrwZOFBdT8FNXnmcPPI,
      .UmY163JiUcgJt2MKNyGW.SVnAziPF2z_cgAGrp6He,
      .hcuLp8V4uEEfWZ4k6aLV,
      .QavgDs_52SpJ2rw0LNYz:before,
      #myconfigwin39457845,
      #myconfigwin39457845 div,
      #myconfigwin39457845 div,
      #myconfigwin39457845 button,
      .B0VIs50K6LXh5MDmmmJs,
      .VgSbatGBB9XwTH2_dsxg .ql0zZd7giPXSnPg75NR0:disabled,
      .VgSbatGBB9XwTH2_dsxg .ql0zZd7giPXSnPg75NR0,
      .Root__buddy-feed,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section
        > div:nth-child(2)
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div:nth-child(3)
        > section
        > div:nth-child(2)
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > section
        > div:nth-child(5)
        > section
        > div:nth-child(2)
        > div,
      #searchPage > div > div > section > div:nth-child(2) > div,
      #searchPage > div > div > section:nth-child(1) > div:nth-child(2) > div > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div.Ft1cMGlqDsCbqmXQyeKN
        > div.AJqEY1gblQDvIgjU0jAH.contentSpacing.zlBEnsMyvUhuHSEtst4Q
        > section
        > div:nth-child(2)
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div:nth-child(5)
        > section
        > div:nth-child(2)
        > div,
      #searchPage > div > div > section:nth-child(3) > div:nth-child(2) > div,
      #searchPage > div > section > div:nth-child(2) > div > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div:nth-child(3)
        > section:nth-child(2)
        > div:nth-child(3)
        > div,
      div.os-padding
        > div
        > div
        > div
        > main
        > section
        > div:nth-child(2)
        > div
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > section:nth-child(n + 4)
        > div:nth-child(2)
        > div,
      .oaNVBli46GtVjaQKB15g {
        background: rgba(105, 88, 88, 0) !important;
      }

      /*Inside popup menu*/

      .B0VIs50K6LXh5MDmmmJs:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div:nth-child(3)
        > div
        > div
        > div:nth-child(2)
        > div
        > div:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section
        > div:nth-child(2)
        > div:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div:nth-child(3)
        > section
        > div:nth-child(2)
        > div:hover,
      #searchPage > div > div > section > div:nth-child(2) > div:hover,
      #searchPage > div > section > div:nth-child(2) > div > div:hover,
      #main
        > div.Root.encore-dark-theme
        > div
        > div.Root__main-view
        > main
        > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y
        > div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > section
        > div:nth-child(5)
        > section
        > div:nth-child(2)
        > div:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div.Ft1cMGlqDsCbqmXQyeKN
        > div.AJqEY1gblQDvIgjU0jAH.contentSpacing.zlBEnsMyvUhuHSEtst4Q
        > section
        > div:nth-child(2)
        > div:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div:nth-child(5)
        > section
        > div:nth-child(2)
        > div:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div:nth-child(3)
        > section:nth-child(2)
        > div:nth-child(3)
        > div:hover,
      div.os-padding
        > div
        > div
        > div
        > main
        > section
        > div:nth-child(2)
        > div
        > div:hover,
      div.os-padding > div > div > ul > div > div:nth-child(2) > div:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > section:nth-child(n + 4)
        > div:nth-child(2)
        > div:hover,
      #main
        > div.Root.encore-dark-theme
        > div
        > div.Root__top-bar
        > header
        > div:nth-child(3)
        > div
        > nav
        > ul
        > li:hover
        > a,
      .eRuZMo_HNLjb1IalIeRb {
        background: var(--hovercolor) !important;
      }

      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section
        > div:nth-child(2)
        > div {
        overflow: visible;
      }

      ._7ae3a7b5ef70bce1740ff486c4467d56-scss,
      .main-home-homeHeader,
      .euOnte9wvOF0D_SGxEZ9,
      .fynR25MOeILQ7mCZ8247,
      ._ZhbiHuTGHCAQ_asJSw9,
      div.os-padding > div > div > div.main-view-container__scroll-node-child > div,
      #searchPage > div > div > section:nth-child(2) > div:nth-child(2) > div,
      div.os-padding > div > div > div > main > div,
      div.os-padding > div > div > div > main > div > div {
        background-color: transparent !important;
        background-image: none !important;
        transition-duration: 0s;
      }

      .main-card-card:hover main-card-imageContainer,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section
        > div
        > div
        > div
        > div:nth-child(1),
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div:nth-child(3)
        > section
        > div
        > div
        > div
        > div:nth-child(1),
      #searchPage > div > div > section > div > div > div > div > div:nth-child(1),
      #searchPage
        > div
        > section
        > div:nth-child(2)
        > div
        > div
        > div
        > div:nth-child(1)
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div
        > section
        > div:nth-child(2)
        > div
        > div
        > div:nth-child(1),
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div:nth-child(5)
        > section
        > div:nth-child(2)
        > div
        > div
        > div:nth-child(1),
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div:nth-child(2)
        > div
        > div:nth-child(2)
        > div
        > div:nth-child(n + 2)
        > div
        > div
        > div:nth-child(1),
      div.os-padding
        > div
        > div
        > div
        > main
        > section
        > div:nth-child(2)
        > div
        > div
        > div
        > div
        > div:nth-child(1)
        div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section:nth-child(1)
        > div
        > div
        > div
        > div:nth-child(1)
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section
        > div
        > div
        > div
        > div:nth-child(1)
        > div,
      #main
        > div.Root.encore-dark-theme
        > div
        > nav
        > div
        > ul
        > li:nth-child(3)
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > section:nth-child(n + 4)
        > div:nth-child(2)
        > div
        > div
        > div:nth-child(1)
        > div {
        transition-duration: 0.2s;
      }

      .OALAQFKvC7XQOVYpklB4:hover .JI_jg7MaIJ2TCTmebcdd,
      .main-card-card:hover main-card-imageContainer,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section
        > div
        > div:hover
        > div
        > div:nth-child(1)
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div:nth-child(3)
        > section
        > div
        > div:hover
        > div
        > div:nth-child(1)
        > div,
      #searchPage
        > div
        > div
        > section
        > div
        > div
        > div:hover
        > div
        > div:nth-child(1),
      #searchPage
        > div
        > section
        > div:nth-child(2)
        > div
        > div:hover
        > div
        > div:nth-child(1)
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div
        > section
        > div:nth-child(2)
        > div:hover
        > div
        > div:nth-child(1),
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div:nth-child(5)
        > section
        > div:nth-child(2)
        > div:hover
        > div
        > div:nth-child(1),
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div:nth-child(2)
        > div
        > div:nth-child(2)
        > div
        > div:nth-child(n + 2):hover
        > div
        > div
        > div:nth-child(1),
      div.os-padding
        > div
        > div
        > div
        > main
        > section
        > div:nth-child(2)
        > div
        > div:nth-child(n + 2):hover
        > div
        > div
        > div:nth-child(1),
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > section:nth-child(n + 4)
        > div:nth-child(2)
        > div:hover
        > div
        > div:nth-child(1)
        > div {
        transform: scale(1.05);
        transition-duration: 0.2s;
        transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
      }

      main-card-imageContainer,
      .OALAQFKvC7XQOVYpklB4 .JI_jg7MaIJ2TCTmebcdd {
        transition-duration: 0.4s;
        transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
      }

      .KL469QQzoRZLOmKomNzk:hover .B3i7kN8tRTwP9s4XEK10,
      view-homeShortcutsGrid-shortcut:hover view-homeShortcutsGrid-imageContainer,
      .B0VIs50K6LXh5MDmmmJs:hover .icV9eS36uZs9fhQmUujh,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section:nth-child(1)
        > div
        > div:hover
        > div
        > div:nth-child(1)
        > div {
        transform: scale(1.1) translateX(3px) !important;
      }

      .KL469QQzoRZLOmKomNzk .B3i7kN8tRTwP9s4XEK10,
      view-homeShortcutsGrid-shortcut view-homeShortcutsGrid-imageContainer,
      .icV9eS36uZs9fhQmUujh {
        transition-duration: 0.2s !important;
        transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1) !important;
      }

      ._560fb0a89f4ec24665eb945cfe2c97b0-scss,
      .view-homeShortcutsGrid-grid,
      .Vg_wqJ9OwkZl65Rc_iyX,
      ._dlL34LrG9vg8mcBFaUw,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section:nth-child(1)
        > div {
        padding-top: 5px;
        padding-bottom: 5px;
        padding-right: 10px;
        padding-left: 5px;
      }

      .KL469QQzoRZLOmKomNzk,
      .msOGVcFLw_5wwMOLzhye,
      view-homeShortcutsGrid-shortcut view-homeShortcutsGrid-imageWrapper,
      .icV9eS36uZs9fhQmUujh,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section:nth-child(1)
        > div
        > div
        > div
        > div:nth-child(1)
        > div {
        box-shadow: 5px 0px 13px rgb(0 0 0 / 50%) !important;
        transition-duration: 0.2s !important;
        transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1) !important;
      }

      .KL469QQzoRZLOmKomNzk:hover ._Xtjqr3it7fr5yseBgKp,
      .B0VIs50K6LXh5MDmmmJs:hover .GG4lScbAogw4Q_mXWbn9,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section:nth-child(1)
        > div
        > div:hover
        > div
        > div:nth-child(2)
        > div:nth-child(1) {
        transform: translateX(5px) !important;
      }

      .KL469QQzoRZLOmKomNzk ._Xtjqr3it7fr5yseBgKp,
      .GG4lScbAogw4Q_mXWbn9,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > section:nth-child(1)
        > div
        > div
        > div
        > div:nth-child(2)
        > div:nth-child(1) {
        transition-duration: 0.2s !important;
        transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1) !important;
      }

      ._6f1bb16d690aec58cb10e82de1ac2410-scss,
      ._9764a8966c108117bdf6f47cb601747a-scss,
      ._59ed5f1313c7c4b211995d2b6463683f-scss,
      ._1066d722d4c5fe45076daa358de0a969-scss,
      ._7f29d1db930e7882d0ee6099f36e3bc7-scss,
      ._2411182f42f92a221e29c993de036981-scss,
      ._59ed5f1313c7c4b211995d2b6463683f-scss,
      .sbU_cIh6kQUanX3IUWD8,
      .ojLwFoBNBM6cW7_RpeAN,
      .iYoKwYJwszPZXYQCZQ4s,
      .DFOYAbsPwHbI_GsaV_ij,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div,
      #main
        > div.Root.encore-dark-theme
        > div
        > div.Root__top-bar
        > header
        > div.T1xI1RTSFU7Wu94UuvE6,
      #main
        > div.Root.encore-dark-theme
        > div
        > div.Root__top-bar
        > header
        > div.T1xI1RTSFU7Wu94UuvE6
        > div,
      div.os-padding > div > div > div > main > section > div > div > div {
        background-color: #0000 !important;
        background-image: none !important;
      }

      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div:nth-child(3)
        > section:nth-child(2)
        > div:nth-child(2)
        > div {
        background: rgba(0, 0, 0, 0) !important;
      }

      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div.contentSpacing
        > div:nth-child(4)
        > div
        > div
        > img {
        box-shadow: 5px 0px 13px rgb(0 0 0 / 50%) !important;
      }

      .c108b4ada40c10926b10bba3ff614fd0-scss,
      .wQi0raQMEJJrELuj_2FP,
      .YboT9C61kapUCdQnsEmR,
      div.under-main-view > div > div {
        height: 50vh;
        top: -66px;
        opacity: 0.8;
        background-position: center;
      }

      div.under-main-view > div > div:after {
        height: 50vh !important;
      }

      ._6f1bb16d690aec58cb10e82de1ac2410-scss,
      .c108b4ada40c10926b10bba3ff614fd0-scss,
      .wQi0raQMEJJrELuj_2FP,
      .YboT9C61kapUCdQnsEmR,
      div.under-main-view > div > div {
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1) 80%,
          rgba(0, 0, 0, 0)
        );
      }

      .Root__fixed-top-bar {
        z-index: 1;
      }

      .Root__main-view {
        overflow: visible;
        padding-top: 60px;
        margin-top: 10px;
      }

      .c108b4ada40c10926b10bba3ff614fd0-scss.e9db31e18f63ba40c72f3865edb41b5e-scss,
      .wQi0raQMEJJrELuj_2FP,
      .YboT9C61kapUCdQnsEmR,
      div.under-main-view > div > div {
        transform: scale(1) !important;
        box-shadow: inset 0px 7px 40px 0px #000000c2;
      }

      .main-view-container__scroll-node-child-spacer {
        height: 0px;
      }

      ._0e3c23126898d1fa3d5ae9b5fdf82362-scss {
        background-color: rgba(0, 0, 0, 0.5) !important;
      }

      .main-view-container__scroll-node-child {
        padding-top: 20px;
      }

      ._4c3b6e4e88112fc8ef88512cbe7521ed-scss.b922193db5f1fbddd0ac1467645b8194-scss {
        height: 41vh;
      }

      .f39dd6caa689537bffdfc875c3f33d08-scss {
        padding: 10px 32px !important;
      }

      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div
        > div:nth-child(1) {
        background-color: #0000 !important;
        top: auto !important;
        box-shadow: none !important;
      }

      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div:nth-child(1) {
        top: auto;
      }

      /* album art nav spacing */
      .PpUTJL2NIYDUnmfzVIbE.kJ_Q4aphh_uCJCZdzPpD.dNphEfQzPRaQufS04jUm {
        padding-bottom: 25px !important;
      }

      ._11b29b5a5f3bcae347f832a4278b28b8-scss,
      ._5d10f53f6ab203d3259e148b9f1c2278-scss,
      .eae5aabff7beab294ee900c0a1928b4c-scss,
      .XRD1P2qyA9MlnhSLnxwi,
      ._uWqv_e_qylO6QDAoZKL,
      ._AicLTqbkTBeib40qoQO,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div
        > div
        > div
        > img,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div
        > div
        > img,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div
        > img,
      div.os-padding
        > div
        > div
        > div
        > main
        > section
        > div
        > div.contentSpacing
        > div
        > div
        > img,
      div.os-padding
        > div
        > div
        > div
        > main
        > section
        > div
        > div:nth-child(4)
        > div
        > div
        > img {
        -webkit-box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
      }

      ._83d9fef4ae69148dc1fc9b8323f8528b-scss._2dc8cce76d72af90f5e00e781db42541-scss,
      .g9n_9K5pFI3B_JuDI_hS.LcjM521yr5D14A54HbQl,
      ._jtsyLN4SfPrV5dZONPP.uwzZYE9AYS0OMBzvAopr,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div:nth-child(3)
        > div
        > div:nth-child(1),
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div:nth-child(4)
        > div
        > div:nth-child(1),
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div.rezqw3Q4OEPB1m4rmwfw
        > div:nth-child(3)
        > div
        > div.koyeY6AgGRPmyPITi7yO,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div:nth-child(4)
        > div:nth-child(1)
        > div:nth-child(1),
      #searchPage > div > div > div > div > div:nth-child(1),
      #searchPage > div > div > div > div > div {
        position: initial !important;
        background: #00000000 !important;
        box-shadow: none !important;
      }

      ._235729a60d5e265806e8509d8633b779-scss,
      .b1b53e70887a91051a9d7dc85160fc6b-scss,
      .a232f016804d04ce9c5bbfd1a5e00d54-scss,
      .EGbXItTF_kUHbao1jeCp,
      .We1fExPHxLIRmV0rZGNo,
      .I1cppg1eJlgG6FCdhjO3,
      ._XX7ZgHsEhiQ3gO0kz5Q,
      ._JKdvfJnHxRZ33nlei4Z,
      .Hn_m1H5t0xMhZa46UHuC,
      .jNSwrrV1feJDbTAzoSUb,
      ._5wXWalxnOyFQX7uHu_j,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div:nth-child(1),
        ._UFTK833WfTNGb4agRTd,
        .Ic3iDUCnC09k55peZBfC,
        div.os-padding
          > div
          > div
          > div.main-view-container__scroll-node-child
          > main
          > div
          > section
          > div,
        div.os-padding
          > div
          > div
          > div.main-view-container__scroll-node-child
          > main
          > div
          > section
          > div
          > div,
          .xYgjMpAjE5XT05aRIezb,
          .MyW8tKEekj9lKQsviDdP, .gHImFiUWOg93pvTefeAD,
          .gHImFiUWOg93pvTefeAD,
          .contentSpacing.NXiYChVp4Oydfxd7rT5r.RMDSGDMFrx8eXHpFphqG,
          .lXcKpCtaEeFf1HifX139,
          .main-view-container__scroll-node-child,
          .NXiYChVp4Oydfxd7rT5r  {
        background: #00000000 !important;
      }

      _8e7d398e09c25b24232d92aac8a15a81-scss {
        color: #fff !important;
        background-color: #1db954 !important;
        transition-duration: 0.6s;
        transition: opacity 0.5s;
      }

      .O6evDj2xd8mSlS2qiPiG {
        background: var(--overlay-heavy);
      }

      .progress-bar__slider,
      .progress-bar__fg_wrapper,
      ._3a2318b538bc2aae78113023036a879a-scss,
      .giO6cIQ8auPNZuTvC4Y8,
      .lz_1dGnEKWyCpV_qE0ux,
      button {
        transition-duration: 0.2s;
        transition-property: background-color;
      }

      button {
        transition-duration: 0.2s;
        transition-property: color;
      }

      ._3cf7cb92e8b34cd675db241406113852-scss:hover
        .a576b3947647edea47972737accee656-scss,
      .a576b3947647edea47972737accee656-scss,
      .fa5d61cbff164a35eeb31d9e7ec6d466-scss._330120983547cb0c119a357dbb9ab8ab-scss
        ._76bf0ea4fc6653c68b50ad9723c9a535-scss,
      .fa5d61cbff164a35eeb31d9e7ec6d466-scss:hover
        ._76bf0ea4fc6653c68b50ad9723c9a535-scss,
      ._76bf0ea4fc6653c68b50ad9723c9a535-scss,
      .progress-bar:focus-within .progress-bar__fg,
      a:focus,
      a:hover,
      a {
        transition-duration: 0.2s;
      }

      .nav-ylx .OCY4jHBlCVZEyGvtSv0J {
        height: 100px !important;
      }

      .jOKLc29vP0Bz1K0TsDtX {
        min-width: 340px !important;
      }

      .SboKmDrCTZng7t4EgNoM {
        border-radius: 32px !important;
        background: rgba(0, 0, 0, 0.3) !important;
      }

      .tr8V5eHsUaIkOYVw7eSG {
        height: auto;
      }

      .nav-ylx .OCY4jHBlCVZEyGvtSv0J {
        height: 100px !important;
      }

      .jOKLc29vP0Bz1K0TsDtX {
        min-width: 340px !important;
      }

      .nav-ylx .Root__nav-bar {
        gap: 1px !important;
      }

      .Root__nav-bar {
        margin-left: 5px !important;
        margin-top: 2px !important;
        height: calc(100% - -30px) !important;
      }

      .QuHe04rU4bj0Z5U9E2Tk {
        padding: 2px 14px !important;
      }

      .UCEIwrWMxnBFH4uoPybJ {
        padding-bottom: 10px;
      }

      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div.fVB_YDdnaDlztX7CcWTA {
        top: 0px;
        position: initial !important;
      }

      ._748c0c69da51ad6d4fc04c047806cd4d-scss {
        color: #000 !important;
        text-shadow: 0 0 black;
      }

      /* lyrics animations */
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > div:nth-child(2)
        > div
        > div {
        filter: saturate(4);
        transition-duration: 0.1s;
        transition-timing-function: cubic-bezier(0.12, 0.51, 0.26, 0.5);
      }

      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > div:nth-child(2)
        > div
        > div:hover {
        transform: scale(1.03);
      }

      .arY01KDGhWNgzlAHlhpd {
        transform: scale(1.05);
      }

      .d6e5892a336f6ae43bf066f2245c81b1-scss,
      ._4fac214bccd807d7c6fed21d4e0ea6de-scss,
      .i0XB7255K_4QFLJsSGc_,
      #main > div.Root.encore-dark-theme > div > nav > div {
        padding-left: -1px !important;
        padding-right: 6px;
        padding-bottom: 10px;
      }

      ._8bfd0bd3ba9dd8201e38b1622bc74fb6-scss,
      .i_0L07qd2CAeOLFiK8dP {
        overflow-y: visible !important;
        backdrop-filter: blur(3px) !important;
      }

      ._2f859138f9d0ecc3c687296f572c5dca-scss,
      ._3802c04052af0bb5d03956299250789e-scss,
      ._28be3af50433a1164b3a62a898dce43e-scss,
      .OALAQFKvC7XQOVYpklB4,
      .KL469QQzoRZLOmKomNzk,
      ._clplXKRPuAbAoCUarH0,
      .GenericModal__overlay,
      .L4WROPnQ7MPGhylvVyxd,
      ._43e978b8fbef3b1a5fc86ea29e51a0fd-scss.a4bc298d40e9660cd25cd3ac1a7f9c49-scs,
      .YWQ6MaodStrAvAMCg1wx,
      #main > div.Root.encore-dark-theme > div > nav > div > ul > li > a,
      #main
        > div.Root.encore-dark-theme
        > div
        > nav
        > div
        > ul
        > li:nth-child(3)
        > div
        > a {
        background: rgba(0, 0, 0, 0) !important;
      }

      ._2f859138f9d0ecc3c687296f572c5dca-scss:hover,
      ._3802c04052af0bb5d03956299250789e-scss:hover,
      ._28be3af50433a1164b3a62a898dce43e-scss:hover,
      .OALAQFKvC7XQOVYpklB4:hover,
      .L4WROPnQ7MPGhylvVyxd:hover,
      ._8bfd0bd3ba9dd8201e38b1622bc74fb6-scss,
      .YWQ6MaodStrAvAMCg1wx:hover,
      #main > div.Root.encore-dark-theme > div > nav > div > ul > li > a:hover,
      #main
        > div.Root.encore-dark-theme
        > div
        > nav
        > div
        > ul
        > li:nth-child(3)
        > div
        > a:hover {
        background: var(--hovercolor) !important;
      }

      .byhpDrPqhYGoCXVANcn9 {
        transition-duration: 0.2s;
      }

      .YWQ6MaodStrAvAMCg1wx:hover .byhpDrPqhYGoCXVANcn9 {
        transform: scale(1.05);
        transition-duration: 0.2s;
        transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
      }

      ._13e5c5964387e0139bbe6e468e9aa649-scss > *,
      ._8e7d398e09c25b24232d92aac8a15a81-scss {
        -webkit-transition: opacity 0.5s;
        transition: opacity 0.5s !important;
      }

      ._8e7d398e09c25b24232d92aac8a15a81-scss:hover {
        box-shadow: 2px -1px 20px 0px #000000c7;
        z-index: 1;
      }

      ._233cba0ebe7615236e86592034108e77-scss {
        justify-content: center;
      }

      /* The inside of current playing song border thing */
      .iSbqnFdjb1SuyJ3uWydl {
        border-radius: var(--main-border-radius) !important;
      }

      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div:nth-child(3)
        > div
        > div
        > div:nth-child(2)
        > div
        > div {
        border-radius: var(--main-border-radius) !important;
      }

      ._OpqIZJH2IqpNqAS9iJ7,
      ._cx_B0JpuGl6cJE7YqU1,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div:nth-child(4)
        > div
        > div
        > div:nth-child(2)
        > div
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div:nth-child(3)
        > div
        > div
        > div:nth-child(2)
        > div
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div
        > div:nth-child(3)
        > div:nth-child(1)
        > div
        > div
        > div
        > div
        > div:nth-child(2)
        > div
        > div,
      #searchPage
        > div
        > div
        > section
        > div
        > div
        > div
        > div
        > div:nth-child(2)
        > div
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div:nth-child(3)
        > div:nth-child(1)
        > div
        > div
        > div
        > div
        > div:nth-child(2)
        > div
        > div,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div:nth-child(4)
        > div
        > div
        > div:nth-child(2)
        > div,
      .h4HgbO_Uu1JYg5UGANeQ {
        transition: transform var(--standard-ease);
      }

      ._OpqIZJH2IqpNqAS9iJ7,
      ._cx_B0JpuGl6cJE7YqU1:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div:nth-child(4)
        > div
        > div
        > div:nth-child(2)
        > div
        > div:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div:nth-child(3)
        > div
        > div
        > div:nth-child(2)
        > div
        > div:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > div
        > section
        > div
        > div.iB16LxoPzDeVZo8zPhPQ
        > div:nth-child(3)
        > div:nth-child(1)
        > div
        > div
        > div
        > div
        > div:nth-child(2)
        > div
        > div:hover,
      #searchPage
        > div
        > div
        > main
        > section
        > div
        > div
        > div
        > div
        > div:nth-child(2)
        > div
        > div:hover,
      div.os-padding
        > div
        > div
        > div.main-view-container__scroll-node-child
        > main
        > section
        > div
        > div
        > div:nth-child(3)
        > div:nth-child(1)
        > div
        > div
        > div
        > div
        > div:nth-child(2)
        > div
        > div:hover,
      .h4HgbO_Uu1JYg5UGANeQ:hover {
        transform: scale(1.025);
        background: var(--hovercolor);
      }

      .ggAaYdWWy1P_IcJbsMeZ .FnW_fQBaMbSCZnG14SfL,
      .iSbqnFdjb1SuyJ3uWydl .RfidWIoz8FON2WhFoItU {
        opacity: 1;
        color: #31ff55;
      }

      .ggAaYdWWy1P_IcJbsMeZ .g_2jIhVKp2v60nnkBkUN {
        opacity: 0;
      }

      ._4b308d5c9250cfb0620ce3b40765ef4a-scss,
      .tracklist-row--active,
      .SzCNXJJQz7BiDOO0B2Xv,
      .ggAaYdWWy1P_IcJbsMeZ,
      .iSbqnFdjb1SuyJ3uWydl {
        transform: scale(1.025) !important;
        background-color: #0003;
      }

      ._4b308d5c9250cfb0620ce3b40765ef4a-scss
        ._99bbcff33ae810da0bfc335662ae2c1d-scss,
      .fynR25MOeILQ7mCZ8247 {
        opacity: 0 !important;
      }

      .haNxPq * {
        cursor: pointer !important;
      }

      .ec1b5762556429ac3aeedbae72433491-scss {
        color: #ffffffe0 !important;
      }

      div.os-padding > div > div > ul > div > div:nth-child(2) > div {
        border-radius: 5px;
      }

      .Root__now-playing-bar,
      .i_0L07qd2CAeOLFiK8dP,
      .pLwpjUDpZgzSXNOsGn_c,
      .Mx7aus4bRGbU9vPpnDHj {
        background: var(--overlay-heavy);
      }
    }
 `;

  if (das) {
    css += `
        .Root__nav-bar, .nav-alt .Root__main-view, .nav-alt .Root__nav-bar, .Root__fixed-top-bar {
            background: var(--overlay-heavy) !important;
        }
      `;
  }

  return css;
}

function addObserverIfDesiredNodeAvailable() {
  const coverArtImage = document.querySelector("[data-testid=cover-art-image]");
  if (!coverArtImage) {
    setTimeout(addObserverIfDesiredNodeAvailable, 500);
    return;
  }

  const sheet = document.createElement("style");
  sheet.setAttribute("id", "background");
  if (document.getElementById("background") !== null) {
    document.getElementById("background").remove();
  }
  sheet.innerHTML = `:root { --backimg: url(${coverArtImage.src}); }`;
  document.body.appendChild(sheet);
  const observer = new MutationObserver((changes) => {
    changes.forEach((change) => {
      if (change.attributeName.includes("src")) {
        console.log("Changing background!");
        const sheet = document.createElement("style");
        sheet.setAttribute("id", "background");
        if (document.getElementById("background") !== null) {
          document.getElementById("background").remove();
        }
        sheet.innerHTML = `:root { --backimg: url(${coverArtImage.src}); }`;
        document.body.appendChild(sheet);
      }
    });
  });
  observer.observe(coverArtImage, { attributes: true });
}

addObserverIfDesiredNodeAvailable();

setInterval(function obs() {
  var coverArtImage = document.querySelectorAll(
    "[data-testid=cover-art-image]"
  )[0];
}, 1500);

var lastSong = "";
var foundSong = 0;
var replaced = 0;

setInterval(function () {
  if (document.getElementsByClassName("xaKMcFuZK3bEXbt3bPdg")[1] != undefined) {
    for (
      i = 0;
      i < document.getElementsByClassName("xaKMcFuZK3bEXbt3bPdg").length;
      i++
    ) {
      document.getElementsByClassName("xaKMcFuZK3bEXbt3bPdg")[
        i
      ].style.backgroundColor =
        document
          .getElementsByClassName("xaKMcFuZK3bEXbt3bPdg")
          [i].style.backgroundColor.slice(0, -1) + ", 0.3)";
    }
  }
  if (document.getElementsByClassName("IyZpbhJE52K9fkJmGbAj")[1] != undefined) {
    for (
      i = 0;
      i < document.getElementsByClassName("IyZpbhJE52K9fkJmGbAj").length;
      i++
    ) {
      document.getElementsByClassName("IyZpbhJE52K9fkJmGbAj")[
        i
      ].style.backgroundColor =
        document
          .getElementsByClassName("IyZpbhJE52K9fkJmGbAj")
          [i].style.backgroundColor.slice(0, -1) + ", 0.3)";
    }
  }

  if (
    document.getElementsByClassName(
      "os-viewport os-viewport-native-scrollbars-invisible"
    )[1] != undefined
  ) {
    document.getElementsByClassName(
      "os-viewport os-viewport-native-scrollbars-invisible"
    )[1].onscroll = function () {
      document.getElementsByClassName("under-main-view")[0].style.opacity =
        1 -
        (document.getElementsByClassName(
          "os-viewport os-viewport-native-scrollbars-invisible"
        )[1].scrollTop /
          1000) *
          5;
      document.querySelector("div.under-main-view").style.transform =
        "translateY(-" +
        (document.getElementsByClassName(
          "os-viewport os-viewport-native-scrollbars-invisible"
        )[1].scrollTop +
          60) +
        "px)";
      scrollTimeout = 1;
    };
  }

  if (document.getElementById("main") != null) {
    if (document.getElementById("backgroundDIV") == undefined) {
      div = document.createElement("div");
      div.id = "backgroundDIV";
      div.innerHTML = '<div><div class="backgroundDIV"></div></div>';
      main = document.getElementById("main");
      main.insertBefore(div, main.firstChild);
    }
  }
}, 1000);

setInterval(function () {}, 5000);

const endTime = performance.now();
console.log(
  `Script finished loading in ${(endTime - startTime).toFixed(2)} ms.`
);
