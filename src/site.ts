// Central place for contact details — replace the placeholders when the
// client delivers them. Everything else pulls from here.
export const SITE = {
  name: "SD Light and Sound",
  url: "https://www.sdlightandsound.be", // TODO: confirm final domain
  email: "Stephan.dobos@icloud.com",
  phoneDisplay: "+32 473 36 83 96",
  phoneHref: "+32473368396", // E.164, no spaces
  whatsapp: "32473368396", // country code + number, no +
  address: "De Pannelaan 73, 8660 De Panne",
  // Municipalities the JSON-LD claims as service area. Deliberately the Westkust
  // rather than "Belgium": a new domain ranks locally first, and an honest, narrow
  // areaServed is a stronger signal than a country-wide one.
  areaServed: [
    "De Panne",
    "Koksijde",
    "Oostduinkerke",
    "Nieuwpoort",
    "Veurne",
    "Diksmuide",
    "Oostende",
  ],
  poweredBy: "JBL · CROWN · MIDAS · DBX · PIONEER",
  agency: { name: "NextPixel", url: "https://www.nextpixel.dev" },
} as const;
