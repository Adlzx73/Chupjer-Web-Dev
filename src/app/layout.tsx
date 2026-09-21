import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";
import { site } from "@/lib/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — The All-in-One Business Platform for Malaysia`,
    template: `%s | ${site.name}`,
  },
  description:
    "From online ordering to point-of-sale, kitchen display to loyalty programs — Chupjer is the all-in-one platform for modern Malaysian businesses. Starting from RM150/mo.",
  keywords: [
    "cafe POS Malaysia",
    "QR table ordering",
    "restaurant POS",
    "loyalty program Malaysia",
    "kopitiam ordering system",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — The All-in-One Business Platform for Malaysia`,
    description:
      "Online ordering, POS, kitchen display, loyalty, analytics — all connected. Starting from RM150/mo.",
    images: ["/logo/chupjer-official-logo_1.png"],
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — All-in-One Business Platform`,
    description:
      "Online ordering, POS, kitchen display, loyalty, analytics — all connected. Starting from RM150/mo.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo/chupjer-official-logo_1.png", type: "image/png" },
    ],
    apple: "/logo/chupjer-official-logo_1.png",
  },
};

/** Organization + SoftwareApplication schema, carried over from the live site. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Chupjer Digital Solutions",
      legalName: site.legalName,
      url: site.url,
      logo: `${site.url}/logo/chupjer-official-logo_1.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+60162955337",
        contactType: "sales",
        availableLanguage: ["English", "Malay"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "20, Tingkat 2, Lorong Kelisa Emas 2, Taman Kelisa Emas",
        postalCode: "13700",
        addressLocality: "Perai",
        addressRegion: "Pulau Pinang",
        addressCountry: "MY",
      },
      sameAs: [site.threads],
    },
    {
      "@type": "SoftwareApplication",
      name: "Chupjer",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Android, iOS",
      offers: {
        "@type": "Offer",
        price: "150",
        priceCurrency: "MYR",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
