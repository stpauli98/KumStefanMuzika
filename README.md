# SD Light and Sound — website

Next.js 14 (App Router) · TypeScript · Tailwind · i18n (NL / FR / EN).
Dark / chrome / amber huisstijl volgens het merkboek.

## Starten

```bash
npm install
npm run dev
```

Open http://localhost:3000 — je wordt doorgestuurd naar `/nl` (of `/fr`, `/en`
op basis van de browsertaal).

## Structuur

```
src/
  middleware.ts            # locale-redirect (/ → /nl) + x-lang header
  i18n/
    config.ts              # locales + defaultLocale
    dictionaries.ts        # typed loader (nl.json = bron van waarheid)
    dictionaries/*.json    # NL / FR / EN teksten
  site.ts                  # ⚠️ contactgegevens (placeholders — hier aanpassen)
  app/
    layout.tsx             # fonts + <html lang> uit x-lang header
    [lang]/layout.tsx      # per-taal metadata + generateStaticParams
    [lang]/page.tsx        # homepage = alle secties
  components/              # Nav, Hero, Services, WhyUs, Materiaal,
                           # Realisaties, About, QuoteForm, Footer, LangSwitcher
public/logo.jpg           # chrome-logo
```

## Nog in te vullen (placeholders)

Alles staat centraal in **`src/site.ts`**:

- `url` — de finale domeinnaam (voor SEO / sitemap / OG).
- `email`, `phoneDisplay`, `phoneHref`, `whatsapp` — vervangen zodra bekend.
- `public/logo.jpg` — vervang door de vectorversie/PNG zodra beschikbaar.

Teksten pas je aan in `src/i18n/dictionaries/*.json` (zelfde sleutels in elke taal).
Juridische teksten staan onder de sleutel `legal` in diezelfde bestanden.

## Offerteformulier — e-mail (Resend)

Het formulier post naar `POST /api/offerte`, die via **Resend** mailt.

1. Maak een account op https://resend.com en verifieer je domein.
2. Kopieer `.env.example` naar `.env.local` en vul in:
   - `RESEND_API_KEY`
   - `CONTACT_TO` (waar aanvragen toekomen)
   - `CONTACT_FROM` (geverifieerde afzender)
3. Zonder key werkt de UI nog, maar wordt er niets verstuurd (dev-modus).

Bevat een honeypot-veld tegen spam. Werkt ook als `mailto`-fallback bij een fout.

## Al ingebouwd (launch-laag)

- Favicon + Apple-icon (`src/app/icon.png`, `apple-icon.png`).
- OpenGraph/Twitter-afbeelding (`src/app/opengraph-image.png`).
- `robots.ts` + `sitemap.ts` (NL/FR/EN + juridische pagina's).
- Privacybeleid (`/[lang]/privacy`) en voorwaarden-pagina (`/[lang]/voorwaarden`).

> ⚠️ Het privacybeleid is een degelijk sjabloon, maar laat het nakijken en vul
> het ondernemingsnummer aan vóór livegang.

## Taal toevoegen

1. Voeg de code toe in `src/i18n/config.ts` (`locales`).
2. Maak `src/i18n/dictionaries/<code>.json` (kopie van `nl.json`).
3. Registreer de loader in `src/i18n/dictionaries.ts`.

## Volgende stappen

- Offerteformulier nu via `mailto:`. Voor een echte inbox: een `app/api/offerte`
  route + mailprovider (Resend / Postmark) of een dienst zoals Formspree.
- Subpagina's (Diensten, Materiaal, Over ons) kunnen als `app/[lang]/<slug>/page.tsx`
  met dezelfde componenten en dictionary-structuur.
- Beeldbank opbouwen (eigen materiaal / events) en de hero + realisaties vullen.

---
Gemaakt door NextPixel · www.nextpixel.dev
