"use client";

import { useRef } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { ReactNode } from "react";

/**
 * Cursor-tracking spotlight. Updates two CSS custom properties (--spot-x,
 * --spot-y) on mousemove without re-rendering, so the radial highlight stays
 * on the compositor. Disabled entirely under prefers-reduced-motion.
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(255 255 255 / 0.16), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
