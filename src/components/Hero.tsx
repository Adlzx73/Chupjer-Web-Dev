"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Check, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fallbackBrands } from "@/lib/content";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  const [desktop, setDesktop] = useState(false);

  // Parallax (desktop only, disabled under reduced motion).
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mockY = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const parallax = !reduce && desktop;

  const cyclingWords = t.raw("cyclingWords") as string[];

  // Cycle the headline word. Skipped under reduced-motion.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % cyclingWords.length),
      2800,
    );
    return () => clearInterval(id);
  }, [reduce, cyclingWords.length]);

  const proofPoints = t.raw("proofPoints") as string[];

  return (
    <section ref={sectionRef} className="texture-warm relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pt-36">
      {/* Ambient warm glow */}
      <motion.div
        aria-hidden
        style={parallax ? { y: glowY } : undefined}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-tint blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-warm-tint blur-3xl" />
        {/* Fine warm baseline rule */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent" />
      </motion.div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
          {/* ---------- Copy ---------- */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-warm-tint/60 px-3.5 py-1.5 eyebrow">
              <Sparkles size={13} aria-hidden />
              {t("eyebrow")}
            </p>

            <h1 className="mt-6 max-w-xl text-[2.65rem] font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.15rem]">
              {t("headline")}
            </h1>

            {/* Animated proof line */}
            <div className="mt-4 flex h-10 items-center">
              {reduce ? (
                <span className="text-2xl font-semibold text-gradient-brand sm:text-[1.7rem]">
                  {cyclingWords[0]}
                </span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="text-2xl font-semibold text-gradient-brand sm:text-[1.7rem]"
                  >
                    {cyclingWords[index]}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {t("subheadline")}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#demo" size="lg">
                {t("primaryCta")}
              </ButtonLink>
              <ButtonLink href="#products" variant="secondary" size="lg">
                {t("secondaryCta")}
                <ArrowDown size={16} aria-hidden />
              </ButtonLink>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-subtle">
              {proofPoints.map((pt) => (
                <li key={pt} className="flex items-center gap-1.5">
                  <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-brand-tint">
                    <Check size={11} className="text-brand" aria-hidden />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>


          {/* ---------- Interactive device mockup ---------- */}
          <motion.div
            style={parallax ? { y: mockY } : undefined}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative mb-10 sm:mb-12">
              {/* Browser frame */}
              <div className="overflow-hidden rounded-[1.25rem] border border-border bg-surface shadow-elevated">
                <div className="flex items-center gap-1.5 border-b border-border bg-bg-alt px-3.5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                  <span className="ml-2 flex-1 truncate rounded-md bg-surface px-2.5 py-1 text-[11px] text-ink-subtle">
                    operations.chupjer.com/dashboard
                  </span>
                </div>
                <div className="p-3.5">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: t("mock.ordersToday"), value: "128", delta: "+18%" },
                      { label: t("mock.revenue"), value: "RM1,940", delta: "+12%" },
                      { label: t("mock.avgTicket"), value: "RM15.20", delta: "+4%" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-border bg-bg-alt p-2.5"
                      >
                        <p className="truncate text-[10px] uppercase tracking-wide text-ink-subtle">
                          {s.label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-ink">{s.value}</p>
                        <p className="text-[10px] font-medium text-brand">{s.delta}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2.5 overflow-hidden rounded-xl border border-border">
                    <Image
                      src="/assets/dashboard-BBapFpFo.png"
                      alt={t("mock.dashboardAlt")}
                      width={640}
                      height={400}
                      priority
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Floating loyalty phone */}
              <div className="absolute -bottom-10 -left-2 w-32 rotate-[-4deg] rounded-2xl border border-border bg-surface p-2 shadow-elevated sm:w-36 sm:-left-10">
                <div className="rounded-xl bg-bg-alt p-2.5 text-center">
                  <p className="text-[9px] text-ink-subtle">{t("mock.sarahPoints")}</p>
                  <p className="text-lg font-bold text-brand">150</p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                    <div className="h-full w-[75%] rounded-full bg-brand" />
                  </div>
                  <p className="mt-1.5 rounded-md bg-brand-tint px-1.5 py-1 text-[8px] font-semibold text-brand">
                    {t("mock.rewardUnlocked")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---------- Trust ticker ---------- */}
        <div className="mt-24">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
            <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
            <p className="max-w-full text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-subtle">
              {t("trustHeading")}
            </p>
            <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {fallbackBrands.map((b) => (
              <div
                key={b.name}
                className="flex items-center gap-2.5 opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={32}
                  height={32}
                  loading="lazy"
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
