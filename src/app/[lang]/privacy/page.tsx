import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalArticle from "@/components/LegalArticle";

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
