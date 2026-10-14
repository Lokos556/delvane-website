# Delvane website rebuild — flat Cloudflare Pages package

IMPORTANT: these files must be placed at the **root of the GitHub repository**. Do not upload the enclosing folder as a subfolder and do not replace only `index.html`.

Required root structure:
- `index.html`
- `styles.css`
- `script.js`
- `_headers`
- `assets/hotel-lobby.webp`

The HTML references `styles.css`, `script.js`, and `assets/hotel-lobby.webp` using relative paths. All three must be deployed together, preserving these names and paths.

After committing, check the Cloudflare Pages production deployment's commit SHA. Then hard-refresh `delvane.app` (Ctrl+Shift+R). If the page still renders unstyled, open DevTools → Network and check whether `styles.css` returns HTTP 200 and has a CSS content type; check that `assets/hotel-lobby.webp` also returns HTTP 200.

The scroll story uses GSAP/ScrollTrigger when available and a native scroll fallback otherwise. Test it in a browser after deployment; this package has not been independently verified against the production domain.
