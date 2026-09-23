import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { site, whatsappUrl } from "@/lib/content";

/** Evaluated once per server render, not during hydration. */
const SERVER_YEAR = new Date().getFullYear();

const columns = [
  {
    title: "Product",
    links: [
      { label: "Singgah", href: "#products" },
      { label: "Operations", href: "#products" },
      { label: "POS System", href: "#products" },
      { label: "Compare", href: "#compare" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Chupjer", href: "#why" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
      { label: "Book a demo", href: "#demo" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo/chupjer-official-logo_1.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-md object-contain"
              />
              <span className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
                {site.name}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              The all-in-one business platform for Malaysian cafes, kopitiams and
              eateries.
            </p>
            <p className="mt-4 text-xs text-ink-subtle">{site.legalName}</p>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-ink-muted transition-colors hover:text-brand"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Get in touch</h3>
            <ul className="mt-3 space-y-2.5">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-brand"
                >
                  <MessageCircle size={15} aria-hidden />
                  +{site.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-brand"
                >
                  <Mail size={15} aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-ink-muted">
                <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden />
                {site.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-ink-subtle sm:flex-row">
          {/* Computed once at module load on the server, so the server-rendered
              year is the single source of truth and never mismatches on the
              client (a mid-render new Date() can straddle a timezone boundary). */}
          <p>&copy; {SERVER_YEAR} {site.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#faq" className="transition-colors hover:text-brand">
              FAQ
            </Link>
            <Link href="#pricing" className="transition-colors hover:text-brand">
              Pricing
            </Link>
            <a
              href={site.threads}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-brand"
            >
              Threads
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
