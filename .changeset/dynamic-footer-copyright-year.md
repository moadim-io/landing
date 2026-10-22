---
"landing": patch
---

Derive the footer's copyright year from the build-time clock instead of the hardcoded `© 2026 Moadim` literal, so it stays correct on every future redeploy instead of needing a manual edit each January.
