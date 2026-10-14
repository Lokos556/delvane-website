# Delvane — V7 cinematic multi-page release

This release expands the single-page prototype into a small static site:
- `index.html` — cinematic homepage with shader gradient, oversized kinetic typography, product story and a distinctive closing invitation
- `platform.html` — platform overview
- `approach.html` — product philosophy and workflow
- `owners.html` — page for property owners and small teams
- `styles.css` — shared design system and responsive styling
- `script.js` — WebGL shader gradient with CSS fallback, pointer response, reveal behavior and motion handling
- `_headers` — Cloudflare Pages headers

Upload all files directly to the repository root and commit them together. The shader is implemented locally in WebGL and does not require a separate shader service. GSAP/ScrollTrigger remain CDN dependencies for the scroll-story timeline; the site retains a native fallback if those libraries fail to load.

This package has been checked for HTML file references and JavaScript syntax, but should still be tested in a real browser after deployment, especially the pinned scroll story on desktop and the reduced-motion/mobile layouts.
