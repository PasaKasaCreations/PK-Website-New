-- =====================================================
-- Pasakasa Creations - Final Consolidated Database Schema
-- =====================================================
-- This is the single source of truth for the database schema.
-- Consolidated from migrations 001-005.
--
-- Includes:
-- - All tables with complete fields
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

  -- Publishing
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,

  -- Live Class Info
  sessions_running INTEGER NOT NULL DEFAULT 0,
  sessions_completed INTEGER NOT NULL DEFAULT 0,
  next_batch_date TEXT,
  location TEXT NOT NULL,
  max_students INTEGER NOT NULL DEFAULT 20,
  current_students INTEGER DEFAULT 0,

  -- Social Proof
  testimonials JSONB NOT NULL DEFAULT '[]',

  -- Pricing
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'INR'
);

-- Games Table (Public Read)
-- Includes hero section fields and trailer support
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

  -- Platforms
  platforms TEXT[] NOT NULL DEFAULT '{}',

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

-- =====================================================
-- INDEXES (Performance)
-- =====================================================

-- Courses indexes
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_published ON courses(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_courses_featured ON courses(featured) WHERE featured = TRUE;

-- Games indexes
CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_games_published ON games(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_games_featured ON games(featured) WHERE featured = TRUE;
CREATE INDEX idx_games_category ON games(category);
CREATE INDEX idx_games_platforms ON games USING GIN(platforms);

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

-- =====================================================
-- UPDATED_AT TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PERMISSIONS
-- =====================================================
-- Grant INSERT permissions to anon and authenticated roles
-- for public form submissions

GRANT INSERT ON TABLE contact_messages TO anon, authenticated;
GRANT INSERT ON TABLE inquiries TO anon, authenticated;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- COURSES POLICIES
-- Public can READ published courses (SEO-friendly)
CREATE POLICY "Public can read published courses"
  ON courses
  FOR SELECT
  USING (is_published = TRUE);

-- GAMES POLICIES
-- Public can READ published games
CREATE POLICY "Public can read published games"
  ON games
  FOR SELECT
  USING (is_published = TRUE);

-- INQUIRIES POLICIES
-- Public can INSERT inquiries (with strict validation)
-- Note: No SELECT policy - form submissions are write-only for security
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
-- Public can INSERT contact messages (with validation)
-- Note: No SELECT policy - form submissions are write-only for security
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
-- Public can READ published job postings
CREATE POLICY "Public can read published job postings"
  ON job_postings
  FOR SELECT
  USING (is_published = TRUE);

-- =====================================================
-- COLUMN COMMENTS (Documentation)
-- =====================================================

-- Games table comments
COMMENT ON COLUMN games.tagline IS 'Short one-line description of the game/product';
COMMENT ON COLUMN games.platforms IS 'Array of platforms: android, ios, web, windows, mac, linux';
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

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- What's included:
-- [x] All tables with complete schema
-- [x] All enums and types
-- [x] Performance indexes
-- [x] Auto-update triggers
-- [x] Row Level Security enabled
-- [x] Security policies configured
-- [x] Permissions for form submissions
-- [x] Documentation comments
--
-- Security model:
-- [x] Public can only read published content
-- [x] Public can submit forms (with validation)
-- [x] No unauthorized data access
-- [x] Form submissions are write-only (no public SELECT)
-- [x] Admin access via service role key
-- =====================================================
