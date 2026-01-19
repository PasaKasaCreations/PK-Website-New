"use server";

import { createAdminClient, requireAdmin } from "@/lib/supabase/admin-client";

export async function getContactMessages() {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getContactMessage(id: string) {
  await requireAdmin();
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
