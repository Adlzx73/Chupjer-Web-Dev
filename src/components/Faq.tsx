"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Container, SectionHeader } from "@/components/ui/Container";
import { faqKeys } from "@/lib/content";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export function Faq() {
  const t = useTranslations("faq");
  const reduce = useReducedMotionSafe();
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  const faqs = faqKeys.map((key) => ({
    key,
    q: t(`items.${key}.q`),
    a: t(`items.${key}.a`),
  }));

  /** FAQPage schema for rich results in Google, in the active locale. */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="content-auto scroll-mt-24 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container>
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
          subtitle={t("section.subtitle")}
        />

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border overflow-hidden rounded-[1.25rem] border border-border bg-surface">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.key}>
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
                    <motion.span
                      aria-hidden
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 28 }
                      }
                    >
                      <Plus
                        size={18}
                        className="shrink-0 text-ink-subtle"
                      />
                    </motion.span>
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
