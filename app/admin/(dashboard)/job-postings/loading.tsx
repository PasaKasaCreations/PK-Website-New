import { TableSkeleton } from "@/components/admin/ui/AdminLoader";

export default function JobPostingsLoading() {
  return <TableSkeleton rows={5} />;
}
