---
"landing": patch
---

Fix the Apple touch icon (`apple-icon.tsx`) rendering its "M" glyph in Satori's fallback font (Noto Sans) instead of the site's Geist brand font. `next/font` doesn't reach a metadata route's `ImageResponse` — Satori needs raw font bytes passed via its `fonts` option — so this wires in the same vendored Geist Bold TTF (`app/fonts/geist-bold.ttf`) that `opengraph-image.tsx` already uses, keeping the iOS home-screen icon visually consistent with the OG/Twitter cards.
