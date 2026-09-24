"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { whatsappUrl } from "@/lib/content";

/**
 * Client-side helper that builds the WhatsApp deep-link with a
 * pre-filled message matching the current site language. The copy
 * lives in the whatsapp namespace of messages/*.json.
 */
export function useWhatsappUrl(plan?: string, tier?: string) {
  const t = useTranslations("whatsapp");

  return useMemo(() => {
    const message =
      plan && tier ? t("withPlan", { plan, tier }) : t("general");
    return whatsappUrl(message);
  }, [plan, tier, t]);
}
