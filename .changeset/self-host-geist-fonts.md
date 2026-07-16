---
"landing": patch
---

Switch the Geist Sans/Mono fonts from `next/font/google` to the `geist` package (`next/font/local` under the hood). `next/font/google` fetches the font files from Google's CDN during `next build`; a build with no network access, or a Google Fonts outage, fails outright. The `geist` package ships the same font files locally, so the build no longer depends on an external network call.
