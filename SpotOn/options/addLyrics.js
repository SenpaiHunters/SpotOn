const STAT_ENABLED = 1;
const STAT_DISABLED = 0;

let stat = STAT_ENABLED;
let themeLock = false;
let savedBackgroundImage = null;
let startTime = performance.now();

initSkin();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.txt === "disable" && message.bool === "false" && !themeLock) {
    removeSkin();
    sendResponse({ status: "disabled" });
    stat = STAT_DISABLED;
  } else if (message.txt === "enable" && message.bool === "true" && !themeLock) {
    initSkin(true);
    sendResponse({ status: "enabled" });
    stat = STAT_ENABLED;
  } else if (message.txt === "check" || message.txt === "das") {
    sendResponse({ status: stat });
  } else if (message.txt === "lock") {
    themeLock = true;
    savedBackgroundImage = getAlbumArtBackground();
    sendResponse({ status: "theme locked" });
  } else if (message.txt === "unlock") {
    themeLock = false;
    restoreSavedBackground();
    initSkin(true);
    sendResponse({ status: "theme unlocked" });
  } else if (message.txt === "getAlbumArtURL") {
    const coverArtImage = document.querySelector("[data-testid=cover-art-image]");
    sendResponse({ albumArtURL: coverArtImage ? coverArtImage.src : null });
  }
});

function initSkin(das) {
  // console.log("CSS Functions Starting");
  if (!themeLock || das) {
    addStyleToDocument(getCSS(das));
  }
  addObserverIfDesiredNodeAvailable();
}

function addStyleToDocument(css) {
  const styleNode = document.getElementById("skin") || document.createElement("style");
  styleNode.id = "skin";
  styleNode.type = "text/css";
  styleNode.textContent = css;
  document.head.appendChild(styleNode);
}

function removeSkin() {
  if (!themeLock) {
    const styleNode = document.getElementById("skin");
    if (styleNode) {
      styleNode.remove();
    }
  }
  localStorage.setItem("skin", false);
}

function getCSS(das) {
  const commonCSS = `@charset "UTF-8";
  /*------Created by Kami--------*/
  :root {
      --overlay-heavy: rgba(0, 0, 0, 0.4);
      --standard-ease: 0.35s cubic-bezier(0.215, 0.61, 0.355, 1);
      --main-border-radius: 25px;
      --white: #fff;
      --hoverback: rgba(255, 255, 255, 0.1);
      --blur: 20px;
      --hovercolor: rgba(0, 0, 0, 0.2);
      --icons: var(--white);
      --bg-blur: 40px;
      --section-background-base: background: 0 0 !important;
      --background-base: background: 0 0 !important;
      --background-highlight: var(--hovercolor) !important;
  }

  .encore-dark-theme {
      --text-subdued: rgba(255, 255, 255, 0.878) !important;
  }

  .deomraqfhIAoSB3SgXpu {
      transform: translateX(-80px) !important;
  }

  .kpRBcW:hover,
  .RowButton-sc-xxkq4e-0.hIehTT:hover,
  .bgTbzH:hover:after,
  button.encore-over-media-set.I4p8r1UNjIGk9yv3H2Ms,
  .kpRBcW {
      background: var(--hovercolor) !important;
      background-color: var(--hovercolor) !important;
      border-radius: 11px !important;
  }

  .fVB_YDdnaDlztX7CcWTA {
      background: transparent !important;
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

  .ojrThQm1wxR2gZ6GntJB.Ks_qLLEMUQzP7ejeQCwQ {
      padding: 3px !important;
  }

  .ojrThQm1wxR2gZ6GntJB.Ks_qLLEMUQzP7ejeQCwQ:hover,
  .ojrThQm1wxR2gZ6GntJB.Ks_qLLEMUQzP7ejeQCwQ:hover:after {
      background-color: var(--hoverback) !important;
      background: var(--hoverback) !important;
  }

  .C3pBU1DsOUJJOAv89ZFT {
    margin-top: 200px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    display: block;
}

  .spotify__container--is-web #main .nav-ylx [data-testid="now-playing-bar"],
  .JG5J9NWJkaUO9fiKECMA {
      border-left: 120px dotted rgba(0, 0, 0, 0.01) !important;
      height: 83px !important;
      padding-right: 10px !important;
      min-height: -webkit-fill-available !important;
      width: -webkit-fill-available !important;
  }

  .RowButton-sc-xxkq4e-0.hIehTT:hover,
  .gLSzhA:hover:after,
  .RowButton-sc-xxkq4e-0.hIehTT:hover:after,
  .RowButton-sc-xxkq4e-0.hIehTT:hover:before,
  .fJGlei:hover:after {
      background: var(--hovercolor) !important;
      background-color: var(--hovecolor) !important;
      border-radius: 16px !important;

  }

  [dir="ltr"] .eSg4ntPU2KQLfpLGXAww> :not(:last-child) {
      margin-right: 37px !important;
      border-radius: 30px !important;

  }

  .GenericModal__overlay.GenericModal__overlay--animated.GenericModal__overlay--afterOpen {
      background-color: var(--hoverback) !important;
      background: var(--hoverback) !important;
  }

  .L9xhJOJnV2OL5Chm3Jew,
  #main>div.Root.encore-dark-theme.nav-ylx>div>div:first-child>header>div:nth-child(1),
  #main>div.Root.encore-dark-theme.nav-ylx>div>div:first-child>header>div:nth-child(1)>div,
  #main>div.Root.encore-dark-theme.nav-ylx>div>nav>div,
  #main>div.Root.encore-dark-theme>div>div.Root__now-playing-bar>footer>div>div>div>div>div>div:after,
  #main>div.Root.encore-dark-theme>div>div.Root__now-playing-bar>footer>div>div>div>div>div>div:before,
  #main>div.Root.encore-dark-theme>div>div:first-child>header>div:nth-child(1),
  #main>div.Root.encore-dark-theme>div>div:first-child>header>div:nth-child(1)>div,
  #main>div.Root.encore-dark-theme>div>div:nth-child(2),
  #main>div.Root.encore-dark-theme>div>nav>div,
  #main>div.Root.encore-dark-theme>div>nav>div>div>div>div>div,
  #main>div.Root.encore-dark-theme>div>nav>div>ul>li:nth-child(3)>div>a,
  #main>div.Root.encore-dark-theme>div>nav>div>ul>li>a,
  .BdcvqBAid96FaHAmPYw_,
  .DHzyoCWhWjunaSpGo3fm,
  .DHzyoCWhWjunaSpGo3fm:hover,
  .GenericModal__overlay,
  .H0HbpIM3UrcupWIAjLWu,
  .KL469QQzoRZLOmKomNzk,
  .jtqtOeRP46XAlHWx4C0D.MPBLLykSgRJIlLSbQVgy,
  .Ai_McRq9wJEYK21w8nX_,
  .L4WROPnQ7MPGhylvVyxd,
  .OALAQFKvC7XQOVYpklB4,
  .PHgyArRLVFknlaOm31ID,
  .Root__fixed-top-bar,
  .Root__left-sidebar,
  .Root__left-sidebar.hasYLXSidebar,
  .Root__main-view,
  .Root__nav-bar,
  .T1xI1RTSFU7Wu94UuvE6,
  .YWQ6MaodStrAvAMCg1wx,
  .Z35BWOA10YGn5uc9YgAp .zXwER4Lsqq_e7fVVaPkZ,
  .ZQftYELq0aOsg6tPbVbV,
  ._28be3af50433a1164b3a62a898dce43e-scss,
  ._2f859138f9d0ecc3c687296f572c5dca-scss,
  ._3802c04052af0bb5d03956299250789e-scss,
  ._43e978b8fbef3b1a5fc86ea29e51a0fd-scss.a4bc298d40e9660cd25cd3ac1a7f9c49-scs,
  ._7b6273541d969069bb18c4fcae4120e7-scss,
  ._8b45c1ef6e792bfe1014b26c48673e5a-scss,
  ._clplXKRPuAbAoCUarH0,
  ._mSbAWxlXgc2ONtpnuXQ:after,
  ._mSbAWxlXgc2ONtpnuXQ:before,
  .active *,
  .cASFVN,
  .doNNoL:hover,
  .e2JzVB2WkGm7GMT8rkEg,
  .g4PZpjkqEh5g7xDpCr2K *,
  .g4PZpjkqEh5g7xDpCr2K:hover,
  .i0XB7255K_4QFLJsSGc_,
  .jEMA2gVoLgPQqAFrPhFw,
  .kYBlAcRblnjQ6kKW4JCy,
  .nav-alt .Root__main-view,
  .nav-alt .Root__nav-bar,
  .nav-ylx .jEMA2gVoLgPQqAFrPhFw,
  .t1hN4Ju87afc5N5fDTnm,
  .vreceNX3ABcxyddeS83B,
  .vreceNX3ABcxyddeS83B div,
  .vreceNX3ABcxyddeS83B.nZSNG58XEPTX69mkNi9n.g3kBhX1E4EYEC2NFhhxG,
  [data-testid=play-button]>:first-child,
  div.contentSpacing,
  div.os-padding>div>div>div.main-view-container__scroll-node-child>div>div,
  div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>nav,
  div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>div:nth-child(3)>section:nth-child(2)>div:nth-child(2)>div {
      background: 0 0 !important;
  }

  .hd6a3g_3QyF8MFL0wWs1,
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

  .QO9loc33XC50mMRUCIvf {
      background: var(--hovercolor) !important;
      background-color: var(--hovercolor) !important;
      color: #fff !important;
  }

  [data-testid="root"] [data-testid="now-playing-bar"] :first-child:has([data-testid="player-controls"]) {
      margin-top: 10px !important;
  }

  .TxO7Ee8iwqBpkgznKHsd:hover,
  .TxO7Ee8iwqBpkgznKHsd:active {
      background-color: var(--hoverback) !important;
      color: var(--icons) !important;
  }

  div[data-testid="context-item-info-title"] span a {
      color: #fff;
  }

  .h4HgbO_Uu1JYg5UGANeQ.wTUruPetkKdWAR1dd6w4.iSbqnFdjb1SuyJ3uWydl,
  [data-testid="track-list"] [role="presentation"] [role="presentation"]:has([data-testid="add-button"]) {
      border-radius: var(--main-border-radius) !important;

  }

  .LunqxlFIupJw_Dkx6mNx {
      background-color: var(--hovercolor) !important;
  }

  .dZPmmYYhskhqHJCAruvI.wTUruPetkKdWAR1dd6w4 div {
      color: var(--icons) !important;
  }

  header.facDIsOQo9q7kiWc4jSg {
      margin-top: -46px !important;
  }

  [role="row"] [data-testid="tracklist-row"] [aria-colindex="\x31 "] [data-encore-id="type"] {
      margin-top: -5px !important;
  }

  .contentSpacing.NXiYChVp4Oydfxd7rT5r.RMDSGDMFrx8eXHpFphqG {
      margin-top: -120px !important;
  }

  .jEMA2gVoLgPQqAFrPhFw {
      padding-top: 50px !important;
  }

  .PeNI572tTpqsN23o3QhJ {
      background: var(--hovercolor) !important;
  }

  [tabindex="\x30"] kbd {
      border: 2px solid var(--bg-color) !important;
      background-color: rgba(0, 0, 0, 0.2);
  }

  /* right click menu */
  [role="menu"] [role="presentation"] :first-child:has(.ellipsis-one-line) {
      background: var(--hoverback) !important;
      border-radius: var(--main-border-radius) !important;
  }

  .SboKmDrCTZng7t4EgNoM,
  div#trippy-7,
  .SboKmDrCTZng7t4EgNoM,
  div#trippy-7,
  .SboKmDrCTZng7t4EgNoM {
      background: var(--hovercolor) !important;
      transition-duration: 0.2s !important;
      transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1) !important;
  }

  .ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi[aria-colcount="5"] .wTUruPetkKdWAR1dd6w4 {
      display: grid !important;
  }

  .no-focus-outline #main .nav-ylx [aria-label="Main"],
  .sqKERfoKl4KwrtHqcKOd {
      min-height: -webkit-fill-available !important;
      height: -webkit-fill-available !important;
      width: -webkit-fill-available !important;
  }

  .os-viewport,
  .os-theme-spotify .os-viewport,
  .os-host-overflow>.os-padding,
  .os-viewport {
      padding: 6px !important;
  }

  .ifVI2CEdOZGgMWIUN2Cw.kJ_Q4aphh_uCJCZdzPpD:not(.dNphEfQzPRaQufS04jUm) {
      padding-bottom: calc(var(--nav-bar-width) - 20px) !important;
  }

  .main-view-container__scroll-node-child [data-testid="playlist-page"] {
      margin-top: 0 !important;
  }

  .contentSpacing {
      max-width: -webkit-fill-available !important;
  }

  .main-view-container__scroll-node .os-content .main-view-container__scroll-node-child [data-testid="settings-page"]:after {
      content: "CSS/JS made by Kami. Specifically made for SpotOn (https://github.com/senpaihunters/spoton), any distrubtion is prohibited, unless contacted and allowed otherwise.";
      cursor: auto;
  }

  .hwP4Oum2PB765sb8jigI,
  .HVCCFeUiHVwZVv74p34a,
  .zi377dMLSwXnFiejYnRa {
      border-radius: 0 !important;
      margin: 0 0 #000 !important;
      padding: 0 0 #000 !important;
  }

  header.facDIsOQo9q7kiWc4jSg {
      border-radius: 30px !important;
  }

  .DG9CsoFIptJhAneKoo_F {
      margin-top: -105px;
      margin-bottom: 26px;
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
      border: 0 solid #00000001 !important;
      background: radial-gradient(at left top, rgba(255, 255, 255, 1), var(--playCol), rgba(0, 0, 0, 1)) !important;
  }

  .volume-bar .middle-align.progress-bar__slider {
      border: 0 solid #1e1e1e !important;
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
      margin-top: 0 !important;
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

      .bgDIV {
          background-image: var(--backimg);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-size: cover;
          transition-duration: 0.7s;
          background-position: center;
          background-color: #282828;
          filter: blur(var(--bg-blur));
          width: 100vw;
          height: 100vh;
          position: absolute;
      }

      #main>div.Root.encore-dark-theme>div,
      #context-menu>ul,
      #context-menu>div>ul {
          backdrop-filter: blur(var(--bg-blur));
      }

      #context-menu>ul,
      #context-menu>div>ul {
          overflow: visible;
      }

      #main>div.Root.encore-dark-theme>div,
      .nav-alt #main>div.Root.encore-dark-theme>div,
      .nav-alt .QO9loc33XC50mMRUCIvf,
      .J6VTd7VdGN2PM_oXCAyH,
      #context-menu>ul,
      #context-menu>div>ul {
          background-color: var(--overlay-heavy);
      }

      .nav-alt #main>div.Root.encore-dark-theme>div {
          padding: 0;
      }

      .Root__fixed-top-bar {
          padding-top: 10px;
          padding-left: 120px;
      }

      .os-viewport,
      .os-theme-spotify .os-viewport,
      .os-host-overflow>.os-padding,
      .os-viewport {
          padding: 8px !important;
      }

      button.RowButton-sc-xxkq4e-0.iQutdu:hover {
          -webkit-tap-highlight-color: rgba(105, 88, 88, 0) !important;
      }

      #main>div.Root.encore-dark-theme.nav-ylx>div:nth-child(2) {
          padding: 0 !important;
      }

      .Root__now-playing-bar {
          padding: 8px !important;
      }

      .EZFyDnuQnx5hw78phLqP {
          padding-bottom: 0 !important;
      }

      #main>div.Root.encore-dark-theme.nav-ylx>div:nth-child(2) {
          padding: 0;
          padding-top: 7px;
          background-color: var(--overlay-heavy);
      }

      #main>div.Root.encore-dark-theme.nav-alt>div>div.Root__fixed-top-bar>div:nth-child(2)>a:hover {
          filter: brightness(1.5);
          background: 0 0;
      }

      #main>div.Root.encore-dark-theme.nav-alt>div>div.Root__fixed-top-bar>div:nth-child(1) {
          -webkit-box-pack: end;
          -ms-flex-pack: end;
          justify-content: end;
      }

      #main>div.Root.encore-dark-theme.nav-alt>div>div.Root__fixed-top-bar>div:nth-child(2)>a {
          position: absolute;
          left: 34px;
          top: 24px;
          width: 150px;
          background-color: transparent;
          justify-content: flex-start;
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

      div.os-padding>div>div>ul>div>div:nth-child(2)>div {
          border-radius: 5px;
      }

      .HsbczDqu9qjcYr7EIdHR,
      #context-menu>div>ul,
      #context-menu>ul,
      #myconfigwin39457845,
      #myconfigwin39457845 button,
      #myconfigwin39457845 div,
      #searchPage>div>div>section:first-child>div:nth-child(2)>div>div,
      #searchPage>div>div>section:nth-child(3)>div:nth-child(2)>div,
      #searchPage>div>div>section>div:nth-child(2)>div,
      #searchPage>div>section>div:nth-child(2)>div>div,
      .AJqEY1gblQDvIgjU0jAH,
      .B0VIs50K6LXh5MDmmmJs,
      .B0VIs50K6LXh5MDmmmJs:hover,
      .CU0wnmWejIvyEsRRtSac,
      .DuEPSADpSwCcO880xjUG,
      .EZFyDnuQnx5hw78phLqP,
      .G8UNZJv4HT1kOIolA_e7,
      .I3EivnXTjYMpSbPUiYEg,
      .KDlcc1SFTcA90eMUcn5P,
      .LunqxlFIupJw_Dkx6mNx,
      .MQQEonum615k8mGkliT_,
      .PiyAiXdQULEnWAHP0tu1,
      .PpUTJL2NIYDUnmfzVIbE,
      .QavgDs_52SpJ2rw0LNYz:before,
      .R2w_sH83CJU9Yhnu0xyt,
      .Root__buddy-feed,
      .UmY163JiUcgJt2MKNyGW.SVnAziPF2z_cgAGrp6He,
      .VgSbatGBB9XwTH2_dsxg .ql0zZd7giPXSnPg75NR0,
      .VgSbatGBB9XwTH2_dsxg .ql0zZd7giPXSnPg75NR0:disabled,
      .WIPpgUp9J37Dwd0ZJnv0 .Root__main-view,
      .Ws8Ec3GREpT5PAUesr9b,
      .XTk61Y8OkBdUT6Wj4F6i.VfDGbMWaJe9rcefizTNk,
      ._K79lE9KrIAkl_bUSSUM,
      .aCtCKL9BxAoHeVZS0uRs,
      .aIWRvSjvEN4rTMCIi4vG,
      .ejNsts52hRq0uZcc_NXi,
      .encore-base-set,
      .encore-light-theme,
      .fLS8v3_EfBadEerbGVoR,
      .g6ZgzRfiHjsTLskeyI0J,
      .g6ZgzRfiHjsTLskeyI0J:focus,
      .g6ZgzRfiHjsTLskeyI0J:hover,
      .hcuLp8V4uEEfWZ4k6aLV,
      .hwP4Oum2PB765sb8jigI,
      .oaNVBli46GtVjaQKB15g,
      .odciv30UOniaTv4svlc0_[data-context-menu-open=true],
      .odcjv30UQnjaTv4sylc0,
      .odcjv30UQnjaTv4sylco:focus,
      .pHrwZOFBdT8FNXnmcPPI,
      .qJOhHoRcFhHJpEQ2CwFT.koyeY6AgGRPmyPITi7yO,
      .react-contextmenu-wrapper,
      .tsv7E_RBBw6v0XTQlcRo,
      .uV8q95GGAb2VDtL3gpYa,
      .uhDzVbFHyCQDH6WrWZaC,
      .wC9sIed7pfp47wZbmU6m,
      .zi377dMLSwXnFiejYnRa,
      .zrvvPyoxE6wQNqnu0yWA,
      [dir=ltr] .JdlKTdpMquftpMwwegZo,
      [dir=ltr] .g6ZgzRfiHjsTLskeyI0J,
      div.Root__now-playing-bar>footer>div:nth-child(2) *,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div.Ft1cMGlqDsCbqmXQyeKN>div.AJqEY1gblQDvIgjU0jAH.contentSpacing.zlBEnsMyvUhuHSEtst4Q>section>div:nth-child(2)>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div:nth-child(5)>section>div:nth-child(2)>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>div:nth-child(3)>section:nth-child(2)>div:nth-child(3)>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>div:nth-child(3)>section>div:nth-child(2)>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section>div:nth-child(2)>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>section:nth-child(n+4)>div:nth-child(2)>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>section>div:nth-child(5)>section>div:nth-child(2)>div,
      div.os-padding>div>div>div>main>section>div:nth-child(2)>div>div,
      html.spotify__container--is-web body,
      odcjv30UQnjaTv4sylcO:hover {
          background: rgba(105, 88, 88, 0) !important;
      }

      #main>div.Root.encore-dark-theme>div>div.Root__main-view>main>div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y>div.os-padding>div>div>div.main-view-container__scroll-node-child>section>div:nth-child(5)>section>div:nth-child(2)>div:hover,
      #main>div.Root.encore-dark-theme>div>div.Root__top-bar>header>div:nth-child(3)>div>nav>ul>li:hover>a,
      #searchPage>div>div>section>div:nth-child(2)>div:hover,
      #searchPage>div>section>div:nth-child(2)>div>div:hover,
      .B0VIs50K6LXh5MDmmmJs:hover,
      .eRuZMo_HNLjb1IalIeRb,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div.Ft1cMGlqDsCbqmXQyeKN>div.AJqEY1gblQDvIgjU0jAH.contentSpacing.zlBEnsMyvUhuHSEtst4Q>section>div:nth-child(2)>div:hover,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div>div:nth-child(3)>div>div>div:nth-child(2)>div>div:hover,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div:nth-child(5)>section>div:nth-child(2)>div:hover,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>div:nth-child(3)>section:nth-child(2)>div:nth-child(3)>div:hover,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>div:nth-child(3)>section>div:nth-child(2)>div:hover,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section>div:nth-child(2)>div:hover,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>section:nth-child(n+4)>div:nth-child(2)>div:hover,
      div.os-padding>div>div>div>main>section>div:nth-child(2)>div>div:hover,
      div.os-padding>div>div>ul>div>div:nth-child(2)>div:hover {
          background: var(--hovercolor) !important;
      }

      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section>div:nth-child(2)>div {
          overflow: visible;
          background-color: transparent !important;
          background-image: none !important;
          /*   transition-duration: 0s;  */
          transition-duration: 0.5s;
          /* Increased duration */
          transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          /* Adjusted timing function */
      }

      #main>div.Root.encore-dark-theme>div>nav>div>ul>li:nth-child(3)>div,
      #searchPage>div>div>section>div>div>div>div>div:first-child,
      #searchPage>div>section>div:nth-child(2)>div>div>div>div:first-child>div,
      .main-card-card:hover main-card-imageContainer,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div>div>section>div:nth-child(2)>div>div>div:first-child,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(n+2)>div>div>div:first-child,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div:nth-child(5)>section>div:nth-child(2)>div>div>div:first-child,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>div:nth-child(3)>section>div>div>div>div:first-child,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section>div>div>div>div:first-child,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section>div>div>div>div:first-child>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>section:nth-child(n+4)>div:nth-child(2)>div>div>div:first-child>div,
      div.os-padding>div>div>div>main>section>div:nth-child(2)>div>div>div>div>div:first-child div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section:nth-child(1)>div>div>div>div:nth-child(1)>div {
          transition-duration: 0.2s;
      }

      #searchPage>div>div>section>div>div>div:hover>div>div:first-child,
      #searchPage>div>section>div:nth-child(2)>div>div:hover>div>div:first-child>div,
      .OALAQFKvC7XQOVYpklB4:hover .JI_jg7MaIJ2TCTmebcdd,
      .main-card-card:hover main-card-imageContainer,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div>div>section>div:nth-child(2)>div:hover>div>div:first-child,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(n+2):hover>div>div>div:first-child,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div:nth-child(5)>section>div:nth-child(2)>div:hover>div>div:first-child,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>div:nth-child(3)>section>div>div:hover>div>div:first-child>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section>div>div:hover>div>div:first-child>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>section:nth-child(n+4)>div:nth-child(2)>div:hover>div>div:first-child>div,
      div.os-padding>div>div>div>main>section>div:nth-child(2)>div>div:nth-child(n+2):hover>div>div>div:first-child {
          /* transform: scale(1.05);
        transition-duration: 0.2s;
        transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1); */
          transform: scale(1.1) translateX(3px);
          transition-duration: 0.5s;
          /* Increased duration */
          transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          /* Adjusted timing function */
      }

      main-card-imageContainer,
      .OALAQFKvC7XQOVYpklB4 .JI_jg7MaIJ2TCTmebcdd {
          transition-duration: 0.4s;
          transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
      }

      .KL469QQzoRZLOmKomNzk:hover .B3i7kN8tRTwP9s4XEK10,
      view-homeShortcutsGrid-shortcut:hover view-homeShortcutsGrid-imageContainer,
      .B0VIs50K6LXh5MDmmmJs:hover .icV9eS36uZs9fhQmUujh,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section:nth-child(1)>div>div:hover>div>div:nth-child(1)>div {
          transform: scale(1.1) translateX(3px) !important;
      }

      .KL469QQzoRZLOmKomNzk .B3i7kN8tRTwP9s4XEK10,
      view-homeShortcutsGrid-shortcut view-homeShortcutsGrid-imageContainer,
      .icV9eS36uZs9fhQmUujh {
          /* transition-duration: 0.2s !important;
        transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1) !important; */
          transition-duration: 0.5s;
          /* Increased duration */
          transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          /* Adjusted timing function */
      }

      ._560fb0a89f4ec24665eb945cfe2c97b0-scss,
      .view-homeShortcutsGrid-grid,
      .Vg_wqJ9OwkZl65Rc_iyX,
      ._dlL34LrG9vg8mcBFaUw,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section:nth-child(1)>div {
          padding-top: 5px;
          padding-bottom: 5px;
          padding-right: 10px;
          padding-left: 5px;
      }

      .KL469QQzoRZLOmKomNzk,
      .KL469QQzoRZLOmKomNzk ._Xtjqr3it7fr5yseBgKp,
      .GG4lScbAogw4Q_mXWbn9,
      .msOGVcFLw_5wwMOLzhye,
      view-homeShortcutsGrid-shortcut view-homeShortcutsGrid-imageWrapper,
      .icV9eS36uZs9fhQmUujh,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section:nth-child(1)>div>div>div>div:nth-child(2)>div:nth-child(1),
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section:nth-child(1)>div>div>div>div:nth-child(1)>div {
          transition-duration: 0.2s !important;
          transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1) !important;
      }

      .KL469QQzoRZLOmKomNzk:hover ._Xtjqr3it7fr5yseBgKp,
      .B0VIs50K6LXh5MDmmmJs:hover .GG4lScbAogw4Q_mXWbn9,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>section:nth-child(1)>div>div:hover>div>div:nth-child(2)>div:nth-child(1) {
          transform: translateX(5px) !important;
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
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div,
      #main>div.Root.encore-dark-theme>div>div.Root__top-bar>header>div.T1xI1RTSFU7Wu94UuvE6,
      #main>div.Root.encore-dark-theme>div>div.Root__top-bar>header>div.T1xI1RTSFU7Wu94UuvE6>div,
      div.os-padding>div>div>div>main>section>div>div>div {
          background-color: #0000 !important;
          background-image: none !important;
      }

      .c108b4ada40c10926b10bba3ff614fd0-scss,
      .wQi0raQMEJJrELuj_2FP,
      .YboT9C61kapUCdQnsEmR,
      div.under-main-view>div>div {
          height: 50vh;
          top: -66px;
          opacity: 0.8;
          background-position: center;
      }

      div.under-main-view>div>div:after {
          height: 50vh !important;
      }

      ._6f1bb16d690aec58cb10e82de1ac2410-scss,
      .c108b4ada40c10926b10bba3ff614fd0-scss,
      .wQi0raQMEJJrELuj_2FP,
      .YboT9C61kapUCdQnsEmR,
      div.under-main-view>div>div {
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0));
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
      div.under-main-view>div>div {
          transform: scale(1) !important;
      }

      .n5XwsUqagSoVk8oMiw1x,
      .main-view-container__mh-footer-container {
          display: none !important;
      }

      .main-view-container__scroll-node-child-spacer {
          height: 0;
      }

      .main-view-container__scroll-node-child {
          padding-top: 20px;
      }

      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>div>div:nth-child(1) {
          background-color: #0000 !important;
          top: auto !important;
          box-shadow: none !important;
      }

      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div:nth-child(1) {
          top: auto;
      }

      .PpUTJL2NIYDUnmfzVIbE.kJ_Q4aphh_uCJCZdzPpD.dNphEfQzPRaQufS04jUm {
          padding-bottom: 25px !important;
      }

      #searchPage>div>div>div>div>div,
      #searchPage>div>div>div>div>div:first-child,
      ._83d9fef4ae69148dc1fc9b8323f8528b-scss._2dc8cce76d72af90f5e00e781db42541-scss,
      ._jtsyLN4SfPrV5dZONPP.uwzZYE9AYS0OMBzvAopr,
      .g9n_9K5pFI3B_JuDI_hS.LcjM521yr5D14A54HbQl,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div.rezqw3Q4OEPB1m4rmwfw>div:nth-child(3)>div>div.koyeY6AgGRPmyPITi7yO,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div:nth-child(4)>div>div:first-child,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div>div:nth-child(3)>div>div:first-child,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div:nth-child(4)>div:first-child>div:nth-child(1) {
          position: initial !important;
          background: #00000000 !important;
          box-shadow: none !important;
      }

      .EGbXItTF_kUHbao1jeCp,
      .Hn_m1H5t0xMhZa46UHuC,
      .I1cppg1eJlgG6FCdhjO3,
      .Ic3iDUCnC09k55peZBfC,
      .MyW8tKEekj9lKQsviDdP,
      .NXiYChVp4Oydfxd7rT5r,
      .We1fExPHxLIRmV0rZGNo,
      ._235729a60d5e265806e8509d8633b779-scss,
      ._5wXWalxnOyFQX7uHu_j,
      ._JKdvfJnHxRZ33nlei4Z,
      ._UFTK833WfTNGb4agRTd,
      ._XX7ZgHsEhiQ3gO0kz5Q,
      .a232f016804d04ce9c5bbfd1a5e00d54-scss,
      .b1b53e70887a91051a9d7dc85160fc6b-scss,
      .contentSpacing.NXiYChVp4Oydfxd7rT5r.RMDSGDMFrx8eXHpFphqG,
      .gHImFiUWOg93pvTefeAD,
      .jNSwrrV1feJDbTAzoSUb,
      .lXcKpCtaEeFf1HifX139,
      .main-view-container__scroll-node-child,
      .xYgjMpAjE5XT05aRIezb,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div:first-child {
          background: #00000000 !important;
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

      .sqKERfoKl4KwrtHqcKOd,
      .JG5J9NWJkaUO9fiKECMA,
      .OTfMDdomT5S7B5dbYTT8 {
          border-radius: 40px !important;

      }

      ._3cf7cb92e8b34cd675db241406113852-scss:hover .a576b3947647edea47972737accee656-scss,
      .a576b3947647edea47972737accee656-scss,
      .fa5d61cbff164a35eeb31d9e7ec6d466-scss._330120983547cb0c119a357dbb9ab8ab-scss ._76bf0ea4fc6653c68b50ad9723c9a535-scss,
      .fa5d61cbff164a35eeb31d9e7ec6d466-scss:hover ._76bf0ea4fc6653c68b50ad9723c9a535-scss,
      ._76bf0ea4fc6653c68b50ad9723c9a535-scss,
      .progress-bar:focus-within .progress-bar__fg,
      a:focus,
      a:hover,
      a {
          transition-duration: 0.2s;
      }

      .AzO2ondhaHJntbGy_3_S {
          background: transparent !important;
      }

      .nav-ylx .OCY4jHBlCVZEyGvtSv0J {
          height: 100px !important;
      }

      .jOKLc29vP0Bz1K0TsDtX {
          min-width: 340px !important;
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

      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div.fVB_YDdnaDlztX7CcWTA {
          top: 0;
          position: initial !important;
      }

      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>div:nth-child(2)>div>div {
          filter: saturate(4);
          transition-duration: 0.1s;
          transition-timing-function: cubic-bezier(0.12, 0.51, 0.26, 0.5);
      }

      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>div:nth-child(2)>div>div:hover {
          transform: scale(1.03);
      }

      .arY01KDGhWNgzlAHlhpd {
          transform: scale(1.05);
      }

      .d6e5892a336f6ae43bf066f2245c81b1-scss,
      ._4fac214bccd807d7c6fed21d4e0ea6de-scss,
      .i0XB7255K_4QFLJsSGc_,
      #main>div.Root.encore-dark-theme>div>nav>div {
          padding-left: -1px !important;
          padding-right: 6px;
          padding-bottom: 10px;
      }

      ._8bfd0bd3ba9dd8201e38b1622bc74fb6-scss,
      .i_0L07qd2CAeOLFiK8dP {
          overflow-y: visible !important;
          backdrop-filter: blur(3px) !important;
      }

      ._2f859138f9d0ecc3c687296f572c5dca-scss:hover,
      ._3802c04052af0bb5d03956299250789e-scss:hover,
      ._28be3af50433a1164b3a62a898dce43e-scss:hover,
      .OALAQFKvC7XQOVYpklB4:hover,
      .L4WROPnQ7MPGhylvVyxd:hover,
      ._8bfd0bd3ba9dd8201e38b1622bc74fb6-scss,
      .YWQ6MaodStrAvAMCg1wx:hover,
      #main>div.Root.encore-dark-theme>div>nav>div>ul>li>a:hover,
      #main>div.Root.encore-dark-theme>div>nav>div>ul>li:nth-child(3)>div>a:hover {
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

      ._13e5c5964387e0139bbe6e468e9aa649-scss>*,
      ._8e7d398e09c25b24232d92aac8a15a81-scss {
          -webkit-transition: opacity 0.5s;
          transition: opacity 0.5s !important;
      }

      ._8e7d398e09c25b24232d92aac8a15a81-scss:hover {
          z-index: 1;
      }

      ._233cba0ebe7615236e86592034108e77-scss {
          justify-content: center;
      }

      #searchPage>div>div>section>div>div>div>div>div:nth-child(2)>div>div,
      ._OpqIZJH2IqpNqAS9iJ7,
      ._cx_B0JpuGl6cJE7YqU1,
      .h4HgbO_Uu1JYg5UGANeQ,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div>div:nth-child(3)>div>div>div:nth-child(2)>div>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div>div>div:nth-child(3)>div:first-child>div>div>div>div>div:nth-child(2)>div>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div:nth-child(4)>div>div>div:nth-child(2)>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div:nth-child(4)>div>div>div:nth-child(2)>div>div,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>div:nth-child(3)>div:first-child>div>div>div>div>div:nth-child(2)>div>div {
          transition: transform var(--standard-ease);
      }

      #searchPage>div>div>main>section>div>div>div>div>div:nth-child(2)>div>div:hover,
      ._OpqIZJH2IqpNqAS9iJ7,
      ._cx_B0JpuGl6cJE7YqU1:hover,
      .h4HgbO_Uu1JYg5UGANeQ:hover,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div:nth-child(4)>div>div>div:nth-child(2)>div>div:hover,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div>div.iB16LxoPzDeVZo8zPhPQ>div:nth-child(3)>div:first-child>div>div>div>div>div:nth-child(2)>div>div:hover,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>div>section>div>div:nth-child(3)>div>div>div:nth-child(2)>div>div:hover,
      div.os-padding>div>div>div.main-view-container__scroll-node-child>main>section>div>div>div:nth-child(3)>div:first-child>div>div>div>div>div:nth-child(2)>div>div:hover {
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

      ._4b308d5c9250cfb0620ce3b40765ef4a-scss ._99bbcff33ae810da0bfc335662ae2c1d-scss,
      .fynR25MOeILQ7mCZ8247 {
          opacity: 0 !important;
      }

      .haNxPq * {
          cursor: pointer !important;
      }

      .ec1b5762556429ac3aeedbae72433491-scss {
          color: #ffffffe0 !important;
      }

      div.os-padding>div>div>ul>div>div:nth-child(2)>div {
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

  return das ? `${commonCSS}\n${getCustomCSS()}` : commonCSS;
}

function getCustomCSS() {
  return `.Root__nav-bar, .nav-alt .Root__main-view, .nav-alt .Root__nav-bar, .Root__fixed-top-bar { background: var(--overlay-heavy) !important; }`;
}

async function addObserverIfDesiredNodeAvailable() {
  const coverArtImage = document.querySelector("[data-testid=cover-art-image]");
  if (!coverArtImage) {
    setTimeout(addObserverIfDesiredNodeAvailable, 500);
    return;
  }

  const backgroundSheet = document.getElementById("background") || document.createElement("style");
  backgroundSheet.id = "background";
  document.body.appendChild(backgroundSheet);
  backgroundSheet.textContent = `:root { --backimg: url(${getAlbumArtBackground()}); }`;

  const observer = new MutationObserver((changes) => {
    changes.forEach((change) => {
      if (change.attributeName.includes("src") && !themeLock) {
        backgroundSheet.textContent = `:root { --backimg: url(${getAlbumArtBackground()}); }`;
      }
    });
  });

  observer.observe(coverArtImage, { attributes: true });
}

function getAlbumArtBackground() {
  const coverArtImage = document.querySelector("[data-testid=cover-art-image]");
  return coverArtImage ? coverArtImage.src : "";
}

function restoreSavedBackground() {
  const backgroundSheet = document.getElementById("background");
  if (backgroundSheet && savedBackgroundImage) {
    backgroundSheet.textContent = `:root { --backimg: url(${savedBackgroundImage}); }`;
  }
}

addObserverIfDesiredNodeAvailable();

let endTime = performance.now();
let timeTaken = endTime - startTime;
console.log(`SpotOn finished loading in ${timeTaken.toFixed(2)} ms.`);