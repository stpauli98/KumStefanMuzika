import type { MetadataRoute } from "next";
import { SITE } from "@/site";
import { defaultLocale } from "@/i18n/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "SD Light & Sound",
    description: "Licht · Klank · Beleving",
    start_url: `/${defaultLocale}`,
    display: "standalone",
    background_color: "#08080A",
    theme_color: "#08080A",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
