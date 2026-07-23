---
"landing": patch
---

Add `/version.json` (commit, ref, build time) to the static export, populated from `GITHUB_SHA`/`GITHUB_REF_NAME` in `deploy.yml` and falling back to `"dev"` locally. Closes the build-provenance gap (#230): before this, there was no way to confirm which commit was actually live at moadim.io short of diffing the `<head>` or trusting a `wrangler` exit code.
