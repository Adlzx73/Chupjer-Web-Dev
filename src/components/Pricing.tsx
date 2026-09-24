"use client";

import { Check, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container, SectionHeader } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { gatewayFees, plans } from "@/lib/content";
import { useWhatsappUrl } from "@/lib/useWhatsappUrl";

export function Pricing() {
  const t = useTranslations("pricing");
  /** Yearly billing = 2 months free, expressed as a monthly rate. */
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-24 border-t border-border bg-bg-alt py-20">
      <Container>
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
          subtitle={t("section.subtitle")}
        />

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span
            className={`text-sm ${!yearly ? "font-semibold text-ink" : "text-ink-muted"}`}
          >
            {t("section.monthly")}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label={t("section.toggleYearly")}
            onClick={() => setYearly((v) => !v)}
            className={`relative h-7 shrink-0 rounded-full transition-colors ${
              yearly ? "bg-brand-solid" : "bg-border"
            }`}
            style={{ width: "3.25rem" }}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                yearly ? "left-[2.1rem]" : "left-1"
              }`}
            />
          </button>
          <span
            className={`text-sm ${yearly ? "font-semibold text-ink" : "text-ink-muted"}`}
          >
            {t("section.yearly")}
          </span>
          <span className="rounded-full bg-brand-tint px-2.5 py-0.5 text-[11px] font-semibold text-brand">
            {t("section.twoMonthsFree")}
          </span>
        </div>

        <RevealGroup className="mt-10 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {plans.map((p) => {
            const monthlyRate = yearly
              ? Math.round((p.monthly * 10) / 12)
              : p.monthly;
            return (
              <RevealItem key={p.id}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl border bg-surface p-6 ${
                    p.popular
                      ? "border-brand shadow-[0_8px_32px_var(--cj-accent-glow)]"
                      : "border-border shadow-card"
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-6 rounded-full bg-brand-solid px-3 py-1 text-[11px] font-semibold text-white">
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

                  <div className="mt-5">
                    <span className="text-4xl font-bold text-ink">
                      RM{monthlyRate}
                    </span>
                    <span className="text-sm text-ink-muted">
                      {t("section.perMonth")}
                    </span>
                    {yearly && (
                      <p className="mt-1 text-xs text-ink-subtle">
                        {t("section.billedYearly", { amount: p.monthly * 10 })}
                      </p>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-ink-muted">
                    {t(`plans.${p.id}.description`)}
                  </p>

                  <ul className="mt-5 flex-1 space-y-2.5">
                    {(t.raw(`plans.${p.id}.features`) as string[]).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0"
                          style={{ color: p.color }}
                          aria-hidden
                        />
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
        <div className="mt-12 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h3 className="text-base font-bold text-ink">{t("gateway.title")}</h3>
          <p className="mt-1 text-sm text-ink-muted">{t("gateway.note")}</p>
          <dl className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {gatewayFees.map((g) => (
              <div
                key={g.method}
                className="flex items-center justify-between rounded-lg bg-bg-alt px-3 py-2.5"
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
