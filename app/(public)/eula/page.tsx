import { Metadata } from "next";
import { EULAContent } from "@/components/legal";

export const metadata: Metadata = {
  title: "End User License Agreement | Pasakasa Creations",
  description:
    "End User License Agreement (EULA) for Pasakasa Creations. Read our license terms for using our games, software, and other products.",
};

export default function EULAPage() {
  return <EULAContent />;
}
