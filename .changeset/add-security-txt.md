---
"landing": patch
---

Add `public/.well-known/security.txt` (RFC 9116) so `https://moadim.io/.well-known/security.txt` serves a machine-readable vulnerability-disclosure contact instead of 404ing. Scanners and researcher tooling look for this exact path; it mirrors the existing `SECURITY.md` policy, which now links to it. `scripts/verify-export.mjs` gates it as a required export file so a build that drops it fails CI instead of shipping silently.
