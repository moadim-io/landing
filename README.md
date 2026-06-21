# Moadim — Landing Site

[![Deploy to Cloudflare Pages](https://github.com/moadim-io/landing/actions/workflows/deploy.yml/badge.svg)](https://github.com/moadim-io/landing/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Live site](https://img.shields.io/badge/live-moadim.io-ffd400)](https://moadim.io)

The marketing/landing site for **Moadim**, an open-source loop engine for AI agents.
Define a loop — a prompt, a schedule, an agent — and it runs Claude, Codex, or Hermes
against your repo on every tick, over MCP and REST.

- **Live site:** https://moadim.io
- **Product source:** https://github.com/moadim-io/daemon

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

```
app/
  layout.tsx            Root layout, fonts, and site metadata (SEO / Open Graph).
  page.tsx              Landing page content.
  site.ts               Shared site constants (canonical SITE_URL).
  globals.css           Global styles and Tailwind theme tokens.
  opengraph-image.tsx   Generated Open Graph social card.
  twitter-image.tsx     Generated Twitter/X social card.
  robots.ts             Generated robots.txt.
  sitemap.ts            Generated sitemap.xml.
  favicon.ico           Site favicon.
```

## Deploying

`npm run build` emits a static site to `out/`. Deploy that directory to any static host
(e.g. Vercel, Netlify, Cloudflare Pages, GitHub Pages, or an S3 bucket behind a CDN).

## Security

Found a vulnerability in the site or its build pipeline? Please report it
privately — see [`SECURITY.md`](./SECURITY.md). Do not open a public issue.

## License

Released under the [MIT License](./LICENSE).
