import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: "Online ordering, POS, kitchen display, loyalty and analytics for Malaysian cafes.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#EA580C",
    icons: [
      { src: "/logo/chupjer-official-logo_1.png", sizes: "any", type: "image/png" },
      { src: "/favicon.svg", type: "image/svg+xml" },
    ],
  };
}
