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
      className="texture-warm scroll-mt-24 border-t border-border bg-bg-alt py-24"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-[2.5rem]">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              {t("subtitle")}
            </p>

            <ul className="mt-9 space-y-5">
              {assurances.map((a) => (
                <li key={a.title} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-brand-ring bg-brand-tint text-brand">
                    <a.icon size={17} aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{a.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{a.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-ink shadow-card transition-colors hover:border-border-strong hover:bg-surface-hover"
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
