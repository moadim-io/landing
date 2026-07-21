# Moadim — Landing Site

[![Live site](https://img.shields.io/website?url=https%3A%2F%2Fmoadim.io&label=moadim.io)](https://moadim.io)
[![Product version](https://img.shields.io/crates/v/moadim.svg?label=moadim)](https://crates.io/crates/moadim)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/moadim-io/landing/badge)](https://scorecard.dev/viewer/?uri=github.com/moadim-io/landing)

The marketing/landing site for **Moadim**, an open-source loop engine for AI agents.
Define a loop — a prompt, a schedule, an agent — and it runs Claude, Codex, Hermes, or Pi
against your repo on every tick, over MCP and REST.

![Animated diagram of the Moadim loop: an agent reads a goals repository and refines the routines in a routines repository — each routine its own small, always-running loop — the routines act on external repositories and tasks, and progress flows back into the goals](./public/loop-animation.svg)

- **Live site:** <https://moadim.io>
- **Product source:** <https://github.com/moadim-io/daemon>

Built with [Next.js](https://nextjs.org) (App Router) and [Tailwind CSS](https://tailwindcss.com).
The site is a fully static export (`output: "export"`), so it builds to plain HTML/CSS/JS
and can be served from any static host or CDN.

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as
you edit files under `app/`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server with hot reload. |
| `npm run build` | Produce the static export in `out/`. |
| `npm run start` | Serve the static `out/` build locally (via `serve`) to preview it before deploying. |
| `npm run lint` | Run ESLint (Next.js core-web-vitals + TypeScript + `jsx-a11y` recommended rules); fails on any warning (`--max-warnings 0`). |
| `npm run lint:md` | Lint Markdown files with `markdownlint-cli2`. |
| `npm run lint:html` | Validate the built `out/**/*.html` with [`html-validate`](https://html-validate.org) (config: [`.htmlvalidate.json`](./.htmlvalidate.json)). Run `npm run build` first. |
| `npm run lint:css` | Lint `app/**/*.css` with [Stylelint](https://stylelint.io) (config: [`.stylelintrc.json`](./.stylelintrc.json)); fails on any error. |
| `npm run typecheck` | Type-check the whole project with `tsc --noEmit` (`next build`'s own TypeScript pass only covers the app route graph, so it misses files like `*.test.ts`). |
| `npm test` | Run the Vitest unit/component test suite once. |
| `npm run test:watch` | Run the Vitest suite in watch mode while developing. |
| `npm run test:coverage` | Run the Vitest suite once with a `text`/`html`/`json-summary` coverage report over `app/**` (HTML report at `coverage/index.html`). Enforces the coverage thresholds in `vitest.config.ts` and is what CI runs on every PR — not plain `npm test`. |
| `npm run verify:export` | Check that the built `out/` directory actually contains the routes/files a static export must ship; runs after every build in CI. |
| `npm run test:visual` | Run the Playwright visual-regression suite against the built `out/` export (run `npm run build` first). Compares homepage and 404-page screenshots at mobile/desktop viewports against the committed baselines in `e2e/visual.spec.ts-snapshots/`. Update baselines after an intentional visual change with `npm run test:visual -- --update-snapshots`. Only the `-linux` baselines are committed (CI runs on `ubuntu-latest`) — on macOS or Windows this fails on the first run with "A snapshot doesn't exist" since no `-darwin`/`-win32` baseline exists yet; that's expected, not a regression. Run the same `--update-snapshots` command once to generate a local baseline (safe to leave uncommitted). |
| `typos` | Spell-check `app/**`, `*.md`, and config files with [`typos`](https://github.com/crate-ci/typos) (config: [`_typos.toml`](./_typos.toml)). Not an npm script — install with `cargo install typos-cli` or `brew install typos-cli`, then run `typos` from the repo root. Gated in CI on every PR and push to `main`. |

## Project structure

```text
app/
  layout.tsx            Root layout, fonts, site metadata (SEO / Open Graph), JSON-LD.
  page.tsx              Landing page content.
  not-found.tsx         Branded 404 page.
  error.tsx             Branded error boundary for errors thrown inside the root layout's
                        children (the "Try again" screen for the rest of the app).
  global-error.tsx      Root-layout error boundary — supplies its own <html>/<body> for the
                        rare case where the root layout itself throws.
  SkipLink.tsx          Visually-hidden "Skip to content" link, focusable first so
                        keyboard/screen-reader users can bypass the repeated header (WCAG 2.4.1).
  ExternalLink.tsx      Outbound (new-tab) link wrapper with the safe rel attributes.
  JsonLdScript.tsx      Escapes and inlines JSON-LD structured data as a <script> tag.
  LoopAnimation.tsx     Thin wrapper embedding public/loop-animation.svg on the landing
                        page — edit the SVG, not this component, to change the diagram.
  site.ts               Shared site constants: canonical SITE_URL plus the product's
                         GitHub/crates.io identifiers (REPO_SLUG, REPO_URL, CRATE_NAME,
                         CRATE_URL).
  globals.css           Global styles and Tailwind theme tokens.
  brand-colors.ts       Satori-safe brand hex constants for opengraph-image.tsx/apple-icon.tsx,
                        kept in sync with globals.css by hand (a test guards it).
  icon.svg              Site favicon (SVG, file-based metadata route).
  apple-icon.tsx        Generated Apple touch icon (file-based metadata route).
  opengraph-image.tsx   Generated Open Graph social card.
  twitter-image.tsx     Generated Twitter/X social card.
  manifest.ts           Generated /manifest.webmanifest (PWA manifest).
  robots.ts             Generated robots.txt.
  sitemap.ts            Generated sitemap.xml.
  version.json/route.ts Build-provenance API route — emits the commit/ref/build time baked
                        in at build time (see "Confirming what's live" below).
public/
  _headers              Cloudflare Pages response headers.
  loop-animation.svg    The animated loop diagram — single source of truth, self-contained
                        (embedded CSS + palette). Rendered on the landing page via
                        app/LoopAnimation.tsx, embedded above, and served at
                        moadim.io/loop-animation.svg for hotlinking from other READMEs.
test/
  mocks/next-font-google.ts  Vitest stub for the build-time-only `next/font/google` loader.
scripts/
  verify-export.mjs     Checks the built out/ directory for required routes/files (see
                         `npm run verify:export`).
e2e/
  visual.spec.ts         Playwright visual-regression suite (see `npm run test:visual` above).
  visual.spec.ts-snapshots/  Committed `-linux` baseline screenshots the suite diffs against.
playwright.config.ts     Playwright config for the visual-regression suite (builds against `out/`).
next.config.test.ts      Guards next.config.ts's static-export invariants against drift.
deploy-config.test.ts    Guards public/_headers and public/_redirects against malformed rules.
node-version.test.ts     Guards .nvmrc, package.json engines.node, and CONTRIBUTING.md against drift.
llms-txt.test.ts         Guards public/llms.txt's install command against the hero's.
loop-animation-svg.test.ts  Guards public/loop-animation.svg's hand-synced palette and animation
                          CSS against drifting from app/globals.css.
.github/workflows/
  ci.yml                 Lint, test, build, and verify the export on every PR and push to main.
  deploy.yml             Build + deploy to Cloudflare Pages: production on push to main, a preview on pull requests.
  codeql.yml             CodeQL static analysis.
  dependency-review.yml  Flag vulnerable/incompatible-license dependencies on pull requests.
  scorecard.yml          OpenSSF Scorecard: grades the repo's whole security posture (token
                         permissions, branch protection, pinned dependencies, etc.) weekly and
                         on push to main.
  actionlint.yml         Lint the GitHub Actions workflow files themselves.
  link-check.yml         Lint outbound/internal links in the built export + docs.
  lighthouse.yml         Gate PRs on Lighthouse performance/accessibility/best-practices/SEO
                         budgets (see .lighthouserc.json).
  visual-regression.yml  Playwright screenshot diff against the committed baselines in
                         e2e/visual.spec.ts-snapshots/ (see `npm run test:visual`).
```

## Link check

[`.github/workflows/link-check.yml`](./.github/workflows/link-check.yml) builds the static
export and runs [`lychee`](https://github.com/lycheeverse/lychee-action) against `out/**/*.html`
and the root Markdown docs, on PRs that touch `app/`, `public/`, or `*.md`, and weekly on a
schedule so third-party link rot is caught even without a code change. Excludes and retry/UA
settings live in [`.lychee.toml`](./.lychee.toml).

## Deploying

Deployment is automated. Every push to `main` runs
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), which builds the static
export and publishes `out/` to Cloudflare Pages (project `moadim-landing`) via
[`wrangler`](https://developers.cloudflare.com/workers/wrangler/). The workflow can also be
triggered manually from the Actions tab (`workflow_dispatch`). After the upload, a smoke-test
step requests `https://moadim.io` and fails the job if the live site doesn't respond or its
body no longer mentions "Moadim" — a successful `wrangler` upload alone doesn't prove the
production URL is actually serving the new build.

Pull requests get their own Cloudflare Pages preview instead: the same workflow builds the
export and deploys it to a per-branch preview URL (production is untouched), and posts the
preview link to the job summary and a sticky PR comment. Previews only run for PRs from
branches in this repo — forked PRs don't have access to the Cloudflare secrets.

Because the build is a fully static export, the same `out/` directory can be served from any
static host — running `npm run build` locally and uploading `out/` to Vercel, Netlify, GitHub
Pages, or an S3 bucket behind a CDN works without any of the Cloudflare-specific tooling.

### Confirming what's live

Every build embeds its provenance at `https://moadim.io/version.json` — `{ "commit", "ref",
"builtAt" }`. `deploy.yml` populates it from `GITHUB_SHA`/`GITHUB_REF_NAME`/the build
timestamp; a local `npm run build` falls back to `"dev"` for all three. Use it to confirm a
push actually shipped instead of guessing from a `wrangler` exit code or a `<head>` diff.

### Search-engine verification (optional)

To verify the site in **Google Search Console** / **Bing Webmaster Tools**, set the
ownership tokens as build-time environment variables:

| Variable | Source |
| --- | --- |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console → add property → "HTML tag" method |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools → add site → "Meta tag" method |

When a variable is set, the build renders the matching `<meta>` tag into the static export;
when unset, no tag is emitted. These tokens are public (non-secret) identifiers — set them in
the deploy build environment rather than committing them.

To try one locally, copy [`.env.example`](./.env.example) to `.env.local`, fill in the token,
and restart `npm run dev` or `npm run build` — Next.js loads `.env.local` automatically and
it's git-ignored, so the value never gets committed.

## Security

Found a vulnerability in the site or its build pipeline? Please report it
privately — see [`SECURITY.md`](./SECURITY.md). Do not open a public issue.

## License

Released under the [MIT License](./LICENSE).
