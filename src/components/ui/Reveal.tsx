"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

type Direction = "up" | "left" | "right";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Horizontal slide distance for `left`/`right` directions. */
  x?: number;
  /** Entry direction. `up` is the default fade/slide-up. */
  direction?: Direction;
  className?: string;
  once?: boolean;
};

const offset = (direction: Direction, x: number, y: number) =>
  direction === "left"
    ? { x, y: 0 }
    : direction === "right"
      ? { x: -x, y: 0 }
      : { x: 0, y };

/**
 * Scroll-triggered fade/slide reveal.
 * Honours prefers-reduced-motion by rendering children with no animation.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 32,
  direction = "up",
  className,
  once = true,
}: Props) {
  const reduce = useReducedMotionSafe();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const from = offset(direction, x, y);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container for RevealItem children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
