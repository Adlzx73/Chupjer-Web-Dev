import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Single-page marketing site: the homepage, plus each anchor section
  // exposed as its own entry so deep links are discoverable.
  const sections = [
    "products",
    "compare",
    "pricing",
    "why",
    "testimonials",
    "faq",
    "demo",
  ];

  return [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sections.map((s) => ({
      url: `${site.url}/#${s}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
