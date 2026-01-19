import type { Tables } from "./database.types";

// Typed structure for company JSONB field
export interface JobCompany {
  name: string;
  description: string;
}

// Typed structure for contact JSONB field
export interface JobContact {
  name: string;
  title: string;
  email: string;
  photo?: string;
  linkedin?: string;
}

// Typed structure for similar_jobs JSONB field
export interface SimilarJob {
  id: string;
  title: string;
  location: string;
  salary?: string;
}

// Job type derived from database, with typed JSONB fields
export type Job = Omit<
  Tables<"job_postings">,
  "company" | "contact" | "similar_jobs"
> & {
  company: JobCompany;
  contact: JobContact;
  similar_jobs: SimilarJob[];
};
