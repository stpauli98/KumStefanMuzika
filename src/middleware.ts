import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

function detectLocale(req: NextRequest): Locale {
  const header = req.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
    for (const code of preferred) {
      if ((locales as readonly string[]).includes(code)) return code as Locale;
    }
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const pathLocale = locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (pathLocale) {
    // Pass the active locale to the root layout via a request header.
    const headers = new Headers(req.headers);
    headers.set("x-lang", pathLocale);
    return NextResponse.next({ request: { headers } });
  }

  // No locale in the path → redirect to the detected/default one.
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
