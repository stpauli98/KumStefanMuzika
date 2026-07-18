"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Fields = { naam: string; email: string; type: string; datum: string; bericht: string };
type Status = "idle" | "sending" | "ok" | "error";

export default function QuoteForm({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [f, setF] = useState<Fields>({ naam: "", email: "", type: "", datum: "", bericht: "" });
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");

  const upd =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setF((prev) => ({ ...prev, [k]: e.target.value }));

  async function send() {
    if (!f.naam || !f.email || !f.bericht) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/offerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, company }),
      });
      const json = await res.json();
      const good = res.ok && json.ok;
      setStatus(good ? "ok" : "error");
      if (good) setF({ naam: "", email: "", type: "", datum: "", bericht: "" });
    } catch {
      setStatus("error");
    }
  }

  const mailtoFallback = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Offerte — ${f.type || "event"}`,
  )}&body=${encodeURIComponent(`Naam: ${f.naam}\nE-mail: ${f.email}\n\n${f.bericht}`)}`;

  return (
    <section
      id="offerte"
      className="border-t border-line py-[72px]"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #17140f, #0B0B0D 60%)" }}
    >
      <div className="container-site">
        <p className="eyebrow">{dict.off.eyebrow}</p>
        <h2 className="h2">{dict.off.title}</h2>
        <p className="sec-sub mb-6">{dict.off.sub}</p>

        {status === "ok" ? (
          <div className="rounded-2xl border border-amber/40 bg-amber/10 px-5 py-4 text-[15px] text-zand">
            {dict.off.success}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
              <div>
                <label className="field-label">{dict.off.naam}</label>
                <input className="field" value={f.naam} onChange={upd("naam")} />
              </div>
              <div>
                <label className="field-label">{dict.off.email}</label>
                <input className="field" type="email" value={f.email} onChange={upd("email")} />
              </div>
              <div>
                <label className="field-label">{dict.off.type}</label>
                <input className="field" value={f.type} onChange={upd("type")} />
              </div>
              <div>
                <label className="field-label">{dict.off.datum}</label>
                <input className="field" placeholder="dd/mm/jjjj" value={f.datum} onChange={upd("datum")} />
              </div>
              <div className="md:col-span-2">
                <label className="field-label">{dict.off.bericht}</label>
                <textarea className="field min-h-[110px] resize-y" value={f.bericht} onChange={upd("bericht")} />
              </div>

              {/* honeypot — hidden from users */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

              <div className="md:col-span-2">
                <button className="btn btn-primary" onClick={send} disabled={status === "sending"}>
                  {status === "sending" ? dict.off.sending : dict.off.send}
                </button>
              </div>
            </div>

            {status === "error" && (
              <p className="mt-3 text-sm text-[#F0736F]">
                {dict.off.error}{" "}
                <a href={mailtoFallback} className="text-amber underline">
                  {SITE.email}
                </a>
              </p>
            )}

            <p className="mt-3 text-[12.5px] text-rook">
              {dict.off.consentPre}{" "}
              <Link href={`/${lang}/privacy`} className="text-amber underline">
                {dict.off.privacy}
              </Link>
              .
            </p>
          </>
        )}

        <div className="mt-[18px] flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            className="rounded-xl border border-line px-4 py-2.5 text-[13.5px] text-[#C7C2B7] hover:border-amber hover:text-amber"
          >
            {dict.off.whatsapp}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="rounded-xl border border-line px-4 py-2.5 text-[13.5px] text-[#C7C2B7] hover:border-amber hover:text-amber"
          >
            {SITE.email}
          </a>
          <a
            href={`tel:${SITE.phoneHref}`}
            className="rounded-xl border border-line px-4 py-2.5 text-[13.5px] text-[#C7C2B7] hover:border-amber hover:text-amber"
          >
            {SITE.phoneDisplay}
          </a>
        </div>

        <p className="mt-3.5 text-[12.5px] text-rook">{dict.off.note}</p>
      </div>
    </section>
  );
}
