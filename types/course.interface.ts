import type { Tables } from "./database.types";

// Typed structure for syllabus JSONB field (matches admin form schema)
export interface SyllabusItem {
  title: string;
  topics: string[];
}

// Typed structure for testimonials JSONB field (matches admin form schema)
export interface Testimonial {
  name: string;
  role?: string;
  content: string;
  avatar?: string;
}

// Course type derived from database, with typed JSONB fields
export type Course = Omit<Tables<"courses">, "syllabus" | "testimonials"> & {
  syllabus: SyllabusItem[];
  testimonials: Testimonial[];
};
