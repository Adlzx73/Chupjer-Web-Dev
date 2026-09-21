import { CalendarCheck, Clock, MessageCircle, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/LeadForm";
import { whatsappUrl } from "@/lib/content";

const assurances = [
  { icon: Clock, title: "10 minutes", desc: "A focused walkthrough, not a sales marathon." },
  { icon: Users, title: "Your menu, live", desc: "We demo with your actual setup wherever possible." },
  { icon: CalendarCheck, title: "You pick the time", desc: "Morning, night, weekend — we work around service hours." },
];

export function DemoCTA() {
  return (
    <section
      id="demo"
      className="scroll-mt-24 border-t border-border bg-bg-alt py-20"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Book a demo
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              See Chupjer run your cafe — in 10 minutes.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Tell us a little about your business and we&apos;ll show you exactly
              how the system would work for you. No commitment, no card required.
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
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-border-strong hover:bg-surface-hover"
            >
              <MessageCircle size={16} aria-hidden />
              Prefer WhatsApp? Chat now
            </a>
          </div>

          <LeadForm />
        </div>
      </Container>
    </section>
  );
}
