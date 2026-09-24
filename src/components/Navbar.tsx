"use client";

import { Menu, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/content";
import { useWhatsappUrl } from "@/lib/useWhatsappUrl";

export function Navbar() {
  const t = useTranslations("nav");
  const whatsappHref = useWhatsappUrl();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { label: t("products"), href: "#products" },
    { label: t("compare"), href: "#compare" },
    { label: t("pricing"), href: "#pricing" },
    { label: t("faq"), href: "#faq" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-border bg-surface/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2" aria-label={site.name}>
            <Image
              src="/logo/chupjer-official-logo_1.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 rounded-md object-contain"
            />
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink">
              {site.name}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label={t("mainNav")}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-brand-tint hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <ButtonLink href="#demo" size="md" className="hidden md:inline-flex">
              {t("bookDemo")}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted md:hidden"
            >
              <Menu size={18} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 right-0 w-[80%] max-w-xs border-l border-border bg-surface p-5 shadow-elevated">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
                {t("menu")}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("closeMenu")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1" aria-label={t("mobileNav")}>
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink-muted transition-colors hover:bg-brand-tint hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="mt-6">
              <ButtonLink
                href="#demo"
                size="lg"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {t("bookDemo")}
              </ButtonLink>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sticky bottom bar — biggest mobile conversion win */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-ink"
          >
            <MessageCircle size={16} aria-hidden />
            {t("whatsapp")}
          </a>
          <ButtonLink href="#demo" size="md" className="flex-1">
            {t("bookDemo")}
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
