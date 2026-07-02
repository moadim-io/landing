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
  // Emit a document-level <meta name="referrer">. The page links out to
  // GitHub, crates.io, and several third-party blogs; the default browser
  // policy leaks the full referrer URL on those cross-origin clicks. Pinning
  // the value keeps it deterministic across browsers and ensures only the
  // origin (never the path/query) is sent off-site, while still passing the
  // full URL on same-origin navigations.
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    title: "Moadim — Put your agents on a loop",
    description,
    url: SITE_URL,
    siteName: "Moadim",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moadim — Put your agents on a loop",
    description,
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
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
  license: "https://opensource.org/licenses/MIT",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
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
