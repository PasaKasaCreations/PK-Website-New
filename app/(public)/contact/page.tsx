import { Metadata } from "next";
import { ContactHero, ContactContent } from "@/components/contact";
import { getSiteSettings } from "@/lib/api/settings";

export const metadata: Metadata = {
  title: "Contact Us | Pasakasa Creations - Game Development Studio in Nepal",
  description:
    "Reach out to Pasakasa Creations in Kshitij Marg, Kathmandu, Nepal. Questions about game development courses, our mobile games, or partnership opportunities? We respond within 24 hours.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ContactHero />

      {/* Content Section */}
      <ContactContent settings={settings} />
    </div>
  );
}
