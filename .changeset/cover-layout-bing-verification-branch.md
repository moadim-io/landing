---
"landing": patch
---

Add test coverage for `app/layout.tsx`'s Bing site-verification branch. `metadata.verification.other` is only emitted when `NEXT_PUBLIC_BING_SITE_VERIFICATION` is set at build time, but no test exercised that branch — `npm run test:coverage` reported it as the one uncovered branch in the file (91.66% branch coverage). Adds a test that stubs the env var and re-imports the module to assert the tag is emitted with the token, plus a companion test asserting it's omitted when unset. No behavior change.
