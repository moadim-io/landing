---
"landing": patch
---

Add a regression test for the hero's crates.io version badge (`app/page.tsx`): asserts the wrapping link stays a safe external link to `CRATE_URL` and that the shields.io `<img>` keeps its `src` (derived from `CRATE_NAME`), `alt` text, and explicit `width`/`height`. Nothing asserted this before, so a future edit — e.g. renaming `CRATE_NAME`, or dropping the explicit dimensions and reintroducing layout shift — could regress silently.
