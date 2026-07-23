---
"landing": patch
---

Document the built-in Claude agent's `python3` prerequisite in the "Which agents does it support?" FAQ. The daemon's own README flags this as a silent-failure trap: without `python3` on `PATH`, the Claude agent's unattended setup step fails and the run just no-ops, surfaced only via a startup log line and `GET /api/v1/health`'s `dependencies.python3` flag — nothing on the landing page said so before, leaving visitors to debug a routine that silently never runs.
