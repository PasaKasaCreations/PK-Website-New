"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient, requireAdmin } from "@/lib/supabase/admin-client";
import type { Enums } from "@/types/database.types";

export async function getInquiries(filters?: {
  type?: Enums<"inquiry_type">;
  status?: Enums<"inquiry_status">;
}) {
  await requireAdmin();
  const supabase = await createAdminClient();

  let query = supabase
    .from("inquiries")
    .select("*, courses(title)")
    .order("created_at", { ascending: false });

  if (filters?.type) {
    query = query.eq("inquiry_type", filters.type);
  }

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function getInquiry(id: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("inquiries")
    .select("*, courses(title)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateInquiryStatus(
  id: string,
  status: Enums<"inquiry_status">
) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}
