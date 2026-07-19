---
"landing": patch
---

Remove a duplicate `:root { --background; --foreground; --accent }` block in `app/globals.css`. Two independent "single-source the palette" changes each added the same alias block without noticing the other already existed, so the file carried two byte-identical `:root` rules back to back. Harmless at runtime (the second just re-declared the same custom properties), but dead, confusing duplication -- collapsed to one copy.
