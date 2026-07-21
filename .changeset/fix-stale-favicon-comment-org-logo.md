---
"landing": patch
---

Fix a stale code comment on `Organization.logo` in `app/layout.tsx` that still claimed there was "no dedicated brand mark yet" and pointed at `app/favicon.ico`; that file was replaced by `app/icon.svg` back in #161. No behavior change — comment only.
