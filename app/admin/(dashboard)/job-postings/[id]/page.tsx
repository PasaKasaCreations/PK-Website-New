import { notFound } from "next/navigation";
import { getJobPosting } from "@/lib/admin/actions/job-postings";
import { JobPostingForm } from "@/components/admin/forms/JobPostingForm";

interface EditJobPostingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPostingPage({
  params,
}: EditJobPostingPageProps) {
  const { id } = await params;

  let jobPosting;
  try {
    jobPosting = await getJobPosting(id);
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Edit Job Posting</h2>
        <p className="text-slate-600">Update job posting details</p>
      </div>

      <JobPostingForm jobPosting={jobPosting} />
    </div>
  );
}
