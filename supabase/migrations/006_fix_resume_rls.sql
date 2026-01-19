-- ============================================
-- Fix Resume Submissions RLS and Permissions
-- ============================================

-- Grant INSERT permissions to anon and authenticated roles
-- This allows public form submissions to work
GRANT INSERT ON TABLE public.resume_submissions TO anon, authenticated;

-- Update the INSERT policy to be more explicit (optional but good practice)
-- Matches the pattern used in inquiries and contact_messages
DROP POLICY IF EXISTS "Anyone can submit resume" ON public.resume_submissions;

CREATE POLICY "Public can submit resumes"
  ON public.resume_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Documentation
COMMENT ON POLICY "Public can submit resumes" ON public.resume_submissions IS 'Allows anonymous and authenticated users to submit resumes via the careers form';
