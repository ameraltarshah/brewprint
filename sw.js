// Brewprint offline cache. Bump VERSION whenever any app file changes.
const VERSION = "brewprint-v9";
const KEEP = [VERSION, "brewprint-fonts", "brewprint-ocr"];
const SHELL = ["./", "index.html", "bagparse.js", "library.js", "i18n.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => !KEEP.includes(k)).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Cache-first for files that never change at a given URL (fonts, the pinned text-reader library and its language data).
function cacheFirst(name, req) {
  return caches.open(name).then(async c => {
    const hit = await c.match(req); if (hit) return hit;
    const res = await fetch(req);
    if (res.ok || res.type === "opaque") c.put(req, res.clone());
    return res;
  });
}

self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET") return;
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") { e.respondWith(cacheFirst("brewprint-fonts", req)); return; }
  if (url.hostname === "cdn.jsdelivr.net" && /tesseract/.test(url.pathname)) { e.respondWith(cacheFirst("brewprint-ocr", req)); return; }
  if (url.origin !== location.origin) return;
  // App files: network first so updates arrive, cache when offline.
  e.respondWith(fetch(req).then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; })
    .catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
});
