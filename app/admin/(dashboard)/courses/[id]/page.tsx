import { notFound } from "next/navigation";
import { getCourse } from "@/lib/admin/actions/courses";
import { CourseForm } from "@/components/admin/forms/CourseForm";

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params;

  let course;
  try {
    course = await getCourse(id);
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Edit Course</h2>
        <p className="text-slate-600">Update course details</p>
      </div>

      <CourseForm course={course} />
    </div>
  );
}
