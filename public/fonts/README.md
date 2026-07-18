# Font Folder — Gerbil

## How to install the Gerbil font

1. Go to: **https://befonts.com/gerbil-font.html**
2. Click the **Download** button
3. Unzip the downloaded file
4. Find the `.otf` or `.ttf` file inside (usually named something like `Gerbil.otf`)
5. **Rename it exactly to:** `Gerbil-Regular.otf`
6. **Paste it into this folder** (`public/fonts/`)
7. Save — the font loads automatically! No other code changes needed.

## Why does this work?

In `src/styles/index.css` we wrote:
```css
@font-face {
  font-family: 'Gerbil';
  src: url('/fonts/Gerbil-Regular.otf') format('opentype');
}
```

And in `--font-display: 'Gerbil', 'Space Grotesk', sans-serif;`

So the browser: tries Gerbil → if missing, uses Space Grotesk → if missing, uses any sans-serif.
Once you drop the file here, it picks Gerbil automatically.
