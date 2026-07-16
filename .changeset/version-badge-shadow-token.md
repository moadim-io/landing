---
"landing": patch
---

Fix the crates.io version badge on the hero to use the shared `shadow-brutal` token instead of a raw `shadow-[6px_6px_0_0_#000]` arbitrary value -- the only such raw shadow in the codebase, and exactly the token-drift class this repo has fixed before (see `AGENTS.md`'s explicit "don't invent a raw `shadow-[...]`" guidance). The literal `#000` also silently diverged from the actual `--color-foreground` token. Also added test coverage for the badge link's `href`, class, and image `src`/`alt`, which had none.
