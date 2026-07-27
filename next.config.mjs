// Next.js needs inline scripts for hydration and JSON-LD, hence
// 'unsafe-inline' in script-src; va.vercel-scripts.com serves the
// Vercel Web Analytics script.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

// The FR and EN legal pages used to be served under the Dutch slug. Those URLs
// were live and are in the sitemap Google has not crawled yet, so they get a
// permanent redirect rather than a 404. Keep in sync with src/i18n/routes.ts.
const legacyLegalRedirects = [
  { source: "/fr/privacy", destination: "/fr/confidentialite" },
  { source: "/fr/voorwaarden", destination: "/fr/conditions-generales" },
  { source: "/en/voorwaarden", destination: "/en/terms" },
].map((r) => ({ ...r, permanent: true }));

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return legacyLegalRedirects;
  },
};
export default nextConfig;
