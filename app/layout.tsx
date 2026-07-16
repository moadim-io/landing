import type { Metadata, Viewport } from "next";
import Link from "next/link";
// `next/font/google` fetches the font files from Google's CDN during
// `next build`, so a build with no network access (or a Google Fonts outage)
// fails outright. The `geist` package ships the same Geist Sans/Mono font
// files locally (via `next/font/local` under the hood), so the build never
// depends on an external network call.
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SITE_URL, REPO_URL, ORG_URL, SITE_TITLE, SITE_DESCRIPTION } from "./site";
import { ExternalLink } from "./ExternalLink";
import { JsonLdScript } from "./JsonLdScript";
import { SkipLink } from "./SkipLink";

// Search-engine ownership-verification tokens, read at build time so nothing
// sensitive lands in the repo and the tags can differ per environment. They are
// public (non-secret) identifiers. When a token is unset, its `<meta>` tag is
// omitted entirely — see `verification` below. Set these in the deploy build
// env (e.g. Cloudflare Pages / Actions). See README "Deploying".
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

// Paint the mobile browser chrome (address bar / status bar) in the brand
// page background instead of the default white, so the UI extends the
// neobrutalist palette edge-to-edge. Matches `--background` in globals.css.
export const viewport: Viewport = {
  // The site is a single light-mode neobrutalist palette with no dark theme.
  // Declaring `light` emits <meta name="color-scheme" content="light">, so a
  // dark-mode browser renders native UI — form controls, scrollbars, and the
  // pre-paint canvas — in light too, instead of inverting them against the
  // cream `--background`.
  colorScheme: "light",
  themeColor: "#f4f1e8",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Moadim",
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  // Explicit indexability + large-image-preview opt-in. With nothing set,
  // Google's default (`max-image-preview:standard`) only ever shows a small
  // thumbnail of the Open Graph card in Search/Discover, regardless of how
  // much the card itself is invested in. This is a per-document <meta
  // name="robots"> directive — distinct from `app/robots.ts`, which emits
  // the site-wide robots.txt crawl directive. See #143.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Moadim",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  // Ownership-verification meta tags for Google Search Console / Bing Webmaster
  // Tools. Each tag is emitted only when its build-time token is set, so an
  // unconfigured environment produces no empty/garbage tag.
  verification: {
    google: googleSiteVerification,
    ...(bingSiteVerification
      ? { other: { "msvalidate.01": bingSiteVerification } }
      : {}),
  },
  // iOS home-screen / standalone presentation. When the site is added to the
  // home screen, launch it chromeless under the Moadim name with a status bar
  // that matches the neobrutalist light palette (emits
  // `apple-mobile-web-app-*` meta tags) instead of Safari's defaults.
  appleWebApp: {
    capable: true,
    title: "Moadim",
    statusBarStyle: "default",
  },
  // The copy carries no phone numbers, yet mobile Safari heuristically turns
  // version-like and identifier strings (e.g. `moadim-io/daemon`) into tap-to-
  // call links. Opt out so no body text is silently rewritten into a `tel:`.
  formatDetection: {
    telephone: false,
  },
};

// @id anchors so the Organization, WebSite, and SoftwareApplication nodes
// below can cross-reference each other within the same @graph instead of
// each carrying a duplicate, divergence-prone copy of the brand identity.
const organizationId = `${SITE_URL}/#organization`;

const organization = {
  "@type": "Organization",
  "@id": organizationId,
  name: "Moadim",
  url: SITE_URL,
  // app/icon.svg is Moadim's brand mark today (it replaced the
  // create-next-app scaffold favicon back in #161), but it's an SVG and
  // Google's structured-data guidelines for the Logo rich result only
  // support raster formats (JPG/PNG/WebP) — the generated OG card, already
  // a raster PNG, is used here instead.
  logo: `${SITE_URL}/opengraph-image`,
  // The GitHub org is the authoritative profile for the "Moadim" entity
  // itself (distinct from the SoftwareApplication.sameAs links below, which
  // point at the *product's* distribution channels) — this is what lets
  // search engines resolve the Organization node to a known, verifiable
  // profile instead of an isolated, unconfirmed name.
  sameAs: [ORG_URL],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Moadim",
  url: SITE_URL,
  publisher: { "@id": organizationId },
};

const softwareApplication = {
  "@type": "SoftwareApplication",
  name: "Moadim",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  // macOS and Linux only: loops fire from the OS crontab inside a tmux
  // session and are kept alive by launchd / systemd — all Unix-only. The
  // hero install card ("Unix-like OS with tmux and a cron daemon") and the
  // FAQ ("macOS and Linux") say the same; advertising Windows here would let
  // search engines surface the app for an unsupported platform.
  operatingSystem: "macOS, Linux",
  description: SITE_DESCRIPTION,
  sameAs: [
    "https://github.com/moadim-io/daemon",
    "https://crates.io/crates/moadim",
  ],
  license: "https://opensource.org/licenses/MIT",
  // Static export emits this route as `opengraph-image` with no extension (see
  // `scripts/verify-export.mjs`) — the hardcoded ".png" 404'd in production.
  image: `${SITE_URL}/opengraph-image`,
  codeRepository: "https://github.com/moadim-io/daemon",
  downloadUrl: "https://crates.io/crates/moadim",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: { "@id": organizationId },
};

export const jsonLd: {
  "@context": string;
  "@graph": [typeof organization, typeof website, typeof softwareApplication];
} = {
  "@context": "https://schema.org",
  "@graph": [organization, website, softwareApplication],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <JsonLdScript data={jsonLd} />
        {/* Site banner landmark: gives assistive-tech users a top-level `banner`
            region to land on, plus a persistent Moadim wordmark for brand
            identity. The hero's <header> sits inside <main>, so it does not
            expose a banner — this does. */}
        <header className="border-b-4 border-black bg-background">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-8">
            <Link
              href="/"
              className="text-2xl font-black uppercase tracking-tight"
              aria-label="Moadim home"
            >
              moadim<span className="text-accent">.</span>
            </Link>
            {/* Intentionally no per-link focus-ring utility classes on these
                two links: globals.css declares an unlayered :focus-visible
                rule (solid 3px ring in the --foreground token, 3px offset)
                that always wins the cascade over any Tailwind focus-visible
                utility, which Tailwind v4 emits inside a lower-priority
                @layer. Per the CSS cascade-layers spec, unlayered rules beat
                layered ones regardless of selector specificity or source
                order, so a same-purpose utility applied here would compile
                but never actually render — dead, misleading markup. Rely on
                the global rule instead, as every other link on the site
                does. */}
            <nav aria-label="Site navigation">
              {/* Tailwind's Preflight resets `list-style: none` on every <ul>,
                  which in Safari/VoiceOver also strips the implicit
                  `list`/`listitem` role — a long-documented WebKit quirk
                  (https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html).
                  `role="list"` restores it in the accessibility tree without
                  changing anything visually. jsx-a11y flags this as a
                  "redundant" role since <ul> already implies it per the ARIA
                  spec — that mapping is correct, WebKit's actual behavior
                  isn't, so the rule is disabled for this one, deliberate
                  case. */}
              {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
              <ul className="flex items-center gap-6" role="list">
                <li>
                  <ExternalLink
                    href={`${REPO_URL}#readme`}
                    className="text-sm font-bold uppercase tracking-wide hover:text-accent"
                    aria-label="Docs"
                  >
                    Docs
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink
                    href={REPO_URL}
                    className="text-sm font-bold uppercase tracking-wide hover:text-accent"
                    aria-label="GitHub"
                  >
                    GitHub
                  </ExternalLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
