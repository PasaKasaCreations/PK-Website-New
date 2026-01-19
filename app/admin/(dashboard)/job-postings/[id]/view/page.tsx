import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobPosting } from "@/lib/admin/actions/job-postings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DetailView,
  DetailSection,
  DetailField,
  DetailGrid,
  DetailList,
  DetailDate,
} from "@/components/admin/ui/DetailView";
import { Mail, Phone, Building2 } from "lucide-react";

interface ViewJobPostingPageProps {
  params: Promise<{ id: string }>;
}

const employmentTypeLabels: Record<string, string> = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  internship: "Internship",
};

const employmentTypeColors: Record<string, string> = {
  full_time: "bg-green-100 text-green-800",
  part_time: "bg-blue-100 text-blue-800",
  contract: "bg-purple-100 text-purple-800",
  internship: "bg-orange-100 text-orange-800",
};

export default async function ViewJobPostingPage({ params }: ViewJobPostingPageProps) {
  const { id } = await params;

  let job;
  try {
    job = await getJobPosting(id);
  } catch {
    notFound();
  }

  const company = job.company as { name?: string; logo?: string; description?: string } | null;
  const contact = job.contact as { email?: string; phone?: string } | null;
  const similarJobs = job.similar_jobs as Array<{ title: string; slug: string }> | null;

  return (
    <DetailView
      title={job.title}
      subtitle={`/${job.slug}`}
      backHref="/admin/job-postings"
      editHref={`/admin/job-postings/${job.id}`}
      publicHref={job.is_published ? `/careers/${job.slug}` : undefined}
      status={{
        label: job.is_published ? "Published" : "Draft",
        variant: job.is_published ? "default" : "secondary",
      }}
      badges={[
        {
          label: employmentTypeLabels[job.employment_type] || job.employment_type,
          className: employmentTypeColors[job.employment_type] || "",
        },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <DetailSection title="Basic Information">
            <DetailGrid columns={2}>
              <DetailField label="Title" value={job.title} />
              <DetailField label="Slug" value={job.slug} />
              <DetailField label="Department" value={job.department} />
              <DetailField label="Location" value={job.location} />
              <DetailField label="Employment Type">
                <Badge className={employmentTypeColors[job.employment_type]}>
                  {employmentTypeLabels[job.employment_type] || job.employment_type}
                </Badge>
              </DetailField>
              <DetailField label="Salary" value={job.salary || "Not disclosed"} />
            </DetailGrid>
          </DetailSection>

          {/* Description */}
          <DetailSection title="Job Description">
            {job.description ? (
              <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-wrap">
                {job.description}
              </div>
            ) : (
              <span className="text-slate-400 italic">No description</span>
            )}
          </DetailSection>

          {/* Requirements */}
          <DetailSection title="Requirements">
            <DetailList items={job.requirements} emptyMessage="No requirements specified" />
          </DetailSection>

          {/* Responsibilities */}
          <DetailSection title="Responsibilities">
            <DetailList items={job.responsibilities} emptyMessage="No responsibilities specified" />
          </DetailSection>

          {/* Benefits */}
          <DetailSection title="Benefits">
            <DetailList items={job.benefits} emptyMessage="No benefits listed" />
          </DetailSection>

          {/* Nice to Have */}
          <DetailSection title="Nice to Have">
            <DetailList items={job.nice_to_have} emptyMessage="None specified" />
          </DetailSection>

          {/* Similar Jobs */}
          {similarJobs && similarJobs.length > 0 && (
            <DetailSection title="Similar Jobs">
              <div className="flex flex-wrap gap-2">
                {similarJobs.map((similarJob, i) => (
                  <Badge key={i} variant="outline">
                    {similarJob.title}
                  </Badge>
                ))}
              </div>
            </DetailSection>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <DetailSection title="Company">
            {company ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {company.logo ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={company.logo}
                        alt={company.name || "Company"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-slate-900">{company.name || "Company Name"}</p>
                  </div>
                </div>
                {company.description && (
                  <p className="text-sm text-slate-600">{company.description}</p>
                )}
              </div>
            ) : (
              <span className="text-slate-400 italic">No company info</span>
            )}
          </DetailSection>

          {/* Contact Info */}
          <DetailSection title="Contact Information">
            {contact ? (
              <div className="space-y-3">
                {contact.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-primary hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-slate-700 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
                {!contact.email && !contact.phone && (
                  <span className="text-slate-400 italic">No contact info</span>
                )}
              </div>
            ) : (
              <span className="text-slate-400 italic">No contact info</span>
            )}
          </DetailSection>

          {/* Dates */}
          <DetailSection title="Important Dates">
            <div className="space-y-4">
              <DetailField label="Posted Date">
                <DetailDate date={job.posted_date} />
              </DetailField>
              <DetailField label="Application Deadline">
                <DetailDate date={job.application_deadline} />
              </DetailField>
            </div>
          </DetailSection>

          {/* Visa Requirements */}
          {job.visa_requirements && (
            <DetailSection title="Visa Requirements">
              <p className="text-sm text-slate-700">{job.visa_requirements}</p>
            </DetailSection>
          )}

          {/* Metadata */}
          <DetailSection title="Metadata">
            <div className="space-y-4 text-sm">
              <DetailField label="Created">
                <DetailDate date={job.created_at} showTime />
              </DetailField>
              <DetailField label="Last Updated">
                <DetailDate date={job.updated_at} showTime />
              </DetailField>
            </div>
          </DetailSection>
        </div>
      </div>
    </DetailView>
  );
}
