import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/i18n/metadata";
import { routes, routeKeys, routeKeyFromSlug } from "@/i18n/routes";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalArticle from "@/components/LegalArticle";

// Both legal pages render identically and differ only in which dictionary
// block they show, so they share one route. The slug varies per language
// (/nl/voorwaarden, /fr/conditions-generales, /en/terms) — see i18n/routes.ts.
export function generateStaticParams({ params }: { params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : defaultLocale;
  return routeKeys.map((key) => ({ slug: routes[key][lang] }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang: Locale = isLocale(params.lang) ? params.lang : defaultLocale;
  const key = routeKeyFromSlug(lang, params.slug);
  // An unknown slug renders the 404 below; keep it out of the index.
  if (!key) return { robots: { index: false, follow: true } };
  const dict = await getDictionary(lang);
  return {
    ...localizedMetadata(lang, key),
    title: dict.legal[key].title,
  };
}

export default async function LegalPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const lang: Locale = params.lang;
  const key = routeKeyFromSlug(lang, params.slug);
  if (!key) notFound();
  const dict = await getDictionary(lang);
  return (
    <>
      <Nav dict={dict} lang={lang} />
      <main>
        <LegalArticle block={dict.legal[key]} identity={dict.legal.identity} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
