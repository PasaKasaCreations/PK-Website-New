import { notFound } from "next/navigation";
import Link from "next/link";
import { getInquiry } from "@/lib/admin/actions/inquiries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { InquiryStatusSelect } from "./InquiryStatusSelect";
import type { Enums } from "@/types/database.types";

interface InquiryDetailPageProps {
  params: Promise<{ id: string }>;
}

const typeLabels: Record<Enums<"inquiry_type">, string> = {
  general: "General",
  course: "Course",
  career: "Career",
  partnership: "Partnership",
};

export default async function InquiryDetailPage({
  params,
}: InquiryDetailPageProps) {
  const { id } = await params;

  let inquiry;
  try {
    inquiry = await getInquiry(id);
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/inquiries">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Inquiry Details</h2>
          <p className="text-slate-600">
            From {inquiry.name} • {typeLabels[inquiry.inquiry_type]} inquiry
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 whitespace-pre-wrap">
                {inquiry.message}
              </p>
            </CardContent>
          </Card>

          {inquiry.courses && (
            <Card>
              <CardHeader>
                <CardTitle>Related Course</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">{inquiry.courses.title}</p>
              </CardContent>
            </Card>
          )}
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
                  href={`mailto:${inquiry.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {inquiry.email}
                </a>
              </div>
              {inquiry.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {inquiry.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">
                  {new Date(inquiry.created_at).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Type:</span>
                <Badge variant="outline">
                  {typeLabels[inquiry.inquiry_type]}
                </Badge>
              </div>
              <div className="space-y-2">
                <span className="text-sm text-slate-600">Status:</span>
                <InquiryStatusSelect
                  id={inquiry.id}
                  currentStatus={inquiry.status}
                />
              </div>
            </CardContent>
          </Card>

          {(inquiry.ip_address || inquiry.user_agent) && (
            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                {inquiry.ip_address && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{inquiry.ip_address}</span>
                  </div>
                )}
                {inquiry.user_agent && (
                  <p className="text-xs break-all">{inquiry.user_agent}</p>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <a href={`mailto:${inquiry.email}`}>Reply via Email</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
