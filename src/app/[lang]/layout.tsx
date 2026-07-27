import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Narrow } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/i18n/metadata";
import "../globals.css";

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

export const viewport: Viewport = {
  themeColor: "#08080A",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const lang: Locale = params.lang;
  const dict = await getDictionary(lang);
  const base = localizedMetadata(lang);
  return {
    ...base,
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      ...base.openGraph,
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

// This is the root layout: it owns <html>/<body>. Keeping it here (rather than
// at app/) means `lang` comes from the route params, so every page can be
// statically rendered instead of forced dynamic by reading a request header.
export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Pages reject unknown locales with notFound(); the layout only needs a
  // sane lang attribute for the 404 that gets rendered inside it.
  const lang = isLocale(params.lang) ? params.lang : defaultLocale;
  return (
    <html
      lang={lang}
      className={`${archivo.variable} ${archivoNarrow.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
