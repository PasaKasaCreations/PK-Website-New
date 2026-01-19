-- =====================================================
-- Admin Users Table
-- =====================================================
-- This table stores whitelisted admin email addresses.
-- Users must authenticate via Supabase Auth AND have their
-- email in this table to access the admin portal.
-- =====================================================

-- Admin Users Table
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

-- Index for fast email lookup
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_active ON admin_users(is_active) WHERE is_active = TRUE;

-- Updated at trigger
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- No public access - only authenticated admins can read (and they check their own email)
-- Admin operations happen via service role or server-side

-- Policy: Authenticated users can check if their email is an admin
CREATE POLICY "Users can check own admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Comments
COMMENT ON TABLE admin_users IS 'Whitelist of admin email addresses for admin portal access';
COMMENT ON COLUMN admin_users.email IS 'Email address that must match Supabase Auth user email';
COMMENT ON COLUMN admin_users.is_active IS 'Set to false to disable admin access without deleting';
COMMENT ON COLUMN admin_users.last_login IS 'Updated when admin logs in (for audit purposes)';

-- =====================================================
-- Helper function to check if user is admin
-- =====================================================
CREATE OR REPLACE FUNCTION is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE email = user_email AND is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- Update existing RLS policies to allow admin access
-- =====================================================

-- Courses: Admins can do everything
CREATE POLICY "Admins have full access to courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- Games: Admins can do everything
CREATE POLICY "Admins have full access to games"
  ON games
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- Job Postings: Admins can do everything
CREATE POLICY "Admins have full access to job_postings"
  ON job_postings
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- Inquiries: Admins can read and update
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

-- Contact Messages: Admins can read
CREATE POLICY "Admins can read contact_messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'));

-- Admin Users: Admins can manage other admins
CREATE POLICY "Admins can manage admin_users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));
