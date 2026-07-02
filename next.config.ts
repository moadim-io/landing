import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit directory-style routes (`out/<route>/index.html`) so static hosts like
  // Cloudflare Pages resolve clean, trailing-slash URLs consistently and don't
  // 404 on `/route` vs `/route.html` mismatches as pages are added.
  trailingSlash: true,
};

export default nextConfig;
