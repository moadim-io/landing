# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Unit tests for `page.tsx`'s three feature cards and the "On loop engineering" reading list, asserting the reading-list links carry the `nofollow noopener noreferrer` `rel` baseline — previously the only content on the page with no direct test coverage.
- `verify:export` script (and a matching CI/deploy step) that asserts the static export in `out/` actually contains every file the site depends on — `index.html`, `404.html`, `sitemap.xml`, `robots.txt`, the OG/Twitter images, `favicon.ico`, and `_headers` — so a route or asset that silently drops from a green `next build` fails CI instead of shipping a broken page (#345).
- `JsonLdScript`, a shared component (plus a `toSafeJsonLd` helper) that `layout.tsx` and `page.tsx` both route through to escape JSON-LD before inlining it, with its own dedicated test coverage for the `</script>`-breakout escaping (#352).
- CI: a `dependency-review` gate (`actions/dependency-review-action`) that fails a PR on a new high/critical-severity advisory or a disallowed dependency license, catching a vulnerable or incompatibly-licensed package before Dependabot ever sees it (#148, #344).
- CI: a `lychee` link-check gate over the built static export and the root Markdown docs, plus a weekly scheduled run so external link rot is caught even without a code change (#341).
- CI: a `typos` spell-check gate over `app/**`, Markdown docs, and config files (#347).
- CI: an `actionlint` gate for `.github/workflows/**` YAML, including embedded shell via shellcheck (#313).
- CI: a `markdownlint` gate for the repo's Markdown docs (#314).
- CI: a `lint-and-build` gate (ESLint + `next build`) on every pull request and push to `main` (#308), later extended to run the Vitest suite too (#321).
- CI: a CodeQL scanning gate for `javascript-typescript` (#331).
- CI: cancel a superseded CI run when a PR gets a new push, instead of letting stale runs keep holding a runner (#323).
- CI/deploy: bound the Cloudflare Pages deploy job with `timeout-minutes`, so a hung build/install/`wrangler` call can't hold a runner for hours (#275).
- CI/deploy: declare a GitHub `production` Environment on the deploy job, so every deploy shows up in the Deployments tab with a link to the live URL and Cloudflare secrets can be scoped to it (#330).
- CI/deploy: cache `.next/cache` on the deploy job so `next build` can do an incremental build instead of a fully cold one on every push (#327).
- Persistent "Docs" and "GitHub" navigation links beside the site wordmark in the header banner (#295, #303).
- `CODE_OF_CONDUCT.md` (Contributor Covenant) (#309).
- Unit tests for `not-found.tsx`, the branded 404 page (#325).
- Unit tests for `app/site.ts`'s constant derivations (`REPO_URL`, `CRATE_URL`, etc.) (#340).
- `.github/workflows/dependency-review.yml`: a PR-time gate (`actions/dependency-review-action`) that fails on a new high/critical-severity advisory or a disallowed dependency license, so a vulnerable or incompatibly-licensed package can't be introduced before Dependabot ever sees it (#148).
- Unit tests for the `opengraph-image`/`twitter-image` metadata routes, asserting the `force-static` export (required under `output: "export"`), the declared `1200x630` OG dimensions, the `image/png` content type, and that `twitter-image.tsx` genuinely re-exports (not hand-copies) `opengraph-image`'s config and renderer — previously the only two route files in `app/` with no test coverage.
- Unit tests for `ExternalLink`, covering `target="_blank"` + `rel="noopener noreferrer"` (reverse-tabnabbing protection), the `relExtra` prepend behavior, and the screen-reader "(opens in a new tab)" suffix — none of which had direct coverage before, so a regression in the component itself could pass CI undetected.
- A first automated test suite — Vitest + React Testing Library, wired into CI — covering the hero headline/install command/CTA links, the root layout's metadata and `SoftwareApplication` JSON-LD, and the `sitemap.xml`/`robots.txt` output, so regressions in this content now fail CI instead of shipping silently (#40).
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

- Shared `<meta name="description">`/Open Graph/Twitter description trimmed from 189 to 159 characters and front-loaded with the core value proposition, so it survives Google's ~155-160 char SERP truncation and Twitter/unfurlers' tighter ~120-125 char clamp instead of being cut mid-sentence (#135).
- Third-party GitHub Actions across `ci.yml`, `codeql.yml`, `dependency-review.yml`, `link-check.yml`, `actionlint.yml`, and `deploy.yml` pinned to commit SHAs instead of floating version tags, closing a supply-chain tampering vector where a compromised tag could silently change what a workflow runs (#342, #350).
- `eqeqeq` ESLint rule enabled, requiring `===`/`!==` over `==`/`!=` (#335).
- `@typescript-eslint/no-explicit-any` enabled as an error (#307).
- `eslint-plugin-jsx-a11y`'s recommended ruleset enabled at error level (#320).
- Sitemap `lastModified` bumped to 2026-06-25 and `changeFrequency` set to `weekly` (#306).
- Generated metadata routes (OG/Twitter images, favicon) given a real, long-lived cache window instead of an implicit no-cache default (#228, #278).
- `cloudflare/wrangler-action` bumped from v3 to v4 (#114).
- CI and deploy installs switched to `npm ci` against a regenerated, in-sync lockfile, instead of a re-resolving `npm install` (#328).
- Production deploys now skip for docs-only pushes (README, CHANGELOG, other workflow files) that can't affect the exported static site (#326).
- README and `CONTRIBUTING.md` now document the test scripts (`npm test`, `npm run test:watch`) (#333).
- Enabled type-aware ESLint linting (`parserOptions.projectService`, scoped to `**/*.ts`/`**/*.tsx`) and turned on `@typescript-eslint/no-floating-promises` / `@typescript-eslint/no-misused-promises`, so an unawaited promise or an `async` callback passed where a `void`-returning one is expected now fails `npm run lint` instead of silently swallowing the rejection (#288).
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

- `sitemap.xml`'s `lastModified` no longer freezes on a hand-maintained hardcoded date — it now stamps the actual build time, so the sitemap stops claiming every page was last modified on a fixed day forever (#57).
- Escaped `<` in the FAQ `JSON-LD` before inlining, closing the same `</script>`-breakout sink already fixed for the `SoftwareApplication` JSON-LD (#301).
- Cloudflare Pages deploys are no longer cancelled mid-flight by a newer push to `main`; queued runs now serialize instead, so a killed `wrangler pages deploy` can't leave a half-uploaded deployment (#310).
- Removed dead `focus-visible` Tailwind utility classes on the header nav links — an unlayered global CSS rule in `globals.css` already always wins the cascade over them, so the per-link classes compiled but never actually rendered (#338).
- Removed `public/_headers` `Cache-Control` rules that were dead, shadowed by a later, more specific override rule (#334).
- Removed a byte-for-byte duplicate `@media (prefers-reduced-motion: reduce)` rule in `app/globals.css`, left behind after two separate commits independently fixed the same reduced-motion issue (#89) without either noticing the other's rule was already shipped.
- Escaped `<` to `<` in the `SoftwareApplication` JSON-LD injected via `dangerouslySetInnerHTML`, closing the `</script>` breakout sink that `JSON.stringify` alone does not guard against (#198).
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
- Enabled `trailingSlash` so the static export emits directory-style routes
  (`out/<route>/index.html`), giving consistent clean URLs on static hosts and
  removing the need for `/route` → `/route.html` rewrite rules as pages are added.
