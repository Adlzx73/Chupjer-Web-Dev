import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { ThemeScript } from "@/components/ThemeScript";
import { site } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ThemeSync } from "@/components/ThemeSync";

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "metadata" });

  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: t("titleTemplate"),
    },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ms: "/ms",
        "x-default": "/en",
      },
    },
    keywords: [
      "cafe POS Malaysia",
      "QR table ordering",
      "restaurant POS",
      "loyalty program Malaysia",
      "kopitiam ordering system",
      "sistem POS kafe Malaysia",
      "tempahan meja QR",
      "program kesetiaan Malaysia",
    ],
    openGraph: {
      type: "website",
      url: site.url,
      siteName: site.name,
      title,
      description: t("ogDescription"),
      images: ["/logo/chupjer-official-logo_1.png"],
      locale: locale === "ms" ? "ms_MY" : "en_MY",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("ogDescription"),
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/logo/chupjer-official-logo_1.png", type: "image/png" },
      ],
      apple: "/logo/chupjer-official-logo_1.png",
    },
  };
}

/** Organization + SoftwareApplication schema, carried over from the live site. */
function structuredData(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Chupjer Digital Solutions",
        legalName: site.legalName,
        url: `${site.url}/${locale}`,
        logo: `${site.url}/logo/chupjer-official-logo_1.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+60175916783",
          contactType: "sales",
          availableLanguage: ["English", "Malay"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "20, Tingkat 2, Lorong Kelisa Emas 2, Taman Kelisa Emas",
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
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale.
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData(locale as Locale)),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeSync />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
