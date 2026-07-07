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
| `npm run lint` | Run ESLint (Next.js core-web-vitals + TypeScript + `jsx-a11y` recommended rules); fails on any warning (`--max-warnings 0`). |
| `npm run lint:md` | Lint Markdown files with `markdownlint-cli2`. |
| `npm run typecheck` | Type-check the whole project with `tsc --noEmit` (catches errors in files `next build`'s own TypeScript pass skips, e.g. `*.test.ts`). |
| `npm test` | Run the Vitest unit/component test suite once (tests live next to the code they cover, e.g. `app/page.test.tsx`). |
| `npm run test:watch` | Run the Vitest suite in watch mode. |
| `npm run build` | Produce the static export in `out/`. |
| `npm run verify:export` | Check that the built `out/` directory actually contains the routes/files a static export must ship (CI runs this after every build, before deploy). |
| `npm run start` | Serve the production build locally. |
| `actionlint` | Lint `.github/workflows/**` YAML (and embedded shell via shellcheck). Install via `brew install actionlint` or see the [actionlint releases](https://github.com/rhysd/actionlint/releases). |
| `typos` | Spell-check `app/**`, `*.md`, and config files (config: [`_typos.toml`](./_typos.toml)). Install via `cargo install typos-cli` or `brew install typos-cli`, then run `typos` from the repo root. |

Page content lives under `app/` (`layout.tsx` for metadata/SEO, `page.tsx` for the
landing content, `globals.css` for styles). Static assets go in `public/`.

## Submitting a change

1. Fork the repo and create a branch (e.g. `fix/short-description`).
2. Make your change. Before opening a PR, make sure all of these pass:

   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   npm run verify:export
   ```

3. If your change touches shipped code (`app/`, `scripts/`, config, etc. —
   not just docs/Markdown), add a changeset:

   ```bash
   npx changeset
   ```

   This writes a `.changeset/<slug>.md` file with a `"landing": patch` (fix,
   hardening, test) or `"landing": minor` (new user-facing feature) header
   plus a short summary of the change — `@changesets/cli` uses these to build
   `CHANGELOG.md` and bump `package.json` on release. Pure docs/Markdown
   changes don't need one.

4. Open a pull request using the PR template. Link the related issue
   (e.g. `Closes #123`) and attach screenshots for any visual change.

## Reporting issues

Use the issue templates (Bug report / Feature request). For security
vulnerabilities, please **do not** open a public issue — see
[`SECURITY.md`](./SECURITY.md) for how to report privately.

## Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). By
participating, you are expected to uphold it.
