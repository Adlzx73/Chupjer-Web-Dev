"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe `prefers-reduced-motion`.
 *
 * `useReducedMotion()` from motion/react reads the media query *during the
 * first render*. On the server that resolves to `false`, but on a machine
 * with "Reduce motion" enabled it resolves to `true` on the client. Any
 * component that branches the *shape* of its tree on that value therefore
 * renders different markup on each side and React throws:
 *   "Hydration failed because the server rendered HTML didn't match..."
 *
 * This hook always returns `false` for the server render and the first
 * client render, then reports the real value after mount. The correction is
 * a normal post-hydration re-render, so it can never cause a mismatch.
 */
export function useReducedMotionSafe(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}
