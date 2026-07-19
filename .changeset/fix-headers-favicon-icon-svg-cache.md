---
"landing": patch
---

Fix `public/_headers`' immutable-caching rule for the favicon: it still targeted `/favicon.ico`, a route the static export has never emitted since `app/favicon.ico` was replaced by `app/icon.svg` (#161) — so the rule silently matched nothing, and the actual favicon route (`/icon.svg`, whose `<link rel="icon">` href carries the same cache-busting query string as the OG/Twitter/apple-icon routes) fell through to the `max-age=0, must-revalidate` catch-all instead of being cached forever like its neighbors. `deploy-config.test.ts` asserted the dead `/favicon.ico` rule instead of the live `/icon.svg` path, so this passed CI undetected.
