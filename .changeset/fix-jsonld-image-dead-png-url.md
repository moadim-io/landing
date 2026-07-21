---
"landing": patch
---

Fix `SoftwareApplication.image` JSON-LD pointing at a dead `/opengraph-image.png` URL; the static export emits this route as `/opengraph-image` with no extension.
