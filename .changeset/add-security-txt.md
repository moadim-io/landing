---
"landing": patch
---

Add an RFC 9116 `public/.well-known/security.txt` with the vulnerability-disclosure contacts already published in `SECURITY.md`, so scanners and security tooling can discover the reporting channel at the standard well-known path instead of getting a 404. Guarded it in `scripts/verify-export.mjs`'s required-file check so a future build can't silently drop it.
