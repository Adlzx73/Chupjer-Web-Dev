/**
 * Single source of truth for all marketing copy.
 * Ported verbatim from the live chupjer.com bundle so no existing
 * messaging is lost during the redesign.
 */

export const site = {
  name: "Chupjer",
  legalName: "Chupjer Digital Solutions (003807736-U)",
  url: "https://chupjer.com",
  tagline: "The All-in-One Business Platform for Malaysia",
  whatsapp: "60162955337",
  email: "hello@chupjer.com",
  address: "Perai, Pulau Pinang, Malaysia",
  threads: "https://www.threads.com/firdausizam89",
} as const;

/** Deep-links with a pre-filled message, matching live behaviour. */
export function whatsappUrl(plan?: string, tier?: string) {
  const text =
    plan && tier
      ? `Hi, saya berminat dengan Chupjer plan ${plan} (${tier}). Boleh tahu lebih lanjut?`
      : "Hi, saya berminat dengan Chupjer. Boleh tahu lebih lanjut?";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Built for Malaysian cafes, kopitiams & eateries",
  headline: "The Operating System for Modern Cafes & Eateries.",
  subheadline:
    "Everything your cafe needs—from grab-and-go loyalty to seamless QR table orders and counter POS. Zero enterprise headaches.",
  primaryCta: "Book a 10-Min Live Demo",
  secondaryCta: "Explore the 3 Packages",
  trustHeading:
    "Trusted by artisan cafes, kopitiams, and food spots across Malaysia.",
  /** Words that cycle in the animated headline slot. */
  cyclingWords: [
    "Double your sales.",
    "Cut the chaos.",
    "Grow your regulars.",
    "Own your brand.",
    "Scale with confidence.",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export type Stat = {
  key: string;
  label: string;
  suffix: string;
  /** Live from Supabase when configured; this is the fallback. */
  value: number;
};

export const stats: Stat[] = [
  { key: "orders_processed", label: "Orders Processed", suffix: "+", value: 3500 },
  { key: "menu_items", label: "Menu Items", suffix: "+", value: 200 },
  { key: "businesses", label: "Businesses", suffix: "", value: 8 },
  { key: "locations", label: "Locations", suffix: "", value: 7 },
];


/* ------------------------------------------------------------------ */
/* Products (the 3-package deck)                                       */
/* ------------------------------------------------------------------ */

export type ProductId = "singgah" | "operations" | "pos";

export type Product = {
  id: ProductId;
  name: string;
  /** Short label used in the narrow mobile tab strip. */
  shortName: string;
  tagline: string;
  persona: string;
  hook: string;
  description: string;
  color: string;
  features: { title: string; desc: string }[];
  showcase: { src: string; alt: string }[];
};

export const products: Product[] = [
  {
    id: "singgah",
    name: "Singgah",
    shortName: "Singgah",
    tagline: "Takeaway & Loyalty",
    persona: "Best for Takeaway Kiosks, Coffee Bars & Growing Cafes",
    hook: "Turn first-time walk-ins into loyal regulars.",
    description:
      "Beautiful branded storefronts that let your customers order, pay, and earn rewards — all from their phone. No downloads needed.",
    color: "#10b981",
    features: [
      {
        title: "No App Download Required",
        desc: "Works straight in the browser. PWA-ready for home-screen installs.",
      },
      {
        title: "Digital Loyalty & Points Engine",
        desc: "Earn points per RM spent, with automated birthday treats & cash vouchers.",
      },
      {
        title: "Instant Grab-and-Go Pickup",
        desc: "Let customers order ahead and skip the queue entirely.",
      },
      {
        title: "Mobile Digital Menu",
        desc: "Clean take-out menu with modifiers, add-ons and live availability.",
      },
    ],
    showcase: [
      { src: "/assets/perkspage-DNqzkNu7.png", alt: "Singgah perks & rewards page" },
      { src: "/assets/homepage_twentyonecafe-CgHeMnk-.png", alt: "Singgah store homepage" },
      { src: "/assets/menupage-CcJpa8eI.png", alt: "Singgah digital menu" },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    shortName: "Operation",
    tagline: "Dine-in & Kitchen",
    persona: "Best for Busy Dine-in Eateries & Table Service",
    hook: "Eliminate peak-hour order chaos without hiring more waitstaff.",
    description:
      "Manage staff, inventory, analytics, and multi-location settings from one powerful dashboard. Built for owners who want control.",
    color: "#f97316",
    features: [
      {
        title: "Contactless QR Table Ordering",
        desc: "Customers scan and order with full modifier options — sugar, ice, add-ons.",
      },
      {
        title: "Direct Kitchen/Bar Routing (KOT)",
        desc: "Orders fly straight to the barista or kitchen display the moment they're placed.",
      },
      {
        title: "Real-time Order Progress",
        desc: "Track every ticket as it moves Pending → Preparing → Served.",
      },
      {
        title: "Instant Cashless Checkout",
        desc: "FPX and e-wallet payments settled right at the table.",
      },
    ],
    showcase: [
      { src: "/assets/dashboard-BBapFpFo.png", alt: "Operations dashboard" },
      { src: "/assets/analyticspage-Cm_WruWR.png", alt: "Operations analytics" },
      { src: "/assets/menumanagement-1iv6qgOc.png", alt: "Menu management" },
    ],
  },
  {
    id: "pos",
    name: "POS System",
    shortName: "POS System",
    tagline: "Counter & Hardware",
    persona: "Best for Counter Cashiers, Multi-Station & Full Operations",
    hook: "The rock-solid nerve center for your cashier counter and cash drawer.",
    description:
      "A fast, intuitive POS that runs natively on Android tablets and phones. iPad and iPhone users can access the full webapp — native iOS app coming soon. Supports thermal printers, kitchen displays, and customer-facing screens.",
    color: "#6366f1",
    features: [
      {
        title: "Ultra-fast Counter Checkout",
        desc: "Quick item taps built for rush — no lag between customers.",
      },
      {
        title: "Full Hardware Support",
        desc: "Thermal receipt printers, cash drawers and barcode scanners.",
      },
      {
        title: "Shift Handovers & Cash Float",
        desc: "Track float, hand over between shifts, reconcile end-of-day X/Z reports.",
      },
      {
        title: "Revenue, Tax & Sales Analytics",
        desc: "Comprehensive reporting with SST-ready breakdowns.",
      },
    ],
    showcase: [
      { src: "/assets/checkoutpage-DDExQIj5.png", alt: "POS checkout screen" },
      { src: "/assets/menupage-C2HfNGBH.png", alt: "POS menu screen" },
      { src: "/assets/cfd-CPr_h_O2.png", alt: "Customer facing display" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Comparison matrix                                                   */
/* ------------------------------------------------------------------ */

export type MatrixValue = boolean | "addon";

export const matrixRows: {
  capability: string;
  singgah: MatrixValue;
  operations: MatrixValue;
  pos: MatrixValue;
}[] = [
  { capability: "Digital Menu Link", singgah: true, operations: true, pos: true },
  {
    capability: "Customer Loyalty & Points (CRM)",
    singgah: true,
    operations: "addon",
    pos: "addon",
  },
  {
    capability: "Table QR Code Dine-in Ordering",
    singgah: false,
    operations: true,
    pos: "addon",
  },
  {
    capability: "Kitchen/Bar Station Display (KOT)",
    singgah: false,
    operations: true,
    pos: true,
  },
  {
    capability: "Cashier Terminal & Counter Sales",
    singgah: false,
    operations: false,
    pos: true,
  },
  {
    capability: "Hardware Link (Cash Drawer, Thermal Printer)",
    singgah: false,
    operations: false,
    pos: true,
  },
  {
    capability: "Daily Cash Float & Z-Reading Reports",
    singgah: false,
    operations: false,
    pos: true,
  },
];

/* ------------------------------------------------------------------ */
/* "Find your match" quiz                                              */
/* ------------------------------------------------------------------ */

export type QuizOption = {
  id: string;
  label: string;
  desc: string;
  /** Weighting toward each product. */
  scores: Record<ProductId, number>;
};

export const quizSteps: {
  id: string;
  question: string;
  options: QuizOption[];
}[] = [
  {
    id: "type",
    question: "What type of F&B business do you run?",
    options: [
      {
        id: "kiosk",
        label: "Coffee Kiosk / Grab-and-Go",
        desc: "Small footprint, fast turnover, mostly takeaway.",
        scores: { singgah: 3, operations: 0, pos: 1 },
      },
      {
        id: "dinein",
        label: "Dine-In Cafe / Bistro",
        desc: "Tables, sit-down service, peak lunch crowds.",
        scores: { singgah: 1, operations: 3, pos: 1 },
      },
      {
        id: "restaurant",
        label: "Full Restaurant / Chain",
        desc: "Multiple stations, several outlets, full counter ops.",
        scores: { singgah: 1, operations: 2, pos: 3 },
      },
    ],
  },
  {
    id: "pain",
    question: "What is your biggest daily headache?",
    options: [
      {
        id: "retention",
        label: "Customer retention & loyalty",
        desc: "People come once and never return.",
        scores: { singgah: 3, operations: 1, pos: 0 },
      },
      {
        id: "peak",
        label: "Slow order taking during peak rush",
        desc: "Queues build up and staff can't keep pace.",
        scores: { singgah: 1, operations: 3, pos: 1 },
      },
      {
        id: "billing",
        label: "Messy counter billing & cash tracking",
        desc: "End-of-day reconciliation never balances.",
        scores: { singgah: 0, operations: 1, pos: 3 },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Why Chupjer                                                         */
/* ------------------------------------------------------------------ */

export const whyPoints = [
  {
    title: "Built for Malaysia",
    desc: "DuitNow, FPX, Touch 'n Go, GrabPay, Boost — all supported natively. MYR pricing, BM-ready, SST compliant.",
    color: "#10b981",
  },
  {
    title: "White-label Everything",
    desc: "Your brand, your domain, your colors. Customers see your identity — not ours.",
    color: "#8b5cf6",
  },
  {
    title: "Same-Day Launch",
    desc: "Sign up, set your menu, share the QR. We handle onboarding — no developer needed.",
    color: "#f97316",
  },
  {
    title: "Enterprise-Grade Security",
    desc: "Row-level security, encrypted connections, SOC 2 infrastructure via Supabase.",
    color: "#06b6d4",
  },
  {
    title: "We Market For You",
    desc: "We run targeted campaigns, social media ads, and seasonal promos to bring foot traffic to your door. Your 2% platform fee funds it all.",
    color: "#ec4899",
  },
  {
    title: "Works Offline",
    desc: "POS keeps taking orders even when WiFi drops. Auto-syncs when connection returns.",
    color: "#6366f1",
  },
];


/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export type Plan = {
  name: string;
  subtitle: string;
  color: string;
  popular?: boolean;
  /** Monthly price in MYR. */
  monthly: number;
  description: string;
  features: string[];
  ctaLabel: string;
};

export const plans: Plan[] = [
  {
    name: "Cafe",
    subtitle: "Single Location",
    color: "#10b981",
    monthly: 150,
    description:
      "Everything you need to run a single outlet — from POS to online ordering.",
    features: [
      "Operations Dashboard",
      "POS System",
      "Singgah App (Online Ordering)",
      "Kitchen Display System",
      "Analytics & Reporting",
      "HR & Staff Management",
      "Inventory Management",
      "Loyalty & Rewards",
      "2% Growth Fee (incl. marketing)",
      "1 Location",
    ],
    ctaLabel: "Chat with Us",
  },
  {
    name: "Empayar",
    subtitle: "Multi-Location",
    color: "#f97316",
    popular: true,
    monthly: 390,
    description:
      "Scale across multiple outlets with centralised control and analytics.",
    features: [
      "Everything in Cafe",
      "Up to 3 Locations",
      "Multi-location Analytics",
      "Priority Support",
      "Advanced Reporting",
    ],
    ctaLabel: "Let's Talk Growth",
  },
  {
    name: "Franchise",
    subtitle: "10-Location Bundle",
    color: "#8b5cf6",
    monthly: 990,
    description:
      "Built for franchise operators who need dedicated support and scale.",
    features: [
      "Everything in Empayar",
      "Up to 10 Locations",
      "Franchise-level Analytics",
      "Dedicated Account Manager",
      "Priority Onboarding",
      "Custom Integrations",
    ],
    ctaLabel: "Book a Consultation",
  },
];

export const gatewayFees = [
  { method: "FPX (Online Banking)", fee: "RM1 per transaction" },
  { method: "Credit Card", fee: "2.0%" },
  { method: "Debit Card", fee: "1.0%" },
  { method: "E-Wallets", fee: "1.4%" },
  { method: "DuitNow QR", fee: "1.6%" },
  { method: "Buy Now Pay Later", fee: "5.3%" },
];


/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    orgName: "Shhine",
    quote:
      "Chupjer transformed how we run our cafe. Online ordering through Singgah doubled our takeaway sales in the first month.",
    color: "#10b981",
    logo: "/brands/shhine.jpg",
  },
  {
    orgName: "TwentyOne.cafe",
    quote:
      "The POS system is fast and intuitive. My staff learned it within an hour. The kitchen display system alone saved us from so many missed orders.",
    color: "#f97316",
    logo: "/brands/twentyone.png",
  },
  {
    orgName: "ROAG",
    quote:
      "Managing multiple outlets used to be chaos. Now I see everything from one dashboard — sales, inventory, staff schedules. It just works.",
    color: "#8b5cf6",
    logo: "",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ — verbatim from live site (BM/EN mix preserved)                 */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "Berapa lama nak setup?",
    a: "Most businesses are up and running within the same day. We handle onboarding — you just need your menu and business details ready.",
  },
  {
    q: "Ada kontrak berpanjangan tak?",
    a: "We operate on a yearly subscription model. After your first year, you can renew annually or switch plans — no long-term lock-in beyond the current year.",
  },
  {
    q: "Device apa yang boleh pakai?",
    a: "Our POS runs natively on Android tablets and phones, with webapp support for iPad and iPhone (native iOS coming soon). We support Sunmi, iMin, and most standard thermal printers and kitchen display setups.",
  },
  {
    q: "Kalau tak nak sambung, boleh stop ke?",
    a: "Since we operate on yearly plans, you can choose not to renew at the end of your subscription year — no penalty. We'll help you export your data within 30 days.",
  },
  {
    q: "Apa payment option yang ada?",
    a: "We support FPX (online banking), credit/debit cards, DuitNow QR, e-wallets (Touch 'n Go, GrabPay, Boost), and Buy Now Pay Later — all via our payment partner Chip-in Asia.",
  },
  {
    q: "Kalau ada issue, macam mana?",
    a: "Every plan includes WhatsApp support. Empayar and Franchise plans get priority support with faster response times. We also have a dedicated account manager for Franchise clients.",
  },
  {
    q: "Platform fee 2% tu untuk apa?",
    a: "Your 2% platform fee isn't just a fee — it funds marketing campaigns that bring customers to your door. We run targeted social media ads, seasonal promos (Raya, Merdeka, year-end), feature your store on the Singgah discovery platform, and provide campaign performance reports. Other platforms charge 30–35% commission and don't even market for you.",
  },
  {
    q: "Ada banyak outlet — boleh manage semua sekali?",
    a: "Absolutely. Our Empayar plan supports up to 3 locations, and Franchise supports up to 10. All managed from a single Operations dashboard with cross-location analytics.",
  },
  {
    q: "Chupjer handle SST tak?",
    a: "Chupjer is fully SST compliant. You can configure tax settings per location, and all receipts and reports include proper SST breakdowns.",
  },
];

/* ------------------------------------------------------------------ */
/* Trusted-by brands (fallback; Supabase overrides when configured)    */
/* ------------------------------------------------------------------ */

export const fallbackBrands = [
  { name: "Shhine", logo: "/brands/shhine.jpg" },
  { name: "The Table", logo: "/brands/thetable.png" },
  { name: "Beartik HQ", logo: "/brands/beartik.png" },
  { name: "TwentyOne.cafe", logo: "/brands/twentyone.png" },
];

