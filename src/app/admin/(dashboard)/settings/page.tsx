import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import SettingsForm from "./SettingsForm";

export const metadata: Metadata = {
  title: "Contact & Site Settings",
};

export default async function SettingsPage() {
  const settingsRecords = await prisma.setting.findMany();
  const settings = settingsRecords.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="w-full">
      <div className="w-full bg-white border-b border-brand-line px-6 sm:px-10 py-8">
        <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-1">
          Global Configuration
        </div>
        <h1 className="text-3xl font-display font-bold text-brand-navy">
          Contact &amp; Site Settings
        </h1>
        <p className="text-sm text-brand-muted mt-1.5">
          Changes saved here update the header, footer, product quote links, and
          contact page automatically.
        </p>
      </div>

      <div className="w-full p-6 sm:p-10">
        <div className="w-full bg-white border border-brand-line p-6 sm:p-8">
          <SettingsForm settings={settings} />
        </div>
      </div>
    </div>
  );
}
