# Delvane marketing website — V10.1 layout and brand fix

Static multi-page marketing site for Cloudflare Pages.

## Files
- `index.html` — homepage and main product story
- `platform.html` — product areas and software UI examples
- `approach.html` — before/during/after guest journey
- `owners.html` — owner workflows and example workday
- `delvane-v10.css` / `delvane-v10.js` — uniquely named shared assets to avoid stale cached V9 files
- `favicon.png` — user-provided Delvane icon used for favicon and all in-site brand marks
- `favicon-light.png` — same supplied icon used for Apple touch icon
- `hotel-lobby.webp` — homepage hero image
- `site.webmanifest` — browser icon metadata

## Deploy
Replace the files in the repository root with the contents of this ZIP and commit to the configured Cloudflare Pages production branch. The new V10 asset filenames are intentional cache-busters. After deployment, do a hard refresh (Ctrl+Shift+R) once.

The website uses GSAP/ScrollTrigger from a CDN for optional motion. Content remains visible if those scripts do not load; reduced-motion preferences are respected.
