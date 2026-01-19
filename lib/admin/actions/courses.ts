"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient, requireAdmin } from "@/lib/supabase/admin-client";
import { courseFormSchema, type CourseFormData } from "../schemas/course.schema";

export async function getCourses() {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getCourse(id: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function checkCourseSlugExists(slug: string, excludeId?: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  let query = supabase
    .from("courses")
    .select("id")
    .eq("slug", slug);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function createCourse(formData: CourseFormData) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const validated = courseFormSchema.parse(formData);

  const { error } = await supabase.from("courses").insert({
    title: validated.title,
    slug: validated.slug,
    description: validated.description,
    long_description: validated.long_description,
    instructor: validated.instructor,
    duration: validated.duration,
    skill_level: validated.skill_level,
    thumbnail_url: validated.thumbnail_url,
    location: validated.location,
    price: validated.price,
    currency: validated.currency,
    max_students: validated.max_students,
    current_students: validated.current_students,
    next_batch_date: validated.next_batch_date || null,
    sessions_completed: validated.sessions_completed,
    sessions_running: validated.sessions_running,
    learning_outcomes: validated.learning_outcomes,
    prerequisites: validated.prerequisites,
    syllabus: validated.syllabus,
    testimonials: validated.testimonials,
    is_published: validated.is_published,
    featured: validated.featured,
  });

  if (error) throw error;

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  redirect("/admin/courses");
}

export async function updateCourse(id: string, formData: CourseFormData) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const validated = courseFormSchema.parse(formData);

  const { error } = await supabase
    .from("courses")
    .update({
      title: validated.title,
      slug: validated.slug,
      description: validated.description,
      long_description: validated.long_description,
      instructor: validated.instructor,
      duration: validated.duration,
      skill_level: validated.skill_level,
      thumbnail_url: validated.thumbnail_url,
      location: validated.location,
      price: validated.price,
      currency: validated.currency,
      max_students: validated.max_students,
      current_students: validated.current_students,
      next_batch_date: validated.next_batch_date || null,
      sessions_completed: validated.sessions_completed,
      sessions_running: validated.sessions_running,
      learning_outcomes: validated.learning_outcomes,
      prerequisites: validated.prerequisites,
      syllabus: validated.syllabus,
      testimonials: validated.testimonials,
      is_published: validated.is_published,
      featured: validated.featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
  revalidatePath(`/courses/${validated.slug}`);
  redirect("/admin/courses");
}

export async function deleteCourse(id: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}

export async function toggleCoursePublished(id: string, is_published: boolean) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { error } = await supabase
    .from("courses")
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/courses");
  revalidatePath("/courses");
}
