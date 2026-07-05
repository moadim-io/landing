import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, REPO_URL } from "./site";
import { ExternalLink } from "./ExternalLink";
import { JsonLdScript } from "./JsonLdScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Moadim is an open-source loop engine for AI agents. Define a loop — a prompt, a schedule, an agent — and it runs Claude, Codex, or Hermes against your repo on every tick, over MCP and REST.";

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
    default: "Moadim — Put your agents on a loop",
    template: "%s — Moadim",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Moadim — Put your agents on a loop",
    description,
    url: SITE_URL,
    siteName: "Moadim",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moadim — Put your agents on a loop",
    description,
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
  // No dedicated brand mark yet (app/favicon.ico is still the create-next-app
  // scaffold icon, see #145) — the generated OG card is the closest stand-in
  // for a logo until a real mark ships.
  logo: `${SITE_URL}/opengraph-image`,
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
  description,
  sameAs: [
    "https://github.com/moadim-io/daemon",
    "https://crates.io/crates/moadim",
  ],
  license: "https://opensource.org/licenses/MIT",
  // TODO(#44): reuse a single base-URL source once base-URL centralization lands.
  image: "https://moadim.io/opengraph-image.png",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* WCAG 2.4.1 Bypass Blocks: a keyboard/screen-reader user landing on
            any page must be able to jump straight to the main content
            instead of tabbing through the banner's nav links first. `sr-only`
            keeps it invisible until it receives focus (Tab is the only way
            to reach it, so a mouse click can never trigger it — no conflict
            with the cascade-layer `:focus-visible` outline rule below,
            since this only toggles layout/visibility, not `outline`). */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border-4 focus:border-black focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:uppercase focus:tracking-wide"
        >
          Skip to main content
        </a>
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
              <ul className="flex items-center gap-6">
                <li>
                  <ExternalLink
                    href={`${REPO_URL}#readme`}
                    className="text-sm font-bold uppercase tracking-wide hover:text-accent"
                    aria-label="Docs (opens in a new tab)"
                  >
                    Docs
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink
                    href={REPO_URL}
                    className="text-sm font-bold uppercase tracking-wide hover:text-accent"
                    aria-label="GitHub (opens in a new tab)"
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
