# SpotOn

Enhance your Spotify Web Player experience with SpotOn. A complete UX/UI overhaul!

---

# DEPRECATED

As of **5 January 2026**, SpotOn is officially deprecated and will no longer be updated or maintained. In addition, the SpotOn extension has been removed from the web store from today onwards and is no longer available for new installs.

Over the years, I have been the sole developer of SpotOn. During that time, the extension reached around 401 users. While I’m grateful for everyone who tried and used it, growth remained limited, and the project never quite reached the momentum needed to justify ongoing maintenance.

SpotOn began as a personal project, where I fixed issues when I could reproduce them in my own setup. However, recent changes to the Spotify web player have introduced frequent breaking updates, making it increasingly time‑consuming to keep everything working. Combined with slower feature releases from Spotify and a generally declining web experience, the effort required to maintain the extension stopped being sustainable for a one‑person project.

With no growth and me as the only maintainer, I’ve decided to shift my focus to other work, particularly apps and personal websites. If you’d like to see what I’m currently building, you can visit my site at [Kamidevs](https://kamidevs) and explore projects I’m involved in, such as [Loop](https://loop.kamidevs.com).

All existing code for SpotOn will remain publicly available. If you’re interested in forking the project or taking it over, you’re very welcome to reach out via Discord at [Kami](https://discord.com/users/325178652033679362).

If you’d like to support my ongoing work, you can do so via  

- [GitHub Sponsors](https://github.com/sponsors/SenpaiHunters)  
- [Buy Me A Coffee](https://www.buymeacoffee.com/kami.dev)

Thank you to everyone who installed, used, or gave feedback on SpotOn.

---

## Stats

Now for some fun SpotOn stats!

- Total options count: 61 toggles + additional custom settings.
- SpotOn load times: 0.3 ms (lowest 0.1 ms/0.6 ms).
- Totalized SpotOn extension size: 193 KB.
- First screenshot(s): October 2, 2022.
- Original userscript size: 800 KB (single use).
- First extension release date: May 14, 2023.
- Initial extension size: 574 KB.

<h6 align="center">
 <a href="https://chrome.google.com/webstore/detail/spoton/hnbcgkmojpjmncmplcnefjnmcbckadff?hl=en&authuser=0">
        <img src="https://img.shields.io/chrome-web-store/v/hnbcgkmojpjmncmplcnefjnmcbckadff?label=Issues&color=FEE75C&style=for-the-badge&labelColor=23272A" alt="Chrome Web Store" />
    </a>
    <a href="https://github.com/SenpaiHunters/SpotOn">
        <img src="https://img.shields.io/github/stars/SenpaiHunters/SpotOn?label=Issues&color=FEE75C&style=for-the-badge&labelColor=23272A" alt="GitHub Stars" />
    </a>
    <a href="https://github.com/SenpaiHunters/SpotOn/issues">
        <img src="https://img.shields.io/github/issues/SenpaiHunters/SpotOn?label=Issues&color=FEE75C&style=for-the-badge&labelColor=23272A" alt="GitHub Issues" />
    </a>
    <a href="https://github.com/SenpaiHunters/SpotOn/releases">
        <img src="https://img.shields.io/github/v/release/SenpaiHunters/SpotOn?label=Issues&color=FEE75C&style=for-the-badge&labelColor=23272A" alt="GitHub Release" />
    </a>
    <a href="https://github.com/SenpaiHunters/SpotOn/blob/Main/CONTRIBUTING.md">
        <img src="https://img.shields.io/github/contributors/SenpaiHunters/SpotOn?label=Issues&color=FEE75C&style=for-the-badge&labelColor=23272A" alt="GitHub Contributors" />
    </a>
    <a href="https://github.com/SenpaiHunters/SpotOn/watchers">
        <img src="https://img.shields.io/github/watchers/SenpaiHunters/SpotOn?label=Issues&color=FEE75C&style=for-the-badge&labelColor=23272A" alt="GitHub Watchers" />
    </a>
    <a href="https://github.com/SenpaiHunters/SpotOn/forks">
        <img src="https://img.shields.io/github/forks/SenpaiHunters/SpotOn?label=Issues&color=FEE75C&style=for-the-badge&labelColor=23272A" alt="GitHub Forks" />
    </a>
    <a href="https://github.com/SenpaiHunters/SpotOn/commits">
        <img src="https://img.shields.io/github/last-commit/SenpaiHunters/SpotOn?label=Issues&color=FEE75C&style=for-the-badge&labelColor=23272A" alt="Last Commit" />
    </a>
    <a href="https://github.com/SenpaiHunters/SpotOn/releases">
        <img src="https://img.shields.io/github/downloads/SenpaiHunters/SpotOn/total?label=Issues&color=FEE75C&style=for-the-badge&labelColor=23272A" alt="GitHub all releases" />
    </a>
    <a href="https://github.com/SenpaiHunters/SpotOn/releases">
        <img src="https://img.shields.io/github/languages/code-size/SenpaiHunters/SpotOn?label=Issues&color=FEE75C&style=for-the-badge&labelColor=23272A" alt="GitHub code size in bytes" />
    </a>
</h6>

<br>

---

## SpotOn Pics

### How does SpotOn Look?

| ![Spot 1](Resources/images/spot1.png) | ![Spot 2](Resources/images/spot4.png) | ![Spot 3](Resources/images/spot2.png) |
| ------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Spot 4](Resources/images/spot3.png) | ![Spot 5](Resources/images/spot5.png) | ![Spot](Resources/images/spoton.png)  |

### Settings

| Settings main view                      | CSS section / Sidebar & Lyrics Coloring | Settings (top right cog)                |
| --------------------------------------- | --------------------------------------- | --------------------------------------- |
| ![set1](Resources/images/settings1.png) | ![set2](Resources/images/settings2.png) | ![set3](Resources/images/settings3.png) |

---

## Features

**TL;DR:** SpotOn enhances your Spotify experience with 61 customizable toggles, allowing for a personalized UI including full custom CSS support, simple color changes without coding, and import/export functionality. Or enjoy your album art being your background!

<br>

d. Hotkeys
SpotOn comes with full customisable hotkeys, Play/Pause and Skip/Reverse with your Media Keys! All changeable at `chrome://extensions/shortcuts`

| Name                   | Hotkey               | Defaults |
| ---------------------- | -------------------- | -------- |
| Activate the extension | N/A                  | N/A      |
| Like/Dislike           | ⌘⇧B                  | N/A      |
| Next Track             | Media Next Track     | Yes      |
| Play/Pause             | Media Play/Pause     | Yes      |
| Previous Track         | Media Previous Track | Yes      |
| Toggle Repeat          | ⌥R                   | N/A      |
| Seek Backward          | N/A                  | N/A      |
| Seek Forward           | N/A                  | N/A      |
| Toggle Shuffle         | ⌥S                   | N/A      |
| Volume Down            | N/A                  | N/A      |
| Toggle Mute            | N/A                  | N/A      |
| Volume Up              | N/A                  | N/A      |

What I mean by "hotkey" are suggested and used hotkeys (those used by me). The only three set by default and cannot be reset (if changed) are the media keys, which can be made global (works outside of the browser) or only inside the browser.

For more information on how to create a custom hotkey, it's pretty simple: click the hotkey box, then on your keyboard, press the combination you want. Let go, and voilà! If there are no conflicts, you'll see that your keybind is ready to use! The keen-eyed among you might have noticed that the list includes macOS keybinds. However, this doesn't matter as Chrome will detect your system and adjust accordingly. (This repository won't; I use a Mac, so there will be Mac keybinds :0)

---

## Install Guide

The Chrome extension store lags in releases because Chrome's review process can take up to a month. Changes should go live within a few hours ideally. If you install from the source and seek quicker updates than Chrome's Web Store, go for it!

### Install from Chrome Web Store

1. **Install SpotOn Extension:**
   - Visit [Chrome Web Store](https://chromewebstore.google.com/detail/spoton/hnbcgkmojpjmncmplcnefjnmcbckadff?hl)
   - Click "Add to Chrome" and review the permissions required.
   - Proceed by clicking "Add Extension."

2. **Get Started with SpotOn:**
   - Load Spotify or open a new tab and modify SpotOn settings as needed.

### Permissions Explained

When installing SpotOn (from the chrome web store), you'll be prompted to grant certain permissions. Here's why they are necessary:

- **Read and Change Your Data on open.spotify.com**:
  - **Purpose**: This permission allows SpotOn to modify the Spotify Web Player's user interface and functionality to provide the features and customizations that SpotOn offers. It's essential for applying visual themes, toggles, and other enhancements directly within your Spotify experience.
  - **Privacy**: We only modify the client-side presentation and functionality. No modifications are made to the data you send to or receive from Spotify's servers. Your Spotify data remains private and secure.

- **Read Your Browsing History**:
  - **Purpose**: This might sound more invasive than it is. In reality, SpotOn uses this permission to identify when you have Spotify open in your browser so it can apply the necessary enhancements without you having to do anything extra. By enhancements, this can be the use of a hotkey to open Spotify or anything that requires the extension to locate Spotify. It's used to streamline the process of detecting and interacting with Spotify web pages.
  - **Privacy**: SpotOn does not track, store, or transmit your browsing history. The extension operates entirely locally on your computer, and this permission is solely for recognizing Spotify web pages to function correctly. Your browsing history remains private and is not accessed for any other purpose.

SpotOn is committed to full transparency and privacy. Being an open-source project, we invite everyone to explore our codebase to see exactly how it functions and ensures user privacy. We encourage a deeper look into our practices and the mechanics behind SpotOn by visiting our repository. For more insights into our approach to privacy and the principles guiding our development, please check out our [License](/license.md) and [Privacy Policy](Private%20Policy.md).

### Install from Source

1. **Clone the Source Repository:**
   - Clone via terminal: `gh repo clone SenpaiHunters/SpotOn` or `git clone https://github.com/SenpaiHunters/SpotOn.git`
   - Alternatively, download the source as a ZIP file from the repository.

2. **Set Up the Extension in Chrome:**
   - Access `chrome://extensions` in your browser.
   - Enable developer mode (top right toggle).
   - Select "Load Unpacked" and navigate to the `SpotOn/SpotOn` folder.
   - Confirm by pressing `enter` or `return` on your keyboard, and customize SpotOn settings as required.

## Contributing

SpotOn thrives on community contributions! Whether it's submitting bug reports, feature requests, or contributing to the code, check out our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get involved.

## License

SpotOn is released under the [MIT (Modified) License](/LICENSE) by [@senpaihunters](https://github.com/senpaihunters). See the [LICENSE](license.md) file for more details.

## Contact

For support or inquiries, reach out to me via discord at [Kami](https://discord.com/users/325178652033679362).

## Sponsoring

[Buy me a coffee](https://buymeacoffee.com/kami.dev) or [Github Sponsor](https://github.com/sponsors/SenpaiHunters)
