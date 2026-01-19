import { getResumeSubmissions } from "@/lib/admin/actions/resumes";
import { ResumesTable } from "./ResumesTable";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Resume Submissions | Admin",
};

export default async function ResumesPage() {
  const resumes = await getResumeSubmissions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Resume Submissions
          </h2>
          <p className="text-muted-foreground">
            View and manage resume submissions from the careers page
          </p>
        </div>
      </div>

      <ResumesTable resumes={resumes} />
    </div>
  );
}
