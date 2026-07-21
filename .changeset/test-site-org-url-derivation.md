---
"landing": patch
---

Add a regression test asserting `app/site.ts`'s `ORG_URL` is actually derived from `REPO_SLUG`'s owner segment (`REPO_SLUG.split("/")[0]`), matching the coverage `REPO_URL` and `CRATE_URL` already had. `ORG_URL` shipped in #484 with no direct test of its own — `layout.test.ts` only asserts the Organization JSON-LD `sameAs` matches whatever `ORG_URL` happens to be, so it would stay green even if the derivation regressed to point at the wrong segment or a full repo URL.
