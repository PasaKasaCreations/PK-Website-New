import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getResumeSubmission,
  getResumeDownloadUrl,
} from "@/lib/admin/actions/resumes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Mail,
  Calendar,
  Briefcase,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import { ResumeStatusSelect } from "./ResumeStatusSelect";
import { ResumeSubmissionStatus } from "@/types/resume.interface";

interface ResumeDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusLabels: Record<ResumeSubmissionStatus, string> = {
  pending: "Pending",
  reviewed: "Reviewed",
  contacted: "Contacted",
  rejected: "Rejected",
};

const statusColors: Record<ResumeSubmissionStatus, string> = {
  pending: "bg-blue-100 text-blue-800",
  reviewed: "bg-yellow-100 text-yellow-800",
  contacted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default async function ResumeDetailPage({
  params,
}: ResumeDetailPageProps) {
  const { id } = await params;

  let resume;
  let downloadUrl: string | null = null;

  try {
    resume = await getResumeSubmission(id);
    if (resume.resume_key) {
      downloadUrl = await getResumeDownloadUrl(resume.resume_key);
    }
  } catch {
    notFound();
  }

  const fileExtension = resume.resume_key?.split(".").pop()?.toUpperCase() || "FILE";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/resumes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Resume Submission
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            From {resume.name} • Looking for {resume.role_looking_for}
          </p>
        </div>
        <Badge className={statusColors[resume.status as ResumeSubmissionStatus]}>
          {statusLabels[resume.status as ResumeSubmissionStatus]}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Resume File */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
                    <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium">{resume.name}&apos;s Resume</p>
                    <p className="text-sm text-slate-500">{fileExtension} Document</p>
                  </div>
                </div>
                {downloadUrl && (
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </a>
                    </Button>
                    <Button asChild size="sm">
                      <a href={downloadUrl} download>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cover Letter */}
          <Card>
            <CardHeader>
              <CardTitle>Cover Letter</CardTitle>
            </CardHeader>
            <CardContent>
              {resume.cover_letter ? (
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                  {resume.cover_letter}
                </p>
              ) : (
                <p className="text-slate-500 italic">No cover letter provided</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <a
                  href={`mailto:${resume.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {resume.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700 dark:text-slate-300">
                  {resume.role_looking_for}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {new Date(resume.created_at).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Update Status:
                </span>
                <ResumeStatusSelect
                  id={resume.id}
                  currentStatus={resume.status as ResumeSubmissionStatus}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <a href={`mailto:${resume.email}`}>Reply via Email</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
