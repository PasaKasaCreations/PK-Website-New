import { notFound } from "next/navigation";
import { getCourse } from "@/lib/admin/actions/courses";
import { Badge } from "@/components/ui/badge";
import {
  DetailView,
  DetailSection,
  DetailField,
  DetailGrid,
  DetailImage,
  DetailList,
  DetailDate,
  S3Image,
} from "@/components/admin/ui/DetailView";

interface ViewCoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function ViewCoursePage({ params }: ViewCoursePageProps) {
  const { id } = await params;

  let course;
  try {
    course = await getCourse(id);
  } catch {
    notFound();
  }

  const syllabus = course.syllabus as Array<{ title: string; topics: string[] }> | null;
  const testimonials = course.testimonials as Array<{
    name: string;
    role: string;
    content: string;
    avatar?: string;
  }> | null;

  return (
    <DetailView
      title={course.title}
      subtitle={`/${course.slug}`}
      backHref="/admin/courses"
      editHref={`/admin/courses/${course.id}`}
      publicHref={course.is_published ? `/courses/${course.slug}` : undefined}
      status={{
        label: course.is_published ? "Published" : "Draft",
        variant: course.is_published ? "default" : "secondary",
      }}
      badges={course.featured ? [{ label: "Featured", className: "bg-yellow-100 text-yellow-800" }] : undefined}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <DetailSection title="Basic Information">
            <DetailGrid columns={2}>
              <DetailField label="Title" value={course.title} />
              <DetailField label="Slug" value={course.slug} />
              <DetailField label="Instructor" value={course.instructor} />
              <DetailField label="Location" value={course.location} />
              <DetailField label="Duration" value={course.duration} />
              <DetailField label="Skill Level">
                <Badge variant="outline" className="capitalize">
                  {course.skill_level}
                </Badge>
              </DetailField>
            </DetailGrid>
          </DetailSection>

          {/* Description */}
          <DetailSection title="Description">
            <div className="space-y-4">
              <DetailField label="Short Description" value={course.description} />
              <DetailField label="Long Description">
                {course.long_description ? (
                  <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
                    {course.long_description}
                  </div>
                ) : (
                  <span className="text-slate-400 italic">Not set</span>
                )}
              </DetailField>
            </div>
          </DetailSection>

          {/* Learning Outcomes */}
          <DetailSection title="Learning Outcomes">
            <DetailList items={course.learning_outcomes} emptyMessage="No learning outcomes defined" />
          </DetailSection>

          {/* Prerequisites */}
          <DetailSection title="Prerequisites">
            <DetailList items={course.prerequisites} emptyMessage="No prerequisites" />
          </DetailSection>

          {/* Syllabus */}
          <DetailSection title="Syllabus">
            {syllabus && syllabus.length > 0 ? (
              <div className="space-y-4">
                {syllabus.map((module, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">
                      Module {i + 1}: {module.title}
                    </h4>
                    <ul className="space-y-1">
                      {module.topics?.map((topic, j) => (
                        <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-slate-400 italic">No syllabus defined</span>
            )}
          </DetailSection>

          {/* Testimonials */}
          <DetailSection title="Testimonials">
            {testimonials && testimonials.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {testimonials.map((testimonial, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-3 italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center gap-2">
                      {testimonial.avatar && (
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                          <S3Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-slate-900">{testimonial.name}</p>
                        <p className="text-xs text-slate-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-slate-400 italic">No testimonials</span>
            )}
          </DetailSection>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Thumbnail */}
          <DetailSection title="Thumbnail">
            <DetailImage
              src={course.thumbnail_url}
              alt={course.title}
              className="aspect-video w-full"
            />
          </DetailSection>

          {/* Pricing */}
          <DetailSection title="Pricing">
            <div className="text-3xl font-bold text-slate-900">
              {course.currency} {course.price.toLocaleString()}
            </div>
          </DetailSection>

          {/* Enrollment */}
          <DetailSection title="Enrollment">
            <DetailGrid columns={2}>
              <DetailField label="Max Students" value={course.max_students} />
              <DetailField label="Current Students" value={course.current_students} />
            </DetailGrid>
          </DetailSection>

          {/* Schedule */}
          <DetailSection title="Schedule">
            <div className="space-y-4">
              <DetailField label="Next Batch Date">
                <DetailDate date={course.next_batch_date} />
              </DetailField>
              <DetailGrid columns={2}>
                <DetailField label="Sessions Completed" value={course.sessions_completed} />
                <DetailField label="Sessions Running" value={course.sessions_running} />
              </DetailGrid>
            </div>
          </DetailSection>

          {/* Metadata */}
          <DetailSection title="Metadata">
            <div className="space-y-4 text-sm">
              <DetailField label="Created">
                <DetailDate date={course.created_at} showTime />
              </DetailField>
              <DetailField label="Last Updated">
                <DetailDate date={course.updated_at} showTime />
              </DetailField>
            </div>
          </DetailSection>
        </div>
      </div>
    </DetailView>
  );
}
