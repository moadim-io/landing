---
"landing": patch
---

Add a `workflow_dispatch` trigger to `scorecard.yml` so a maintainer can re-run the OpenSSF Scorecard analysis on demand instead of waiting for the weekly schedule or a push to `main`. This mirrors the pattern already applied to `ci.yml`, `codeql.yml`, `lighthouse.yml`, `visual-regression.yml`, and `actionlint.yml`; `scorecard.yml` was the one workflow left without a manual trigger for no functional reason (unlike `dependency-review.yml`, which genuinely needs a `pull_request` base/head diff and can't be manually dispatched the same way).
