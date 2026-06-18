import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

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
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
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
