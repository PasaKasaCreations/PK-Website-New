import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { getSiteSettings } from "@/lib/api/settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch settings at build time (or during ISR revalidation)
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
