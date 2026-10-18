# Delvane AI website — V18

Static multi-page marketing website for Delvane AI.

## What's in this version
- Hungarian copy is editorially rewritten for natural Hungarian rather than translated word-for-word; large split-line headings and scroll-generated story chapters are localized too. Hungarian is the first-visit default; visitors can switch between HU and EN in the header. Their choice is remembered in the browser.
- Updated messaging describes Delvane AI as an autonomous property-operations system: reservations, guest communication, cleaner and maintenance coordination, invoicing and tax administration, plus Hungary's NTAK/VIZA certification.
- Updated all visible brand marks and favicon files to use the supplied geometric gold D icon.
- Mobile-first header, hero, product mockups, workflow art, cards and dashboard layout fixes to avoid collisions and keep scroll motion controlled.
- Separate versioned stylesheet and language script to avoid stale CSS/JS cache collisions; assets use the V18 cache key.

## Deploy to Cloudflare Pages
Upload the **contents of this ZIP** into the root of the GitHub repository, replacing the previous versions of files with matching names. Keep `hotel-lobby.webp`, both favicon files, `site.webmanifest`, and all HTML/CSS/JS files at the repository root. Commit to the production branch and wait for the Cloudflare Pages production deployment to finish.

## Files
- `index.html` — homepage
- `platform.html` — platform and product UI
- `approach.html` — operating model and workflow
- `owners.html` — property owner page
- `delvane-v18-base.css` — main design system
- `delvane-v18.css` — responsive/mobile refinements and language selector
- `delvane-v18.js` — motion, product visuals and interactions
- `delvane-v18-i18n.js` — HU/EN language switching; HU default
- `favicon.png`, `favicon-light.png` — supplied geometric D icon
- `hotel-lobby.webp` — hero atmosphere image
- `_headers`, `site.webmanifest` — static hosting settings

The animation and layout code has been syntax-checked, and HTML asset references have been checked. A complete browser-rendering test was not available in this environment; verify the production deployment on desktop and a real phone before launch.


## V18 — Complete Hungarian copy rewrite
- Versioned assets are now `delvane-v18.css` and `delvane-v18-i18n.js` to avoid stale browser caches.
- Reworked the screenshot-highlighted split headings, animated story chapters, section labels, workflow labels and calls to action.
- Removed the term `vendégélmény` in favor of natural phrasing about guests, attention and daily work.
- This is a copy correction pass, not a claim of full browser QA; verify desktop/mobile and HU/EN before production.


## V18 — Autonomous bilingual rewrite
- Repositioned the website around autonomous property operations, not asking owners to focus on guests.
- Rewrote the English copy independently and authored separate Hungarian copy for the new messaging.
- Explicitly covers channel reservation synchronisation (own website, Booking.com, Airbnb, Szallas.hu), guest and staff communication, cleaner/maintenance coordination, self check-in, NTAK/VIZA reporting, invoicing and tax administration.
- New assets: `delvane-v18.css` and `delvane-v18-i18n.js` to avoid stale cache issues.
- Browser QA is still required before deployment.


## V18 — Autonomous operations copy correction
- Removed the remaining Hungarian and English promises about having more time for guests / focusing on guests, including animated chapter text and chapter navigation labels.
- Replaced them with product-positioning copy about autonomous daily operations and automatic task handling.
- Versioned assets: `delvane-v18.css` and `delvane-v18-i18n.js`.


## V18 — visible copy and cache fix
- Replaced the remaining guest-focus messaging in the source text and localization map.
- Added a Hungarian localization for the English “Less friction. Less manual work.” heading.
- Renamed the animation, localization and CSS assets to V18 and updated all HTML references/cache query strings to prevent old V10/V17 assets from being reused.
- The HTML and animation files should still be visually checked in a browser after deployment.
