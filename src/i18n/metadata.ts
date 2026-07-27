import type { Metadata } from "next";
import { SITE } from "@/site";
import { locales, defaultLocale, type Locale } from "./config";
import { pathFor, type RouteKey } from "./routes";

const ogLocales: Record<Locale, string> = {
  nl: "nl_BE",
  fr: "fr_BE",
  en: "en_US",
};

// Canonical + hreflang + OpenGraph basis for a route. `key` names the page;
// omit it for the homepage. Each hreflang has to point at that language's own
// slug — /fr/conditions-generales, not /fr/voorwaarden — or the alternates
// resolve to URLs that do not exist.
export function localizedMetadata(lang: Locale, key?: RouteKey): Metadata {
  const pathOf = (l: Locale) => (key ? pathFor(key, l) : `/${l}`);
  const languages = Object.fromEntries(locales.map((l) => [l, pathOf(l)]));
  return {
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: pathOf(lang),
      languages: { ...languages, "x-default": pathOf(defaultLocale) },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      url: pathOf(lang),
      locale: ogLocales[lang],
      alternateLocale: locales
        .filter((l) => l !== lang)
        .map((l) => ogLocales[l]),
    },
  };
}
