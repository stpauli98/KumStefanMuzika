import type { Locale } from "./config";

// Every page below the homepage carries a slug per language. The key is the
// stable internal name, the value is what ends up in the URL. A French visitor
// landing on /fr/voorwaarden reads a Dutch word he does not know, and the slug
// is one of the few places where a keyword still sits in plain sight — so each
// language gets its own.
//
// Changing a value here changes a live URL: add the old one to `redirects()`
// in next.config.mjs at the same time.
export const routes = {
  privacy: { nl: "privacy", fr: "confidentialite", en: "privacy" },
  terms: { nl: "voorwaarden", fr: "conditions-generales", en: "terms" },
} as const;

export type RouteKey = keyof typeof routes;

export const routeKeys = Object.keys(routes) as RouteKey[];

/** Full localised pathname, e.g. pathFor("terms", "fr") → "/fr/conditions-generales". */
export function pathFor(key: RouteKey, lang: Locale): string {
  return `/${lang}/${routes[key][lang]}`;
}

/** Reverse lookup: which page is this slug, in this language? */
export function routeKeyFromSlug(lang: Locale, slug: string): RouteKey | null {
  return routeKeys.find((key) => routes[key][lang] === slug) ?? null;
}
