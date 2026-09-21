import { NextResponse } from "next/server";
import { getSupabase, type Lead } from "@/lib/supabase";

/** Basic MY phone normalisation: 0123456789 -> +60123456789 */
function normalisePhone(raw: string) {
  const digits = raw.replace(/[^\d]/g, "");
  if (digits.startsWith("60")) return `+${digits}`;
  if (digits.startsWith("0")) return `+6${digits}`;
  return `+60${digits.replace(/^6/, "")}`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const businessName = String(body.business_name ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!name || !businessName || !phone) {
    return NextResponse.json(
      { error: "Name, business name and phone are required." },
      { status: 400 },
    );
  }

  if (phone.replace(/[^\d]/g, "").length < 9) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }

  const lead: Lead = {
    name,
    business_name: businessName,
    phone: normalisePhone(phone),
    email: String(body.email ?? "").trim() || undefined,
    package_interest: String(body.package_interest ?? "").trim() || undefined,
    locations: Number(body.locations) || 1,
    source: "website-demo-form",
  };

  const supabase = getSupabase();

  if (!supabase) {
    // No backend configured — accept the lead so the demo flow still works.
    console.warn("[leads] Supabase not configured; lead not persisted:", lead);
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await supabase.from("demo_leads").insert(lead);

  if (error) {
    console.error("[leads] insert failed:", error.message);
    return NextResponse.json(
      { error: "Could not save your details. Please try WhatsApp instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, persisted: true });
}
