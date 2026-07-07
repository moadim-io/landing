---
"landing": patch
---

Add a render test for `app/apple-icon.tsx`, invoking the component instead of only asserting its exported route config. It uses the same `next/og` `ImageResponse`/Satori JSX setup as `opengraph-image.tsx`, which already has this coverage (added specifically because a typo in the Satori JSX/inline style tree only fails at `next build` time otherwise) — `apple-icon.tsx` had the identical gap.
