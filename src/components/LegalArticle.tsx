import { SITE } from "@/site";

type LegalBlock = {
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string }[];
};

type Identity = { h: string; enterprise: string; vat: string };

export default function LegalArticle({
  block,
  identity,
}: {
  block: LegalBlock;
  identity: Identity;
}) {
  return (
    <section className="border-t border-line py-[72px]">
      <article className="container-site max-w-[760px]">
        <h1 className="h2">{block.title}</h1>
        {block.updated ? (
          <p className="mt-2 font-mono text-xs text-rook">{block.updated}</p>
        ) : null}
        <p className="mt-5 text-[#C7C2B7]">{block.intro}</p>

        {block.sections.map((s, i) => (
          <div key={i} className="mt-7">
            <h2 className="font-display text-lg font-bold text-white">{s.h}</h2>
            <p className="mt-2 text-[15px] text-[#C7C2B7]">{s.p}</p>
          </div>
        ))}

        {/* Operator identification, kept on both legal pages so it stays
            permanently accessible as Belgian law requires. */}
        <div className="mt-12 border-t border-line pt-6">
          <h2 className="font-display text-lg font-bold text-white">{identity.h}</h2>
          <div className="mt-2 text-[15px] leading-[1.9] text-[#C7C2B7]">
            {SITE.name}
            <br />
            {SITE.address}, België
            {SITE.enterpriseNumber ? (
              <>
                <br />
                {identity.enterprise}: {SITE.enterpriseNumber}
                <br />
                {identity.vat}: BE {SITE.enterpriseNumber}
              </>
            ) : null}
            <br />
            <a href={`mailto:${SITE.email}`} className="link-quiet">
              {SITE.email}
            </a>
            <br />
            <a href={`tel:${SITE.phoneHref}`} className="link-quiet">
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
