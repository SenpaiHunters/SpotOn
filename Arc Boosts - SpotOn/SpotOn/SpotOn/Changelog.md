# Release V1 Full Changelog and Feature List

### Quick look:

![SCR-20230612-bqva](https://github.com/SenpaiHunters/SpotOn/assets/103985728/9f279630-c4c9-4a09-87bf-2b7a9fb3d919)

## Features (New and Improved)

- Added new toggle options (in beta)
- It's now super easy to edit SpotOn to your tastes without needing knowledge in `css` or `js`~
  - See customisation below
- Reduced code size from 413kb to 268kb, resulting in a decrease of 35.12%
- Introduced inbuilt SpotOn Righter, which can be toggled on/off (only inside `js` for now)
- Reduced image sizes for improved performance
- Revamped `popup.html` and added a new popup design
- Restructured and reformatted code, removing unnecessary parts
- Moved the streaming to devices bar inside the Now Playing Bar
- Redesigned the Hotkeys panel
- Redid the design of artist page
  - Small visual changes, scrolling hides the artists cover etc
- Enhanced `toggle.js` code
- Temporarily removed the scrollbar
- Removed borders on multiple elements
  - Quick search (`command + k`) and been improved now
- Animations now play smoother
- Hovering looks better, with a smooth fade in
- Subtext for songs, like albums are now a sorta grey color, looks better now
- Added additional customisation options to tailor SpotOn to individual preferences

  - Note: Toggles will be added in the future (visible but non-functional), for now, customisation requires editing `SpotOnMain.js`
  - Customisation options include:

- Nav bar & Now playing bar customisation:

  - `--now-playing-color:`
  - `--nav-bar-color:`
  - `--bg-img:`
  - `--song-color: white;`
  - `--album-art:`

- Hiders:

  - `--hide-song-date:`
  - `--hide-song-numbering:`
  - `--hide-song-dura:`
  - `--hide-song-album:`
  - `--hide-song-heart:`
  - `--hide-top-infbar:`
  - `--hide-profile-icon:`

- Lyrics:

  - `--lyrics-color:`
  - `--lyrics-font-size:`

- Progress bar settings:

  - `--progress-bar--background-color:`
  - `--progress-bar-dot-color:`
  - `--playback-duration-color:`

- And more to come in future updates

## Change Log

- Significantly improved SpotOn script load times from around 5 seconds to 2 seconds
- Removed unused `style.css`, transferring necessary parts to other files
- Fixed the `toggle` button inside `popup.html`
- Completely overhauled SpotOn code, resulting in a 35.12% decrease in size
- Resolved numerous bugs and glitches
- Enhanced the speed of `toggle.js`
- Implemented folder organisation to improve code maintenance
- Rectified spacing issues in `toggle.js`
- Addressed memory usage overload and optimised resource usage
- Fully eliminated the `function` node for extra SpotOn CSS
- Fixed rainbow controls to properly apply effects to items like the library button
- Resolved issues with 4k monitor support
- Fixed overscroll problem (again)
  - Fixed another infinite scroll issue (this was pretty fun, I could scroll forever!)
- Corrected problems with lyric auto-scrolling
- Resolved an issue in `manifest.json` that caused installation difficulties for some users
- Fixed the footer display issue
- Eliminated instances of the Spotify logo reappearing
- Ensured proper hiding of the install app button
- Corrected multiple spacing issues
- Improved skipping times and overall hotkey speed
  - For maximum speed (approximately 2 seconds faster), removing the rainbow controls is recommended
- Fixed homepage functionality
- Addressed multiple spelling errors and code-related issues
- Fixed font and spacing issue on song art, and other large areas
- Fixed multiple hovering issues
- Fixed numbering on songs
- Fixed the play/pause icon's uglyness
- Fixed a bug with the new UI where SpotOn wouldn't work

# TLDR:

Fixed a lot, added a lot, Improved a lot, sleep now
