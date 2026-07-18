import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import LangSwitcher from "./LangSwitcher";

export default function Nav({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const links = [
    { href: "#diensten", label: dict.nav.diensten },
    { href: "#materiaal", label: dict.nav.materiaal },
    { href: "#realisaties", label: dict.nav.realisaties },
    { href: "#over", label: dict.nav.over },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-black/80 backdrop-blur-md">
      <div className="container-site flex h-16 items-center gap-4 md:gap-5">
        <Link href={`/${lang}`} className="mr-auto flex items-baseline gap-2">
          <span className="font-display text-[22px] font-extrabold text-chrome">SD</span>
          <span className="font-display text-[9px] font-semibold tracking-[0.28em] text-rook">
            LIGHT AND SOUND
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[#C7C2B7] hover:text-amber">
              {l.label}
            </a>
          ))}
        </div>

        <LangSwitcher lang={lang} />

        <a
          href="#offerte"
          className="btn btn-primary hidden px-4 py-2 text-[13px] md:inline-flex"
        >
          {dict.nav.cta}
        </a>
      </div>
    </nav>
  );
}
