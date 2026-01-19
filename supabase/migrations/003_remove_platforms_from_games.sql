-- =====================================================
-- Migration: Remove platforms field from games table
-- =====================================================
-- This field is no longer used in the application
-- =====================================================

ALTER TABLE games DROP COLUMN IF EXISTS platforms;
