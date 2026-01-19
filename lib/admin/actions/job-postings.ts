"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient, requireAdmin } from "@/lib/supabase/admin-client";
import {
  jobPostingFormSchema,
  type JobPostingFormData,
} from "../schemas/job-posting.schema";

export async function getJobPostings() {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("job_postings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getJobPosting(id: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("job_postings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function checkJobPostingSlugExists(slug: string, excludeId?: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  let query = supabase
    .from("job_postings")
    .select("id")
    .eq("slug", slug);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function createJobPosting(formData: JobPostingFormData) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const validated = jobPostingFormSchema.parse(formData);

  const { error } = await supabase.from("job_postings").insert({
    title: validated.title,
    slug: validated.slug,
    description: validated.description,
    department: validated.department,
    location: validated.location,
    employment_type: validated.employment_type,
    salary: validated.salary || null,
    posted_date: validated.posted_date || new Date().toISOString().split("T")[0],
    application_deadline: validated.application_deadline || null,
    visa_requirements: validated.visa_requirements || null,
    requirements: validated.requirements,
    responsibilities: validated.responsibilities,
    benefits: validated.benefits,
    nice_to_have: validated.nice_to_have,
    company: validated.company,
    contact: validated.contact,
    similar_jobs: validated.similar_jobs,
    is_published: validated.is_published,
  });

  if (error) throw error;

  revalidatePath("/admin/job-postings");
  revalidatePath("/careers");
  redirect("/admin/job-postings");
}

export async function updateJobPosting(id: string, formData: JobPostingFormData) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const validated = jobPostingFormSchema.parse(formData);

  const { error } = await supabase
    .from("job_postings")
    .update({
      title: validated.title,
      slug: validated.slug,
      description: validated.description,
      department: validated.department,
      location: validated.location,
      employment_type: validated.employment_type,
      salary: validated.salary || null,
      posted_date: validated.posted_date || null,
      application_deadline: validated.application_deadline || null,
      visa_requirements: validated.visa_requirements || null,
      requirements: validated.requirements,
      responsibilities: validated.responsibilities,
      benefits: validated.benefits,
      nice_to_have: validated.nice_to_have,
      company: validated.company,
      contact: validated.contact,
      similar_jobs: validated.similar_jobs,
      is_published: validated.is_published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/job-postings");
  revalidatePath("/careers");
  redirect("/admin/job-postings");
}

export async function deleteJobPosting(id: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { error } = await supabase.from("job_postings").delete().eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/job-postings");
  revalidatePath("/careers");
}
