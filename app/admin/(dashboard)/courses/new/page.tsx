import { CourseForm } from "@/components/admin/forms/CourseForm";

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Create Course</h2>
        <p className="text-slate-600">Add a new course to your catalog</p>
      </div>

      <CourseForm />
    </div>
  );
}
