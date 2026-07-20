---
"landing": patch
---

Add a `purpose: "maskable"` icon entry to `app/manifest.ts`, alongside the existing `purpose: "any"` one. Without a maskable-flagged icon, Android's adaptive-icon system doesn't trust the manifest icon as full-bleed, cropping-safe artwork — it insets it onto a plain system-color circle instead when a visitor uses "Add to Home Screen". `app/icon.svg`'s "M" glyph already sits inside the maskable safe zone (the centered 80%-diameter circle the spec requires: path bounding box x:[7,25] y:[9,24] against a 32x32 viewBox, safe zone x:[3.2,28.8] y:[3.2,28.8]), so the same file serves both purposes with no new asset needed.
