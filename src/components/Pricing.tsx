"use client";

import { Check, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container, SectionHeader } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { gatewayFees, plans } from "@/lib/content";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useWhatsappUrl } from "@/lib/useWhatsappUrl";

export function Pricing() {
  const t = useTranslations("pricing");
  const reduce = useReducedMotionSafe();
  /** Yearly billing = 2 months free, expressed as a monthly rate. */
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="texture-warm content-auto scroll-mt-24 border-t border-border bg-bg-alt py-24">
      <Container>
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
          subtitle={t("section.subtitle")}
        />

        {/* Billing toggle */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span
            className={`text-sm transition-colors ${!yearly ? "font-semibold text-ink" : "text-ink-subtle"}`}
          >
            {t("section.monthly")}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label={t("section.toggleYearly")}
            onClick={() => setYearly((v) => !v)}
            className={`relative h-8 shrink-0 rounded-full border transition-colors duration-300 ${
              yearly
                ? "border-brand-solid bg-brand-solid shadow-[0_2px_12px_var(--cj-accent-glow)]"
                : "border-border-strong bg-surface"
            }`}
            style={{ width: "3.5rem" }}
          >
            <motion.span
              className="absolute left-1 top-1 h-[22px] w-[22px] rounded-full bg-white shadow-sm"
              animate={{ x: yearly ? 26 : 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 500, damping: 32 }
              }
            />
          </button>
          <span
            className={`text-sm transition-colors ${yearly ? "font-semibold text-ink" : "text-ink-subtle"}`}
          >
            {t("section.yearly")}
          </span>
          <span className="rounded-full border border-brand-ring bg-brand-tint px-2.5 py-0.5 text-[11px] font-semibold text-brand">
            {t("section.twoMonthsFree")}
          </span>
        </div>

        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch" stagger={0.1}>
          {plans.map((p) => {
            const monthlyRate = yearly
              ? Math.round((p.monthly * 10) / 12)
              : p.monthly;
            return (
              <RevealItem key={p.id} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-[1.25rem] border p-7 transition-[transform,box-shadow] duration-300 ${
                    p.popular
                      ? "border-brand bg-surface shadow-[0_16px_44px_var(--cj-accent-glow)] lg:-translate-y-2 lg:scale-[1.02]"
                      : "border-border bg-surface shadow-card hover:-translate-y-1 hover:shadow-elevated"
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-solid px-3.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-[0_4px_14px_var(--cj-accent-glow)]">
                      {t("section.mostPopular")}
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: p.color }}
                      aria-hidden
                    />
                    <h3 className="text-lg font-bold text-ink">
                      {t(`plans.${p.id}.name`)}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-ink-subtle">
                    {t(`plans.${p.id}.subtitle`)}
                  </p>

                  <div className="mt-6 border-b border-border pb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[2.6rem] font-bold leading-none tracking-tight text-ink">
                        RM{monthlyRate}
                      </span>
                      <span className="text-sm text-ink-muted">
                        {t("section.perMonth")}
                      </span>
                    </div>
                    {yearly && (
                      <p className="mt-2 text-xs text-ink-subtle">
                        {t("section.billedYearly", { amount: p.monthly * 10 })}
                      </p>
                    )}
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                    {t(`plans.${p.id}.description`)}
                  </p>

                  <ul className="mt-5 flex-1 space-y-3">
                    {(t.raw(`plans.${p.id}.features`) as string[]).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <span
                          className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                          style={{ background: `${p.color}1f` }}
                        >
                          <Check
                            size={11}
                            style={{ color: p.color }}
                            aria-hidden
                          />
                        </span>
                        <span className="text-ink-muted">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <PlanCta planId={p.id} tier={t(`plans.${p.id}.subtitle`)} />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Gateway fees */}
        <div className="mt-14 rounded-[1.25rem] border border-border bg-surface p-6 shadow-card sm:p-8">
          <h3 className="text-base font-bold text-ink">{t("gateway.title")}</h3>
          <p className="mt-1 text-sm text-ink-muted">{t("gateway.note")}</p>
          <dl className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {gatewayFees.map((g) => (
              <div
                key={g.method}
                className="flex items-center justify-between rounded-xl bg-bg-alt px-3.5 py-2.5"
              >
                <dt className="text-sm text-ink-muted">{t(`gatewayFees.${g.method}`)}</dt>
                <dd className="text-sm font-semibold text-ink">{t(`gatewayFees.${g.fee}`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

/** Isolated so the hook order stays stable across the plans map. */
function PlanCta({
  planId,
  tier,
}: {
  planId: string;
  tier: string;
}) {
  const href = useWhatsappUrl(planId, tier);
  const t = useTranslations("pricing");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors ${
        planId === "empayar"
          ? "bg-brand-solid text-white hover:bg-brand-hover"
          : "border border-border text-ink hover:border-border-strong hover:bg-surface-hover"
      }`}
    >
      <MessageCircle size={15} aria-hidden />
      {t(`plans.${planId}.cta`)}
    </a>
  );
}
