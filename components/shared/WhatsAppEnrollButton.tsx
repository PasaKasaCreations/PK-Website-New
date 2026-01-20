"use client";

import { Button } from "@/components/ui/button";

interface WhatsAppEnrollButtonProps {
  whatsappNumber: string | null;
  courseName: string;
  className?: string;
}

/**
 * WhatsApp Enroll Button
 * Opens WhatsApp with a pre-filled enrollment inquiry message
 */
export function WhatsAppEnrollButton({
  whatsappNumber,
  courseName,
  className,
}: WhatsAppEnrollButtonProps) {
  const handleEnrollClick = () => {
    if (!whatsappNumber) {
      return;
    }

    // Clean the phone number (remove spaces, dashes, etc. but keep + for country code)
    const cleanNumber = whatsappNumber.replace(/[\s\-()]/g, "");

    // Create the pre-filled message
    const message = encodeURIComponent(
      `Hi! I'm interested in enrolling for the "${courseName}" course. Could you please provide more details about the enrollment process, upcoming batches, and fees?`
    );

    // Open WhatsApp with the pre-filled message
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  // If no WhatsApp number is configured, don't render the button
  if (!whatsappNumber) {
    return null;
  }

  return (
    <Button
      size="lg"
      className={
        className ||
        "bg-white text-blue-900 hover:bg-blue-50 h-12 px-8 font-semibold shadow-lg hover:shadow-xl transition-all"
      }
      onClick={handleEnrollClick}
    >
      ENROLL NOW
    </Button>
  );
}
