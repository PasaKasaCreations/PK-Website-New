import { Metadata } from "next";
import { PrivacyPolicyContent } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Teen Patti Friends - Pasakasa Creations",
  description:
    "Privacy Policy for Teen Patti Friends game by Pasakasa Creations. Learn how we collect, use, and protect your personal information.",
};

export default function TeenPattiFriendsPrivacyPolicyPage() {
  return <PrivacyPolicyContent gameName="Teen Patti Friends" isGameSpecific />;
}
