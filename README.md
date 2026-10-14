# Delvane — cinematic rebuild v4

This package is a complete static Cloudflare Pages site. Upload the contents of this folder directly to the root of the `Lokos556/delvane-website` repository, preserving the `assets/` folder.

## What changed
- The hotel-lobby hero image is bundled locally at `assets/hotel-lobby.webp` and the image layer is explicitly stacked above the hero background so it remains visible behind the copy and product panels.
- The hero's shading is reduced on the right to reveal the lobby, marble, warm lights and architectural details while maintaining legible copy on the left.
- The floating interface constellation responds subtly to pointer movement.
- The story section remains scroll-progress-driven with GSAP/ScrollTrigger when available and a native scroll fallback otherwise. Its cards move progressively as the visitor scrolls; scrolling backward reverses their movement.
- New stylesheet and script filenames (`styles-v4.css`, `script-v4.js`) avoid reusing cached v3 files.

## Deploy
Upload `index.html`, `styles-v4.css`, `script-v4.js`, `_headers`, and the entire `assets` folder to the repository root. Commit to the production branch and wait for the Pages production deployment.

## Validation notes
The JavaScript syntax was checked locally. Do not treat this README as proof of a live deployment; verify the production site in a browser after deploying.
