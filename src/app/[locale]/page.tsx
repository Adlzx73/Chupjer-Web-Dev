import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { HomePageSections } from "@/components/HomePageSections";
import type { Locale } from "@/i18n/routing";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  return <HomePageSections />;
}
