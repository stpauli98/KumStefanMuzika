import type { Dictionary } from "@/i18n/dictionaries";

export default function Realisaties({ dict }: { dict: Dictionary }) {
  return (
    <section id="realisaties" className="border-t border-line py-[72px]">
      <div className="container-site">
        <p className="eyebrow">{dict.real.eyebrow}</p>
        <h2 className="h2 mb-8">{dict.real.title}</h2>

        <div className="rounded-2xl border border-line bg-surf px-6 py-12 text-center">
          <div className="mb-3.5 flex justify-center text-amber/70">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 15l5-4 4 3 3-2 6 4" />
              <circle cx="8" cy="9" r="1.4" />
            </svg>
          </div>
          <p className="mx-auto max-w-[44ch] text-rook">{dict.real.empty}</p>
        </div>
      </div>
    </section>
  );
}
