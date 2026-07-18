type LegalBlock = {
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string }[];
};

export default function LegalArticle({ block }: { block: LegalBlock }) {
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
      </article>
    </section>
  );
}
