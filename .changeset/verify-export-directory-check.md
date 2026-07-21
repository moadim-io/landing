---
"landing": patch
---

Harden `scripts/verify-export.mjs` to check `isFile()`, not just a non-zero `size`, for each required export path. A directory's `size` is a small, non-zero filesystem-metadata value, so the previous check would treat a required route silently replaced by a directory (e.g. a future Next.js version emitting `<name>/index.html` instead of a flat `<name>` file) as present and healthy, even though the site would 404 for that URL. Added a regression test covering this case.
