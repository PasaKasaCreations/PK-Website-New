import { createClient } from "@/lib/supabase/server";
import { Course } from "@/types/course.interface";

/**
 * Fetch all published courses from Supabase
 * Used in courses listing page
 */
export async function getPublishedCourses(): Promise<Course[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }

  return data as unknown as Course[];
}

/**
 * Fetch featured courses from Supabase
 * Used in homepage
 */
export async function getFeaturedCourses(): Promise<Course[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching featured courses:", error);
    return [];
  }

  return data as unknown as Course[];
}

/**
 * Fetch a single course by slug
 * Used in course detail page
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching course:", error);
    return null;
  }

  return data as unknown as Course;
}

/**
 * Generate static params for all published course slugs
 * Used for static generation at build time
 */
export async function getAllCourseSlugs(): Promise<string[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("slug")
    .eq("is_published", true);

  if (error) {
    console.error("Error fetching course slugs:", error);
    return [];
  }

  return data.map((course) => course.slug);
}
