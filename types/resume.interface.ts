// Database type for resume submission
// Note: After running the migration and regenerating database types,
// you can replace this with: export type ResumeSubmission = Tables<"resume_submissions">;
export interface ResumeSubmission {
  id: string;
  name: string;
  email: string;
  role_looking_for: string;
  cover_letter: string | null;
  resume_key: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Form data for submitting a resume
export interface ResumeSubmissionFormData {
  name: string;
  email: string;
  role_looking_for: string;
  cover_letter?: string;
}

// API request type (form data fields)
export interface ResumeSubmissionRequest extends ResumeSubmissionFormData {
  // File is handled separately via FormData
}

// API response type
export interface ResumeSubmissionResponse {
  success: boolean;
  data?: ResumeSubmission;
  error?: string;
}

// Resume submission status
export type ResumeSubmissionStatus =
  | "pending"
  | "reviewed"
  | "contacted"
  | "rejected";
