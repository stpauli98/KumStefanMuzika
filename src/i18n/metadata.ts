import type { Metadata } from "next";
import { SITE } from "@/site";
import { locales, type Locale } from "./config";

const ogLocales: Record<Locale, string> = {
  nl: "nl_BE",
  fr: "fr_BE",
  en: "en_US",
};

// Canonical + hreflang + OpenGraph basis for a route. `path` is the
// locale-less pathname ("" for the homepage, "/privacy", ...).
export function localizedMetadata(lang: Locale, path = ""): Metadata {
  const languages = Object.fromEntries(
    locales.map((l) => [l, `/${l}${path}`]),
  );
  return {
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: `/${lang}${path}`,
      languages: { ...languages, "x-default": `/nl${path}` },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      url: `/${lang}${path}`,
      locale: ogLocales[lang],
      alternateLocale: locales
        .filter((l) => l !== lang)
        .map((l) => ogLocales[l]),
    },
  };
}
