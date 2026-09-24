import { notFound } from "next/navigation";

/**
 * Catch-all for unmatched paths under /[locale]. Calls notFound() so the
 * HTTP response is a real 404 (soft-404s would create an infinite
 * crawlable URL space); the localized 404 UI renders via the nearest
 * not-found boundary.
 */
export default function CatchAllPage() {
  notFound();
}
