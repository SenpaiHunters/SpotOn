<h1 align="center">

  
<img width="279" alt="235338288-be1251b1-0074-4560-9c02-bff7bacef367" src="https://user-images.githubusercontent.com/103985728/236811543-fa90aa8e-34cf-44d6-a43f-b8fe5a74a819.png">


</h1>

<h1 align="center">
  
  
![GitHub watchers](https://img.shields.io/github/watchers/senpaihunters/spoton?style=social)
![GitHub repo size](https://img.shields.io/github/repo-size/senpaihunters/spoton?style=plastic)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/senpaihunters/spoton)
![GitHub contributors](https://img.shields.io/github/contributors/senpaihunters/spoton)
![GitHub all releases](https://img.shields.io/github/downloads/senpaihunters/spoton/total)

[![Top Langs Used](https://github-readme-stats.vercel.app/api/top-langs/?username=senpaihunters&layout=compact&theme=vision-friendly-dark)](https://github.com/anuraghazra/github-readme-stats)
  
  </h1>




![SpotOn](https://socialify.git.ci/SenpaiHunters/SpotOn/image?description=1&descriptionEditable=SpotOn%20is%20a%20full%20overhaul%20of%20Spotify%20Web%20Player%2C%20read%20the%20GitHub%20for%20full%20features.&font=Raleway&forks=1&issues=1&language=1&name=1&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Dark)


***
<h1 align="center"> What does SpotOn look like?</h1>


| Before |
| --- |
| ![Before](https://github.com/SenpaiHunters/SpotOn/assets/103985728/0e93c52c-ea88-4b0b-974b-2183d7a4ef0b) |


| After |
| --- |
| ![After](https://github.com/SenpaiHunters/SpotOn/assets/103985728/16cae3be-90b3-4929-978f-6f509c194734)|


<h3 align="center"> SpotOn get's updated reguarly, so this may change or be updated to look more pleasing. </h3>


<h2 align="center">Features</h2>

| Feature | Description |
| --- | --- |
| Animations! | Various animations added, including hover animation, spinning albums, skip/reverse animations, and playlist hover animation. |
| New font (Akronim) | A new font added, may appear different in other browsers. |
| Updated Nav Bar (NB) | Nav Bar now pushed out from whole menu, rounded, has album image within, and rainbow controls added. |
| Overhauled Now Playing Bar (NPB) | NPB now has variable size, rounded corners, black haze, full rainbow controls, smaller and rounded album art, reduced overall size, and removed background on `.playback-bar`. |
| Hide the Nav Bar! | The Nav Bar can now be hidden by clicking on the line that pops up when cursor is moved to the edge of the Nav Bar. |
| Song timings | Clicking on song time displays whole song time or remaining time. |
| Dynamic theme | Theme responds to cover art and displays it as background. |
| Rounded album art covers | All album art covers are now 15px rounded. |
| Rounded song hover & now playing song | Song hover and now playing song are now rounded. |
| Auto lyric search on Genius | Pressing 'G' icon on top right initiates script. |
| Copy track info | Select 'Copy' when right-clicking on a song. |
| Rainbow controls | Various buttons now have rainbow controls, including full screen, lyrics, like song, queue, devices, volume, PiP, repeat, and shuffle. |
| Removed Spotify Logo | Spotify logo has been removed. |
| Removed 'Install' app | 'Install' app has been removed from above album art cover in Nav Bar. |
| Removed 'Upgrade' button | 'Upgrade' app button been removed from the top bar. |
| Removed Podcasts from Homepage | Podcasts have been removed, but can still be found in 'Your Library'. |
| Removed 'Upgrade' button in top menu | 'Upgrade' button can still be found under profile. |
| Removal of bottom content bar | Bottom content bar hosting social links has been removed. |
| Removed device streaming info | Device streaming info has been removed from bottom bar. |
| Capitalized initial letter | First letter of each word is now capitalized. |
| Misc performance and bug fixes | Various performance and bug fixes have been implemented, including quicker loading times and search times. |
| Increased site-wide readability | Site-wide readability has been improved, particularly on lyrics and larger content. |
| Lyrics | Lyrics now have a black border, appropriate size, and can be copied. |
| Addition of Hotkeys | Hotkeys have been added and can be accessed by pressing 'Shift + ?' or '⌘ + ?'. |


***


<h2 align="center">Install Instructions</h2> 

https://user-images.githubusercontent.com/103985728/236811226-3070dfb3-85e9-4195-922e-40ab8a4bdf35.mp4





# Browser Support

| Browser | Support |
| --- | --- |
| Arc | MacOS exclusive, fully supported |
| Firefox | Supported, extension needs to be figured out |
| Chrome | Fully supported |
| Safari | Unsupported, only supported via userscript |
| Orion | Supported, same method as Safari |
| Opera GX | Fully supported |
| Brave | Fully supported |


***


<h2 align="center">Hidden Nav Bar</h2> 

https://user-images.githubusercontent.com/103985728/221404396-20eecdd2-1221-42b7-9e88-13faa5121f89.mp4


- Still works with SpotOn Righter

<h2 align="center">Copy song name & artist</h2>

| Feature | Description |
| --- | --- |
| Copy song name and artist | Adds a button for copying the artist and song name when right-clicking. This will not be a Chrome extension, instead will require a Userscript. |
| Right-click Imbedded right into Spotify's Menu |
| ![Imbedded right into Spotify's Menu](https://user-images.githubusercontent.com/103985728/195324014-728d02a2-af67-4051-8582-ae701f3861c9.png) | When right-clicking you'll see `copy track info`, once you press that the script will copy the song name & artist into your clipboard for copying. |
| Clean copy box, a clean copy box shows up! | 
| ![A Imbedded box](https://user-images.githubusercontent.com/103985728/195324024-6f64e4ce-c5ce-41e8-945e-614f5bee2145.png) | A box will show once copying is successful |

<h2 align="center">Genius Intergration</h2> 

| Genius integration |   |
| --- | --- |
| Note for Genius to work, you might need to add/have an active Genius account. Again, this is a userscript and will not be transferred to a Chrome extension as the APIs it uses are not supported on Chrome extensions |   |
| How do I enable 'No Spotify Lyrics? Then Let's Check Genius!' |   |
| 1. Click on Tampermonkey (or any userscript) | ![Click on Tampermonkey](https://user-images.githubusercontent.com/103985728/195988967-4ed93961-7b84-4b0c-9938-a2aba8b075f8.png) |
| 2. Click on "No Spotify Lyrics? Then Lets Check Genius! Show Lyrics" | ![SCR-20221016-l5](https://user-images.githubusercontent.com/103985728/195988969-c1b47c85-86b1-40ac-8253-f1bb183f2e5d.png) |
| 3. It'll automatically load in, with the current playing song with the lyrics if Genius has it. - __NOTE__ Having this open will reduce song loading speed if you have a lot going on in the background - To enable this, simply press the 'Hide Lyrics' then reopen the lyrics by pressing the 'G' on the top right. (Pic for ref) |   |
| Picture for reference. | <img width="122" alt="image" src="https://user-images.githubusercontent.com/103985728/221405927-d81eba89-2b07-48aa-a393-cba34a0ab2a1.png"> |
| Lyrics shown to the right of the page | <img width="1000" alt="image" src="https://user-images.githubusercontent.com/103985728/221405828-a6c6f3b9-7dce-42a2-884e-e2885fa100a0.png"> |
| 4. To hide the sidebar, either reload, or press 'hide'. - If you reloaded repeat steps 1 & 2 to reenable it. | ![SCR-20221016-lj](https://user-images.githubusercontent.com/103985728/195988974-03d14f4d-e4ad-4370-b6d4-c48c7df55089.png) |
| 5. If you press 'Hide' you'll see a little Genius Button cleanly off to the right - If you reloaded repeat steps 1 & 2 for the button to come back. | <img width="122" alt="image" src="https://user-images.githubusercontent.com/103985728/221405927-d81eba89-2b07-48aa-a393-cba34a0ab2a1.png"> |

