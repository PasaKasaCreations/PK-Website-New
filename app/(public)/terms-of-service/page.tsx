import { Metadata } from "next";
import { TermsOfServiceContent } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions | Pasakasa Creations",
  description:
    "Terms and Conditions for Pasakasa Creations. Read our terms of service for using our games, websites, and other services.",
};

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
