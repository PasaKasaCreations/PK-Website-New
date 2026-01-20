"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient, requireAdmin } from "@/lib/supabase/admin-client";
import {
  settingsFormSchema,
  type SettingsFormData,
} from "../schemas/settings.schema";
import type { SiteSettings } from "@/types/settings.interface";

/**
 * Get site settings for admin (requires auth)
 * Used by admin settings page
 *
 * SINGLETON: This table should only have ONE row.
 * The row is created via database migration/seed.
 */
export async function getAdminSiteSettings(): Promise<SiteSettings> {
  await requireAdmin();
  const adminSupabase = await createAdminClient();

  const { data, error } = await adminSupabase
    .from("site_settings")
    .select("*")
    .single();

  if (error) throw error;
  if (!data) {
    throw new Error(
      "Site settings not found. Please run the database migration.",
    );
  }

  return data;
}

/**
 * Update site settings (admin only)
 * After update, revalidates all pages that use settings
 *
 * SINGLETON PATTERN:
 * - This function ONLY updates the existing row
 * - It NEVER creates new rows (createSiteSettings does not exist intentionally)
 * - The database has triggers and RLS policies to prevent INSERT/DELETE
 */
export async function updateSiteSettings(
  formData: SettingsFormData,
): Promise<void> {
  await requireAdmin();
  const adminSupabase = await createAdminClient();

  // Validate form data using Zod schema
  const validated = settingsFormSchema.parse(formData);

  // SINGLETON VALIDATION: Fetch the existing row first
  // We always update by ID to ensure we're modifying the singleton row
  const { data: existing, error: fetchError } = await adminSupabase
    .from("site_settings")
    .select("id")
    .single();

  if (fetchError || !existing) {
    throw new Error(
      "Site settings not found. The database may not be seeded. " +
        "Please run the migration: supabase/migrations/004_site_settings.sql",
    );
  }

  // Verify only one row exists (extra safety check)
  const { count, error: countError } = await adminSupabase
    .from("site_settings")
    .select("*", { count: "exact", head: true });

  if (!countError && count !== null && count !== 1) {
    throw new Error(
      `Database integrity error: site_settings should have exactly 1 row, found ${count}. ` +
        "Please check database constraints.",
    );
  }

  // UPDATE the singleton row (never INSERT)
  const { error: updateError } = await adminSupabase
    .from("site_settings")
    .update({
      email: validated.email,
      contact_number: validated.contact_number,
      location: validated.location,
      location_map_url: validated.location_map_url || null,
      whatsapp_number: validated.whatsapp_number || null,
      linkedin_url: validated.linkedin_url || null,
      instagram_url: validated.instagram_url || null,
      facebook_url: validated.facebook_url || null,
      youtube_url: validated.youtube_url || null,
    })
    .eq("id", existing.id);

  if (updateError) throw updateError;

  // Revalidate all public pages that use settings
  // This triggers ISR to regenerate with new data
  revalidatePath("/", "layout"); // Revalidates all pages using root layout
  revalidatePath("/contact");
  revalidatePath("/about");
  revalidatePath("/courses");
  revalidatePath("/games");
  revalidatePath("/careers");

  // Also revalidate admin settings page
  revalidatePath("/admin/settings");
}

// NOTE: createSiteSettings and deleteSiteSettings functions are intentionally
// NOT implemented. The site_settings table is a singleton that should only
// have one row, managed via database migrations.
