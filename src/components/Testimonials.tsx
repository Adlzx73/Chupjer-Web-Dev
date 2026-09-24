import Image from "next/image";
import { Quote } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";
import { getTranslations } from "next-intl/server";

export async function Testimonials() {
  const t = await getTranslations("testimonials");

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-t border-border bg-bg-alt py-20"
    >
      <Container>
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
        />

        <RevealGroup
          className="mt-12 grid gap-6 md:grid-cols-3"
          stagger={0.1}
        >
          {testimonials.map((item) => (
            <RevealItem key={item.key}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
                <Quote
                  size={22}
                  className="shrink-0"
                  style={{ color: item.color }}
                  aria-hidden
                />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {t(`items.${item.key}.quote`)}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2.5 border-t border-border pt-4">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-md object-contain"
                    />
                  ) : (
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold text-white"
                      style={{ background: item.color }}
                      aria-hidden
                    >
                      {item.orgName.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-ink">
                    {item.orgName}
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
