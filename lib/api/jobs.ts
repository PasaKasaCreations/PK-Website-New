import { createClient } from '@/lib/supabase/server';
import { Job } from '@/types/job.interface';

/**
 * Fetch all active job postings from Supabase
 * Used in careers listing page
 */
export async function getAllJobs(): Promise<Job[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }

  return data as unknown as Job[];
}

/**
 * Fetch a single job by slug
 * Used in job detail page
 */
export async function getJobBySlug(slug: string): Promise<Job | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching job:', error);
    return null;
  }

  return data as unknown as Job;
}

/**
 * Fetch jobs by department
 */
export async function getJobsByDepartment(department: string): Promise<Job[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('department', department)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs by department:', error);
    return [];
  }

  return data as unknown as Job[];
}

/**
 * Generate static params for all job slugs
 * Used for static generation at build time
 */
export async function getAllJobSlugs(): Promise<string[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('job_postings')
    .select('slug');

  if (error) {
    console.error('Error fetching job slugs:', error);
    return [];
  }

  return data.map((job) => job.slug);
}
