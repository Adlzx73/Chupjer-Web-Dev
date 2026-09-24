import { LocalizedNotFound } from "@/components/LocalizedNotFound";

/**
 * Rendered when notFound() fires under /[locale] (e.g. from the
 * catch-all route). Inherits the locale context, so the UI is
 * localized while Next.js serves a true 404 status.
 */
export default function LocaleNotFound() {
  return <LocalizedNotFound />;
}
