"use client";

import { useState } from "react";
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
import { Phone, Mail, User, Sparkles, MessageSquare } from "lucide-react";

interface ConsultationModalProps {
  trigger?: React.ReactNode;
  courseName?: string;
  courseId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ConsultationModal({
  trigger,
  courseName,
  courseId,
  open,
  onOpenChange,
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Generate default message if not provided
      const message =
        formData.message.trim() ||
        `I am interested in ${courseName || "your courses"} and would like to request a free consultation.`;

      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message,
          inquiry_type: "course",
          course_id: courseId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Parse validation errors for user-friendly messages
        if (data.details && Array.isArray(data.details)) {
          const errorMessages = data.details
            .map((issue: { path: string[]; message: string }) => {
              const field = issue.path[0];
              const fieldName =
                field === "phone"
                  ? "Phone number"
                  : field === "name"
                    ? "Name"
                    : field === "email"
                      ? "Email"
                      : field === "message"
                        ? "Message"
                        : field;
              return `${fieldName}: ${issue.message}`;
            })
            .join("\n");
          throw new Error(errorMessages);
        }
        throw new Error(data.error || "Failed to submit request");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-2xl">Get Free Consultation</DialogTitle>
          <DialogDescription className="text-base">
            {courseName
              ? `Interested in ${courseName}? Fill in your details and our team will guide you through the course details, pricing, and enrollment process.`
              : "Fill in your details and our team will contact you to guide you through the course details, pricing, and enrollment process."}
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
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
                <Mail className="h-4 w-4 text-primary" />
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
                <Phone className="h-4 w-4 text-primary" />
                Contact Number
              </label>
              <Input
                required
                type="tel"
                placeholder="+977 98XXXXXXXX"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="h-11"
                minLength={10}
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Additional Notes
                <span className="text-xs text-muted-foreground">
                  (Optional)
                </span>
              </label>
              <Textarea
                placeholder="Any specific questions or requirements?"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="min-h-[80px] resize-none"
                maxLength={1000}
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                Our team will reach out within 24 hours to provide you with
                complete course information and answer all your questions.
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Free Consultation"}
            </Button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Request Submitted!</h3>
              <p className="text-muted-foreground">
                Thank you! Our team will contact you soon.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
