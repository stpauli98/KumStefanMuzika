"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SITE } from "@/site";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

type Fields = { naam: string; email: string; type: string; datum: string; bericht: string };
type FieldKey = keyof Fields;
type Status = "idle" | "sending" | "ok" | "error";

const REQUIRED: FieldKey[] = ["naam", "email", "bericht"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Defined at module scope so typing in an input never remounts it. */
function Field({
  name,
  label,
  error,
  animate,
  children,
}: {
  name: FieldKey;
  label: string;
  error: string | null;
  animate: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor={`f-${name}`}>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`err-${name}`}
            initial={animate ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: "auto" }}
            exit={animate ? { opacity: 0, height: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pt-1.5 text-[12.5px] text-[#E4685F]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QuoteForm({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [f, setF] = useState<Fields>({ naam: "", email: "", type: "", datum: "", bericht: "" });
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const still = useReducedMotion();

  function errorFor(k: FieldKey): string | null {
    if (REQUIRED.includes(k) && !f[k].trim()) return dict.off.errRequired;
    if (k === "email" && f.email.trim() && !EMAIL_RE.test(f.email)) return dict.off.errEmail;
    return null;
  }

  // Only speak up once the user has left the field, or after a failed send.
  function shownError(k: FieldKey): string | null {
    return touched[k] ? errorFor(k) : null;
  }

  const upd =
    (k: FieldKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setF((prev) => ({ ...prev, [k]: e.target.value }));
      if (status === "error") setStatus("idle");
    };

  const blur = (k: FieldKey) => () => setTouched((t) => ({ ...t, [k]: true }));

  async function send() {
    const invalid = (Object.keys(f) as FieldKey[]).some((k) => errorFor(k));
    if (invalid) {
      setTouched({ naam: true, email: true, type: true, datum: true, bericht: true });
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
      if (good) {
        setF({ naam: "", email: "", type: "", datum: "", bericht: "" });
        setTouched({});
      }
    } catch {
      setStatus("error");
    }
  }

  const mailtoFallback = `mailto:${SITE.email}?subject=${encodeURIComponent(
    `Offerte — ${f.type || "event"}`,
  )}&body=${encodeURIComponent(`Naam: ${f.naam}\nE-mail: ${f.email}\n\n${f.bericht}`)}`;

  const inputProps = (name: FieldKey) => ({
    id: `f-${name}`,
    value: f[name],
    onChange: upd(name),
    onBlur: blur(name),
    "aria-invalid": shownError(name) ? (true as const) : undefined,
    "aria-describedby": shownError(name) ? `err-${name}` : undefined,
    className: `field ${shownError(name) ? "field-invalid" : ""}`,
  });

  return (
    <section
      id="offerte"
      className="section section-line"
      style={{ background: "radial-gradient(120% 90% at 50% 0%, #17140f, #08080A 60%)" }}
    >
      <div className="container-site">
        <p className="eyebrow">{dict.off.eyebrow}</p>
        <h2 className="h2">{dict.off.title}</h2>
        <p className="sec-sub mb-8">{dict.off.sub}</p>

        {status === "ok" ? (
          <motion.div
            initial={still ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass flex items-start gap-3 border-amber/40 bg-amber/[0.08] px-5 py-4 text-[15px] text-zand"
          >
            <svg
              aria-hidden
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="mt-0.5 flex-none text-amber"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <p>{dict.off.success}</p>
          </motion.div>
        ) : (
          <div className="glass p-5 sm:p-7">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field name="naam" label={dict.off.naam} error={shownError("naam")} animate={!still}>
                <input {...inputProps("naam")} autoComplete="name" />
              </Field>
              <Field name="email" label={dict.off.email} error={shownError("email")} animate={!still}>
                <input {...inputProps("email")} type="email" autoComplete="email" inputMode="email" />
              </Field>
              <Field name="type" label={dict.off.type} error={shownError("type")} animate={!still}>
                <input {...inputProps("type")} />
              </Field>
              <Field name="datum" label={dict.off.datum} error={shownError("datum")} animate={!still}>
                <input {...inputProps("datum")} placeholder="dd/mm/jjjj" inputMode="numeric" />
              </Field>
              <div className="md:col-span-2">
                <Field name="bericht" label={dict.off.bericht} error={shownError("bericht")} animate={!still}>
                  <textarea {...inputProps("bericht")} className={`${inputProps("bericht").className} min-h-[130px] resize-y`} />
                </Field>
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
                <button
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={send}
                  disabled={status === "sending"}
                >
                  {status === "sending" && (
                    <svg
                      aria-hidden
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" />
                    </svg>
                  )}
                  {status === "sending" ? dict.off.sending : dict.off.send}
                </button>
              </div>
            </div>

            {status === "error" && (
              <p role="alert" className="mt-4 text-sm text-[#E4685F]">
                {dict.off.error}{" "}
                <a href={mailtoFallback} className="text-amber underline">
                  {SITE.email}
                </a>
              </p>
            )}

            <p className="mt-4 text-[12.5px] text-rook">
              {dict.off.consentPre}{" "}
              <Link href={`/${lang}/privacy`} className="text-amber underline">
                {dict.off.privacy}
              </Link>
              .
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 text-[13.5px] text-[#C7C2B7] transition duration-200 hover:border-amber/50 hover:text-amber"
          >
            {dict.off.whatsapp}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 text-[13.5px] text-[#C7C2B7] transition duration-200 hover:border-amber/50 hover:text-amber"
          >
            {SITE.email}
          </a>
          <a
            href={`tel:${SITE.phoneHref}`}
            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/10 bg-white/[0.02] px-4 text-[13.5px] text-[#C7C2B7] transition duration-200 hover:border-amber/50 hover:text-amber"
          >
            {SITE.phoneDisplay}
          </a>
        </div>

        <p className="mt-4 text-[12.5px] text-rook">{dict.off.note}</p>
      </div>
    </section>
  );
}
