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
- Added `package.json` metadata — license, description, and repository — so the package is properly described (#119).
- Enforced a clean lint baseline: `npm run lint` now fails on warnings (`--max-warnings 0`), with the `prefer-const` and `object-shorthand` rules enabled (#139).

### Fixed

- Honor `prefers-reduced-motion`: hover/active CTA and reading-list animations no longer tween for users who request reduced motion (WCAG 2.3.3) (#89).
- Added a visible keyboard focus indicator on interactive elements so keyboard users can see where they are (WCAG 2.4.7) (#84).
- Raised the source-label text contrast to meet the WCAG 1.4.3 minimum (#103).
- Applied the loaded Geist Sans font to body text so typography renders as intended (#7).
