import { JobPostingForm } from "@/components/admin/forms/JobPostingForm";

export default function NewJobPostingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Create Job Posting</h2>
        <p className="text-slate-600">Add a new job opportunity</p>
      </div>

      <JobPostingForm />
    </div>
  );
}
