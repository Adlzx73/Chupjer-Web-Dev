import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Single-page marketing site: both locales, plus each anchor section
  // exposed as its own entry so deep links are discoverable. Alternate
  // links render as hreflang entries in the sitemap XML.
  const sections = [
    "products",
    "compare",
    "pricing",
    "why",
    "testimonials",
    "faq",
    "demo",
  ];

  const alternatesFor = (path: string) => ({
    languages: Object.fromEntries(
      routing.locales.map((locale) => [locale, `${site.url}/${locale}${path}`]),
    ),
  });

  return [
    ...routing.locales.map((locale) => ({
      url: `${site.url}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: alternatesFor(""),
    })),
    ...routing.locales.flatMap((locale) =>
      sections.map((s) => ({
        url: `${site.url}/${locale}/#${s}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ),
  ];
}
