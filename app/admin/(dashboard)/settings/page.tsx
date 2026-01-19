import { getAdminSiteSettings } from "@/lib/admin/actions/settings";
import { SettingsForm } from "@/components/admin/forms/SettingsForm";

export default async function SettingsPage() {
  const settings = await getAdminSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="text-slate-600 mt-1">
          Manage your website&apos;s contact information and social media links.
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
