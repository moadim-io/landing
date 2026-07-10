/**
 * Cloudflare Web Analytics beacon: a cookieless, privacy-respecting page-view
 * counter with no PII, no cross-site tracking, and no consent banner required
 * (see #83). The site's static export already deploys to Cloudflare Pages
 * (see .github/workflows/deploy.yml), so Cloudflare's own first-party
 * analytics needs no extra infrastructure beyond this beacon tag.
 *
 * Opt-in via NEXT_PUBLIC_CF_BEACON_TOKEN (see .env.example) so local
 * development and forks emit no traffic to a production analytics account by
 * default — the same unset-by-default pattern `layout.tsx` already uses for
 * the Search Console / Bing verification tokens. Renders nothing when the
 * token is unset.
 */
export function CloudflareBeacon() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (!token) {
    return null;
  }

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
