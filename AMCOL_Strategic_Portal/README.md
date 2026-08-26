# AMCOL Strategic Portal

An interactive, single-page pitch website presenting AMCOL's supply-partnership proposal to **Massy Wood Ltd.** Dark, dashboard-style interface with tabbed views, animated KPIs, and interactive charts.

## Files

```
AMCOL_Strategic_Portal/
├── index.html        Page structure and all copy/content
├── css/
│   └── styles.css    All styling (dark theme, layout, components)
└── js/
    └── app.js        Tab navigation, count-up animations, charts + tooltips
```

## How to run

It's a static site — no build step, no dependencies to install.

- **Quickest:** double-click `index.html` to open it in your browser.
- **Recommended (so fonts/paths resolve cleanly):** serve the folder locally. From inside the folder run one of:
  - `python3 -m http.server 8000` then open `http://localhost:8000`
  - or, with Node: `npx serve`
- **Host it:** upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, S3, etc.). `index.html` is the entry point.

An internet connection is used only to load Google Fonts (Archivo, Inter, IBM Plex Mono). Everything else is self-contained.

## The six views

`Overview · Capabilities · Fit Analysis · Market Pulse · Partnership · Roadmap` — switched via the top navigation (no page reloads).

## Editing notes

- **Copy** lives in `index.html`.
- **Colors** are CSS variables at the top of `css/styles.css` (`--accent` is the AMCOL orange, `--accent-2` the steel blue).
- **Contact details** are placeholders in the Roadmap view (`[ Contact name ]`, `[ email@amcol.com ]`, etc.) — replace before presenting.
- **Chart data** is in `js/app.js`: the `S` array (regional activity line chart) and the `drivers` array (demand bars). These figures are **directional/illustrative**, not precise forecasts.

## Notes

- Product specifications are drawn from the AMCOL Industrial Catalog 2026.
- Brand and certification marks referenced belong to their respective owners.
- Prepared August 2026.
