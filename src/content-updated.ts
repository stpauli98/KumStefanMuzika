import type { RouteKey } from "@/i18n/routes";

// `lastmod` in the sitemap is only worth sending if it marks a real change to
// the page's content. Deriving it from the build date — `new Date()` at build
// time — makes every deploy claim that all pages changed, including deploys
// that only touched CSS. Google notices that and stops trusting the field.
//
// So these are maintained by hand: bump the date when the copy on that page
// actually changes, and leave it alone otherwise.
export const CONTENT_UPDATED: Record<RouteKey | "home", string> = {
  home: "2026-07-27",
  privacy: "2026-07-27",
  terms: "2026-07-27",
};
