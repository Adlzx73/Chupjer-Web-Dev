"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { Container, SectionHeader } from "@/components/ui/Container";
import { faqs } from "@/lib/content";

/** FAQPage schema for rich results in Google. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" className="scroll-mt-24 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Still unsure? Message us on WhatsApp — we reply fast."
        />

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`${uid}-trigger-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-hover"
                  >
                    <span className="text-sm font-semibold text-ink sm:text-base">
                      {f.q}
                    </span>
                    <Plus
                      size={18}
                      className={`shrink-0 text-ink-subtle transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={`${uid}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${uid}-trigger-${i}`}
                  hidden={!isOpen}
                  className="px-5 pb-5"
                >
                  <p className="text-sm leading-relaxed text-ink-muted">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
