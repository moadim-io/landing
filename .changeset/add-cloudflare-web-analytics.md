---
"landing": minor
---

Add an opt-in Cloudflare Web Analytics beacon (`app/CloudflareBeacon.tsx`), gated by the `NEXT_PUBLIC_CF_BEACON_TOKEN` env var so local dev and forks emit no traffic by default. Cookieless, no PII, no consent banner required — the site had no way to measure traffic or CTA conversions until now (#83).
