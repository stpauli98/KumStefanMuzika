import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SITE } from "@/site";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Materiaal from "@/components/Materiaal";
import Realisaties from "@/components/Realisaties";
import About from "@/components/About";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";

export default async function Home({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang: Locale = params.lang;
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: dict.meta.description,
    url: `${SITE.url}/${lang}`,
    telephone: SITE.phoneDisplay,
    email: SITE.email,
    image: `${SITE.url}/opengraph-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "De Pannelaan 73",
      postalCode: "8660",
      addressLocality: "De Panne",
      addressCountry: "BE",
    },
    areaServed: { "@type": "Country", name: "Belgium" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
        <Services dict={dict} />
        <WhyUs dict={dict} />
        <Materiaal dict={dict} />
        <Realisaties dict={dict} />
        <About dict={dict} />
        <QuoteForm dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
