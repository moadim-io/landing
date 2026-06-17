import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moadim.io"),
  title: {
    default: "Moadim — Cron jobs over MCP & REST",
    template: "%s — Moadim",
  },
  description:
    "Moadim is an open-source MCP and REST server for scheduling and managing cron jobs — built for AI agents and developers.",
  openGraph: {
    title: "Moadim — Cron jobs over MCP & REST",
    description:
      "Moadim is an open-source MCP and REST server for scheduling and managing cron jobs — built for AI agents and developers.",
    url: "https://moadim.io",
    siteName: "Moadim",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moadim — Cron jobs over MCP & REST",
    description:
      "Moadim is an open-source MCP and REST server for scheduling and managing cron jobs — built for AI agents and developers.",
  },
};

// The page ships a `prefers-color-scheme` dark theme (see globals.css), but
// without these declarations the browser still renders native UI — scrollbars,
// form controls, the mobile address bar — in its default light palette, which
// clashes with the dark page. `colorScheme` opts those surfaces into matching
// the active theme; `themeColor` tints the mobile browser chrome to match the
// real background colors (#ffffff light, #0a0a0a dark).
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Moadim",
  url: "https://moadim.io",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux, macOS, Windows",
  description:
    "Moadim is an open-source MCP and REST server for scheduling and managing cron jobs — built for AI agents and developers.",
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
        {children}
      </body>
    </html>
  );
}
