# Brewprint

Coffee recipes built for your beans, taste and brewer. Installable phone app (PWA), free, works offline.

- `index.html`: the app (recipe engine, timer, saved recipes)
- `bagparse.js`: reads coffee details from bag text (English and Arabic)
- `sw.js`: offline cache. Bump `VERSION` whenever a file changes.
- `manifest.webmanifest`, `icons/`: home-screen install

Hosting: Netlify, no build step, publish directory is the repository root.
