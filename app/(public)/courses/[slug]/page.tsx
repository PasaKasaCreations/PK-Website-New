import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourseSlugs } from "@/lib/api/courses";
import { getSiteSettings } from "@/lib/api/settings";
import { FloatingLayout } from "@/components/courses/layouts/FloatingLayout";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all course pages
export async function generateStaticParams() {
  const slugs = await getAllCourseSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: `${course.title} - Pasakasa Creations`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const [course, settings] = await Promise.all([
    getCourseBySlug(slug),
    getSiteSettings(),
  ]);

  if (!course) {
    notFound();
  }

  return (
    <FloatingLayout course={course} whatsappNumber={settings.whatsapp_number} />
  );
}
