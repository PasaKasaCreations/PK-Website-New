"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Loader2,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Check,
  MapPinned,
  MessageCircle,
} from "lucide-react";
import { FieldError } from "../ui/FieldError";
import { updateSiteSettings } from "@/lib/admin/actions/settings";
import {
  settingsFormSchema,
  type SettingsFormData,
} from "@/lib/admin/schemas/settings.schema";
import {
  validateFormData,
  parseServerError,
  type FieldErrors,
} from "@/lib/utils/form-validation";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/settings.interface";

interface SettingsFormProps {
  settings: SiteSettings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState(false);

  // Form state
  const [email, setEmail] = useState(settings.email);
  const [contactNumber, setContactNumber] = useState(settings.contact_number);
  const [location, setLocation] = useState(settings.location);
  const [locationMapUrl, setLocationMapUrl] = useState(
    settings.location_map_url || ""
  );
  const [whatsappNumber, setWhatsappNumber] = useState(
    settings.whatsapp_number || ""
  );
  const [linkedinUrl, setLinkedinUrl] = useState(settings.linkedin_url || "");
  const [instagramUrl, setInstagramUrl] = useState(
    settings.instagram_url || ""
  );
  const [facebookUrl, setFacebookUrl] = useState(settings.facebook_url || "");
  const [youtubeUrl, setYoutubeUrl] = useState(settings.youtube_url || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSuccess(false);

    const formData: SettingsFormData = {
      email,
      contact_number: contactNumber,
      location,
      location_map_url: locationMapUrl || null,
      whatsapp_number: whatsappNumber || null,
      linkedin_url: linkedinUrl || null,
      instagram_url: instagramUrl || null,
      facebook_url: facebookUrl || null,
      youtube_url: youtubeUrl || null,
    };

    // Client-side validation
    const validation = validateFormData(settingsFormSchema, formData);
    if (!validation.success && validation.errors) {
      setFieldErrors(validation.errors);
      setError("Please fix the validation errors below.");
      return;
    }

    startTransition(async () => {
      try {
        await updateSiteSettings(formData);
        setSuccess(true);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        const { message, fieldErrors: serverFieldErrors } = parseServerError(err);
        if (serverFieldErrors) {
          setFieldErrors(serverFieldErrors);
          setError("Please fix the validation errors below.");
        } else if (message) {
          setError(message);
        } else {
          setError("Failed to update settings");
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

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 flex items-center gap-2">
          <Check className="w-4 h-4" />
          Settings updated successfully! Changes will appear on the website
          shortly.
        </div>
      )}

      {/* Contact Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            These details appear in the website footer and contact page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@example.com"
              className={cn(fieldErrors.email && "border-red-500")}
            />
            <FieldError error={fieldErrors.email} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_number" className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              Contact Number *
            </Label>
            <Input
              id="contact_number"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="+977-XXX-XXXXXXX"
              className={cn(fieldErrors.contact_number && "border-red-500")}
            />
            <FieldError error={fieldErrors.contact_number} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              Location *
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              className={cn(fieldErrors.location && "border-red-500")}
            />
            <FieldError error={fieldErrors.location} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location_map_url" className="flex items-center gap-2">
              <MapPinned className="w-4 h-4 text-slate-400" />
              Google Maps URL (optional)
            </Label>
            <Input
              id="location_map_url"
              type="url"
              value={locationMapUrl}
              onChange={(e) => setLocationMapUrl(e.target.value)}
              placeholder="https://maps.google.com/..."
            />
            <p className="text-xs text-slate-500">
              Link to your location on Google Maps for the contact page
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp_number" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-500" />
              WhatsApp Number (optional)
            </Label>
            <Input
              id="whatsapp_number"
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="+977-XXX-XXXXXXX"
            />
            <p className="text-xs text-slate-500">
              Used for &quot;Enroll Now&quot; button on course pages. Include country code (e.g., +977).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Card */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>
            Your social media profiles shown in the footer. Leave empty to hide.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin_url" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-blue-600" />
              LinkedIn
            </Label>
            <Input
              id="linkedin_url"
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/company/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram_url" className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-pink-600" />
              Instagram
            </Label>
            <Input
              id="instagram_url"
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook_url" className="flex items-center gap-2">
              <Facebook className="w-4 h-4 text-blue-700" />
              Facebook
            </Label>
            <Input
              id="facebook_url"
              type="url"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube_url" className="flex items-center gap-2">
              <Youtube className="w-4 h-4 text-red-600" />
              YouTube
            </Label>
            <Input
              id="youtube_url"
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/@..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Settings"
          )}
        </Button>
      </div>
    </form>
  );
}
