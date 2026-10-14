# Delvane cinematic multi-page site — stylesheet path fix

This package uses unique shared asset names to avoid accidentally serving an old or missing `styles.css` / `script.js`. All four HTML pages reference `delvane.css` and `delvane.js`.

## Deploy
Upload all files in this folder directly to the Cloudflare Pages repository root, including `delvane.css` and `delvane.js`. After deployment, check DevTools → Network: `delvane.css` should return 200 with Content-Type `text/css`; `delvane.js` should return 200 with a JavaScript content type. The old `styles.css` and `script.js` can be deleted after confirming the new release is live.
