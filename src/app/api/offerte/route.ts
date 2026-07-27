import { NextResponse } from "next/server";
import { SITE } from "@/site";

// Longest value we will accept per field. Anything over is a bot or a paste
// accident; either way it has no business ending up in an e-mail.
const LIMITS = { naam: 120, email: 200, type: 120, datum: 40, bericht: 4000 } as const;

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 5; // submissions per IP per window

// Per-instance sliding window. Vercel keeps instances warm and reuses them, so
// this stops the obvious floods. It is not a shared store: a determined
// attacker spread across regions can still get more through. If that ever
// happens, move this to Upstash/Redis.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(WINDOW_MS / 1000) } },
    );
  }

  let data: Record<string, unknown> = {};
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const naam = str(data.naam);
  const email = str(data.email);
  const type = str(data.type);
  const datum = str(data.datum);
  const bericht = str(data.bericht);

  // Honeypot: bots fill hidden "company" field → silently accept, don't send.
  if (str(data.company)) return NextResponse.json({ ok: true });

  if (!naam || !email || !bericht) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "bad_email" }, { status: 400 });
  }

  const fields = { naam, email, type, datum, bericht };
  for (const [key, max] of Object.entries(LIMITS)) {
    if (fields[key as keyof typeof fields].length > max) {
      return NextResponse.json({ ok: false, error: "too_long" }, { status: 400 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || SITE.email;
  const from = process.env.CONTACT_FROM || "SD Light and Sound <onboarding@resend.dev>";

  // No key yet (e.g. local dev before config): accept so the UI works.
  if (!apiKey) {
    console.warn("[offerte] RESEND_API_KEY missing — not delivered:", { naam, email });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      // Newlines in `type` would otherwise smuggle extra header lines.
      subject: `Offerte-aanvraag — ${type.replace(/[\r\n]+/g, " ") || "event"}`,
      text: `Naam: ${naam}\nE-mail: ${email}\nType: ${type || "-"}\nDatum: ${datum || "-"}\n\n${bericht}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("[offerte] send failed:", detail);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
