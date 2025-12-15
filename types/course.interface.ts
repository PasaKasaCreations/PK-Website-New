import { BaseEntity, SkillLevel } from "./common.interface";

export interface Course extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  long_description: string;
  instructor: string;
  duration: string;
  skill_level: SkillLevel;
  thumbnail_url: string;
  syllabus: readonly SyllabusItem[];
  learning_outcomes: readonly string[];
  prerequisites: readonly string[];
  is_published: boolean;
  featured: boolean;
  // Live Class Specific
  sessions_running: number;
  sessions_completed: number;
  next_batch_date: string;
  location: string;
  max_students: number;
  current_students?: number;
  testimonials: readonly Testimonial[];
}

export interface SyllabusItem {
  module: number;
  title: string;
  topics: readonly string[];
  duration: string;
}

export interface Testimonial {
  id: string;
  student_name: string;
  student_image?: string;
  rating: number;
  comment: string;
  batch: string;
  date: string;
}

export interface Enrollment extends BaseEntity {
  user_id: string;
  course_id: string;
  payment_status: "pending" | "completed" | "failed";
  payment_amount: number;
  payment_id?: string;
}
