import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/settings.interface";
import { DEFAULT_SITE_SETTINGS } from "@/types/settings.interface";

/**
 * Get site settings (public - no auth required)
 * Used by Footer and ContactContent at BUILD TIME
 *
 * Uses the public supabase client (no auth needed for SELECT)
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  if (error || !data) {
    console.error("Failed to fetch site settings:", error);
    return DEFAULT_SITE_SETTINGS;
  }

  return data;
}
