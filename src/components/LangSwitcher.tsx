"use client";

import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { locales, type Locale } from "@/i18n/config";
import { routes, routeKeyFromSlug } from "@/i18n/routes";

export default function LangSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const still = useReducedMotion();
  const index = locales.indexOf(lang);

  function switchTo(target: Locale) {
    const segments = (pathname || `/${lang}`).split("/");
    segments[1] = target; // replace the locale segment

    // The slug is localised too, so swapping only the locale would send a
    // reader of /fr/conditions-generales to /nl/conditions-generales, which
    // does not exist. Translate the slug along with the language.
    const key = segments[2] ? routeKeyFromSlug(lang, segments[2]) : null;
    if (key) segments[2] = routes[key][target];

    router.push(segments.join("/") || `/${target}`);
  }

  return (
    <div className="relative flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
      {/* One pill that slides, rather than a shared layout animation per
          button. layoutId would drag in Motion's layout feature bundle, and
          this is the only place on the site that needed it. The buttons are
          flex-1 and hold two monospaced characters each, so thirds line up. */}
      <span
        aria-hidden
        className="absolute bottom-0.5 left-0.5 top-0.5 rounded-md bg-amber"
        style={{
          width: `calc((100% - 0.25rem) / ${locales.length})`,
          transform: `translateX(${index * 100}%)`,
          transition: still ? "none" : "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      {locales.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            onClick={() => switchTo(l)}
            aria-current={active ? "true" : undefined}
            className={`relative min-h-[32px] flex-1 rounded-md px-2 py-1 font-mono text-[11px] transition-colors duration-200 ${
              active ? "text-black" : "text-rook hover:text-zand"
            }`}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
