---
"landing": patch
---

Fix `deploy.yml` so it actually populates `/version.json`'s build provenance in production. `app/version.json/route.ts` reads `NEXT_PUBLIC_BUILD_COMMIT`/`NEXT_PUBLIC_BUILD_REF`/`NEXT_PUBLIC_BUILD_TIME` (falling back to `"dev"` when unset, per its own doc comment and README's "Confirming what's live"), but neither the `deploy` job nor the PR `preview` job ever set them — every `npm run build` step ran with none of those three env vars defined. The live site's `/version.json` has been silently returning `{"commit":"dev","ref":"dev","builtAt":"dev"}` this whole time, defeating the one thing the route exists for: confirming which commit is actually serving moadim.io. Now wired from `github.sha`/`github.ref_name` (production) or the PR's head SHA/branch (preview), plus a build-time UTC timestamp.
