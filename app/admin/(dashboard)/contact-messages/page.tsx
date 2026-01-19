import { getContactMessages } from "@/lib/admin/actions/contact-messages";
import { ContactMessagesTable } from "./ContactMessagesTable";

export default async function ContactMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Contact Messages</h2>
        <p className="text-slate-600">
          View messages from the contact form
        </p>
      </div>

      <ContactMessagesTable messages={messages} />
    </div>
  );
}
