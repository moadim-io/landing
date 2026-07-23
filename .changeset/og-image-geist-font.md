---
"landing": patch
---

Fix the OG/Twitter share card (`opengraph-image.tsx`) rendering in Satori's fallback font (Noto Sans) instead of the site's Geist brand font. `next/font` doesn't reach a metadata route's `ImageResponse` — Satori needs raw font bytes passed via its `fonts` option — so this vendors the static Geist Bold TTF (`app/fonts/geist-bold.ttf`, SIL Open Font License, `app/fonts/GEIST-OFL.txt`) and wires it in. A variable-font instance was tried first but failed to rasterize in Satori, so this uses the closest static weight to the card's 700/800 text instead. Vendored (not fetched from Google Fonts at build time) so the route has no network dependency.
