# Delvane V10 — product story and distinct graphics

Static Cloudflare Pages site. Upload these files to the repository root and replace matching files.

## Files
- `index.html`, `platform.html`, `approach.html`, `owners.html` — four pages with page-specific product explanations.
- `delvane-v9.css`, `delvane-v9.js` — shared styles and motion controller (kept on the v9 filenames referenced by the HTML to avoid creating competing versions).
- `hotel-lobby.webp` — homepage/brand atmosphere image. The approach and platform pages use separate custom diagrams, not copies of this image or the homepage's floating-card composition.
- `favicon.png` — the supplied dark-background Delvane icon for browser tabs.
- `favicon-light.png` — the supplied white-background Delvane icon for Apple home-screen use.
- `_headers` — static security/cache headers.

## Content notes
The pages explain reservations, guest-message context, preparation/housekeeping hand-offs, daily operations, and the intended relationship between them. Copy explicitly notes that channel integrations and automation depend on setup and rollout stage; do not market unreleased integrations as already live.

## Deploy
Upload all files from this folder into the GitHub repository root, replacing files with matching names, and commit to `main`. Keep `hotel-lobby.webp`, `favicon.png`, and `favicon-light.png` at the root.
