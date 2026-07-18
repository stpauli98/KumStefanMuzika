import type { MetadataRoute } from "next";
import { SITE } from "@/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", "/privacy", "/voorwaarden"];
  return locales.flatMap((lang) =>
    paths.map((p) => ({
      url: `${SITE.url}/${lang}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.3,
    })),
  );
}
