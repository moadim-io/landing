---
"landing": patch
---

Shorten `SITE_DESCRIPTION` from 189 to 116 characters so it survives both display budgets it's reused across verbatim: Google SERP snippets (~155-160 chars) and the tighter Twitter/X and link-unfurler social-card clamp (~120-125 chars). Front-loads the core value proposition and adds a length-guard test (#135).
