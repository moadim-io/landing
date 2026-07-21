---
"landing": patch
---

Add `timeout-minutes: 15` to the `analysis` job in `.github/workflows/scorecard.yml`. Every other job across this repo's workflows sets an explicit timeout instead of inheriting GitHub Actions' 360-minute default (see `deploy.yml`'s rationale) — this was the one job that still didn't, so a hung `scorecard-action` run or SARIF upload could hold a runner for hours instead of failing fast and visibly.
