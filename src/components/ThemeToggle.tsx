"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-border-strong hover:bg-surface-hover hover:text-ink"
    >
      {/* Both glyphs render; CSS picks one from data-theme, so the
          visible icon never flips between SSR paint and hydration. */}
      <Sun size={16} aria-hidden className="theme-icon-light" />
      <Moon size={16} aria-hidden className="theme-icon-dark" />
    </button>
  );
}
