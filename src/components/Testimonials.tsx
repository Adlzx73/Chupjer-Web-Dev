import Image from "next/image";
import { Quote } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";
import { getTranslations } from "next-intl/server";

/**
 * Organic asymmetric quote wall — one large feature card plus stacked
 * secondary cards — so the section reads editorial rather than as a
 * uniform 3-up template grid.
 */
export async function Testimonials() {
  const t = await getTranslations("testimonials");

  const [feature, ...rest] = testimonials;

  return (
    <section
      id="testimonials"
      className="texture-warm content-auto scroll-mt-24 border-t border-border bg-bg-alt py-24"
    >
      <Container>
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
        />

        <RevealGroup
          className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]"
          stagger={0.12}
        >
          {/* Feature quote */}
          <RevealItem>
            <figure className="relative flex h-full flex-col rounded-[1.25rem] border border-border bg-surface p-8 shadow-card sm:p-10">
              <span
                className="pointer-events-none absolute right-8 top-8 select-none font-display text-[7rem] font-bold leading-none opacity-[0.08]"
                style={{ color: feature.color }}
                aria-hidden
              >
                &rdquo;
              </span>
              <Quote
                size={26}
                className="shrink-0"
                style={{ color: feature.color }}
                aria-hidden
              />
              <blockquote className="mt-5 flex-1 font-display text-xl font-medium leading-snug text-ink sm:text-2xl">
                {t(`items.${feature.key}.quote`)}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                <BrandMark item={feature} />
                <div>
                  <span className="block text-sm font-semibold text-ink">
                    {feature.orgName}
                  </span>
                  <span
                    className="mt-0.5 block h-0.5 w-8 rounded-full"
                    style={{ background: feature.color }}
                    aria-hidden
                  />
                </div>
              </figcaption>
            </figure>
          </RevealItem>

          {/* Secondary quotes, stacked */}
          <div className="flex flex-col gap-6">
            {rest.map((item) => (
              <RevealItem key={item.key} className="flex-1">
                <figure className="flex h-full flex-col rounded-[1.25rem] border border-border bg-surface p-6 shadow-card sm:p-7">
                  <Quote
                    size={20}
                    className="shrink-0"
                    style={{ color: item.color }}
                    aria-hidden
                  />
                  <blockquote className="mt-3 flex-1 text-base leading-relaxed text-ink-muted">
                    {t(`items.${item.key}.quote`)}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-2.5 border-t border-border pt-4">
                    <BrandMark item={item} small />
                    <span className="text-sm font-semibold text-ink">
                      {item.orgName}
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}

function BrandMark({
  item,
  small = false,
}: {
  item: (typeof testimonials)[number];
  small?: boolean;
}) {
  const size = small ? "h-8 w-8" : "h-10 w-10";
  if (item.logo) {
    return (
      <Image
        src={item.logo}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        className={`${size} rounded-lg object-contain`}
      />
    );
  }
  return (
    <span
      className={`flex ${size} items-center justify-center rounded-lg text-xs font-bold text-white`}
      style={{ background: item.color }}
      aria-hidden
    >
      {item.orgName.slice(0, 2).toUpperCase()}
    </span>
  );
}
