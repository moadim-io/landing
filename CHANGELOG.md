# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- On-page FAQ section answering the questions visitors weigh before installing (license, self-hosted vs cloud, supported agents/OS, run isolation), with the same five Q&As emitted as schema.org `FAQPage` structured data from a single source so the copy and markup can't drift (#176).
- Branded `404` not-found page that reuses the site's neobrutalist design language and offers a clear link back home, replacing Next.js's default unstyled error screen (#155).
- Site banner landmark with the `moadim.` wordmark above `<main>`, giving assistive-tech users a top-level region to jump to and the single-page site a persistent brand anchor (#188).
- `theme-color` declared via a Next.js `viewport` export so mobile browser chrome matches the brand palette instead of staying default white (#235).
- tmux and cron-daemon runtime prerequisites surfaced on the hero install card, so visitors aren't left with a daemon that installs successfully but can never fire a scheduled loop (#208).
- `.github/FUNDING.yml` declaring the maintainer's GitHub Sponsors handle to surface the repo's Sponsor button (#202).
- Status badges (live site, product crates.io version, MIT license) at the top of `README.md` for at-a-glance credibility, mirroring the daemon repo (#191).
- `public/_headers` declaring a Cloudflare Pages `Cache-Control` policy: content-hashed `/_next/static/*` assets are served `immutable` for a year, while HTML is `max-age=0, must-revalidate` so redeploys are picked up immediately (#122).
- `og:locale` declared in the Open Graph metadata so social platforms know the page's language when rendering share previews (#211).
- SoftwareApplication JSON-LD structured data so search engines can richly index the app (#9).
- Open Graph and Twitter social-share card for better link previews when the page is shared (#8).
- `.gitattributes` that normalizes text files to LF and marks `package-lock.json` as generated, so CRLF can't sneak into commits and the lockfile stays collapsed in diffs (#150).

### Changed

- Marked the three third-party "On loop engineering" reading-list links `rel="nofollow"` so the homepage stops passing ranking signal out to external commentary domains on every crawl (#233).
- Tightened TypeScript strictness further by enabling `noImplicitOverride`, completing the opt-in strictness set so class members that override a base member must say so explicitly (#160).
- Centralized the remaining product identifiers (GitHub repo slug, crates.io URL, crate name) in `app/site.ts`, extending the existing `SITE_URL` single-source pattern so a repo move or crate rename no longer means hunting down literals (#173).
- Single-sourced the brand palette hex values in `app/globals.css`, removing the duplicate `--background` / `--foreground` / `--accent` declarations so the raw and Tailwind-facing tokens can't drift apart (#236).
- The site-wide wordmark and FAQ panel now reuse shared building blocks — the wordmark routes through `next/link` for client-side navigation instead of a raw `<a>` full reload, and the FAQ section uses the shared `panel` constant instead of a hardcoded copy of the class string (#282).
- Routed every outbound link through a shared `<ExternalLink>` wrapper, replacing the hand-repeated "open safely in a new tab" attributes at each call site (#291).
- Corrected the "Runs locally, survives reboot" feature and the two related FAQ answers: reboot persistence comes from running `moadim install` (which registers the launchd / systemd service), not from `cargo install moadim` alone. The old copy claimed "one install command" registered the service, conflating the two steps (#238).
- Refreshed the Open Graph / Twitter social-share card copy to the current "Put your agents on a loop" / "Open-source loop engine for AI agents" positioning, replacing the stale pre-rebrand "Cron jobs over MCP & REST" / "scheduling" tagline so shared link previews match the rest of the site.
- Tightened TypeScript strictness with `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` so unchecked index access, dead code, and switch fall-through are caught at build time.
- Replaced the create-next-app boilerplate with a real Moadim hero so the landing page reflects the product (#4).
- Replaced the create-next-app boilerplate README with real project documentation (#10).
- Enabled the `no-console` lint rule to keep stray console statements out of the codebase (#6).
- Added `package.json` metadata — license, description, and repository — so the package is properly described (#119).
- Enforced a clean lint baseline: `npm run lint` now fails on warnings (`--max-warnings 0`), with the `prefer-const` and `object-shorthand` rules enabled (#139).

### Performance

- Paint the background grid pre-dimmed and drop the full-viewport overlay, so the page renders without an extra compositing layer covering the viewport (#205).

### Fixed

- Declared a light `color-scheme` so visitors in OS/browser dark mode no longer get dark-rendered native controls, scrollbars, and a pre-paint flash against the single-theme light design (#293).
- Corrected the `SoftwareApplication` JSON-LD `operatingSystem` to macOS + Linux, matching the platforms the product actually supports instead of advertising Windows (#267).
- Stopped the `/*` `Cache-Control` rule in `public/_headers` from overlapping `/_next/static/*`, so content-hashed assets keep their year-long `immutable` policy instead of being shadowed by the must-revalidate HTML rule (#180).
- Pinned ESLint to `^9` so `npm run lint` — the documented pre-PR gate — runs again instead of crashing before linting a single file (#232).
- `CONTRIBUTING.md` security-reporting guidance now points at this repo's `SECURITY.md` instead of the **daemon** repo's advisory page, and drops the reference to a non-existent `/.well-known/security.txt`, so contributors report landing-site vulnerabilities through the correct, working channel.
- The hero install snippet's leading `$` prompt is no longer selectable/copyable, so copying the command doesn't drag the shell prompt along with it (#200).
- Restored interactive state cues (borders/outlines on buttons and links) under Forced Colors Mode / Windows High Contrast, so controls stay distinguishable (#123).
- Honor `prefers-reduced-motion`: hover/active CTA and reading-list animations no longer tween for users who request reduced motion (WCAG 2.3.3) (#89).
- Added a visible keyboard focus indicator on interactive elements so keyboard users can see where they are (WCAG 2.4.7) (#84).
- Raised the source-label text contrast to meet the WCAG 1.4.3 minimum (#103).
- Applied the loaded Geist Sans font to body text so typography renders as intended (#7).
