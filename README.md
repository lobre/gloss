# Gloss

Gloss is a minimal tool to handcraft color palettes with precision. It helps you design and fine-tune individual colors while ensuring consistency and harmony across a full palette. Gloss offers fine-grained HSL control, smart multi-selection behavior, and built-in contrast checking for accessibility.

## 🖼 Interface Overview

Gloss is composed of four main zones:

- **Canvas (left)** — your main workspace where you create and organize color tiles.
- **Sidebar (right)** — a color picker and metadata editor for selected tiles.
- **Topbar (top)** — general controls: canvas background, reset, export, and share.
- **Bottombar (bottom)** — contrast ratio checker for accessibility.

## 🎨 Canvas Basics

- Right-click on empty space to create a new tile with a random color.
- Left-click and drag a tile to move it freely around the canvas.
- Left-click a tile to select it and open it in the sidebar for editing.

## 🎛 Sidebar: Single Color Editing

When a tile is selected:

- The color picker allows precise editing using HSL:
  - Hue & saturation via the wheel
  - Lightness via the slider
- You can also input values directly in hex, h, s, or l fields.
- Click the preview tile to copy the current color's hex value to the clipboard.
- The tile's label and description can be edited below the picker.

In the wheel:
- Hold `Ctrl` to lock saturation while moving markers.
- Hold `Shift` to lock hue.

You can also switch to okHSL mode using the toolbar toggle. okHSL is a perceptually uniform color space that preserves consistent visual lightness, which can be useful when designing with contrast in mind.

## 🧩 Multiple Selection & Group Editing

You can edit multiple tiles at once:
- `Ctrl`+Click to add or remove tiles from a selection.
- Click and drag to draw a selection box.
- `Ctrl`+Right-click on empty space to create a new tile inside the current selection.

When multiple tiles are selected, a virtual group is formed. The picker enforces a shared constraint across the selection:
- Wheel mode: all colors share the same lightness.
- Slider mode: all colors share the same hue and saturation.

The mode is automatically selected based on the current colors but can be changed manually via the toolbar.

If the selected colors don't satisfy the required constraint, a normalization dialog will offer to adapt them so they can be edited together.

While in group mode:
- You'll see multiple markers on the wheel or slider, depending on the mode.
- Use the spread controls to evenly distribute the selection by:
  - Hue
  - Saturation
  - Lightness
- Changes to label or description will apply to all selected tiles.

## 📏 Contrast Checker

Located in the bottom bar:
- If one tile is selected, contrast is calculated against the canvas background.
- If two tiles are selected, contrast is calculated between them.
- If more than two, the checker is hidden.
- You can manually pick a second color for comparison by right-clicking another tile while one is selected.

Contrast levels are evaluated using WCAG AA and AAA standards.

## 📤 Export & Share

Gloss provides two ways to save or share your palette:
- **Export**: Save the palette as a JSON file containing each tile's hex value, label, and description.
- **Copy URL**: Generate a shareable link encoding the full canvas state.
  > Note: long palettes will result in long URLs, which may not be supported by all browsers.

## Local Development

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

To deploy to GitHub Pages:

```bash
pnpm release
```

This will automatically build the project and deploy it to GitHub Pages. The app will be available at `https://lobre.github.io/gloss/`

## License

This project is licensed under the MIT License.
