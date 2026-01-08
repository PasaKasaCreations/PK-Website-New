import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Enums } from "@/types/database.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats employment type from database format to human-readable format
 * @param employmentType - Database employment type value
 * @returns Formatted employment type string
 *
 * @example
 * formatEmploymentType("full_time") // "Full-Time"
 * formatEmploymentType("part_time") // "Part-Time"
 * formatEmploymentType("contract") // "Contract"
 * formatEmploymentType("internship") // "Internship"
 */
export function formatEmploymentType(
  employmentType: Enums<"employment_type">
): string {
  const formatMap: Record<Enums<"employment_type">, string> = {
    full_time: "Full-Time",
    part_time: "Part-Time",
    contract: "Contract",
    internship: "Internship",
  };

  return formatMap[employmentType] || employmentType;
}
