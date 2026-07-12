---
"landing": patch
---

Derive the `Organization` JSON-LD node's `sameAs` GitHub profile URL from `site.ts`'s `REPO_SLUG` (via a new `ORG_URL` export) instead of a hardcoded `"https://github.com/moadim-io"` literal, matching the pattern already used for `REPO_URL`/`CRATE_URL` and the sibling `SoftwareApplication` node's `sameAs`/`codeRepository`/`downloadUrl` fields.
