import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/i18n/metadata";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalArticle from "@/components/LegalArticle";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang: Locale = isLocale(params.lang) ? params.lang : defaultLocale;
  const dict = await getDictionary(lang);
  return {
    ...localizedMetadata(lang, "/privacy"),
    title: dict.legal.privacy.title,
  };
}

export default async function PrivacyPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang: Locale = params.lang;
  const dict = await getDictionary(lang);
  return (
    <>
      <Nav dict={dict} lang={lang} />
      <main>
        <LegalArticle block={dict.legal.privacy} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
