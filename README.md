# **SpotOn *[V 0.3]***
##### The Spotify Overhaul!
### Made by ***Kami***
<details><summary>Socials and support</summary>
<p>

##### Support via Discord - https://discord.gg/pjNn2M22ct
##### Help Support Me -  https://www.buymeacoffee.com/KamiAMVS
</p>
</details>


##### Spotify - SpotOn
![Spotify - SpotOn](https://user-images.githubusercontent.com/103985728/195014667-f55ea9f3-7fc2-4097-a835-9cbccbe42992.jpeg)
##### Hidden menu bar with remaining time
![Hidden menu bar with remaining time](https://user-images.githubusercontent.com/103985728/195015082-d31a1ecf-1df0-4a8f-8051-c78f0bfef0a9.png)
##### Hidden menu bar with total time
![Hidden menu bar with total time](https://user-images.githubusercontent.com/103985728/195015092-5f12509b-b312-4884-b179-35a3c4f7d064.png)


# What is SpotOn?


SpotOn is a complete overhaul of [Spotify Web Player's](https://open.spotify.com/) design that includes a customisable new font, a bolded/more prominent menu bar, a redesigned __hidden__ Now Playing Bar __(scroll down to see it, want to see how it looks, look above)__, a changeable time to the right of the progress bar __(Refer to the above image to see this, to envoke it, simply click it)__, a blured backdrop, ___rainbow controls___ __(These can be turned off simply by removing the command line)__ a hidden Spotify Logo __(Can be turned back on)__, removal of the bottom content bar, that hosts the social links of Spotify. Captialsation of the first letter _(can turn off by removing ___first-letter {", "    text-transform: uppercase !important;}",___. But try it before you remove it, you might like it!)_



# How do i use SpotOn?


SpotOn needs the usage of Spotify Web Player and is not supported by Spotify's app. To be clear, only Spotify Web Player supports it. 
This is incompatible with the installed app. If i get enough popularity i may look into a way of porting it to the app. But, that's very
unlikely, and very time consuming. 


# SpotOn's supported platfroms?


SpotOn is a complete **userscript/javascript**, which means you, the user, may _customise_ anything! The majority of the script is labelled with **// (entry)** or **"*/*/",** but not all of it. You'll need to Command + F (Find) some of these by typing the name out; I'm currently going over this and adding entries to the script.


Chrome -  ✅


Firefox -  ✅


Orion -  ✅*


Safari - ❌



* = Slower performance than chrome based web browsing; as it uses an open-sourced safari code. (Safari with extensions)

✅ = Supportation of __Windows + Mac__ , there are no required system requirements as it’s simply a userscript/javascript, 
however, low-end hardware may face some performance drops or lower than expected speed


❌ = Safari does not allow for the user of Javascript/Userscripts

# Install 
1. Install [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/get-it/) or [Greasemonkey](https://addons.mozilla.org/en-GB/firefox/addon/greasemonkey/)
2. Copy the [Code V3](https://github.com/SenpaiHunters/SpotOn/blob/17c1e80474aa0a969558c83eec151501737aa2fd/Code%20V3) contents
3. Load the settings of Tampermoneky
   - First by clicking on the extention
   - Click 'Dashboard'
4. You'll first load into 'Installed-Scripts'
5. You then want to click the little plus icon
6. With the contents of [Code V3](https://github.com/SenpaiHunters/SpotOn/blob/17c1e80474aa0a969558c83eec151501737aa2fd/Code%20V3)
7. You'll want to press ___Command+A___ to select everything, and then press ___Command+V___ to paste
8. Hit ___Command+S___ to save
9. You have now successfully installed SpotOn!
  - __(Note)__ For windows the keybind is ___Cntrl___ instead of ___Command___
  
  
# Notice
It is recommended you install [Spotify Dynamic Theme Plus extension](https://chrome.google.com/webstore/detail/spotify-dynamic-theme-plu/bhonlncoengmlbidemffnajjlaijkemm) for the background, and now playing bar to function correctly. The Dynamic Theme is also required for the Now Playing Bar to auto-hide. If it isn’t installed, the bar will load at the top by __default__. _(This can be changed in settings, as the script is fully user customisable! - look for ‘//  main now playing bar’)._
