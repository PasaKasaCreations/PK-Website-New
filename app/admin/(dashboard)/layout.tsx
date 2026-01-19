import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase/admin-client";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <AdminLayout user={user}>{children}</AdminLayout>;
}
