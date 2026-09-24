import { CalendarCheck, Clock, MessageCircle, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/LeadForm";
import { getTranslations } from "next-intl/server";
import { whatsappUrl } from "@/lib/content";

export async function DemoCTA() {
  const t = await getTranslations("demo");
  const tWhatsapp = await getTranslations("whatsapp");
  const whatsappHref = whatsappUrl(tWhatsapp("general"));
  const assurances = [
    { icon: Clock, title: t("assurances.time.title"), desc: t("assurances.time.desc") },
    { icon: Users, title: t("assurances.menu.title"), desc: t("assurances.menu.desc") },
    { icon: CalendarCheck, title: t("assurances.schedule.title"), desc: t("assurances.schedule.desc") },
  ];

  return (
    <section
      id="demo"
      className="scroll-mt-24 border-t border-border bg-bg-alt py-20"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {t("subtitle")}
            </p>

            <ul className="mt-8 space-y-4">
              {assurances.map((a) => (
                <li key={a.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand">
                    <a.icon size={17} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{a.title}</p>
                    <p className="text-sm text-ink-muted">{a.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-border-strong hover:bg-surface-hover"
            >
              <MessageCircle size={16} aria-hidden />
              {t("preferWhatsapp")}
            </a>
          </div>

          <LeadForm />
        </div>
      </Container>
    </section>
  );
}
