"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  Mail,
  Briefcase,
  FileText,
  Upload,
  X,
  CheckCircle2,
} from "lucide-react";

interface ResumeSubmissionModalProps {
  trigger: React.ReactNode;
}

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function ResumeSubmissionModal({ trigger }: ResumeSubmissionModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role_looking_for: "",
    cover_letter: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setError(null);

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!file) {
      setError("Please upload your resume.");
      setIsSubmitting(false);
      return;
    }

    try {
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name);
      submitFormData.append("email", formData.email);
      submitFormData.append("role_looking_for", formData.role_looking_for);
      if (formData.cover_letter) {
        submitFormData.append("cover_letter", formData.cover_letter);
      }
      submitFormData.append("file", file);

      const response = await fetch("/api/resume", {
        method: "POST",
        body: submitFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        // Parse validation errors for user-friendly messages
        if (data.details && Array.isArray(data.details)) {
          const errorMessages = data.details
            .map((issue: { path: string[]; message: string }) => {
              const field = issue.path[0];
              const fieldName =
                field === "name"
                  ? "Name"
                  : field === "email"
                    ? "Email"
                    : field === "role_looking_for"
                      ? "Role"
                      : field === "cover_letter"
                        ? "Cover letter"
                        : field;
              return `${fieldName}: ${issue.message}`;
            })
            .join("\n");
          throw new Error(errorMessages);
        }
        throw new Error(data.error || "Failed to submit resume");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          role_looking_for: "",
          cover_letter: "",
        });
        setFile(null);
        setOpen(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <Briefcase className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          <DialogTitle className="text-2xl">Send Your Resume</DialogTitle>
          <DialogDescription className="text-base">
            We&apos;re always looking for talented people. Submit your resume
            and we&apos;ll reach out when a suitable opportunity arises.
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400 whitespace-pre-line">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-orange-500" />
                Full Name
              </label>
              <Input
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-11"
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-500" />
                Email Address
              </label>
              <Input
                required
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="h-11"
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-orange-500" />
                Role You&apos;re Looking For
              </label>
              <Input
                required
                placeholder="e.g., Game Developer, UI/UX Designer"
                value={formData.role_looking_for}
                onChange={(e) =>
                  setFormData({ ...formData, role_looking_for: e.target.value })
                }
                className="h-11"
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-500" />
                Cover Letter
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
              </label>
              <Textarea
                placeholder="Tell us about yourself, your experience, and why you'd like to join Pasakasa Creations..."
                value={formData.cover_letter}
                onChange={(e) =>
                  setFormData({ ...formData, cover_letter: e.target.value })
                }
                className="min-h-[100px] resize-none"
                maxLength={2000}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Upload className="h-4 w-4 text-orange-500" />
                Resume
                <span className="text-xs text-red-500">*</span>
              </label>

              {!file ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
                    ${
                      isDragging
                        ? "border-orange-400 bg-orange-50 dark:bg-orange-950/20"
                        : "border-slate-300 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                    }
                  `}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                    <span className="font-medium text-orange-500">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    PDF, DOC, or DOCX (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded">
                    <FileText className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4 text-slate-500" />
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mt-6">
              <p className="text-sm text-orange-900 dark:text-orange-100">
                We review all submissions and will reach out if there&apos;s an
                opportunity that matches your profile. Even if we don&apos;t
                have an immediate opening, we&apos;ll keep your resume on file.
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Resume"}
            </Button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Resume Submitted!</h3>
              <p className="text-muted-foreground">
                Thank you for your interest! We&apos;ll review your resume and
                get back to you if there&apos;s a match.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
