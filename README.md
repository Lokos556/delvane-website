# Delvane — cinematic marketing site (v2)

A static HTML/CSS/JS website for Cloudflare Pages, built around a cinematic, scroll-led story. It uses a lightweight canvas atmosphere, optional Lenis smooth scrolling, GSAP/ScrollTrigger when their CDN scripts are available, and a CSS fallback. No build step is required.

## Deploy to the existing Cloudflare Pages project
1. Replace the files in the **root** of the GitHub repository `Lokos556/delvane-website` with the contents of this folder (`index.html`, `styles.css`, `script.js`, `_headers`, `README.md`).
2. Commit to `main`.
3. Cloudflare Pages should automatically deploy the commit. Keep build command empty and output directory `.`.

## Motion and accessibility
- Includes `prefers-reduced-motion` support.
- Scroll-triggered choreography is optional and degrades to readable static content if external libraries fail.
- Canvas effects are lightweight and disabled for reduced-motion preference.
- The product UI is explicitly marked as an illustrative concept; confirm all claims before public launch.

## Before launch
- Set up `hello@delvane.app` or change the mailto links.
- Review the product concept and all copy against features actually available in Delvane.
- Test desktop, mobile, keyboard navigation, and reduced-motion settings.
