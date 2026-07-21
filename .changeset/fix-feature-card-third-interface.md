---
"landing": patch
---

Fix the homepage's third feature-card title ("MCP · REST · OpenAPI") to say "UI · REST · MCP", matching the daemon's own "One port. Three interfaces." framing (UI, REST, MCP). OpenAPI is the REST API's doc format, not one of the three interfaces the daemon ships — the title was silently dropping the built-in web UI dashboard from the one piece of on-page copy visitors scan first, even though the card's own body text and `public/llms.txt` already describe the web UI correctly.
