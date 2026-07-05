---
"landing": patch
---

`app/layout.tsx`'s `SoftwareApplication` JSON-LD (`sameAs`, `codeRepository`, `downloadUrl`) hardcoded `https://github.com/moadim-io/daemon` and `https://crates.io/crates/moadim` instead of importing `REPO_URL`/`CRATE_URL` from `app/site.ts`, the documented single source of truth for these identifiers. Also derived the OG image URL from `SITE_URL` instead of hardcoding the origin. No behavior change — same URLs, no longer duplicated.
