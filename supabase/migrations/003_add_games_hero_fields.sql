-- =====================================================
-- Migration: Add Hero Section Fields to Games Table
-- =====================================================
-- Adds fields needed for the dynamic Games Hero carousel:
-- - hero_background_image: Full-width background for hero
-- - hero_stats: JSONB with players, rating, feature
-- - accent_color: Theme color for dynamic styling
-- =====================================================

-- Add hero_background_image column
ALTER TABLE games
ADD COLUMN IF NOT EXISTS hero_background_image TEXT;

-- Add hero_stats JSONB column with default structure
ALTER TABLE games
ADD COLUMN IF NOT EXISTS hero_stats JSONB NOT NULL DEFAULT '{
  "players": "0",
  "rating": "0",
  "feature": ""
}'::jsonb;

-- Add accent_color column with default value
ALTER TABLE games
ADD COLUMN IF NOT EXISTS accent_color TEXT NOT NULL DEFAULT 'orange';

-- Add comments for documentation
COMMENT ON COLUMN games.hero_background_image IS 'Full-width background image URL for hero carousel section';
COMMENT ON COLUMN games.hero_stats IS 'JSON object with stats: {players: string, rating: string, feature: string}';
COMMENT ON COLUMN games.accent_color IS 'Theme accent color: orange, blue, purple, green, etc.';

-- =====================================================
-- Update existing games with hero data
-- =====================================================

-- Update Teen Patti Friends
UPDATE games
SET
  hero_background_image = '/games/teen-patti/TeenPatti_Gameplay.png',
  hero_stats = '{
    "players": "50K+",
    "rating": "4.5",
    "feature": "Live Tables"
  }'::jsonb,
  accent_color = 'orange'
WHERE slug = 'teen-patti-friends';

-- Update CallBreak Friends
UPDATE games
SET
  hero_background_image = '/games/callbreak/CallbreakBanner.webp',
  hero_stats = '{
    "players": "100K+",
    "rating": "4.6",
    "feature": "Tournaments"
  }'::jsonb,
  accent_color = 'blue'
WHERE slug = 'callbreak-friends';

-- =====================================================
-- Migration Complete
-- =====================================================
