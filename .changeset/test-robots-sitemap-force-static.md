---
"landing": patch
---

Add a `dynamic === "force-static"` regression test to `robots.test.ts` and `sitemap.test.ts`. Every other metadata route (`manifest.test.ts`, `apple-icon.test.tsx`, `opengraph-image.test.tsx`, `twitter-image.test.tsx`) already asserts this so a regression to the Next.js default fails `npm test` instead of only a full `next build` — `robots.ts` and `sitemap.ts` had the identical gap.
