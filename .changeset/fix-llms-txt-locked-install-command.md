---
"landing": patch
---

Use `--locked` in the `cargo install` commands in `public/llms.txt`, matching the hero card's install command. `llms.txt` exists specifically for AI agents to follow, so a stale bare `cargo install moadim` there had them re-resolve dependencies instead of the tested, locked set.
