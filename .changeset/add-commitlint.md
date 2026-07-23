---
"landing": patch
---

Add commitlint (`@commitlint/config-conventional`) and a CI "Commit lint" job that rejects PR commits not following Conventional Commits. Closes the CI-gate half of #181 — the local `commit-msg` hook lands separately once husky is added (#159).
