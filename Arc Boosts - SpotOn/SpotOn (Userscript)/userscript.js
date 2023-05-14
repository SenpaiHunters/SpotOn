// ==UserScript==
// @name          SpotOn
// @namespace     https://github.com/SenpaiHunters/SpotOn
// @icon          https://user-images.githubusercontent.com/103985728/235338288-be1251b1-0074-4560-9c02-bff7bacef367.png
// @description	  SpotOn, a browser extension for Spotify (in this case, a userscript). There is a lot, this includes various visual enhancements such as animation effects, rounded album covers and hover animations, as well as functional improvements such as a dynamic theme that responds to the album art and an auto-lyric search feature on Genius, rainbow controls, and more to discover.
// @author        Kami
// @version       0.9.2
// @match         http://open.spotify.com/*
// @match         https://open.spotify.com/*
// @match         http://*.open.spotify.com/*
// @match         https://open.spotify.com/*
// @match         https://genius.com/songs/new
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require       https://greasyfork.org/scripts/406698-geniuslyrics/code/GeniusLyrics.js
// @updateURL     https://github.com/SenpaiHunters/SpotOn/blob/Main/SpotOn%20-%20Non%20hidden%20menu%20bar.js
// @downloadURL   https://github.com/SenpaiHunters/SpotOn/blob/Main/SpotOn%20-%20Non%20hidden%20menu%20bar.js
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
 * # What is SpotOn?
 *
 * SpotOn is a complete overhaul of Spotify Web Player's design that includes a customisable new font, a bolded/more prominent menu bar,
 * a redesigned hidden Now Playing Bar (scroll down to see it, want to see how it looks, look above), a changeable time to the right of the progress bar
 * (Refer to the GitHub), a blured backdrop, rainbow controls (These can be turned off simply by removing the command line)
 * a hidden Spotify Logo (Can be turned back on), removal of the bottom content bar, that hosts the social links of Spotify.
 * Captialsation of the first letter (can turn off by removing first-letter {", " text-transform: uppercase !important;}",.
 * But try it before you remove it, you might like it!)
 *
 * # How do i use SpotOn?
 * SpotOn needs the usage of Spotify Web Player and is not supported by Spotify's app. To be clear, only Spotify Web Player supports it.
 * This is incompatible with the installed app.
 * If i get enough popularity i may look into a way of porting it to the app. But, that's very unlikely, and very time consuming.
 *
 * # SpotOn's supported platfroms?
 * SpotOn is a complete userscript/javascript, which means you, the user, may customise anything!
 * The majority of the script is labelled with // (entry) or "//", but not all of it.
 * You'll need to Command + F (Find) some of these by typing the name out; I'm currently going over this and adding entries to the script.
 *
 * Chrome - ✅
 *
 * Arc - ✅
 *
 * Firefox - ✅
 *
 * Orion - ✅*
 *
 * Opera GX - ✅
 *
 * = Slower performance than chrome based web browsing.
 * ✅ = Supportation of Windows + Mac , there are no required system requirements as it’s simply a userscript/javascript, however, low-end hardware may face some performance drops or lower than expected speed
 *
 *
 * # Install
 * Install Tampermonkey, Violentmonkey or Greasemonkey
 * Follow the guide on https://github.com/SenpaiHunters/SpotOn#Install-link
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
 */

(function SpotOnMainSkin() {var css = [
	"/* Version 0.7 */",
	"",
  	"/* Before we get started, I like to seprate my CSS code by //x2 & by adding this context menu! */",
	"/* This Userscript is made by Kami, check out my socials~~ I also create AMVs, check it out here --> https://www.youtube.com/@Kami_YT */",
	"/* This code gets updated on Github (github.com/senpaihunters/spoton); I'm still looking how to embed the actual install like people have ~~~ */",
	"",
  	"/* TO DO! */",
  	"/* Redo full CSS, finish search and sort, remove unneeded items, redo fonts, update names, include more description */",
  	"/* Restructure code, overhaul the code to inprove the function and provide extra support */",
    //
    //
    "/* Release Notes 0.7 */",
    "/* Added ability to click on the icon of an album and add it to the Queue, Go to playlist radio, Add to profile, Report ",
    " Remove from Your Library, Exclude from your taste profile, About recommendatiations ",
    " Fixed overscrolling Issue, redid the `connect to a device`, changed colour of the play icon for arc browsers (fallback for others) ",
    " Redid Genius Intergration's `options` menu, added the icon to be constant now, ability to copy the lyrics shown ",
    " Increased speed of Hoykey activation(s), fixed spacing issue for album names, added more context, removed outdated code ",
    " Added back the device streaming to bar, just scroll down to see it- Fixed the pausing when changing decvies and or reloading the page, ",
    " this means, when playing Spotify on say your Phone, if you reload the webpage your Phone will not automatically pause, it was an annoying bug ",
    " Rounded the popup menu, faster speeds now! woo! Faster transition times when changing songs, 0.3 seconds faster to be exact! ",
    " Fixed a bug where the menu bar wouldn't hide, this is now fixed, however, you need to select the bar (when collapsed) at the top or bottom ",
    " No longer from the middle sadly. Rounded the now playing song in album view (looks much better now), made it pop-out a slight bit more then ",
    " normal songs would, so you can see what's playing FAST! (it also looks better) When highlighting over a song it will pop-out, more little tweaks ",
    "*/",
    //
    //
    "/* Change the URL and Name for any font you'd like */",
	"/* Font Face + New font */",
    " @font-face {",
    " font-family: 'Akronim';",
    " src: url('https://fonts.googleapis.com/css2?family=Akronim&display=swap');",
    " import url('https://fonts.googleapis.com/css2?family=Akronim&display=swap');",
    " } ",
    " h1, h2, .link-subtle {",
	" font-family: 'Akronim', cursive !important;",
	" font-weight: normal !important;",
	"}",
	"",
    " body {",
    " font-family: 'Akronim', cursive !important!;",
    " } ",
	".mo-info-name {",
	" font-family: 'Akronim'; ",
	"    font-weight: normal !important;",
    " } ",
	"",
    " body, body.login, body.login *, .SearchInputBox__input, .jf2HafzDEI9jn7Yo05eM, .kohoVM,  .inputBox-input, .PlaylistRecommendedTracks__top .PlaylistRecommendedTracks__title, .jdSGNV, .RP2rRchy4i8TIp1CTmb7, .MyW8tKEekj9lKQsviDdP, .gHImFiUWOg93pvTefeAD, .dXoLvE, .HcA9WjbLc4x02X8Ty0uO.lro6AjUrZFH6zxjmOGg0>* {",
	"    font-family: Akronim;",
	"    src: import url(https://fonts.gstatic.com/s/akronim/v23/fdN-9sqWtWZZlHRpygl7kXQO6a5IYA.woff2) format('woff2');",
	"}",
	"* {",
	"    text-decoration: auto;",
	"    border: none !important;",
	"    word-wrap: break-word;",
    " } ",
    "",
	"/* First letter captial (first-letter) */",
	" :root { ",
	"    --firstLsize: 1.50em;",
    " } ",
    " .navBar-group-header::first-letter, .navBar-item .type::first-letter {",
	"    text-transform: capitalize;}",
	"",
	" .navBar-group-header, .navBar-item .type {",
	"    letter-spacing: 0.6px;",
	"    text-transform: lowercase !important;",
	"    font-size: 12px;}",
	"",
    ".playback-bar__progress-time::first-letter{",
	"    color: var(--arc-palette-cutoutColor, #000) !important}",
	"",
    ".mo-info::first-letter, *::first-letter, *:focus::first-letter, *:hover::first-letter {",
	"    font-size: var(--firstLsize) !important;}",
	"",
	".RecentlyPlayedWidget__type {",
	"    color: #b3b3b3 !important;",
	"    text-transform: lowercase !important;}",
	"",
	".RecentlyPlayedWidget__type::first-letter {",
	"    text-transform: uppercase !important;}",
	"",
    ".btn.btn-green.cta-button::first-letter, .btn.btn-black.btn-small::first-letter, .btn.btn-green::first-letter, .btn.btn-black::first-letter, .btn.btn-black:hover::first-letter, .btn.btn-fg-green::first-letter, .btn.btn-transparent::first-letter, .btn.btn-blue.btn-small::first-letter, .btn-landing.btn-white::first-letter, .btn-landing.btn-green::first-letter, .btn.btn-sm.btn-block.btn-facebook.ng-binding::first-letter, .btn.btn-sm.btn-block.btn-green.ng-binding::first-letter, .ResponsiveViewMoreButton__button::first-letter, .btn.btn-white::first-letter {",
	"    font-size: var(--firstLsize) !important;",
	"    text-transform: capitalize;",
	"    position: relative;}",
    "",
    "/* END */",
    //
    //
	"/* Hides selected items */",
    "/* Items include, Spotify logo, Install app, content bar, resizer and more */",
    " .fwTMCeAaUoWDj9WcQbgy, .eCtSle, .NyIynkmMpZXSoaE3XGhA, .HImFiUWOg93pvTefeAD, .xYgjMpAjE5XT05aRIezb, .HsbczDqu9qjcYr7EIdHR, .LKFFk88SIRC9QKKUWR5u, .main-view-container__scroll-node-child-spacer {",
    " visibility: hidden !important;",
    " position: fixed !important;",
    " } ",
    " .fGuZQO {",
    " display: hidden !important;",
    "}",
    " .eCtSle, .main-view-container__mh-footer-container, .main-view-container__scroll-node-child-spacer {",
    " display: none !important;",
    " } ",
    " #main .Root .Root__top-container .main-view-container--has-ads .ads-container, .AdsContainer, .iYuun6jjV82lsYbccJVS, .dz_h98rH9nZCwfPdnKgr {",
	" display: none !important;",
    " } ",
    "",
    " .onetrust-pc-dark-filter.ot-hide, #onetrust-consent-sdk #onetrust-banner-sdk, #onetrust-banner-sdk.otFlat {",
    " display: none !important;",
    " } ",
    " ._1pVwzxv-TDj4dEFi0N3B-_ .btn.btn-transparent  {",
	" display: none; !important",
    " } ",
    " .EmptyState__title {",
	"    font-size: 30px;",
	"    display: none",
    " } ",
	"",
	" .EmptyState__subtitle {",
	"    margin-top: -10px;",
	"    font-size: 20px;",
	"    color: #fff;",
    " } ",
    " .spoticon-track-16, .spoticon-podcasts-16::before {",
	"    display: none;}",
    "",
    "/* Hide spotify logo */",
	".logo path {",
	"	display: none;",
	" } ",
	"/* remove space */",
	" .navBar-header {  ",
	"  height:0px;",
	"  padding:0px;",
    " display: none !important;",
	" } ",
    "/* Stop */",
    //
    " /* Hover */",
    "div.Root__top-container > nav > div.tUwyjggD2n5KvEtP5z1B > ul > li {",
     " transition: all 0.1s ease-in-out;",
    " }",
    "/* highlight current selected playlist in sidebar */",
    ".selected-playlist {",
     " border: 2px solid var(--arc-palette-hover) !important;",
      " border-radius: 1px solid var(--arc-palette-minContrastColor, pink) !important;",
      " margin: 0 1.25rem;",
    "}",
 "",
    "/* fade effect (top and bottom of scrollable list of playlists) */",
    ".Y8edH1Yjo4xrW_58czQj::after {",
     " content: ;",
      "position: absolute;",
      "top: 2px;",
      "left: 0;",
      "width: 100%;",
      "height: 1.75rem;",
      "background: transparent);",
    "}",
    //
	"/* Site-wide text shadow */",
    " #main { ",
	"    text-shadow: 2px -1px 0px #333 !important;",
    " } ",
    "",
    " .kpGMQq1KFz620g_BD_dS {",
    " text-shadow: 0px 0px 0px #333 !important;",
    " } ",
    "/* END */",
    //
    //
    "",
    " /* Play/Pause Icon */ ",
    "/* Arc page colour effects this state! Change slides to see the colour change too */",
    " .encore-dark-theme .encore-bright-accent-set {",
    " --background-highlight: var(--arc-palette-minContrastColor, rgba(120,123,133,0.1)) !important",
    " } ",
    "",
    "/* END */",
    //
    //
    "/* Content Menu(s) */",
    " .SboKmDrCTZng7t4EgNoM {",
    " border-radius: 32px !important",
    " } ",
    "",
    " .hwP4Oum2PB765sb8jigI, .HVCCFeUiHVwZVv74p34a, .zi377dMLSwXnFiejYnRa {",
    " border-radius: 0px !important",
    " margin: 0 0px #000 !important",
    " padding: 0 0px #000 !important",
    " } ",
    "",
    " .DG9CsoFIptJhAneKoo_F { ",
    " margin-top: -105px; ",
    " margin-bottom: 26px; }",
    "",
    " .ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi[aria-colcount='5'] .wTUruPetkKdWAR1dd6w4 {",
    " border-radius: 32px !important",
    " } ",
    // Dev note - .h4HgbO_Uu1JYg5UGANeQ -- .wTUruPetkKdWAR1dd6w4
    // Song list thing, tracklist? idk something
    "/* END */",
    "",
    //
    //
	"/* Overscroll Issue Fix */",
    // scrollbar-macos
    " .spotify__os--is-macos {",
    " --scrollbar-vertical-size: 10px !important",
    " --scrollbar-horizontal-size: 10px !important",
    "}",
    // Overscroll
    " :root, #main, .root, .main-view-container__scroll-node-child {",
    " -webkit-overscroll-behavior: none !important;",
    " -ms-overscroll-behavior: none !important;",
    " overscroll-behavior: none !important;",
    " } ",
    "",
    " html.spotify__container--is-web body, .main-view-container__scroll-node-child, .fhrvNw, .qJOhHoRcFhHJpEQ2CwFT.koyeY6AgGRPmyPITi7yO, .uV8q95GGAb2VDtL3gpYa, .bk509U3ZhZc9YBJAmoPB, .aCtCKL9BxAoHeVZS0uRs, .pHrwZOFBdT8FNXnmcPPI, .RP2rRchy4i8TIp1CTmb7, .lXcKpCtaEeFf1HifX139, .main-view-container__scroll-node-child, .main-view-container__scroll-node-child-spacer, .lXcKpCtaEeFf1HifX139, .MyW8tKEekj9lKQsviDdP, .gHImFiUWOg93pvTefeAD {",
    " -webkit-overscroll-behavior: none !important;",
    " -ms-overscroll-behavior: none !important;",
    " overscroll-behavior: none !important;",
    " } ",
    "",
    " .os-viewport, .os-theme-spotify .os-viewport, .os-host-overflow>.os-padding, .os-viewport {",
    " margin-bottom: 10px;",
    " } ",
    "",
    "/* END */",
    //
    //
    "/* Root_main-view - everything containing 'main view' - excluding below's album art background */",
    ".Root__main-view { ",
    " width: -webkit-fill-available; ",
    " top: auto;",
    "}",
    "",
    " .Root__main-view .container-fluid{",
	"    margin-left:30px !important;",
	"    margin-right:30px !important;",
    " } ",
    //
    //
    "/* contentspacing -- Fixes display not using the maxium size -- No matter the size, it will always take up the max size! */",
    " .contentSpacing {",
    " max-width: -webkit-fill-available !important;",
    " } ",
    "",
	"",
    "/* Nav Bar */",
    " .beQQox;",
    " color: #333 !important;}",
    // main now playing menu bar sub
	".Root__now-playing-bar {",
    " tUwyjggD2n5KvEtP5z1B background: blur(30px); !important;",
	"    position: relative;",
    // change pos for menu bar layout
	"    height: 1px;",
	"    width: calc(100% - 50px);",
	"    top: 3px; ",
	"    left: -12px; ",
	"    padding-right: 10px !important;",
	"    margin-bottom: 50px;}",
	"",
   // Now plaing menu bar - boxed size change
	".Root__now-playing-bar {",
    // see below nav bar colour for infomation on how to change this! (Markdown - SLS)
		"    background: linear-gradient(to right, rgba(255,192,203,0.1) 0%  ,rgba(255,192,203,0.1) 45% ,rgba(255,192,203,0.1) 55%,rgba(255,192,203,0.1) 65%, rgba(255,192,203,0.1) 100%) !important;",
    // pink - background: linear-gradient(to right, rgba(255,192,203,0.1) 0%  ,rgba(255,192,203,0.1) 45% ,rgba(255,192,203,0.1) 55%,rgba(255,192,203,0.1) 65%, rgba(255,192,203,0.1) 100%) !important;",
	  "    border-left: 120px solid rgba(0,0,0,.01) !important;",
	 "    border-radius: 50px !important;  ",
	  "    box-shadow: 16px 5px 10px -7px rgba(0,0,0,1), -7px 5px 10px -7px rgba(0,0,0,1), 3px 3px 4px #000, 0px 0px 2px #000;",
	    "    height: 98px;",
    // height of the box ( downwards )
	"    padding: 2px 4px;}",
	"",
    // Left side bar - boxed size change
	".Root__nav-bar {",
    // left nav bar colour - do background: transparent for no colour, but i like that little pink hue.
	"    background: linear-gradient(to right, rgba(255,192,203,0.1) 0%  ,rgba(255,192,203,0.1) 45% ,rgba(255,192,203,0.1) 55%,rgba(255,192,203,0.1) 65%, rgba(255,192,203,0.1) 100%) !important;",
	"    border-left: -1px solid rgba(0,0,0,.2) !important;",
	"    border-radius: 99px 99px 99px 99px !important;",
	"    border-right: -1px solid rgba(255,192,203,0.3) !important;",
	"    border-radius: 22px !important;  ",
	"    box-shadow: 10px 8px 10px -7px rgba(0,0,0,1), -7px 5px 10px -7px rgba(0,0,0,1), 3px 3px 4px #000, 0px 0px 2px #000;",
    // moves the left bar up or down
	"    margin-top: 65px !important;",
	"    height: calc(100% - 85px) !important;",
    // if you want it fully off to the left side, remove overflow-x
	"    overflow-x: none;}",
	"",
	".recently-played.navBar-group {",
	"    margin-top: 10px !important;",
	"    margin-bottom: 20px !important;}",
	"",

     // Mics Nav bar
	"",
    "",
	".navBar-item .download-icon {",
	"    height: 36px !important;",
	"    width: 36px !important;",
	"    top: -3px !important;",
	"    margin-left: 140px !important;}",
	"",
	".navBar-item .playing-icon {",
	"    margin-right: -8px !important;}",
	"",
	".navBar-item--with-icon-left {",
	"    padding-left: 0px !important;}",
	"",
	"[dir=\"ltr\"] .navBar-item--with-icon-left .navbar-link__text {",
	"    margin-left: -155px !important;}",
	"",
	".sessionInfo  {",
	"    margin-bottom: -90px !important;}",
	"",
	"a.btn.btn-fg-green{",
	"    padding-top: 2em !important;",
	"    padding-bottom: 2em !important;}",
	"",
	".btn.btn-fg-green {",
	"    padding-top: 2em !important;",
	"    padding-bottom: 2em !important;}",
	"",
	".middle-align.progress-bar__slider {",
	"    transform: scale(.7) !important;",
	"    border: 0px solid rgb(0,0,0,1) !important;",
	"    background: radial-gradient(at left top, rgba(255,255,255,1), var(--playCol), rgba(0,0,0,1))!important;}",
	"",
	".volume-bar .middle-align.progress-bar__slider {",
	"    border: 0px solid rgb(30,30,30) !important;}",
	"",
	".now-playing-bar__right__inner {",
	"    padding-right: 6px !important;}",
    // inner right padding for menu bar
	"",
	".accountPage .icon, .downloadPage-inner {",
	"    margin-top: 50px;}",
	"",
    // Nav bar
    " .tUwyjggD2n5KvEtP5z1B {",
    " cursor: auto; ",
    // for flex direction change colum to colum-reverse to reverse the look (album art top, home, search & your libary at the bottom)
    " min-height: -webkit-fill-available !important; ",
    " height: -webkit-fill-available !important:",
    " width: -webkit-fill-available !important;",
    " padding-top: 20px !important;",
    "}",
    // Top album words - Like 'Liked Songs' and other large words
    " .fhrvNw, .rEN7ncpaUeSGL9z0NGQR, Fb61sprjhh75aOITDnsJ {",
    "  font-size: 3rem !important;",
    "  display: table-column !important;",
    "  text-align: -webkit-match-parent !important;",
    "  font-family: auto !important",
    "  margin-top: auto !important",
    "  width: -webkit-fill-available !important",
    " } ",
    "",
    "/* END */",
    //
    //
    " /* Album art/ everything about it*/",
    // now playing widget -- .deomraqfhIAoSB3SgXpu
    // dev note - .P4eSEARM2h24PZxMHz1T = middle player -- .jOKLc29vP0Bz1K0TsDtX = right player
    "",
    ".now-playing__cover-art {",
	"    transform: scale(1.18)!important;",
	"    box-shadow: 3px 3px 8px rgba(0,0,0,1) !important;",
	"    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) !important;}",
	"",
	".now-playing__cover-art:hover {    ",
	"    transform: scale(5) translate(13px, 22px) !important; ",
	"    transition: all 1000ms cubic-bezier(0.500, 0.000, 0.900, 1.700) !important;}",
	"",
	".cover-art {",
	"    transition: all 300ms ease-in-out!important;",
	"    background-color: rgba(28,28,28,.6) !important;}",
	"",
	".media-object-hoverable:hover .cover-art {",
	"    transform: scale(1.00)!important;",
	"    transition: all 100ms ease-in-out !important;",
	"    box-shadow: 3px 3px 8px #000, 0px 0px 5px #000;",
	"    background-color: rgba(28,28,28,.8) !important;}",
	"",
	".media-object-hoverable:hover .cover-art:active {",
	"    transform: scale(.99)!important;",
	"    transition: 0ms !important;",
	"    box-shadow: none;}",
	"",
	".media-object .media-object-hoverable .cover-art-playback:active{",
	"    transform: scale(.9)!important;}",
	"",
	".cover-art-image.cover-art-image-loaded {",
	"    box-shadow:3px 3px 6px #000, 0px 0px 3px #000;}",
    //
      "",
    " .RP2rRchy4i8TIp1CTmb7 {",
    " justify-content: center;",
    " counter-increment: inherit;",
    " background-size: cover;",
    " inline-size: fit-content;",
    " } ",
	"",
    //
    //
    " /* Full @media controls -- don't mind these - For devide sizing etc */",
    // Max size
	" @media (min-width: 1600px) {",
	"._11pfm-p6kRU6CrLDyLhi3a a, .asideButton-container a {",
	"    text-align: center !important;",
	"    margin-left: 0px !important;",
	"    width: 200px !important;}",
	".asideButton-container .asideButton{",
	"    margin-left: 0 !important;}}",
	"",
    // Min size
	" @media (max-width: 2160px) {",
	"._11pfm-p6kRU6CrLDyLhi3a a, .asideButton-container a {",
	"    text-align: center !important;",
	"    margin-left: -30px !important;",
	"    width: 180px !important;}",
	".asideButton-container .asideButton{",
	"    margin-left: 0 !important;}}",
	"",
    // Changes the whole NPB Bar boxed outline left or right
    // Change 'left' value higher to move right, lower that value to move left.
	"@media (min-width: 1700px) { ",
	"#main .Root .Root__now-playing-bar {",
	"    position: relative;",
    "    width: calc(100% - 30px);",
	"    left: 14px;",
    "  } ",
    " } ",
	"",
	"@media (max-width: 2160px) { ",
	".now-playing-bar__center {",
	"    margin-left: 12%;",
    "  } ",
    " } ",
	"",
    // Max width
	"@media (max-width: 2200px) { ",
	".container-fluid.ArtistAbout__container {",
	"    width: calc(100% - 60px) !important;",
	"    margin-left: 30px !important",
    "  } ",
    " } ",
	"",
    // Min Width
	"@media (min-width: 2200px) { ",
	".container-fluid.ArtistAbout__container {   ",
	"    width: calc(100% - 60px) !important;",
	"    margin-left: 30px !important;",
    "  } ",
    " } ",
	"",
    // Max adjustment width
	"@media (max-width: 2200px) {",
	".ArtistAbout__insights {",
	"    float: right !important;",
	"    flex: 2 !important;",
    "  } ",
    " } ",
	"",
    "@media (min-width: 1700px) {",
	"[dir=\"ltr\"] .navBar-item--with-icon-left .navbar-link__text {",
	"    margin-left: -175px !important;}}",
	"",
	"@media (max-width: 2160px){",
	"section.content.artist div div.container-fluid.ArtistAbout__container {",
	"    margin-right: 15px !important;",
	"    width: calc(100% - 30px);} ",
	".navBar-item .collection-icon, .navBar-item .collection-active-icon, .navBar-item .home-icon, .navBar-item .home-active-icon, .navBar-item .search-icon, .navBar-item .search-active-icon {",
	"    margin-left: 130px !important;}",
	".navBar-item .download-icon {",
	"    margin-left: 120px !important;}",
	".navBar-item .playing-icon {",
	"    margin-right: 8px !important;}}",
	"",
	"@media (min-width: 1700px) {",
	"section.content.artist div div.container-fluid.ArtistAbout__container {",
	"    margin-right: 60px !important;",
	"    width: calc(100% - 150px);}}",
	"",
	"@media (max-width: 2160px) { ",
	".Root__nav-bar {   ",
	"    width:200px;",
	"    margin-left: 20px !important;}}",
	"",
	"@media (min-width: 1700px) { ",
	".Root__nav-bar {   ",
	"    margin-left: 30px !important;}}",
    "",
    " */-- END - There still are @media(s) but they belong to the above elements these are stand alone --/* ",
	"",
    //
    //
    "/* Now Playing Bar (NPB) */",
    " .playback-bar *, .w699O0LgQRghXyl3bs9u, .TywOcKZEqNynWecCiATc, .p1ULRzPc4bD8eQ4T_wyp {",
    " --is-active-fg-color: #000 !important",
    " color: var(--arc-palette-cutoutColor, #000) !important",
    " --progress-bar-height: 6px !important",
    " background-color: var(--arc-palette-cutoutColor, #000) !important",
    " } ",
    "",
	"",
    "/* END */",
    //
    //
    " /* Artist page art/ everything about it*/",
    " .MyW8tKEekj9lKQsviDdP.k2I8B0MzXkAJ6_s8okM7 {",
    " opacity: 0.7 !important",
    " border-top-left-radius: 25px !important",
    " } ",
    // Artist' about
	".container-fluid.ArtistAbout__container {",
	"    background: backdrop-filter: blur(5px); !important;",
	"    border: 12px solid var(--line) !important;",
	"    border-left: 1px solid rgba(48,48,48,.2) !important;",
	"    border-right: 1px solid rgba(38,38,38,.2) !important;",
	"    box-shadow: 9px 5px 10px -7px rgba(0,0,0,1), -7px 5px 10px -7px rgba(0,0,0,1), 3px 3px 4px #000, 0px 0px 2px #000;",
	"    border-radius: 4px !important;",
	"    margin-top: 20px;",
	"    margin-bottom: 0px !important;}",
	"",
    // View header
	"header.artist-header, .view-header {",
	"    padding-left: 20 !important;",
	"    margin-top: 20px !important;",
	"    background: var(--barCol60);",
	"    background-blend-mode: multiply;",
	"    border: 1px solid var(--line) !important;",
	"    border-left: 1px hidden !important;",
	"    border-right: 1px hidden !important;",
	"    box-shadow: 9px 5px 10px -7px rgba(0,0,0,1), -7px 5px 10px -7px rgba(0,0,0,1), 3px 3px 4px #000, 0px 0px 2px #000;",
	"    border-radius: 4px !important;}",
	"",
	"@media screen and (-webkit-min-device-pixel-ratio:0) {",
	"header.artist-header, .view-header {",
	"    margin-left: 25px !important;",
	"    width: calc(100% - 45px) !important;",
	"    padding-left: 75px !important;}}",
	"",
	"@media all and (min--moz-device-pixel-ratio:0) {",
	"header.artist-header, .view-header {",
	"    margin-left: 25px !important;",
	"    width: calc(100% - 55px) !important;",
	"    padding-left: 75px !important;}}",
	"",
	" .view-header {",
	"    height: 340px !important;}",
	"",
	" @media (min-width: 1700px) {",
	" .UserWidget__user-avatar { ",
	"    float: right; ",
	"    right: 8px;}}",
	"",
    " .uhDzVbFHyCQDH6WrwZaC _ejNsts52hRqOuZcc_NXi {",
    " max-width: 774px;",
    " } ",
    "",
    " ejNsts52hRqOuZcc_ NXi {",
    " padding: • 21px;",
    " } ",
	".asideButton-container ._11pfm-p6kRU6CrLDyLhi3a {",
	"    margin-left: 13.25%;}",
	"",
	"._11pfm-p6kRU6CrLDyLhi3a {",
	"    margin-left: -200px !important;}",
	"",
	".asideButton {",
	"    top: 4px;}",
	"",
	"",
    " / * Text alignment / *",
    " .wCkmVGEQh3je1hrbsFBY {",
    " text-align: center !important;",
    " } ",
    "",
    "",
    //
    //
    "/* Logo */",
	" .logo svg {",
	"    border-radius: 100% !important;",
	"    padding-top: 1px;",
	"    padding-bottom: 1px;",
	"    background: radial-gradient(ellipse at center, rgba(255,255,255,.26) 10%, rgba(255,255,255,.22) 30%, rgba(100,100,100,.15) 65%,rgba(0,0,0,0) 79%);",
	"    box-shadow: inset 0px 0px 10px 5px rgba(0, 0, 0, .3), inset 0px 0px 25px 1px rgba(0,0,0, 0.3) ;",
	"    border-left: 3px solid rgba(0,0,0,1) !important;",
	"    border-right: 3px solid rgba(0,0,0,1) !important;",
	"    -webkit-animation:  rotater 80s infinite linear, frameFlicker 60s infinite linear ;",
	"    -webkit-backface-visibility: hidden;",
	"    -webkit-perspective: 1000;",
	"    image-rendering: optimizeQuality !important;}",
	"",
	" .logo svg:active {",
	"    background: radial-gradient(ellipse at center, rgba(200,200,200,.15) 10%, rgba(200,200,200,.14) 20%, rgba(200,200,200,.20) 40%,rgba(255,255,255,.15) 65%,rgba(255,255,255,0) 79%);",
	"    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .75), 0px 0px 20px 1px rgba(255, 255, 255, .15), inset 0px 0px 10px 5px rgba(0, 0, 0, .35), inset 0px 0px 25px 1px rgba(0,0,0, 0.35)!important;",
	"    border-left: 3px solid rgba(0,0,0,1)  !important;",
	"    border-right: 3px solid rgba(0,0,0,1)  !important;",
	"    border-color: var(--marker) !important;",
	"    image-rendering: optimizeSpeed !important;}",
	"",
    " .Root__nav-bar .logo {",
	"    width: calc(100%) !important;",
	"    transition: all 1000ms ease-in !important;",
	"    transform: scale(1.6) !important; ",
	"    text-align: center !important;",
	"    opacity: 0.75 !important;}",
	"",
	" section.content.album.contentSpacing .col-xl-8, section.content.playlist.contentSpacing .col-xl-8 {",
	"    padding-top: 45px !important;} ",
	"",
	" .logo:hover {",
	"    opacity: 1 !important;}",
	"",
	" .navBar-header .logo {",
	"    padding: 27px;",
	"    margin-bottom:20px;}",
	"",
	" @media (max-width: 2160px) {",
	" .navBar-header .logo {",
	"    margin-left: -27px;}}",
	"",
    "/* END */",
    //
    //
    "/* 'Something Went Wrong' -- At least make it pretty! */",
    " .KIbfbFDao0SHpZsKoKZD {",
    " border-radius: 32px !important",
    " } ",
    "",
    "/* END */",
    //
    //
    "/* Tracklist */",
	" .tracklist-row {",
	"    margin-bottom: 7px !important; ",
	"    height: 40px !important;",
	"    border: 1px solid transparent !important;}",
	"",
	" .tracklist-name.ellipsis-one-line{ ",
	"    width: 49% !important;}",
	"",
	".track-name-wrapper .second-line   {",
	"    float: right !important; ",
	"    text-overflow: ellipsis !important;",
	"    white-space: nowrap!important;",
	"    overflow: hidden!important;",
	"    width: 50% !important;",
	"    right: 0px !important;",
	"    bottom: 23px !important;}",
	"",
	" .TrackListRow__explicit-label {",
	"    background: rgba(255,255,255,.2) !important;",
	"    color: inherit !important;",
	"    margin-right: 16px !important;}",
	"",
	" .tracklist-row.tracklist-row:hover {",
	"    font-size: .9rem;",
	"    color: var(--hoverCol) !important;",
	"    border: 1px solid #00364d !important;",
	"    border-bottom: 1px solid #002233 !important;",
	"    background: linear-gradient(to top, #002233 0%, #00334d 100%) !important; ",
	"    box-shadow: 3px 3px 4px #000, 0px 0px 2px #000 !important;  ",
	"    border-radius: 4px !important;}",
	"",
	" .tracklist-row.tracklist-row--active {",
	"    height: 40px !important;",
	"    font-size: 1rem !important;",
	"    color: var(--playCol) !important;",
	"    border: 1px solid #00364d !important;",
	"    border-bottom: 1px solid #002233 !important;",
	"    background: linear-gradient(to top, #002233 0%, #00334d 100%) !important; ",
	"    box-shadow: 3px 3px 4px #000, 0px 0px 2px #000 !important;  ",
	"    border-radius: 4px !important;}",
	"",
    " .tracklist-row .tracklist-play-pause:not(.disabled):active, .tracklist-row:not(.disabled):active .icon-play, .icon-pause {",
	"    padding: 0}",
    ".track-name-wrapper.ellipsis-one-line.tracklist-top-align {",
	"   background: backdrop-filter: blur(5px); !important;}",
	"",
	" .tracklist-container {",
	"    font-size: .9rem;}",
	"",
	" LI[class=\"tracklist-row\"][role=\"button\"][tabindex=\"0\"] {",
	"    background: transparent;}",
	"",
	" .tracklist-row.tracklist-row--active {",
	"    line-height: 24px !important;}",
	"",
	" .tracklist-row.tracklist-row .position { ",
	"    margin-bottom: 4px !important;}",
	"",
	" .tracklist-row .tracklist-col.name .track-name-wrapper .artists-album { ",
	"    display: inline; ",
	"    padding-left: 20px;}",
	"",
	" .track-name-wrapper .tracklist-row__album-name-link, .track-name-wrapper .tracklist-row__artist-name-link {",
	"    font-size: 1rem !important;",
	"    color: rgba(255,255,255,.7) ;",
	"    opacity: 1 !important;}",
	" ._2NmuSzp6vWIr47yUIVCgdY {",
	"    width: 100%;",
	"    padding: 0 30%;",
	"    background-color: transparent;}",
	"",
	" .tracklist-row.tracklist-row--oneline, .tracklist-row.tracklist-row--oneline .tracklist-col { ",
	"    height: 3rem;}",
	"",
    " .tracklist-col-recommended-add {",
	"    padding-left: 1em !important;",
	"    -webkit-box-align: baseline;",
	"    align-items: baseline;}",
	"",
	" .tracklist-col-recommended-add .btn.btn-black.btn-small {",
	"    font-size: 1em !important;",
	"    width: 135px !important;",
	"    margin-left: 0em !important;",
	"    padding-top: .6em !important;",
	"    padding-bottom: 1.4em !important;",
	"    background: transparent !important;",
	"    box-shadow: none !important;",
	"    border: none !important;}",
	"",
	" .tracklist-col-recommended-add .btn.btn-black.btn-small:not(active):hover {",
	"    font-size: 1.28em !important;",
	"    color: #fff !important;}",
	"",
    " .user-info.col-md-12 figure.avatar.user-avatar {",
	"    width: 130px !important;",
	"    height: 130px !important;",
	"    background: url(\"https://image.ibb.co/gmAKaf/256.png\") center !important;",
	"    background-size: 127px 127px !important;",
	"    image-rendering: optimizeQuality !important;",
	"    -webkit-animation: rotater 30s infinite linear ;}",
	" .tracklist-row--active .tracklist-col.position-outer,",
	" .tracklist-row:hover .tracklist-col.position-outer {",
	"    margin-top: -1px !important;}",
	"",
	" .tracklist-row.tracklist-row--oneline",
	" .track-name-wrapper.ellipsis-one-line.tracklist-top-align {",
	"    margin-top: 7px !important;}",
	"",
	" .tracklist-top-align {",
	"    margin-top: 8px !important;}",
	"",
	" .tracklist-container .tracklist-col.position-outer,",
	" .tracklist-container:hover .tracklist-col.position-outer {",
	"    margin-top: 0px !important;}",
	"",
	" .tracklist-top-align .icon-pause{",
	"    transform: translateY(2px) !important;}",
	"",
	" .tracklist-top-align .icon-play {",
	"    transform: translateY(4px) !important;}",
	"",
	" .tracklist-row.tracklist-row .position {",
	"    opacity: 1 !important;}",
	"",
	" .tracklist-row.tracklist-row--oneline {",
	"    margin-top: -4px !important;}",
	"",
	" .tracklist-row.tracklist-row--oneline .tracklist-col {",
	"    margin-top: 0px !important;}",
	"",
	" .react-contextmenu-wrapper .tracklist-middle-align {",
	"    transform: translateY(-70%);}",
	"",
	" .tracklist-row.tracklist-row--oneline .btn.btn-transparent.btn--narrow.btn--no-margin.btn--no-padding {",
	"    margin-top: 20px !important;}",
	"",
	" .tracklist-row.tracklist-row--active .second-line{",
	"    margin-top: -2px !important;}",
    "",
    "/* END */",
    //
    //
	".btn.btn-green.cta-button, .btn.btn-black.btn-small, .btn.btn-green, .btn.btn-black, .btn.btn-black:hover, .btn.btn-fg-green, .btn.btn-transparent, .btn.btn-blue.btn-small, .btn-landing.btn-white, .btn-landing.btn-green, .btn.btn-sm.btn-block.btn-facebook.ng-binding, .btn.btn-sm.btn-block.btn-green.ng-binding, .btn.btn-white._3zghGNfKZCH7FVEyqNY3my, button.btn.btn--no-margin.btn--full-width.P7Qjj40AVoE8Igi7Ji05m._1xNlj_ScH8hEMWzrkRt1A, .ResponsiveViewMoreButton__button, .btn.btn-white {",
	"    font-size: 21px !important;",
	"    font-weight: 400 !important;",
	" } ",
	"",
	".btn.btn-green.cta-button:hover, .btn.btn-black.btn-small:hover, .btn.btn-green:hover, .btn.btn-black:hover, .btn.btn-black:hover, .btn.btn-fg-green:hover, .btn.btn-transparent:hover, .btn.btn-blue.btn-small:hover, .btn-landing.btn-white:hover, .btn-landing.btn-green:hover, .btn.btn-sm.btn-block.btn-facebook.ng-binding:hover, .btn.btn-sm.btn-block.btn-green.ng-binding:hover, .ResponsiveViewMoreButton__button:hover, .btn.btn-white:hover {",
	"    transition-property: color;",
	"    transition-duration: .2s;",
	"    transition-timing-function: linear;",
	"    color: hsla(0,0%,100%,1);}",
	"",
	".horizontal-list > button:nth-child(1) {",
	"    width: 160px !important;",
	"    margin-left: 0px !important;",
	"    margin-right: 10px !important;",
	"    padding-top: 0.7em !important;",
	"    padding-bottom: 1.3em !important;}",
	"",
	".btn--narrow .spoticon-ellipsis-24::before{",
	"    width: 0px;",
	"    margin-right: 23px !important;",
	"    margin-top: -4px !important;",
	"    padding-top: 0em !important;",
	"    padding-bottom: 2em !important;}",
	"",
	".btn.btn-black,.btn.btn-black:hover, .btn.btn-green, .btn.btn-transparent.btn-fg-green, .btn.btn-white {",
	"    width: 220px !important;",
	"    padding-top: 0.6em !important;",
	"    padding-bottom: 1.4em !important;}",
	"",
    "/* Search */",
	".search-history .btn.btn-black{",
	"    width: 300px !important;}",
	"",
	"@media (max-width: 2160px) {",
	".horizontal-list > button:nth-child(1) {",
	"    width: 160px !important;",
	"    margin-left: 0px !important;",
	"    margin-right: 10px !important;}",
	"",
	".btn--narrow .spoticon-ellipsis-24::before {",
	"    width: 0px;",
	"    margin-right: 23px !important;",
	"    margin-top: -4px !important;",
	"    padding-top: 0em !important;",
	"    padding-bottom: 2em !important;}}",
	"",
	".entity-info .spoticon-heart-24, .entity-info .spoticon-heart-active-24 {",
	"    padding-top: 0em !important;",
	"    padding-bottom: 2em !important;}",
	"",
	".header-buttons .spoticon-heart-24::before, .header-buttons .spoticon-heart-active-24{",
	"    margin-top: -5px !important;",
	"    padding-bottom: 2em !important;}",
	"",
	".btn.btn-green.cta-button{",
	"    padding-top: 0.6em !important;",
	"    padding-bottom: 1.4em !important;}",
	"",
	"",
	".btn:not(.disabled):focus, .btn:not(.disabled):hover, .btn-landing:not(.disabled):focus, .btn-landing:not(.disabled):hover, .ResponsiveViewMoreButton__button:focus, .ResponsiveViewMoreButton__button:not(.disabled):hover {",
	"    transition: all 100ms cubic-bezier(.3,0,0,1);",
	"    transform: scale(1);}",
	"",
	".btn:not(.disabled):active, .btn-landing:not(.disabled):active, .ResponsiveViewMoreButton__button:not(.disabled):active  {",
	"    transition: all 100ms cubic-bezier(.3,0,0,1) !important;",
	"    transform: scale(.9);}",
	"",
    ".OgkbKIVYE_mrNpYESylB {",
    " min-width: 180px;",
    " }",
    "",
	".content.ZI0UgbCT8bKeDxk-G9uhC, .hw-accelerate {",
	"    background: none!important;",
	"    content: \"\";}",
	"",
	"",
	".link-subtle.navBar-link.ellipsis-one-line,.user-link, .inputBox-input, .Vg0L1vwJXv5JSYn-HUx0C.link-subtle { ",
	"    font-weight: 400 !important;}",
	"",
	".Vg0L1vwJXv5JSYn-HUx0C.link-subtle, .Root__nav-bar a {",
	"    font-size: 1rem !important;}",
	"",
	".link-subtle.navBar-link.ellipsis-one-line {",
	"    font-size: 1rem !important;}",
	"",
	"@media (max-width: 2160px) {",
	".link-subtle.navBar-link.ellipsis-one-line, .user-link {",
	"    font-size: .9rem !important;}}",
	"",
    ".search-history li a h1, #main > DIV > DIV:nth-child(4) > DIV:last-child > DIV:first-child > SECTION > DIV > DIV > UL > LI > A > SPAN { ",
	"    font-size: 20px; ",
	"    font-weight: 100; ",
	"    color: var(--marker)!important;}",
	"",
    //
    //
    "/* Connect bar */",
	" .ConnectBar::after{",
	"    right: 113px !important;",
    "    display: hidden !important",
    "    overscroll: none",
    " } ",
	"",
	" .spoticon-devices-16.control-button.control-button--active,",
	" .connect-device-list-item--active, .connect-device-list-item--active .connect-device-list-item__device-subtitle, .connect-device-list-item--active .connect-device-list-item__icon {",
	"    color: var(--playCol) !important;",
    " } ",
	"",
	".connect-device-list-container {",
	"    background: linear-gradient(to bottom, #141414 0%,#292929 100%); ",
	"    border: 1px solid var(--line) !important;",
	"    border-left: 1px hidden !important;",
	"    border-right: 1px hidden !important;",
	"    box-shadow:3px 3px 4px #000, 0px 0px 2px #000; ",
	"    border-radius: 4px !important;",
	"    position: absolute;",
	"    width: 280px;",
	"    bottom: -400px;",
	"    right: -120px;",
    " } ",
	"",
	".connect-device-list-container::before {",
	"    content: none;",
    " } ",
	"",
	".react-contextmenu.react-contextmenu--visible {",
	"    background: linear-gradient(to bottom, #141414 0%,#292929 100%); ",
	"    border: 1px solid var(--line) !important;",
	"    border-left: 1px hidden !important;",
	"    border-right: 1px hidden !important;",
	"    box-shadow:3px 3px 4px #000, 0px 0px 2px #000; ",
	"    border-radius: 4px !important;",
    " } ",
	"",
	" .react-contextmenu-item:hover {",
	"    background: transparent !important;",
    " } ",
    " .ConnectBar, ._3pZQC_msqsNA7nsxYWWeGJ, .ITVPJxOvtLt7upeE1TV9- {",
	"    position: absolute;",
	"    max-width: 500px;",
	"    height: 50px;",
	"    top: 70px;",
	"    right: 30px;",
	"    margin-left: 60px;",
	"    padding: 3px 40px;",
	"    text-align: center !important;",
	"    line-height: 40px !important;",
	"    font-size: 1rem;",
	"    border: 1px solid rgba(29,185,84,1) !important;",
	"    border-radius: 10px !important;",
	"    background: rgba(0,0,0,.5) !important;",
	"    box-shadow:3px 3px 4px #000, 0px 0px 2px #000,  inset 0px 0px 5px #000;",
    " } ",
	"",
	".ITVPJxOvtLt7upeE1TV9- {",
	"    top: 80px;}",
	"",
	"._1pVwzxv-TDj4dEFi0N3B-_ .btn.btn-transparent  {",
	"    display: none;",
    " } ",
    "/* END */",
    //
    //
	".inputBox {",
	"    padding-top: 80px;",
	"    padding-left: 25px;}",
	"",
	"@media (max-width: 2160px) {",
	".inputBox {",
	"    margin-left: -25px ;}}",
	"",
	"@media (max-width: 2160px) {",
	".inputBox {",
	"    margin-left: -25px ;}}",
	"",
	".cover-art-playback {",
	"    opacity: 1;",
	"    transform: scale(1) !important;",
	"    padding-top: 4px; ",
	"    padding-bottom: 4px;}",
	"",
	".cover-art .cover-art-playback::after { ",
	"    box-shadow: inset -4px 0 0 0px rgba(240,240,240,1) , inset 4px 0 0 0px rgba(240,240,240,1) !important;}",
	"",
	".control-button--circled {",
	"    opacity: 1;",
	"    transform: scale(1.6) !important;",
	"    margin-top: -4px;}",
	"",
	".control-button--circled:active, .cover-art-playback:active {",
	"     color: var(--playCol);}",
	"",
	"button.control-button.spoticon-play-16.control-button--circled:active, .control-button.spoticon-pause-16.control-button--circled:active {",
	"    color: rgba(255,255,255,.7); ",
	"    background-color: rgba(255,255,255,.15) !important;",
	"    transform: scale(1.4) !important;",
	"    margin-top: -1px;}",
	"",
	"button.control-button.spoticon-play-16.control-button--circled, .control-button.spoticon-pause-16.control-button--circled, .control-button--circled:hover, .cover-art-playback {",
	"    color: rgba(255,255,255,.7) ;",
	"    background-color: rgba(255,255,255,.15) !important;",
	"    border-radius: 100% !important;",
	"    border-left: 3px solid rgba(200,200,200,1) !important;",
	"    border-right: 3px solid rgba(200,200,200,1) !important;}",
	"",
	"button.control-button.spoticon-play-16.control-button--circled, .control-button.spoticon-pause-16.control-button--circled {",
	"    background-color: rgba(60,60,60,1) !important;}",
	"",
	".cover-art .cover-art-playback {",
	"    color: rgba(200,200,200,1) !important;",
	"    border-left: 3px solid rgba(240,240,240,1) !important;",
	"    border-right: 3px solid rgba(240,240,240,1) !important;}",
	"",
	".cover-art-playback:hover, .control-button.spoticon-play-16.control-button--circled:hover {",
	"    color: rgba(255,255,255,1) !important;background-color: rgba(255,255,255,.2) !important;}",
	"",
	".media-object .media-object-hoverable.playing .cover-art-image, .media-object .media-object-hoverable.playing .daily-mix-decoration, .media-object .media-object-hoverable:focus .cover-art-image, .media-object .media-object-hoverable:focus .daily-mix-decoration, .media-object .media-object-hoverable:hover .cover-art-image, .media-object .media-object-hoverable:hover .daily-mix-decoration {",
	"    transition-property: filter;",
	"    transition-duration: .2s;",
	"    transition-timing-function: cubic-bezier(.3,0,0,1);",
	"    filter: brightness(.5);}",
	"",
	".sessionInfo .avatar {",
	"    background-color: transparent;}",
	"",
	".sessionInfo .avatar {",
	"    background-color: transparent;}",
	"",
	".AoH1i4drqTCg9DJoGF3Sp .col-xs-12{",
	"    margin-left: 50% !important;}",
	"",
	"._1V5hjg9Q-uySwVgMc32TQb, ._2SnF0IAy7I_tM-7M5iEcyT, ._1Fj-rlIZXTSNgYOCuLh7xo {",
	"    text-align: center !important;}",
	"",
	".AoH1i4drqTCg9DJoGF3Sp ._1Fj-rlIZXTSNgYOCuLh7xo{",
	"    font-size: var(--firstLsize) !important;",
	"    margin-left: 20% !important;}",
	"",
	".AoH1i4drqTCg9DJoGF3Sp section.EmptyState.container-fluid .col-xs-12 {",
	"    margin: 0 !important;}",
	"",
	"",
	".HeaderedGrid__header {",
	"    margin-top: -10px;}",
	"",
	".AoH1i4drqTCg9DJoGF3Sp h1._1Fj-rlIZXTSNgYOCuLh7xo {",
	"    font-size: 23px !important;",
	"    margin-left: 0px !important;}",
	"",
	".PlaylistRecommendedTracks__subtitle {",
	"    font-size: 1.28em;",
	"    line-height: 40px;",
	"    color: #fff;",
	"    text-align: center  !important;}",
	"",
	".PlaylistRecommendedTracks__top .PlaylistRecommendedTracks__title{",
	"    font-size: 1.8em;",
	"    color: #fff;",
	"    text-align: center !important;}",
	"",
	"@media screen and (-webkit-min-device-pixel-ratio:0) {",
	".navBar-header  svg path {",
	"    visibility: collapse;}",
	"",
    // enable or disable the navBar header
	".navBar-header   {",
	"    margin-left: 27px !important;",
	"    width: 175px !important;",
	"    height: 175px !important;",
	"    border-radius: 100% !important;",
	"    border-left: 5px solid rgba(0,0,0,.9)  !important;",
	"    border-right: 5px solid rgba(0,0,0,.9) !important;",
	"    box-shadow: inset 0px 0px 10px 5px rgba(0, 0, 0, .3), inset 0px 0px 25px 1px rgba(0,0,0, 0.3) ;",
	"    -webkit-animation: rotater 80s infinite linear, frameFlicker 60s infinite linear ;",
	"    -webkit-backface-visibility: hidden;",
	"    -webkit-perspective: 1000;}",
	"    ",
	".navBar-header:active {",
	"    border-left: 0px solid var(--marker) !important;",
	"    border-right: 0px solid var(--marker) !important;}}",
	"",
	"@media screen and (-webkit-min-device-pixel-ratio:0) {",
	"@media (max-width: 2160px) {",
	".navBar-header, .navBar-header:active {",
	"    margin-left: 17px !important;",
	"    height: 160px !important;",
	"    width: 160px !important;",
	"    background-size: 160px 160px !important;}}}",
	"",
	"@media all and (min--moz-device-pixel-ratio:0) {",
	".navBar-header {",
	"    border: none !important;",
	"    box-shadow: none ;}   ",
	"",
	".navBar-header:active {",
	"    box-shadow: none !important;",
	"    border-left: none !important ;",
	"    border-right: none !important;} ",
	"    ",
    //
    //
    	"",
	".navBar-header  svg path {",
	"    visibility: visible !important;",
	"    fill: context-stroke; ",
	"    stroke-linecap: round;",
	"    stroke-linejoin: round;",
	"    -webkit-filter: drop-shadow(4px 4px 1px rgba(0,0,0,1)) !important;",
	"    -webkit-animation: rotateSpot 185s infinite cubic-bezier(0.470, 0.000, 0.745, 0.715), strokeColor 1000s infinite linear;}",
	"    ",
	".navBar-header, .navBar-header:active   {",
	"    background: none!important;",
	"    margin: 0px !important;",
	"    height: auto !important;",
	"    width: auto !important;",
	"    background-size: 0 !important;",
	"    -webkit-animation:  0;}}",
	"",
	".navBar-header .logo .spotify-logo--text {",
	"    margin-top: 10px;",
	"    height: 117px !important;",
	"    width: 120px !important;}",
	"",
	".navBar-header .logo .spotify-logo--text:active {",
	"    margin-top: 11px;",
	"    margin-bottom: 1px;",
	"    height: 115px !important;",
	"    width: 118px !important;",
	"    transition: ease .2s ;}",
	"",
	"@media (max-width: 2160px) {",
	".navBar-header .logo .spotify-logo--text {",
	"    margin-top: 5px;",
	"    height: 97px !important;",
	"    width: 100px !important;}",
	"",
	".navBar-header .logo .spotify-logo--text:active {",
	"    margin-top: 7px;",
	"    height: 95px !important;",
	"    width: 98px !important;}}",
	".user-header .user-info .avatar {",
	"    margin: 0px auto;}",
	"",
	".user-header .icon svg {",
	"    display:none !important;}",
	"",
	"",
    //
    //
    "/* Device Picker */",
    " .ipSIrx, .IdxmFS96lyE7c5uiTnLM, .aCtCKL9BxAoHeVZS0uRs {",
    " border-radius: 25px !important",
    " padding: 0px !important",
    " } ",
    " .zFqMGX3h5z2CO3f2uEiL, device-picker-header device-picker-section-heading {",
    " width: -webkit-fill-available !important",
    " height: -webkit-fill-available !important",
    " } ",
    ".hwP4Oum2PB765sb8jigI {",
    " --device-picker-max-height: -webkit-fill-available !important",
    " max-height: -webkit-fill-available !important",
    " min-height: -webkit-fill-available !important",
    " } ",

   	"/***********************************Advanced Customization For Update V 0.3 **********************************************/",
	"",
	"",
	"/* Search bar*/",
	".SearchInputBox {",
	"    padding-top: 80px !important;",
	"    padding-bottom: 5px !important;",
	"    background: none;",
	"    padding: 0em;",
	"    margin: auto;",
	"    max-width: 1543px;",
	"    max-height: 85px;",
	"    padding-left: 0px;",
	"}",
	"",
	"._1Fj-rlIZXTSNgYOCuLh7xo {",
	"    font-size: 30px !important;",
	"}",
	"",
	"",
	"/* -----Spining album/cover art------ */",
	" .cover-art-image.cover-art-image-loaded, .cover-art.shadow.actionable.cover-art--with-auto-height, .cover-art-image.cover-art-image-loaded, .cover-art-image:before, .cover-art-image-loaded, .cover-art.shadow, .actionable.cover-art--with-auto-height, .Ws8Ec3GREpT5PAUesr9b {",
	"     -webkit-animation: spin .6s linear 1;",
	"     -moz-animation: spin .6s linear 1;",
	"     animation: spin .6s linear 1;",
	"     border-radius: 25px;",
	"}",
	" @-moz-keyframes spin {",
	"     100% {",
	"         -moz-transform: rotate(360deg);",
	"    }",
	"}",
	" @-webkit-keyframes spin {",
	"     100% {",
	"         -webkit-transform: rotate(360deg);",
	"    }",
	"}",
	" @keyframes spin {",
	"     100% {",
	"         -webkit-transform: rotate(360deg);",
	"         transform: rotate(360deg);",
	"    }",
	"}",
	 "/* Round albums */",
    " .cover-art.shadow.actionable.cover-art--with-auto-height, .cover-art-image, .IPVjkkhh06nan7aZK7Bx, .Ws8Ec3GREpT5PAUesr9b, .mMx2LUixlnN_Fu45JpFB, .CmkY1Ag0tJDfnFXbGgju, ._EShSNaBK1wUIaZQFJJQ, .Yn2Ei5QZn19gria6LjZj, .Z35BWOA10YGn5uc9YgAp, .jvWzgRWM_y_9FFTYRCcB, .rkw8BWQi3miXqtlJhKg0 {",
    "     border-radius: 10px;",
    "}",
    " .cover-art.shadow {",
    " border-radius 15px;",
    "}",
    " [dir=ltr] .eSg4ntPU2KQLfpLGXAww>:first-child {",
    " margin-right: 8px !important;",
    "}",
    "/* NOWPLAYING PLAY BUTTON */",
    " .KAZD28usA1vPz5GVpm63, .doaMwz, .hkmxYW, [dir=ltr] .eSg4ntPU2KQLfpLGXAww>:first-child, .dlqYDF, .prGqQr33U0mG14TJ5V8a.BhKGkKPprp2wm9bvfRKG, .prGqQr33U0mG14TJ5V8a, .jqMzOG:hover .ButtonInner-sc-14ud5tc-0, .fipMme, .kGFDdV, .SPC4uzYXJmknkCGKpxHw, .No0A0v6U6vtqj_ybS1Cd, .Fyc_tPyPKyRIT_59VZ2B, .hwP4Oum2PB765sb8jigI, .HVCCFeUiHVwZVv74p34a, .KIbfbFDao0SHpZsKoKZD, .PrhIVExjBkmjHt6Ea4XE, .bkFQH4uasL3pXqN9eDSi, .control-button--active, .jyHIqB, .TJ5Bjp6vgnWVbh6mGN0n, .Btg2qHSuepFGBG6X0yE, .jOKLc29vP0Bz1K0TsDtX, .NoOAOv6U6vtqj_ybS1Cd, .NoOAOv6U6vtqj_ybS1Cd, .rRF_r7EyCHjZv058JACi, .collection-active-icon, .collection-icon, .home-active-icon, .home-icon, .make-music-active-icon, .make-music-icon, .premiumSpotifyIcon, .search-active-icon, .search-icon, .TywOcKZEqNynWecCiATc, .playback-bar, .control-button, .control-button--active, .INitzTSjokOMEJOc6P2H, .jOKLc29vP0Bz1K0TsDtX, .uWvwXlS0Da1bWsRX6KOw, .cWIysU, .NdVm10_yLWkkgq87jOMk, .CCeu9OfWSwIAJqA49n84, .Svg-sc-ytk21e-0 uPxdw, .ShMHCGsT93epRGdxJp2w Ss6hr6HYpN4wjHJ9GHmi, .T0anrkk_QA4IAQL29get, .connect-device-list-container, .control-button-heart, .encore-dark-theme .encore-bright-accent-set, .eSg4ntPU2KQLfpLGXAww, .dpREpp, .CmkY1Ag0tJDfnFXbGgju, .wC9sIed7pfp47wZbmU6m, .control-button--active, .eJHlti, .Nd_DeCpszONzyaLe5Wd1 {",
    "     animation: rainbow-text 30s infinite;",
    "     background-color: transparent;",
    "     cursor: auto;",
    "}",
    "/* progress-bar - now playing */",
    " .TywOcKZEqNynWecCiATc, .h4HgbO_Uu1JYg5UGANeQ.iSbqnFdjb1SuyJ3uWydl:hover .VpYFchIiPg3tPhBGyynT, .Btg2qHSuepFGBG6X0yE, .h4HgbO_Uu1JYg5UGANeQ.iSbqnFdjb1SuyJ3uWydl:hover .t_yrXoUO3qGsJS4Y6iXX, a:hover, a:focus, .OCY4jHBlCVZEyGvtSv0J, .GD2gbRtcs5dOjMGAM_Y4, .KVKoQ3u4JpKTvSSFtd6J.OF_3F0SQCsBtL1jSTlTA, .Vz6yjzttS0YlLcwrkoUR.tP0mccyU1WAa7I9PevC1, .control-button--active, .fFv7yCuLuIO1dAGZHcVf, .jOKLc29vP0Bz1K0TsDtX, .kEuUqR, .Rpvqb, .uWvwXlS0Da1bWsRX6KOw,  .NoOAOv6U6vtqj_ybS1Cd, .w699O0LgQRghXyl3bs9u, .playback-bar, .RfidWIoz8FON2WhFoItU, .Xz3tlahv16UpqKBW5HdK, .uV8q95GGAb2VDtL3gpYa, .XwNfIrI6_hCa_9_T2cQB, .EhyK_jJzB2PcWXd5lg24 {",
    "     animation: rainbow-text 30s infinite;",
    "     font-size: 15px !important;",
    "     font-weight: bold;",
    "}",
    "",
	" @-webkit-keyframes rainbow {",
	"     0% {",
	"         background-position: 0% 82% ",
	"    }",
	"     0% {",
	"         background-size: 100% 100%;",
	"    }",
	"     50% {",
	"         background-position: 100% 19% ",
	"    }",
	"     50% {",
	"         background-size: 200% 200%;",
	"    }",
	"     100% {",
	"         background-position: 0% 82% ",
	"    }",
	"     100% {",
	"         background-size: 100% 100%;",
	"    }",
	"}",
	" @-moz-keyframes rainbow {",
	"     0% {",
	"         background-position: 0% 82% ",
	"    }",
	"     0% {",
	"         background-size: 100% 100%;",
	"    }",
	"     50% {",
	"         background-position: 100% 19% ",
	"    }",
	"     50% {",
	"         background-size: 200% 200%;",
	"    }",
	"     100% {",
	"         background-position: 0% 82% ",
	"    }",
	"     100% {",
	"         background-size: 100% 100%;",
	"    }",
	"}",
	" @-o-keyframes rainbow {",
	"     0% {",
	"         background-position: 0% 82% ",
	"    }",
	"     0% {",
	"         background-size: 100% 100%;",
	"    }",
	"     50% {",
	"         background-position: 100% 19% ",
	"    }",
	"     50% {",
	"         background-size: 200% 200%;",
	"    }",
	"     100% {",
	"         background-position: 0% 82% ",
	"    }",
	"     100% {",
	"         background-size: 100% 100%;",
	"    }",
	"}",
	" @keyframes rainbow {",
	"     0% {",
	"         background-position: 0% 82% ",
	"    }",
	"     0% {",
	"         background-size: 100% 100%;",
	"    }",
	"     50% {",
	"         background-position: 100% 19% ",
	"    }",
	"     50% {",
	"         background-size: 200% 200%;",
	"    }",
	"     100% {",
	"         background-position: 0% 82% ",
	"    }",
	"     100% {",
	"         background-size: 100% 100%;",
	"    }",
	"}",
	"/* Now playing font size */",
	" .react-contextmenu-wrapper {",
	"     font-size: 20px !important;",
	"}",
	" .dZPmmYYhskhqHJCAruvI {",
	"     font-size: 15px !important;",
	"     font-weight: bold;",
	"}",
	"/* Rainbow text - everything else */",
	" :before, :after {",
	"     animation: rainbow-text 30s infinite;",
	"     font-size: 32px !important;",
	"     font-weight: bold;",
	"}",
	"/* The Rainbow text */",
	" @keyframes rainbow-text {",
	"     0% {",
	"         color: #ff0000;",
	"    }",
	"     10% {",
	"         color: #ff8000;",
	"    }",
	"     20% {",
	"         color: #ffff00;",
	"    }",
	"     30% {",
	"         color: #80ff00;",
	"    }",
	"     40% {",
	"         color: #00ff00;",
	"    }",
	"     50% {",
	"         color: #00ff80;",
	"    }",
	"     60% {",
	"         color: #00ffff;",
	"    }",
	"     70% {",
	"         color: #0080ff;",
	"    }",
	"     80% {",
	"         color: #0000ff;",
	"    }",
	"     90% {",
	"         color: #8000ff;",
	"    }",
	"     100% {",
	"         color: #ff0080;",
	"    }",
	"}",
	"/* *****************Scroll bar************** */",
    "",
" ::-webkit-scrollbar, ::--os-scrollbar-track {",
	    " width: 5px !important;",
	    " height: 1px !important;",
	"}",
" ::-webkit-scrollbar-thumb, ::--os-scrollbar-track, .os-scrollbar-handle {",
	" background: linear-gradient(230deg, #ff000036, #ff800036, #ffff0036, #80ff0036, #00ff0036, #00ff8036, #00ffff36, #0080ff36, #0000ff36, #8000ff36, #ff008036) !important;",
	    " -webkit-animation: rainbow 10s linear infinite !important;",
	    " -z-animation: rainbow 10s linear infinite !important;",
	    " -o-animation: rainbow 10s linear infinite !important;",
	    " animation: rainbow 10s ease infinite !important;,",
	    " border-radius: 50px !important;",
	"}",
"",
" ::-webkit-scrollbar-thumb:hover, ::--os-scrollbar-track {",
	     " background: linear-gradient(230deg, #ff00007a, #ff80007a, #ffff007a, #80ff007a, #00ff007a, #00ff807a, #00ffff7a, #0080ff7a, #0000ff7a, #8000ff7a, #ff00807a) !important;",
	     " -webkit-animation: rainbow 10s linear infinite !important;",
	     " -z-animation: rainbow 10s linear infinite !important;",
	     " -o-animation: rainbow 10s linear infinite !important;",
	     " animation: rainbow 1s ease infinite !important;",
	"}",
"",
" ::-webkit-scrollbar-thumb:active, ::--os-scrollbar-track {",
	    " background: linear-gradient(230deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff0080) !important;",
	    " -webkit-animation: rainbow 10s linear infinite !important;",
	    " -z-animation: rainbow 10s linear infinite !important;",
	    " -o-animation: rainbow 10s linear infinite !important;",
	    " animation: rainbow 1s ease infinite !important;",
   "}",
"",
" ::-webkit-scrollbar-track, ::--os-scrollbar-track {",
	     " background: #0f0f0f !important;",
	     " border: 2px 1px #171717 !important;",
	     " border-radius: 50px !important;",
	"}",
"",
" ::-webkit-scrollbar-track:hover, ::--os-scrollbar-track {",
	      " background: #280B0F !important;",
	"}",
"",
" ::-webkit-scrollbar-track:active, ::--os-scrollbar-track {",
	     " background: #000000 !important;",
    "",
        "  /******     V 0.4 - Copy track info! This means the song name and artist!  *********/",


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

].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
} else if (typeof addStyle != "undefined") {
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		document.documentElement.appendChild(node);
	}
}
})();

// Hide Podcasts!
(function HidePodcasts() {
    console.log("HidePodcasts function running");
    setTimeout(() => {
        const mainView = document.getElementsByClassName("Root__main-view")[0];

        const observer = new MutationObserver(() => {
            const elements = document.querySelectorAll(`a[href*="/episode/"], a[href*="/show/"]`);

            for (const element of elements) {
                let parent = element.parentElement;
                while (!parent || parent.tagName !== "SECTION") {
                    parent = parent.parentElement;
                }

                parent.style.display = "none";
            }
        });

        observer.observe(mainView, { attributes: true, childList: true, subtree: true });
    }, 7000);



    " / * Genius Lyrics if Spotify doesnt have it / * "






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
// End of V 0.4! Stay tuned for more - Remember to follow my socials!!!
// GitHub (support, and new code) - https://github.com/SenpaiHunters/SpotOn


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


// Find & Sort albums (not working?!?)
document.addEventListener('DOMContentLoaded', function SortingAlbumsAndSearches() {
    'use strict';
    console.log("Sorting function running");


    // Add sorting functionality
    function sortTracks(orderBy, order) {
        // Code for sorting tracks
        let tracks = document.querySelectorAll("div[role='row']");
    let tracksArr = [];
    for (let i = 0; i < tracks.length; i++) {
        tracksArr.push(tracks[i]);
    }
    switch (orderBy) {
        case "date":
            tracksArr.sort(function(a, b) {
                let aDate = new Date(a.querySelector("span:nth-of-type(4)").getAttribute("title"));
                let bDate = new Date(b.querySelector("span:nth-of-type(4)").getAttribute("title"));
                return order === "asc" ? aDate - bDate : bDate - aDate;
            });
            break;
        case "title":
            tracksArr.sort(function(a, b) {
                let aTitle = a.querySelector("div[role='gridcell']:nth-of-type(2)").textContent;
                let bTitle = b.querySelector("div[role='gridcell']:nth-of-type(2)").textContent;
                return order === "asc" ? aTitle.localeCompare(bTitle) : bTitle.localeCompare(aTitle);
            });
            break;
        case "artist":
            tracksArr.sort(function(a, b) {
                let aArtist = a.querySelector("div[role='gridcell']:nth-of-type(3)").textContent;
                    let bArtist = b.querySelector("div[role='gridcell']:nth-of-type(3)").textContent;
                    return aArtist.localeCompare(bArtist);
                });
                break;
            case "album":
                tracksArr.sort(function(a, b) {
                    let aAlbum = a.querySelector("div[role='gridcell']:nth-of-type(4)").textContent;
                    let bAlbum = b.querySelector("div[role='gridcell']:nth-of-type(4)").textContent;
                    return aAlbum.localeCompare(bAlbum);
                });
                break;
        }
        let parent = document.querySelector("div[role='rowgroup']");
        for (let i = 0; i < tracksArr.length; i++) {
            parent.appendChild(tracksArr[i]);
        }
    }

    // Add search functionality
    function searchTracks() {
        // Code for searching tracks
        let input = document.querySelector("input[placeholder='Search...']");
        let filter = input.value.toUpperCase();
        let tracks = document.querySelectorAll("div[role='row']");
        for (let i = 0; i < tracks.length; i++) {
            let title = tracks[i].querySelector("div[role='gridcell']:nth-of-type(2)").textContent.toUpperCase();
            let artist = tracks[i].querySelector("div[role='gridcell']:nth-of-type(3)").textContent.toUpperCase();
            let album = tracks[i].querySelector("div[role='gridcell']:nth-of-type(4)").textContent.toUpperCase();
            if (title.indexOf(filter) > -1 || artist.indexOf(filter) > -1 || album.indexOf(filter) > -1) {
                tracks[i].style.display = "";
            } else {
                tracks[i].style.display = "none";
            }
        }
    }

    // Add sort buttons
    let sortButtons = document.createElement("div");
    // Code for creating sort buttons
    let searchBar = document.createElement("input");
    // Code for creating search bar
    let topBar = document.querySelector("nav['row']");
    if (topBar) {
        // Code for appending sort buttons and search bar
    } else {
        console.error("topBar not found");
    }

    // Add dropdown menus
    let sortByTitleDropdown = document.createElement("div");
    sortByTitleDropdown.innerHTML = `
        <div class="dropdown">
            <button class="dropbtn">Title Filters<span class="IconWrapper_Wrapper-sc-16usrgb-O eJHIti"></span></button>
            <div class="dropdown-content">
                <a href="#">Ascending</a>
                <a href="#">Descending</a>
            </div>
        </div>
    `;
    // Code for creating dropdown menu for sorting by title
    let sortByArtistDropdown = document.createElement("div");
    sortByTitleDropdown.innerHTML = `
        <div class="dropdown">
            <button class="dropbtn">Title Filters<span class="IconWrapper_Wrapper-sc-16usrgb-O eJHIti"></span></button>
            <div class="dropdown-content">
                <a href="#">Ascending</a>
                <a href="#">Descending</a>
            </div>
        </div>
    `;

    // Code for creating dropdown menu for sorting by artist
    let sortByAlbumDropdown = document.createElement("div");
    sortByArtistDropdown.innerHTML = `
        <div class="dropdown">
            <button class="dropbtn">Artist Filters<span class="IconWrapper_Wrapper-sc-16usrgb-O eJHIti"></span></button>
            <div class="dropdown-content">
                <a href="#">Ascending</a>
                <a href="#">Descending</a>
            </div>
        </div>
    `;
    // Code for creating dropdown menu for sorting by album
    let header = document.querySelector("header");
    header.appendChild(sortByAlbumDropdown);
    sortByAlbumDropdown.innerHTML = `
    <div class="dropdown">
        <button class="dropbtn">Sort By Album</button>
        <div class="dropdown-content">
            <a href="#" data-sort-by="album-name">Album Name</a>
            <a href="#" data-sort-by="release-date">Release Date</a>
        </div>
    </div>
`;

    // Code for adding event listeners to buttons and dropdown menus
    // Add event listeners to sort buttons
    let titleSortButton = document.querySelector("[data-sort-by='title']");
    let artistSortButton = document.querySelector("[data-sort-by='artist']");
    let dateSortButton = document.querySelector("[data-sort-by='date']");
    titleSortButton.addEventListener("click", function() {
        sortTracks("title", "asc");
    });
    artistSortButton.addEventListener("click", function() {
        sortTracks("artist", "asc");
    });
    dateSortButton.addEventListener("click", function() {
        sortTracks("date", "desc");
    });

    // Add event listener to search input
    let searchInput = document.querySelector("input[placeholder='Search...']");
    searchInput.addEventListener("input", function() {
        searchTracks();
    });
    // Add event listeners
    let sortByTitleDropdownButton = sortByTitleDropdown.querySelector(".dropbtn");
    let sortByArtistDropdownButton = sortByArtistDropdown.querySelector(".dropbtn");
    let sortByAlbumDropdownButton = sortByAlbumDropdown.querySelector(".dropbtn");

    // Event listener for sorting by title
    sortByTitleDropdownButton.addEventListener("click", function() {
        let sortOrder = this.nextElementSibling.querySelector(":checked").value;
        sortTracks("title", sortOrder);
    });

    // Event listener for sorting by artist
    sortByArtistDropdownButton.addEventListener("click", function() {
        let sortOrder = this.nextElementSibling.querySelector(":checked").value;
        sortTracks("artist", sortOrder);
    });

    // Event listener for sorting by album
    sortByAlbumDropdownButton.addEventListener("click", function() {
        let sortBy = this.nextElementSibling.querySelector(":checked").value;
        let sortOrder = this.nextElementSibling.querySelector(":checked").value;
        if (sortBy === "album-name") {
            sortTracks("album", sortOrder);
        } else if (sortBy === "release-date") {
            sortTracks("date", sortOrder);
        }
    });

    // Event listener for searching tracks
    let searchBarInput = searchBar.querySelector("input");
    searchBarInput.addEventListener("keyup", searchTracks);

});




skin(true);
var stat=1;

chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
	console.log(message.txt);
    if (message.txt=='disable'){
        if (message.bool == "false"){
            var el=document.getElementById("skin");
            el.remove()
            localStorage.setItem('skin', false);
            sendResponse({ status: 'disabled' });
            stat=0;
        }}
    if (message.txt=='enable'){
        if (message.bool == "true"){
            skin(true);
            localStorage.setItem('skin', true);
            sendResponse({ status: 'enabled' });
            stat=1;
        }}
    if (message.txt == "check"){
        sendResponse({ status: stat });
    }
    if (message.txt == "das"){
        sendResponse({ status: stat });
    }

}

var scrolltimeout=0;
function skin(exe,anim,das,tlyr) {
	if(exe == true){
		let css = "";
		css += `@charset "UTF-8";`;

 css += `/* ------Created by Kami--------*/
:root {
    --overlay-heavy: rgba(0, 0, 0, 0.4);
    --standard-ease: 350ms cubic-bezier(0.215, 0.61, 0.355, 1);
		--main-border-radius: 25px;
    --white: #fff;
    --hoverback: hsla(0, 0%, 100%, .1);
    --blur: 20px;
    --hovercolor:rgba(0, 0, 0, 0.2)}
.encore-dark-theme {
    --text-subdued: #ffffffe0!important;
		}

/*------------------Dynamic Background-----------------------*/

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
        background-color: #282828; }
    .backgroundDIV {
        display: none; }
    ._7d5bb5bfd500c0c322fb865b69181717-scss,
    ._34098cfd13d48e2910679f35aea2c377-scss,
    ._26d9e31a05dd5fba3afe1b281ae2cf9e-scss,
    .d59cf4c9f065f7dc76a93e2823013414-scss,
    ._48e360f8825a4f1e777dae4da035dc61-scss ._2ad467a52f00fff4e36adb25e591bf7c-scss,
    ._60cb742e518d084c3c959007b9463b51-scss,
    .react-contextmenu,
    .SearchInputBox,
    .sessionInfo {
        -webkit-backdrop-filter: blur(var(--blur));
        backdrop-filter: blur(var(--blur))
        }
.backgroundDIV {
    background-image: var(--backimg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-size: cover;
    transition-duration: 0.7s;
    background-position: center;
    background-color: #282828;
    filter: blur(20px);
		/*blur - 50px original*/
    width: 100vw;
    height: 100vh;
    position: absolute; }
#main > div.Root.encore-dark-theme > div,
#context-menu > ul ,#context-menu > div > ul {
    backdrop-filter: blur(20px); }
		/*same as above*/

#context-menu > ul,#context-menu > div > ul{
    overflow:visible;
}


#main > div.Root.encore-dark-theme > div,
.nav-alt #main > div.Root.encore-dark-theme > div,*/
.nav-alt .QO9loc33XC50mMRUCIvf,
.J6VTd7VdGN2PM_oXCAyH,
#context-menu > ul ,#context-menu > div > ul{
    background-color: var( --overlay-heavy); }
.Root__nav-bar,
.nav-alt .Root__main-view,
.nav-alt .Root__nav-bar,
.Root__fixed-top-bar {
    background: transparent; }
.nav-alt #main > div.Root.encore-dark-theme > div{
    padding: 0px; }
.Root__fixed-top-bar {
    padding-top: 10px;
    padding-left: 120px;
		}

    /*#main > div {
    box-shadow: inset 0px 2px 70px 4px #0000006e; }*/

/*-------Fix for new UI-----*/

#main > div.Root.encore-dark-theme.nav-ylx > div > nav > div,
.Root__main-view,
.Root__left-sidebar,
#main > div.Root.encore-dark-theme.nav-ylx > div > div:nth-child(1) > header > div:nth-child(1),
#main > div.Root.encore-dark-theme.nav-ylx > div > div:nth-child(1) > header > div:nth-child(1) > div {
    background: none !important;
}

  .nav-ylx .jEMA2gVoLgPQqAFrPhFw, .t1hN4Ju87afc5N5fDTnm {
    background: none !important;
  }

  /* Hide scrollbar */
  .active, .os-scrollbar-handle {
    /*display: none !important;*/
    /*background: linear-gradient(230deg, #ff00007a, #ff80007a, #ffff007a, #80ff007a, #00ff007a, #00ff807a, #00ffff7a, #0080ff7a, #0000ff7a, #8000ff7a, #ff00807a) !important;*/
  }

  /* Bottom padding */
  .os-viewport, .os-theme-spotify .os-viewport, .os-host-overflow>.os-padding, .os-viewport {
    padding: 8px !important;
  }

/*
Developer note - Previous version had this ↓ which made the BG light asf.
Above version fixes that (issue?), revert it if you wish...
#main > div.Root.encore-dark-theme.nav-ylx > div > nav > div,
#main > div.Root.encore-dark-theme.nav-ylx > div:nth-child(2),
.Root__main-view {
    background: none !important;
}
*/

/*
Inside playlists, like daily mix the :hover element ...
button.RowButton-sc-xxkq4e-0.iQutdu {
  -webkit-tap-highlight-color: rgba(105, 88, 88, 0)!important;
}
*/

button.RowButton-sc-xxkq4e-0.iQutdu:hover {
  -webkit-tap-highlight-color: rgba(105, 88, 88, 0) !important;
}

/* Sidebar/Nav bar fix again.. */
.Root__left-sidebar.hasYLXSidebar,
.BdcvqBAid96FaHAmPYw_ {
	background: none !important;
}

#main > div.Root.encore-dark-theme.nav-ylx > div:nth-child(2) {
    padding: 0 !important;
}

#main > div.Root.encore-dark-theme.nav-ylx > div > nav > div:nth-child(2) > div:nth-child(2) > div {
    width: calc( var(--nav-bar-width) - 20px) !important;
}
.ifVI2CEdOZGgMWIUN2Cw.kJ_Q4aphh_uCJCZdzPpD:not(.dNphEfQzPRaQufS04jUm) {
    padding-bottom: calc( var(--nav-bar-width) - 20px) !important;
}
.Root__now-playing-bar {
    padding: 8px !important;
}


.EZFyDnuQnx5hw78phLqP {
	padding-bottom: 0px !important;
}

	.nav-ylx .Root__nav-bar {
		gap: 1px !important;
	}

/* Top nav bar when scrolling */
	.nav-ylx .T1xI1RTSFU7Wu94UuvE6, .EvIR4O7jOSbNmxtMdIQ0 {
		border-radius: var(--main-border-radius) !important;
		background: transparent !important;
	}
		/*
		.PHgyArRLVFknlaOm31ID, .nav-ylx .facDIsOQo9q7kiWc4jSg, div.T1xI1RTSFU7Wu94UuvE6 {
			background: linear-gradient(to right, rgba(255,192,203,0.1) 0%  ,rgba(255,192,203,0.1) 45% ,rgba(255,192,203,0.1) 55%,rgba(255,192,203,0.1) 65%, rgba(255,192,203,0.1) 100%) !important;
		}
		*/

#main > div.Root.encore-dark-theme.nav-ylx > div:nth-child(2) {
    padding: 0;
    padding-top: 7px;
    background-color: var(--overlay-heavy);
}
.y2UicQnlTq148rL8Y0jp{
    box-shadow: -1px 8px 5px -5px black!important;
}

*-------Home button-----*/
#main > div.Root.encore-dark-theme.nav-alt > div > div.Root__fixed-top-bar > div:nth-child(2) > a:hover {
    filter: brightness(1.5);
    background: none;
}
#main > div.Root.encore-dark-theme.nav-alt > div > div.Root__fixed-top-bar > div:nth-child(1) {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: end;
}
#main > div.Root.encore-dark-theme.nav-alt > div > div.Root__fixed-top-bar > div:nth-child(2) > a {
    position: absolute;
    left: 34px;
    top: 24px;
    width: 150px;
    background-color: transparent;
    justify-content: flex-start;
}
#main > div.Root.encore-dark-theme.nav-alt > div > div.Root__fixed-top-bar > div:nth-child(2) > a:after {
    margin-top: 12px;
    margin-left: 39px;
    content: "Home";
    position: absolute;
    color: rgb(215 214 215);
    top: 0;
    left: 0;
    z-index: -1;
}

/*---------------text-----------------
.RootlistItem__link:link,
.RootlistItem__link:visited,
.link-subtle {
    color: var(--white);
    opacity: .8; }*/
.link-subtle{
    color: #ffffffe0;
}
.GKnnhbExo0U9l7Jz2rdc:active, .GKnnhbExo0U9l7Jz2rdc:focus, .GKnnhbExo0U9l7Jz2rdc:hover, .moDRd9td0KtitPDzR7OJ, .moDRd9td0KtitPDzR7OJ:focus, .moDRd9td0KtitPDzR7OJ:hover {
    color: #fff;
}
.home-icon{
    color: #b3b3b3;
}

/*-------------Home Page-----------------*/

#context-menu > ul, #context-menu > div > ul, ._K79lE9KrIAkl_bUSSUM, .PpUTJL2NIYDUnmfzVIbE, .EZFyDnuQnx5hw78phLqP, .XTk61Y8OkBdUT6Wj4F6i.VfDGbMWaJe9rcefizTNk, .WIPpgUp9J37Dwd0ZJnv0 .Root__main-view,

.B0VIs50K6LXh5MDmmmJs, .B0VIs50K6LXh5MDmmmJs:hover, .odcjv30UQnjaTv4sylc0, .Ws8Ec3GREpT5PAUesr9b, .DuEPSADpSwCcO880xjUG, .wC9sIed7pfp47wZbmU6m, .KDlcc1SFTcA90eMUcn5P,
.tsv7E_RBBw6v0XTQlcRo, .zi377dMLSwXnFiejYnRa, .aIWRvSjvEN4rTMCIi4vG, .wIyyGaSPOHR78wksX3Us, .G8UNZJv4HT1kOIolA_e7, .encore-light-theme,
.encore-light-theme, .encore-base-set, .MQQEonum615k8mGkliT_, .CU0wnmWejIvyEsRRtSac, .R2w_sH83CJU9Yhnu0xyt, .PiyAiXdQULEnWAHP0tu1, .odcjv30UQnjaTv4sylco:focus, odcjv30UQnjaTv4sylcO:hover, [dir="ltr"] .JdlKTdpMquftpMwwegZo,
.odciv30UOniaTv4svlc0_[data-context-menu-open=true], .zrvvPyoxE6wQNqnu0yWA, .hwP4Oum2PB765sb8jigI,
    div.Root__now-playing-bar > footer > div:nth-child(2) *,
.ejNsts52hRq0uZcc_NXi,
.uhDzVbFHyCQDH6WrWZaC, .AJqEY1gblQDvIgjU0jAH, .react-contextmenu-wrapper, .I3EivnXTjYMpSbPUiYEg, .g6ZgzRfiHjsTLskeyI0J:focus, .g6ZgzRfiHjsTLskeyI0J:hover, .g6ZgzRfiHjsTLskeyI0J,
[dir=ltr] .g6ZgzRfiHjsTLskeyI0J, .fLS8v3_EfBadEerbGVoR, .LunqxlFIupJw_Dkx6mNx, html.spotify__container--is-web body, .qJOhHoRcFhHJpEQ2CwFT.koyeY6AgGRPmyPITi7yO,
.uV8q95GGAb2VDtL3gpYa, .aCtCKL9BxAoHeVZS0uRs, .pHrwZOFBdT8FNXnmcPPI, .UmY163JiUcgJt2MKNyGW.SVnAziPF2z_cgAGrp6He,
.hcuLp8V4uEEfWZ4k6aLV, .QavgDs_52SpJ2rw0LNYz:before,
#myconfigwin39457845, #myconfigwin39457845 div, #myconfigwin39457845 div, #myconfigwin39457845 button,
.B0VIs50K6LXh5MDmmmJs,
.VgSbatGBB9XwTH2_dsxg .ql0zZd7giPXSnPg75NR0:disabled, .VgSbatGBB9XwTH2_dsxg .ql0zZd7giPXSnPg75NR0,
.Root__buddy-feed,


div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section > div:nth-child(2) > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section > div:nth-child(2) > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > section > div:nth-child(5) > section > div:nth-child(2) > div,
#searchPage > div > div > section > div:nth-child(2) > div,
#searchPage > div > div > section:nth-child(1) > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div.Ft1cMGlqDsCbqmXQyeKN > div.AJqEY1gblQDvIgjU0jAH.contentSpacing.zlBEnsMyvUhuHSEtst4Q > section > div:nth-child(2) > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(5) > section > div:nth-child(2) > div,
#searchPage > div > div > section:nth-child(3) > div:nth-child(2) > div,
#searchPage > div > section > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section:nth-child(2) > div:nth-child(3) > div,
div.os-padding > div > div > div > main > section > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > section:nth-child(n+4) > div:nth-child(2) > div,
.oaNVBli46GtVjaQKB15g {
    background: rgba(105, 88, 88, 0)!important; }
		/*Inside popup menu*/

.B0VIs50K6LXh5MDmmmJs:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section > div:nth-child(2) > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section > div:nth-child(2) > div:hover,
#searchPage > div > div > section > div:nth-child(2) > div:hover,
#searchPage > div > section > div:nth-child(2) > div > div:hover,
#main > div.Root.encore-dark-theme > div > div.Root__main-view > main > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > section > div:nth-child(5) > section > div:nth-child(2) > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div.Ft1cMGlqDsCbqmXQyeKN > div.AJqEY1gblQDvIgjU0jAH.contentSpacing.zlBEnsMyvUhuHSEtst4Q > section > div:nth-child(2) > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(5) > section > div:nth-child(2) > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section:nth-child(2) > div:nth-child(3) > div:hover,
div.os-padding > div > div > div > main > section > div:nth-child(2) > div > div:hover,
div.os-padding > div > div > ul > div > div:nth-child(2) > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > section:nth-child(n+4) > div:nth-child(2) > div:hover,
#main > div.Root.encore-dark-theme > div > div.Root__top-bar > header > div:nth-child(3) > div > nav > ul > li:hover > a,
.eRuZMo_HNLjb1IalIeRb {
    background: var(--hovercolor)!important; }


div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section > div:nth-child(2) > div {
    overflow: visible; }
._7ae3a7b5ef70bce1740ff486c4467d56-scss,
.main-home-homeHeader,
.euOnte9wvOF0D_SGxEZ9,
.fynR25MOeILQ7mCZ8247,
._ZhbiHuTGHCAQ_asJSw9,
div.os-padding > div > div > div.main-view-container__scroll-node-child > div,
#searchPage > div > div > section:nth-child(2) > div:nth-child(2) > div,
div.os-padding > div > div > div > main > div,
div.os-padding > div > div > div > main > div > div {
    background-color: transparent!important;
    background-image: none!important;
    transition-duration: 0s; }

.main-card-card:hover main-card-imageContainer,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section > div > div > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section > div > div > div > div:nth-child(1),
#searchPage > div > div > section > div > div > div > div > div:nth-child(1),
#searchPage > div > section > div:nth-child(2) > div > div > div > div:nth-child(1)> div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div > section > div:nth-child(2) > div > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(5) > section > div:nth-child(2) > div > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(n+2) > div > div > div:nth-child(1),
div.os-padding > div > div > div > main > section > div:nth-child(2) > div > div > div > div > div:nth-child(1)
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section:nth-child(1) > div > div > div > div:nth-child(1) >div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section > div > div > div > div:nth-child(1) > div,
#main > div.Root.encore-dark-theme > div > nav > div > ul > li:nth-child(3) > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > section:nth-child(n+4) > div:nth-child(2) > div > div > div:nth-child(1)> div {
    transition-duration: 0.2s; }


.OALAQFKvC7XQOVYpklB4:hover .JI_jg7MaIJ2TCTmebcdd,
.main-card-card:hover main-card-imageContainer,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section > div > div:hover > div > div:nth-child(1) > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section > div > div:hover > div > div:nth-child(1)> div,
#searchPage > div > div > section > div > div > div:hover > div > div:nth-child(1),
#searchPage > div > section > div:nth-child(2) > div > div:hover > div > div:nth-child(1)> div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div > section > div:nth-child(2) > div:hover > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(5) > section > div:nth-child(2) > div:hover > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(n+2):hover > div > div > div:nth-child(1),
div.os-padding > div > div > div > main > section > div:nth-child(2) > div > div:nth-child(n+2):hover > div > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > section:nth-child(n+4) > div:nth-child(2) > div:hover > div > div:nth-child(1)> div {
    transform: scale(1.05);
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1); }



main-card-imageContainer,
.OALAQFKvC7XQOVYpklB4 .JI_jg7MaIJ2TCTmebcdd {
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
		}

.KL469QQzoRZLOmKomNzk:hover .B3i7kN8tRTwP9s4XEK10,
view-homeShortcutsGrid-shortcut:hover view-homeShortcutsGrid-imageContainer,
.B0VIs50K6LXh5MDmmmJs:hover .icV9eS36uZs9fhQmUujh,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section:nth-child(1) > div > div:hover > div > div:nth-child(1) > div{
    transform: scale(1.1) translateX(3px) !important;
		}

.KL469QQzoRZLOmKomNzk .B3i7kN8tRTwP9s4XEK10,
view-homeShortcutsGrid-shortcut view-homeShortcutsGrid-imageContainer,
.icV9eS36uZs9fhQmUujh {
    transition-duration: 0.2s !important;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1)!important;
		}

._560fb0a89f4ec24665eb945cfe2c97b0-scss,
.view-homeShortcutsGrid-grid,
.Vg_wqJ9OwkZl65Rc_iyX,
._dlL34LrG9vg8mcBFaUw,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section:nth-child(1) > div {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
    padding-left: 5px; }
.KL469QQzoRZLOmKomNzk,
.msOGVcFLw_5wwMOLzhye,
view-homeShortcutsGrid-shortcut view-homeShortcutsGrid-imageWrapper,
.icV9eS36uZs9fhQmUujh,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section:nth-child(1) > div > div > div > div:nth-child(1) > div {
    box-shadow: 5px 0px 13px rgb(0 0 0 / 50%)!important;
    transition-duration: 0.2s!important;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1)!important; }
.KL469QQzoRZLOmKomNzk:hover ._Xtjqr3it7fr5yseBgKp,
.B0VIs50K6LXh5MDmmmJs:hover .GG4lScbAogw4Q_mXWbn9,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section:nth-child(1) > div > div:hover > div > div:nth-child(2)>div:nth-child(1) {
    transform: translateX(5px)!important; }
.KL469QQzoRZLOmKomNzk ._Xtjqr3it7fr5yseBgKp,
.GG4lScbAogw4Q_mXWbn9,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section:nth-child(1) > div > div > div > div:nth-child(2)>div:nth-child(1) {
    transition-duration: 0.2s!important;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1)!important; }


/*-------------profile page-----------------*/

/* Hides 'profile' button *//*
.odcjv30UQnjaTv4sylc0 {
	display: none;
}
*/

/* Hide 'profile' text *//*
.EeWTFG_vxLI5QJc1TH4F, .RfdRTSGwulyQdDepLUTT .EeWTFG_vxLI5QJc1TH4F, .RfdRTSGwulyQdDepLUTT .eAXFT6yvz37fvS1lmt6k {
	display: none;
}
*/

/* Edit profile name and or pic */
.XwNfIrI6_hCa_9_T2cQB {
	border-radius: 35px !important;
	background: rgba(0, 0, 0, 0.4) !important;
}

 /* Name of profile */
	.wCkmVGEQh3je1hrbsFBY {
		text-algin: start !important;
	}
	/* Text alignment */
		.o4KVKZmeHsoRZ2Ltl078, .rEN7ncpaUeSGL9z0NGQR {
			text-align: left !important;
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
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div,
#main > div.Root.encore-dark-theme > div > div.Root__top-bar > header > div.T1xI1RTSFU7Wu94UuvE6,
#main > div.Root.encore-dark-theme > div > div.Root__top-bar > header > div.T1xI1RTSFU7Wu94UuvE6 > div,
div.os-padding > div > div > div > main > section > div > div > div {
    background-color: #0000! important;
    background-image: none !important; }

div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section:nth-child(2) > div:nth-child(2) > div {
    background: rgba(0, 0, 0, 0.0)!important; }

div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div.contentSpacing > div:nth-child(4) > div > div > img{
    box-shadow: 5px 0px 13px rgb(0 0 0 / 50%)!important;
    }

.c108b4ada40c10926b10bba3ff614fd0-scss,
.wQi0raQMEJJrELuj_2FP,
.YboT9C61kapUCdQnsEmR,
div.under-main-view > div > div {
    height: 50vh;
    top: -66px;
    opacity: 0.8;
    /*filter: brightness(0.8);*/
    background-position: center; }
div.under-main-view > div > div:after {
    height: 50vh!important;
}
._6f1bb16d690aec58cb10e82de1ac2410-scss,
.c108b4ada40c10926b10bba3ff614fd0-scss,
.wQi0raQMEJJrELuj_2FP,
.YboT9C61kapUCdQnsEmR,
div.under-main-view > div > div {
    /*box-shadow: inset 11px -20px 60px 0px #000000b0;*/
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1)80%, rgba(0, 0, 0, 0));
    /*  -webkit-mask-image: -webkit-gradient(linear, right center, right bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));*/ }
.Root__fixed-top-bar {
    z-index: 1;
}
.Root__main-view {
    overflow: visible;
    padding-top: 60px;
    margin-top: 10px; }
.c108b4ada40c10926b10bba3ff614fd0-scss.e9db31e18f63ba40c72f3865edb41b5e-scss,
.wQi0raQMEJJrELuj_2FP,
.YboT9C61kapUCdQnsEmR,
div.under-main-view > div > div {
    transform: scale(1)!important;
    box-shadow: inset 0px 7px 40px 0px #000000c2; }
.main-view-container__scroll-node-child-spacer {
    height: 0px; }
._0e3c23126898d1fa3d5ae9b5fdf82362-scss {
    background-color: rgba(0, 0, 0, 0.5)!important; }
.main-view-container__scroll-node-child {
    padding-top: 20px; }
._4c3b6e4e88112fc8ef88512cbe7521ed-scss.b922193db5f1fbddd0ac1467645b8194-scss {
    height: 41vh; }
.f39dd6caa689537bffdfc875c3f33d08-scss {
    padding: 10px 32px!important; }

/*------------discografy page-------------*/

div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div > div:nth-child(1) {
    background-color: #0000! important;
    top: auto!important;
    box-shadow: none!important; }
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div:nth-child(1) {
    top: auto; }

/*------------Allbum page-------------*/

/* album art nav spacing */
.PpUTJL2NIYDUnmfzVIbE.kJ_Q4aphh_uCJCZdzPpD.dNphEfQzPRaQufS04jUm {
	padding-bottom: 25px !important;
}

/* album art now playing bar */
.deomraqfhIAoSB3SgXpu {
	transform: translateX(-80px) !important;
}

._11b29b5a5f3bcae347f832a4278b28b8-scss,
._5d10f53f6ab203d3259e148b9f1c2278-scss,
.eae5aabff7beab294ee900c0a1928b4c-scss,
.XRD1P2qyA9MlnhSLnxwi,
._uWqv_e_qylO6QDAoZKL,
._AicLTqbkTBeib40qoQO,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div > div > div > img,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div > div > img,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div > img,
div.os-padding > div > div > div > main > section > div > div.contentSpacing > div > div > img ,
div.os-padding > div > div > div > main > section > div > div:nth-child(4) > div > div > img{
    -webkit-box-shadow: 0 4px 20px rgba(0, 0, 0, .5)!important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, .5)!important; }

._83d9fef4ae69148dc1fc9b8323f8528b-scss._2dc8cce76d72af90f5e00e781db42541-scss,
.g9n_9K5pFI3B_JuDI_hS.LcjM521yr5D14A54HbQl,
._jtsyLN4SfPrV5dZONPP.uwzZYE9AYS0OMBzvAopr,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div:nth-child(3) > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div:nth-child(4) > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div.rezqw3Q4OEPB1m4rmwfw > div:nth-child(3) > div > div.koyeY6AgGRPmyPITi7yO,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(4) > div:nth-child(1) > div:nth-child(1),
#searchPage > div > div > div > div > div:nth-child(1) {
    position: initial !important;
    background: #00000000!important;
    box-shadow: none!important; }


#searchPage > div > div > div > div > div{
    background: #00000000!important;
    box-shadow: none!important; }

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
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div:nth-child(1) {
    background: #00000000!important; }

div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div > div > div > img,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(4) > div > div > div:nth-child(2) > div > div > div > div > img,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div.contentSpacing > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div > div > div > img,
div.os-padding > div > div > div > main > div > section > div:nth-child(2) > div.contentSpacing > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div > img,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div:nth-child(3) > div > div:nth-child(2) > div > div > div:nth-child(1) > div > img,
.h4HgbO_Uu1JYg5UGANeQ.iSbqnFdjb1SuyJ3uWydl .VpYFchIiPg3tPhBGyynT > span  {
    display: none!important; }


/*---------------Podcasts--------------*/

_8e7d398e09c25b24232d92aac8a15a81-scss {
    color: #fff!important;
    background-color: #1db954!important;
    transition-duration: 0.6s;
    transition: opacity .5s;
		}
._UFTK833WfTNGb4agRTd,
.Ic3iDUCnC09k55peZBfC {
    background: #00000000!important;
		}

/*-----Spotify Lists-----*/

div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div {
    background: #00000000!important;
		}

/*-------Now Playing Bar--------------*/

.Root__now-playing-bar {
    padding-top: 10px; }
._17de82b47b8c1954963d20ed56b2f730-scss,
._82a78ff58d3fcba0cb9b8083fe6dd05c-scss,
.gqeP9Y0_y6DLm4CD_m3Q,
.O6evDj2xd8mSlS2qiPiG,
#main > div.Root.encore-dark-theme > div > div.Root__now-playing-bar > footer {
    border-top: none;
    background-color: rgba(0, 0, 0, 0) }
.O6evDj2xd8mSlS2qiPiG {
    background: var(--overlay-heavy) }
._mSbAWxlXgc2ONtpnuXQ:before,
._mSbAWxlXgc2ONtpnuXQ:after,
#main > div.Root.encore-dark-theme > div > div.Root__now-playing-bar > footer > div > div > div > div > div > div:before,
#main > div.Root.encore-dark-theme > div > div.Root__now-playing-bar > footer > div > div > div > div > div > div:after {
    background: none; }
.progress-bar__slider,
.progress-bar__fg_wrapper,
._3a2318b538bc2aae78113023036a879a-scss,
.giO6cIQ8auPNZuTvC4Y8,
.lz_1dGnEKWyCpV_qE0ux,
button {
    transition-duration: 0.2s;
    transition-property: background-color; }
button {
    transition-duration: 0.2s;
    transition-property: color; }
._3cf7cb92e8b34cd675db241406113852-scss:hover .a576b3947647edea47972737accee656-scss,
.a576b3947647edea47972737accee656-scss,
.fa5d61cbff164a35eeb31d9e7ec6d466-scss._330120983547cb0c119a357dbb9ab8ab-scss ._76bf0ea4fc6653c68b50ad9723c9a535-scss,
.fa5d61cbff164a35eeb31d9e7ec6d466-scss:hover ._76bf0ea4fc6653c68b50ad9723c9a535-scss,
._76bf0ea4fc6653c68b50ad9723c9a535-scss,
.progress-bar:focus-within .progress-bar__fg,
a:focus,
a:hover,
a {
    transition-duration: 0.2s; }

/*---------------Overflow-Overscroll---------------*/
	:root {
		overflow: hidden !important;
	}


/*----------------Misc---------------------*/


/*------------Hotkeys------------*/

.EhyK_jJzB2PcWXd5lg24, .e4ETsc5zxjzyF9nyb4LI, .cyXplMovoowBozEe4r2x {
	background-color: rgba(105, 88, 88, 0) !important;
	padding: 3px !important;
	border-radius: var(--main-border-radius) !important;
}
	.EhyK_jJzB2PcWXd5lg24 {
		background-color: rgba(105, 88, 88, 0.3) !important;
	}

body > div:nth-child(10) {
    display: none; }

.H0HbpIM3UrcupWIAjLWu {
	border-radius: var(--main-border-radius);
}

/*----------Right-click Menu----------*/
.SboKmDrCTZng7t4EgNoM {
	border-radius: 32px !important;
	background: rgba(0, 0, 0, 0.3) !important;
	background-color: rgba(105, 88, 88, 0.3) !important;
}

		.SboKmDrCTZng7t4EgNoM, div#trippy-7 {
			 background: rgba(105, 88, 88, 0.2) !important;
			background-color: rgba(105, 88, 88, 0) !important;
			/*background: var(--hovercolor) !important;*/
			transition-duration: 0.2s !important;
    	transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1)!important;
		}

.cASFVN {
    background: none;
}
.tr8V5eHsUaIkOYVw7eSG{
    height: auto;
}

/*-----------Now playing-----------*/
.nav-ylx .OCY4jHBlCVZEyGvtSv0J {
	height: 100px !important;
}
	.deomraqfhIAoSB3SgXpu {
		transform: translateX(-20px) !important;
	}
		.jOKLc29vP0Bz1K0TsDtX {
			min-width: 340px !important;
		}

/*-----------Nav-----------*/
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
._7b6273541d969069bb18c4fcae4120e7-scss,
.e2JzVB2WkGm7GMT8rkEg,
.kYBlAcRblnjQ6kKW4JCy,
#main > div.Root.encore-dark-theme > div > nav > div > div > div > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > nav {
    background: none; }

div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div.fVB_YDdnaDlztX7CcWTA {
    top: 0px;
    position: initial !important; }

._748c0c69da51ad6d4fc04c047806cd4d-scss {
    color: #000!important;
    text-shadow: 0 0 black; }

/*lyrics  text-shadow: 0 0 3px rgb(0 0 0);*/
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > div:nth-child(2) > div > div{
    filter:saturate(4);
    transition-duration: 0.1s;
    transition-timing-function: cubic-bezier(0.12, 0.51, 0.26, 0.5);
}

/*-----------Hide Download button-----------*/

a [href="/download"] {
display: none !important;
}

a.link-subtle.ATUzFKub89zvkmvhpyE {
  display: none !important;
}

link-subtle ATUzFKub89lzvkmvhpyE {
  display: none !important;
}

.eFyQzR {
  display: none !important;
}

/* Also hidden below, it's a race on who gets to hide it first! */

/*.NiCdLCpp3o2z6nBrayOn.MEjuIn9iTBQbnCqHpkoQ {
    color: rgb(255 255 255 / 20%);
    }*/

  /* Hide the 'Upgrade' button */ /*
  .jbcotm {
    display: none !important;
  }
  */


div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > div:nth-child(2) > div > div:hover{
    transform: scale(1.03);}

div.os-padding > div > div > div.main-view-container__scroll-node-child > div > div {
    background: none; }
.arY01KDGhWNgzlAHlhpd {
    transform: scale(1.05);}
/*.MEjuIn9iTBQbnCqHpkoQ {
    transform: translate(30px, 0px);}*/

/*---------------------Now Playing Img---------------------*/

.d6e5892a336f6ae43bf066f2245c81b1-scss,
._4fac214bccd807d7c6fed21d4e0ea6de-scss,
.i0XB7255K_4QFLJsSGc_,
#main > div.Root.encore-dark-theme > div > nav > div {
    padding-left: -1px !important;
    padding-right: 6px;
    padding-bottom: 10px; }
._8b45c1ef6e792bfe1014b26c48673e5a-scss,
.i0XB7255K_4QFLJsSGc_ {
    background: none !important; }

	/*-----------------Spacing on the img-----------------*/

		.deomraqfhIAoSB3SgXpu {
  	  transform: translateX(-75px) !important;
		}


._8bfd0bd3ba9dd8201e38b1622bc74fb6-scss,
.i_0L07qd2CAeOLFiK8dP {
    overflow-y: visible!important;
    backdrop-filter: blur(3px)!important; }

/*---------------------Albums previews---------------------*/

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
#main > div.Root.encore-dark-theme > div > nav > div > ul > li:nth-child(3) > div > a {
    background: rgba(0, 0, 0, 0)!important; }

._2f859138f9d0ecc3c687296f572c5dca-scss:hover,
._3802c04052af0bb5d03956299250789e-scss:hover,
._28be3af50433a1164b3a62a898dce43e-scss:hover,
.OALAQFKvC7XQOVYpklB4:hover,
.L4WROPnQ7MPGhylvVyxd:hover,
._8bfd0bd3ba9dd8201e38b1622bc74fb6-scss,
.YWQ6MaodStrAvAMCg1wx:hover,
#main > div.Root.encore-dark-theme > div > nav > div > ul > li > a:hover,
#main > div.Root.encore-dark-theme > div > nav > div > ul > li:nth-child(3) > div > a:hover {
    background: var(--hovercolor)!important;
}

.byhpDrPqhYGoCXVANcn9 {
    transition-duration: 0.2s; ; }
.YWQ6MaodStrAvAMCg1wx:hover .byhpDrPqhYGoCXVANcn9 {
    transform: scale(1.05);
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1); }


/*---------------------Play button---------------------*/
._13e5c5964387e0139bbe6e468e9aa649-scss > *,
._8e7d398e09c25b24232d92aac8a15a81-scss {
    -webkit-transition: opacity .5s;
    transition: opacity .5s!important; }
._8e7d398e09c25b24232d92aac8a15a81-scss:hover {
    box-shadow: 2px -1px 20px 0px #000000c7;
    z-index: 1; }

/*---------------------Playing album---------------------*/
._233cba0ebe7615236e86592034108e77-scss {
    justify-content: center; }



/*---------------------Track scale---------------------*/

._OpqIZJH2IqpNqAS9iJ7,
._cx_B0JpuGl6cJE7YqU1,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(4) > div > div > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div,
#searchPage > div > div > section > div > div > div > div > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(4) > div > div > div:nth-child(2) > div,
.h4HgbO_Uu1JYg5UGANeQ{
    transition: transform var(--standard-ease); }

._OpqIZJH2IqpNqAS9iJ7,
._cx_B0JpuGl6cJE7YqU1:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div:nth-child(4) > div > div > div:nth-child(2) > div > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div.iB16LxoPzDeVZo8zPhPQ > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div:hover,
#searchPage > div > div > main > section > div > div > div > div > div:nth-child(2) > div > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div:hover,
.h4HgbO_Uu1JYg5UGANeQ:hover {
    transform: scale(1.025);
    background: var(--hovercolor); }

.ggAaYdWWy1P_IcJbsMeZ .FnW_fQBaMbSCZnG14SfL,
.iSbqnFdjb1SuyJ3uWydl .RfidWIoz8FON2WhFoItU {
    opacity: 1;
    color: #31ff55 }
.ggAaYdWWy1P_IcJbsMeZ .g_2jIhVKp2v60nnkBkUN {
    opacity: 0; }

._4b308d5c9250cfb0620ce3b40765ef4a-scss,
.tracklist-row--active,
.SzCNXJJQz7BiDOO0B2Xv,
.ggAaYdWWy1P_IcJbsMeZ,
.iSbqnFdjb1SuyJ3uWydl {
    transform: scale(1.025)!important;
    background-color: #0003; }


._4b308d5c9250cfb0620ce3b40765ef4a-scss ._99bbcff33ae810da0bfc335662ae2c1d-scss,
.fynR25MOeILQ7mCZ8247 {
    opacity: 0!important; }
._5814e6eb4f933d11bfa18c01b92eff76-scss,
.WBTm60_TPRG_oYwBuS7_ {
    display: none!important; }

/*---------------------Pointers---------------------*/

.bd0f04911fe4adb022e666269a90a739-scss,
._38168f0d5f20e658506cd3e6204c1f9a-scss,
.OBaPDV8g5lhQbNPmIEwf,
.C6Q_uSufk1zE4WuU3i5P,
.FnW_fQBaMbSCZnG14SfL,
div.os-padding > div > div > ul > div > div:nth-child(2) > div,
.RfidWIoz8FON2WhFoItU,
button {
    cursor: pointer; }

.ec1b5762556429ac3aeedbae72433491-scss {
    color: #ffffffe0!important; }
div.os-padding > div > div > ul > div > div:nth-child(2) > div {
    border-radius: 5px;
}
/*transparent elements*/
.Root__now-playing-bar,
.i_0L07qd2CAeOLFiK8dP,
.pLwpjUDpZgzSXNOsGn_c,
.Mx7aus4bRGbU9vPpnDHj {
    background: var(--overlay-heavy) }


/*---------------------SpotOn CSS---------------------*/
/*--------------------Below that is---------------------*/

/* Version 0.9 coming soon! */

/* Some changes coming soon */

/* Adjust the nav bar links *//*
a.link-subtle {
  color: #D7994A !important;
  font-size: 17px !important;
}
.GlueDropTarget--tracks a span{
  color: #D7994A  !important;
  font-size: 17px !important;
}
*/
/* Remove the default home icon and replace it with your own */ /*
svg.home-icon path{
  display: none !important;
}
svg.home-active-icon path {
  display: none !important;
}
svg.home-active-icon + span {
  font-size: 17px !important;
}
svg.home-icon {
  background: url("https://www.filepicker.io/api/file/I6pr4FXQRcyLapq0HDQD") !important;
  background-size: 24px !important;
}
svg.home-active-icon {
  background: url("https://www.filepicker.io/api/file/I6pr4FXQRcyLapq0HDQD") !important;
  background-size: 24px !important;
}
*/

/* Remove the default search icon and replace it with your own */ /*
svg.search-icon path {
  display: none !important;
}
svg.search-active-icon path {
  display: none !important;
}
svg.search-active-icon + span {
  font-size: 17px !important;
}
svg.search-icon {
  background: url("https://www.filepicker.io/api/file/s87RiLY3RHGE2FY2dIPT") !important;
}
svg.search-active-icon {
  background: url("https://www.filepicker.io/api/file/s87RiLY3RHGE2FY2dIPT") !important;
}
*/

/* Remove the default library icon and replace it with your own */ /*
svg.collection-icon path{
  display: none !important;
}
svg.collection-active-icon path {
  display: none !important;
}
svg.collection-icon {
  background: url("https://www.filepicker.io/api/file/DLrkzZSRZG0bcfWwX9xt") !important;
  background-size: 24px !important;
}
svg.collection-active-icon {
  background: url("https://www.filepicker.io/api/file/DLrkzZSRZG0bcfWwX9xt") !important;
  background-size: 24px !important;
}
svg.collection-active-icon span {
  color: white !important;
}
/* Remove the default create playlist icon and replace it with your own */
.GlueDropTarget--albums button div div svg path {
  display: none !important;
}
.GlueDropTarget--albums button div div {
  background: url("https://www.filepicker.io/api/file/drQK3SlR6LvqleL1LCzw") !important;
}
button[data-testid="create-playlist-button"] span {
  color: #D7994A !important;
  font-size: 17px !important;
}
*/

/* Remove the default liked icon and replace it with your own */ /*
.GlueDropTarget--tracks a div div svg path{
  display: none !important;
}
.GlueDropTarget--tracks a div div {
  background: url("https://www.filepicker.io/api/file/v6IzpBTtSV2Ztns6KwxK") !important;
}

li[role="listitem"] a span {
  color: #D7994A  !important;
  font-size: 17px !important;
}
li[role="listitem"]:hover {
  transform: scale(1.03) !important;
  cursor: pointer;
}
*/

/* Playlist Changes */
/* Change the background of the header list items in your library */ /*
.JdlKTdpMquftpMwwegZo.oaNVBli46GtVjaQKB15g {
  background-color: #FDF6E3 !important;
}
.JdlKTdpMquftpMwwegZo:hover {
  background-color: #FDE6A9 !important;
}
*/

/* Make the playlist icon rounder */ /*
div[data-testid="playlist-image"] {
  background: transparent !important;
}
div[data-testid="playlist-image"] div img {
  border-radius: 25% !important;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
}
*/
/* Change the color of the playbutton underneath the playlist image */ /*
.fipMme {
  background-color: #FDC635 !important;
}
.fipMme span {
  color: white !important;
}
button[aria-label="Remove from Your Library"] {
  color: #F4767A !important;
}
div[data-testid="action-bar-row"] button[aria-haspopup="menu"] {
  color:#D7994A !important;
}
*/

/* Change the color of the song titles in a playlist */ /*
div[data-testid="tracklist-row"] div[role="gridcell"] div {
  color: #D7994A !important;
}
*/
/* Change the color of the playing animation */ /*
div[data-testid="tracklist-row"] div[role="gridcell"] div img{
  filter: invert(0.6) sepia(10) saturate(10) hue-rotate(170deg) !important;
}
*/

/* Home Section */
/* Change the spotify logo */ /*
div[role="banner"] a svg path {
  filter: invert(0.3) sepia(10) saturate(5) hue-rotate(300deg) !important;
}
*/

/* Change the shortcut icon images */ /*
.Z35BWOA10YGn5uc9YgAp {
  border-radius: 35px !important
}
.zXwER4Lsqq_e7fVVaPkZ {
  border-radius: 50% !important;
  box-shadow: none !important;
}
img[data-testid="shortcut-image"] {
  border-radius: 50% !important;
}
.g3f_cI5usQX7ZOQyDtA9 {
  background-color: #FDF6E3 !important;
}
*/

/* Back and Forward Buttons */ /*
button[data-testid="top-bar-back-button"] {
  background-color: #FDE6A9 !important;
  color: #D7994A !important;
}
button[data-testid="top-bar-forward-button"] {
  background-color: #FDE6A9 !important;
  color: #D7994A !important;
}
.Root__main-view {
  background-color: #FFC9C9 !important;
}
section[data-testid="home-page"] {
  background-color: #FFC9C9 !important;
}
header {
  background-color: #FFC9C9 !important;
  border-color: #FFC9C9 !important;
}
header div {
  background-color: #FFC9C9 !important;
}
*/

/* Change the background color of the playlist cover cards */ /*
.LunqxlFIupJw_Dkx6mNx{
  background-color: var(--hovercolor) !important;
}
*/

/* Change the color of the play buttons on the cover cards */ /*
button[data-testid="play-button"] span {
  background-color: none !important;
  color: var(--hovercolor) !important;
}
div[data-testid="grid-container"] div div div a div {
  color: #D7994A !important;
}
div[data-testid="grid-container"] div div div  {
  color: #D7994A !important;
}
*/

/* Changes within a playlist */ /*
.xYgjMpAjE5XT05aRIezb {
  background: none !important;
}
.koyeY6AgGRPmyPITi7yO.qJOhHoRcFhHJpEQ2CwFT {
  background-color: #FFC9C9 !important;
}
.gHImFiUWOg93pvTefeAD.xYgjMpAjE5XT05aRIezb {
  background-color: #FFC9C9 !important;
}
div.contentSpacing {
  background-color: #FFC9C9 !important;
}
.dZPmmYYhskhqHJCAruvI.wTUruPetkKdWAR1dd6w4 div {
  color: #D6984A !important;
}
nav[data-testid="footer-div"] {
  background-color: #FFC9C9 !important;
}
*/

/* Footer Changes */
/* Change the background-color of the footer */ /*
footer[data-testid="now-playing-bar"] {
  background-color: #FDE6A9 !important;
  border-color: #FDE6A9 !important;
}
*/

/* Remove the expand button */
button[aria-label="Expand"] {
  display: none !important;
}
/* Make the song icon circular */
div.cover-art.shadow {
  border-radius: 50% !important;
}
.cover-art div img[data-testid="cover-art-image"] {
  border-radius: 50% !important;
}

/* Change the color of the song title in the bottom left */ /*
div[data-testid="context-item-info-title"] span a {
  color: #FDC636 !important;
}
div[data-testid="context-item-info-subtitles"] span a {
  color: #FDC636 !important;
}
button[data-testid="pip-toggle-button"] {
  color: #D7994A !important;
}
*/

/* Change the color of the elapsed playback time and song duration*/ /*
.playback-bar__progress-time-elapsed {
  color: #D7994A !important;
}
div[data-testid="playback-duration"] {
  color: #D7994A !important;
}
*/

/* Change color of the progress bar */ /*markdown*/
div[data-testid="progress-bar-background"] div div {
  background-color: var(--hoverback) !important;
}

/*
.player-controls__left button {
  color: #FDC636 !important;
}
.player-controls__right button {
  color: #FDC636 !important;
}
button[data-testid="control-button-playpause"] {
  background-color: #FDC636 !important;
  color: white !important;
}
*/
/* Change the color of the controls on the right side of the footer */ /*
button[data-testid="lyrics-button"] {
  color: black !important;
}
button[data-testid="lyrics-button"]:after{
  background-color: black !important;
}
button[data-testid="control-button-queue"] {
  color: black !important;
}
button[data-testid="control-button-queue"]:after {
  background-color: black !important;
}
button[id="device-picker-icon-button"] {
  color: black !important;
}
button[id="device-picker-icon-button"]:after {
  background-color: black !important;
}
button[data-testid="volume-bar-toggle-mute-button"] {
  color: black !important;
}
button[data-testid="fullscreen-mode-button"] {
  color: black !important;
}
*/

/* Change the speaker button next to the playlist *//*
.CCeu9OfWSwIAJqA49n84.Frn4juLXf6zInWBEFFzr {
  color: #21BBFF !important;
}
*/
/* Top Bar Content Color when scrolling down */ /*
.Type__TypeElement-sc-goli3j-0.hulXhb.G7zO58ORUHxcUw0sXktM {
  color: #D7994A !important;
}
*/

/* Footer Bar when listening on other devices *//*
.Type__TypeElement-sc-goli3j-0.bNyYSN.gQoa8JTSpjSmYyABcag2.encore-bright-accent-set.T3hkVxXuSbCYOD2GIeQd {
  background-color: #D7994A !important;
  color: white !important;
}
.WFRr38dFOxh75JyzSTj5.encore-bright-accent-set.IbmaxRtjqCjqTBpFwCgw {
  border-color: #FDE6A9 !important;
}
*/

		`;
 if(das==true){
    css +=`.Root__nav-bar, .nav-alt .Root__main-view, .nav-alt .Root__nav-bar, .Root__fixed-top-bar{
        background: var(--overlay-heavy)!important;
    }`
  }
//css = "";
		if( document.getElementById("skin") == null){
			if (typeof GM_addStyle != "undefined") {
				GM_addStyle(css);
			} else if (typeof PRO_addStyle != "undefined") {
				PRO_addStyle(css);
			} else if (typeof addStyle != "undefined") {
				addStyle(css);
			} else {
				var node = document.createElement("style");
				node.setAttribute("id", "skin");
				node.type = "text/css";
				node.appendChild(document.createTextNode(css));
				var heads = document.getElementsByTagName("head");
				if (heads.length > 0) {
					heads[0].appendChild(node);
				} else {
					// no head yet, stick it whereever
					document.documentElement.appendChild(node);
				}
			}
		}
		/*.c5a28c705b992b76c45dbb776cf76047-scss ,._2326696e1244e762bd7e426619b02370-scss{   background-color: rgba(0, 0, 0, 0.5)!important;}*/


        observer = new MutationObserver((changes) => {
        changes.forEach(change => {
            var coverartimage = document.querySelectorAll('[data-testid=cover-art-image]')[0]
            if(change.attributeName.includes('src')){
                console.log("Changing background!");
                var sheet = document.createElement('style');
                sheet.setAttribute("id", "background");
                if( document.getElementById("background") != null){
                    document.getElementById("background").remove()
                    //document.getElementById("background").innerHTML = ":root{ --backimg:url(" + document.getElementsByClassName("_64acb0e26fe0d9dff68a0e9725b2a920-scss cover-art-image")[0].src + ");}";
                }
                sheet.innerHTML = ":root{ --backimg:url(" + coverartimage.src + ");}";
                document.body.appendChild(sheet);
                }
            });
        });
        function addObserverIfDesiredNodeAvailable() {
            var coverartimage = document.querySelectorAll('[data-testid=cover-art-image]')[0]
            if(!coverartimage) {
                //The node we need does not exist yet.
                //Wait 500ms and try again
                window.setTimeout(addObserverIfDesiredNodeAvailable,500);
                return;
            }
            var sheet = document.createElement('style');
            sheet.setAttribute("id", "background");
            if( document.getElementById("background") != null){
                document.getElementById("background").remove()
                //document.getElementById("background").innerHTML = ":root{ --backimg:url(" + document.getElementsByClassName("_64acb0e26fe0d9dff68a0e9725b2a920-scss cover-art-image")[0].src + ");}";
            }
            sheet.innerHTML = ":root{ --backimg:url(" + coverartimage.src + ");}";
            document.body.appendChild(sheet);
            observer.observe(coverartimage, {attributes : true});
        }
        addObserverIfDesiredNodeAvailable();

        setInterval(function obs() {
            var coverartimage = document.querySelectorAll('[data-testid=cover-art-image]')[0]
            observer.observe(coverartimage, {attributes : true});
		}, 1500);
        /*
		var temp = ""
		setInterval(function back() {
			'use strict';

			if(coverartimage != undefined){
				if (temp != coverartimage.src) {
					setTimeout(() => { console.log("Changing background!");
					var sheet = document.createElement('style');
					sheet.setAttribute("id", "background");
					if( document.getElementById("background") != null){
						document.getElementById("background").remove()
						//document.getElementById("background").innerHTML = ":root{ --backimg:url(" + document.getElementsByClassName("_64acb0e26fe0d9dff68a0e9725b2a920-scss cover-art-image")[0].src + ");}";
					}
					sheet.innerHTML = ":root{ --backimg:url(" + coverartimage.src + ");}";
					document.body.appendChild(sheet);
					temp = coverartimage.src;
					}, 1000);
					//if(is_scrolling()){
						//console.log("free to scroll");
						if(document.getElementsByClassName("e8ea6a219247d88aa936a012f6227b0d-scss bddcb131e9b40fa874148a30368d83f8-scss _4b308d5c9250cfb0620ce3b40765ef4a-scss")[0] != null && scrolltimeout==0){
							var el = document.getElementsByClassName("e8ea6a219247d88aa936a012f6227b0d-scss bddcb131e9b40fa874148a30368d83f8-scss _4b308d5c9250cfb0620ce3b40765ef4a-scss")[0];
							el.scrollIntoView({
								behavior: "smooth",
								block: "nearest"
							});
						}
					//}
				}
			}

		}, 1500)
        */
	}
}
//document.querySelector("div._3773b711ac57b50550c9f80366888eab-scss.ellipsis-one-line>div>span>a").href.slice(-22,)  album id
	var lastsong="";
	var foundsong=0;
	var replaced=0;

setInterval(function() {
	if (document.getElementsByClassName("xaKMcFuZK3bEXbt3bPdg")[1] != undefined){
		for(i=0;i<document.getElementsByClassName("xaKMcFuZK3bEXbt3bPdg").length;i++){
		document.getElementsByClassName("xaKMcFuZK3bEXbt3bPdg")[i].style.backgroundColor = document.getElementsByClassName("xaKMcFuZK3bEXbt3bPdg")[i].style.backgroundColor.slice(0,-1).concat(", 0.3)")
	}
	};
	if (document.getElementsByClassName("IyZpbhJE52K9fkJmGbAj")[1] != undefined){
		for(i=0;i<document.getElementsByClassName("IyZpbhJE52K9fkJmGbAj").length;i++){
		document.getElementsByClassName("IyZpbhJE52K9fkJmGbAj")[i].style.backgroundColor = document.getElementsByClassName("IyZpbhJE52K9fkJmGbAj")[i].style.backgroundColor.slice(0,-1).concat(", 0.3)")
	}
	};

	// fix for removing the mouseout in homescreen
	/*
	if (document.getElementsByClassName("_560fb0a89f4ec24665eb945cfe2c97b0-scss")[0] != undefined){
		if (replaced == 0){
			var old_element = document.getElementsByClassName("_560fb0a89f4ec24665eb945cfe2c97b0-scss")[0];
			var new_element = old_element.cloneNode(true);
			old_element.parentNode.replaceChild(new_element, old_element);
			replaced =1;
		}
	}
	else{
		replaced =0;
	};
	*/
	/*
	for(k=0;k< document.getElementsByClassName("tracklist-name ellipsis-one-line").length && foundsong==0 ;k++){
		if(document.getElementsByClassName("tracklist-name ellipsis-one-line")[k].innerHTML == lastsong){
			document.getElementsByClassName("tracklist-name ellipsis-one-line")[k].style.color= "#1ed760"
			foundsong =0;
		}
	}
	for(k=0;k< document.getElementsByClassName("tracklist-name ellipsis-one-line").length ;k++){
		if(document.getElementsByClassName("tracklist-name ellipsis-one-line")[k].innerHTML == document.querySelector("div._3773b711ac57b50550c9f80366888eab-scss.ellipsis-one-line > div > span > a").innerHTML){
			document.getElementsByClassName("tracklist-name ellipsis-one-line")[k].style.color= "#1ed760"
			document.getElementsByClassName("tracklist-name ellipsis-one-line")[k-1].style.color= "#fff"
			lastsong = document.getElementsByClassName("tracklist-name ellipsis-one-line")[k].innerHTML
		}
	}*/

if (document.getElementsByClassName("os-viewport os-viewport-native-scrollbars-invisible")[1] != undefined){
	document.getElementsByClassName("os-viewport os-viewport-native-scrollbars-invisible")[1].onscroll = function () {
	document.getElementsByClassName("under-main-view")[0].style.opacity = 1 - document.getElementsByClassName("os-viewport os-viewport-native-scrollbars-invisible")[1].scrollTop/1000*5;
	document.querySelector("div.under-main-view").style.transform = "translateY(-"+(document.getElementsByClassName("os-viewport os-viewport-native-scrollbars-invisible")[1].scrollTop+60)+"px)";
	scrolltimeout=1;
	};
};
//if($.browser.mozilla) {
if(document.getElementById("main") !=null){
  if(document.getElementById("backgroundDIV") == undefined){
 		div = document.createElement('div');

  div.id = 'backgroundDIV';
  div.innerHTML = `
   <div><div class="backgroundDIV" ></div></div>
  `;
main = document.getElementById("main");
main.insertBefore(div,main.firstChild);
  }
}
//}

},1000);

setInterval(function() {
//scrolltimeout=0;

},5000);
