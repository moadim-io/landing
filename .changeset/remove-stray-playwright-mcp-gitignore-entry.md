---
"landing": patch
---

Remove a stray `.playwright-mcp` entry from `.gitignore`. It was accidentally swept in by #561 alongside the repo's own Playwright test config, but nothing in this project ever creates a `.playwright-mcp` directory — the actual Playwright artifacts (`/test-results`, `/playwright-report`, `/playwright/.cache`) are already covered above it under `# testing`. `.playwright-mcp` is the scratch directory of an unrelated local dev-tool integration (a Playwright browser-automation MCP server) that has no relationship to this repo's test suite, and leaving it in a public `.gitignore` is confusing noise for contributors.
