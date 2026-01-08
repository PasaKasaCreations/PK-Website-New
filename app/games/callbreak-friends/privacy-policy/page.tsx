import { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Callbreak Friends - Pasakasa Creations",
  description:
    "Privacy Policy for Callbreak Friends game by Pasakasa Creations. Learn how we collect, use, and protect your personal information.",
};

export default function CallbreakFriendsPrivacyPolicyPage() {
  return <PrivacyPolicyContent gameName="Callbreak Friends" isGameSpecific />;
}
