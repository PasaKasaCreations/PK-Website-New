-- =====================================================
-- Pasakasa Creations - Add Missing Fields Migration
-- =====================================================
-- This migration adds fields that were missing from the initial schema
-- to match the TypeScript interfaces
-- =====================================================

-- =====================================================
-- 1. ADD MISSING FIELDS TO GAMES TABLE
-- =====================================================

-- Add tagline field
ALTER TABLE games
ADD COLUMN IF NOT EXISTS tagline TEXT;

-- Add platforms array (e.g., ['android', 'ios', 'web', 'windows', 'mac'])
ALTER TABLE games
ADD COLUMN IF NOT EXISTS platforms TEXT[] NOT NULL DEFAULT '{}';

-- Add category enum-like field
ALTER TABLE games
ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'game'
CHECK (category IN ('game', 'tool', 'service'));

-- Add web_url for web-based games/apps
ALTER TABLE games
ADD COLUMN IF NOT EXISTS web_url TEXT;

-- Update existing games with default values
UPDATE games
SET
  tagline = COALESCE(tagline, substring(description, 1, 100)),
  platforms = COALESCE(platforms,
    CASE
      WHEN play_store_url IS NOT NULL AND app_store_url IS NOT NULL THEN ARRAY['android', 'ios']
      WHEN play_store_url IS NOT NULL THEN ARRAY['android']
      WHEN app_store_url IS NOT NULL THEN ARRAY['ios']
      ELSE ARRAY['web']
    END
  ),
  category = COALESCE(category, 'game')
WHERE tagline IS NULL OR platforms = '{}';

-- Make tagline NOT NULL after populating
ALTER TABLE games
ALTER COLUMN tagline SET NOT NULL;

-- =====================================================
-- 2. ADD MISSING FIELDS TO JOB_POSTINGS TABLE
-- =====================================================

-- Add salary range
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS salary TEXT;

-- Add visa requirements
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS visa_requirements TEXT;

-- Add posted date (use created_at as default)
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS posted_date DATE;

-- Add company information (JSONB)
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS company JSONB NOT NULL DEFAULT jsonb_build_object(
  'name', 'Pasakasa Creations',
  'description', 'At Pasakasa Creations, we''re building the future of games and education. Our team is passionate about creating experiences that inspire, educate, and entertain. We combine cutting-edge technology with creative storytelling to deliver products that make a real impact.'
);

-- Add benefits array
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS benefits TEXT[] NOT NULL DEFAULT ARRAY[
  'Competitive base salary with performance bonuses',
  'Comprehensive health insurance',
  'Flexible remote work options',
  'Annual learning and development budget',
  'Latest hardware and software tools',
  'Paid time off and holidays',
  'Team building activities and events',
  'Career growth opportunities'
];

-- Add contact information (JSONB)
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS contact JSONB NOT NULL DEFAULT jsonb_build_object(
  'name', 'HR Team',
  'title', 'Human Resources',
  'email', 'careers@pasakasa.com',
  'photo', '',
  'linkedin', ''
);

-- Add similar jobs (JSONB array)
ALTER TABLE job_postings
ADD COLUMN IF NOT EXISTS similar_jobs JSONB NOT NULL DEFAULT '[]';

-- Update existing job postings with default values
UPDATE job_postings
SET
  posted_date = COALESCE(posted_date, created_at::date),
  salary = COALESCE(salary,
    CASE
      WHEN employment_type = 'full_time' THEN 'Competitive salary based on experience'
      WHEN employment_type = 'part_time' THEN 'Hourly rate based on experience'
      WHEN employment_type = 'contract' THEN 'Project-based compensation'
      WHEN employment_type = 'internship' THEN 'Paid internship'
    END
  ),
  visa_requirements = COALESCE(visa_requirements,
    CASE
      WHEN location = 'Remote' THEN 'Not required for remote positions'
      ELSE 'Must be eligible to work in Nepal'
    END
  )
WHERE posted_date IS NULL OR salary IS NULL;

-- =====================================================
-- 3. ADD HELPFUL INDEXES
-- =====================================================

-- Index for games category and platforms
CREATE INDEX IF NOT EXISTS idx_games_category ON games(category);
CREATE INDEX IF NOT EXISTS idx_games_platforms ON games USING GIN(platforms);

-- Index for job postings salary and posted_date
CREATE INDEX IF NOT EXISTS idx_job_postings_posted_date ON job_postings(posted_date DESC);

-- =====================================================
-- 4. ADD COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON COLUMN games.tagline IS 'Short one-line description of the game/product';
COMMENT ON COLUMN games.platforms IS 'Array of platforms: android, ios, web, windows, mac, linux';
COMMENT ON COLUMN games.category IS 'Product category: game, tool, or service';
COMMENT ON COLUMN games.web_url IS 'URL for web-based games or demo';

COMMENT ON COLUMN job_postings.salary IS 'Salary range or compensation details';
COMMENT ON COLUMN job_postings.visa_requirements IS 'Visa or work permit requirements';
COMMENT ON COLUMN job_postings.posted_date IS 'Date when job was posted publicly';
COMMENT ON COLUMN job_postings.company IS 'Company information JSON: {name, description}';
COMMENT ON COLUMN job_postings.benefits IS 'Array of job benefits and perks';
COMMENT ON COLUMN job_postings.contact IS 'Contact person JSON: {name, title, email, photo, linkedin}';
COMMENT ON COLUMN job_postings.similar_jobs IS 'Array of similar job postings: [{id, title, location, salary}]';

-- =====================================================
-- 5. UPDATE RLS POLICIES (if needed)
-- =====================================================
-- The existing RLS policies should still work with new fields
-- No changes needed as the security model remains the same

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- All missing fields have been added with sensible defaults
-- Existing data has been populated with appropriate values
-- =====================================================
