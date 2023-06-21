// ==UserScript==
// @name          SpotOn
// @namespace     https://github.com/SenpaiHunters/SpotOn
// @icon          https://user-images.githubusercontent.com/103985728/235338288-be1251b1-0074-4560-9c02-bff7bacef367.png
// @description	  SpotOn, a browser extension for Spotify (in this case, a userscript). There is a lot, this includes various visual enhancements such as animation effects, rounded album covers and hover animations, as well as functional improvements such as a dynamic theme that responds to the album art and an auto-lyric search feature on Genius, rainbow controls, and more to discover.
// @author        Kami
// @version       1.7.2
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


skin(true);
var stat = 1;

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message.txt);
  if (message.txt == "disable") {
    if (message.bool == "false") {
      var el = document.getElementById("skin");
      el.remove();
      localStorage.setItem("skin", false);
      sendResponse({ status: "disabled" });
      stat = 0;
    }
  }
  if (message.txt == "enable") {
    if (message.bool == "true") {
      skin(true);
      localStorage.setItem("skin", true);
      sendResponse({ status: "enabled" });
      stat = 1;
    }
  }
  if (message.txt == "check") {
    sendResponse({ status: stat });
  }
  if (message.txt == "das") {
    sendResponse({ status: stat });
  }
}

var scrolltimeout = 0;

function skin(exe, anim, das, tlyr) {
  if (exe == true) {
    let css = `
      @charset "UTF-8";
      /*------Created by Kami--------*/
    
   
   :root {
   
       /*- Nav bar & Now playing bar -*/
       --now-playing-color: var(--progress-bar--background-color) !important;
       /* ↑ color for the now playing bar */
       --nav-bar-color: var(--progress-bar--background-color) !important;
       /* ↑ color for the nav bar */
       /*
       image test -- https://images.unsplash.com/photo-1559981421-3e0c0d712e3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1016&q=80
       var(--hovercolor) !important;
       */
       --bg-img: var(--backimg) !important;
       /* You don't need to worry about this */
       --song-color: white;
       /* ↑ change the color of song text inside a playlist */
       /* change the icon for "Liked Songs" by replacing the URL with your own */
       --album-art: url(https://user-images.githubusercontent.com/103985728/244696019-762563dd-30d9-4bc6-a46a-37b234c8983c.jpeg);
       /* ↑ KNOWN ISSUE - CHANGES ALL ALBUM ARTS - REGARDLESS OF PLAYLIST ↑ */
   
       /*- Hiders -*/
       --hide-song-date: hidden;
       /* ↑ replace "hidden" with "none" to remove the "date added" and "time" */
       --hide-song-numbering: hidden;
       /* ↑ replace "hidden" with "none" to remove the "song numbering" */
       --hide-song-dura: hidden;
       /* ↑ replace "hidden" with "none" to remove the "song duration" */
       --hide-song-album: hidden;
       /* ↑ replace "hidden" with "none" to remove the "song album" */
       --hide-song-heart: hidden;
       /* ↑ replace "hidden" with "none" to remove the "song heart icon" */
       --hide-top-infbar: hidden !important;
       /* ↑ replace "hidden" with "none" to remove the "top info bar" */
       --hide-profile-icon: hidden;
       /* ↑ replace "hidden" with "none" to remove the "profile icon" */
   
       /*- Lyrics -*/
       --lyrics-color: rgba(225, 219, 219, 0.7) !important; /* rgba(225, 219, 219, 0.7) */
       /* lyrics color - normal background - rgb(255 255 255, 0.7); */
       --lyrics-font-size: 37px;
       /* the font size of the lyrics */
       
       /*- Progress bar settings -*/
       --progress-bar--background-color: rgba(218, 181, 247, 0.322);
       /* ↑ color for the bottom progress bar */
       --progress-bar-dot-color: red;
       /* that dot when tragging the timer */
       --playback-duration-color: wheat;
       /* the color of the timings (left/right) */
   
       /*- Misc -*/
       --overlay-heavy: rgba(0, 0, 0, 0.4);
       --standard-ease: 350ms cubic-bezier(0.215, 0.61, 0.355, 1);
       --main-border-radius: 25px;
       --white: rgb(255, 255, 255);
       --hoverback: rgba(255, 255, 255, 0.1);
       --blur: 20px; 
       --hovercolor: rgba(0, 0, 0, 0.2);
       --firstLsize: 1.50em;
       --icons: white;
   }
           .encore-dark-theme {
           --text-subdued: rgba(255, 255, 255, 0.878) !important; 
           }
       
       /*- SpotOn Righter Inbuilt - Untag this CSS if you wish for it -*/
       /* To disable this, simply delete the code lines */
        .ZQftYELq0aOsg6tPbVbV { /*latest*/
         grid-template-areas:
               "right-sidebar main-view left-sidebar"
               "now-playing-bar now-playing-bar now-playing-bar" !important;
        }
   
        /*- Now Playing Bar (NPB) -*/
        .spotify__container--is-web #main .nav-ylx [data-testid="now-playing-bar"],
        .JG5J9NWJkaUO9fiKECMA {
             background: var(--now-playing-color) !important;
             background-image: var(--bg-img) !important;
             background-size: cover !important;
             background-attachment: fixed !important;
             background-repeat: no-repeat !important;
             background-blend-mode: soft-light !important;
             border-left: 120px dotted rgba(0,0,0,.01) !important;
             /* That weird left nav incon~ */
             border-radius: 70px !important;
             box-shadow: 16px 5px 10px -7px rgba(0,0,0,1), -7px 5px 10px -7px rgba(0,0,0,1), 3px 3px 4px #000, 0px 0px 2px #000;
             height: 83px !important;
             padding-right: 10px !important;
             min-height: -webkit-fill-available !important;
             width: -webkit-fill-available !important;
             /*height: -webkit-fill-available !important;*/
        }
       
   #main > div.Root.encore-dark-theme > div > nav > div,
   .Root__main-view,
   #main > div.Root.encore-dark-theme > div > div:nth-child(2),
   #main > div.Root.encore-dark-theme > div > div:nth-child(1) > header > div:nth-child(1),
   #main > div.Root.encore-dark-theme > div > div:nth-child(1) > header > div:nth-child(1) > div {
       background: none!important;
   }
   
   /* Nav bar being sent to the top -- fix -- allows for better spacing */
   [data-testid="root"] [data-testid="now-playing-bar"] :first-child:has([data-testid="player-controls"]) {
       margin-top: 10px !important;
   }
   
   
             /* Speed, Lyrics, Queue, Stream, Volume - Stats bar? */
             footer .mwpJrmCgLlVkJVtWjlI1 {
                  margin-right: 8px !important;
             }
       
             /* Now Playing Bar - Album cover */
             .deomraqfhIAoSB3SgXpu {
                  transform: translateX(-80px) !important;
             }
       
             /* Now Playing Bar (NPB) */
            .playback-bar *, .w699O0LgQRghXyl3bs9u, .TywOcKZEqNynWecCiATc, .p1ULRzPc4bD8eQ4T_wyp, .nav-ylx .GD2gbRtcs5dOjMGAM_Y4 {
            --is-active-fg-color: #000 !important;
            --progress-bar-height: 6px !important;
            }
   
            /* Change the color of the song title in the bottom left */
           /* Song name */
           div[data-testid="context-item-info-title"] span a {
             color: white;
           }
               /* Artist */
               div[data-testid="context-item-info-subtitles"] span a {
                   color: grey;
               }
               
               /* hovering on songs */
               [data-testid="track-list"] [role="presentation"] [role="presentation"]:has([data-testid="add-button"]) {
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
           
           /* Change the color of the elapsed playback time and song duration */
           .playback-bar__progress-time-elapsed,
           div[data-testid="playback-duration"] {
             color: var(--playback-duration-color) !important;
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
       [role="row"] [data-testid="tracklist-row"] [aria-colindex="\x31 "] [data-encore-id="type"] {
           margin-top: -5px !important;
       }
           [role="row"] [data-testid="tracklist-row"] [aria-colindex="\x31 "] [data-encore-id="type"]::hover,
           .contentSpacing [data-testid="playlist-tracklist"] [aria-rowindex="\x34 "] [data-testid="tracklist-row"]::hover,
           [role="row"] [data-testid="tracklist-row"] [aria-colindex="\x31 "] [data-encore-id="type"]::hover,
           [role="row"] [data-testid="tracklist-row"] [aria-colindex="\x31 "] [data-encore-id="type"]::before,
           [role="row"] [data-testid="tracklist-row"] [aria-colindex="\x31 "] [data-encore-id="type"]::after {
               display: none !important;
           }
       
       /* UI fix */
       .ZQftYELq0aOsg6tPbVbV {
         background: none !important;
       }
       
       .jEMA2gVoLgPQqAFrPhFw {
         background: none !important;
       }
       
       .PHgyArRLVFknlaOm31ID {
         background: none !important;
       }
       
       [data-testid="root"] [aria-label="Top\ bar\ and\ user\ menu"] span:has(.ellipsis-one-line) {
         display: none !important;
       }
       
   
       /* Keyboard shortcuts */
       [aria-label="Keyboard\ Shortcuts"] > :first-child:has([aria-label="Close"] svg) {
           background: rgba(0, 0, 0, 0.479) !important;
           background-image: var(--bg-img) !important;
           background-size: cover !important;
           background-attachment: fixed !important;
           background-repeat: no-repeat !important;
           background-blend-mode: soft-light !important;
       }
           /* Border for keys */
           [tabindex="\x30"] kbd {
               border: 2px solid var(--bg-color) !important;
               background-color: rgba(0, 0, 0, 0.2);
           }
            /* right click menu   [role="menu"] [role="presentation"] :first-child:has(.ellipsis-one-line) {
           background: var(--hoverback) !important;
           border-radius: var(--main-border-radius) !important;
               } */
       
       /*- Album art roundness -*/
         .cover-art.shadow.actionable.cover-art--with-auto-height,
         .cover-art-image,
         .mMx2LUixlnN_Fu45JpFB {
             border-radius: 11px;
         }
   
   /* song filter fix */
   .ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi[aria-colcount='5'] .wTUruPetkKdWAR1dd6w4 {
   display: grid !important;
 }
 
 .hIehTT:hover,
 .gLSzhA:hover,
 .hIehTT:hover {
   background-color: var(--hovercolor) !important;
 }
   
       /* Nav Bar (NB) */
       .no-focus-outline #main .nav-ylx [aria-label="Main"],
       .BdcvqBAid96FaHAmPYw_, .sqKERfoKl4KwrtHqcKOd {
            background: var(--nav-bar-color) !important;
            background-image: var(--bg-img) !important;
            background-size: cover !important;
            backdrop-filter: blur(93px) !important;
            background-attachment: fixed !important;
            background-repeat: no-repeat !important;
            background-blend-mode: soft-light !important;
            /*border-radius: 45px !important;*/
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            border-bottom-left-radius: 20px;
            box-shadow: 16px 5px 10px -7px rgba(0,0,0,1), -7px 5px 10px -7px rgba(0,0,0,1), 3px 3px 4px #000, 0px 0px 2px #000;
            /*height: 1445px !important;*/
            min-height: -webkit-fill-available !important; 
            height: -webkit-fill-available !important;
            width: -webkit-fill-available !important;
       }
          /* Nav icons spacing issue */
          .ifVI2CEdOZGgMWIUN2Cw.dNphEfQzPRaQufS04jUm {
              padding: 0 0px 2px !important;
          }
   
          /* Progess bar insinde NPB */
          /* Progess bar, (inner progress bar) how long has the song gone on for? */
             div[data-testid="progress-bar-background"] div div {
                      background-image: linear-gradient(to right, rgba(73, 0, 255, 1), rgba(96, 0, 255, 1) 20%, rgba(119, 0, 255, 1) 40%, rgba(141, 23, 232, 1) 60%, rgba(141, 23, 232, 0.8) 80%, rgba(141, 23, 232, 0.6)) !important;;
                      /* ↑ nice little linear gradient - linear-gradient(to right, rgba(73, 0, 255, 1), rgba(96, 0, 255, 1) 20%, rgba(119, 0, 255, 1) 40%, rgba(141, 23, 232, 1) 60%, rgba(141, 23, 232, 0.8) 80%, rgba(141, 23, 232, 0.6)) !important; */
                      border-radius: 20px !important;
                      margin: 1px !important;
                      /* Increase/decrease margin to make the bar smaller or larger */
                  }
                  /* ↑ Backup - [data-testid="player-controls"] [data-testid="playback-progressbar"] [data-testid="progress-bar"] .epWhU7hHGktzlO_dop6z */
                  /* ↓ Backup - [data-testid="now-playing-bar"] [data-testid="player-controls"] [data-testid="playback-progressbar"] .w699O0LgQRghXyl3bs9u */
                  /* Progress bar background */
                  [data-testid="now-playing-bar"] [data-testid="player-controls"] [data-testid="playback-progressbar"] .w699O0LgQRghXyl3bs9u {
                 background-color: var(--progress-bar--background-color) !important;
             }
                  /* Little mover buddy thingo */
             .Vis45PPawTyED7Lt2_LI {
              background-color: var(--progress-bar-dot-color) !important;
              border: 2px !important;
              border-radius: 50%;
              -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
              box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
              display: none;
              height: 12px;
              width: 12px;
              z-index: 100;
             }
             /* Outside color / border */
             .p1ULRzPc4bD8eQ4T_wyp {
                 background-color: transparent !important;
                 border-radius: 20px !important;
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
      
      /* Lyrics provided by Musixmatch - bye! */
      /* REDO as it messes up text for playlists */
       .main-view-container__scroll-node-child [aria-label="Spotify"] .esRByMgBY3TiENAsbDHA :first-child {
            display: none !important;
      }
      
      /*- Lyrics font size -*/
            .os-content .main-view-container__scroll-node-child [aria-label="Spotify"] .esRByMgBY3TiENAsbDHA {
                  font-size: var(--lyrics-font-size) !important;
                  text-align: justify !important;
                  text-indent: 3px !important;
                  /*font-size: -webkit-fill-available !important;*/
          }
      
          /* Colour of lyrics font */
          .NiCdLCpp3o2z6nBrayOn.MEjuIn9iTBQbnCqHpkoQ {
                color: var(--lyrics-color) !important;
          }
          
      
      /*- Profile Image -*/
      /* Profile Image / Leaves a black dot */
      .Xz3tlahv16UpqKBW5HdK {
          display: var(--hide-profile-icon) !important;
      }
      
       
       /* Date added */
       [role="row"] [data-testid="tracklist-row"] [aria-colindex="\x34 "] [data-encore-id="type"] {
           display: var(--hide-song-date) !important;
       }
           .contentSpacing [data-testid="track-list"] [aria-colindex="\x34 "] .standalone-ellipsis-one-line {
               display: var(--hide-song-date) !important;
           }
       
       /* Song numbering */
       /* Song numbers */
       [role="row"] [data-testid="tracklist-row"] [aria-colindex="\x31 "] [data-encore-id="type"] {
           display: var(--hide-song-numbering) !important;
       }
       
       /* Song timings */
       /* duration of songs */
       [role="row"] [data-testid="tracklist-row"] [aria-colindex="\x35 "] [data-encore-id="type"] {
           display: var(--hide-song-dura) !important;
       }
       
       /* Song info bar / title, album etc */
       .contentSpacing [data-testid="track-list"] [role="row"]:has([aria-label="Duration"]) {
           display: var(--hide-top-infbar);
       }
           /* remove spacing */
           .contentSpacing [data-testid="track-list"] [role="presentation"]:has([role="columnheader"]) {
               display: var(--hide-top-infbar);
           }
       
       /* hide album */
       [role="row"] [data-testid="tracklist-row"] [aria-colindex="\x33 "]:has(.standalone-ellipsis-one-line) {
           display: var(--hide-song-album) !important;
       }
       
       /* hide song liked icon */
       [role="row"] [data-testid="tracklist-row"] [data-testid="add-button"] [d] {
           display: var(--hide-song-heart) !important;
       }
       
       
   
       /*- No idea... -*/
       [data-testid="now-playing-widget"] [data-testid="CoverSlotCollapsed__container"] [data-testid="context-link"] [data-testid="cover-art-image"] {
        /* Another name for it ↑ .FqmFsMhuF4D0s35Z62Js */
             background-color: rgb(244, 15, 15) !important;
             background: rgba(131, 16, 81, 0.6) !important;
             background-image: url("https://arc.net/reddit_boost_background.jpg") !important;
             background-size: cover !important;
             background-attachment: fixed !important;
             background-repeat: no-repeat !important;
             background-blend-mode: soft-light !important;
             /*
             background-position: 50% !important;
             background-repeat: no-repeat !important;
             background-size: contain !important;
             */
             left: 0;
             position: absolute;
             top: 0;
             min-height: -webkit-fill-available !important; 
             height: -webkit-fill-available !important;
             width: -webkit-fill-available !important;
       }
       
       /*- Watermark -*/
       .main-view-container__scroll-node .os-content .main-view-container__scroll-node-child [data-testid="settings-page"]::after {
            content: "CSS/JS made by Kami. Specifically made for SpotOn (https://github.com/senpaihunters/spoton), any distrubtion is prohibited, unless contacted and allowed otherwise.";
            cursor: auto;
       }
       
       /*- Bye bye elements -*/
       .os-content .main-view-container__scroll-node-child .main-view-container__mh-footer-container [data-testid="footer-div"] {
           display: none !important;
       }
   
       /*- Rainbow controls -*/
       /*- Rainbow Controls -*/
           /* Full Rbcs */
             [aria-expanded="false"] #device-picker-icon-button [role="presentation"], .KAZD28usA1vPz5GVpm63, .doaMwz, .hkmxYW, [dir=ltr] .eSg4ntPU2KQLfpLGXAww>:first-child, .dlqYDF,  .prGqQr33U0mG14TJ5V8a.BhKGkKPprp2wm9bvfRKG, .prGqQr33U0mG14TJ5V8a, .jqMzOG:hover .ButtonInner-sc-14ud5tc-0, .fipMme, .kGFDdV, .SPC4uzYXJmknkCGKpxHw, .No0A0v6U6vtqj_ybS1Cd, .Fyc_tPyPKyRIT_59VZ2B, .hwP4Oum2PB765sb8jigI, .HVCCFeUiHVwZVv74p34a, .KIbfbFDao0SHpZsKoKZD, .PrhIVExjBkmjHt6Ea4XE, .bkFQH4uasL3pXqN9eDSi, .control-button--active, .jyHIqB, .TJ5Bjp6vgnWVbh6mGN0n, .Btg2qHSuepFGBG6X0yE, .jOKLc29vP0Bz1K0TsDtX, .NoOAOv6U6vtqj_ybS1Cd, .NoOAOv6U6vtqj_ybS1Cd, .rRF_r7EyCHjZv058JACi, .collection-active-icon, .collection-icon, .home-active-icon, .home-icon, .make-music-active-icon, .make-music-icon, .premiumSpotifyIcon, .search-active-icon, .search-icon, .TywOcKZEqNynWecCiATc, .control-button, .control-button--active, .INitzTSjokOMEJOc6P2H, .jOKLc29vP0Bz1K0TsDtX, .uWvwXlS0Da1bWsRX6KOw, .cWIysU, .NdVm10_yLWkkgq87jOMk, .CCeu9OfWSwIAJqA49n84, .Svg-sc-ytk21e-0 uPxdw, .ShMHCGsT93epRGdxJp2w Ss6hr6HYpN4wjHJ9GHmi, .T0anrkk_QA4IAQL29get, .connect-device-list-container, .control-button-heart, .encore-dark-theme .encore-bright-accent-set, .eSg4ntPU2KQLfpLGXAww, .dpREpp, .CmkY1Ag0tJDfnFXbGgju, .wC9sIed7pfp47wZbmU6m, .control-button--active, .eJHlti, .Nd_DeCpszONzyaLe5Wd1 {
                animation: rainbow-text 30s infinite;
                /* Increase timings to increase rainbow effect or reduce it */
                background-color: transparent;
                cursor: auto;
           /* ↑ .NiCdLCpp3o2z6nBrayOn.MEjuIn9iTBQbnCqHpkoQ ↑ - colour for lyrics */
             }
       
           /* Font weighing */
            .TywOcKZEqNynWecCiATc, .h4HgbO_Uu1JYg5UGANeQ.iSbqnFdjb1SuyJ3uWydl:hover .VpYFchIiPg3tPhBGyynT, .Btg2qHSuepFGBG6X0yE, .h4HgbO_Uu1JYg5UGANeQ.iSbqnFdjb1SuyJ3uWydl:hover .t_yrXoUO3qGsJS4Y6iXX, a:hover, a:focus, .OCY4jHBlCVZEyGvtSv0J, .GD2gbRtcs5dOjMGAM_Y4, .KVKoQ3u4JpKTvSSFtd6J.OF_3F0SQCsBtL1jSTlTA, .Vz6yjzttS0YlLcwrkoUR.tP0mccyU1WAa7I9PevC1, .control-button--active, .fFv7yCuLuIO1dAGZHcVf, .jOKLc29vP0Bz1K0TsDtX, .kEuUqR, .Rpvqb, .uWvwXlS0Da1bWsRX6KOw,  .NoOAOv6U6vtqj_ybS1Cd, .w699O0LgQRghXyl3bs9u, .RfidWIoz8FON2WhFoItU, .Xz3tlahv16UpqKBW5HdK, .uV8q95GGAb2VDtL3gpYa, .XwNfIrI6_hCa_9_T2cQB, .EhyK_jJzB2PcWXd5lg24 {
                animation: rainbow-text 30s infinite;
                font-size: 15px !important;
                font-weight: bold;
           }
       
           /* Nav bar rainbow controls */
           [aria-label="Main"] [d]
           {
               animation: rainbow-text 30s infinite;
               font-size: 18px !important;
               font-weight: bold !important;
           }
       
            @-webkit-keyframes rainbow {
                0% {
                    background-position: 0% 82% 
               }
                0% {
                    background-size: 100% 100%;
               }
                50% {
                    background-position: 100% 19%
               }
                50% {
                    background-size: 200% 200%;
               }
                100% {
                    background-position: 0% 82% 
               }
                100% {
                    background-size: 100% 100%;
               }
           }
            @-moz-keyframes rainbow {
                0% {
                    background-position: 0% 82% 
               }
                0% {
                    background-size: 100% 100%;
               }
                50% {
                    background-position: 100% 19% 
               }
                50% {
                    background-size: 200% 200%;
               }
                100% {
                    background-position: 0% 82% 
               }
                100% {
                    background-size: 100% 100%;
               }
           }
            @-o-keyframes rainbow {
                0% {
                    background-position: 0% 82% 
               }
                0% {
                    background-size: 100% 100%;
               }
                50% {
                    background-position: 100% 19% 
               }
                50% {
                    background-size: 200% 200%;
               }
                100% {
                    background-position: 0% 82% 
               }
                100% {
                    background-size: 100% 100%;
               }
           }
            @keyframes rainbow {
                0% {
                    background-position: 0% 82% 
               }
                0% {
                    background-size: 100% 100%;
               }
                50% {
                    background-position: 100% 19% 
               }
                50% {
                    background-size: 200% 200%;
               }
                100% {
                    background-position: 0% 82%
               }
                100% {
                    background-size: 100% 100%;
               }
           }
           /* Rainbow text - everything else */
            :before, :after {
                animation: rainbow-text 30s infinite;
                font-size: 22px !important;
                font-weight: bold;
           }
           /* The Rainbow text */
            @keyframes rainbow-text {
                0% {
                    color: #ff0000;
               }
                10% {
                    color: #ff8000;
               }
                20% {
                    color: #ffff00;
               }
                30% {
                    color: #80ff00;
               }
                40% {
                    color: #00ff00;
               }
                50% {
                    color: #00ff80;
               }
                60% {
                    color: #00ffff;
               }
                70% {
                    color: #0080ff;
               }
                80% {
                    color: #0000ff;
               }
                90% {
                    color: #8000ff;
               }
                100% {
                    color: #ff0080;
               }
           }
       
           /* Spinning album/cover art */
           .cover-art-image.cover-art-image-loaded,
           .cover-art.shadow.actionable.cover-art--with-auto-height,
           .cover-art-image.cover-art-image-loaded,
           .cover-art-image:before,
           .cover-art-image-loaded,
           .cover-art.shadow,
           .actionable.cover-art--with-auto-height,
           .Ws8Ec3GREpT5PAUesr9b {
             animation: spin 1s linear;
             border-radius: 25px;
           }
                @-moz-keyframes spin {
                    100% {
                        -moz-transform: rotate(360deg);
                   }
               }
                @-webkit-keyframes spin {
                    100% {
                        -webkit-transform: rotate(360deg);
                   }
               }
                @keyframes spin {
                    100% {
                        -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                   }
               }
           
               /*- Font -*/
                
                @font-face {
                font-family: 'Akronim' !important;
                src: url('https://fonts.googleapis.com/css2?family=Akronim&display=swap') !important;
                import: url('https://fonts.googleapis.com/css2?family=Akronim&display=swap') !important;
                }
                   h1, h2, .link-subtle {
                       font-family: 'Akronim', cursive !important;
                       font-weight: normal !important;
                       }
                       body {
                           font-family: 'Akronim', cursive !important;
                           }
                           .mo-info-name {
                               font-family: 'Akronim'; 
                               font-weight: normal !important;
                               } 
                               
                               body, body.login, body.login *, .SearchInputBox__input, .jf2HafzDEI9jn7Yo05eM, .kohoVM,  .inputBox-input, .PlaylistRecommendedTracks__top .PlaylistRecommendedTracks__title, .jdSGNV, .RP2rRchy4i8TIp1CTmb7, .MyW8tKEekj9lKQsviDdP, .gHImFiUWOg93pvTefeAD, .dXoLvE, .HcA9WjbLc4x02X8Ty0uO.lro6AjUrZFH6zxjmOGg0>* {
                                   font-family: Akronim !important;
                                   src: import url(https://fonts.gstatic.com/s/akronim/v23/fdN-9sqWtWZZlHRpygl7kXQO6a5IYA.woff2) format('woff2') !important;
                                   }
               * {
                   text-decoration: auto;
                   border: none !important;
                   word-wrap: break-word;
                } 
               
               /* Nav bar */
                .navBar-group-header::first-letter, .navBar-item .type::first-letter {
                    text-transform: capitalize;
                   }
                       .navBar-group-header, .navBar-item .type {
                           letter-spacing: 0.6px;
                           text-transform: lowercase !important;
                           font-size: 12px;
                           }
           
               /* Songs, numbering and headings */
               .mo-info::first-letter, *::first-letter, *:focus::first-letter, *:hover::first-letter {
                   font-size: var(--firstLsize) !important;}
               
               .RecentlyPlayedWidget__type {
                   color: #b3b3b3 !important;
                   text-transform: lowercase !important;}
               
               .RecentlyPlayedWidget__type::first-letter {
                   text-transform: uppercase !important;}
               
               .btn.btn-green.cta-button::first-letter, .btn.btn-black.btn-small::first-letter, .btn.btn-green::first-letter, .btn.btn-black::first-letter, .btn.btn-black:hover::first-letter, .btn.btn-fg-green::first-letter, .btn.btn-transparent::first-letter, .btn.btn-blue.btn-small::first-letter, .btn-landing.btn-white::first-letter, .btn-landing.btn-green::first-letter, .btn.btn-sm.btn-block.btn-facebook.ng-binding::first-letter, .btn.btn-sm.btn-block.btn-green.ng-binding::first-letter, .ResponsiveViewMoreButton__button::first-letter, .btn.btn-white::first-letter {
                   font-size: var(--firstLsize) !important;
                   text-transform: capitalize;
                   position: relative;}
               
   
                   .hwP4Oum2PB765sb8jigI, .HVCCFeUiHVwZVv74p34a, .zi377dMLSwXnFiejYnRa {
                     border-radius: 0px !important;
                     margin: 0 0px #000 !important;
                     padding: 0 0px #000 !important;
                     } 
                    
                     .DG9CsoFIptJhAneKoo_F { 
                     margin-top: -105px; 
                     margin-bottom: 26px; 
                     }
                    
                     .ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi[aria-colcount='5'] .wTUruPetkKdWAR1dd6w4 {
                     border-radius: 32px !important;
                     } 
                    
                    
                    a.btn.btn-fg-green{
                        padding-top: 2em !important;
                        padding-bottom: 2em !important;}
                    
                    .btn.btn-fg-green {
                        padding-top: 2em !important;
                        padding-bottom: 2em !important;}
                    
                    .middle-align.progress-bar__slider {
                        transform: scale(.7) !important;
                        border: 0px solid rgb(0,0,0,1) !important;
                        background: radial-gradient(at left top, rgba(255,255,255,1), var(--playCol), rgba(0,0,0,1))!important;}
                    
                    .volume-bar .middle-align.progress-bar__slider {
                        border: 0px solid rgb(30,30,30) !important;}
                    
                    .now-playing-bar__right__inner {
                        padding-right: 6px !important;}
                
                    
                    .accountPage .icon, .downloadPage-inner {
                        margin-top: 50px;}
                    
                
                     .tUwyjggD2n5KvEtP5z1B {
                     cursor: auto; 
                
                     min-height: -webkit-fill-available !important; 
                     height: -webkit-fill-available !important;
                     width: -webkit-fill-available !important;
                     padding-top: 20px !important;
                    }
                
                
                /* NOTE: Playlist info text */
                     .fhrvNw, .rEN7ncpaUeSGL9z0NGQR, Fb61sprjhh75aOITDnsJ {
                      font-size: 3rem !important;
                      display: table-column !important;
                      text-align: -webkit-match-parent !important;
                      font-family: auto !important;
                      margin-top: 0px !important;
                      width: -webkit-fill-available !important;
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
           filter: blur(10px);
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
           /*background: transparent !important;*/
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
       
       /*-------Home button-----*/
   
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
       
       /*---------------text-----------------*/
       
       /* Change the color of the song titles in a playlist */
       .cvuJgi {
         color: var(--song-color) !important;
       }
           .link-subtle {
               color: #ffffffe0;
               }
       
               .GKnnhbExo0U9l7Jz2rdc:active, .GKnnhbExo0U9l7Jz2rdc:focus, .GKnnhbExo0U9l7Jz2rdc:hover, .moDRd9td0KtitPDzR7OJ, .moDRd9td0KtitPDzR7OJ:focus, .moDRd9td0KtitPDzR7OJ:hover {
                   color: #fff;
                   }
       
                   .home-icon {
                       color: #b3b3b3;
                       }
       
       .ec1b5762556429ac3aeedbae72433491-scss {
           color: #ffffffe0 !important;
           }
       
       div.os-padding > div > div > ul > div > div:nth-child(2) > div {
           border-radius: 5px;
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
       
       /* Hides 'profile' button */
       .odcjv30UQnjaTv4sylc0 {
         display: none;
       }
       
       
       /* Hide 'profile' text */
       .EeWTFG_vxLI5QJc1TH4F, .RfdRTSGwulyQdDepLUTT .EeWTFG_vxLI5QJc1TH4F, .RfdRTSGwulyQdDepLUTT .eAXFT6yvz37fvS1lmt6k {
         display: none;
       }
       
       
       /* Edit profile name and or pic */
       .XwNfIrI6_hCa_9_T2cQB {
         border-radius: 35px !important;
         background: rgba(0, 0, 0, 0.4) !important;
       }
       
       /* Profile button */ /*
       .Xz3tlahv16UpqKBW5HdK {
           display: none !important;
       }
       */
       
       /* full removal */ /*
       .pEG0W4wkbkrOYURhz82H {
           display: none !important;
       }
       */
       
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
       
           /*--------------Now Playing Bar--------------*/        
           
           .O6evDj2xd8mSlS2qiPiG {
               background: var(--overlay-heavy)
               }
           
           ._mSbAWxlXgc2ONtpnuXQ:before,
           ._mSbAWxlXgc2ONtpnuXQ:after,
           #main > div.Root.encore-dark-theme > div > div.Root__now-playing-bar > footer > div > div > div > div > div > div:before,
           #main > div.Root.encore-dark-theme > div > div.Root__now-playing-bar > footer > div > div > div > div > div > div:after {
               background: none;
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
           
           .nav-ylx .OCY4jHBlCVZEyGvtSv0J {
             height: 100px !important;
           }
             .deomraqfhIAoSB3SgXpu {
               transform: translateX(-20px) !important;
             }
               .jOKLc29vP0Bz1K0TsDtX {
                 min-width: 340px !important;
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
       }
       
           .SboKmDrCTZng7t4EgNoM, div#trippy-7, .SboKmDrCTZng7t4EgNoM, div#trippy-7, .SboKmDrCTZng7t4EgNoM {
             background: var(--hovercolor) !important;
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
       
       /*-----------Hide Buttons etc-----------*/
       
       .nav-ylx [aria-label="Top\ bar\ and\ user\ menu"] span:has(.ellipsis-one-line) {
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
           overflow-y: visible !important;
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
     
     /* The inside of current playing song border thing */
     .iSbqnFdjb1SuyJ3uWydl {
       border-radius: var(--main-border-radius) !important;
     }
     
     div.os-padding > div > div > div.main-view-container__scroll-node-child > main > div > section > div > div:nth-child(3) > div > div > div:nth-child(2) > div > div {
       border-radius: var(--main-border-radius) !important;
     }
     
       
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
       
         
       /*- Cursors -*/
           /* The play/pause icon on a song */
           [data-testid="tracklist-row"] [role="gridcell"] [height="\x32 4"] :first-child {
               cursor: pointer !important;
           }
               /* play/pause on the content spacing - top bar */
               .contentSpacing [data-testid="action-bar-row"] [data-testid="play-button"] [role="img"] {
                   cursor: pointer !important;
               }
               /* top bar / play/pause back and forward */
               [aria-label="Top\ bar\ and\ user\ menu"] [aria-hidden="true"] {
                   cursor: pointer !important;
               }
               /* heart icon */
               [dir="ltr"] [aria-checked="true"]:has([role="img"]) {
                   cursor: pointer !important;
               }
               /* now playing controls */
               .player-controls__buttons {
                   cursor: pointer !important;
               }
               /* now playing buttons */
               [data-testid="now-playing-bar"] [d] {
                   cursor: pointer !important;
               }     
           
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
           background: var(--overlay-heavy) 
       }
   }
   


        
    `;

    if (das == true) {
      css += `
        .Root__nav-bar, .nav-alt .Root__main-view, .nav-alt .Root__nav-bar, .Root__fixed-top-bar{
            background: var(--overlay-heavy)!important;
        }
      `;
    }

    if (document.getElementById("skin") == null) {
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
          document.documentElement.appendChild(node);
        }
      }
    }

    var observer = new MutationObserver((changes) => {
      changes.forEach((change) => {
        var coverartimage = document.querySelectorAll(
          "[data-testid=cover-art-image]"
        )[0];
        if (change.attributeName.includes("src")) {
          console.log("Changing background!");
          var sheet = document.createElement("style");
          sheet.setAttribute("id", "background");
          if (document.getElementById("background") != null) {
            document.getElementById("background").remove();
          }
          sheet.innerHTML = ":root{ --backimg:url(" + coverartimage.src + ");}";
          document.body.appendChild(sheet);
        }
      });
    });

    function addObserverIfDesiredNodeAvailable() {
      var coverartimage = document.querySelectorAll(
        "[data-testid=cover-art-image]"
      )[0];
      if (!coverartimage) {
        window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
        return;
      }
      var sheet = document.createElement("style");
      sheet.setAttribute("id", "background");
      if (document.getElementById("background") != null) {
        document.getElementById("background").remove();
      }
      sheet.innerHTML = ":root{ --backimg:url(" + coverartimage.src + ");}";
      document.body.appendChild(sheet);
      observer.observe(coverartimage, { attributes: true });
    }

    addObserverIfDesiredNodeAvailable();

    setInterval(function obs() {
      var coverartimage = document.querySelectorAll(
        "[data-testid=cover-art-image]"
      )[0];
      observer.observe(coverartimage, { attributes: true });
    }, 1500);
  }
}

var lastsong = "";
var foundsong = 0;
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
      scrolltimeout = 1;
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

function applyOptions(options) {
  const playlistImage = document.querySelector(
    '[data-testid="playlist-page"] .contentSpacing [data-testid="playlist-image"]'
  );

  if (options.enabled === "true") {
    playlistImage.style.display = "none";
  } else {
    playlistImage.style.display = "block";
    playlistImage.style.backgroundImage = `url(${
      options.albumArt ||
      "https://user-images.githubusercontent.com/103985728/244695468-5e39f1d4-e2f4-4f20-a80e-2d8f79f80747.jpg"
    })`;
    playlistImage.style.backgroundSize = "contain";
    playlistImage.style.borderRadius = "20px";
  }
}


(function SpotOnMainSkin() {var css = [

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
    let optionCurrentSize = 30.0
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
      iframe.style.height = document.documentElement.clientHeight - bar.clientHeight - 15 + 'px'
    }
    
    function onResize () {
      const iframe = document.getElementById('lyricsiframe')
      if (iframe) {
        setFrameDimensions(document.getElementById('lyricscontainer'), document.getElementById('lyricsiframe'), document.querySelector('.lyricsnavbar'))
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
    
      const topContainer = document.querySelector('div.Root')
      if (!document.getElementById('lyricscontainer')) {
        topContainer.style.width = (100 - optionCurrentSize) + '%'
        topContainer.style.float = 'left'
        if (topContainer.style.getPropertyValue('--panel-gap')) {
          topContainer.style.marginRight = '-' + topContainer.style.getPropertyValue('--panel-gap')
        }
        resizeContainer = document.createElement('div')
        resizeContainer.id = 'lyricscontainer'
        resizeContainer.style = 'min-height: 100%; width: ' + optionCurrentSize + '%; position: relative; z-index: 1; float:left;background:black'
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
      const submitSpotifyLyricsIgnored = JSON.parse(await GM.getValue('submit_spotify_lyrics_ignore', '[]'))
    
      const key = songTitle + ' - ' + songArtistsArr.join(', ')
      if (submitSpotifyLyricsIgnored.indexOf(key) !== -1) {
        // User has previously clicked "Cancel" on the confirm dialog for this song
        console.debug('onNoResults() Key "' + key + '" is ignored')
        return
      }
    
      if (showSpotifyLyricsEnabled && document.querySelector('[data-testid="lyrics-button"]')) {
        openAndAskToSubmitSpotifyLyrics(songTitle, songArtistsArr, false)
      }
    }
    
    async function openAndAskToSubmitSpotifyLyrics (songTitle, songArtistsArr, forceSubmit = false) {
      const submitSpotifyLyricsEnabled = forceSubmit || (await GM.getValue('submit_spotify_lyrics', true))
      const key = songTitle + ' - ' + songArtistsArr.join(', ')
    
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
          if (forceSubmit || (await confirmUI(`Genius.com doesn't have the lyrics for this song but Spotify has the lyrics. Would you like to submit the lyrics from Spotify to Genius.com?\n(You need a Genius.com account to do this)\n${songTitle} by ${songArtistsArr.join(', ')}`))) {
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
    
    function submitLyricsFromMenu () {
      closeModalUIs()
    
      const [songTitle, songArtistsArr] = getSongTitleAndArtist()
    
      if (songTitle && document.querySelector('[data-testid="lyrics-button"]')) {
        openAndAskToSubmitSpotifyLyrics(songTitle, songArtistsArr, true)
      } else {
        alertUI('Spotify lyrics are not available for this song.')
     }
    }
    
    function submitLyricsToGenius (songTitle, songArtistsArr, lyrics) {
      GM.setValue('submitToGenius', JSON.stringify({
        lyrics,
        songTitle,
        songArtistsArr
      })).then(function () {
        GM_openInTab('https://genius.com/songs/new', { active: true })
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
        const topContainer = document.querySelector('div.Root')
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
        } else if (genius.current.compoundTitle) {
          showSearchField(genius.current.compoundTitle.replace(/\t/g, ' '));
        } else if (genius.current.artists && genius.current.title) {
          showSearchField(genius.current.artists + ' ' + genius.current.title)
        } else if (genius.current.artists) {
          showSearchField(genius.current.artists)
        } else {
          showSearchField()
        }
      })
    
      const separator = document.createElement('span')
      separator.setAttribute('class', 'second-line-separator')
      separator.setAttribute('style', 'padding:0px 10px')
    
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
        <span style="color:silver;font-size:2.0em">🅖</span>
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
      const compoundTitle = genius.current.compoundTitle
      const onclick = function onclick () {
        genius.f.rememberLyricsSelection(compoundTitle, null, this.dataset.hit)
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
      if (hits.length === 0) {
        const li = ol.appendChild(document.createElement('li'))
        li.style.fontSize = 'larger'
        li.innerHTML = 'No results found'
      }
    }
    
    const songTitleQuery = 'a[data-testid="nowplaying-track-link"],.Root footer .ellipsis-one-line a[href^="/track/"],.Root footer .ellipsis-one-line a[href^="/album/"],.Root footer .standalone-ellipsis-one-line a[href^="/album/"],[data-testid="context-item-info-title"] a[href^="/album/"],[data-testid="context-item-info-title"] a[href^="/track/"]'
    
    function getSongTitleAndArtist () {
      let songTitle = document.querySelector(songTitleQuery).innerText
      songTitle = genius.f.cleanUpSongTitle(songTitle)
      const songArtistsArr = []
      document.querySelectorAll('.Root footer .ellipsis-one-line a[href^="/artist/"],.Root footer .standalone-ellipsis-one-line a[href^="/artist/"],a[data-testid="context-item-info-artist"][href^="/artist/"],[data-testid="context-item-info-artist"] a[href^="/artist/"]').forEach((e) => songArtistsArr.push(e.innerText))
      return [songTitle, songArtistsArr]
    }
    
    function addLyrics (force, beLessSpecific) {
      let musicIsPlaying = false
      if (document.querySelector('.Root footer .player-controls__buttons button')) {
        document.querySelectorAll('.Root footer .player-controls__buttons button').forEach(function (button) {
          if (button.getAttribute('aria-label') === 'Pause' ||
              button.innerHTML.indexOf('M3 2h3v12H3zM10 2h3v12h-3z') !== -1 ||
              button.innerHTML.indexOf('M3 2h3v12H3zm7 0h3v12h-3z') !== -1 ||
              button.innerHTML.indexOf('M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0') !== -1 ||
              button.innerHTML.indexOf('M2.7 1a.7.7 0 0 0-.7.7v12.6a') !== -1
          ) {
            musicIsPlaying = true
          }
        })
      }
      const [songTitle, songArtistsArr] = getSongTitleAndArtist()
      genius.f.loadLyrics(force, beLessSpecific, songTitle, songArtistsArr, musicIsPlaying)
    }
    
    let lastPos = null
    function updateAutoScroll () {
      let pos = null
      try {
        const els = document.querySelectorAll('.playback-bar [data-testid="playback-position"],.playback-bar [data-testid="playback-duration"]')
        if (els.length !== 2) {
          throw new Error(`Expected 2 playback elements, found ${els.length}`)
        }
        const [current, total] = Array.from(els).map(e => e.textContent.trim()).map(s => s.split(':').reverse().map((d, i, a) => parseInt(d) * Math.pow(60, i)).reduce((a, c) => a + c, 0))
        pos = current / total
      } catch (e) {
        // Could not parse current song position
        pos = null
      }
      if (pos != null && !Number.isNaN(pos) && lastPos !== pos) {
        genius.f.scrollLyrics(pos)
        lastPos = pos
      }
    }
    
    function startSearch (query, container) {
      genius.f.searchByQuery(query, container, (res) => {
        if (res && res.status === 200) {
          listSongs(res.hits, container, query)
        } else {
          const div = container.appendChild(document.createElement('div'))
          div.classList.add('geniushit')
          div.innerHTML = `Error:<pre>${JSON.stringify(res, null, 2)}</pre>`
        }
      })
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
      } else if (genius.current.compoundTitle) {
        input.value = genius.current.compoundTitle.replace(/\t/g, ' ');
      } else if (genius.current.artists && genius.current.title) {
        input.value = genius.current.artists + ' ' + genius.current.title
      } else if (genius.current.artists) {
        input.value = genius.current.artists
      }
      input.addEventListener('focus', function onSearchLyricsButtonFocus () {
        this.style.color = 'black'
      })
      input.addEventListener('change', function onSearchLyricsButtonClick () {
        this.style.color = 'black'
        if (input.value) {
          startSearch(input.value, b)
        }
      })
      input.addEventListener('keyup', function onSearchLyricsKeyUp (ev) {
        this.style.color = 'black'
        if (ev.key === 'Enter') {
          ev.preventDefault()
          if (input.value) {
            startSearch(input.value, b)
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
      b.setAttribute('style', 'position:absolute; top: 0px; right:0px; font-size:14px; color:#ffff64; cursor:pointer; z-index:3000;')
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
        b.setAttribute('style', 'position:absolute; top: 0px; right:0px; font-size:14px; background-color:#0007; color:#ffff64; cursor:pointer; z-index:3000;border:1px solid #ffff64;border-radius: 100%;padding: 0px 5px;font-size: 10px;')
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
        opacity:0.1;
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
      .lyricsnavbar {
        background-color: rgb(80, 80, 80);
        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgb(18, 18, 18));
        border-radius: 8px 8px 0px 0px;
        margin: 8px 0px 0px 0px;
        padding:0px 10px;
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
      .lyricsnavbar .second-line-separator,.lyricsnavbar .second-line-separator:hover {
        padding:0px 10px !important;
        color: transparent;
        vertical-align: text-bottom;
      }
      .geniushits li.tracklist-row {
        cursor:pointer
      }
      .geniushits li.tracklist-row:hover {
        background-color: #fff5;
        border-radius: 5px;
      }
      .geniushits li .geniushiticonout {
        display:inline-block;
      }
      .geniushits li:hover .geniushiticonout {
        display:none
      }
      .geniushits li .geniushiticonover {
        display:none
      }
      .geniushits li:hover .geniushiticonover {
        display:inline-block;
        padding-top:5px;
     }
      .geniushiticon {
        width:25px;
        height:2em;
        display:inline-block;
        vertical-align: top;
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
        color: #121212;
        background-color: hsla(0,0%,100%,.6);
        border-radius: 2px;
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
    
    function styleIframeContent () {
      if (genius.option.themeKey === 'genius' || genius.option.themeKey === 'geniusReact') {
        genius.style.enabled = true
        genius.style.setup = () => {
          genius.style.setup = null // run once; set variables to genius.styleProps
          if (genius.option.themeKey !== 'genius' && genius.option.themeKey !== 'geniusReact') {
            genius.style.enabled = false
            return false
          }
          return true
        }
      } else {
        genius.style.enabled = false
        genius.style.setup = null
      }
    }
    
    function main () {
      if (document.querySelector('.Root footer .playback-bar') && document.querySelector(songTitleQuery)) {
        if (genius.option.autoShow) {
          addLyrics()
        } else {
          addLyricsButton()
        }
      }
    }
    
    if (document.location.hostname === 'genius.com') {
      // https://genius.com/songs/new
      fillGeniusForm()
    } else {
      window.setInterval(function removeAds () {
     // Remove "premium" button
        try {
          const button = document.querySelector('button[class^=Button][aria-label*=Premium]')
          if (button) {
            button.style.display = 'none'
          }
        } catch (e) {
          console.warn(e)
        }
        // Remove "install app" button
        try {
          const button = document.querySelector('a[href*="/download"]')
          if (button) {
            button.style.display = 'none'
          }
        } catch (e) {
          console.warn(e)
        }
        // Remove iframe "GET 3 MONTHS FREE"
        try {
          const iframe = document.querySelector('iframe[data-testid="inAppMessageIframe"]')
          if (iframe && iframe.contentDocument && iframe.contentDocument.body) {
            iframe.contentDocument.body.querySelectorAll('button').forEach(function (button) {
              if (button.parentNode.innerHTML.indexOf('Dismiss_action') !== -1) {
                button.click()
              }
            })
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
    
      genius.option.enableStyleSubstitution = true
      genius.option.cacheHTMLRequest = true // 1 lyrics page consume 2XX KB [OR 25 ~ 50KB under ]
    
      genius.onThemeChanged.push(styleIframeContent)
    
      GM.registerMenuCommand(scriptName + ' - Show lyrics', () => addLyrics(true))
      GM.registerMenuCommand(scriptName + ' - Options', () => genius.f.config())
      GM.registerMenuCommand(scriptName + ' - Submit lyrics to Genius', () => submitLyricsFromMenu())
      window.setInterval(updateAutoScroll, 1000)
    }

    
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

});
