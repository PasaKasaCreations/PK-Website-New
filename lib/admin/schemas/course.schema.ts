import { z } from "zod";

// Custom validation for image paths (accepts both URLs and S3 keys)
const imagePathSchema = z.string().min(1, "Image is required").refine(
  (val) => {
    // Accept URLs (http:// or https://)
    if (val.startsWith("http://") || val.startsWith("https://")) {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }
    // Accept S3 keys (folder/filename pattern)
    return /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/.test(val);
  },
  { message: "Invalid image path or URL" }
);

export const syllabusModuleSchema = z.object({
  title: z.string().min(1, "Module title is required"),
  topics: z.array(z.string()).default([]),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  avatar: z.string().optional(),
});

export const courseFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  long_description: z.string().min(1, "Long description is required"),
  instructor: z.string().min(1, "Instructor is required"),
  duration: z.string().min(1, "Duration is required"),
  skill_level: z.enum(["beginner", "intermediate", "advanced"]),
  thumbnail_url: imagePathSchema,
  location: z.string().min(1, "Location is required"),
  price: z.number().min(0, "Price must be positive"),
  currency: z.string().default("INR"),
  max_students: z.number().min(1, "Max students must be at least 1"),
  current_students: z.number().min(0).default(0),
  next_batch_date: z.string().nullable().optional(),
  sessions_completed: z.number().min(0).default(0),
  sessions_running: z.number().min(0).default(0),
  learning_outcomes: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  syllabus: z.array(syllabusModuleSchema).default([]),
  testimonials: z.array(testimonialSchema).default([]),
  is_published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export type CourseFormData = z.infer<typeof courseFormSchema>;
export type SyllabusModule = z.infer<typeof syllabusModuleSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
