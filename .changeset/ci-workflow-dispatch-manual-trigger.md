---
"landing": patch
---

Add a `workflow_dispatch` trigger to `ci.yml`, `codeql.yml`, `lighthouse.yml`, `visual-regression.yml`, and `actionlint.yml` — the only workflows in this repo that could previously only run from a `push`/`pull_request` event (or, for CodeQL, its weekly schedule). Without it, re-running lint/test/build, a CodeQL scan, a Lighthouse budget check, a Playwright screenshot diff, or a workflow-YAML lint on demand (after a flaky run, or to sanity-check a branch before opening a PR) requires an empty commit or waiting for the next real trigger. `deploy.yml` and `link-check.yml` already had `workflow_dispatch`; this makes the other CI-only workflows consistent with that existing pattern. `dependency-review.yml` is intentionally left out: `actions/dependency-review-action` diffs a PR's base/head refs, which only exist in a `pull_request` event.
