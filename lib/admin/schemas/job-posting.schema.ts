import { z } from "zod";

export const companySchema = z.object({
  name: z.string().optional(),
  logo: z.string().optional(),
  description: z.string().optional(),
});

export const contactSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export const jobPostingFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  employment_type: z.enum(["full_time", "part_time", "contract", "internship"]),
  salary: z.string().nullable().optional(),
  posted_date: z.string().nullable().optional(),
  application_deadline: z.string().nullable().optional(),
  visa_requirements: z.string().nullable().optional(),
  requirements: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  nice_to_have: z.array(z.string()).default([]),
  company: companySchema.default({}),
  contact: contactSchema.default({}),
  similar_jobs: z.array(z.any()).default([]),
  is_published: z.boolean().default(false),
});

export type JobPostingFormData = z.infer<typeof jobPostingFormSchema>;
export type Company = z.infer<typeof companySchema>;
export type Contact = z.infer<typeof contactSchema>;
