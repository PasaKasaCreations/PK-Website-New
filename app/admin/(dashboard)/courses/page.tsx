import Link from "next/link";
import { getCourses, deleteCourse } from "@/lib/admin/actions/courses";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CoursesTable } from "./CoursesTable";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Courses</h2>
          <p className="text-slate-600">Manage your courses</p>
        </div>
        <Link href="/admin/courses/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </Link>
      </div>

      <CoursesTable courses={courses} />
    </div>
  );
}
