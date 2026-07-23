import type { Metadata } from "next";
import { headers } from "next/headers";
import { Archivo, Archivo_Narrow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { defaultLocale } from "@/i18n/config";
import "./globals.css";

// One superfamily across the site. The width axis is what lets headings go
// expanded while body copy stays at normal width.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});
const archivoNarrow = Archivo_Narrow({
  subsets: ["latin"],
  variable: "--font-narrow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SD Light and Sound",
  description: "Licht · Klank · Beleving",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = headers().get("x-lang") ?? defaultLocale;
  return (
    <html lang={lang} className={`${archivo.variable} ${archivoNarrow.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
