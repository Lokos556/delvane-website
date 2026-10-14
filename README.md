# Delvane — cinematic marketing site (v4)

Static HTML/CSS/JavaScript for Cloudflare Pages. No build step is required.

## Deploy
Replace the files in the root of `Lokos556/delvane-website` with the contents of this folder, including the `assets/` directory. Commit to `main`; Cloudflare Pages should deploy automatically. Keep the asset path and folder structure intact.

## What changed in v4
- Added a bespoke, warm cinematic hospitality atmosphere image with a slow ambient drift and animated light-ribbon treatment.
- Rebuilt the product story around a tall scroll track and a sticky full-viewport scene. While the visitor scrolls through the track, the viewport stays on the story and the product views crossfade continuously according to actual scroll progress.
- The story timeline is implemented with native scroll position + requestAnimationFrame, so it does not depend on GSAP or ScrollTrigger loading.
- Mobile and reduced-motion preferences use a natural-flow fallback.
- Dashboard and product concepts are illustrative. Confirm product capabilities before public launch.

## Notes
Google Fonts and the optional Lenis/GSAP scripts load from CDNs. Core product-story motion does not require those CDNs.
