# Brewprint

Coffee recipes built for your beans, taste and brewer. Installable phone app (PWA), free, works offline.

- `index.html`: the app (recipe engine, timer, saved recipes)
- `bagparse.js`: reads coffee details from bag text (English and Arabic)
- `library.js`: famous recipes with English and Arabic text (add or edit entries here)
- `i18n.js`: Arabic translations for the app (English text on the left, Arabic on the right)
- `sw.js`: offline cache. Bump `VERSION` whenever a file changes.
- `manifest.webmanifest`, `icons/`: home-screen install

Hosting: Netlify, no build step, publish directory is the repository root.
