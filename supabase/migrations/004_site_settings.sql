-- ============================================
-- Site Settings Table (Singleton Pattern)
-- Only ONE row allowed - for site-wide settings
-- ============================================

-- Create the site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact Information
  email TEXT NOT NULL DEFAULT 'contact@pasakasacreations.com',
  contact_number TEXT NOT NULL DEFAULT '+977-986-2751805',
  location TEXT NOT NULL DEFAULT 'Kshitij Marg, Kathmandu, Nepal',
  location_map_url TEXT,

  -- Social Media URLs
  linkedin_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  youtube_url TEXT,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- SINGLETON ENFORCEMENT (Multiple layers of protection)
-- ============================================

-- 1. Unique index on constant value - ensures only ONE row can exist at database level
CREATE UNIQUE INDEX IF NOT EXISTS site_settings_singleton ON public.site_settings ((true));

-- 2. Trigger to prevent INSERT if row already exists (belt and suspenders)
CREATE OR REPLACE FUNCTION prevent_site_settings_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM public.site_settings) > 0 THEN
    RAISE EXCEPTION 'site_settings table can only have one row. Use UPDATE instead of INSERT.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_site_settings_singleton ON public.site_settings;
CREATE TRIGGER enforce_site_settings_singleton
  BEFORE INSERT ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION prevent_site_settings_insert();

-- 3. Trigger to prevent DELETE (settings must always exist)
CREATE OR REPLACE FUNCTION prevent_site_settings_delete()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Cannot delete site_settings. This row must always exist.';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS prevent_site_settings_deletion ON public.site_settings;
CREATE TRIGGER prevent_site_settings_deletion
  BEFORE DELETE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION prevent_site_settings_delete();

-- ============================================
-- Auto-update timestamp trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_site_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS site_settings_updated_at ON public.site_settings;
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_site_settings_timestamp();

-- ============================================
-- SEED DATA (Must be inserted BEFORE RLS is enabled)
-- ============================================
-- Temporarily disable the singleton trigger for seeding
DROP TRIGGER IF EXISTS enforce_site_settings_singleton ON public.site_settings;

INSERT INTO public.site_settings (
  email,
  contact_number,
  location,
  location_map_url,
  linkedin_url,
  instagram_url,
  facebook_url,
  youtube_url
) VALUES (
  'contact@pasakasacreations.com',
  '+977-986-2751805',
  'Kshitij Marg, Kathmandu, Nepal',
  NULL,
  'https://www.linkedin.com/company/pasakasa-creations/',
  'https://www.instagram.com/pasakasacreations',
  'https://www.facebook.com/pasaKasaCreations/',
  'https://www.youtube.com/@pasakasacreations'
) ON CONFLICT DO NOTHING;

-- Re-enable the singleton trigger after seeding
CREATE TRIGGER enforce_site_settings_singleton
  BEFORE INSERT ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION prevent_site_settings_insert();

-- ============================================
-- ROW LEVEL SECURITY (After seed data is inserted)
-- ============================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can read settings (public data for footer/contact)
CREATE POLICY "Site settings are viewable by everyone"
  ON public.site_settings
  FOR SELECT
  USING (true);

-- RLS Policy: Only authenticated admins can update
CREATE POLICY "Only admins can update site settings"
  ON public.site_settings
  FOR UPDATE
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- RLS Policy: Prevent INSERT via RLS (additional layer)
CREATE POLICY "No new settings rows can be created"
  ON public.site_settings
  FOR INSERT
  WITH CHECK (false);

-- RLS Policy: Prevent DELETE via RLS (additional layer)
CREATE POLICY "Settings row cannot be deleted"
  ON public.site_settings
  FOR DELETE
  USING (false);

-- ============================================
-- VERIFICATION
-- ============================================
-- After running this migration, verify:
-- 1. SELECT COUNT(*) FROM site_settings; -- Should return 1
-- 2. INSERT INTO site_settings (email) VALUES ('test@test.com'); -- Should fail
-- 3. DELETE FROM site_settings; -- Should fail
