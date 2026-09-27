"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Container, SectionHeader } from "@/components/ui/Container";
import { plans, type PlanId } from "@/lib/content";

const intlLocale = (locale: string) => (locale === "ms" ? "ms-MY" : "en-MY");

function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  hint,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        <span className="text-sm font-bold text-brand">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-brand"
      />
      {hint && <p className="mt-1 text-xs text-ink-subtle">{hint}</p>}
    </div>
  );
}

export function RoiCalculator() {
  const t = useTranslations("roi");
  const locale = useLocale();
  const [orders, setOrders] = useState(40);
  const [avgTicket, setAvgTicket] = useState(18);
  const [locations, setLocations] = useState(1);

  const fmt = (n: number) =>
    new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 0 }).format(n);

  // Which plan fits, and the derived maths.
  const { planId, sub, net, paybackDays } = useMemo(() => {
    const plan =
      locations <= 1 ? plans[0] : locations <= 3 ? plans[1] : plans[2];
    const sub = plan.monthly;

    // Conservative, stated-up-front assumptions.
    const extraOrders = Math.round(orders * 30 * 0.12); // +12% order volume
    const extraRevenue = extraOrders * avgTicket;
    const growthFee = extraRevenue * 0.02; // 2% platform fee

    // 6 hours/week of admin saved at RM25/hr, monthly.
    const labourSaved = 6 * 4.33 * 25;
    const net = extraRevenue + labourSaved - sub - growthFee;
    const paybackDays = net > 0 ? Math.ceil(sub / (net / 30)) : 0;

    return { planId: plan.id as PlanId, sub, net, paybackDays };
  }, [orders, avgTicket, locations]);

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
          subtitle={t("section.subtitle")}
        />

        <div className="mt-10 grid gap-6 rounded-[1.25rem] border border-border bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-[1fr_1fr]">
          {/* Inputs */}
          <div className="space-y-6">
            <Slider
              id="roi-orders"
              label={t("ordersLabel")}
              value={orders}
              min={5}
              max={300}
              step={5}
              onChange={setOrders}
              display={t("perDay", { value: fmt(orders) })}
            />
            <Slider
              id="roi-avg-ticket"
              label={t("avgTicketLabel")}
              value={avgTicket}
              min={5}
              max={80}
              step={1}
              onChange={setAvgTicket}
              display={`RM${avgTicket}`}
            />
            <Slider
              id="roi-locations"
              label={t("locationsLabel")}
              value={locations}
              min={1}
              max={10}
              step={1}
              onChange={setLocations}
              display={
                locations === 1
                  ? t("oneLocation")
                  : t("manyLocations", { count: fmt(locations) })
              }
            />

            <div className="rounded-xl border border-border bg-bg-alt p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                {t("howTitle")}
              </p>
              <ul className="mt-2 space-y-1 text-xs text-ink-muted">
                <li>• {t("how1")}</li>
                <li>• {t("how2")}</li>
                <li>• {t("how3")}</li>
              </ul>
              <p className="mt-2 text-[11px] text-ink-subtle">{t("disclaimer")}</p>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-center rounded-xl border border-border bg-bg-alt p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {t("estimatedGain")}
            </p>
            <p className="mt-2 text-4xl font-bold text-ink sm:text-5xl">
              RM{fmt(net)}
            </p>

            <dl className="mt-6 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-muted">{t("recommendedPlan")}</dt>
                <dd className="font-semibold text-ink">
                  {planId === "cafe" ? "Cafe" : planId === "empayar" ? "Empayar" : "Franchise"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">{t("subscription")}</dt>
                <dd className="font-semibold text-ink">
                  {t("perMonth", { amount: fmt(sub) })}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">{t("paysForItself")}</dt>
                <dd className="font-semibold text-ink">
                  {paybackDays > 0 ? t("days", { count: paybackDays }) : "—"}
                </dd>
              </div>
            </dl>

            <a
              href="#demo"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-solid px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
            >
              {t("getEstimate")}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
