import { getInquiries } from "@/lib/admin/actions/inquiries";
import { InquiriesTable } from "./InquiriesTable";

export default async function InquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Inquiries</h2>
        <p className="text-slate-600">View and manage customer inquiries</p>
      </div>

      <InquiriesTable inquiries={inquiries} />
    </div>
  );
}
