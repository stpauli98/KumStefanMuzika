import type { Dictionary } from "@/i18n/dictionaries";
import PoweredBy from "./PoweredBy";
import Counter from "./motion/Counter";
import { Reveal } from "./motion/Reveal";

export default function Materiaal({ dict }: { dict: Dictionary }) {
  return (
    <section id="materiaal" className="section section-line">
      <div className="container-site grid grid-cols-1 items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <p className="eyebrow">{dict.mat.eyebrow}</p>
          <h2 className="h2">{dict.mat.title}</h2>
          <p className="sec-sub">{dict.mat.body}</p>
          <div className="truss mb-3 mt-7" />
          <PoweredBy />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="glass relative overflow-hidden p-10 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-amber/20 blur-3xl"
            />
            <div className="relative font-display text-[clamp(2.25rem,1.4rem+3.2vw,3.25rem)] font-extrabold leading-none text-white">
              <Counter to={50} />
              <span className="mx-2 text-amber">→</span>
              <Counter to={2000} />
            </div>
            <div className="relative mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-rook">
              {dict.mat.cap}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
