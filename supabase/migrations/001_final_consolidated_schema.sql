-- =====================================================
-- Pasakasa Creations - Final Consolidated Database Schema
-- =====================================================
-- This is the single source of truth for the database schema.
-- Consolidated from all previous migrations (001-007).
--
-- Includes:
-- - All tables with complete fields
-- - Admin users and authentication
-- - Site settings (singleton pattern)
-- - Resume submissions for careers
-- - Row Level Security (RLS) policies
-- - Indexes for performance
-- - Triggers for automation
-- - Proper permissions for public form submissions
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE inquiry_type AS ENUM ('general', 'course', 'career', 'partnership');
CREATE TYPE inquiry_status AS ENUM ('new', 'in_progress', 'resolved');
CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'contract', 'internship');
CREATE TYPE game_status AS ENUM ('in_development', 'coming_soon', 'released');

-- =====================================================
-- TABLES
-- =====================================================

-- Courses Table (Public Read)
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Basic Info
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  instructor TEXT NOT NULL,
  duration TEXT NOT NULL,
  skill_level skill_level NOT NULL DEFAULT 'beginner',

  -- Media
  thumbnail_url TEXT NOT NULL,

  -- Course Content
  syllabus JSONB NOT NULL DEFAULT '[]',
  learning_outcomes TEXT[] NOT NULL DEFAULT '{}',
  prerequisites TEXT[] NOT NULL DEFAULT '{}',

  -- Publishing & Display
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,

  -- Live Class Info
  sessions_running INTEGER NOT NULL DEFAULT 0,
  next_batch_date TEXT,
  location TEXT NOT NULL,
  max_students INTEGER NOT NULL DEFAULT 20,

  -- Social Proof
  testimonials JSONB NOT NULL DEFAULT '[]',

  -- Course Projects (hands-on projects students will build)
  projects JSONB NOT NULL DEFAULT '[]',

  -- Pricing
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'INR'
);

-- Games Table (Public Read)
-- Note: platforms column removed (no longer used)
CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Basic Info
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  genre TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'game' CHECK (category IN ('game', 'tool', 'service')),

  -- Media
  thumbnail_url TEXT NOT NULL,
  screenshots TEXT[] NOT NULL DEFAULT '{}',
  trailer_url TEXT,

  -- Hero Section (for dynamic games hero carousel)
  hero_background_image TEXT,
  hero_stats JSONB NOT NULL DEFAULT '{"players": "0", "rating": "0", "feature": ""}'::jsonb,
  accent_color TEXT NOT NULL DEFAULT 'orange',

  -- Store Links
  play_store_url TEXT,
  app_store_url TEXT,
  web_url TEXT,

  -- Publishing
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  release_date DATE,
  status game_status NOT NULL DEFAULT 'in_development'
);

-- Inquiries Table (Write-Only for Public)
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- User Info (with validation constraints)
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (char_length(email) >= 5 AND char_length(email) <= 255),
  phone TEXT CHECK (phone IS NULL OR phone = '' OR (char_length(phone) >= 7 AND char_length(phone) <= 20)),
  message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 2000),

  -- Inquiry Details
  inquiry_type inquiry_type NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  status inquiry_status NOT NULL DEFAULT 'new',

  -- Security & Tracking
  ip_address TEXT,
  user_agent TEXT
);

-- Contact Messages Table (Write-Only for Public)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- User Info (with validation constraints)
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (char_length(email) >= 5 AND char_length(email) <= 255),
  phone TEXT CHECK (phone IS NULL OR phone = '' OR (char_length(phone) >= 7 AND char_length(phone) <= 20)),
  message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 2000),

  -- Security & Tracking
  ip_address TEXT,
  user_agent TEXT
);

-- Job Postings Table (Public Read)
CREATE TABLE IF NOT EXISTS job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Job Info
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type employment_type NOT NULL,

  -- Job Details
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  nice_to_have TEXT[] NOT NULL DEFAULT '{}',

  -- Compensation & Requirements
  salary TEXT,
  visa_requirements TEXT,

  -- Additional Info
  posted_date DATE,
  company JSONB NOT NULL DEFAULT jsonb_build_object(
    'name', 'Pasakasa Creations',
    'description', 'At Pasakasa Creations, we''re building the future of games and education. Our team is passionate about creating experiences that inspire, educate, and entertain. We combine cutting-edge technology with creative storytelling to deliver products that make a real impact.'
  ),
  benefits TEXT[] NOT NULL DEFAULT ARRAY[
    'Competitive base salary with performance bonuses',
    'Comprehensive health insurance',
    'Flexible remote work options',
    'Annual learning and development budget',
    'Latest hardware and software tools',
    'Paid time off and holidays',
    'Team building activities and events',
    'Career growth opportunities'
  ],
  contact JSONB NOT NULL DEFAULT jsonb_build_object(
    'name', 'HR Team',
    'title', 'Human Resources',
    'email', 'careers@pasakasa.com',
    'photo', '',
    'linkedin', ''
  ),
  similar_jobs JSONB NOT NULL DEFAULT '[]',

  -- Publishing
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  application_deadline DATE
);

-- Admin Users Table (For admin portal access)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Admin Info
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  -- Audit
  created_by TEXT,
  last_login TIMESTAMPTZ
);

-- Site Settings Table (Singleton Pattern - Only ONE row allowed)
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

  -- WhatsApp (for course enrollment)
  whatsapp_number TEXT,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Resume Submissions Table (For careers page)
CREATE TABLE IF NOT EXISTS public.resume_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Applicant Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role_looking_for TEXT NOT NULL,
  cover_letter TEXT,

  -- Resume File (S3 key stored in Wasabi bucket)
  resume_key TEXT NOT NULL,

  -- Application Status
  status TEXT NOT NULL DEFAULT 'pending',
  -- Possible statuses: pending, reviewed, contacted, rejected

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- INDEXES (Performance)
-- =====================================================

-- Courses indexes
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_published ON courses(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_courses_featured ON courses(featured) WHERE featured = TRUE;
CREATE INDEX idx_courses_display_order ON courses(display_order);

-- Games indexes
CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_games_published ON games(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_games_featured ON games(featured) WHERE featured = TRUE;
CREATE INDEX idx_games_category ON games(category);

-- Inquiries indexes
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_type ON inquiries(inquiry_type);

-- Contact messages indexes
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Job postings indexes
CREATE INDEX idx_job_postings_slug ON job_postings(slug);
CREATE INDEX idx_job_postings_published ON job_postings(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_job_postings_posted_date ON job_postings(posted_date DESC);

-- Admin users indexes
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_active ON admin_users(is_active) WHERE is_active = TRUE;

-- Resume submissions indexes
CREATE INDEX idx_resume_submissions_email ON public.resume_submissions(email);
CREATE INDEX idx_resume_submissions_status ON public.resume_submissions(status);
CREATE INDEX idx_resume_submissions_created_at ON public.resume_submissions(created_at DESC);

-- Site settings singleton enforcement
CREATE UNIQUE INDEX site_settings_singleton ON public.site_settings ((true));

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Admin check function
CREATE OR REPLACE FUNCTION is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE email = user_email AND is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Site settings singleton enforcement functions
CREATE OR REPLACE FUNCTION prevent_site_settings_insert()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM public.site_settings) > 0 THEN
    RAISE EXCEPTION 'site_settings table can only have one row. Use UPDATE instead of INSERT.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION prevent_site_settings_delete()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Cannot delete site_settings. This row must always exist.';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_site_settings_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Updated_at triggers
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at
  BEFORE UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON job_postings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resume_submissions_updated_at
  BEFORE UPDATE ON public.resume_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Site settings triggers
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_site_settings_timestamp();

CREATE TRIGGER prevent_site_settings_deletion
  BEFORE DELETE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION prevent_site_settings_delete();

-- =====================================================
-- SEED DATA (Before RLS is enabled)
-- =====================================================

-- Insert site settings seed data
INSERT INTO public.site_settings (
  email,
  contact_number,
  location,
  location_map_url,
  linkedin_url,
  instagram_url,
  facebook_url,
  youtube_url,
  whatsapp_number
) VALUES (
  'contact@pasakasacreations.com',
  '+977-986-2751805',
  'Kshitij Marg, Kathmandu, Nepal',
  NULL,
  'https://www.linkedin.com/company/pasakasa-creations/',
  'https://www.instagram.com/pasakasacreations',
  'https://www.facebook.com/pasaKasaCreations/',
  'https://www.youtube.com/@pasakasacreations',
  NULL
) ON CONFLICT DO NOTHING;

-- Now add singleton insert prevention trigger (after seed data)
CREATE TRIGGER enforce_site_settings_singleton
  BEFORE INSERT ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION prevent_site_settings_insert();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_submissions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PERMISSIONS
-- =====================================================

-- Grant INSERT permissions to anon and authenticated roles for public form submissions
GRANT INSERT ON TABLE contact_messages TO anon, authenticated;
GRANT INSERT ON TABLE inquiries TO anon, authenticated;
GRANT INSERT ON TABLE public.resume_submissions TO anon, authenticated;

-- =====================================================
-- RLS POLICIES - Public Access
-- =====================================================

-- COURSES POLICIES
CREATE POLICY "Public can read published courses"
  ON courses
  FOR SELECT
  USING (is_published = TRUE);

-- GAMES POLICIES
CREATE POLICY "Public can read published games"
  ON games
  FOR SELECT
  USING (is_published = TRUE);

-- INQUIRIES POLICIES
CREATE POLICY "Public can submit inquiries"
  ON inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) >= 2 AND char_length(name) <= 100
    AND char_length(email) >= 5 AND char_length(email) <= 255
    AND char_length(message) >= 10 AND char_length(message) <= 2000
    AND (phone IS NULL OR phone = '' OR (char_length(phone) >= 7 AND char_length(phone) <= 20))
    AND inquiry_type IN ('general', 'course', 'career', 'partnership')
    AND status = 'new'
  );

-- CONTACT MESSAGES POLICIES
CREATE POLICY "Public can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) >= 2 AND char_length(name) <= 100
    AND char_length(email) >= 5 AND char_length(email) <= 255
    AND char_length(message) >= 10 AND char_length(message) <= 2000
    AND (phone IS NULL OR phone = '' OR (char_length(phone) >= 7 AND char_length(phone) <= 20))
  );

-- JOB POSTINGS POLICIES
CREATE POLICY "Public can read published job postings"
  ON job_postings
  FOR SELECT
  USING (is_published = TRUE);

-- SITE SETTINGS POLICIES
CREATE POLICY "Site settings are viewable by everyone"
  ON public.site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "No new settings rows can be created"
  ON public.site_settings
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY "Settings row cannot be deleted"
  ON public.site_settings
  FOR DELETE
  USING (false);

-- RESUME SUBMISSIONS POLICIES
CREATE POLICY "Public can submit resumes"
  ON public.resume_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- =====================================================
-- RLS POLICIES - Admin Access
-- =====================================================

-- Admin users can check their own admin status
CREATE POLICY "Users can check own admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Admins have full access to courses
CREATE POLICY "Admins have full access to courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- Admins have full access to games
CREATE POLICY "Admins have full access to games"
  ON games
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- Admins have full access to job_postings
CREATE POLICY "Admins have full access to job_postings"
  ON job_postings
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- Admins can read and update inquiries
CREATE POLICY "Admins can read inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can update inquiries"
  ON inquiries
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- Admins can read contact messages
CREATE POLICY "Admins can read contact_messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'));

-- Admins can manage other admins
CREATE POLICY "Admins can manage admin_users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- Admins can update site settings
CREATE POLICY "Only admins can update site settings"
  ON public.site_settings
  FOR UPDATE
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- Admins can view, update, and delete resume submissions
CREATE POLICY "Only admins can view resume submissions"
  ON public.resume_submissions
  FOR SELECT
  USING (is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Only admins can update resume submissions"
  ON public.resume_submissions
  FOR UPDATE
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Only admins can delete resume submissions"
  ON public.resume_submissions
  FOR DELETE
  USING (is_admin(auth.jwt() ->> 'email'));

-- =====================================================
-- COLUMN COMMENTS (Documentation)
-- =====================================================

-- Courses table comments
COMMENT ON COLUMN courses.projects IS 'JSON array of course projects: [{title, description, thumbnail_url, youtube_url?}]';
COMMENT ON COLUMN courses.display_order IS 'Display order for sorting courses (lower numbers appear first)';

-- Games table comments
COMMENT ON COLUMN games.tagline IS 'Short one-line description of the game/product';
COMMENT ON COLUMN games.category IS 'Product category: game, tool, or service';
COMMENT ON COLUMN games.web_url IS 'URL for web-based games or demo';
COMMENT ON COLUMN games.hero_background_image IS 'Full-width background image URL for hero carousel section';
COMMENT ON COLUMN games.hero_stats IS 'JSON object with stats: {players: string, rating: string, feature: string}';
COMMENT ON COLUMN games.accent_color IS 'Theme accent color: orange, blue, purple, green, etc.';
COMMENT ON COLUMN games.trailer_url IS 'YouTube video URL for game trailer/preview';

-- Job postings table comments
COMMENT ON COLUMN job_postings.salary IS 'Salary range or compensation details';
COMMENT ON COLUMN job_postings.visa_requirements IS 'Visa or work permit requirements';
COMMENT ON COLUMN job_postings.posted_date IS 'Date when job was posted publicly';
COMMENT ON COLUMN job_postings.company IS 'Company information JSON: {name, description}';
COMMENT ON COLUMN job_postings.benefits IS 'Array of job benefits and perks';
COMMENT ON COLUMN job_postings.contact IS 'Contact person JSON: {name, title, email, photo, linkedin}';
COMMENT ON COLUMN job_postings.similar_jobs IS 'Array of similar job postings: [{id, title, location, salary}]';

-- Admin users table comments
COMMENT ON TABLE admin_users IS 'Whitelist of admin email addresses for admin portal access';
COMMENT ON COLUMN admin_users.email IS 'Email address that must match Supabase Auth user email';
COMMENT ON COLUMN admin_users.is_active IS 'Set to false to disable admin access without deleting';
COMMENT ON COLUMN admin_users.last_login IS 'Updated when admin logs in (for audit purposes)';

-- Site settings table comments
COMMENT ON COLUMN site_settings.whatsapp_number IS 'WhatsApp number with country code for course enrollment inquiries (e.g., +977-986-XXXXXXX)';

-- Resume submissions table comments
COMMENT ON TABLE public.resume_submissions IS 'Stores job applications and resume submissions from the careers page';
COMMENT ON COLUMN public.resume_submissions.name IS 'Full name of the applicant';
COMMENT ON COLUMN public.resume_submissions.email IS 'Email address of the applicant';
COMMENT ON COLUMN public.resume_submissions.role_looking_for IS 'The position/role the applicant is interested in';
COMMENT ON COLUMN public.resume_submissions.cover_letter IS 'Optional cover letter or introduction message';
COMMENT ON COLUMN public.resume_submissions.resume_key IS 'S3 key for the uploaded resume file in Wasabi bucket';
COMMENT ON COLUMN public.resume_submissions.status IS 'Application status: pending, reviewed, contacted, rejected';

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- What's included:
-- [x] All tables with complete schema (courses, games, inquiries, contact_messages, job_postings)
-- [x] Admin users table and authentication
-- [x] Site settings with singleton pattern
-- [x] Resume submissions for careers
-- [x] All enums and types
-- [x] Performance indexes
-- [x] Auto-update triggers
-- [x] Row Level Security enabled
-- [x] Security policies configured (public + admin access)
-- [x] Permissions for form submissions
-- [x] Documentation comments
-- [x] Seed data for site settings
--
-- Security model:
-- [x] Public can only read published content
-- [x] Public can submit forms (with validation)
-- [x] No unauthorized data access
-- [x] Form submissions are write-only (no public SELECT)
-- [x] Admin access via authenticated email whitelist
-- [x] Site settings are singleton (one row only)
-- =====================================================
