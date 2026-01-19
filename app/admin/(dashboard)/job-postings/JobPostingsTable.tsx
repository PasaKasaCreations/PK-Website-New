"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DataTable, Column } from "@/components/admin/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { deleteJobPosting } from "@/lib/admin/actions/job-postings";
import { formatEmploymentType } from "@/lib/utils/index";
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
import type { Tables } from "@/types/database.types";

interface JobPostingsTableProps {
  jobPostings: Tables<"job_postings">[];
}

export function JobPostingsTable({ jobPostings }: JobPostingsTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;

    startTransition(async () => {
      await deleteJobPosting(deleteId);
      setDeleteId(null);
      router.refresh();
    });
  };

  const columns: Column<Tables<"job_postings">>[] = [
    {
      key: "title",
      header: "Title",
      cell: (job) => (
        <div>
          <p className="font-medium">{job.title}</p>
          <p className="text-sm text-slate-500">{job.department}</p>
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
    },
    {
      key: "employment_type",
      header: "Type",
      cell: (job) => (
        <Badge variant="outline">{formatEmploymentType(job.employment_type)}</Badge>
      ),
    },
    {
      key: "application_deadline",
      header: "Deadline",
      cell: (job) =>
        job.application_deadline
          ? new Date(job.application_deadline).toLocaleDateString()
          : "-",
    },
    {
      key: "is_published",
      header: "Status",
      cell: (job) => (
        <Badge variant={job.is_published ? "default" : "secondary"}>
          {job.is_published ? "Published" : "Draft"}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={jobPostings}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search job postings..."
        viewHref={(job) => `/admin/job-postings/${job.id}/view`}
        editHref={(job) => `/admin/job-postings/${job.id}`}
        onDelete={(job) => setDeleteId(job.id)}
        emptyMessage="No job postings found. Create your first job posting!"
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job Posting</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this job posting? This action cannot
              be undone.
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
