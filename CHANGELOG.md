# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `public/_headers` declaring a Cloudflare Pages `Cache-Control` policy: content-hashed `/_next/static/*` assets are served `immutable` for a year, while HTML is `max-age=0, must-revalidate` so redeploys are picked up immediately (#122).
- SoftwareApplication JSON-LD structured data so search engines can richly index the app (#9).
- Open Graph and Twitter social-share card for better link previews when the page is shared (#8).
- `.gitattributes` that normalizes text files to LF and marks `package-lock.json` as generated, so CRLF can't sneak into commits and the lockfile stays collapsed in diffs (#150).

### Changed

- Tightened TypeScript strictness with `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` so unchecked index access, dead code, and switch fall-through are caught at build time.
- Replaced the create-next-app boilerplate with a real Moadim hero so the landing page reflects the product (#4).
- Replaced the create-next-app boilerplate README with real project documentation (#10).
- Enabled the `no-console` lint rule to keep stray console statements out of the codebase (#6).

### Fixed

- Sitemap `lastModified` is now stamped at build time instead of a hardcoded `2026-06-15` literal that silently went stale and misreported page freshness to crawlers (#57).
- Honor `prefers-reduced-motion`: hover/active CTA and reading-list animations no longer tween for users who request reduced motion (WCAG 2.3.3) (#89).
- Applied the loaded Geist Sans font to body text so typography renders as intended (#7).
