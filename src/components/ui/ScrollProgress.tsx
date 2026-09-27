"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * Fixed scroll progress bar pinned to the very top of the viewport.
 * Rendered as a sibling of the Navbar header so it stays visible even
 * while the navbar itself is hidden. Informative rather than decorative,
 * so it is intentionally still rendered under reduced motion — just
 * without the spring smoothing.
 */
export function ScrollProgress() {
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX: reduce ? scrollYProgress : scaleX,
        background: "var(--cj-accent-brand)",
      }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
    />
  );
}
