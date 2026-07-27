import type { MetadataRoute } from "next";
import { SITE } from "@/site";
import { locales } from "@/i18n/config";
import { routeKeys, pathFor } from "@/i18n/routes";
import { CONTENT_UPDATED } from "@/content-updated";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = locales.map((lang) => ({
    url: `${SITE.url}/${lang}`,
    lastModified: CONTENT_UPDATED.home,
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  // Legal pages change when the law or the company details change, not monthly.
  const legal = locales.flatMap((lang) =>
    routeKeys.map((key) => ({
      url: `${SITE.url}${pathFor(key, lang)}`,
      lastModified: CONTENT_UPDATED[key],
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  );

  return [...home, ...legal];
}
