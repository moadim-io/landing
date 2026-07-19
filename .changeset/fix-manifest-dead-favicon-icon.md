---
"landing": patch
---

Fix `app/manifest.ts`'s PWA icon entry pointing at `/favicon.ico`, a file that hasn't existed since `app/favicon.ico` was replaced by `app/icon.svg` (#161) — the static export never emits `favicon.ico`, so "Add to Home Screen" installs got a 404'ing icon. Point the manifest at `/icon.svg` (`image/svg+xml`) instead, and update `manifest.test.ts`'s assertion so it catches this rather than locking in the dead path.
