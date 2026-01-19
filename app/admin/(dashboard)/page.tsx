import { createAdminClient } from "@/lib/supabase/admin-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Gamepad2,
  Briefcase,
  MessageSquare,
  Mail,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

async function getStats() {
  const supabase = await createAdminClient();

  const [courses, games, jobPostings, inquiries, contactMessages] =
    await Promise.all([
      supabase.from("courses").select("id, is_published", { count: "exact" }),
      supabase
        .from("games")
        .select("id, is_published, status", { count: "exact" }),
      supabase
        .from("job_postings")
        .select("id, is_published", { count: "exact" }),
      supabase
        .from("inquiries")
        .select("id, status, created_at", { count: "exact" }),
      supabase
        .from("contact_messages")
        .select("id, created_at", { count: "exact" }),
    ]);

  const publishedCourses =
    courses.data?.filter((c) => c.is_published).length || 0;
  const publishedGames = games.data?.filter((g) => g.is_published).length || 0;
  const activeJobs =
    jobPostings.data?.filter((j) => j.is_published).length || 0;
  const newInquiries =
    inquiries.data?.filter((i) => i.status === "new").length || 0;
  const inProgressInquiries =
    inquiries.data?.filter((i) => i.status === "in_progress").length || 0;

  return {
    courses: {
      total: courses.count || 0,
      published: publishedCourses,
      draft: (courses.count || 0) - publishedCourses,
    },
    games: {
      total: games.count || 0,
      published: publishedGames,
      draft: (games.count || 0) - publishedGames,
    },
    jobPostings: {
      total: jobPostings.count || 0,
      active: activeJobs,
      draft: (jobPostings.count || 0) - activeJobs,
    },
    inquiries: {
      total: inquiries.count || 0,
      new: newInquiries,
      inProgress: inProgressInquiries,
    },
    contactMessages: {
      total: contactMessages.count || 0,
    },
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const statCards = [
    {
      title: "Courses",
      href: "/admin/courses",
      icon: GraduationCap,
      value: stats.courses.total,
      subtitle: `${stats.courses.published} published`,
      badge: stats.courses.draft > 0 ? `${stats.courses.draft} draft` : null,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      title: "Games",
      href: "/admin/games",
      icon: Gamepad2,
      value: stats.games.total,
      subtitle: `${stats.games.published} published`,
      badge: stats.games.draft > 0 ? `${stats.games.draft} draft` : null,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-100",
    },
    {
      title: "Job Postings",
      href: "/admin/job-postings",
      icon: Briefcase,
      value: stats.jobPostings.total,
      subtitle: `${stats.jobPostings.active} active`,
      badge:
        stats.jobPostings.draft > 0 ? `${stats.jobPostings.draft} draft` : null,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
    },
    {
      title: "Inquiries",
      href: "/admin/inquiries",
      icon: MessageSquare,
      value: stats.inquiries.total,
      subtitle: `${stats.inquiries.new} new`,
      badge:
        stats.inquiries.inProgress > 0
          ? `${stats.inquiries.inProgress} in progress`
          : null,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    {
      title: "Messages",
      href: "/admin/contact-messages",
      icon: Mail,
      value: stats.contactMessages.total,
      subtitle: "Total received",
      badge: null,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome back!</h2>
          <p className="text-slate-500 mt-1">
            Here&apos;s what&apos;s happening with your content today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/" target="_blank">
              View Website
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((stat) => (
          <Link key={stat.href} href={stat.href} className="group">
            <Card
              className={`h-full border-2 ${stat.borderColor} hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    {stat.subtitle}
                  </span>
                  {stat.badge && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {stat.badge}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 border-slate-100">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/admin/courses/new"
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
            >
              <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">New Course</h3>
                <p className="text-sm text-slate-500">Create a course</p>
              </div>
            </Link>
            <Link
              href="/admin/games/new"
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-violet-200 hover:bg-violet-50/50 transition-all group"
            >
              <div className="p-3 rounded-xl bg-violet-50 group-hover:bg-violet-100 transition-colors">
                <Gamepad2 className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">New Game</h3>
                <p className="text-sm text-slate-500">Add a game</p>
              </div>
            </Link>
            <Link
              href="/admin/job-postings/new"
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group"
            >
              <div className="p-3 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                <Briefcase className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">Post Job</h3>
                <p className="text-sm text-slate-500">Create listing</p>
              </div>
            </Link>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all group"
            >
              <div className="p-3 rounded-xl bg-amber-50 group-hover:bg-amber-100 transition-colors">
                <MessageSquare className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-900">Inquiries</h3>
                <p className="text-sm text-slate-500">
                  {stats.inquiries.new > 0 ? (
                    <span className="text-amber-600 font-medium">
                      {stats.inquiries.new} new
                    </span>
                  ) : (
                    "View all"
                  )}
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>

        {/* Status Summary */}
        <Card className="border-2 border-slate-100">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-primary" />
              Content Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">
                    Courses
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-600">
                    {stats.courses.published} live
                  </span>
                  {stats.courses.draft > 0 && (
                    <span className="text-slate-400">
                      {stats.courses.draft} draft
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <Gamepad2 className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-medium text-slate-700">
                    Games
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-600">
                    {stats.games.published} live
                  </span>
                  {stats.games.draft > 0 && (
                    <span className="text-slate-400">
                      {stats.games.draft} draft
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-slate-700">
                    Jobs
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-600">
                    {stats.jobPostings.active} active
                  </span>
                  {stats.jobPostings.draft > 0 && (
                    <span className="text-slate-400">
                      {stats.jobPostings.draft} draft
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-slate-700">
                    Inquiries
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {stats.inquiries.new > 0 ? (
                    <span className="text-amber-600 font-medium">
                      {stats.inquiries.new} new
                    </span>
                  ) : (
                    <span className="text-green-600">All handled</span>
                  )}
                  {stats.inquiries.inProgress > 0 && (
                    <span className="text-blue-600">
                      {stats.inquiries.inProgress} in progress
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
