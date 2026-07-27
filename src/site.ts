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
  poweredBy: "JBL · CROWN · MIDAS · DBX · PIONEER",
  agency: { name: "NextPixel", url: "https://www.nextpixel.dev" },

  // Belgian law (art. III.74 and XII.6 WER) requires a commercial website to
  // show the operator's enterprise number. In Belgium the VAT number is the
  // same digits prefixed with BE, so one value covers both. Fill it in and it
  // appears in the footer and on both legal pages automatically; leave it
  // empty and those lines are simply omitted.
  // TODO: klant — ondernemingsnummer opvragen, formaat "0123.456.789".
  enterpriseNumber: "",
} as const;
