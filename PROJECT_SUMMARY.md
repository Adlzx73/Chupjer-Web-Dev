# Chupjer Web — Project Summary

> **Internal document — do not publish.** Last updated: 2026-09-27.

## Overview

**Chupjer** is a marketing/landing website for **Chupjer Digital Solutions (003807736-U)**, a Malaysian company offering an all-in-one SaaS platform for F&B businesses (cafes, kopitiams, eateries). The site sells three product packages, captures demo-request leads, and is fully bilingual (English / Bahasa Melayu).

- **Live site:** https://chupjer.com
- **Contact:** hello@chupjer.com · WhatsApp +60175916783
- **Location:** Perai, Pulau Pinang, Malaysia

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15.5 (App Router) |
| UI | React 19, Tailwind CSS v4, Motion (animations), lucide-react (icons) |
| i18n | next-intl v4 — locales `en` + `ms`, `localePrefix: "always"`, `NEXT_LOCALE` cookie |
| Backend | Supabase (lead capture only) via `@supabase/supabase-js` |
| Language | TypeScript 5 |
| Fonts | Inter + Space Grotesk (next/font) |
| Dev port | **3010** (`npm run dev`) |

## The Product Being Marketed

Three packages (ids in `src/lib/content.ts`):

1. **Singgah** (green #10b981) — Takeaway & loyalty storefront; no app download, PWA-based ordering + rewards.
2. **Operations** (orange #f97316) — QR dine-in ordering, kitchen order tickets (KOT), order progress, checkout.
3. **POS** (indigo #6366f1) — Counter point-of-sale with hardware, shift/cash-float management, analytics.

**Pricing tiers (MYR/month):** Cafe RM150 (single location) · Empayar RM390 (multi-location, marked "popular") · Franchise RM990 (10-location bundle). A payment-gateway fee table (FPX, cards, e-wallets, DuitNow, BNPL) is shown on the pricing section.

## Site Structure (single-page landing)

Route tree: `/[locale]` → one homepage composed of ordered sections (`src/components/HomePageSections.tsx`):

Navbar → Hero → ProductDeck → ComparisonMatrix → FindYourMatch (quiz) → RoiCalculator → WhyChupjer → Testimonials → Pricing → Faq (9 Q&As) → DemoCTA → Footer

Supporting routes/files:
- `src/app/api/leads/route.ts` — POST endpoint for the demo-request form (validates name/business/phone, normalises MY phone numbers to +60, inserts into Supabase `demo_leads` table; degrades gracefully when env vars are absent).
- `src/app/manifest.ts`, `robots.ts`, `sitemap.ts` — PWA + SEO infrastructure.
- `src/app/[locale]/[...rest]` + `not-found.tsx` — localised 404 handling.

## Key Architectural Patterns

- **`src/lib/content.ts` is the single source of truth** for all locale-independent data: product ids, colors, feature keys, showcase images, prices, plans, quiz scoring, testimonials, FAQ keys, brand logos. All human-readable copy lives in `messages/en.json` / `messages/ms.json`, keyed by those stable ids.
- **i18n:** middleware (`src/middleware.ts`) handles `/en` and `/ms` prefixes and the root redirect (cookie → Accept-Language → `/en`). Both locales are statically rendered (`generateStaticParams`) with hreflang alternates and per-locale metadata.
- **SEO:** full OpenGraph/Twitter metadata, Organization + SoftwareApplication JSON-LD structured data, bilingual keywords targeting "cafe POS Malaysia", "QR table ordering", etc.
- **Theming:** `ThemeScript` (pre-hydration, prevents FOUC) + `ThemeSync` + `ThemeToggle`; `suppressHydrationWarning` on `<html>`.
- **Graceful degradation:** Supabase client returns `null` without env vars — the lead form still "works" locally and logs a warning instead of failing.
- **Custom hooks** in `src/lib/`: `useScrollSpy`, `useReducedMotionSafe`, `useWhatsappUrl` (deep-links with pre-filled, translated WhatsApp messages).

## Environment & Setup

Required env vars (see `.env.example`):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
The `demo_leads` table schema (with RLS enabled) is documented in `.env.example`. Without these vars the site runs fine; leads just aren't persisted.

Commands: `npm run dev` (port 3010) · `npm run build` · `npm start` · `npm run lint`

## Repo History

```
27ab06d feat: visual refresh of landing page sections and dev port change
15d79f1 feat: bilingual EN/MS support with locale routing and SEO hreflang
6d76f9a fix: prevent hydration mismatches from reduced-motion and year rendering
5c3c7f7 new Project
229a56e Initial commit from Create Next App
```

Ongoing/planned work is tracked in `plans/` (currently: mobile overflow & responsiveness).

## Notable Implementation Details

- **FindYourMatch quiz:** 2-step quiz (business type + pain point) with weighted scoring toward one of the three products (`quizSteps` in content.ts).
- **RoiCalculator:** interactive ROI estimator for prospective customers.
- **ComparisonMatrix:** 7-feature × 3-package matrix with `true | false | "addon"` values.
- **Stats bar:** live stats (orders processed, menu items, businesses, locations) with Supabase-backed override and hardcoded fallbacks (3,500+ orders, 200+ menu items, 8 businesses, 7 locations).
- **Testimonials/brands:** Shhine, TwentyOne.cafe, ROAG, The Table, Beartik HQ.
- **WhatsApp-first CTA strategy:** primary conversion path is a WhatsApp deep link with pre-filled translated message; secondary is the lead form.
- PostCSS version is pinned via `overrides` (`postcss ^8.5.28`).
