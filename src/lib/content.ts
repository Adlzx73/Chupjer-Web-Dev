/**
 * Single source of truth for locale-independent content: ids, colors,
 * images, prices and contact details. All user-facing copy lives in
 * messages/en.json and messages/ms.json, keyed by the stable ids here.
 */

export const site = {
  name: "Chupjer",
  legalName: "Chupjer Digital Solutions (003807736-U)",
  url: "https://chupjer.com",
  whatsapp: "60175916783",
  email: "hello@chupjer.com",
  address: "Perai, Pulau Pinang, Malaysia",
  threads: "https://www.threads.com/firdausizam89",
} as const;

/**
 * Deep-link with a pre-filled message. The copy comes from the
 * whatsapp namespace in messages/*.json — resolve it with
 * getTranslations (server) or useWhatsappUrl (client) and pass the
 * finished sentence here, so both sides share one source.
 */
export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/* ------------------------------------------------------------------ */
/* Stats                                                               */
/* ------------------------------------------------------------------ */

export type StatKey = "orders_processed" | "menu_items" | "businesses" | "locations";

export type Stat = {
  key: StatKey;
  suffix: string;
  /** Live from Supabase when configured; this is the fallback. */
  value: number;
};

export const stats: Stat[] = [
  { key: "orders_processed", suffix: "+", value: 3500 },
  { key: "menu_items", suffix: "+", value: 200 },
  { key: "businesses", suffix: "", value: 8 },
  { key: "locations", suffix: "", value: 7 },
];

/* ------------------------------------------------------------------ */
/* Products (the 3-package deck)                                       */
/* ------------------------------------------------------------------ */

export type ProductId = "singgah" | "operations" | "pos";

export type FeatureKey =
  | "noApp"
  | "loyalty"
  | "pickup"
  | "menu"
  | "qr"
  | "kot"
  | "progress"
  | "checkout"
  | "speed"
  | "hardware"
  | "shift"
  | "analytics";

export type ShowcaseKey = Record<string, string>;

export type Product = {
  id: ProductId;
  color: string;
  features: FeatureKey[];
  showcase: { src: string; key: string }[];
};

export const products: Product[] = [
  {
    id: "singgah",
    color: "#10b981",
    features: ["noApp", "loyalty", "pickup", "menu"],
    showcase: [
      { src: "/assets/perkspage-DNqzkNu7.png", key: "perks" },
      { src: "/assets/homepage_twentyonecafe-CgHeMnk-.png", key: "home" },
      { src: "/assets/menupage-CcJpa8eI.png", key: "menu" },
    ],
  },
  {
    id: "operations",
    color: "#f97316",
    features: ["qr", "kot", "progress", "checkout"],
    showcase: [
      { src: "/assets/dashboard-BBapFpFo.png", key: "dashboard" },
      { src: "/assets/analyticspage-Cm_WruWR.png", key: "analytics" },
      { src: "/assets/menumanagement-1iv6qgOc.png", key: "menu" },
    ],
  },
  {
    id: "pos",
    color: "#6366f1",
    features: ["speed", "hardware", "shift", "analytics"],
    showcase: [
      { src: "/assets/checkoutpage-DDExQIj5.png", key: "checkout" },
      { src: "/assets/menupage-C2HfNGBH.png", key: "menu" },
      { src: "/assets/cfd-CPr_h_O2.png", key: "cfd" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Comparison matrix                                                   */
/* ------------------------------------------------------------------ */

export type MatrixValue = boolean | "addon";

export type MatrixRowKey =
  | "menuLink"
  | "loyalty"
  | "qrDineIn"
  | "kot"
  | "cashier"
  | "hardware"
  | "cashFloat";

export const matrixRows: {
  key: MatrixRowKey;
  singgah: MatrixValue;
  operations: MatrixValue;
  pos: MatrixValue;
}[] = [
  { key: "menuLink", singgah: true, operations: true, pos: true },
  { key: "loyalty", singgah: true, operations: "addon", pos: "addon" },
  { key: "qrDineIn", singgah: false, operations: true, pos: "addon" },
  { key: "kot", singgah: false, operations: true, pos: true },
  { key: "cashier", singgah: false, operations: false, pos: true },
  { key: "hardware", singgah: false, operations: false, pos: true },
  { key: "cashFloat", singgah: false, operations: false, pos: true },
];

/* ------------------------------------------------------------------ */
/* "Find your match" quiz                                              */
/* ------------------------------------------------------------------ */

export type QuizStepId = "type" | "pain";
export type QuizOptionId = "kiosk" | "dinein" | "restaurant" | "retention" | "peak" | "billing";

export const quizSteps: {
  id: QuizStepId;
  options: {
    id: QuizOptionId;
    /** Weighting toward each product. */
    scores: Record<ProductId, number>;
  }[];
}[] = [
  {
    id: "type",
    options: [
      { id: "kiosk", scores: { singgah: 3, operations: 0, pos: 1 } },
      { id: "dinein", scores: { singgah: 1, operations: 3, pos: 1 } },
      { id: "restaurant", scores: { singgah: 1, operations: 2, pos: 3 } },
    ],
  },
  {
    id: "pain",
    options: [
      { id: "retention", scores: { singgah: 3, operations: 1, pos: 0 } },
      { id: "peak", scores: { singgah: 1, operations: 3, pos: 1 } },
      { id: "billing", scores: { singgah: 0, operations: 1, pos: 3 } },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Why Chupjer                                                         */
/* ------------------------------------------------------------------ */

export type WhyKey = "malaysia" | "whiteLabel" | "launch" | "security" | "marketing" | "offline";

export const whyPoints: { key: WhyKey; color: string }[] = [
  { key: "malaysia", color: "#10b981" },
  { key: "whiteLabel", color: "#8b5cf6" },
  { key: "launch", color: "#f97316" },
  { key: "security", color: "#06b6d4" },
  { key: "marketing", color: "#ec4899" },
  { key: "offline", color: "#6366f1" },
];

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export type PlanId = "cafe" | "empayar" | "franchise";

export type Plan = {
  id: PlanId;
  color: string;
  popular?: boolean;
  /** Monthly price in MYR. */
  monthly: number;
  /** WhatsApp deep-link tier label (locale-independent). */
  tier: string;
};

export const plans: Plan[] = [
  { id: "cafe", color: "#10b981", monthly: 150, tier: "Single Location" },
  { id: "empayar", color: "#f97316", popular: true, monthly: 390, tier: "Multi-Location" },
  { id: "franchise", color: "#8b5cf6", monthly: 990, tier: "10-Location Bundle" },
];

export type GatewayFeeKey = "fpx" | "creditCard" | "debitCard" | "ewallet" | "duitnow" | "bnpl";
export type GatewayFeeValueKey =
  | "fpxFee"
  | "percent2"
  | "percent1"
  | "percent14"
  | "percent16"
  | "percent53";

export const gatewayFees: {
  method: GatewayFeeKey;
  fee: GatewayFeeValueKey;
}[] = [
  { method: "fpx", fee: "fpxFee" },
  { method: "creditCard", fee: "percent2" },
  { method: "debitCard", fee: "percent1" },
  { method: "ewallet", fee: "percent14" },
  { method: "duitnow", fee: "percent16" },
  { method: "bnpl", fee: "percent53" },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export type TestimonialKey = "shhine" | "twentyone" | "roag";

export const testimonials: {
  key: TestimonialKey;
  orgName: string;
  color: string;
  logo: string;
}[] = [
  { key: "shhine", orgName: "Shhine", color: "#10b981", logo: "/brands/shhine.jpg" },
  { key: "twentyone", orgName: "TwentyOne.cafe", color: "#f97316", logo: "/brands/twentyone.png" },
  { key: "roag", orgName: "ROAG", color: "#8b5cf6", logo: "" },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export type FaqKey = "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7" | "q8" | "q9";

export const faqKeys: FaqKey[] = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"];

/* ------------------------------------------------------------------ */
/* Trusted-by brands (fallback; Supabase overrides when configured)    */
/* ------------------------------------------------------------------ */

export const fallbackBrands = [
  { name: "Shhine", logo: "/brands/shhine.jpg" },
  { name: "The Table", logo: "/brands/thetable.png" },
  { name: "Beartik HQ", logo: "/brands/beartik.png" },
  { name: "TwentyOne.cafe", logo: "/brands/twentyone.png" },
];
