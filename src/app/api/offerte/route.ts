import { NextResponse } from "next/server";
import { SITE } from "@/site";

export async function POST(req: Request) {
  let data: Record<string, string> = {};
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const { naam, email, type, datum, bericht, company } = data;

  // Honeypot: bots fill hidden "company" field → silently accept, don't send.
  if (company) return NextResponse.json({ ok: true });

  if (!naam || !email || !bericht) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
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
      subject: `Offerte-aanvraag — ${type || "event"}`,
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
