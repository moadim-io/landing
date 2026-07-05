import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit directory-style routes (`out/<route>/index.html`) so static hosts like
  // Cloudflare Pages resolve clean, trailing-slash URLs consistently and don't
  // 404 on `/route` vs `/route.html` mismatches as pages are added.
  trailingSlash: true,
  env: {
    // Which commit produced this build, so a live deploy can be checked against `git log`
    // for traceability (rendered as a <meta> tag in `app/layout.tsx`). GITHUB_SHA is set
    // automatically inside GitHub Actions; local/dev builds fall back to "dev". Remapped
    // here (rather than requiring a `NEXT_PUBLIC_`-prefixed CI secret) since GITHUB_SHA
    // itself isn't prefixed and Next only auto-inlines `NEXT_PUBLIC_*` env vars.
    NEXT_PUBLIC_BUILD_SHA: process.env.GITHUB_SHA ?? "dev",
  },
};

export default nextConfig;
