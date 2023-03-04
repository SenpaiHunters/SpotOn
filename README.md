# What is SpotOn?


SpotOn is a Userscript. Userscripts (a.k.a User Scripts, User scripts, or .user.js) are open-source licensed add-ons for web browsers, written in [JavaScript](https://www.wikipedia.org/wiki/JavaScript), that change web pages as they are loaded. They give users the power to make websites do what they want them to, rather than what was originally intended. In our case, we made SpotOn, giving users a new and modern revamp of Spotify, without loss of performance. For the exact features, check out the [Features Tab](https://github.com/SenpaiHunters/SpotOn/wiki/Features)


# Install link



To install the SpotOn script via Tampermonkey, follow these steps:

1. Copy the following link:
   `https://raw.githubusercontent.com/SenpaiHunters/SpotOn/Main/SpotOn%20-%20NHNPB%20V0.6%20.js`

2. Open Tampermonkey in your browser and click on the "Utilities" tab.

3. Paste the link into the "URL" field under the "Install from URL" section.

4. Click the "Install" button.

5. The SpotOn script should now be installed and ready to use!





***



<img width="988" alt="SCR-20221205-sl9" src="https://user-images.githubusercontent.com/103985728/207042079-10757e2a-c1c7-4876-9e38-ee96996fa09d.png">

- I'm not artist, please don't judge me too hard...




***


# ANNOUNCEMENT:
As of today (4/3/2023), SpotOn (the one that conceals the now-player bar) has failed. It no longer conceals the bar and will be legacy! This implies there will be no more updates for it, and SpotOn NPBR (non hidden now playing bar) will be changed to SpotOn from now on. Please accept my apologies for any inconvenience.


# Full feature list
     - More information will be added to the drop down menu, as well as tagged photos, as you go farther.

*** 


### This page has the full SpotOn features list + Images along.
More will be added as they become available, and this page will be updated accordingly.
There are no formal update times, I hope every month or so, but I've run out of things that work with Spotify, however I'm continuously experimenting with new stuff! Nonetheless, bug patches will be supplied when a bug is discovered; I am a lone developer, so please excuse the slow rates!


*** 

- Animations!
  - An animation when hovering over a song
  - Added some fun spinning albums 
    - All TOP album covers spin when loading into a playlist(s). 
  - Skipping animation
  - Pause animation
  - Hover animation
  - Playlist (batch) hover animation
  - Album art (hover - library) animation
- A new font (Akronim)
  - It may seem differently in other browsers (Photos from Chrome as that is the primary browser I use) - You may use anything you like! Just make it work on Spotify... It took me some time to find one.
- An updated Nav Bar (previously written as Menu bar)
  - This is now pulled out, rounded, and has the album image within (space is 7.5px across both sides), as well as a pink haze (rgba(255,192,203,0.1)) for enhanced readability (rather than solid black), rainbow controls, hover animations, and convenient hotkey access.
- Updated Now Playing Bar (NPB)
  - There are two versions of SpotOn available. 'SpotOn' generally conceals the bottom NPB, however there is another version of SpotOn that has the bar always visible.. 
  - The modifications are as follows: size is variable depending on display size (bigger display = bigger bar), rounded corners, black haze, full rainbow controls, smaller album art, full black haze along the sides to blend the bar, and is made smaller, as there was no need for that MASSIVE size originally!
- Hide the Nav Bar!
  - This is very simple, just move the cursor next to the edge of the nav bar and click your mouse, it hides! To unhide it, repress the line that shows up!
- A variable time
  - To utilise it, simply click the song time; you'll then see the whole song time OR the remaining time. (Neither will be displayed at the same time.)
- A blurred backdrop 
  - This corresponds to the album art; whatever is presented will be blurred and mirrored!
  - This includes the 'Profile' drop down, the Right-Click Menu, Hotkeys, and pretty much everything!
  - Fades while skipping - 20px blur (can be increased or decreased)
- Rounded album art covers
  - All album art covers are now 10px rounded!
  - This covers ALL song cover artworks and album cover arts, in other words, EVERYTHING.
- Auto lyric search on Genius 
  - Currently buggy, but now works again!
  - *Guide below*
- Copy track info
  - Select "Copy" when you right-click on a song. 
- Rainbow controls 
  - Affected buttons - Full screen, lyrics, like song, queue, devices, volume, PiP, repeat, and shuffle, if the song is liked or not, right side '...' menu, home, search, my library, dropdown menus, & audio icon on playlists. (Maybe more to come?)
   - 'Liked Songs' love heart now glows to match the bottom controls
    - Added a new line to make all icons in the Now Playing Bar to be rainbow can be helpful when installing another extension alongside SpotOn (Whatever that may be)
- When you hover over something, it now has an animation, is underlined, bolded, and turns a rainbow colour!
  - This corresponds to the rainbow controls mentioned above.
- Removed the Spotify Logo
- Removed 'Install' app 
  - Above album art cover -- In Nav Bar
- Removed podcasts -- Can still be found in 'Your Library'
- Removed 'Upgrade' button in top menu -- Can be found under profile still.
- Removal of the bottom content bar 
  - Which hosts the social links of Spotify
  - And just random unneeded things
- Removed which device Spotify is streaming too
  - Only the bottom bar, as it was unneeded, and had bad visitability.
    - If requested I'll put it back in.  
- The initial letter will be capitalised.
- What I mean is that instead of "I wish [...] without," it will now be "I wish [...] Without" in the lyrics.
- Site-wide excluding songs (those on a playlist or liked tracks, for example) - Try it before you hate it; once you're used to it, it's difficult to go back.
- Misc performance and bugs fixes
  - Skip speeds, shuffle, and repeat have less latency and hotkey access is quicker.
  - Quicker loading times and search times (with SpotOn accessed)
- Increased site wide readability
  - Particularly on lyrics and larger content such as "Liked Songs" or "Lyrics."
- Lyrics
  - Now, the lyrics will be the appropriate size and fit what is being displayed. Smaller words will take up less screen space, while larger lyrics will fill entire the page. Enjoy ❤️ 
  - Lyrics may now be copied (or highlight them — you could not copy lyrics before V 0.5 and below)
- Addition of Hotkeys 
  - (Press 'Shift + ?' to invoke) 
  - Please see the photos below for a list of Hotkeys. (Alternatively, use the aforementioned Hotkey)
  - It's clever; it'll figure out what system you're using and display Hotkeys accordingly.
    - This means that on a Mac, 'command' will appear instead of 'windows,' and vice versa.


- More to come soon! (hopefully...)
- Redoing all the code .... just to make it faster and more pretty... and bug fixes...



***

# What does SpotOn look like?



### Before

![Before](https://user-images.githubusercontent.com/103985728/208671783-99290704-f059-4227-970b-cf7b6f827879.jpeg)



### After
- Note: The right-hand side is with the NavBar hidden!
<img width="600" alt="image" src="https://user-images.githubusercontent.com/103985728/221405571-a04c44b0-5411-472c-9c12-f4d1079bcff2.png">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/103985728/221405634-87b0259b-70e2-42b9-abad-44bebd69db56.png">



***

# Before we go further:
## Some of the photos are with the Nav Bar hidden, this is very simple to do, simply go to the edge of the nav bar and (mouse) click it. Clicking it again unhides the Nav Bar
### Or, here is a video


https://user-images.githubusercontent.com/103985728/221404396-20eecdd2-1221-42b7-9e88-13faa5121f89.mp4




### Dark background
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/103985728/221405693-5f248d6a-7f1f-4f84-bcbb-34f732b1b5a6.png">




### Light background
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/103985728/221405580-01712b12-c8e6-4217-affc-b9e939275120.png">






### Hidden menu bar with remaining time


![Hidden menu bar with remaining time](https://user-images.githubusercontent.com/103985728/196182482-29b0d0f9-750a-4eca-bc9b-012b4537a534.png)



### Hidden menu bar with total time


![Hidden menu bar with total time](https://user-images.githubusercontent.com/103985728/196182656-23e6d4e0-390e-4b9a-b4f6-4d631d4218b8.png)



### How do Lyrics look?
- Note: The right-hand side is with the NavBar hidden!
<img width="600" alt="image" src="https://user-images.githubusercontent.com/103985728/221405724-2f21ce7e-c6c5-4c12-a5a9-5f8a4f8886ee.png">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/103985728/221405731-744e547f-00ff-4373-8aef-c2aeb0fe9869.png">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/103985728/221405759-3d0702df-c8d6-47f5-a4a2-a53a87c054a6.png">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/103985728/221405748-2fdc0ea6-84e1-40f0-8d0c-29ba49ec5c9d.png">


### Profile Menu
- Rainbow
<img width="206" alt="image" src="https://user-images.githubusercontent.com/103985728/221406000-ee773118-a23a-4545-85e8-20aef5a061e4.png">



### Homescreen

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/103985728/221406076-d036cccb-9b33-4927-8576-5c46372aff94.png">



### Full menu
- Note: The right-hand side is with the NavBar hidden!
<img width="600" alt="image" src="https://user-images.githubusercontent.com/103985728/221406289-4e8f5240-37bf-486a-b162-fce1c235a241.png">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/103985728/221406307-2d01a4a6-3cb2-48d9-b538-0ba0a71bb707.png">



### Keyboard Shortcuts
- Rainbow
<img width="407" alt="image" src="https://user-images.githubusercontent.com/103985728/221406223-42db8422-22bc-4a2f-8e77-cbdbf09d2b7f.png">







# SpotOn featues?!



### Now copy track information, Imbedded into Spotify's Menu!


![Imbedded right into Spotify's Menu](https://user-images.githubusercontent.com/103985728/195324014-728d02a2-af67-4051-8582-ae701f3861c9.png)


### A clean copy box shows up!
![A Imbedded box](https://user-images.githubusercontent.com/103985728/195324024-6f64e4ce-c5ce-41e8-945e-614f5bee2145.png)


# Genius integration
##### Note for Genius to work, you might need to add/have an active Genius account. 
- Credit to [Cuzi](https://openuserjs.org/scripts/cuzi/Spotify_Genius_Lyrics) original code adapted from him.

### How do I enable 'No Spotify Lyrics? Then Let's Check Genius!'


### To enable it, simply follow this Step-By-Step guide!
1. Click on Tampermonkey (or any userscript)



![Click on Tampermonkey](https://user-images.githubusercontent.com/103985728/195988967-4ed93961-7b84-4b0c-9938-a2aba8b075f8.png)


2. Click on "No Spotify Lyrics? Then Lets Check Genius! Show Lyrics"


![SCR-20221016-l5](https://user-images.githubusercontent.com/103985728/195988969-c1b47c85-86b1-40ac-8253-f1bb183f2e5d.png)



3. It'll automatically load in, with the current playing song with the lyrics if Genius has it.
      - If it's not auto loaded (1 sec of time) to the next lyrics press 'Wrong Lyrics'
      - It'll bring you back to the search, if neither Genius nor Spotify has the lyrics it'll say "Lyrics not found'
    - Genius integration now auto searches for the song when going to the next song, updated in V 0.5.
     - __NOTE__ Having this open will reduce song loading speed if you have a lot going on in the background
     - To enable this, simply press the 'Hide Lyrics' then reopen the lyrics by pressing the 'G' on the top right. (Pic for ref)


### Picture for reference.
<img width="122" alt="image" src="https://user-images.githubusercontent.com/103985728/221405927-d81eba89-2b07-48aa-a393-cba34a0ab2a1.png">




### Lyrics show to the right of the page
<img width="1000" alt="image" src="https://user-images.githubusercontent.com/103985728/221405828-a6c6f3b9-7dce-42a2-884e-e2885fa100a0.png">



4. To hide the sidebar, either reload, or press 'hide'. 
    - If you reloaded repeat steps 1 & 2 to reenable it.


![SCR-20221016-lj](https://user-images.githubusercontent.com/103985728/195988974-03d14f4d-e4ad-4370-b6d4-c48c7df55089.png)


5.  If you press 'Hide' you'll see a little Genius Button cleanly off to the right
     - If you reloaded repeat steps 1 & 2 for the button to come back.


<img width="122" alt="image" src="https://user-images.githubusercontent.com/103985728/221405927-d81eba89-2b07-48aa-a393-cba34a0ab2a1.png">


# Spotify wide Hotkeys!
### Added in V 0.5.2, this update now has hotkeys for all areas of Spotify.
    - NOTE: The Hotkeys shown are for MAC! They should work for windows simply by pressing Control instead of Command, and Alt instead of Option.



### Keys on Mac VS. Windows

### `⌥ (Option) - (Windows Ctrl)`

### `⌘ (Command) - ( Windows Alt)`





<img width="261" alt="image" src="https://user-images.githubusercontent.com/103985728/207035236-080bd760-6e73-4d83-a7e8-b8950975b589.png">



### Basic Shortcuts


<img width="404" alt="image" src="https://user-images.githubusercontent.com/103985728/207035592-2cb6a113-d0f3-4b40-a6da-457a6349b3d4.png">



### Playback Shortcuts



<img width="350" alt="image" src="https://user-images.githubusercontent.com/103985728/207037875-df89d324-10f0-410f-b5b4-a346743629f9.png">



### Navigation Shortcuts


<img width="232" alt="image" src="https://user-images.githubusercontent.com/103985728/207038077-1232c6a0-d16a-4281-99a7-f3f79c12b233.png">



### Layout Shortcuts


<img width="348" alt="image" src="https://user-images.githubusercontent.com/103985728/207038225-03c84d28-2156-4fd4-9dd4-5ad559788e2f.png">


# Quick Search Bar
- Command = `Command + K`
<img width="600" alt="image" src="https://user-images.githubusercontent.com/103985728/221406653-0620980c-6451-429c-81dc-f2f31e73a40e.png">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/103985728/221406675-573f3f8c-bbfb-4947-83e1-8874c81b856a.png">



### More to come at a later date!!!

