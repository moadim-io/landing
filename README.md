# Moadim — Landing Site

The marketing/landing site for **Moadim**, an open-source MCP and REST server for
scheduling and managing cron jobs — built for AI agents and developers.

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
| `npm run lint` | Run ESLint (Next.js core-web-vitals + TypeScript rules). |

## Project structure

```
app/
  layout.tsx    Root layout, fonts, and site metadata (SEO / Open Graph).
  page.tsx      Landing page content.
  globals.css   Global styles and Tailwind theme tokens.
public/         Static assets served at the site root.
```

## Deploying

`npm run build` emits a static site to `out/`. Deploy that directory to any static host
(e.g. Vercel, Netlify, Cloudflare Pages, GitHub Pages, or an S3 bucket behind a CDN).
