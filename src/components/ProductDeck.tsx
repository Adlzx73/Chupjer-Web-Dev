"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import {
  LoyaltyPreview,
  OrderFlowPreview,
  PosPreview,
} from "@/components/ProductPreviews";
import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeader } from "@/components/ui/Container";
import { products, type Product, type ProductId } from "@/lib/content";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export function ProductDeck() {
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
          eyebrow="The 3 Packages"
          title="One Platform. Three Ways to Run Your Business."
          subtitle="Mix and match what you need. Every package works standalone and connects seamlessly when you're ready to scale."
        />

        {/* ---------- Tablist ---------- */}
        <div
          role="tablist"
          aria-label="Chupjer packages"
          aria-orientation="horizontal"
          className="mx-auto mt-10 flex max-w-2xl gap-2 overflow-x-auto rounded-2xl border border-border bg-surface p-2 no-scrollbar"
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
                  <span className="hidden sm:inline">{p.name}</span>
                  <span className="sm:hidden">{p.shortName}</span>
                </span>
                <span className="relative text-[11px] opacity-75">
                  {p.tagline}
                </span>
              </button>
            );
          })}
        </div>

        {/* ---------- Panels ---------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            role="tabpanel"
            id={`${uid}-panel-${current.id}`}
            aria-labelledby={`${uid}-tab-${current.id}`}
            tabIndex={0}
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-8 rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-2"
          >
            {/* Left: copy + features */}
            <div>
              <p
                className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{ background: `${current.color}1a`, color: current.color }}
              >
                {current.persona}
              </p>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                {current.name}
              </h3>
              <p
                className="mt-1.5 text-base font-medium"
                style={{ color: current.color }}
              >
                {current.hook}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {current.description}
              </p>

              <ul className="mt-6 space-y-3">
                {current.features.map((f) => (
                  <li key={f.title} className="flex gap-3">
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
                      <p className="text-sm font-semibold text-ink">{f.title}</p>
                      <p className="text-sm text-ink-muted">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="#demo" size="md">
                  See {current.name} in action
                </ButtonLink>
                <ButtonLink href="#compare" variant="secondary" size="md">
                  Compare capabilities
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
                  <a
                    key={s.src}
                    href={s.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-lg border border-border"
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={300}
                      height={200}
                      className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-opacity group-hover:bg-black/45 group-hover:opacity-100">
                      <ExternalLink size={16} className="text-white" aria-hidden />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
