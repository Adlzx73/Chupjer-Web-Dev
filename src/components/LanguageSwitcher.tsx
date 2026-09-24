"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales, type Locale } from "@/i18n/routing";

/**
 * Segmented EN | BM toggle. Swaps the current path's locale segment,
 * preserving the #anchor, and persists the choice via the NEXT_LOCALE
 * cookie (written by next-intl on navigation and explicitly here).
 * The active theme is pinned independently by ThemeSync, so switching
 * language never changes the palette.
 */
export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  async function switchTo(next: Locale) {
    if (next === locale) return;
    const hash = window.location.hash;
    try {
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch {
      /* cookie blocked — URL prefix still carries the choice */
    }
    await router.push(pathname, { locale: next });
    // Restore the #anchor after the navigation lands.
    if (hash) {
      window.location.hash = "";
      window.location.hash = hash;
    }
  }

  return (
    <div
      role="group"
      aria-label="Language / Bahasa"
      className="inline-flex items-center rounded-full border border-border p-0.5 text-xs font-semibold"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            aria-pressed={active}
            title={localeNames[l]}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              active
                ? "bg-brand-tint text-brand"
                : "text-ink-subtle hover:text-ink"
            }`}
          >
            {l === "en" ? "EN" : "BM"}
            <span className="sr-only">
              {active ? " (current)" : ` (${localeNames[l]})`}
            </span>
          </button>
        );
      })}
    </div>
  );
}
