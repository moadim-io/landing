---
"landing": patch
---

Add an `x-build-sha` meta tag to every page, sourced from `GITHUB_SHA` at build time (falls back to `"dev"` outside CI). Lets anyone confirm which commit is actually live (`curl -s https://moadim.io | grep x-build-sha`) instead of cross-referencing the Actions/Cloudflare deploy history (#230).
