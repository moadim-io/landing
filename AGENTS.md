<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- markdownlint-disable-next-line MD025 -- auto-managed block above injects its own H1; this is the doc's real title -->
# Agent guide — Moadim landing site

## Stack

- **Next.js App Router** (`next@16`) with **React 19** — all routes live under `app/`.
- **Tailwind CSS v4**, wired through `@tailwindcss/postcss` (see `postcss.config.mjs`).
  There is no `tailwind.config.*`; theme tokens are declared as CSS variables in
  `app/globals.css`.
- **TypeScript** in `strict` mode (`tsconfig.json`). The `@/*` path alias maps to the repo root.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload (<http://localhost:3000>). |
| `npm run build` | Static export to `out/`. Run this to validate a change end-to-end. |
| `npm run start` | Serve the production build locally. |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript). |
| `npm run lint:html` | `html-validate` against the built `out/**/*.html` — run `npm run build` first. |
| `npm run test` | Vitest unit/component tests (`*.test.ts`/`*.test.tsx` next to the code they cover). |
| `npm run test:watch` | Vitest in watch mode. |

Before opening a PR, make sure `npm run lint`, `npm run test`, **and** `npm run build` all
pass — the build is the real gate, since static export surfaces errors `dev` tolerates.

## Static-export constraint (read before adding features)

`next.config.ts` sets `output: "export"`, so the site builds to plain HTML/CSS/JS and is
deployed to Cloudflare Pages from `out/`. There is **no Node server at runtime**, which means:

- No SSR / ISR, no `app/api/*` route handlers, no middleware, no server actions, no runtime
  `cookies()` / `headers()` / dynamic `searchParams`.
- `next/image` runs unoptimized (no on-the-fly image server).
- Metadata routes (`sitemap.ts`, `robots.ts`, and any `manifest.ts`) must be statically
  generated — keep `export const dynamic = "force-static"`.
- New routes must be fully prerenderable at build time.

## Design language

Neobrutalist. Tokens live in `app/globals.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#f4f1e8` | page background (with a faint grid overlay) |
| `--foreground` | `#0a0a0a` | text, borders |
| `--accent` | `#ffd400` | highlights, CTAs, tags |

Conventions: thick `4px` black borders, hard offset shadows
(`shadow-[10px_10px_0_0_#000]`, no blur), uppercase bold headings, and the Geist Sans / Geist
Mono fonts loaded via `next/font` in `app/layout.tsx`. Reuse these instead of inventing new
colors or soft shadows. Keyboard focus is styled centrally in `globals.css` (a solid offset
`outline`) — don't strip it per-element.

## Lint rules worth knowing

Configured in `eslint.config.mjs`:

- `no-console` — `console.log` is an error; only `console.warn` / `console.error` are allowed.
- `prefer-const` — never reassigned bindings must be `const`.

`.htmlvalidate.json` validates the *built* HTML in `out/` (`npm run lint:html`), not JSX source.
It extends `html-validate:recommended` with a few rules relaxed to match React's own SSR
serialization instead of hand-written HTML conventions — this is not a loosened gate, it's
matching the framework's real (spec-valid) output style:

- `void-style: selfclosing` — React always self-closes void elements (`<meta/>`, `<br/>`).
- `attribute-boolean-style` / `attribute-empty-style: empty` — React emits boolean/empty
  attributes as `async=""`, `hidden=""`, `crossorigin=""` rather than bare.
- `attr-case: [lowercase, camelcase]` — React's DOM attribute names (`charSet`, `fetchPriority`,
  `noModule`, `crossOrigin`) are intentionally camelCase.
- `valid-id: { relaxed: true }` — allows the underscore-led ids React's `useId()` generates
  (e.g. `_R_`), while `no-dup-id` still fails on real duplicate ids.

Everything else (duplicate ids, invalid/obsolete attributes and elements, broken nesting,
missing required attributes) stays at the `recommended` severity and still fails the build.

## Where things live

```text
app/
  layout.tsx            Root layout: fonts, <html lang>, site metadata, JSON-LD.
  page.tsx              Landing page content.
  not-found.tsx         Branded 404 route (statically prerendered).
  ExternalLink.tsx      Outbound (new-tab) link wrapper — use it for any link that leaves the site, not a raw `<a target="_blank">`.
  site.ts               Single source of truth for product identifiers: SITE_URL plus the GitHub/crates.io slugs and URLs (REPO_SLUG, REPO_URL, CRATE_NAME, CRATE_URL). Import these — don't hardcode the origin or the github.com / crates.io links.
  globals.css           Theme tokens + global styles.
  opengraph-image.tsx   Generated OG card (file-based metadata route).
  twitter-image.tsx     Generated Twitter card.
  sitemap.ts            /sitemap.xml (force-static).
  robots.ts             /robots.txt (force-static).
  favicon.ico           Site favicon.
public/                 Static assets served at the site root.
```
