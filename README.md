# Delvane V6 — inline image asset fix

This package embeds the hotel WebP directly into the HTML and CSS as a data URI. It no longer depends on Cloudflare Pages correctly resolving `/assets/hotel-lobby.webp`, which the previous Network screenshot showed was returning HTML instead of an image.

Upload these files to the GitHub Pages repository root together: `index.html`, `styles-v6.css`, `script-v6.js`, `_headers`, and the `assets/` folder. Commit and wait for the production deployment.

Validation: confirmed that the HTML and CSS contain the embedded WebP data URI, so the hero and manifesto do not need a separate hotel image request. JavaScript syntax check passed. The final browser rendering has not been verified in this environment.
