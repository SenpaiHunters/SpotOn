// ==UserScript==
// @name          Lightweight SpotOn
// @namespace     https://github.com/SenpaiHunters/SpotOn
// @icon          https://github.com/SenpaiHunters/SpotOn/blob/Main/SpotOn%20logo.png?raw=true
// @namespace     https://greasyfork.org/en/scripts/452921-spotify-onspot
// @description	  SpotOn light, a lightweight version of SpotOn which only features a new background.
// @author        Kami
// @version       0.5
// @license       GPL
// @match         http://open.spotify.com/*
// @match         https://open.spotify.com/*
// @match         http://*.open.spotify.com/*
// @match         https://open.spotify.com/*
// @match         https://*.open.spotify.com/*
// @match         https://open.spotify.com/*
// @run-at        document-start
// @copyright     2022, Kami
// ==/UserScript==
 
/*
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
 
// NOTE THIS VERSION OF SPOTON WILL NOT GET UPDATES AND WILL REMAIN BAREBONES, IF YOU WANT THE FULL FEATURES DOWNLOAD SPOTON!
 
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
			'use strict';
 
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
