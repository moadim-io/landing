---
"landing": patch
---

Add a `concurrency` group (`cancel-in-progress: true`) to `actionlint.yml` and `dependency-review.yml`, mirroring the pattern already used by `ci.yml`, `codeql.yml`, `lighthouse.yml`, `link-check.yml`, and `visual-regression.yml`. Without it, a rapid series of pushes to the same PR queues up every prior run of these two workflows instead of cancelling the superseded one — wasting runner minutes on a workflow-YAML lint or dependency-diff result that's about to be replaced anyway.
