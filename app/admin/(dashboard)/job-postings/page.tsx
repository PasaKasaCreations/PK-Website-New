import Link from "next/link";
import { getJobPostings } from "@/lib/admin/actions/job-postings";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { JobPostingsTable } from "./JobPostingsTable";

export default async function JobPostingsPage() {
  const jobPostings = await getJobPostings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Job Postings</h2>
          <p className="text-slate-600">Manage your job listings</p>
        </div>
        <Link href="/admin/job-postings/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Job Posting
          </Button>
        </Link>
      </div>

      <JobPostingsTable jobPostings={jobPostings} />
    </div>
  );
}
