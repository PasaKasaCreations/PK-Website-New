"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DynamicListInput } from "../ui/DynamicListInput";
import { FieldError } from "../ui/FieldError";
import { Loader2 } from "lucide-react";
import {
  createJobPosting,
  updateJobPosting,
  checkJobPostingSlugExists,
} from "@/lib/admin/actions/job-postings";
import {
  jobPostingFormSchema,
  type JobPostingFormData,
  type Company,
  type Contact,
} from "@/lib/admin/schemas/job-posting.schema";
import {
  validateFormData,
  parseServerError,
  type FieldErrors,
} from "@/lib/utils/form-validation";
import { cn } from "@/lib/utils";
import type { Tables } from "@/types/database.types";

interface JobPostingFormProps {
  jobPosting?: Tables<"job_postings">;
}

export function JobPostingForm({ jobPosting }: JobPostingFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // Form state
  const [title, setTitle] = useState(jobPosting?.title || "");
  const [slug, setSlug] = useState(jobPosting?.slug || "");
  const [description, setDescription] = useState(jobPosting?.description || "");
  const [department, setDepartment] = useState(jobPosting?.department || "");
  const [location, setLocation] = useState(jobPosting?.location || "");
  const [employmentType, setEmploymentType] = useState<
    "full_time" | "part_time" | "contract" | "internship"
  >(jobPosting?.employment_type || "full_time");
  const [salary, setSalary] = useState(jobPosting?.salary || "");
  const [postedDate, setPostedDate] = useState(jobPosting?.posted_date || "");
  const [applicationDeadline, setApplicationDeadline] = useState(
    jobPosting?.application_deadline || ""
  );
  const [visaRequirements, setVisaRequirements] = useState(
    jobPosting?.visa_requirements || ""
  );
  const [requirements, setRequirements] = useState<string[]>(
    jobPosting?.requirements || []
  );
  const [responsibilities, setResponsibilities] = useState<string[]>(
    jobPosting?.responsibilities || []
  );
  const [benefits, setBenefits] = useState<string[]>(
    jobPosting?.benefits || []
  );
  const [niceToHave, setNiceToHave] = useState<string[]>(
    jobPosting?.nice_to_have || []
  );
  const [company, setCompany] = useState<Company>(
    (jobPosting?.company as Company) || { name: "", logo: "", description: "" }
  );
  const [contact, setContact] = useState<Contact>(
    (jobPosting?.contact as Contact) || { email: "", phone: "" }
  );
  const [isPublished, setIsPublished] = useState(
    jobPosting?.is_published || false
  );

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!jobPosting) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData: JobPostingFormData = {
      title,
      slug,
      description,
      department,
      location,
      employment_type: employmentType,
      salary: salary || null,
      posted_date: postedDate || null,
      application_deadline: applicationDeadline || null,
      visa_requirements: visaRequirements || null,
      requirements,
      responsibilities,
      benefits,
      nice_to_have: niceToHave,
      company,
      contact,
      similar_jobs: [],
      is_published: isPublished,
    };

    // Client-side validation
    const validation = validateFormData(jobPostingFormSchema, formData);
    if (!validation.success && validation.errors) {
      setFieldErrors(validation.errors);
      setError("Please fix the validation errors below.");
      return;
    }

    // Check slug uniqueness
    try {
      const slugExists = await checkJobPostingSlugExists(slug, jobPosting?.id);
      if (slugExists) {
        setFieldErrors({ slug: "A job posting with this slug already exists" });
        setError("A job posting with this slug already exists. Please use a different title.");
        return;
      }
    } catch {
      setError("Failed to validate slug. Please try again.");
      return;
    }

    startTransition(async () => {
      try {
        if (jobPosting) {
          await updateJobPosting(jobPosting.id, formData);
        } else {
          await createJobPosting(formData);
        }
      } catch (err) {
        const { message, fieldErrors: serverFieldErrors } = parseServerError(err);
        if (serverFieldErrors) {
          setFieldErrors(serverFieldErrors);
          setError("Please fix the validation errors below.");
        } else if (message) {
          setError(message);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g., Senior Game Developer"
                    className={cn(fieldErrors.title && "border-red-500")}
                  />
                  <FieldError error={fieldErrors.title} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={slug}
                    disabled
                    className={cn("bg-slate-100 cursor-not-allowed", fieldErrors.slug && "border-red-500")}
                  />
                  <FieldError error={fieldErrors.slug} />
                  <p className="text-xs text-slate-500">
                    Auto-generated from title
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className={cn(fieldErrors.description && "border-red-500")}
                />
                <FieldError error={fieldErrors.description} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g., Engineering"
                    className={cn(fieldErrors.department && "border-red-500")}
                  />
                  <FieldError error={fieldErrors.department} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Remote / Kathmandu"
                    className={cn(fieldErrors.location && "border-red-500")}
                  />
                  <FieldError error={fieldErrors.location} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="employment_type">Employment Type *</Label>
                  <Select
                    value={employmentType}
                    onValueChange={(v) => setEmploymentType(v as typeof employmentType)}
                  >
                    <SelectTrigger className={cn(fieldErrors.employment_type && "border-red-500")}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="part_time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError error={fieldErrors.employment_type} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g., NPR 50,000 - 80,000/month"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="posted_date">Posted Date</Label>
                  <Input
                    id="posted_date"
                    type="date"
                    value={postedDate}
                    onChange={(e) => setPostedDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="application_deadline">Application Deadline</Label>
                  <Input
                    id="application_deadline"
                    type="date"
                    value={applicationDeadline}
                    onChange={(e) => setApplicationDeadline(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visa_requirements">Visa Requirements</Label>
                  <Input
                    id="visa_requirements"
                    value={visaRequirements}
                    onChange={(e) => setVisaRequirements(e.target.value)}
                    placeholder="e.g., Work permit required"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Requirements & Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <DynamicListInput
                label="Requirements"
                value={requirements}
                onChange={setRequirements}
                placeholder="Add a requirement..."
              />

              <DynamicListInput
                label="Responsibilities"
                value={responsibilities}
                onChange={setResponsibilities}
                placeholder="Add a responsibility..."
              />

              <DynamicListInput
                label="Benefits"
                value={benefits}
                onChange={setBenefits}
                placeholder="Add a benefit..."
              />

              <DynamicListInput
                label="Nice to Have"
                value={niceToHave}
                onChange={setNiceToHave}
                placeholder="Add a nice-to-have skill..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={company.name || ""}
                    onChange={(e) =>
                      setCompany({ ...company, name: e.target.value })
                    }
                    placeholder="Pasakasa Creations"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company_logo">Company Logo URL</Label>
                  <Input
                    id="company_logo"
                    value={company.logo || ""}
                    onChange={(e) =>
                      setCompany({ ...company, logo: e.target.value })
                    }
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_description">Company Description</Label>
                <Textarea
                  id="company_description"
                  value={company.description || ""}
                  onChange={(e) =>
                    setCompany({ ...company, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Brief description about the company..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={contact.email || ""}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    placeholder="hr@pasakasa.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    value={contact.phone || ""}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    placeholder="+977-1-1234567"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Published</Label>
                  <p className="text-sm text-slate-500">
                    Make this job posting visible on the careers page
                  </p>
                </div>
                <Switch checked={isPublished} onCheckedChange={setIsPublished} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/job-postings")}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : jobPosting ? (
            "Update Job Posting"
          ) : (
            "Create Job Posting"
          )}
        </Button>
      </div>
    </form>
  );
}
