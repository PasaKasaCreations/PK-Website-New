-- =====================================================
-- Pasakasa Creations - Row Level Security (RLS) Policies
-- =====================================================
-- CRITICAL SECURITY LAYER
-- This migration enforces all access control at database level
-- =====================================================

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
-- This is MANDATORY - without this, tables are publicly accessible

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- COURSES POLICIES
-- =====================================================

-- ✅ Public can READ published courses (SEO-friendly)
CREATE POLICY "Public can read published courses"
  ON courses
  FOR SELECT
  USING (is_published = TRUE);

-- ❌ No public INSERT/UPDATE/DELETE
-- Only service role (admin dashboard) can modify courses

-- =====================================================
-- GAMES POLICIES
-- =====================================================

-- ✅ Public can READ published games
CREATE POLICY "Public can read published games"
  ON games
  FOR SELECT
  USING (is_published = TRUE);

-- ❌ No public INSERT/UPDATE/DELETE

-- =====================================================
-- INQUIRIES POLICIES (CRITICAL)
-- =====================================================

-- ✅ Public can INSERT inquiries (with strict validation)
CREATE POLICY "Public can submit inquiries"
  ON inquiries
  FOR INSERT
  WITH CHECK (
    -- Validate data at database level (defense in depth)
    char_length(name) >= 2 AND char_length(name) <= 100
    AND char_length(email) >= 5 AND char_length(email) <= 255
    AND char_length(message) >= 10 AND char_length(message) <= 2000
    AND inquiry_type IN ('general', 'course', 'career', 'partnership')
    -- Status must be 'new' on insert
    AND status = 'new'
  );

-- ❌ No public SELECT (privacy protection)
-- ❌ No public UPDATE/DELETE
-- Only admin dashboard can view/manage inquiries via service role

-- =====================================================
-- CONTACT MESSAGES POLICIES (CRITICAL)
-- =====================================================

-- ✅ Public can INSERT contact messages (with validation)
CREATE POLICY "Public can submit contact messages"
  ON contact_messages
  FOR INSERT
  WITH CHECK (
    char_length(name) >= 2 AND char_length(name) <= 100
    AND char_length(email) >= 5 AND char_length(email) <= 255
    AND char_length(message) >= 10 AND char_length(message) <= 2000
  );

-- ❌ No public SELECT (privacy protection)
-- ❌ No UPDATE/DELETE (contact messages are append-only)

-- =====================================================
-- JOB POSTINGS POLICIES
-- =====================================================

-- ✅ Public can READ published job postings
CREATE POLICY "Public can read published job postings"
  ON job_postings
  FOR SELECT
  USING (is_published = TRUE);

-- ❌ No public INSERT/UPDATE/DELETE

-- =====================================================
-- SECURITY VERIFICATION
-- =====================================================

-- Run these queries to verify RLS is working:

-- 1. Check RLS is enabled on all tables
-- SELECT tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public';
-- (All should show rowsecurity = true)

-- 2. Check policies are active
-- SELECT tablename, policyname, cmd, qual
-- FROM pg_policies
-- WHERE schemaname = 'public';

-- 3. Test as anon user (simulating frontend)
-- SET ROLE anon;
-- SELECT * FROM courses; -- Should only return published
-- INSERT INTO inquiries (...); -- Should work with valid data
-- SELECT * FROM inquiries; -- Should return nothing
-- RESET ROLE;

-- =====================================================
-- ADMIN ACCESS (FUTURE)
-- =====================================================

-- When you build the admin dashboard:
-- 1. Create policies that check auth.uid()
-- 2. Or use service role key (server-side only)
-- 3. NEVER expose service role key to frontend

-- Example admin policy (for future reference):
-- CREATE POLICY "Admins can manage inquiries"
--   ON inquiries
--   FOR ALL
--   USING (
--     auth.jwt() ->> 'role' = 'admin'
--   );

-- =====================================================
-- DONE! Your database is now secure.
-- =====================================================
-- What's protected:
-- ✅ Public can only read published content
-- ✅ Public can write to forms (with validation)
-- ✅ No unauthorized data access
-- ✅ No data modification from public users
-- ✅ Defense in depth (app + database validation)
-- =====================================================
