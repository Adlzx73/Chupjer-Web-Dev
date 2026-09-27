"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/content";
import { useScrollSpy } from "@/lib/useScrollSpy";

const SPY_IDS = ["products", "compare", "pricing", "faq"];

export function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  const activeId = useScrollSpy(SPY_IDS);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          const delta = y - lastY.current;
          if (y < 120) {
            setHidden(false);
          } else if (Math.abs(delta) > 4) {
            setHidden(delta > 0);
          }
          lastY.current = y;
          ticking = false;
        });
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never hide while the mobile drawer is open.
  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  // Prevent background scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { label: t("products"), href: "#products", id: "products" },
    { label: t("compare"), href: "#compare", id: "compare" },
    { label: t("pricing"), href: "#pricing", id: "pricing" },
    { label: t("faq"), href: "#faq", id: "faq" },
  ];

  const linkClass = (id: string) => {
    const base =
      "relative rounded-full px-3 py-2 text-sm font-medium transition-colors";
    const active =
      "text-ink after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand after:content-['']";
    const idle = "text-ink-muted hover:bg-brand-tint hover:text-ink";
    return `${base} ${activeId === id ? active : idle}`;
  };

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,colors] duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "border-b border-border bg-surface/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted md:hidden"
            >
              <Menu size={18} aria-hidden />
            </button>
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
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label={t("mainNav")}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={activeId === l.id ? "true" : undefined}
                className={linkClass(l.id)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <ButtonLink href="#demo" size="md">
              {t("bookDemo")}
            </ButtonLink>
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
          <div className="absolute inset-y-0 left-0 w-[80%] max-w-xs border-r border-border bg-surface p-5 shadow-elevated">
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
                  aria-current={activeId === l.id ? "true" : undefined}
                  className={`rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-brand-tint hover:text-ink ${
                    activeId === l.id ? "text-ink" : "text-ink-muted"
                  }`}
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
    </>
  );
}
