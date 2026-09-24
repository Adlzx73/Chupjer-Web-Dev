import { Container, SectionHeader } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { whyPoints } from "@/lib/content";
import { getTranslations } from "next-intl/server";

export async function WhyChupjer() {
  const t = await getTranslations("why");

  return (
    <section id="why" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
          subtitle={t("section.subtitle")}
        />

        <RevealGroup
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {whyPoints.map((w) => (
            <RevealItem key={w.key}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong hover:bg-surface-hover">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${w.color}1a`, color: w.color }}
                  aria-hidden
                >
                  <span className="h-3 w-3 rounded-full" style={{ background: w.color }} />
                </span>
                <h3 className="mt-4 text-base font-bold">{t(`points.${w.key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {t(`points.${w.key}.desc`)}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
