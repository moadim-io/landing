---
"landing": patch
---

Bump `actions/upload-artifact` to `v7.0.1` in `scorecard.yml` (was `v5.0.0`) and `visual-regression.yml` (was `v4.6.2`, over a year stale). Neither pin was covered by an open dependency PR, and the two workflows had drifted onto different major versions of the same action.
