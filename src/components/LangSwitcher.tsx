"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export default function LangSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(target: Locale) {
    const segments = (pathname || `/${lang}`).split("/");
    segments[1] = target; // replace the locale segment
    router.push(segments.join("/") || `/${target}`);
  }

  return (
    <div className="flex gap-0.5 rounded-lg border border-line p-0.5">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-current={l === lang}
          className={`rounded-md px-2 py-1 font-mono text-[11px] transition ${
            l === lang ? "bg-amber text-black" : "text-rook hover:text-zand"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
