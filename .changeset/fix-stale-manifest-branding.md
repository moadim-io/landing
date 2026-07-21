---
"landing": patch
---

Fix `app/manifest.ts`: the web app manifest still carried the pre-rebrand name/description ("Moadim — Cron jobs over MCP & REST") while every other surface (page metadata, JSON-LD, OG/Twitter cards) already reads "Moadim — Put your agents on a loop". Also reconciled `background_color`/`theme_color` (`#fafafa`) with the site's actual palette (`#f4f1e8`, matching `--background` and `layout.tsx`'s `viewport.themeColor`), so a PWA install splash screen and browser chrome color no longer disagree with what visitors already see.
