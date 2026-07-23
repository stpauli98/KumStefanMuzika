import Link from "next/link";
import { SITE } from "@/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <footer className="section-line relative py-14">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link
              href={`/${lang}`}
              className="font-display text-[20px] font-extrabold text-chrome"
            >
              SD LIGHT AND SOUND
            </Link>
            <p className="mt-3 max-w-[32ch] text-[13.5px] leading-relaxed text-rook">
              {dict.foot.tag}
            </p>
          </div>

          <div className="text-[13.5px] leading-[1.9] text-rook">
            {SITE.address}
            <br />
            <a href={`mailto:${SITE.email}`} className="text-amber transition-opacity hover:opacity-80">
              {SITE.email}
            </a>
            <br />
            <a href={`tel:${SITE.phoneHref}`} className="link-quiet">
              {SITE.phoneDisplay}
            </a>
          </div>

          <div className="text-[13.5px] leading-[1.9] text-rook">
            {dict.foot.area}
            <br />
            {dict.foot.langs}
            <br />
            <Link href={`/${lang}/privacy`} className="link-quiet">
              {dict.foot.privacy}
            </Link>
            <span className="px-1.5 text-white/20">·</span>
            <Link href={`/${lang}/voorwaarden`} className="link-quiet">
              {dict.foot.terms}
            </Link>
          </div>
        </div>

        <div className="truss my-8" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="powered">
            POWERED BY&nbsp; <b>{SITE.poweredBy}</b>
          </div>
          <div className="text-xs text-rook">
            {dict.foot.credit}{" "}
            <a
              href={SITE.agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber transition-opacity hover:opacity-80"
            >
              {SITE.agency.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
