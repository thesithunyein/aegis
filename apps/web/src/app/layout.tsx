import type { Metadata } from "next";
import "./globals.css";

const baseUrl = "https://aegis.sithunyein.com";

export const metadata: Metadata = {
  title: "Aegis — Autonomous Intelligence, Verified On-Chain",
  description:
    "AI that manages your DeFi portfolio and proves every decision on-chain. Verifiable inference. Persistent memory. On-chain settlement.",
  keywords: [
    "DeFi",
    "AI Agent",
    "0G",
    "on-chain",
    "verifiable AI",
    "portfolio management",
    "autonomous agent",
  ],
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Aegis — Autonomous Intelligence, Verified On-Chain",
    description:
      "AI that manages your DeFi portfolio and proves every decision on-chain.",
    url: baseUrl,
    siteName: "Aegis",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aegis",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aegis — Autonomous Intelligence, Verified On-Chain",
    description:
      "AI that manages your DeFi portfolio and proves every decision on-chain.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-aegis-black text-aegis-white antialiased">
        {children}
      </body>
    </html>
  );
}
