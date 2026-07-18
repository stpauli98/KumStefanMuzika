import type { Dictionary } from "@/i18n/dictionaries";

const ICONS: React.ReactNode[] = [
  // Sound
  <svg key="s" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <circle cx="12" cy="14" r="4" />
    <circle cx="12" cy="7" r="1.3" />
  </svg>,
  // Light
  <svg key="l" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1-1 2H9c0-1-.3-1.4-1-2A6 6 0 0 1 12 3z" />
  </svg>,
  // LED wall
  <svg key="d" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <rect x="3" y="4" width="18" height="13" rx="1.5" />
    <path d="M7 8h.01M11 8h.01M15 8h.01M7 12h.01M11 12h.01M15 12h.01" />
  </svg>,
  // Stage & truss
  <svg key="p" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <path d="M3 7h18M3 7l3 13M21 7l-3 13M6 20h12" />
    <path d="M6 7l2-3h8l2 3" />
  </svg>,
  // DJ
  <svg key="j" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="2.4" />
  </svg>,
  // Effects
  <svg key="f" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
  </svg>,
];

export default function Services({ dict }: { dict: Dictionary }) {
  return (
    <section id="diensten" className="border-t border-line py-[72px]">
      <div className="container-site">
        <p className="eyebrow">{dict.diensten.eyebrow}</p>
        <h2 className="h2">{dict.diensten.title}</h2>
        <p className="sec-sub mb-8">{dict.diensten.sub}</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {dict.diensten.items.map((it, i) => (
            <div
              key={i}
              className="card transition hover:-translate-y-1 hover:border-[#4a3a1f]"
            >
              <div className="mb-3.5 text-amber">{ICONS[i]}</div>
              <h4 className="mb-1.5 font-display text-[17px] font-bold text-white">{it.title}</h4>
              <p className="text-sm text-rook">{it.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-[18px] rounded-xl border border-dashed border-[#3a3b42] px-[18px] py-3.5 text-sm text-[#C7C2B7]">
          <b className="font-semibold text-amber">{dict.diensten.extraLead}</b>{" "}
          {dict.diensten.extraBody}
        </div>
      </div>
    </section>
  );
}
