import type { Dictionary } from "@/i18n/dictionaries";
import PoweredBy from "./PoweredBy";

export default function Materiaal({ dict }: { dict: Dictionary }) {
  return (
    <section id="materiaal" className="border-t border-line py-[72px]">
      <div className="container-site grid grid-cols-1 items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow">{dict.mat.eyebrow}</p>
          <h2 className="h2">{dict.mat.title}</h2>
          <p className="sec-sub">{dict.mat.body}</p>
          <div className="truss mt-[18px] mb-2" />
          <PoweredBy />
        </div>

        <div className="rounded-2xl border border-line bg-gradient-to-b from-[#141319] to-[#0c0c0e] p-8 text-center">
          <div className="font-display text-[40px] font-extrabold text-white">50 → 2000</div>
          <div className="text-[13px] text-rook">{dict.mat.cap}</div>
        </div>
      </div>
    </section>
  );
}
