import { Metadata } from "next";
import { AccountDeletionContent } from "@/components/legal/AccountDeletionContent";

export const metadata: Metadata = {
  title: "Account Deletion | Callbreak Friends | Pasakasa Creations",
  description:
    "Guide to permanently delete your Callbreak Friends account and all associated data. Learn how to remove your account from the app or request deletion via email.",
};

export default function CallbreakFriendsAccountDeletionPage() {
  return (
    <AccountDeletionContent
      gameName="Callbreak Friends"
      gameSlug="callbreak-friends"
    />
  );
}
