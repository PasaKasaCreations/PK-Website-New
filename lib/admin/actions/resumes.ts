"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient, requireAdmin } from "@/lib/supabase/admin-client";
import { deleteImage, getImageSignedUrl } from "@/lib/wasabi/actions";
import { ResumeSubmission, ResumeSubmissionStatus } from "@/types/resume.interface";

export async function getResumeSubmissions(filters?: {
  status?: ResumeSubmissionStatus;
}) {
  await requireAdmin();
  const supabase = await createAdminClient();

  // Using type assertion until database types are regenerated
  const client: { from: (table: string) => ReturnType<typeof supabase.from> } = supabase;

  let query = client
    .from("resume_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as unknown as ResumeSubmission[];
}

export async function getResumeSubmission(id: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const client: { from: (table: string) => ReturnType<typeof supabase.from> } = supabase;

  const { data, error } = await client
    .from("resume_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as unknown as ResumeSubmission;
}

export async function updateResumeStatus(
  id: string,
  status: ResumeSubmissionStatus
) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const client: { from: (table: string) => ReturnType<typeof supabase.from> } = supabase;

  const { error } = await client
    .from("resume_submissions")
    .update({ status } as Record<string, unknown>)
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/resumes");
  revalidatePath(`/admin/resumes/${id}`);
}

export async function deleteResumeSubmission(id: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const client: { from: (table: string) => ReturnType<typeof supabase.from> } = supabase;

  // First get the resume to delete the file from S3
  const { data: resume, error: fetchError } = await client
    .from("resume_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError) throw fetchError;

  const resumeData = resume as unknown as ResumeSubmission;

  // Delete the file from S3 if it exists
  if (resumeData?.resume_key) {
    await deleteImage(resumeData.resume_key);
  }

  // Delete the database record
  const { error } = await client
    .from("resume_submissions")
    .delete()
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/resumes");
}

export async function getResumeDownloadUrl(key: string) {
  await requireAdmin();

  const result = await getImageSignedUrl(key, 3600); // 1 hour expiry

  if (!result.success || !result.url) {
    throw new Error(result.error || "Failed to generate download URL");
  }

  return result.url;
}
