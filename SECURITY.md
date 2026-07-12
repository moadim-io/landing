# Security Policy

## Scope

This policy covers the **Moadim landing site** in this repository — the
Next.js static export under `app/` and `public/`, plus the build and
Cloudflare Pages deploy pipeline that ships it to <https://moadim.io>.

Vulnerabilities in the `moadim` daemon itself (the product) are out of scope
here — report those via the
[daemon repository's security policy](https://github.com/moadim-io/daemon/security/policy).

## Supported versions

The landing site is a continuously deployed static site with no released
versions: only the currently deployed `main` build is supported. Please report
against the live site or the latest `main`.

| Version            | Supported          |
| ------------------ | ------------------ |
| Deployed `main`    | :white_check_mark: |
| Older commits/PRs  | :x:                |

## Reporting a vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.** A
public issue discloses the problem to everyone before a fix is deployed.

Instead, report privately through GitHub's
[Private Vulnerability Reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability):
open the repository's **Security** tab and choose **Report a vulnerability**.
This opens a private advisory visible only to the maintainers. If you cannot use
that channel, email **<ofek.gabay.he@gmail.com>**.

Please include:

- the affected URL or build (commit SHA if known),
- a description of the issue and its impact,
- steps to reproduce or a proof of concept, and
- any suggested remediation, if known.

## Response expectations

This is a small, volunteer-maintained project. We aim to acknowledge a report
within **7 days** and to keep you updated as we triage and work on a fix.
Coordinated disclosure timing will be agreed with the reporter once the impact
is understood.

## Scope and threat model

The site is a fully static export — there is no server-side runtime, database,
or user data, and no secrets are served to the browser. Reports worth filing
include:

- **Injection / XSS** in the rendered page, especially the JSON-LD structured
  data escaped and injected via `dangerouslySetInnerHTML` in
  `app/JsonLdScript.tsx` (used by both `app/layout.tsx` and `app/page.tsx`).
- **Supply-chain risks** in the build: a malicious or compromised npm
  dependency, or a tampered GitHub Actions step that runs with the deploy
  credentials.
- **Deploy/configuration flaws** such as `public/_headers` rules that weaken
  caching or security headers, or a misconfiguration that exposes the
  Cloudflare deploy token.

The Cloudflare deploy secrets (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`)
are GitHub Actions secrets, never committed to the repository; treat any path
that could exfiltrate them as in scope.
