"use client";

import { motion } from "motion/react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/Button";
import { Container, SectionHeader } from "@/components/ui/Container";
import { products, quizSteps, type ProductId } from "@/lib/content";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export function FindYourMatch() {
  const t = useTranslations("quiz");
  const tProducts = useTranslations("products.items");
  const reduce = useReducedMotionSafe();
  const [step, setStep] = useState(0);
  /** option id per step */
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const result = useMemo<ProductId | null>(() => {
    if (Object.keys(answers).length < quizSteps.length) return null;

    const tally: Record<ProductId, number> = { singgah: 0, operations: 0, pos: 0 };
    for (const s of quizSteps) {
      const picked = s.options.find((o) => o.id === answers[s.id]);
      if (!picked) return null;
      (Object.keys(tally) as ProductId[]).forEach((k) => {
        tally[k] += picked.scores[k];
      });
    }
    return (Object.keys(tally) as ProductId[]).reduce((a, b) =>
      tally[b] > tally[a] ? b : a,
    );
  }, [answers]);

  function choose(optionId: string) {
    setAnswers((prev) => ({ ...prev, [quizSteps[step].id]: optionId }));
    // Let the selection register visually before advancing.
    if (!reduce) {
      setTimeout(() => setStep((s) => s + 1), 260);
    } else {
      setStep((s) => s + 1);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
  }

  const matched = products.find((p) => p.id === result);


  return (
    <section className="border-y border-border bg-bg-alt py-20">
      <Container>
        <SectionHeader
          eyebrow={t("section.eyebrow")}
          title={t("section.title")}
          subtitle={t("section.subtitle")}
        />

        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
          {!matched ? (
            <>
              {/* Progress */}
              <div className="flex items-center gap-2" aria-hidden>
                {quizSteps.map((s, i) => (
                  <div
                    key={s.id}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= step ? "bg-brand" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs font-medium text-ink-subtle">
                {t("section.progress", { current: step + 1, total: quizSteps.length })}
              </p>

              <motion.div
                key={quizSteps[step].id}
                initial={reduce ? undefined : { opacity: 0, x: 20 }}
                animate={reduce ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3
                  id="quiz-question"
                  className="mt-2 text-xl font-bold sm:text-2xl"
                >
                  {t(`steps.${quizSteps[step].id}.question`)}
                </h3>

                <div
                  role="radiogroup"
                  aria-labelledby="quiz-question"
                  className="mt-5 space-y-2.5"
                >
                  {quizSteps[step].options.map((o) => {
                    const selected = answers[quizSteps[step].id] === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => choose(o.id)}
                        className={`w-full rounded-xl border p-4 text-left transition-colors ${
                          selected
                            ? "border-brand bg-brand-tint"
                            : "border-border hover:border-border-strong hover:bg-surface-hover"
                        }`}
                      >
                        <span className="block text-sm font-semibold text-ink">
                          {t(`steps.${quizSteps[step].id}.options.${o.id}.label`)}
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-muted">
                          {t(`steps.${quizSteps[step].id}.options.${o.id}.desc`)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          ) : (
            /* ---------- Result ---------- */
            <motion.div
              initial={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                {t("section.yourMatch")}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: matched.color }}
                  aria-hidden
                />
                <h3 className="text-2xl font-bold sm:text-3xl">
                  {tProducts(`${matched.id}.name`)}
                </h3>
              </div>
              <p
                className="mt-2 text-sm font-medium"
                style={{ color: matched.color }}
              >
                {tProducts(`${matched.id}.hook`)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {tProducts(`${matched.id}.description`)}
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {matched.features.slice(0, 4).map((f) => (
                  <li
                    key={f}
                    className="rounded-lg border border-border bg-bg-alt px-3 py-2.5"
                  >
                    <p className="text-xs font-semibold text-ink">
                      {tProducts(`${matched.id}.features.${f}.title`)}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="#pricing" size="md">
                  {t("section.seePricing")}
                  <ArrowRight size={15} aria-hidden />
                </ButtonLink>
                <ButtonLink href="#demo" variant="secondary" size="md">
                  {t("section.bookDemo")}
                </ButtonLink>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                >
                  <RotateCcw size={14} aria-hidden />
                  {t("section.startOver")}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
