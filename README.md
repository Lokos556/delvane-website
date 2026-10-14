# Delvane cinematic rebuild — V5 image visibility fix

This is a complete static Cloudflare Pages root package. Upload these files directly to the repository root, including `assets/hotel-lobby.webp`.

## What changed
- The hero hotel scene is now a real `<img>` element instead of a CSS background. This makes its network request visible in DevTools and reduces ambiguity about whether the asset is loading.
- The image is explicitly sized with `object-fit: cover`, brighter, and has a less opaque right-side shade so the lobby should be clearly visible behind the product panels.
- Styles and script use new filenames (`styles-v5.css`, `script-v5.js`) to avoid stale v4 cache.
- Existing responsive layout and scroll story are retained.

After deploying, Network should show `styles-v5.css`, `script-v5.js`, and `assets/hotel-lobby.webp` all returning 200.
