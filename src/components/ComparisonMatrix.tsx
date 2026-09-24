"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container, SectionHeader } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { matrixRows, products, type MatrixValue } from "@/lib/content";

function Cell({ value }: { value: MatrixValue }) {
  const t = useTranslations("matrix.section");
  const common = "flex h-6 w-6 items-center justify-center rounded-full";
  if (value === true) {
    return (
      <>
        <span className={`${common} bg-brand-tint text-brand`}>
          <Check size={14} aria-hidden />
        </span>
        <span className="sr-only">{t("included")}</span>
      </>
    );
  }
  if (value === "addon") {
    return (
      <>
        <span className={`${common} bg-[#8b5cf61a] text-[#8b5cf6]`}>
          <Plus size={14} aria-hidden />
        </span>
        <span className="sr-only">{t("addon")}</span>
      </>
    );
  }
  return (
    <>
      <span className={`${common} bg-bg-alt text-ink-subtle`}>
        <Minus size={14} aria-hidden />
      </span>
      <span className="sr-only">{t("notIncluded")}</span>
    </>
  );
}

export function ComparisonMatrix() {
  const t = useTranslations("matrix");
  const tProducts = useTranslations("products.items");

  return (
    <section id="compare" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
          subtitle={t("section.subtitle")}
        />

        <Reveal>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-surface shadow-card">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                {t("section.caption")}
              </caption>
              <thead>
                <tr className="border-b border-border">
                  <th
                    scope="col"
                    className="px-5 py-4 text-sm font-semibold text-ink"
                  >
                    {t("section.capability")}
                  </th>
                  {products.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className="px-3 py-4 text-center"
                    >
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: p.color }}
                          aria-hidden
                        />
                        {tProducts(`${p.id}.name`)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((row) => (
                  <tr
                    key={row.key}
                    className="border-b border-border last:border-0 hover:bg-surface-hover"
                  >
                    <th
                      scope="row"
                      className="px-5 py-3.5 text-sm font-medium text-ink-muted"
                    >
                      {t(`rows.${row.key}`)}
                    </th>
                    <td className="px-3 py-3.5 text-center">
                      <div className="flex justify-center">
                        <Cell value={row.singgah} />
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <div className="flex justify-center">
                        <Cell value={row.operations} />
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <div className="flex justify-center">
                        <Cell value={row.pos} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-subtle">
          <span className="flex items-center gap-1.5">
            <Check size={13} className="text-brand" aria-hidden /> {t("section.legendIncluded")}
          </span>
          <span className="flex items-center gap-1.5">
            <Plus size={13} className="text-[#8b5cf6]" aria-hidden /> {t("section.legendAddon")}
          </span>
          <span className="flex items-center gap-1.5">
            <Minus size={13} aria-hidden /> {t("section.legendNotIncluded")}
          </span>
        </p>
      </Container>
    </section>
  );
}
