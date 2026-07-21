"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { locales, type Locale } from "@/i18n/config";

export default function LangSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const still = useReducedMotion();

  function switchTo(target: Locale) {
    const segments = (pathname || `/${lang}`).split("/");
    segments[1] = target; // replace the locale segment
    router.push(segments.join("/") || `/${target}`);
  }

  return (
    <div className="flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
      {locales.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            onClick={() => switchTo(l)}
            aria-current={active ? "true" : undefined}
            className={`relative min-h-[32px] min-w-[36px] rounded-md px-2 py-1 font-mono text-[11px] transition-colors duration-200 ${
              active ? "text-black" : "text-rook hover:text-zand"
            }`}
          >
            {active && (
              <motion.span
                layoutId={still ? undefined : "lang-pill"}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-md bg-amber"
              />
            )}
            <span className="relative">{l.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
