-- =====================================================
-- Migration: Add projects and display_order columns to courses table
-- =====================================================
-- Run this migration if you already have the database set up
-- and need to add these new columns.
-- =====================================================

-- Add projects column to courses table (if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'projects'
  ) THEN
    ALTER TABLE courses ADD COLUMN projects JSONB NOT NULL DEFAULT '[]';
  END IF;
END $$;

-- Add display_order column to courses table (if it doesn't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'courses' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE courses ADD COLUMN display_order INTEGER NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Add index for display_order
CREATE INDEX IF NOT EXISTS idx_courses_display_order ON courses(display_order);

-- Add documentation comments
COMMENT ON COLUMN courses.projects IS 'JSON array of course projects: [{title, description, thumbnail_url, youtube_url?}]';
COMMENT ON COLUMN courses.display_order IS 'Display order for sorting courses (lower numbers appear first)';

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
--
-- The projects column stores an array of project objects:
-- [
--   {
--     "title": "Project Name",
--     "description": "Brief description",
--     "thumbnail_url": "/path/to/image.jpg",
--     "youtube_url": "https://youtube.com/watch?v=..." (optional),
--     "display_order": 0 (optional, controls project order within course)
--   }
-- ]
--
-- The display_order column controls the sort order:
-- - Lower numbers appear first (0, 1, 2, ...)
-- - Courses with the same order are sorted by created_at
-- =====================================================
