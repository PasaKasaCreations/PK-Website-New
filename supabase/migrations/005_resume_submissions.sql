-- ============================================
-- Resume Submissions Table
-- Stores job applications/resume submissions from careers page
-- ============================================

-- Create the resume_submissions table
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

-- ============================================
-- INDEXES
-- ============================================

-- Index for email lookups (check duplicate applications)
CREATE INDEX IF NOT EXISTS idx_resume_submissions_email
  ON public.resume_submissions(email);

-- Index for status filtering (admin dashboard)
CREATE INDEX IF NOT EXISTS idx_resume_submissions_status
  ON public.resume_submissions(status);

-- Index for sorting by submission date (most recent first)
CREATE INDEX IF NOT EXISTS idx_resume_submissions_created_at
  ON public.resume_submissions(created_at DESC);

-- ============================================
-- Auto-update timestamp trigger
-- ============================================
DROP TRIGGER IF EXISTS update_resume_submissions_updated_at ON public.resume_submissions;
CREATE TRIGGER update_resume_submissions_updated_at
  BEFORE UPDATE ON public.resume_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.resume_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can submit a resume (INSERT)
CREATE POLICY "Anyone can submit resume"
  ON public.resume_submissions
  FOR INSERT
  WITH CHECK (true);

-- RLS Policy: Only admins can view submissions
CREATE POLICY "Only admins can view resume submissions"
  ON public.resume_submissions
  FOR SELECT
  USING (is_admin(auth.jwt() ->> 'email'));

-- RLS Policy: Only admins can update submissions (change status)
CREATE POLICY "Only admins can update resume submissions"
  ON public.resume_submissions
  FOR UPDATE
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

-- RLS Policy: Only admins can delete submissions
CREATE POLICY "Only admins can delete resume submissions"
  ON public.resume_submissions
  FOR DELETE
  USING (is_admin(auth.jwt() ->> 'email'));

-- ============================================
-- COMMENTS (Documentation)
-- ============================================
COMMENT ON TABLE public.resume_submissions IS 'Stores job applications and resume submissions from the careers page';
COMMENT ON COLUMN public.resume_submissions.name IS 'Full name of the applicant';
COMMENT ON COLUMN public.resume_submissions.email IS 'Email address of the applicant';
COMMENT ON COLUMN public.resume_submissions.role_looking_for IS 'The position/role the applicant is interested in';
COMMENT ON COLUMN public.resume_submissions.cover_letter IS 'Optional cover letter or introduction message';
COMMENT ON COLUMN public.resume_submissions.resume_key IS 'S3 key for the uploaded resume file in Wasabi bucket';
COMMENT ON COLUMN public.resume_submissions.status IS 'Application status: pending, reviewed, contacted, rejected';
