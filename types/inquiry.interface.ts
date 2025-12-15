import { BaseEntity } from "./common.interface";

export interface Inquiry extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  message: string;
  inquiry_type: "general" | "course" | "career" | "partnership";
  course_id?: string;
  status: "new" | "in_progress" | "resolved";
}
