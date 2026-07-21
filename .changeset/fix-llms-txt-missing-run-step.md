---
"landing": patch
---

Fix `public/llms.txt` — the file that exists specifically for AI agents to follow — never telling an agent to actually run `moadim` to start the server. It named `cargo install --locked moadim` and the separate `moadim install` persistence step, but skipped the run step in between, the same "one command short of a working daemon" bug already fixed on the hero card (#206). An agent following the file literally would end up with the binary installed and no server running. Added a regression test guarding the fix.
