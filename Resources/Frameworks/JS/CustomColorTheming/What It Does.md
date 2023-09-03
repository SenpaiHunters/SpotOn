Simply allow for custom coloring on your extension page (popup) via user input, it then saves to storage.

To get it to work:

We'll first need the contents of `settingsColor.js`, put that into a script, and then go to your HTML

```html
 
        <div class="customColor">
          <!---  Color Picker Input  --->
          <input type="color" id="color-picker" value="#ffffff" />

          <!---  Manual Color Input  --->
          <input
            type="text"
            id="manual-color-input"
            placeholder="Enter color value"
          />
          <button id="apply-manual-color">Apply</button>

          <!---  Clear Background Button  --->
          <button id="clear-background">Clear Background</button>
        </div>
```

Adding those lines to your HTML will then allow you to either use the color picker or a custom theme (HEX/RGB etc)

Of course, you'll need to refer it in your HTML
```html
<script src="js/settings/settingsColor.js"></script>
```

Then in your active `CSS` you'll need to declare the elements you want colored with `--theme-color` and `--opposite-color`
```css
[data-theme="light"] {
  --background: var(--theme-color);
  --header-color: var(--opposite-color);
}

[data-theme="dark"] {
  --background: var(--theme-color);
  --header-color: var(--opposite-color);
}
```

Then you are done, and it can look very bad depending on the users color, but here is a reference.

<img width="1552" alt="CustomColor" src="https://github.com/SenpaiHunters/SpotOn/assets/103985728/d3cacd2d-a71f-47fb-830f-045e270cda63">
