import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal } from "./motion/Reveal";

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section id="over" className="section section-line">
      <div className="container-site grid grid-cols-1 items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div
            className="glass relative flex aspect-square items-center justify-center overflow-hidden"
            style={{ background: "radial-gradient(120% 90% at 50% 0%, #20201b, #0c0c0e)" }}
          >
            <div aria-hidden className="truss absolute inset-x-0 top-0" />
            <div aria-hidden className="beam absolute left-1/2 top-0 h-full w-[46%] animate-beam-sway" />
            <span className="relative z-[2] font-display text-[clamp(3rem,2rem+5vw,4.5rem)] font-extrabold text-chrome">
              SD
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="eyebrow">{dict.over.eyebrow}</p>
          <h2 className="h2 mb-5">{dict.over.title}</h2>
          <p className="lead mb-4">{dict.over.p1}</p>
          <p className="lead">{dict.over.p2}</p>
        </Reveal>
      </div>
    </section>
  );
}
