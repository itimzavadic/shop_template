import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";

export const metadata: Metadata = {
  title: "ABOVE THE CLOUDS — Globally Curated Fashion, Footwear & Accessories",
  description:
    "Globally Curated Fashion, Footwear & Accessories. Discover our curated collection of premium brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollIndicator />
      </body>
    </html>
  );
}
