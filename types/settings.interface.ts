/**
 * Site Settings Interface
 * Represents the site_settings table structure
 */
export interface SiteSettings {
  id: string;

  // Contact Information
  email: string;
  contact_number: string;
  location: string;
  location_map_url: string | null;
  whatsapp_number: string | null;

  // Social Media URLs
  linkedin_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;

  // Metadata
  created_at: string;
  updated_at: string;
}

/**
 * Settings form data (for admin updates)
 * Excludes auto-generated fields
 */
export interface SiteSettingsFormData {
  email: string;
  contact_number: string;
  location: string;
  location_map_url: string | null;
  whatsapp_number: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
}

/**
 * Default fallback settings
 * Used when database fetch fails
 */
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: "",
  email: "contact@pasakasacreations.com",
  contact_number: "+977-986-2751805",
  location: "Kshitij Marg, Kathmandu, Nepal",
  location_map_url: null,
  whatsapp_number: "+977-986-2751805",
  linkedin_url: "https://www.linkedin.com/company/pasakasa-creations/",
  instagram_url: "https://www.instagram.com/pasakasacreations",
  facebook_url: "https://www.facebook.com/pasaKasaCreations/",
  youtube_url: "https://www.youtube.com/@pasakasacreations",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
