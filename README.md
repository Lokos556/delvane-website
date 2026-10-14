# Delvane website — cache-busted repair package

This package is based on the exact repository ZIP supplied for debugging. It includes the missing hotel-lobby asset and uses versioned CSS/JS filenames so browsers cannot reuse the older `styles.css` or `script.js` from cache.

## Deploy
1. Replace the repository root contents with every file/folder in this package.
2. Ensure `index.html`, `styles-v3.css`, `script-v3.js`, `_headers`, and `assets/hotel-lobby.webp` are all at the repository root / exact paths shown.
3. Commit to the Cloudflare Pages production branch and wait for the new production deployment.
4. Hard-refresh `delvane.app` with Ctrl+Shift+R.

The hotel background is at `assets/hotel-lobby.webp`. The HTML loads `styles-v3.css` and `script-v3.js` explicitly to bust stale caches.
