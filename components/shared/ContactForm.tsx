"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, User, Phone, MessageSquare } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // TODO: Implement Supabase submission
      // await createClient().from('inquiries').insert({
      //   name: formData.name,
      //   email: formData.email,
      //   phone: formData.phone,
      //   message: formData.message,
      //   inquiry_type: 'general'
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/10">
      <CardContent className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
          <p className="text-muted-foreground">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium mb-2 flex items-center gap-2"
            >
              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Name *
            </label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Your name"
              className="h-11"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium mb-2 flex items-center gap-2"
            >
              <Mail className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              Email *
            </label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="your.email@example.com"
              className="h-11"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="text-sm font-medium mb-2 flex items-center gap-2"
            >
              <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Phone (Optional)
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+977 98XXXXXXXX"
              className="h-11"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="text-sm font-medium mb-2 flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              Message *
            </label>
            <Textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="How can we help you?"
              rows={6}
              className="resize-none"
            />
          </div>

          {submitStatus === "success" && (
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-green-600 dark:text-green-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
                <p className="text-green-600 dark:text-green-400 font-medium">
                  Message sent successfully! We'll get back to you soon.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-600 dark:text-red-400 font-medium">
                Something went wrong. Please try again.
              </p>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
