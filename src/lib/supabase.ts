import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Server-side Supabase client for lead capture.
 * Returns null when env vars are absent so the form can still be
 * exercised locally without a backend.
 */
export function getSupabase() {
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export type Lead = {
  name: string;
  business_name: string;
  phone: string;
  email?: string;
  package_interest?: string;
  locations?: number;
  source?: string;
};
