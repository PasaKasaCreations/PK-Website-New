-- =====================================================
-- Fix Contact Messages RLS Policy
-- =====================================================
-- This migration updates the RLS policy for contact_messages
-- to properly handle the optional phone field
-- =====================================================

-- Drop the existing policy
DROP POLICY IF EXISTS "Public can submit contact messages" ON contact_messages;

-- Recreate the policy with phone field validation
-- Handles NULL, empty strings, and valid phone numbers
CREATE POLICY "Public can submit contact messages"
  ON contact_messages
  FOR INSERT
  WITH CHECK (
    char_length(name) >= 2 AND char_length(name) <= 100
    AND char_length(email) >= 5 AND char_length(email) <= 255
    AND char_length(message) >= 10 AND char_length(message) <= 2000
    AND (phone IS NULL OR phone = '' OR (char_length(phone) >= 7 AND char_length(phone) <= 20))
  );

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- The contact_messages RLS policy now properly handles
-- the optional phone field, allowing:
-- - NULL phone values (field not provided)
-- - Phone values with 7-20 characters
-- =====================================================
