"use client";

import { motion } from "motion/react";
import { Check, Coffee, Printer, QrCode, Receipt } from "lucide-react";
import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

/**
 * Lightweight DOM/CSS mockups. They animate, theme-switch correctly and
 * cost no image bandwidth — unlike the static screenshots they complement.
 */

/* ---------- Singgah: loyalty counter ---------- */
export function LoyaltyPreview({ color }: { color: string }) {
  const reduce = useReducedMotionSafe();
  const [points, setPoints] = useState(0);
  const target = 150;

  useEffect(() => {
    if (reduce) {
      setPoints(target);
      return;
    }
    const start = Date.now();
    const duration = 1400;
    let raf = 0;
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setPoints(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: `${color}1a`, color }}
          >
            <Coffee size={15} aria-hidden />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">Hi Sarah!</p>
            <p className="text-[11px] text-ink-subtle">TwentyOne.cafe</p>
          </div>
        </div>
        <span className="rounded-full bg-brand-tint px-2 py-0.5 text-[10px] font-semibold text-brand">
          Member
        </span>
      </div>

      <div className="mt-4 rounded-lg bg-bg-alt p-3 text-center">
        <p className="text-3xl font-bold" style={{ color }}>
          {points}
          <span className="ml-1 text-sm font-medium text-ink-subtle">pts</span>
        </p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{ width: `${(points / target) * 100}%`, background: color }}
          />
        </div>
        <p className="mt-1.5 text-[10px] text-ink-subtle">
          {points >= target ? "Reward unlocked" : `${target - points} pts to go`}
        </p>
      </div>

      <button
        type="button"
        disabled={points < target}
        className="mt-3 w-full rounded-lg py-2.5 text-xs font-semibold text-white transition-opacity disabled:opacity-45"
        style={{ background: color }}
      >
        Claim Free Oat Latte
      </button>
    </div>
  );
}

/* ---------- Operation: QR -> order progress ---------- */
export function OrderFlowPreview({ color }: { color: string }) {
  const reduce = useReducedMotionSafe();
  const stages = ["Pending", "Preparing", "Served"] as const;
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStage(2);
      return;
    }
    const id = setInterval(() => setStage((s) => (s + 1) % stages.length), 1800);
    return () => clearInterval(id);
  }, [reduce, stages.length]);

  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg"
          style={{ background: `${color}1a`, color }}
        >
          <QrCode size={22} aria-hidden />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Table 4 · Dine-in</p>
          <p className="text-[11px] text-ink-subtle">
            2× Flat White · 1× Croissant
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {stages.map((s, i) => {
          const done = i < stage;
          const active = i === stage;
          return (
            <div key={s} className="flex items-center gap-2.5">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold transition-colors ${
                  done || active
                    ? "border-transparent text-white"
                    : "border-border text-ink-subtle"
                }`}
                style={done || active ? { background: color } : undefined}
              >
                {done ? <Check size={11} aria-hidden /> : i + 1}
              </div>
              <span
                className={`text-xs transition-colors ${
                  active ? "font-semibold text-ink" : "text-ink-subtle"
                }`}
              >
                {s}
              </span>
              {active && !reduce && (
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: color }}
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-bg-alt px-3 py-2">
        <span className="text-[11px] text-ink-subtle">Routed to bar station</span>
        <span className="text-[11px] font-semibold" style={{ color }}>
          KOT #041
        </span>
      </div>
    </div>
  );
}


/* ---------- POS: counter checkout ---------- */
export function PosPreview({ color }: { color: string }) {
  const items = [
    { name: "Flat White", price: 12.0 },
    { name: "Croissant", price: 8.5 },
    { name: "Long Black", price: 9.0 },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Counter · Till 1</p>
        <span className="flex items-center gap-1 rounded-full bg-brand-tint px-2 py-0.5 text-[10px] font-semibold text-brand">
          <Printer size={10} aria-hidden /> Drawer open
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {items.map((it) => (
          <button
            key={it.name}
            type="button"
            className="rounded-lg border border-border bg-bg-alt px-2 py-2.5 text-[10px] font-medium text-ink transition-colors hover:border-brand"
          >
            {it.name}
            <span className="mt-0.5 block text-ink-subtle">
              RM{it.price.toFixed(2)}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 space-y-1.5 border-t border-border pt-3 text-xs">
        {items.map((it) => (
          <div key={it.name} className="flex justify-between text-ink-muted">
            <span>{it.name}</span>
            <span>RM{it.price.toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between pt-1.5 font-bold text-ink">
          <span>Total</span>
          <span style={{ color }}>RM29.50</span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          className="flex-1 rounded-lg py-2 text-xs font-semibold text-white"
          style={{ background: color }}
        >
          Charge RM29.50
        </button>
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-ink-muted"
        >
          <Receipt size={12} aria-hidden /> Print
        </button>
      </div>
    </div>
  );
}

