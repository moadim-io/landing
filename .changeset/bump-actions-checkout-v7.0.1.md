---
"landing": patch
---

Bump `actions/checkout` from `v7.0.0` to `v7.0.1` across all nine workflow files that pin it (`ci.yml`, `deploy.yml`, `codeql.yml`, `scorecard.yml`, `lighthouse.yml`, `link-check.yml`, `visual-regression.yml`, `dependency-review.yml`, `actionlint.yml`). Not covered by any open dependency-bump PR; the upstream Dependabot config groups `github-actions` minor/patch bumps but `checkout` had drifted a patch version behind.
