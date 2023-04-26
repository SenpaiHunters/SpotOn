# Fonts
1. https://fonts.google.com/
2. https://www.dafont.com/
3. https://www.1001fonts.com/
4. https://www.myfonts.com/
5. https://elements.envato.com/fonts


(I only use fonts.google and will not be held responsible if you download a file you shouldn't)

Once you have picked a font, to make it work you'll need to create a folder in your extension/boost labelled `fonts`

## Guide
(for this I will use `Akronim` font, which can be found in fonts.google)

1. Download the Akronim font files from Google Fonts.

2. Save the downloaded files to a folder in your extension directory. For example, you can create a folder called "fonts" and save the files there.

3. In your `manifest.json file`, add the following line to the root of your file:
```
"web_accessible_resources": [
   "fonts/*"
]
```
4. In the `CSS` file, replace the ***src*** property with the following:
```
src: url(chrome-extension://[EXTENSION_ID]/fonts/Akronim-Regular.ttf);
```
5. Replace [EXTENSION_ID] with your extension's ID.

For example:

```
@font-face {
   font-family: 'Akronim';
   src: url(chrome-extension://abcdefgabcdefg/fonts/Akronim-Regular.ttf);
}

h1, h2, .link-subtle {
   font-family: 'Akronim', cursive !important;
   font-weight: normal !important;
}

body {
   font-family: 'Akronim', cursive !important!;;
}
```
This will import the font into your CSS file using the URL of the font file in your extension's folder.

Note: Make sure that the font files are in a format that is compatible with the web, such as .ttf or .woff.



## If that doesn't work then another way is:

Your `manifest.json` should look like this:
```
{
  "update_url": "https://github.com/SenpaiHunters/SpotOn/blob/Main/SpotOn%20V0.7.js",
  "name": "SpotOn",
  "description": "A Spotify Overhaul",
  "version": "0.7",
  "icons": {
    "64": "icons/icon64.png"
  },
  "manifest_version": 2,
  "web_accessible_resources": [
     "fonts/*"
  ],
  "content_scripts": [
    {
      "matches": [
        "https://open.spotify.com/*",
        "http://*.open.spotify.com/*",
        "https://open.spotify.com/*",
        "https://genius.com/songs/new"
      ],
      "js": [
        "SpotOn.js"
      ],
      "action": {
        "popup.css": "popup.html",
        "default_icon": {
          "64": "icons/icon64.png"
        }
      }
    }
  ]
}
```
Then in your `css`, it should be labelled as:
```
@font-face {
  font-family: 'Akronim';
  src: url('fonts/Akronim.woff2') format('woff2');
}
```

I will release a video if requested:
