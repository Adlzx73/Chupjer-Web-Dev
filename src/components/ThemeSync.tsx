"use client";

import { useEffect } from "react";

type Theme = "light" | "dark";

function readStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem("theme");
    return t === "dark" ? "dark" : t === "light" ? "light" : null;
  } catch {
    return null;
  }
}

/**
 * Keeps data-theme pinned to the visitor's stored theme during
 * client-side navigation: switching locales re-renders the <html>
 * shell and can drop or reset the manually-set attribute, which
 * would otherwise let the prefers-color-scheme CSS fallback flip
 * the palette (e.g. light -> dark). MutationObserver callbacks run
 * before paint, so the correction is never visible.
 */
export function ThemeSync() {
  useEffect(() => {
    const pin = () => {
      const stored = readStoredTheme();
      if (!stored) return;
      const el = document.documentElement;
      if (el.getAttribute("data-theme") !== stored) {
        el.setAttribute("data-theme", stored);
      }
    };

    pin();
    const observer = new MutationObserver(pin);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
