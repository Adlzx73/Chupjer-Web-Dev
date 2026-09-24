import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ms"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ms: "Bahasa Melayu",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  // Every page lives under /en or /ms so both languages are
  // individually addressable and indexable.
  localePrefix: "always",
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
  },
});
