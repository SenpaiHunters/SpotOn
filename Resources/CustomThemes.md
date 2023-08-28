# Adding custom themes to SpotOn
***
For this guide, I will add a theme called `simplify`.

We first need to create a `css` file, there are predefined ones already in `./themes` but do note, they may not be up to date, so only use it as a general guide!

I recommend adding a `:root` and then defining your themes, if you repeat them.

E.G.,
```css
:root {
  --background: #9e9696;
  --header-color: #212121;
  --dialog-border: white;
  --text: #c4c4c4;
  --title: #dad8d8;
  --disabled: #520000;
  --black: black;
  --white: white;
  --watermark-color: black;
}
```
Then we define the `--` values by the `var()` statement.
```html
html {
  background: var(--background);
  color: var(--text);
  font-family: "JetBrains Mono", monospace;
  background-image: var(--background-image);
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-blend-mode: soft-light;
}
```

It's also good practice to note your `css` with `/**/` to explain what it does.

E.G.,
```css
/* Nav bar */
.EZFyDnuQnx5hw78phLqP {
  background-color: transparent !important;
}
```

Okay, now that we have the basics down, let's create the theme!

As I said above, the name will be `simplify`, so let's create `simplify.css`

The `css` file will look something like this:

```css
:root {
  --main-bg: rgba(0, 0, 0, 0.2);
}

.sqKERfoKl4KwrtHqcKOd {
  background-color: var(--main-bg) !important;
  background: var(--main-bg) !important;
  overflow-x: none !important;
}
.BdcvqBAid96FaHAmPYw_ {
  overflow-x: none !important;
}
.ifVI2CEdOZGgMWIUN2Cw {
  background: transparent !important;
  background-color: transparent !important;
}
/* Now Playing bar */
.JG5J9NWJkaUO9fiKECMA {
  background-color: var(--main-bg) !important;
  background: var(--main-bg) !important;
  border-radius: 45px !important;
  min-height: -webkit-fill-available !important;
  height: -webkit-fill-available !important;
  width: -webkit-fill-available !important;
}
/* Now Playing View */
.AzO2ondhaHJntbGy_3_S {
  background-color: transparent !important;
}
/* Nav bar */
.EZFyDnuQnx5hw78phLqP {
  background-color: transparent !important;
}

.deomraqfhIAoSB3SgXpu {
  transform: translateX(28px) !important;
}
/* now playing view */
.OTfMDdomT5S7B5dbYTT8 {
  background-color: var(--main-bg) !important;
  background: var(--main-bg) !important;
  border-radius: 30px !important;
  min-height: -webkit-fill-available !important;
  height: -webkit-fill-available !important;
  width: -webkit-fill-available !important;
}
/* Keyboard shortcuts */
.EhyK_jJzB2PcWXd5lg24 {
  background-color: var(--main-bg) !important;
  background: var(--main-bg) !important;
  border-radius: 30px !important;
}
/* Streaming to device */
#context-menu
  [aria-labelledby="device-picker-icon-button"]:has(
    #device-picker-header [data-testid="animated-now-playing"]
  ),
.aCtCKL9BxAoHeVZS0uRs.bk509U3ZhZc9YBJAmoPB {
  background-color: var(--main-bg) !important;
  background: var(--main-bg) !important;
  border-radius: 35px !important;
}
/* Credits */
.uV8q95GGAb2VDtL3gpYa,
.Nw1INlIyra3LT1JjvoqH,
.pGU_qEtNT1qWKjrRbvan {
  background-color: var(--main-bg) !important;
  background: var(--main-bg) !important;
}
.pGU_qEtNT1qWKjrRbvan {
  border-top-right-radius: 20px !important;
  border-top-left-radius: 20px !important;
}
.Nw1INlIyra3LT1JjvoqH {
  border-bottom-right-radius: 20px !important;
  border-bottom-left-radius: 20px !important;
}
```

Okay! Good, we now have the `css` file, we now need to move this to the `./themes` file

<img width="483" alt="themes file" src="https://github.com/SenpaiHunters/SpotOn/assets/103985728/8783690b-40ca-47e6-9531-5fd7555d8ea8">

Once in the `./themes` folder, we now need to let our `html` know there is a new script!

Locate `options.html`, and open that file

![options](https://github.com/SenpaiHunters/SpotOn/assets/103985728/7b0f3fcd-7f9b-41b0-9cbb-292d868a75aa)

We'll be looking at lines 89 and onward; the original layout should look something like this:
```html
<div class="section">
        <h3 class="subtitle is-4">SpotOn Theme</h3>
        <div class="field">
          <div class="control">
            <div class="select">
              <select id="themeSelector">
                <option value="default.css">Default</option>
                <option value="dracula.css">Dracula</option>
                <option value="amoled.css">Amoled</option>
                <option value="arctheme.css">Arcify</option>
                <option value="purplify.css">Purplify</option>
                <option value="lostnfound.css">City Scape</option>
                <option value="pureBlack.css">Pure Black</option>
                <option value="lofi.css">Lofi Theme</option>
                <!-- MY CPU!!! ↑ -->
              </select>
            </div>
          </div>
        </div>
      </div>
```
This is fine, it defines all the files already, but we just made `simplify`, so we'll need to let the `html` know.
```html
<div class="section">
        <h3 class="subtitle is-4">SpotOn Theme</h3>
        <div class="field">
          <div class="control">
            <div class="select">
              <select id="themeSelector">
                <option value="default.css">Default</option>
                <option value="dracula.css">Dracula</option>
                <option value="amoled.css">Amoled</option>
                <option value="arctheme.css">Arcify</option>
                <option value="purplify.css">Purplify</option>
                <option value="lostnfound.css">City Scape</option>
                <option value="pureBlack.css">Pure Black</option>
                <option value="lofi.css">Lofi Theme</option>
                <!-- MY CPU!!! ↑ -->
                <option value="simplify.css">Simplify</option>
                <!-- Add this line here to tell the html we have a new file ↑ -->
              </select>
            </div>
          </div>
        </div>
      </div>
```

Brilliant, we now have told the `html` we have another script, we next need to reload SpotOn~

To do so, press the highlighted button in the provided image

![reload](https://github.com/SenpaiHunters/SpotOn/assets/103985728/71707797-3239-4404-b2a1-5c4ba7e366a8)

Once you do, reload the Spotify tab (if open), then go to the open SpotOn.

Then navigate to SpotOn Themes and click it

<img width="301" alt="spoton" src="https://github.com/SenpaiHunters/SpotOn/assets/103985728/f88fb151-a32f-4922-9d49-01d57a81275b">

You should now see, `simpilify`!

Press `simpilify`, then below it, press "Save Options". The tab will auto-reload and show you your new theme!

Congrats! You've now added a new theme to SpotOn! Come and share your themes on our [discord](https://discord.gg/9hqVqYDpj3)!

*NOTE: Themes sometimes require SpotOn's toggle to be turned off! Find this on the settings page, and it'll be the first toggle. Go ahead and turn that off if your theme looks off or bad!*
