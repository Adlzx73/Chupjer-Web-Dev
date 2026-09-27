"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  LoyaltyPreview,
  OrderFlowPreview,
  PosPreview,
} from "@/components/ProductPreviews";
import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeader } from "@/components/ui/Container";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { products, type Product, type ProductId } from "@/lib/content";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export function ProductDeck() {
  const t = useTranslations("products");
  const reduce = useReducedMotionSafe();
  const [active, setActive] = useState<ProductId>("operations");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const uid = useId();

  const current: Product = products.find((p) => p.id === active) ?? products[0];

  /** Arrow-key navigation within the tablist (WAI-ARIA). */
  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = products.length - 1;
    let next = i;
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;

    e.preventDefault();
    const target = products[next];
    setActive(target.id);
    tabRefs.current[target.id]?.focus();
  }

  return (
    <section id="products" className="scroll-mt-24 border-t border-border bg-bg-alt py-20">
      <Container>
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
          subtitle={t("section.subtitle")}
        />

        {/* ---------- Tablist ---------- */}
        <div
          role="tablist"
          aria-label={t("section.tablistLabel")}
          aria-orientation="horizontal"
          className="mx-auto mt-10 flex max-w-2xl gap-2 overflow-x-auto rounded-[1.25rem] border border-border bg-surface p-2 no-scrollbar"
        >
          {products.map((p, i) => {
            const selected = p.id === active;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[p.id] = el;
                }}
                role="tab"
                id={`${uid}-tab-${p.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel-${p.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(p.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative flex flex-1 shrink-0 flex-col items-center gap-1 rounded-xl px-4 py-3 text-center transition-colors ${
                  selected
                    ? "text-ink"
                    : "text-ink-subtle hover:bg-surface-hover hover:text-ink-muted"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId={`${uid}-tab-bg`}
                    className="absolute inset-0 rounded-xl bg-brand-tint"
                    style={{ boxShadow: `inset 0 0 0 1px ${p.color}40` }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", bounce: 0.2, duration: 0.5 }
                    }
                  />
                )}
                <span className="relative flex items-center gap-1.5 text-sm font-semibold">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: p.color }}
                    aria-hidden
                  />
                  <span className="hidden sm:inline">{t(`items.${p.id}.name`)}</span>
                  <span className="sm:hidden">{t(`items.${p.id}.shortName`)}</span>
                </span>
                <span className="relative text-[11px] opacity-75">
                  {t(`items.${p.id}.tagline`)}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------- Panels ---------- */}
        {/*
          * The panel content must never depend on JS to become visible:
          * a stalled mount animation would otherwise leave it stuck at
          * opacity:0 until the next interaction. So the base element is a
          * plain visible <div>; the switch animation is layered on by motion
          * only as a non-blocking enhancement via `initial={false}` on first
          * mount and a keyed fade on subsequent tab changes.
          */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            role="tabpanel"
            id={`${uid}-panel-${current.id}`}
            aria-labelledby={`${uid}-tab-${current.id}`}
            tabIndex={0}
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-8 rounded-[1.25rem] border border-border bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-2"
          >
            {/* Left: copy + features */}
            <div>
              <p
                className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{ background: `${current.color}1a`, color: current.color }}
              >
                {t(`items.${current.id}.persona`)}
              </p>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                {t(`items.${current.id}.name`)}
              </h3>
              <p
                className="mt-1.5 text-base font-medium"
                style={{ color: current.color }}
              >
                {t(`items.${current.id}.hook`)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {t(`items.${current.id}.description`)}
              </p>

              <ul className="mt-6 space-y-3">
                {current.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: `${current.color}1a`,
                        color: current.color,
                      }}
                    >
                      <Check size={12} aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {t(`items.${current.id}.features.${f}.title`)}
                      </p>
                      <p className="text-sm text-ink-muted">
                        {t(`items.${current.id}.features.${f}.desc`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="#demo" size="md">
                  {t("section.seeInAction", { name: t(`items.${current.id}.name`) })}
                </ButtonLink>
                <ButtonLink href="#compare" variant="secondary" size="md">
                  {t("section.compareCapabilities")}
                </ButtonLink>
              </div>
            </div>

            {/* Right: animated preview + screenshots */}
            <div className="flex flex-col gap-4">
              {current.id === "singgah" && (
                <LoyaltyPreview color={current.color} />
              )}
              {current.id === "operations" && (
                <OrderFlowPreview color={current.color} />
              )}
              {current.id === "pos" && <PosPreview color={current.color} />}

              <div className="grid grid-cols-3 gap-2">
                {current.showcase.map((s) => (
                  <SpotlightCard
                    key={s.src}
                    className="rounded-lg border border-border"
                  >
                    <a
                      href={s.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block overflow-hidden"
                    >
                      <Image
                        src={s.src}
                        alt={t(`items.${current.id}.showcase.${s.key}`)}
                        width={300}
                        height={200}
                        loading="lazy"
                        className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/45 group-hover:opacity-100">
                        <ExternalLink size={16} className="text-white" aria-hidden />
                      </span>
                    </a>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
