# Contributing to the Moadim landing site

Thanks for your interest in improving [moadim.io](https://moadim.io)! This repo is
the marketing/landing site, built with **Next.js 16** (App Router) and **Tailwind
CSS**, shipped as a fully static export (`output: "export"`).

> Looking for the daemon itself? That lives at
> [moadim-io/daemon](https://github.com/moadim-io/daemon).

## Prerequisites

- **Node.js 20+** and npm (the repo targets `@types/node` v26).

## Setup

```bash
npm install
```

## Development

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server with hot reload at <http://localhost:3000>. |
| `npm run lint` | Run ESLint (Next.js core-web-vitals + TypeScript rules). |
| `npm run build` | Produce the static export in `out/`. |
| `npm run start` | Serve the production build locally. |
| `actionlint` | Lint `.github/workflows/**` YAML (and embedded shell via shellcheck). Install via `brew install actionlint` or see the [actionlint releases](https://github.com/rhysd/actionlint/releases). |

Page content lives under `app/` (`layout.tsx` for metadata/SEO, `page.tsx` for the
landing content, `globals.css` for styles). Static assets go in `public/`.

## Submitting a change

1. Fork the repo and create a branch (e.g. `fix/short-description`).
2. Make your change. Before opening a PR, make sure both pass:

   ```bash
   npm run lint
   npm run build
   ```

3. Open a pull request using the PR template. Link the related issue
   (e.g. `Closes #123`) and attach screenshots for any visual change.

## Reporting issues

Use the issue templates (Bug report / Feature request). For security
vulnerabilities, please **do not** open a public issue — see
[`SECURITY.md`](./SECURITY.md) for how to report privately.

## Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). By
participating, you are expected to uphold it.
