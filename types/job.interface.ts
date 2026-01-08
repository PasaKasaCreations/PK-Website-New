import type { Enums } from "./database.types";

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employment_type: Enums<"employment_type">;
  salary?: string;
  visaRequirements?: string;
  description: string;
  company: {
    name: string;
    description: string;
  };
  responsibilities: string[];
  requirements: string[];
  benefits?: string[];
  contact?: {
    name: string;
    title: string;
    email: string;
    photo?: string;
    linkedin?: string;
  };
  similarJobs?: {
    id: string;
    title: string;
    location: string;
    salary?: string;
  }[];
  postedDate?: string;
}
