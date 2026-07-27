---
"landing": patch
---

Pin a stable `id` on the PWA manifest so a future `start_url` change (locale prefix, install-attribution query param) updates the existing installed app instead of registering a second one.
