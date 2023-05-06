
skin(true);
var stat=1;
/*
if(localStorage.getItem('skin')=="false"){
    var el=document.getElementById("skin");
    el.remove();
    stat=0;
}
if(localStorage.getItem('skin')=="false"){
    var el=document.getElementById("skin");
    el.remove();
    stat=0;
}*/

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
function skin(exe,anim,das,tlyr) {
	if(exe == true){
		let css = "";
		css += `@charset "UTF-8";`;

 css += `/* ------Created by Kami--------*/
:root {
    --overlay-heavy: rgba(0, 0, 0, 0.4);
    --standard-ease: 350ms cubic-bezier(0.215, 0.61, 0.355, 1);
    --white: #fff;
    --hoverback: hsla(0, 0%, 100%, .1);
    --blur: 20px; 
    --hovercolor:rgba(0, 0, 0, 0.2)}
.encore-dark-theme {
    --text-subdued: #ffffffe0!important; }

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
        backdrop-filter: blur(var(--blur)) }
.backgroundDIV {
    background-image: var(--backimg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-size: cover;
    transition-duration: 0.7s;
    background-position: center;
    background-color: #282828;
    filter: blur(30px);
		/*blur - 50px original*/
    width: 100vw;
    height: 100vh;
    position: absolute; }
#main > div.Root.encore-dark-theme > div,
#context-menu > ul ,#context-menu > div > ul {
    backdrop-filter: blur(30px); }
		/*same as above*/

#context-menu > ul,#context-menu > div > ul{
    overflow: visible;
}


#main > div.Root.encore-dark-theme > div,
.nav-alt #main > div.Root.encore-dark-theme > div,*/
.nav-alt .QO9loc33XC50mMRUCIvf,
.J6VTd7VdGN2PM_oXCAyH,
#context-menu > ul ,#context-menu > div > ul {
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
    padding-right: 30px; }

/*-------New UI Fix V1-----*/

#main > div.Root.encore-dark-theme.nav-ylx > div > nav > div,
#main > div.Root.encore-dark-theme.nav-ylx > div:nth-child(2),
.Root__main-view {
    background: none!important;
}
#main > div.Root.encore-dark-theme.nav-ylx > div:nth-child(2) {
    padding: 0!important;
}

#main > div.Root.encore-dark-theme.nav-ylx > div > nav > div:nth-child(2) > div:nth-child(2) > div {
    width: calc( var(--nav-bar-width) - 20px);
}
.ifVI2CEdOZGgMWIUN2Cw.kJ_Q4aphh_uCJCZdzPpD:not(.dNphEfQzPRaQufS04jUm) {
    padding-bottom: calc( var(--nav-bar-width) - 20px);
}

/*-------------Home Page-----------------*/

#context-menu > ul, #context-menu > div > ul, ._K79lE9KrIAkl_bUSSUM, .PpUTJL2NIYDUnmfzVIbE, .EZFyDnuQnx5hw78phLqP,

.B0VIs50K6LXh5MDmmmJs, .B0VIs50K6LXh5MDmmmJs:hover, .odcjv30UQnjaTv4sylc0, .Ws8Ec3GREpT5PAUesr9b, .SboKmDrCTZng7t4EgNoM, .DuEPSADpSwCcO880xjUG, .wC9sIed7pfp47wZbmU6m, .KDlcc1SFTcA90eMUcn5P,
.e4ETsc5zxjzyF9nyb4LI, .cyXplMovoowBozEe4r2x, .EhyK_jJzB2PcWXd5lg24, .tsv7E_RBBw6v0XTQlcRo, .zi377dMLSwXnFiejYnRa, .aIWRvSjvEN4rTMCIi4vG, .wIyyGaSPOHR78wksX3Us, .G8UNZJv4HT1kOIolA_e7, .encore-light-theme,
.encore-light-theme, .encore-base-set, .MQQEonum615k8mGkliT_, .CU0wnmWejIvyEsRRtSac, .R2w_sH83CJU9Yhnu0xyt, .PiyAiXdQULEnWAHP0tu1, .odcjv30UQnjaTv4sylco:focus, odcjv30UQnjaTv4sylcO:hover, [dir="ltr"] .JdlKTdpMquftpMwwegZo,
.odciv30UOniaTv4svlc0_[data-context-menu-open=true], .zrvvPyoxE6wQNqnu0yWA, .hwP4Oum2PB765sb8jigI,
    div.Root__now-playing-bar > footer > div:nth-child(2) *,
.ejNsts52hRq0uZcc_NXi,
.uhDzVbFHyCQDH6WrWZaC, .AJqEY1gblQDvIgjU0jAH, .react-contextmenu-wrapper, .XwNfIrI6_hCa_9_T2cQB, .I3EivnXTjYMpSbPUiYEg, .g6ZgzRfiHjsTLskeyI0J:focus, .g6ZgzRfiHjsTLskeyI0J:hover, .g6ZgzRfiHjsTLskeyI0J,
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
    transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1); }
.KL469QQzoRZLOmKomNzk:hover .B3i7kN8tRTwP9s4XEK10,
view-homeShortcutsGrid-shortcut:hover view-homeShortcutsGrid-imageContainer,
.B0VIs50K6LXh5MDmmmJs:hover .icV9eS36uZs9fhQmUujh,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > section > div > div > section:nth-child(1) > div > div:hover > div > div:nth-child(1) > div{
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

/* Hide 'profile' text */
.EeWTFG_vxLI5QJc1TH4F, .RfdRTSGwulyQdDepLUTT .EeWTFG_vxLI5QJc1TH4F, .RfdRTSGwulyQdDepLUTT .eAXFT6yvz37fvS1lmt6k {
	display: none;
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
    html.spotify__container--is-web body, .qJOhHoRcFhHJpEQ2CwFT.koyeY6AgGRPmyPITi7yO, .uV8q95GGAb2VDtL3gpYa, .bk509U3ZhZc9YBJAmoPB,
.aCtCKL9BxAoHeVZS0uRs, .pHrwZOFBdT8FNXnmcPPI, .RP2rRchy4i8TIp1CTmb7, .lXcKpCtaEeFf1HifX139, .main-view-container__scroll-node-child, .main-view-container__scroll-node-child-spacer, .lXcKpCtaEeFf1HifX139, .MyW8tKEekj9lKQsviDdP, .gHImFiUWOg93pvTefeAD {
background-color: #0000! important;
    top: auto!important;
    box-shadow: none!important; }


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
    transition: opacity .5s; }
._UFTK833WfTNGb4agRTd,
.Ic3iDUCnC09k55peZBfC {
    background: #00000000!important; }

/*-----Spotify Lists-----*/

div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div,
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div {
    background: #00000000!important; }

/*-------Now Playing Bar--------------*/

..Root__now-playing-bar {
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

/*----------------Misc---------------------*/

body > div:nth-child(10) {
    display: none; }

.H0HbpIM3UrcupWIAjLWu {
	border-radius: 25px;
}

.SboKmDrCTZng7t4EgNoM {
	border-radius: 10px;
}

.cASFVN {
    background: none;
}
.tr8V5eHsUaIkOYVw7eSG{
    height: auto;
}

/*now playing*/
.nav-ylx .OCY4jHBlCVZEyGvtSv0J {
	height: 100px !important;
}
	.deomraqfhIAoSB3SgXpu {
		transform: translateX(-20px) !important;
	}
		.jOKLc29vP0Bz1K0TsDtX {
			min-width: 340px !important;
		}

/*nav*/
.nav-ylx .Root__nav-bar {
	gap: 5px !important;
}
	.Root__nav-bar {
		margin-left: 5px !important;
		margin-top: 2px !important;
		height: calc(100% - -30px) !important;
	}

		.QuHe04rU4bj0Z5U9E2Tk {
			padding: 2px 1px !important;
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

/*Hide Download button*/
a [href="/download"] {
display: none !important;
}

a.link-subtle.ATUzFKub89zvkmvhpyE {
  display: none !important;
}

link-subtle ATUzFKub89lzvkmvhpyE {
  display: none !important;
}

/*.NiCdLCpp3o2z6nBrayOn.MEjuIn9iTBQbnCqHpkoQ {
    color: rgb(255 255 255 / 20%);
    }*/
div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > div:nth-child(2) > div > div:hover{
    transform: scale(1.03);} 

div.os-padding > div > div > div.main-view-container__scroll-node-child > div > div {
    background: none; }
.arY01KDGhWNgzlAHlhpd {
    transform: scale(1.05);}
/*.MEjuIn9iTBQbnCqHpkoQ {
    transform: translate(30px, 0px);}*/

/*now playing img*/
.d6e5892a336f6ae43bf066f2245c81b1-scss,
._4fac214bccd807d7c6fed21d4e0ea6de-scss,
.i0XB7255K_4QFLJsSGc_,
#main > div.Root.encore-dark-theme > div > nav > div {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px; }
._8b45c1ef6e792bfe1014b26c48673e5a-scss,
.i0XB7255K_4QFLJsSGc_ {
    background: none !important; }


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

/*pointers*/
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
		

/*-----------------SpotOn CSS-----------------*/


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
            var coverartimage = document.querySelector("#main > div.Root.encore-dark-theme > div > nav > div > div > div > div > a > div > div > img");
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
            var coverartimage = document.querySelector("#main > div.Root.encore-dark-theme > div > nav > div > div > div > div > a > div > div > img");
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
            var coverartimage = document.querySelector("#main > div.Root.encore-dark-theme > div > nav > div > div > div > div > a > div > div > img");
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


/*SpotOn CSS*/

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
    //
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
	"/* Hide resizer */",
	".LayoutResizer__inline-end {",
	"display: none !important;",
	"}",
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
    "li.DuEPSADpSwCc0880xjUG {",
    " border-radius: 20px !important;",
    "}",
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
    "/* NOWPLAYING PLAY BUTTON */",
	" .KAZD28usA1vPz5GVpm63, .doaMwz, .prGqQr33U0mG14TJ5V8a.BhKGkKPprp2wm9bvfRKG, .prGqQr33U0mG14TJ5V8a, .jqMzOG:hover .ButtonInner-sc-14ud5tc-0, .fipMme, .kGFDdV, .SPC4uzYXJmknkCGKpxHw, .No0A0v6U6vtqj_ybS1Cd, .Fyc_tPyPKyRIT_59VZ2B, .hwP4Oum2PB765sb8jigI, .HVCCFeUiHVwZVv74p34a, .KIbfbFDao0SHpZsKoKZD, .PrhIVExjBkmjHt6Ea4XE, .bkFQH4uasL3pXqN9eDSi, .control-button--active, .jyHIqB, .TJ5Bjp6vgnWVbh6mGN0n, .Btg2qHSuepFGBG6X0yE, .jOKLc29vP0Bz1K0TsDtX, .NoOAOv6U6vtqj_ybS1Cd, .NoOAOv6U6vtqj_ybS1Cd, .rRF_r7EyCHjZv058JACi, .collection-active-icon, .collection-icon, .home-active-icon, .home-icon, .make-music-active-icon, .make-music-icon, .premiumSpotifyIcon, .search-active-icon, .search-icon, .TywOcKZEqNynWecCiATc, .playback-bar, .control-button, .control-button--active, .INitzTSjokOMEJOc6P2H, .jOKLc29vP0Bz1K0TsDtX, .uWvwXlS0Da1bWsRX6KOw, .cWIysU, .NdVm10_yLWkkgq87jOMk, .CCeu9OfWSwIAJqA49n84, .Svg-sc-ytk21e-0 uPxdw, .ShMHCGsT93epRGdxJp2w Ss6hr6HYpN4wjHJ9GHmi, .T0anrkk_QA4IAQL29get, .connect-device-list-container, .control-button-heart, .encore-dark-theme .encore-bright-accent-set, .eSg4ntPU2KQLfpLGXAww, .dpREpp, .CmkY1Ag0tJDfnFXbGgju, .wC9sIed7pfp47wZbmU6m, .control-button--active, .eJHlti, .Nd_DeCpszONzyaLe5Wd1 {",
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
    " /* Rounded quick search */",
    " .zi377dMLSwXnFiejYnRa, .EhyK_jJzB2PcWXd5lg24 {",
    " background-color: rgb(24 24 24);",
    " border-radius: 8px;",
    " padding: 16px;",
    "}",
    "",
    "}",
    ".EhyK_jJzB2PcWXd5lg24 {",
    " border-radius: 45px",
    " } ",
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

function HideDownloads() {
  console.log("HideDownloads function running");
  setTimeout(() => {
    const mainView = document.getElementsByClassName("Root__main-view")[0];

    const observer = new MutationObserver(() => {
      const elements = document.querySelectorAll(`a[href="/download"]`);

      for (const element of elements) {
        element.style.display = "none";
      }
    });

    observer.observe(mainView, { attributes: true, childList: true, subtree: true });
  }, 7000);
}



