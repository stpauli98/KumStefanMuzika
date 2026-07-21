import type { Dictionary } from "@/i18n/dictionaries";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

export default function Realisaties({ dict }: { dict: Dictionary }) {
  return (
    <section id="realisaties" className="section section-line">
      <div className="container-site">
        <Reveal>
          <p className="eyebrow">{dict.real.eyebrow}</p>
          <h2 className="h2 mb-10">{dict.real.title}</h2>
        </Reveal>

        {/* Frames waiting for photography — reserved, lit, and clearly empty
            rather than pretending there is work to show. */}
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <StaggerItem key={i}>
              <div className="glass relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                <span
                  aria-hidden
                  className="shimmer-surface absolute inset-0 animate-shimmer"
                  style={{ animationDelay: `${i * 0.8}s` }}
                />
                <span
                  aria-hidden
                  className="absolute inset-4 rounded-xl border border-dashed border-white/10"
                />
                <svg
                  aria-hidden
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.4}
                  className="relative text-amber/50"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 15l5-4 4 3 3-2 6 4" />
                  <circle cx="8" cy="9" r="1.4" />
                </svg>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-[46ch] text-center text-sm text-rook">
            {dict.real.empty}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
