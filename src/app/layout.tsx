import type { Metadata } from "next";
import { headers } from "next/headers";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import { defaultLocale } from "@/i18n/config";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "SD Light and Sound",
  description: "Licht · Klank · Beleving",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = headers().get("x-lang") ?? defaultLocale;
  return (
    <html lang={lang} className={`${sora.variable} ${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
