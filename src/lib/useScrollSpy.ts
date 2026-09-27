"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently in the viewport's
 * "focus band" (roughly the upper-middle of the screen) using an
 * IntersectionObserver, and returns its id — or null when no section
 * qualifies (e.g. above the first section).
 */
export function useScrollSpy(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver !== "function") return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActiveId((prev) => {
          if (prev && visible.has(prev)) return prev;
          // Prefer the section that appears earliest in the document.
          const next =
            elements.find((el) => visible.has(el.id))?.id ?? null;
          return next === prev ? prev : next;
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
    // ids identity is stable at call sites (module-scope or literal arrays).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);

  return activeId;
}
