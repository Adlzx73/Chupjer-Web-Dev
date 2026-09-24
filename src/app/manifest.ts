import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";
import { site } from "@/lib/content";
import { routing } from "@/i18n/routing";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // The manifest route has no locale segment; serve the default locale
  // (English) and point start_url at the English entry page.
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "metadata",
  });

  return {
    name: `${site.name} — ${t("manifestName")}`,
    short_name: site.name,
    description: t("manifestDescription"),
    start_url: "/en",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#EA580C",
    icons: [
      { src: "/logo/chupjer-official-logo_1.png", sizes: "any", type: "image/png" },
      { src: "/favicon.svg", type: "image/svg+xml" },
    ],
  };
}
