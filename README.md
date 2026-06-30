# Moadim — Landing Site

[![Live site](https://img.shields.io/website?url=https%3A%2F%2Fmoadim.io&label=moadim.io)](https://moadim.io)
[![Product version](https://img.shields.io/crates/v/moadim.svg?label=moadim)](https://crates.io/crates/moadim)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

The marketing/landing site for **Moadim**, an open-source loop engine for AI agents.
Define a loop — a prompt, a schedule, an agent — and it runs Claude, Codex, or Hermes
against your repo on every tick, over MCP and REST.

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
| `npm run start` | Serve the production build locally. |
| `npm run lint` | Run ESLint (Next.js core-web-vitals + TypeScript rules); fails on any warning (`--max-warnings 0`). |

## Project structure

```text
app/
  layout.tsx            Root layout, fonts, site metadata (SEO / Open Graph), JSON-LD.
  page.tsx              Landing page content.
  not-found.tsx         Branded 404 page.
  ExternalLink.tsx      Outbound (new-tab) link wrapper with the safe rel attributes.
  site.ts               Shared site constants (canonical SITE_URL).
  globals.css           Global styles and Tailwind theme tokens.
  opengraph-image.tsx   Generated Open Graph social card.
  twitter-image.tsx     Generated Twitter/X social card.
  robots.ts             Generated robots.txt.
  sitemap.ts            Generated sitemap.xml.
  favicon.ico           Site favicon.
public/
  _headers              Cloudflare Pages response headers.
.github/workflows/
  deploy.yml            Build + deploy to Cloudflare Pages on push to main.
```

## Deploying

Deployment is automated. Every push to `main` runs
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), which builds the static
export and publishes `out/` to Cloudflare Pages (project `moadim-landing`) via
[`wrangler`](https://developers.cloudflare.com/workers/wrangler/). The workflow can also be
triggered manually from the Actions tab (`workflow_dispatch`).

Because the build is a fully static export, the same `out/` directory can be served from any
static host — running `npm run build` locally and uploading `out/` to Vercel, Netlify, GitHub
Pages, or an S3 bucket behind a CDN works without any of the Cloudflare-specific tooling.

## Security

Found a vulnerability in the site or its build pipeline? Please report it
privately — see [`SECURITY.md`](./SECURITY.md). Do not open a public issue.

## License

Released under the [MIT License](./LICENSE).
