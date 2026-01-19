import { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Pasakasa Creations",
  description:
    "Privacy Policy for Pasakasa Creations. Learn how we collect, use, and protect your personal information across our games and services.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
