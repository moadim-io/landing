import type { Metadata } from "next";
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

// Search-result snippets and social cards truncate descriptions past ~160
// characters, so keep the key terms front-loaded ("open-source loop engine for
// AI agents") and the whole string short enough to render in full. The guard
// below fails the build if a future edit overflows the window. (#135)
const META_DESCRIPTION_MAX = 160;
const description =
  "Open-source loop engine for AI agents: a prompt, a schedule, an agent. Moadim runs Claude, Codex, or Hermes against your repo over MCP & REST.";

if (description.length > META_DESCRIPTION_MAX) {
  throw new Error(
    `Meta description is ${description.length} chars; keep it ≤${META_DESCRIPTION_MAX} to avoid SERP/social truncation.`,
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://moadim.io"),
  title: {
    default: "Moadim — Put your agents on a loop",
    template: "%s — Moadim",
  },
  description,
  openGraph: {
    title: "Moadim — Put your agents on a loop",
    description,
    url: "https://moadim.io",
    siteName: "Moadim",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moadim — Put your agents on a loop",
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Moadim",
  url: "https://moadim.io",
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
        {children}
      </body>
    </html>
  );
}
