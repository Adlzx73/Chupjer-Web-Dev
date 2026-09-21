import Image from "next/image";
import { Quote } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-t border-border bg-bg-alt py-20"
    >
      <Container>
        <SectionHeader
          eyebrow="Testimonials"
          title="Loved by cafe owners across Malaysia."
        />

        <RevealGroup
          className="mt-12 grid gap-6 md:grid-cols-3"
          stagger={0.1}
        >
          {testimonials.map((t) => (
            <RevealItem key={t.orgName}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-card">
                <Quote
                  size={22}
                  className="shrink-0"
                  style={{ color: t.color }}
                  aria-hidden
                />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2.5 border-t border-border pt-4">
                  {t.logo ? (
                    <Image
                      src={t.logo}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-md object-contain"
                    />
                  ) : (
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold text-white"
                      style={{ background: t.color }}
                      aria-hidden
                    >
                      {t.orgName.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-ink">
                    {t.orgName}
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
