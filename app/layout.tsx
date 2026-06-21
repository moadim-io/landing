import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./site";

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
  themeColor: "#f4f1e8",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Moadim — Put your agents on a loop",
    template: "%s — Moadim",
  },
  description,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Moadim",
  url: SITE_URL,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, macOS, Windows",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Site banner landmark: gives assistive-tech users a top-level `banner`
            region to land on, plus a persistent Moadim wordmark for brand
            identity. The hero's <header> sits inside <main>, so it does not
            expose a banner — this does. */}
        <header className="border-b-4 border-black bg-background">
          <div className="mx-auto flex w-full max-w-4xl items-center px-4 py-4 sm:px-8">
            <a
              href="/"
              className="text-2xl font-black uppercase tracking-tight"
              aria-label="Moadim home"
            >
              moadim<span className="text-accent">.</span>
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
