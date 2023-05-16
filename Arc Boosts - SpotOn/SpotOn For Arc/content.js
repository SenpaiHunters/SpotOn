(function SpotOnMainSkin() {
    var css=[
  /*

Go to https://arc.net/colors.html, and chnage any of the --arc-(name) with a colour you like there!
This will change all that element, for example, var(--sidebar-bg) is 'simple-color', change that to 
var(--arc-palette-foregroundTertiary) and that will make it more dark, less dark whatever, depending on
the colour you pick you can find that sometimes the text will be unreadable, or looks overall bright!

If you dislike the rainbow controls, remove that, instructions there if needed

Made by Kami,
https://github.com/SenpaiHunters/SpotOn

If something doesn't work use an !important statment for it to take control (should only be needed if you add more elements)

  */

	/*

	List of Arc colours (16/5/23)
	--arc-palette-foregroundPrimary
	--arc-palette-foregroundSecondary
	--arc-palette-foregroundTertiary
	--arc-palette-maxContrastColor
	--arc-palette-minContrastColor
	--arc-palette-backgroundExtra
	--arc-palette-background
	--arc-palette-focus
	--arc-palette-hover
	--arc-palette-cutoutColor
	--arc-palette-title
	--arc-palette-subtitle
	--arc-background-simple-color
	--arc-background-gradient-color0
	--arc-background-gradient-color1
	--arc-background-gradient-color2
	--arc-background-gradient-overlay-color0
	--arc-background-gradient-overlay-color1
	--arc-background-gradient-overlay-color2
	
	
	*/

    " :root {",
    " --sidebar-bg: var(--arc-palette-foregroundPrimary);",
    /* --arc-background-simple-color */
    " --gradient1: var(--arc-background-simple-color);",
    " --gradient2: var(--arc-background-gradient-color1);",
    " --gradient3: var(--arc-background-gradient-color2);",
    " --primary: var(--arc-palette-foregroundPrimary);",
    " --secondary: var(--arc-palette-foregroundSecondary);",
    " --tertiary: var(--arc-palette-foregroundTertiary);",
    " --font-color: var(--arc-palette-title); /* Colour of the font */",
		" --lyrics-color: var(--arc-palette-minContrastColor);",
    " --contrast-color_dark: #2b2b2b;",
    " --main-bg: #0f0f0f;",
    " --pure-black-color: #000000;",
    " --main-container: #181818;",
    " --icons: #D6E0DE;",
    " --main-gap: 15px;",
    " --main-corner-radius: 20px;",
    " --main-border-radius: 25px;",
    " --round-album-art: 10px;",
    " --round-album-art-shadow: 15px;",
    " --firstLsize: 1.50em;",
    " --hidden-menus: none;",
    "}",
    "",
    /* The background for liked songs*/
    /* As mentioned above, change the var() with anything to change the background */
    /* If you want black, then just remove the var(--graident1) for black or #000 */
    "gHImFiUWOg93pvTefeAD, .MyW8tKEekj9lKQsviDdP, .gHImFiUWOg93pvTefeAD, .xYgjMpAjE5XT05aRIezb, .E4q8ogfdWtye7YgotBlN, .contentSpacing, .ShMHCGsT93epRGdxJp2w, .main-view-container {",
    " background-color: var(--gradient1) !important;",
    "}",
		/* Lyrics colour */
		/* As mentioned above */
		" .L9xhJOJnV2OL5Chm3Jew {",
    " background-color: var(--lyrics-color) !important;",
    "}",
		" .T1xI1RTSFU7Wu94UuvE6, .facDIsOQo9q7kiWc4jSg {",
		" background-color: transparent !important;",
		"}",
    /* Liked songs album icon shadow */
		/* Don't touch this one */
    "._EShSNaBK1wUIaZQFJJQ {",
    " box-shadow: 0 0px 0px rgba(0,0,0,.5) !important;",
    "}",
    /* Top info when scrolling */
    /* As mentioned above */
    " .Type__TypeElement-sc-goli3j-0.hulXhb.G7zO58ORUHxcUw0sXktM, .nav-ylx .T1xI1RTSFU7Wu94UuvE6, .EvIR4O7jOSbNmxtMdIQ0 {",
    " background-color: var(--sidebar-bg) !important;",
    "}",
    /* Ele below that */
    /* As mentioned above */
    ".nav-ylx .qJOhHoRcFhHJpEQ2CwFT.koyeY6AgGRPmyPITi7yO {",
    " background-color: var(--sidebar-bg) !important;",
    "}",
    /* Now Playing Bar */
    /* As mentioned above */
    " .nav-ylx .OCY4jHBlCVZEyGvtSv0J, .Root__now-playing-bar {",
    " background: var(--gradient1) !important;",
    " border-radius: var(--main-border-radius) !important;",
    "}",
    /* Nav bar / Sidebar */
    /* As mentioned above */
    " .nav-ylx .Root__nav-bar, .nav-ylx .sqKERfoKl4KwrtHqcKOd {",
    " background: var(--gradient1) !important;",
    " /*border-radius: var(--main-border-radius) !important;*/",
    " gap: 1px !important;",
    "}",
    /* Nav / Sidebar buttons */
    /* As mentioned above */
    ".QuHe04rU4bj0Z5U9E2Tk, .hjb8tUL3rpUa0ez4ZtAj {",
    "background: var(--gradient1) !important;",
    "}",
    /* Background colour for nav/sidebar */
    /* As mentioned above */
    ".EZFyDnuQnx5hw78phLqP {",
    "	/*background-color: var(--gradient1) !important;*/",
    " border-radius: var(--main-border-radius) !important;",
    " cursor: auto !important;",
    " } ",
    /* Whole player border */
    /* As mentioned above */
    " .nav-ylx .ZQftYELq0aOsg6tPbVbV, .nav-ylx .ZQftYELq0aOsg6tPbVbV { ",
    " background: var(--sidebar-bg) !important;",
    /*var(--sidebar-bg)*/
    " } ",
    "",
    /* contentspacing -- Fixes display not using the maxium size -- No matter the size, it will always take up the max size! */
    /* Leave this, it's for larger displays, they'll use the whole space */
    " .contentSpacing {",
    " max-width: -webkit-fill-available !important;",
    " } ",
    "",
		/* Text colour(s) for subtext */
		/* Don't touch please */
		" .encore-dark-theme {",
    " --text-subdued: rgba(255, 255, 255, 0.88) !important;",
		/* Color as HEX #ffffffe0 */
		" } ",
		/* Site-wide text shadow */
    " #main { ",
    "    text-shadow: 2px -1px 0px #333 !important;",
    " } ",
    " .kpGMQq1KFz620g_BD_dS {",
    " text-shadow: 0px 0px 0px #333 !important;",
    " } ",
    /* Context Menu when right-clicking anywhere */
    /* As mentioned above */
    ".encore-dark-theme.SboKmDrCTZng7t4EgNoM {",
    "	background-color: var(--secondary) !important;",
    "}",
    /* Connect to a device */
    /* As mentioned above */
    /* Change --generic-tooltip-background-color as well */
    ".aCtCKL9BxAoHeVZS0uRs, .hcuLp8V4uEEfWZ4k6aLV, .bk509U3ZhZc9YBJAmoPB {",
    "	background-color: var(--secondary) !important;",
    " --generic-tooltip-background-color: var(--secondary) !important;",
    /*--generic-tooltip-background-color is that bottom bar thingo*/
    "}",
    " #context-menu[data-placement^=top]>.aCtCKL9BxAoHeVZS0uRs .QavgDs_52SpJ2rw0LNYz {",
    " display: none !important;",
    "}",
		/* Homepage album colour thingo */
		" .LunqxlFIupJw_Dkx6mNx { ",
		" background: rgb(24 24 24 / 14%) !important;",
		" } ",
		/* Bottom padding for homeview */
		".main-view-container__scroll-node-child {",
		" padding-bottom: 0px !important;",
		" padding-right: 0px !important;",
		" padding-top: 0px !important;",
		"}",
    "",
    "",
    /* Hide items inside Spotify */
    /* Hide download app */
    ".facDIsOQo9q7kiWc4jSg a {",
    " display: none !important;",
    "}",
    /* Bottom content menu holding spotify info */
    ".bRDuCh {",
    "display: none !important;",
    "}",
    /* Items include, Spotify logo, Install app, content bar, resizer and more */
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
    "",
    /* Hover */
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
    /* fade effect (top and bottom of scrollable list of playlists) */
    ".Y8edH1Yjo4xrW_58czQj::after {",
    " content: ;",
    "position: absolute;",
    "top: 2px;",
    "left: 0;",
    "width: 100%;",
    "height: 1.75rem;",
    "background: transparent);",
    "}",
    "",
    /* Play/Pause Icon */ 
    "/* Arc page colour effects this state! Change slides to see the colour change too */",
    " .encore-dark-theme .encore-bright-accent-set {",
    " --background-highlight: var(sidebar-bg, rgba(120,123,133,0.1)) !important",
    " } ",
    "",
    /* END */
    "",
    /* IF YOU DISLIKE THE RAINBOW CONTROLS REMOVE THE LINES BELOW UNTIL YOU SEE 'STOP' */
    /* Do note if you remove it, the icons will be hard to see depending on the background. */
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
    "/* Rainbow button control */",
    " .KAZD28usA1vPz5GVpm63, .n5XwsUqagSoVk8oMiw1x, .ETclQEbcAcQdGdSioHaJ, .jqMzOG:hover .ButtonInner-sc-14ud5tc-0, .fipMme, .kGFDdV, .SPC4uzYXJmknkCGKpxHw, .No0A0v6U6vtqj_ybS1Cd, .Fyc_tPyPKyRIT_59VZ2B, .hwP4Oum2PB765sb8jigI, .HVCCFeUiHVwZVv74p34a, .KIbfbFDao0SHpZsKoKZD, .PrhIVExjBkmjHt6Ea4XE, .bkFQH4uasL3pXqN9eDSi, .control-button--active, .jyHIqB, .TJ5Bjp6vgnWVbh6mGN0n, .Btg2qHSuepFGBG6X0yE, .jOKLc29vP0Bz1K0TsDtX, .NoOAOv6U6vtqj_ybS1Cd, .NoOAOv6U6vtqj_ybS1Cd, .rRF_r7EyCHjZv058JACi, .collection-active-icon, .collection-icon, .home-active-icon, .home-icon, .make-music-active-icon, .make-music-icon, .premiumSpotifyIcon, .search-active-icon, .search-icon, .TywOcKZEqNynWecCiATc, .playback-bar, .control-button, .control-button--active, .INitzTSjokOMEJOc6P2H, .jOKLc29vP0Bz1K0TsDtX, .uWvwXlS0Da1bWsRX6KOw, .cWIysU, .NdVm10_yLWkkgq87jOMk, .CCeu9OfWSwIAJqA49n84, .Svg-sc-ytk21e-0 uPxdw, .ShMHCGsT93epRGdxJp2w Ss6hr6HYpN4wjHJ9GHmi, .T0anrkk_QA4IAQL29get, .connect-device-list-container, .control-button-heart, .encore-dark-theme .encore-bright-accent-set, .eSg4ntPU2KQLfpLGXAww, .dpREpp, .CmkY1Ag0tJDfnFXbGgju, .wC9sIed7pfp47wZbmU6m, .control-button--active, .eJHlti, .Nd_DeCpszONzyaLe5Wd1 {",
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
    /* STOP - below is the scroll bar if you dislike it remove it until you see 'woah' */
    "/* ***************** Scroll bar ************** */",
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
    /* woah */
    /********* Font *********/
    /* Change the URL and Name for any font you'd like */
    /* Font Face + New font */
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
    /* First letter captial (first-letter) */
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
      
  /*

Made by Kami,
https://github.com/SenpaiHunters/SpotOn


  */
    "/* END */",


    ].join("\n");

    if (typeof GM_addStyle !="undefined") {
      GM_addStyle(css);
    }

    else if (typeof PRO_addStyle !="undefined") {}

    else if (typeof addStyle !="undefined") {}

    else {
      var node=document.createElement("style");
      node.type="text/css";
      node.appendChild(document.createTextNode(css));
      var heads=document.getElementsByTagName("head");

      if (heads.length > 0) {
        heads[0].appendChild(node);
      }

      else {
        document.documentElement.appendChild(node);
      }
    }
  }

)();
