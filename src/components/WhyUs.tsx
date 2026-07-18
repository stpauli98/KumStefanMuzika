import type { Dictionary } from "@/i18n/dictionaries";

export default function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section id="waarom" className="border-t border-line py-[72px]">
      <div className="container-site">
        <p className="eyebrow">{dict.why.eyebrow}</p>
        <h2 className="h2 mb-8">{dict.why.title}</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {dict.why.items.map((it, i) => (
            <div key={i} className="border-t-2 border-amber px-1 pt-[18px]">
              <div className="mb-2 font-mono text-xs text-rook">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4 className="mb-1.5 font-display text-base font-bold text-white">{it.title}</h4>
              <p className="text-[13.5px] text-rook">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
