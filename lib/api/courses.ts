import { createClient } from "@/lib/supabase/server";
import { Course } from "@/types/course.interface";
import { getImageUrl } from "@/lib/wasabi/utils";

/**
 * Transform course data to include signed URLs for S3 images
 */
async function transformCourseImages(course: Course): Promise<Course> {
  // Get signed URL for thumbnail if it's an S3 key
  const thumbnailUrl = await getImageUrl(course.thumbnail_url);

  return {
    ...course,
    thumbnail_url: thumbnailUrl || course.thumbnail_url,
  };
}

/**
 * Transform multiple courses to include signed URLs
 */
async function transformCoursesImages(courses: Course[]): Promise<Course[]> {
  return Promise.all(courses.map(transformCourseImages));
}

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

  const courses = data as unknown as Course[];
  return transformCoursesImages(courses);
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

  const courses = data as unknown as Course[];
  return transformCoursesImages(courses);
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

  const course = data as unknown as Course;
  return transformCourseImages(course);
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
