# Delvane V9 — visual and product UI fix

Upload these files to the repository root and replace files with matching names. This version uses cache-busted `delvane-v9.css` and `delvane-v9.js` references so the browser cannot keep serving the old unstyled art direction. Keep `hotel-lobby.webp` and `favicon.svg` at the root.

What's new:
- Fixed the layered software panels on Platform and the quote/property panels on the other pages with explicit scoped layout rules.
- Added a detailed, responsive product dashboard preview with navigation, KPIs, reservation timeline and guest inbox.
- Added favicon.svg.
- Added a gentle scroll-linked drift to secondary-page artwork and retains reveal animations.
- Added a clear Home navigation link.

Deploy: upload all contents of this ZIP into the root of the GitHub Pages repository and commit to main. This source was checked for CSS parse errors and JavaScript syntax. A live browser render still needs to be checked after deployment.
