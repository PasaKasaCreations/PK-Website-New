"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DataTable, Column } from "@/components/admin/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  updateResumeStatus,
  deleteResumeSubmission,
} from "@/lib/admin/actions/resumes";
import { ResumeSubmission, ResumeSubmissionStatus } from "@/types/resume.interface";

interface ResumesTableProps {
  resumes: ResumeSubmission[];
}

const statusLabels: Record<ResumeSubmissionStatus, string> = {
  pending: "Pending",
  reviewed: "Reviewed",
  contacted: "Contacted",
  rejected: "Rejected",
};

const statusColors: Record<ResumeSubmissionStatus, string> = {
  pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  reviewed: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  contacted: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

function StatusSelect({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: ResumeSubmissionStatus;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (status: ResumeSubmissionStatus) => {
    startTransition(async () => {
      await updateResumeStatus(id, status);
      router.refresh();
    });
  };

  return (
    <Select
      value={currentStatus}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="reviewed">Reviewed</SelectItem>
        <SelectItem value="contacted">Contacted</SelectItem>
        <SelectItem value="rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function ResumesTable({ resumes }: ResumesTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!deleteId) return;

    startTransition(async () => {
      await deleteResumeSubmission(deleteId);
      setDeleteId(null);
      router.refresh();
    });
  };

  const columns: Column<ResumeSubmission>[] = [
    {
      key: "name",
      header: "Applicant",
      cell: (resume) => (
        <div>
          <p className="font-medium">{resume.name}</p>
          <a
            href={`mailto:${resume.email}`}
            className="text-sm text-blue-600 hover:underline"
          >
            {resume.email}
          </a>
        </div>
      ),
    },
    {
      key: "role_looking_for",
      header: "Role",
      cell: (resume) => (
        <Badge variant="outline">{resume.role_looking_for}</Badge>
      ),
    },
    {
      key: "created_at",
      header: "Submitted",
      cell: (resume) => (
        <span className="text-sm">
          {new Date(resume.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (resume) => (
        <StatusSelect
          id={resume.id}
          currentStatus={resume.status as ResumeSubmissionStatus}
        />
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={resumes}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search by name..."
        viewHref={(resume) => `/admin/resumes/${resume.id}`}
        onDelete={(resume) => setDeleteId(resume.id)}
        emptyMessage="No resume submissions yet."
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resume submission? This will
              also delete the uploaded resume file. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
