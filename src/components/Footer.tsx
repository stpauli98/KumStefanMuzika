import Link from "next/link";
import { SITE } from "@/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export default function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-site">
        <div className="flex flex-wrap justify-between gap-6">
          <div>
            <Link href={`/${lang}`} className="font-display text-[20px] font-extrabold text-chrome">
              SD LIGHT AND SOUND
            </Link>
            <div className="mt-2 text-[13.5px] text-rook">{dict.foot.tag}</div>
          </div>

          <div className="text-[13.5px] leading-[1.8] text-rook">
            {SITE.address}
            <br />
            <a href={`mailto:${SITE.email}`} className="text-amber">
              {SITE.email}
            </a>
            <br />
            {SITE.phoneDisplay}
          </div>

          <div className="text-[13.5px] leading-[1.8] text-rook">
            {dict.foot.area}
            <br />
            {dict.foot.langs}
            <br />
            <Link href={`/${lang}/privacy`} className="hover:text-amber">
              {dict.foot.privacy}
            </Link>
            {" · "}
            <Link href={`/${lang}/voorwaarden`} className="hover:text-amber">
              {dict.foot.terms}
            </Link>
          </div>
        </div>

        <div className="powered mt-6">POWERED BY&nbsp; {SITE.poweredBy}</div>
        <div className="mt-2 text-xs text-[#5b5e66]">
          {dict.foot.credit}{" "}
          <a href={SITE.agency.url} className="text-amber">
            {SITE.agency.name}
          </a>
        </div>
      </div>
    </footer>
  );
}
