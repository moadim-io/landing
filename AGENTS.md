<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

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
| `npm run dev` | Local dev server with hot reload (http://localhost:3000). |
| `npm run build` | Static export to `out/`. Run this to validate a change end-to-end. |
| `npm run start` | Serve the production build locally. |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript). |

Before opening a PR, make sure `npm run lint` **and** `npm run build` both pass — the
build is the real gate, since static export surfaces errors `dev` tolerates.

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

## Where things live

```
app/
  layout.tsx            Root layout: fonts, <html lang>, site metadata, JSON-LD.
  page.tsx              Landing page content.
  not-found.tsx         Branded 404 route (statically prerendered).
  site.ts               Single source of truth for SITE_URL — import it, don't hardcode the origin.
  globals.css           Theme tokens + global styles.
  opengraph-image.tsx   Generated OG card (file-based metadata route).
  twitter-image.tsx     Generated Twitter card.
  sitemap.ts            /sitemap.xml (force-static).
  robots.ts             /robots.txt (force-static).
  favicon.ico           Site favicon.
public/                 Static assets served at the site root.
```
