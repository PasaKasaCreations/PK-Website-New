import { Metadata } from "next";
import { AccountDeletionContent } from "@/components/legal/AccountDeletionContent";

export const metadata: Metadata = {
  title: "Account Deletion | Teen Patti Friends | Pasakasa Creations",
  description:
    "Guide to permanently delete your Teen Patti Friends account and all associated data. Learn how to remove your account from the app or request deletion via email.",
};

export default function TeenPattiFriendsAccountDeletionPage() {
  return (
    <AccountDeletionContent
      gameName="Teen Patti Friends"
      gameSlug="teen-patti-friends"
    />
  );
}
