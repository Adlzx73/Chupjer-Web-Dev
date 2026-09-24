import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Handles /en and /ms prefixes, the root redirect
// (NEXT_LOCALE cookie -> Accept-Language -> /en), and sets the cookie.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and static files.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
