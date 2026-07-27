---
"landing": patch
---

Add a "Quickstart" section showing a real REST (`curl .../api/v1/routines`) and MCP (`list_routines` tool call) example (#67). The page sold "MCP-native" and "REST + OpenAPI" as feature bullets with no code backing them up — a visitor had to leave for the daemon's README to see what calling it actually looks like. Both snippets are verified against the daemon's real surface (`src/commands.rs`, `src/routes/mcp.rs`).
