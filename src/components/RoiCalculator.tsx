"use client";

import { useMemo, useState } from "react";
import { Container, SectionHeader } from "@/components/ui/Container";
import { plans } from "@/lib/content";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-MY", { maximumFractionDigits: 0 }).format(n);

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  hint,
}: {
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
        <label htmlFor={`roi-${label}`} className="text-sm font-medium text-ink">
          {label}
        </label>
        <span className="text-sm font-bold text-brand">{display}</span>
      </div>
      <input
        id={`roi-${label}`}
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
  const [orders, setOrders] = useState(40);
  const [avgTicket, setAvgTicket] = useState(18);
  const [locations, setLocations] = useState(1);

  // Which plan fits, and the derived maths.
  const { plan, sub, net, paybackDays } = useMemo(() => {
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

    return { plan, sub, net, paybackDays };
  }, [orders, avgTicket, locations]);

  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow="ROI Calculator"
          title="What does Chupjer actually pay back?"
          subtitle="Drag the sliders to match your business. We show the maths — including the costs."
        />

        <div className="mt-10 grid gap-6 rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8 lg:grid-cols-[1fr_1fr]">
          {/* Inputs */}
          <div className="space-y-6">
            <Slider
              label="Orders per day"
              value={orders}
              min={5}
              max={300}
              step={5}
              onChange={setOrders}
              display={`${orders} / day`}
            />
            <Slider
              label="Average order value"
              value={avgTicket}
              min={5}
              max={80}
              step={1}
              onChange={setAvgTicket}
              display={`RM${avgTicket}`}
            />
            <Slider
              label="Locations"
              value={locations}
              min={1}
              max={10}
              step={1}
              onChange={setLocations}
              display={locations === 1 ? "1 location" : `${locations} locations`}
            />

            <div className="rounded-xl border border-border bg-bg-alt p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                How we calculate this
              </p>
              <ul className="mt-2 space-y-1 text-xs text-ink-muted">
                <li>• +12% order volume from online ordering &amp; repeat visits</li>
                <li>• 6 hrs/week of admin saved, valued at RM25/hr</li>
                <li>• Less your subscription and the 2% platform fee</li>
              </ul>
              <p className="mt-2 text-[11px] text-ink-subtle">
                Illustrative estimate based on typical Chupjer customers.
              </p>
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-center rounded-xl border border-border bg-bg-alt p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Estimated monthly gain
            </p>
            <p className="mt-2 text-4xl font-bold text-ink sm:text-5xl">
              RM{fmt(net)}
            </p>

            <dl className="mt-6 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Recommended plan</dt>
                <dd className="font-semibold text-ink">{plan.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Subscription</dt>
                <dd className="font-semibold text-ink">RM{fmt(sub)}/mo</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Pays for itself in</dt>
                <dd className="font-semibold text-ink">
                  {paybackDays > 0 ? `${paybackDays} days` : "—"}
                </dd>
              </div>
            </dl>

            <a
              href="#demo"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-solid px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover"
            >
              Get a personalised estimate
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
