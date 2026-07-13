---
"landing": patch
---

Render the loop diagram with a plain `<img>` instead of `next/image` in `LoopAnimation.tsx`. `next/image` unconditionally injects a `style="color:transparent"` attribute on its rendered `<img>` (to hide the browser's default broken-image alt icon while loading), which fails html-validate's `no-inline-style` rule against the built static export (`npm run lint:html`, already documented in `AGENTS.md`/`README.md` as a pre-PR check). Since `images.unoptimized` is set for the static export, `next/image` ran no optimizer here anyway — it was a styled passthrough. Same `src`/`alt`/dimensions/classes, plus explicit `loading="lazy" decoding="async"` to match `next/image`'s previous default behavior. No visual or behavioral change.
