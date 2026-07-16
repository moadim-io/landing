---
"landing": patch
---

Add `.github/workflows/scorecard.yml` running [OpenSSF Scorecard](https://github.com/ossf/scorecard) weekly and on push to `main`, publishing results and uploading SARIF to the Security tab, plus a Scorecard badge in `README.md`. Complements the existing individual controls (CodeQL, dependency-review, SHA-pinned Actions) with a single continuous grade of the whole security posture — token permissions, branch protection, pinned dependencies, dangerous workflow patterns — and flags regressions none of those individual checks target.
