import type { Dictionary } from "@/i18n/dictionaries";

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="over" className="border-t border-line py-[72px]">
      <div className="container-site grid grid-cols-1 items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-line"
          style={{ background: "radial-gradient(120% 90% at 50% 0%, #20201b, #0c0c0e)" }}>
          <div className="beam absolute left-1/2 top-0 h-full w-[40%] -translate-x-1/2" />
          <span className="relative z-[2] font-display text-[64px] font-extrabold text-chrome">SD</span>
        </div>

        <div>
          <p className="eyebrow">{dict.over.eyebrow}</p>
          <h2 className="h2 mb-3.5">{dict.over.title}</h2>
          <p className="mb-3 text-[#C7C2B7]">{dict.over.p1}</p>
          <p className="text-[#C7C2B7]">{dict.over.p2}</p>
        </div>
      </div>
    </section>
  );
}
