import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

export default function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section id="waarom" className="section section-line">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">{dict.why.eyebrow}</p>
          <h2 className="h2 mb-10">{dict.why.title}</h2>
        </Reveal>

        {/* These are reasons, not steps, so they carry a lit bar rather than
            a sequence number. */}
        <Stagger className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {dict.why.items.map((it, i) => (
            <StaggerItem key={i}>
              <div className="group h-full">
                <span
                  aria-hidden
                  className="mb-5 block h-px w-full bg-gradient-to-r from-amber via-amber/50 to-transparent"
                />
                <h3 className="h3 mb-2">{it.title}</h3>
                <p className="text-sm leading-relaxed text-rook">{it.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
