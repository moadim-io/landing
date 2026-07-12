---
"landing": patch
---

Extract the neobrutalist hard-drop-shadow values (`shadow-[6px_6px_0_0_#000]`, `shadow-[10px_10px_0_0_#000]`, and their hover/active steps) into `shadow-brutal`/`shadow-brutal-hover`/`shadow-brutal-active`/`shadow-brutal-lg` theme tokens in `app/globals.css`, driven by `--color-foreground` instead of a re-typed `#000` literal (#213).

The header, install card, features grid, reads/FAQ panels, and `ctaButton` each hardcoded the same offsets independently — a token makes "all cards share one shadow" a structural guarantee instead of a copy-paste convention. Purely a refactor: rendered output is unchanged.
