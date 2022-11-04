// ==UserScript==
// @name          SpotOn - Non hidden now playing bar
// @namespace     https://github.com/SenpaiHunters/SpotOn
// @namespace     https://greasyfork.org/en/scripts/452921-spotify-onspot
// @icon          https://github.com/SenpaiHunters/SpotOn/blob/Main/SpotOn%20logo.png?raw=true
// @description	  SpotOn is a complete overhaul of Spotify Web Player's design that includes a customisable new font, a bolded/more prominent menu bar, a redesigned hidden Now Playing Bar (scroll down to see it, want to see how it looks, look above), a changeable time to the right of the progress bar (Refer to the GitHub), a blured backdrop, rainbow controls (These can be turned off simply by removing the command line) a hidden Spotify Logo (Can be turned back on), removal of the bottom content bar, that hosts the social links of Spotify. Captialsation of the first letter (can turn off by removing first-letter {", " text-transform: uppercase !important;}",. But try it before you remove it, you might like it!)
// @author        Kami
// @version       0.5
// @match         http://open.spotify.com/*
// @match         https://open.spotify.com/*
// @match         http://*.open.spotify.com/*
// @match         https://open.spotify.com/*
// @match         https://genius.com/songs/new
// @match         https://*.open.spotify.com/*
// @match         https://open.spotify.com/*
// @match         https://genius.com/songs/new
// @require       https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require       https://greasyfork.org/scripts/406698-geniuslyrics/code/GeniusLyrics.js
// @grant         GM.setClipboard
// @grant         GM_setClipboard
// @supportURL      https://github.com/SenpaiHunters/SpotOn/issues
// @grant           GM.xmlHttpRequest
// @grant           GM.setValue
// @grant           GM.getValue
// @grant           GM.registerMenuCommand
// @grant           GM_openInTab
// @connect         genius.com
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
 * Firefox - ✅
 *
 * Orion - ✅*
 *
 * = Slower performance than chrome based web browsing.
 * ✅ = Supportation of Windows + Mac , there are no required system requirements as it’s simply a userscript/javascript, however, low-end hardware may face some performance drops or lower than expected speed
 *
 *
 * # Install
 * Install Tampermonkey, Violentmonkey or Greasemonkey
 * Copy the Code V3 contents
 * Load the settings of Tampermoneky
 * First by clicking on the extention
 * Click 'Dashboard'
 * You'll first load into 'Installed-Scripts'
 * You then want to click the little plus icon
 * With the contents of Code V3
 * You'll want to press Command+A to select everything, and then press Command+V to paste
 * Hit Command+S to save
 * You have now successfully installed SpotOn!
 * (Note) For windows the keybind is Cntrl instead of Command
 *
 * # Notice
 * It is recommended you install Spotify Dynamic Theme Plus extension for the background, and now playing bar to function correctly.
 * The Dynamic Theme is also required for the Now Playing Bar to auto-hide. If it isn’t installed, the bar will load at the top by default.
 * (This can be changed in settings, as the script is fully user customisable! - look for ‘// main now playing bar’).
 *
 * # Feel like thanking me for my hard work?
 *
 * Totally optional but _truly, deeply_ appreciated and brings a great smile to my face,
 * and inspires me to keep working. ;-)
 *
 * Check my socials out - https://linktr.ee/SenpaiHunter
 * Support via discord - https://discord.gg/pjNn2M22ct
 * YouTube - https://www.youtube.com/channel/UCzSgmjr--CdIPmdkdiLRNow
 * Help Support Me -  https://www.buymeacoffee.com/KamiAMVS
 *
 * # Latest release notes
 * Check out the GitHub (https://github.com/SenpaiHunters/SpotOn)
 */

(function() {var css = [
	"/* Version 0.5 */",
	"",
	"}",
    // Font for the whole of spotify, change the woff link to what you wish
	"",
    "/* Change the URL and Name for any font you'd like */",
    "",
	"/* Import Font */",
	"@font-face {",
	"    font-family: Vibes;",
	"    src: url(https://www.1001fonts.com/) ;",
	"}",
	" @font-face {",
	"    font-family: Vibes;",
	"    src: url(https://www.1001fonts.com/);",
	"    font-weight:bold;",
	"}",
	"",
	"/*Fonts for links */",
	".mo-info-name{",
	" font-family: Vibes; ",
	"    font-weight:normal!important;",
	"}",
	"",
	"h1, h2, .link-subtle{",
	" 	font-family: Vibes !important;  ",
	"    font-weight:normal!important;",
	"}",
	"",
	":root {     ",
	"    --wallpaper: url(\"https://source.unsplash.com/featured/8192x4608/?+hd-wallpaper-%2B-hd-wallpapers\") ; ",
    // i set that as the featured so, if you reload the page you'll see a new image!
	"    --marker: #57A9FF ;",
	"    --playCol: #57A9FF ;",
	"    --hoverCol: #FBCF87 ;",
	"    --line: #00334d ;",
	"    --barCol: 2,2,2 ;",
	"    --barCol55: rgba(var(--barCol),.55) ;",
	"    --barCol60: rgba(var(--barCol),.60) ;",
	"    --barCol65: rgba(var(--barCol),.65) ;",
	"    --barCol95: rgba(var(--barCol),.95) ;",
	"    --barCol100: rgba(var(--barCol),1) ;",
	"    --firstLsize: 1.50em ;}    ",
	"",
	".navBar, .navBar-expand {",
	"    -webkit-box-flex: 1;    ",
	"    flex: 1;",
	"    max-height: calc(100% - 100px) !important;}",
	"",
	"._2ypW2_NbqnDwuBDrAIINHR a {",
	"    line-height: 50px !important;",
	"    height: 0px !important;",
	"    width: 100% !important;",
	"    text-align: center;}",
	"",
	".navBar-group-header, .navBar-item .type {",
	"    letter-spacing: -3px;",
	"    text-transform: lowercase !important;",
	"    font-size: 1000px;}",
	"",
	"body, body.login, body.login *, .SearchInputBox__input, .inputBox-input, .PlaylistRecommendedTracks__top .PlaylistRecommendedTracks__title  {",
	"    font-family: Vibes;",
	"    src: url(https://www.1001fonts.com/) ;",
	"}",
	"* {",
	"    text-decoration: none!important;",
	"    border: none !important;",
	"    word-wrap: break-word;}",
	"",
    // highlight colour when hovering over items - menu bar! Only hex code works.
    // E.G.s, #a020f0b3 is a semi transparent pink, while #000 is black.
	"a, a:focus, a:hover {",
	"    color: #f47fff;}",
	"",
    // Main text shadow
	"#main { ",
	"    text-shadow: 2px -1px 0px #333 !important;}",
	"",
    // Max size
	"@media (min-width: 1600px) {",
	"._11pfm-p6kRU6CrLDyLhi3a a, .asideButton-container a {",
	"    text-align: center !important;",
	"    margin-left: 0px !important;",
	"    width: 200px !important;}",
	".asideButton-container .asideButton{",
	"    margin-left: 0 !important;}}",
	"",
    // Min size
	"@media (max-width: 1599px) {",
	"._11pfm-p6kRU6CrLDyLhi3a a, .asideButton-container a {",
	"    text-align: center !important;",
	"    margin-left: -30px !important;",
	"    width: 180px !important;}",
	".asideButton-container .asideButton{",
	"    margin-left: 0 !important;}}",
	"",
	".asideButton-container ._11pfm-p6kRU6CrLDyLhi3a {",
	"    margin-left: 13.25%;}",
	"",
	"._11pfm-p6kRU6CrLDyLhi3a {",
	"    margin-left: -200px !important;}",
	"",
	".asideButton {",
	"    top: 4px;}",
	"",
	"#main .Root .Root__top-container .main-view-container--has-ads .ads-container, .AdsContainer{",
	"    display: none !important;}",
	"",
    " .beQQox;",
    " color: #333 !important;}",
    // main now playing menu bar sub
	".Root__now-playing-bar {",
    " tUwyjggD2n5KvEtP5z1B background: blur(30px); !important;",
	"    position: fixed;",
    // change pos for menu bar layout
	"    height: 1px;",
	"    width: calc(100% - 50px);",
	"    top: 3px; ",
	"    left: -12px; ",
	"    padding-right: 10px !important;",
	"    margin-bottom: 50px;}",
	"",
    // Chnages the whole NPB Bar boxed outline left or right
    // Chnage 'left' value higher to move right, lower that value to move left.
	"@media (min-width: 1700px) { ",
	"#main .Root .Root__now-playing-bar {   ",
	"    width: calc(100% - 30px);",
	"    left: 14px;}}",
	"",
    // NPB start
	".now-playing-bar{",
	"    height: 30px;",
	"    padding: 4px 4px;",
	"    margin-top: 15px;}",
	"",
	".now-playing-bar-container {",
	"    background-color: backdrop-filter: blur(5px);;}",
	"",
	".now-playing-bar__center {",
	"    margin-left: -20px;}",
	"",
	"@media (max-width: 1000px) { ",
	".now-playing-bar__center {",
	"    margin-left: 12%;}}",
	"",
    // now playing cover art
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
    // cover art end
	"",
	".control-button.spoticon-added-16.control-button--active {",
	"    margin-left: 20px;",
	"    color: var(--marker);}",
	"",
    // No touchy
	".btn.btn-green.cta-button, .btn.btn-black.btn-small, .btn.btn-green, .btn.btn-black, .btn.btn-black:hover, .btn.btn-fg-green, .btn.btn-transparent, .btn.btn-blue.btn-small, .btn-landing.btn-white, .btn-landing.btn-green, .btn.btn-sm.btn-block.btn-facebook.ng-binding, .btn.btn-sm.btn-block.btn-green.ng-binding, .btn.btn-white._3zghGNfKZCH7FVEyqNY3my, button.btn.btn--no-margin.btn--full-width.P7Qjj40AVoE8Igi7Ji05m._1xNlj_ScH8hEMWzrkRt1A, .ResponsiveViewMoreButton__button, .btn.btn-white {",
	"    background: var(--barCol65) !important;  ",
	"    border: -2px solid var(--line) !important;",
	"    border-left: -6px solid rgba(48,48,48,.2) !important;",
	"    border-radius: 3px 150px 6px 6px !important;",
	"    border-right: -6px solid rgba(38,38,38,.2) !important;",
	"    border-radius: -6px !important;  ",
	"    box-shadow: 20px 10px 10px -7px rgba(0,0,0,1), -7px 10px 10px -7px rgba(0,0,0,1), 3px 3px 4px #000, 0px 0px 2px #000;}",
	"",
    // Now plaing menu bar - boxed size change
	".Root__now-playing-bar {",
    // see below nav bar colour for infomation on how to change this! (Markdown - SLS)
	"    background: linear-gradient(to right, rgba(0,0,0,0.6) 0%  ,rgba(0,0,0,0.6) 45% ,rgba(0,0,0,0.6) 55%,rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.6) 100%) !important;",
	"    border: -60px solid var(--line) !important;",
	"    border-left: 120px solid rgba(48,48,48,.2) !important;",
	"    border-radius: 70px 70px 70px 70px !important;",
	"    border-right: -20px solid rgba(38,38,38,.2) !important;",
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
	"    border-left: -1px solid rgba(255,192,203,0.3) !important;",
	"    border-radius: 99px 99px 99px 99px !important;",
	"    border-right: -1px solid rgba(255,192,203,0.3) !important;",
	"    border-radius: 22px !important;  ",
	"    box-shadow: 10px 8px 10px -7px rgba(0,0,0,1), -7px 5px 10px -7px rgba(0,0,0,1), 3px 3px 4px #000, 0px 0px 2px #000;",
    // moves the left bar up or down
	"    margin-top: 65px !important;",
	"    height: calc(100% - 85px) !important;",
    // if you want it fully off to the left side, remove overflow-x
	"    overflow-x:hidden;}",
	"",
	".recently-played.navBar-group {",
	"    margin-top: 10px !important;",
	"    margin-bottom: 20px !important;}",
	"",
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
	"    ",
    // Max width
	"@media (max-width: 1699px) { ",
	".container-fluid.ArtistAbout__container {       ",
	"    width: calc(100% - 60px) !important;",
	"    margin-left: 30px !important}}",
	"",
    // Min Width
	"@media (min-width: 1700px) { ",
	".container-fluid.ArtistAbout__container {   ",
	"    width: calc(100% - 60px) !important;",
	"    margin-left: 30px !important;}}",
	"",
    // Spacing content
	"section.content.artist div div.container-fluid.ArtistAbout__container .contentSpacing {",
	"    max-width: 100%;}",
	"",
    // About adjustment
	".ArtistAbout__insights {",
	"    float: right !important;",
	"    flex: 1 !important;}",
	"",
    // Max adjustment width
	"@media (max-width: 1700px) {",
	".ArtistAbout__insights {",
	"    float: right !important;",
	"    flex: 2 !important;}}",
	"",
	".col-xs-12.col-lg-9.col-xl-8 .tracklist-container  {",
	"    margin-top: 50px !important;}",
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
	".view-header {",
	"    height: 340px !important;}",
	"",
	"@media (min-width: 1700px) {",
	".UserWidget__user-avatar { ",
	"    float: right; ",
	"    right: 8px;}}",
	"",
     // Mics Nav bar
	".navBar-item .collection-icon, .navBar-item .collection-active-icon, .navBar-item .home-icon, .navBar-item .home-active-icon, .navBar-item .search-icon, .navBar-item .search-active-icon {",
	"    margin-left: 150px !important;}",
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
	"@media (min-width: 1700px) {",
	"[dir=\"ltr\"] .navBar-item--with-icon-left .navbar-link__text {",
	"    margin-left: -175px !important;}}",
	"",
	"@media (max-width: 1700px){",
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
	"@media (max-width: 1700px) { ",
	".Root__nav-bar {   ",
	"    width:200px;",
	"    margin-left: 20px !important;}}",
	"",
	"@media (min-width: 1700px) { ",
	".Root__nav-bar {   ",
	"    margin-left: 30px !important;}}",
	"",
	".sessionInfo  {",
	"    margin-bottom: -90px !important;}",
	"",
	"@media (max-height: 869px) {",
	".recently-played .recently-played__item-5 {",
	"    display: none !important;}}",
	"",
	"@media(max-height: 819px) {",
	".recently-played .recently-played__item-4 {",
	"    display: none !important;}}",
	"",
	"@media(max-height: 769px) {",
	".recently-played .recently-played__item-3 {",
	"    display: none !important;}}",
	"",
	"@media(max-height: 719px) {",
	".recently-played .recently-played__item-2 {",
	"    display: none !important;}}",
	"",
	"@media(max-height: 669px) {",
	".recently-played {",
	"    display: none !important;}}",
	"",
	".control-button.spoticon-shuffle-16.control-button--active.control-button--active-dot, .control-button.spoticon-repeat-16.control-button--active.control-button--active-dot, .control-button.spoticon-repeatonce-16.control-button--active.control-button--active-dot {",
	"    color: var(--playCol) !important;}",
	"",
	".control-button:active, .spoticon-heart-active-16, .spoticon-heart-active-24{",
	"    color: var(--playCol) !important;}",
	"",
	".track-info__artists a:link:active, .react-contextmenu-wrapper a:active  {",
	"    color: var(--playCol);}",
	"",
	".mo-meta a:link:active, .footerLinks__item:active  {",
	"    color: var(--marker);}",
	"",
	".Vg0L1vwJXv5JSYn-HUx0C.link-subtle._2rScaV3bBHoj7O47a_JnaH {",
	"    color: var(--marker)!important;}",
	"",
	".control-button--active-dot:after {",
	"    background-color: var(--playCol) !important;}",
	"",
	".navBar-link--active::after, .RecentlyPlayedWidget__link--active::after {",
	"    width: 0 !important;}",
	"",
	".link-subtle.navBar-link.ellipsis-one-line.navBar-link--active, A[href=\"/settings/account\"]:active {",
	"    color: var(--marker) !important;}",
	"",
	".artist-music.container-fluid, .artist-albums, ._2rScaV3bBHoj7O47a_JnaH:after, ._2rScaV3bBHoj7O47a_JnaH:hover:after {",
	"    background: transparent !important;}",
	"",
	".control-button.spoticon-pause-16.control-button--circled {",
	"    color: var(--playCol) !important;} ",
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
	"    padding-right:6x !important;}",
    // inner right padding for menu bar
	"",
	".accountPage .icon, .downloadPage-inner {",
	"    margin-top: 50px;}",
	"",
	".tracklist-row {",
	"    margin-bottom: 7px !important; ",
	"    height: 40px !important;",
	"    border: 1px solid transparent !important;}",
	"",
	".tracklist-name.ellipsis-one-line{ ",
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
	".TrackListRow__explicit-label {",
	"    background: rgba(255,255,255,.2) !important;",
	"    color: inherit !important;",
	"    margin-right: 16px !important;}",
	"",
	".tracklist-row.tracklist-row:hover {",
	"    font-size: .9rem;",
	"    color: var(--hoverCol) !important;",
	"    border: 1px solid #00364d !important;",
	"    border-bottom: 1px solid #002233 !important;",
	"    background: linear-gradient(to top, #002233 0%, #00334d 100%) !important; ",
	"    box-shadow: 3px 3px 4px #000, 0px 0px 2px #000 !important;  ",
	"    border-radius: 4px !important;}",
	"",
	".tracklist-row.tracklist-row--active {",
	"    height: 40px !important;",
	"    font-size: 1rem !important;",
	"    color: var(--playCol) !important;",
	"    border: 1px solid #00364d !important;",
	"    border-bottom: 1px solid #002233 !important;",
	"    background: linear-gradient(to top, #002233 0%, #00334d 100%) !important; ",
	"    box-shadow: 3px 3px 4px #000, 0px 0px 2px #000 !important;  ",
	"    border-radius: 4px !important;}",
	"",
	".navBar-group-header::first-letter, .navBar-item .type::first-letter {",
	"    text-transform: capitalize;}",
	"",
	".navBar-group-header, .navBar-item .type {",
	"    letter-spacing: 0.6px;",
	"    text-transform: lowercase !important;",
	"    font-size: 12px;}",
	"",
	".btn.btn-green.cta-button, .btn.btn-black.btn-small, .btn.btn-green, .btn.btn-black, .btn.btn-black:hover, .btn.btn-fg-green, .btn.btn-transparent, .btn.btn-blue.btn-small, .btn-landing.btn-white, .btn-landing.btn-green, .btn.btn-sm.btn-block.btn-facebook.ng-binding, .btn.btn-sm.btn-block.btn-green.ng-binding, .btn.btn-white._3zghGNfKZCH7FVEyqNY3my, button.btn.btn--no-margin.btn--full-width.P7Qjj40AVoE8Igi7Ji05m._1xNlj_ScH8hEMWzrkRt1A, .ResponsiveViewMoreButton__button, .btn.btn-white {",
	"    font-size: 21px !important;",
	"    font-weight: 400 !important;",
	"    /* Import Font */",
	"@font-face {",
	"    font-family: caviarDreams;",
	"    src: url(https://cyberlapse.github.io/SpotifyStylishExtension/CaviarDreams.woff) ;",
	"}",
	" @font-face {",
	"    font-family: caviarDreams;",
	"    src: url(https://cyberlapse.github.io/SpotifyStylishExtension/CaviarDreams_Bold.ttf) format(\'truetype\');",
	"    font-weight:bold;",
	"}",
	"",
	"/*Fonts for links */",
	".mo-info-name{",
	" font-family:caviarDreams; ",
	"    font-weight:normal!important;",
	"}",
	"",
	"h1, h2, .link-subtle{",
	" 	font-family:caviarDreams !important;  ",
	"    font-weight:normal!important;",
	"}",
	"    text-transform: lowercase !important;",
	"    letter-spacing: 1px;",
	"    transition-property: color;",
	"    transition-duration: .2s;",
	"    transition-timing-function: linear;",
	"    color: hsla(0,0%,100%,.65);",
	"    padding-top: 1em !important;",
	"    padding-bottom: 1em !important;",
	"    line-height: 18px;",
	"    height: 50px !important;",
	"    border-right: 1px solid rgba(38,38,38,.2) !important;",
	"    border-radius: 4px !important;  ",
	"    box-shadow: 9px 5px 10px -7px rgba(0,0,0,1), -7px 5px 10px -7px rgba(0,0,0,1), 3px 3px 4px #000, 0px 0px 2px #000;}",
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
	".search-history .btn.btn-black{",
	"    width: 300px !important;}",
	"",
	"@media (max-width: 1440px) {",
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
	".btn.btn-green.cta-button::first-letter, .btn.btn-black.btn-small::first-letter, .btn.btn-green::first-letter, .btn.btn-black::first-letter, .btn.btn-black:hover::first-letter, .btn.btn-fg-green::first-letter, .btn.btn-transparent::first-letter, .btn.btn-blue.btn-small::first-letter, .btn-landing.btn-white::first-letter, .btn-landing.btn-green::first-letter, .btn.btn-sm.btn-block.btn-facebook.ng-binding::first-letter, .btn.btn-sm.btn-block.btn-green.ng-binding::first-letter, .ResponsiveViewMoreButton__button::first-letter, .btn.btn-white::first-letter {",
	"    font-size: var(--firstLsize) !important;",
	"    text-transform: capitalize;",
	"    position: relative;}",
	"",
	".btn:not(.disabled):focus, .btn:not(.disabled):hover, .btn-landing:not(.disabled):focus, .btn-landing:not(.disabled):hover, .ResponsiveViewMoreButton__button:focus, .ResponsiveViewMoreButton__button:not(.disabled):hover {",
	"    transition: all 100ms cubic-bezier(.3,0,0,1);",
	"    transform: scale(1);}",
	"",
	".btn:not(.disabled):active, .btn-landing:not(.disabled):active, .ResponsiveViewMoreButton__button:not(.disabled):active  {",
	"    transition: all 100ms cubic-bezier(.3,0,0,1) !important;",
	"    transform: scale(.9);}",
	"",
	".tracklist-row .tracklist-play-pause:not(.disabled):active, .tracklist-row:not(.disabled):active .icon-play, .icon-pause {",
	"    padding: 0}",
	"",
	".player-controls__buttons {",
	"    margin-top: 15px;}",
	"",
	".control-button {",
	"    width: 26px;",
	"    min-width: 26px;",
	"    height: 26px;",
	"    position: relative;",
	"    transition: all 33ms cubic-bezier(.3,0,.7,1);}",
	"",
	".progress-bar { ",
	"    position: relative;}",
	"",
	".progress-bar::after {",
	"    content: \'\';",
	"    position: absolute;",
	"    top: -120%;",
	"    bottom: -120%;",
	"    width: 120%;",
	"    height: 200%;}",
	"",
	".progress-bar__fg {",
	"    background: linear-gradient(to right, backdrop-filter: blur(5px); 90%, var(--playCol)99%, #fff 100%), linear-gradient(to bottom left, backdrop-filter: blur(5px); 95%,var(--playCol)99.5%, var(--playCol) 100%) !important;",
	"    border-radius: 4px;",
	"    height: 4px;",
	"    transition: background-color .1s cubic-bezier(.3,0,.7,1);}",
	"",
	".volume-bar .progress-bar__fg {",
	"    background: linear-gradient(to right, backdrop-filter: blur(5px); 90%, var(--playCol)99%, #fff 100%), linear-gradient(to bottom left, backdrop-filter: blur(5px); 95%,var(--playCol)99.5%, var(--playCol) 100%) !important;}",
	"",
	".volume-bar .progress-bar__bg {",
	"    background: rgba(0,0,0,.25) !important;",
	"    border-radius: 4px;}",
	"",
	".volume-bar .progress-bar {",
	"    margin-right: -23px;}",
	"",
    // progress bar
	".now-playing-bar__center .progress-bar__bg {",
	"    background: rgba(0,0,0,1) !important;",
	"    border-radius: 12px;",
	"    margin-top: -11px;}",
	"",
	".playback-bar__progress-time {",
	"    font-size: 200px !important;",
	"    margin-bottom: 2px !important;",
	"    margin-top:-1px !important;",
	"    min-width: 50px;}",
	"",
	".playback-bar__progress-time::first-letter {",
	"    font-size: var(--firstLsize) !important;}",
    "",
	".content.ZI0UgbCT8bKeDxk-G9uhC, .hw-accelerate {",
	"    background: none!important;",
	"    content: \"\";}",
	"",
	".track-name-wrapper.ellipsis-one-line.tracklist-top-align {",
	"   background: backdrop-filter: blur(5px); !important;}",
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
	"@media (max-width: 1500px) {",
	".link-subtle.navBar-link.ellipsis-one-line, .user-link {",
	"    font-size: .9rem !important;}}",
	"",
	".tracklist-container {",
	"    font-size: .9rem;}",
	"",
	"LI[class=\"tracklist-row\"][role=\"button\"][tabindex=\"0\"] {",
	"    background: transparent;}",
	"",
	".tracklist-row.tracklist-row--active {",
	"    line-height: 24px !important;}",
	"",
	".tracklist-row.tracklist-row .position { ",
	"    margin-bottom: 4px !important;}",
	"",
	".tracklist-row .tracklist-col.name .track-name-wrapper .artists-album { ",
	"    display: inline; ",
	"    padding-left: 20px;}",
	"",
	".track-name-wrapper .tracklist-row__album-name-link, .track-name-wrapper .tracklist-row__artist-name-link {",
	"    font-size: 1rem !important;",
	"    color: rgba(255,255,255,.7) ;",
	"    opacity: 1 !important;}",
	"._2NmuSzp6vWIr47yUIVCgdY {",
	"    width: 100%;",
	"    padding: 0 30%;",
	"    background-color: transparent;}",
	"",
	"._1pVwzxv-TDj4dEFi0N3B-_ .btn.btn-transparent  {",
	"    display: none;}",
	"",
	".tracklist-row.tracklist-row--oneline, .tracklist-row.tracklist-row--oneline .tracklist-col { ",
	"    height: 3rem;}",
	"",
	".search-history li a h1, #main > DIV > DIV:nth-child(4) > DIV:last-child > DIV:first-child > SECTION > DIV > DIV > UL > LI > A > SPAN { ",
	"    font-size: 20px; ",
	"    font-weight: 100; ",
	"    color: var(--marker)!important;}",
	"",
	".ConnectBar, ._3pZQC_msqsNA7nsxYWWeGJ, .ITVPJxOvtLt7upeE1TV9- {",
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
	"    box-shadow:3px 3px 4px #000, 0px 0px 2px #000,  inset 0px 0px 5px #000;}",
	"",
	".ITVPJxOvtLt7upeE1TV9- {",
	"    top: 80px;}",
	"",
	".ConnectBar::after{",
	"    right: 113px !important;}",
	"",
	".spoticon-devices-16.control-button.control-button--active,",
	".connect-device-list-item--active, .connect-device-list-item--active .connect-device-list-item__device-subtitle, .connect-device-list-item--active .connect-device-list-item__icon {",
	"    color: var(--playCol) !important;}",
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
	"    right: -120px;}",
	"",
	".connect-device-list-container::before {",
	"    content: none;}",
	"",
	".react-contextmenu.react-contextmenu--visible {",
	"    background: linear-gradient(to bottom, #141414 0%,#292929 100%); ",
	"    border: 1px solid var(--line) !important;",
	"    border-left: 1px hidden !important;",
	"    border-right: 1px hidden !important;",
	"    box-shadow:3px 3px 4px #000, 0px 0px 2px #000; ",
	"    border-radius: 4px !important;}",
	"",
	".react-contextmenu-item:hover {",
	"    background: transparent !important;}",
	"",
	".Root__nav-bar .logo {",
	"    width: calc(100%) !important;",
	"    transition: all 1000ms ease-in !important;",
	"    transform: scale(1.6) !important; ",
	"    text-align: center !important;",
	"    opacity: 0.75 !important;}",
	"",
	"section.content.album.contentSpacing .col-xl-8, section.content.playlist.contentSpacing .col-xl-8 {",
	"    padding-top: 45px !important;} ",
	"",
	".logo:hover {",
	"    opacity: 1 !important;}",
	"",
	".navBar-header .logo {",
	"    padding: 27px;",
	"    margin-bottom:20px;}",
	"",
	"@media (max-width: 1700px) {",
	".navBar-header .logo {",
	"    margin-left: -27px;}}",
	"",
	".inputBox {",
	"    padding-top: 80px;",
	"    padding-left: 25px;}",
	"",
	"@media (max-width: 1700px) {",
	".inputBox {",
	"    margin-left: -25px ;}}",
	"",
	"@media (max-width: 1440px) {",
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
	".now-playing__radio-icon, .now-playing__radio-icon svg{",
	"    display:none;}",
	"",
	".mo-info::first-letter, *::first-letter, *:focus::first-letter, *:hover::first-letter {",
	"    font-size: var(--firstLsize) !important;}",
	"",
	".playback-bar__progress-time::first-letter{",
	"    color:white}",
	"",
	".RecentlyPlayedWidget__type {",
	"    color: #b3b3b3 !important;",
	"    text-transform: lowercase !important;}",
	"",
	".RecentlyPlayedWidget__type::first-letter {",
	"    text-transform: uppercase !important;}",
	"",
	".AoH1i4drqTCg9DJoGF3Sp .col-xs-12{",
	"    margin-left: 50% !important;}",
	"",
	".Root__main-view .container-fluid{",
	"    margin-left:30px !important;",
	"    margin-right:30px !important;}",
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
	".EmptyState__title {",
	"    font-size: 30px;",
	"    display: none}",
	"",
	".EmptyState__subtitle {",
	"    margin-top: -10px;",
	"    font-size: 20px;",
	"    color: #fff;}",
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
	".tracklist-col-recommended-add {",
	"    padding-left: 1em !important;",
	"    -webkit-box-align: baseline;",
	"    align-items: baseline;}",
	"",
	".tracklist-col-recommended-add .btn.btn-black.btn-small {",
	"    font-size: 1em !important;",
	"    width: 135px !important;",
	"    margin-left: 0em !important;",
	"    padding-top: .6em !important;",
	"    padding-bottom: 1.4em !important;",
	"    background: transparent !important;",
	"    box-shadow: none !important;",
	"    border: none !important;}",
	"",
	".tracklist-col-recommended-add .btn.btn-black.btn-small:not(active):hover {",
	"    font-size: 1.28em !important;",
	"    color: #fff !important;}",
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
	"    background: url(\"https://image.ibb.co/gmAKaf/256.png\") center center, radial-gradient(ellipse at center, rgba(255,255,255,.09) 10%, rgba(255,255,255,.08) 20%, rgba(255,255,255,.06) 40%,rgba(255,255,255,.05) 65%,rgba(255,255,255,0) 79%) !important;",
	"    background-size: 175px 175px !important;",
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
	"@media (max-width: 1700px) {",
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
	".logo svg {",
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
	".logo svg:active {",
	"    background: radial-gradient(ellipse at center, rgba(200,200,200,.15) 10%, rgba(200,200,200,.14) 20%, rgba(200,200,200,.20) 40%,rgba(255,255,255,.15) 65%,rgba(255,255,255,0) 79%);",
	"    box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, .75), 0px 0px 20px 1px rgba(255, 255, 255, .15), inset 0px 0px 10px 5px rgba(0, 0, 0, .35), inset 0px 0px 25px 1px rgba(0,0,0, 0.35)!important;",
	"    border-left: 3px solid rgba(0,0,0,1)  !important;",
	"    border-right: 3px solid rgba(0,0,0,1)  !important;",
	"    border-color: var(--marker) !important;",
	"    image-rendering: optimizeSpeed !important;}",
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
	"@media (max-width: 1700px) {",
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
	".user-info.col-md-12 figure.avatar.user-avatar {",
	"    width: 130px !important;",
	"    height: 130px !important;",
	"    background: url(\"https://image.ibb.co/gmAKaf/256.png\") center !important;",
	"    background-size: 127px 127px !important;",
	"    image-rendering: optimizeQuality !important;",
	"    -webkit-animation: rotater 30s infinite linear ;}",
	".tracklist-row--active .tracklist-col.position-outer,",
	".tracklist-row:hover .tracklist-col.position-outer {",
	"    margin-top: -1px !important;}",
	"",
	".tracklist-row.tracklist-row--oneline",
	".track-name-wrapper.ellipsis-one-line.tracklist-top-align {",
	"    margin-top: 7px !important;}",
	"",
	".tracklist-top-align {",
	"    margin-top: 8px !important;}",
	"",
	".tracklist-container .tracklist-col.position-outer,",
	".tracklist-container:hover .tracklist-col.position-outer {",
	"    margin-top: 0px !important;}",
	"",
	".tracklist-top-align .icon-pause{",
	"    transform: translateY(2px) !important;}",
	"",
	".tracklist-top-align .icon-play {",
	"    transform: translateY(4px) !important;}",
	"",
	".tracklist-row.tracklist-row .position {",
	"    opacity: 1 !important;}",
	"",
	".tracklist-row.tracklist-row--oneline {",
	"    margin-top: -4px !important;}",
	"",
	".tracklist-row.tracklist-row--oneline .tracklist-col {",
	"    margin-top: 0px !important;}",
	"",
	".react-contextmenu-wrapper .tracklist-middle-align {",
	"    transform: translateY(-70%);}",
	"",
	".tracklist-row.tracklist-row--oneline .btn.btn-transparent.btn--narrow.btn--no-margin.btn--no-padding {",
	"    margin-top: 20px !important;}",
	"",
	".tracklist-row.tracklist-row--active .second-line{",
	"    margin-top: -2px !important;}",
	"",
	".spoticon-track-16, .spoticon-podcasts-16::before  {",
	"    display: none;}",
    "",
    "/* On wards new in version 0.3 - commands below should hide the spotify logo! */",
    "/* Hide spotify logo */",
	".logo path {",
	"	display:none;",
	"}",
	"/* remove space */",
	" .navBar-header {  ",
	"     height:0px;",
	"     padding:0px;",
	"}",
    "*/ new addition in V 0.3 - elements having a ranbow coloue, which is fully customisable!/",
   	"/***********************************Advanced Customization For Update V 0.3 **********************************************/",
	"",
	"",
	"/* Search bar*/",
	".SearchInputBox{",
	"    padding-top: 80px!important;",
	"    padding-bottom: 5px!important;",
	"    background: none;",
	"    padding: 0 0em;",
	"    margin: 0 auto;",
	"    max-width: 1543px;",
	"    max-height:85px;",
	"    padding-left: 0px;",
	"}",
	"",
	"._1Fj-rlIZXTSNgYOCuLh7xo{",
	"    font-size:30px!important;",
	"}",
	"",
	"",
	"/* Spin */",
	" .cover-art-image.cover-art-image-loaded, .cover-art.shadow.actionable.cover-art--with-auto-height, .cover-art-image.cover-art-image-loaded, .cover-art-image:before, .cover-art-image-loaded, .cover-art.shadow, .actionable.cover-art--with-auto-height{",
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
	"/* Round albums - in order for this to be active commands from above need to be removed! This is off by default*/",
	" .cover-art.shadow.actionable.cover-art--with-auto-height, .cover-art.shadow {",
	"     border-radius: 100000px;",
	"}",
		"/* Nav bar rainbow background */",
	" .nav-bar-container, .now-playing-bar-container {",
	"     background: linear-gradient(124deg, #ff000036, #ff800036, #ffff0036, #80ff0036, #00ff0036, #00ff8036, #00ffff36, #0080ff36, #0000ff36, #8000ff36, #ff008036);",
	"     -webkit-animation: rainbow 10s linear infinite;",
	"     -z-animation: rainbow 10s linear infinite;",
	"     -o-animation: rainbow 10s linear infinite;",
	"     animation: rainbow 10s ease infinite;",
	"}",
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
	"     font-size: 20px!important;",
	"}",
	"/* Now playing alignment buttons*/",
	" .player-controls__buttons {",
	"     margin-bottom: 0px;",
	"     cursor: default;",
	"     display: -ms-flexbox;",
	"     display: flex;",
	"     width: 250px;",
	"     -ms-flex-pack: justify;",
	"     justify-content: space-between;",
	"     -ms-flex-flow: row nowrap;",
	"     flex-flow: row nowrap;",
	"}",
	"/* NOWPLAYING PLAY BUTTON */",
	" .control-button {",
	"     animation: rainbow-text 30s infinite;",
	"     background-color: transparent;",
	"     cursor: pointer;",
	"     width: 50px;",
	"     min-width: 30px;",
	"     height: 30px;",
	"     position: relative;",
	"}",
	"/* Rainbow text - now playing */",
	" .playback-bar__progress-time{",
	"     animation: rainbow-text 30s infinite;",
	"     font-size: 15px!important;",
	"     font-weight: bold;",
	"}",
	"/* Rainbow text - everything else */",
	" :before, :after {",
	"     animation: rainbow-text 30s infinite;",
	"     font-size: 32px!important;",
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
	"/* *****************Scroll bar (This may not work) ************ */",
	"/* Scroll bar - size */",
	" ::-webkit-scrollbar {",
	"     width: 15px;",
	"     height: 2px;",
	"}",
	"/* Scroll bar - padding */",
	" ::-webkit-scrollbar-button {",
	"     width: 0px;",
	"     height: 0px;",
	"}",
	"/* Scroll bar - not in use*/",
	" ::-webkit-scrollbar-thumb {",
	"     background: linear-gradient(230deg, #ff000036, #ff800036, #ffff0036, #80ff0036, #00ff0036, #00ff8036, #00ffff36, #0080ff36, #0000ff36, #8000ff36, #ff008036);",
	"     -webkit-animation: rainbow 10s linear infinite;",
	"     -z-animation: rainbow 10s linear infinite;",
	"     -o-animation: rainbow 10s linear infinite;",
	"     animation: rainbow 10s ease infinite;",
	"     border-radius:50px;",
	"}",
	"/* Scroll bar - hover over */",
	" ::-webkit-scrollbar-thumb:hover {",
	"     background: linear-gradient(230deg, #ff00007a, #ff80007a, #ffff007a, #80ff007a, #00ff007a, #00ff807a, #00ffff7a, #0080ff7a, #0000ff7a, #8000ff7a, #ff00807a);",
	"     -webkit-animation: rainbow 10s linear infinite;",
	"     -z-animation: rainbow 10s linear infinite;",
	"     -o-animation: rainbow 10s linear infinite;",
	"     animation: rainbow 1s ease infinite;",
	"}",
	"/* Scroll bar - in use active*/",
	" ::-webkit-scrollbar-thumb:active {",
	"     background: linear-gradient(230deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff0080);",
	"     -webkit-animation: rainbow 10s linear infinite;",
	"     -z-animation: rainbow 10s linear infinite;",
	"     -o-animation: rainbow 10s linear infinite;",
	"     animation: rainbow 1s ease infinite;",
	"}",
	"/* Scroll bar - not in use */",
	" ::-webkit-scrollbar-track {",
	"     background: #056f572e;",
	"     border: 0px none #ffffff;",
	"     border-radius: 50px;",
	"}",
	"/* Scroll bar - hover over */",
	" ::-webkit-scrollbar-track:hover {",
	"     background: #0086682e;",
	"}",
	"/* Scroll bar - active */",
	" ::-webkit-scrollbar-track:active {",
	"     background: #00866873;",
    "  /******     End for colour chaing icons / spins - and end for V 0.3 - Stay tuned for more!  *********/",
	"",

        "  /******     V 0.4 - Copy track info! This means the song name and artist!  *********/",
(function () {
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




    //V 0.4  Addition of Copying tracks, and addition of Genius Lyric if Spotify doesn't already have it

'use strict'

const scriptName = 'No Spotify Lyrics? Then Lets Check Genius!'
let genius
let resizeLeftContainer
let resizeContainer
let optionCurrentSize = 30.0
GM.getValue('optioncurrentsize', optionCurrentSize).then(function (value) {
  optionCurrentSize = value
})

function closeModalUIs () {
  document.querySelectorAll('.modal_ui_spotify_genius_lyrics').forEach(div => div.remove())
}

function alertUI (text, buttons = { OK: true }) {
  return new Promise(function (resolve) {
    const bg = document.body.appendChild(document.createElement('div'))
    bg.style.display = 'block'
    bg.style.position = 'fixed'
    bg.style.backgroundColor = 'rgba(0,0,0,0.5)'
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
    div.style.lineHeight = '1.5'
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
// GitHub (support, and new code) - https://github.com/SenpaiHunters/SpotOn/issues
// Greasyfork.org - https://greasyfork.org/en/scripts/452921-spotify-spoton

skin(true);
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
	console.log(message.txt);
	if (message.bool == "false"){
	var el=document.getElementById("skin")
	el.remove()
	}
	if (message.bool == "true"){
	skin(true);
	}
}
/*(function() {
    // Load the script
    const script = document.createElement("script");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    script.type = 'text/javascript';
    script.addEventListener('load', () => {
      console.log(`jQuery ${$.fn.jquery} has been loaded successfully!`);
      // use jQuery below
    });
    document.head.appendChild(script);
  })();

var timescroll;
var timesincescroll;
var currtime;
var d = new Date();
window.onscroll = function (e)
	{
		console.log("scrolled");
		timescroll = d.getSeconds();
	}
setInterval(function() {
	currtime = d.getSeconds();

	timesincescroll = currtime - timescroll;
	console.log("checked: "+timesincescroll);
}, 1000)
 let didScroll = false;

    window.onscroll = () => didScroll = true;
    setInterval(() => {
        if ( didScroll ) {
            didScroll = false;
			window.lastScrollTime = new Date().getTime()
            console.log('Someone scrolled me!')
        }
    }, 250);
setInterval(() => {
var syntheticEvent = new WheelEvent("syntheticWheel");

console.log(syntheticEvent.deltaY);
}, 250);
/*window.addEventListener("scroll",function(){
    window.lastScrollTime = new Date().getTime()
	console.log("scrolled");
});
function is_scrolling() {
	console.log("checked:");
    return window.lastScrollTime && new Date().getTime() < window.lastScrollTime + 60000
}
*/

var scrolltimeout=0;
function skin(exe) {
	if(exe == true){
		let css = "";
		css += `@charset "UTF-8";



`;
 css += `/* ------Created by Kami--------


 */
:root {
    --overlay-heavy: rgba(0, 0, 0, 0.4);
    --standard-ease: 350ms cubic-bezier(0.215, 0.61, 0.355, 1);
    --white: #fff;
    --hoverback: hsla(0, 0%, 100%, .1);
    --blur: 20px; }
.encore-dark-theme {
    --text-subdued: #ffffffe0!important; }

/*------------------dynamic background-----------------------*/
@supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
    :root,
    #main,
    .Root {
        background-image: var(--backimg);
        display: block;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-size: cover;
        transition-duration: 1s;
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
        backdrop-filter: blur(var(--blur)) }
    #main > div {
        box-shadow: inset 0px 7px 20px 4px #000!important; } }
.backgroundDIV {
    background-image: var(--backimg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-size: cover;
    transition-duration: 1s;
    background-position: center;
    background-color: #282828;
    filter: blur(50px);
    width: 100vw;
    height: 100vh;
    position: absolute; }
.Root__top-container {
    backdrop-filter: blur(50px); }


#main > div {
    box-shadow: inset 0px 2px 70px 4px #0000006e; }
.Root__top-container,
.nav-alt .Root__top-container,
.nav-alt .QO9loc33XC50mMRUCIvf,
.J6VTd7VdGN2PM_oXCAyH {
    background-color: var( --overlay-heavy); }
.Root__nav-bar,
.nav-alt .Root__main-view,
.nav-alt .Root__nav-bar,
.Root__fixed-top-bar {
    background: transparent; }
.nav-alt .Root__top-container {
    padding: 0px; }
.Root__fixed-top-bar {
    padding-top: 10px;
    padding-left: 120px;
    padding-right: 30px; }




/*-------Home button-----*/
#main > div.Root.encore-dark-theme.nav-alt > div.Root__top-container > div.Root__fixed-top-bar > div:nth-child(2) > a:hover {
    filter: brightness(1.5);
    background: none;
}
#main > div.Root.encore-dark-theme.nav-alt > div.Root__top-container > div.Root__fixed-top-bar > div:nth-child(1) {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: end;
}
#main > div.Root.encore-dark-theme.nav-alt > div.Root__top-container > div.Root__fixed-top-bar > div:nth-child(2) > a {
    position: absolute;
    left: 34px;
    top: 24px;
    width: 150px;
    background-color: transparent;
    justify-content: flex-start;
}
#main > div.Root.encore-dark-theme.nav-alt > div.Root__top-container > div.Root__fixed-top-bar > div:nth-child(2) > a:after {
    margin-top: 12px;
    margin-left: 39px;
    content: "Home";
    position: absolute;
    color: rgb(215 214 215);
    top: 0;
    left: 0;
    z-index: -1;
}

/*---------------text-----------------*/
.RootlistItem__link:link,
.RootlistItem__link:visited,
.link-subtle {
    color: var(--white);
    opacity: .8; }
.RootlistItem__link:focus,
.RootlistItem__link:hover,
.link-subtle:focus,
.link-subtle:hover {
    opacity: 1; }
.d1c9699572913ee01b0280946ab1f470-scss,
main-navBar-navBarLinkActive {
    background-color: var(--hoverback); }


._966e29b71d2654743538480947a479b3-scss a,
standalone-ellipsis-one-line a,
.c6287512c50a737d01bd9db32b301fab-scss a,
main-trackList-rowSectionVariable a,
._6b1ff8eab07810e2b7845ffe28430e38-scss,
main-trackList-rowSectionIndex a,
body,
._3957b7dd066dbbba6a311b40a427c59f-scss,
.main-cardSubHeader-root,
._9a78420cc4a863b2f413ce55e759a321-scss:link,
._9a78420cc4a863b2f413ce55e759a321-scss:visited,
.main-rootlist-textWrapper:link,
.main-rootlist-textWrapper:visited,
.f3fc214b257ae2f1d43d4c594a94497f-scss,
.main-rootlist-textWrapper,
.b490086127ec0ecdc7b170c03de9c5b1-scss,
.__whSyV64vHUPUxZSpRJ,
.OVe33QZtu7pqMRtApCfF,
.wI16x3qtEZ6y9rsyL6f_,
.mbvP8zroENoL_DNWYq4s,
.main-seeAll-link,
.lm4ptx0mVHQ1OEgJR6R5 a,
._kd5kutoy5xRha0qD0Vz,
.FS85JWWz3ayMxrFzBjRD,
.os-content a {
    color: #ffffffe0!important; }

._kd5kutoy5xRha0qD0Vz:hover,
.os-content a:hover {
    color: #fff!important; }

.da0bc4060bb1bdb4abb8e402916af32e-scss,
.main-trackList-rowTitle,
.f3fc214b257ae2f1d43d4c594a94497f-scss,
.__whSyV64vHUPUxZSpRJ,
.OVe33QZtu7pqMRtApCfF,
.wI16x3qtEZ6y9rsyL6f_,
.mbvP8zroENoL_DNWYq4s,
._gvEBguxvbSruOQCkWrz,
.main-type-mesto,
.lkLwhOqn_uyfjwAxRbbC,
.vQ8EkR_krbAi5mYmmpCn,
.FS85JWWz3ayMxrFzBjRD {
    text-shadow: 0 0 4px black; }
.e8ea6a219247d88aa936a012f6227b0d-scss._4b308d5c9250cfb0620ce3b40765ef4a-scss ._6b1ff8eab07810e2b7845ffe28430e38-scss,
.e8ea6a219247d88aa936a012f6227b0d-scss._4b308d5c9250cfb0620ce3b40765ef4a-scss .da0bc4060bb1bdb4abb8e402916af32e-scss,
.main-trackList-trackListRow.main-trackList-active .main-trackList-rowMarker,
.main-trackList-trackListRow.main-trackList-active .main-trackList-rowTitle,
._OpqIZJH2IqpNqAS9iJ7.SzCNXJJQz7BiDOO0B2Xv ._gvEBguxvbSruOQCkWrz,
._OpqIZJH2IqpNqAS9iJ7.SzCNXJJQz7BiDOO0B2Xv .ax_46rB4EOK3hF__KEMO,
._cx_B0JpuGl6cJE7YqU1.ggAaYdWWy1P_IcJbsMeZ .eyyspMJ_K_t8mHpLP_kP,
._cx_B0JpuGl6cJE7YqU1.ggAaYdWWy1P_IcJbsMeZ .zM1OMw7zDqUcaPz7XCa3 {
    color: #33ff7b!important; }

#main > div.Root.encore-dark-theme > div.Root__top-container > div.Root__main-view > main > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(4) > div.ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi > div.JUa6JJNj7R_Y3i4P8YUX > div:nth-child(2) > div > div > div > div > div {
    filter: contrast(1.5); }

.vQ8EkR_krbAi5mYmmpCn {
    cursor: pointer;
    color: #ffffffe0; }
/*search*/
.dIwMadpRrW1PwEwEeAbN,
.G9iUss4eOSpJyn2VBzsS {
    color: #000!important;
    text-shadow: none; }
.Z1sHXP1EI_v36FCALBRd {
    background: rgba(0, 0, 0, 0.5)!important; }
.Z1sHXP1EI_v36FCALBRd:hover {
    background: rgb(35 35 35 / 50%)!important; }


/*-------------home page-----------------*/
.B0VIs50K6LXh5MDmmmJs,
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
div.os-padding > div > div > div > main > section > div:nth-child(2) > div > div {
    background: rgba(0, 0, 0, 0.2)!important; }

.B0VIs50K6LXh5MDmmmJs:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section > div:nth-child(2) > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section > div:nth-child(2) > div:hover,
#searchPage > div > div > section > div:nth-child(2) > div:hover,
#searchPage > div > section > div:nth-child(2) > div > div:hover,
#main > div.Root.encore-dark-theme > div.Root__top-container > div.Root__main-view > main > div.os-host.os-host-foreign.os-theme-spotify.os-host-resize-disabled.os-host-scrollbar-horizontal-hidden.main-view-container__scroll-node.os-host-transition.os-host-overflow.os-host-overflow-y > div.os-padding > div > div > div.main-view-container__scroll-node-child > section > div:nth-child(5) > section > div:nth-child(2) > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div.Ft1cMGlqDsCbqmXQyeKN > div.AJqEY1gblQDvIgjU0jAH.contentSpacing.zlBEnsMyvUhuHSEtst4Q > section > div:nth-child(2) > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(5) > section > div:nth-child(2) > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section:nth-child(2) > div:nth-child(3) > div:hover,
div.os-padding > div > div > div > main > section > div:nth-child(2) > div > div:hover {
    background: rgba(0, 0, 0, 0.5)!important; }


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
#searchPage > div > section > div:nth-child(2) > div > div > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div > section > div:nth-child(2) > div > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(5) > section > div:nth-child(2) > div > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(n+2) > div > div > div:nth-child(1),
div.os-padding > div > div > div > main > section > div:nth-child(2) > div > div > div > div > div:nth-child(1) {
    transition-duration: 0.2s; }


.OALAQFKvC7XQOVYpklB4:hover .JI_jg7MaIJ2TCTmebcdd,
.main-card-card:hover main-card-imageContainer,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section > div > div:hover > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section > div > div:hover > div > div:nth-child(1),
#searchPage > div > div > section > div > div > div:hover > div > div:nth-child(1),
#searchPage > div > section > div:nth-child(2) > div > div:hover > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div > section > div:nth-child(2) > div:hover > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(5) > section > div:nth-child(2) > div:hover > div > div:nth-child(1),
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(n+2):hover > div > div > div:nth-child(1),
div.os-padding > div > div > div > main > section > div:nth-child(2) > div > div:nth-child(n+2):hover > div > div > div:nth-child(1) {
    transform: scale(1.05);
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1); }



main-card-imageContainer,
.OALAQFKvC7XQOVYpklB4 .JI_jg7MaIJ2TCTmebcdd {
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1); }
.KL469QQzoRZLOmKomNzk:hover .B3i7kN8tRTwP9s4XEK10,
view-homeShortcutsGrid-shortcut:hover view-homeShortcutsGrid-imageContainer,
.B0VIs50K6LXh5MDmmmJs:hover .icV9eS36uZs9fhQmUujh,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section:nth-child(1) > div > div:hover > div > div:nth-child(1) {
    transform: scale(1.1) translateX(3px)!important; }

.KL469QQzoRZLOmKomNzk .B3i7kN8tRTwP9s4XEK10,
view-homeShortcutsGrid-shortcut view-homeShortcutsGrid-imageContainer,
.icV9eS36uZs9fhQmUujh {
    transition-duration: 0.2s!important;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1)!important; }
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
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section:nth-child(1) > div > div:hover > div > div:nth-child(2) {
    transform: translateX(5px)!important; }
.KL469QQzoRZLOmKomNzk ._Xtjqr3it7fr5yseBgKp,
.GG4lScbAogw4Q_mXWbn9,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section:nth-child(1) > div > div > div > div:nth-child(2) {
    transition-duration: 0.2s!important;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1)!important; }



/*-------------profile page-----------------*/
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
#main > div.Root.encore-dark-theme > div.Root__top-container > div.Root__top-bar > header > div.T1xI1RTSFU7Wu94UuvE6,
#main > div.Root.encore-dark-theme > div.Root__top-container > div.Root__top-bar > header > div.T1xI1RTSFU7Wu94UuvE6 > div,
div.os-padding > div > div > div > main > section > div > div > div {
    background-color: #0000! important;
    background-image: none !important; }

div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > section:nth-child(2) > div:nth-child(2) > div {
    background: rgba(0, 0, 0, 0.0)!important; }



.c108b4ada40c10926b10bba3ff614fd0-scss,
.wQi0raQMEJJrELuj_2FP,
.YboT9C61kapUCdQnsEmR,
div.under-main-view > div > div {
    border-top-left-radius: 30px;
    height: 50vh;
    top: -66px;
    opacity: 0.8;
    filter: brightness(0.8);
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


/*------------allbum page-------------*/
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
#searchPage > div > div > div > div > div {
    position: initial !important;
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
div.os-padding > div > div > div > main > div > section > div:nth-child(2) > div.contentSpacing > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div > img {
    display: none!important; }


/*-------podcasts--------------*/
._8e7d398e09c25b24232d92aac8a15a81-scss {
    color: #fff!important;
    background-color: #1db954!important;
    transition-duration: 0.6s;
    transition: opacity .5s; }
._UFTK833WfTNGb4agRTd,
.Ic3iDUCnC09k55peZBfC {
    background: #00000000!important; }

/*-----Spotify Lists-----*/
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div {
    background: #00000000!important; }



/*-------now playing bar--------------*/
.Root__now-playing-bar {
    padding-top: 10px; }
._17de82b47b8c1954963d20ed56b2f730-scss,
._82a78ff58d3fcba0cb9b8083fe6dd05c-scss,
.gqeP9Y0_y6DLm4CD_m3Q,
.O6evDj2xd8mSlS2qiPiG,
#main > div.Root.encore-dark-theme > div.Root__top-container > div.Root__now-playing-bar > footer {
    border-top: none;
    background-color: rgba(0, 0, 0, 0) }
.O6evDj2xd8mSlS2qiPiG {
    background: var(--overlay-heavy) }
._mSbAWxlXgc2ONtpnuXQ:before,
._mSbAWxlXgc2ONtpnuXQ:after,
#main > div.Root.encore-dark-theme > div.Root__top-container > div.Root__now-playing-bar > footer > div > div > div > div > div > div:before,
#main > div.Root.encore-dark-theme > div.Root__top-container > div.Root__now-playing-bar > footer > div > div > div > div > div > div:after {
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

/*----------------Misc---------------------*/
body > div:nth-child(10) {
    display: none; }

._7b6273541d969069bb18c4fcae4120e7-scss,
.e2JzVB2WkGm7GMT8rkEg,
.kYBlAcRblnjQ6kKW4JCy,
#main > div.Root.encore-dark-theme > div.Root__top-container > nav > div > div > div > div:nth-child(3) > div {
    background: none; }


div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div.fVB_YDdnaDlztX7CcWTA {
    top: 0px;
    position: initial !important; }

._748c0c69da51ad6d4fc04c047806cd4d-scss {
    color: #000!important;
    text-shadow: 0 0 black; }
#searchPage > div > div > div > div > div {}

/*lyrics*/
div.os-padding > div > div > div.main-view-container__scroll-node-child > div > div {
    background: none; }


/*now playing img*/
.d6e5892a336f6ae43bf066f2245c81b1-scss,
._4fac214bccd807d7c6fed21d4e0ea6de-scss,
.i0XB7255K_4QFLJsSGc_,
#main > div.Root.encore-dark-theme > div.Root__top-container > nav > div {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px; }
._8b45c1ef6e792bfe1014b26c48673e5a-scss,
.i0XB7255K_4QFLJsSGc_ {
    background: none!important; }


._8bfd0bd3ba9dd8201e38b1622bc74fb6-scss,
.i_0L07qd2CAeOLFiK8dP {
    overflow-y: visible!important;
    backdrop-filter: blur(3px)!important; }

/*albums previews*/
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
#main > div.Root.encore-dark-theme > div.Root__top-container > nav > div > ul > li > a,
#main > div.Root.encore-dark-theme > div.Root__top-container > nav > div > ul > li:nth-child(3) > div > a {
    background: rgba(0, 0, 0, 0)!important; }

._2f859138f9d0ecc3c687296f572c5dca-scss:hover,
._3802c04052af0bb5d03956299250789e-scss:hover,
._28be3af50433a1164b3a62a898dce43e-scss:hover,
.OALAQFKvC7XQOVYpklB4:hover,
.L4WROPnQ7MPGhylvVyxd:hover,
._8bfd0bd3ba9dd8201e38b1622bc74fb6-scss,
.YWQ6MaodStrAvAMCg1wx:hover,
#main > div.Root.encore-dark-theme > div.Root__top-container > nav > div > ul > li > a:hover,
#main > div.Root.encore-dark-theme > div.Root__top-container > nav > div > ul > li:nth-child(3) > div > a:hover {
    background: rgba(0, 0, 0, 0.5)!important;
    /*background: rgb(35 35 35 / 50%)!important;*/ }

.byhpDrPqhYGoCXVANcn9 {
    transition-duration: 0.2s; ; }
.YWQ6MaodStrAvAMCg1wx:hover .byhpDrPqhYGoCXVANcn9 {
    transform: scale(1.05);
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1); }


/*play button*/
._13e5c5964387e0139bbe6e468e9aa649-scss > *,
._8e7d398e09c25b24232d92aac8a15a81-scss {
    -webkit-transition: opacity .5s;
    transition: opacity .5s!important; }
._8e7d398e09c25b24232d92aac8a15a81-scss:hover {
    box-shadow: 2px -1px 20px 0px #000000c7;
    z-index: 1; }

/*playing album*/
._233cba0ebe7615236e86592034108e77-scss {
    justify-content: center; }



/*track scale*/
._OpqIZJH2IqpNqAS9iJ7,
._cx_B0JpuGl6cJE7YqU1,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(4) > div > div > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div,
#searchPage > div > div > section > div > div > div > div > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(4) > div > div > div:nth-child(2) > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div > div > div:nth-child(2) > div {
    transition: transform var(--standard-ease); }

._OpqIZJH2IqpNqAS9iJ7,
._cx_B0JpuGl6cJE7YqU1:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div:nth-child(4) > div > div > div:nth-child(2) > div > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div.iB16LxoPzDeVZo8zPhPQ > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div:hover,
#searchPage > div > div > main > section > div > div > div > div > div:nth-child(2) > div > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div:nth-child(4) > div > div > div:nth-child(2) > div:hover,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > div > div > div:nth-child(2) > div:hover {
    transform: scale(1.025) }

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

/*pointers*/
.bd0f04911fe4adb022e666269a90a739-scss,
._38168f0d5f20e658506cd3e6204c1f9a-scss,
.OBaPDV8g5lhQbNPmIEwf,
.C6Q_uSufk1zE4WuU3i5P,
.FnW_fQBaMbSCZnG14SfL {
    cursor: pointer; }
.ec1b5762556429ac3aeedbae72433491-scss {
    color: #ffffffe0!important; }

/*transparent elements*/
.Root__now-playing-bar,
.i_0L07qd2CAeOLFiK8dP,
.pLwpjUDpZgzSXNOsGn_c,
.Mx7aus4bRGbU9vPpnDHj {
    background: var(--overlay-heavy) }`;
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
            if(change.attributeName.includes('src')){
                console.log("Changing background!");
                var sheet = document.createElement('style');
                sheet.setAttribute("id", "background");
                if( document.getElementById("background") != null){
                    document.getElementById("background").remove()
                    //document.getElementById("background").innerHTML = ":root{ --backimg:url(" + document.getElementsByClassName("_64acb0e26fe0d9dff68a0e9725b2a920-scss cover-art-image")[0].src + ");}";
                }
                sheet.innerHTML = ":root{ --backimg:url(" + document.getElementsByClassName("cover-art-image")[0].src + ");}";
                document.body.appendChild(sheet);
                }
            });
        });
        function addObserverIfDesiredNodeAvailable() {
            if(!document.getElementsByClassName("cover-art-image")[0]) {
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
            sheet.innerHTML = ":root{ --backimg:url(" + document.getElementsByClassName("cover-art-image")[0].src + ");}";
            document.body.appendChild(sheet);
            observer.observe(document.getElementsByClassName("cover-art-image")[0], {attributes : true});
        }
        addObserverIfDesiredNodeAvailable();

        setInterval(function obs() {
            observer.observe(document.getElementsByClassName("cover-art-image")[0], {attributes : true});
		}, 5500);
        /*
		var temp = ""
		setInterval(function back() {
			'use strict';

			if(document.getElementsByClassName("cover-art-image")[0] != undefined){
				if (temp != document.getElementsByClassName("cover-art-image")[0].src) {
					setTimeout(() => { console.log("Changing background!");
					var sheet = document.createElement('style');
					sheet.setAttribute("id", "background");
					if( document.getElementById("background") != null){
						document.getElementById("background").remove()
						//document.getElementById("background").innerHTML = ":root{ --backimg:url(" + document.getElementsByClassName("_64acb0e26fe0d9dff68a0e9725b2a920-scss cover-art-image")[0].src + ");}";
					}
					sheet.innerHTML = ":root{ --backimg:url(" + document.getElementsByClassName("cover-art-image")[0].src + ");}";
					document.body.appendChild(sheet);
					temp = document.getElementsByClassName("cover-art-image")[0].src;
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
