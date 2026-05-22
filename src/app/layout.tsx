import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";

export const metadata: Metadata = {
  title: "UNIVERSE — ОДЕЖДА • ТРЕНДЫ • СТИЛЬ • МАНЕРА",
  description:
    "ОДЕЖДА • ТРЕНДЫ • СТИЛЬ • МАНЕРА. Откройте для себя мир стиля и моды.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollIndicator />
      </body>
    </html>
  );
}
