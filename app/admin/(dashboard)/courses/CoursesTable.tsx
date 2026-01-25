"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DataTable, Column } from "@/components/admin/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteCourse, toggleCoursePublished } from "@/lib/admin/actions/courses";
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
import { Download } from "lucide-react";
import { generateCoursePDF, generateAllCoursesPDF } from "@/lib/pdf/course-pdf";
import type { Tables } from "@/types/database.types";

interface CoursesTableProps {
  courses: Tables<"courses">[];
}

export function CoursesTable({ courses }: CoursesTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;

    startTransition(async () => {
      await deleteCourse(deleteId);
      setDeleteId(null);
      router.refresh();
    });
  };

  const columns: Column<Tables<"courses">>[] = [
    {
      key: "title",
      header: "Title",
      cell: (course) => (
        <div>
          <p className="font-medium">{course.title}</p>
          <p className="text-sm text-slate-500">{course.slug}</p>
        </div>
      ),
    },
    {
      key: "instructor",
      header: "Instructor",
    },
    {
      key: "skill_level",
      header: "Level",
      cell: (course) => (
        <Badge variant="outline" className="capitalize">
          {course.skill_level}
        </Badge>
      ),
    },
    {
      key: "is_published",
      header: "Status",
      cell: (course) => (
        <Badge variant={course.is_published ? "default" : "secondary"}>
          {course.is_published ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "featured",
      header: "Featured",
      cell: (course) =>
        course.featured ? (
          <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
        ) : null,
    },
  ];

  const handleDownloadPDF = async (course: Tables<"courses">) => {
    await generateCoursePDF(course);
  };

  const handleDownloadAllPDF = async () => {
    await generateAllCoursesPDF(courses);
  };

  return (
    <>
      {courses.length > 0 && (
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleDownloadAllPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download All as PDF
          </Button>
        </div>
      )}
      <DataTable
        data={courses}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search courses..."
        viewHref={(course) => `/admin/courses/${course.id}/view`}
        editHref={(course) => `/admin/courses/${course.id}`}
        onDownload={handleDownloadPDF}
        onDelete={(course) => setDeleteId(course.id)}
        emptyMessage="No courses found. Create your first course!"
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this course? This action cannot be
              undone.
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
