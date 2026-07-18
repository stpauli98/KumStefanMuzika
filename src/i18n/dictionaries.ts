import type { Locale } from "./config";
import nl from "./dictionaries/nl.json";

// The Dutch dictionary is the source of truth for the shape.
export type Dictionary = typeof nl;

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  nl: () => import("./dictionaries/nl.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default as Dictionary),
  en: () => import("./dictionaries/en.json").then((m) => m.default as Dictionary),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (loaders[locale] ?? loaders.nl)();
}
