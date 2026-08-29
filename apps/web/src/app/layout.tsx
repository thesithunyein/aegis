import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aegis — Autonomous Intelligence, Verified On-Chain",
  description:
    "AI that manages your DeFi portfolio and proves every decision on-chain. No black boxes. No blind trust.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
