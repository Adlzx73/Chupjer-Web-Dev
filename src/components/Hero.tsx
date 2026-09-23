"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, Check, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fallbackBrands, hero } from "@/lib/content";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export function Hero() {
  const reduce = useReducedMotionSafe();
  const [index, setIndex] = useState(0);

  // Cycle the headline word. Skipped under reduced-motion.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % hero.cyclingWords.length),
      2800,
    );
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pt-36">
      {/* Ambient glow orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-tint blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-brand-tint blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          {/* ---------- Copy ---------- */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-3 py-1.5 text-xs font-semibold text-brand">
              <Sparkles size={13} aria-hidden />
              {hero.eyebrow}
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>

            {/* Animated proof line */}
            <div className="mt-3 flex h-9 items-center">
              {reduce ? (
                <span className="text-xl font-semibold text-brand sm:text-2xl">
                  {hero.cyclingWords[0]}
                </span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xl font-semibold text-brand sm:text-2xl"
                  >
                    {hero.cyclingWords[index]}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {hero.subheadline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#demo" size="lg">
                {hero.primaryCta}
              </ButtonLink>
              <ButtonLink href="#products" variant="secondary" size="lg">
                {hero.secondaryCta}
                <ArrowDown size={16} aria-hidden />
              </ButtonLink>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-subtle">
              {[
                "Free onboarding included",
                "Same-day launch",
                "No app download needed",
              ].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check size={14} className="text-brand" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>


          {/* ---------- Interactive device mockup ---------- */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
              {/* Browser frame */}
              <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-elevated">
                <div className="flex items-center gap-1.5 border-b border-border bg-bg-alt px-3 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                  <span className="ml-2 flex-1 truncate rounded-md bg-surface px-2 py-1 text-[11px] text-ink-subtle">
                    operations.chupjer.com/dashboard
                  </span>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Orders today", value: "128", delta: "+18%" },
                      { label: "Revenue", value: "RM1,940", delta: "+12%" },
                      { label: "Avg ticket", value: "RM15.20", delta: "+4%" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg border border-border bg-bg-alt p-2.5"
                      >
                        <p className="truncate text-[10px] uppercase tracking-wide text-ink-subtle">
                          {s.label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-ink">{s.value}</p>
                        <p className="text-[10px] font-medium text-brand">{s.delta}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2 overflow-hidden rounded-lg border border-border">
                    <Image
                      src="/assets/dashboard-BBapFpFo.png"
                      alt="Chupjer operations dashboard"
                      width={640}
                      height={400}
                      priority
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Floating loyalty phone */}
              <div className="absolute -bottom-10 -left-4 w-32 rotate-[-4deg] rounded-2xl border border-border bg-surface p-2 shadow-elevated sm:w-36 sm:-left-10">
                <div className="rounded-xl bg-bg-alt p-2.5 text-center">
                  <p className="text-[9px] text-ink-subtle">Sarah&apos;s points</p>
                  <p className="text-lg font-bold text-brand">150</p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                    <div className="h-full w-[75%] rounded-full bg-brand" />
                  </div>
                  <p className="mt-1.5 rounded-md bg-brand-tint px-1.5 py-1 text-[8px] font-semibold text-brand">
                    Free Oat Latte unlocked
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Trust ticker ---------- */}
        <div className="mt-20">
          <p className="text-center text-xs font-medium uppercase tracking-[0.16em] text-ink-subtle">
            {hero.trustHeading}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {fallbackBrands.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-2 grayscale transition hover:grayscale-0"
              >
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-md object-contain"
                />
                <span className="text-sm font-medium text-ink-muted">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
