import { Metadata } from "next";
import { ContactHero, ContactContent } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us | Pasakasa Creations - Game Development Studio in Nepal",
  description:
    "Reach out to Pasakasa Creations in Kathmandu, Nepal. Questions about game development courses, our mobile games, or partnership opportunities? We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContactHero />

      {/* Content Section */}
      <ContactContent />
    </div>
  );
}
