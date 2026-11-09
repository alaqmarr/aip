import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { getSiteSettings } from "@/lib/data";

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
      <WhatsAppFloat phoneNumber={settings.whatsapp} />
    </div>
  );
}
