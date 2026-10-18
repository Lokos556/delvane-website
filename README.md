# Delvane AI website — V14

Static multi-page marketing website for Delvane AI.

## What's in this version
- Hungarian copy is editorially rewritten for natural Hungarian rather than translated word-for-word; large split-line headings and scroll-generated story chapters are localized too. Hungarian is the first-visit default; visitors can switch between HU and EN in the header. Their choice is remembered in the browser.
- Updated messaging describes Delvane AI as an autonomous property-operations system: reservations, guest communication, cleaner and maintenance coordination, invoicing and tax administration, plus Hungary's NTAK/VIZA certification.
- Updated all visible brand marks and favicon files to use the supplied geometric gold D icon.
- Mobile-first header, hero, product mockups, workflow art, cards and dashboard layout fixes to avoid collisions and keep scroll motion controlled.
- Separate versioned stylesheet and language script to avoid stale CSS/JS cache collisions; assets use the V14 cache key.

## Deploy to Cloudflare Pages
Upload the **contents of this ZIP** into the root of the GitHub repository, replacing the previous versions of files with matching names. Keep `hotel-lobby.webp`, both favicon files, `site.webmanifest`, and all HTML/CSS/JS files at the repository root. Commit to the production branch and wait for the Cloudflare Pages production deployment to finish.

## Files
- `index.html` — homepage
- `platform.html` — platform and product UI
- `approach.html` — operating model and workflow
- `owners.html` — property owner page
- `delvane-v10.css` — main design system
- `delvane-v14.css` — responsive/mobile refinements and language selector
- `delvane-v10.js` — motion, product visuals and interactions
- `delvane-v14-i18n.js` — HU/EN language switching; HU default
- `favicon.png`, `favicon-light.png` — supplied geometric D icon
- `hotel-lobby.webp` — hero atmosphere image
- `_headers`, `site.webmanifest` — static hosting settings

The animation and layout code has been syntax-checked, and HTML asset references have been checked. A complete browser-rendering test was not available in this environment; verify the production deployment on desktop and a real phone before launch.


## V14 — Complete Hungarian copy rewrite
- Versioned assets are now `delvane-v14.css` and `delvane-v14-i18n.js` to avoid stale browser caches.
- Reworked the screenshot-highlighted split headings, animated story chapters, section labels, workflow labels and calls to action.
- Removed the term `vendégélmény` in favor of natural phrasing about guests, attention and daily work.
- This is a copy correction pass, not a claim of full browser QA; verify desktop/mobile and HU/EN before production.
