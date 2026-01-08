-- =====================================================
-- Migration: Add Trailer URL Field to Games Table
-- =====================================================
-- Adds trailer_url field for YouTube video previews
-- =====================================================

-- Add trailer_url column
ALTER TABLE games
ADD COLUMN IF NOT EXISTS trailer_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN games.trailer_url IS 'YouTube video URL for game trailer/preview';

-- =====================================================
-- Migration Complete
-- =====================================================
