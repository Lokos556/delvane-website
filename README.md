# Delvane — cinematic website rebuild

This is a clean replacement for the previous marketing site, designed for static deployment on Cloudflare Pages.

## Deploy
1. Upload the contents of this folder to the root of `Lokos556/delvane-website` (including `assets/hotel-lobby.webp`).
2. Commit to the configured production branch.
3. Wait for the production deployment to finish, then verify the deployment commit and test `https://delvane.app`.

## Notes
- The pinned product-story scene uses a sticky stage and a scroll-scrubbed GSAP timeline when GSAP loads.
- A native scroll-driven fallback is included if the animation CDN is unavailable.
- Reduced-motion preferences are respected.
- The email CTA currently points to `hello@delvane.app`; confirm that mailbox is active before launch.
- This package has not yet been verified against the production domain. Test on desktop and mobile after deployment.
