import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/site";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  robots: { index: false, follow: true },
};

// Sits at the [lang] level so it catches notFound() from both the legal route
// and the catch-all, and renders inside the layout that owns <html>/<body>.
// Styles stay inline anyway: Next also reaches for this boundary in cases where
// it renders its own shell, and then no stylesheet has loaded yet. Copy falls
// back to the default locale because not-found.tsx cannot read route params.
const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    background: "#08080A",
    color: "#EDE3D4",
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
    padding: "0 24px",
  },
  wrap: { maxWidth: "760px", margin: "0 auto", width: "100%" },
  eyebrow: {
    color: "#F0A93C",
    fontSize: "12px",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    margin: 0,
  },
  h1: { fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 800, margin: "12px 0 0" },
  body: {
    color: "#8A8D96",
    fontSize: "16px",
    lineHeight: 1.7,
    maxWidth: "46ch",
    margin: "16px 0 32px",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "44px",
    padding: "0 22px",
    borderRadius: "12px",
    background: "#F0A93C",
    color: "#08080A",
    fontWeight: 700,
    fontSize: "14px",
    textDecoration: "none",
  },
};

export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);
  return (
    <main style={styles.main}>
      <div style={styles.wrap}>
        <p style={styles.eyebrow}>404</p>
        <h1 style={styles.h1}>{dict.notFound.title}</h1>
        <p style={styles.body}>{dict.notFound.body}</p>
        <Link href={`/${defaultLocale}`} style={styles.cta}>
          {dict.notFound.cta}
        </Link>
      </div>
    </main>
  );
}
