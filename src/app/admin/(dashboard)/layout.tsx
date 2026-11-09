import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Settings,
  Package,
  Layers,
  LayoutGrid,
  LogOut,
  ExternalLink,
  FileSpreadsheet,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    default: "Admin Console | Alfa Industrial Products",
    template: "%s | AIP Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen w-full bg-brand-surface flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-68 shrink-0 bg-brand-navy text-white flex flex-col lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-brand-line-dark">
        <div className="p-6 border-b border-brand-line-dark flex items-center justify-between lg:block">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white p-1 flex items-center justify-center shrink-0">
              <img
                src="/logo.jpeg"
                alt="AIP"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-display font-bold text-base tracking-tight text-white leading-none">
                AIP CONSOLE
              </div>
              <div className="font-mono text-[11px] text-brand-sun mt-1 truncate max-w-[150px]">
                {session.user?.name || session.user?.email}
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 flex lg:flex-col gap-1.5 overflow-x-auto">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-sm font-display font-medium text-blue-100 hover:bg-brand-navy-light hover:text-white transition-colors shrink-0"
          >
            <LayoutGrid size={18} className="text-brand-sun" />
            <span>Overview</span>
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-3 text-sm font-display font-medium text-blue-100 hover:bg-brand-navy-light hover:text-white transition-colors shrink-0"
          >
            <Package size={18} className="text-brand-sun" />
            <span>Products</span>
          </Link>
          <Link
            href="/admin/products/bulk"
            className="flex items-center gap-3 px-4 py-3 text-sm font-display font-medium text-blue-100 hover:bg-brand-navy-light hover:text-white transition-colors shrink-0"
          >
            <FileSpreadsheet size={18} className="text-brand-sun" />
            <span>Bulk Import</span>
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 text-sm font-display font-medium text-blue-100 hover:bg-brand-navy-light hover:text-white transition-colors shrink-0"
          >
            <Layers size={18} className="text-brand-sun" />
            <span>Categories</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 text-sm font-display font-medium text-blue-100 hover:bg-brand-navy-light hover:text-white transition-colors shrink-0"
          >
            <Settings size={18} className="text-brand-sun" />
            <span>Contact &amp; Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-brand-line-dark flex lg:flex-col gap-1.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-mono text-blue-200/80 hover:text-white hover:bg-brand-navy-mid transition-colors"
          >
            <ExternalLink size={15} className="text-brand-sun" />
            <span>Open Public Site</span>
          </Link>
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-mono text-amber-300 hover:bg-brand-navy-mid transition-colors"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace (Full Remaining Width) */}
      <main className="flex-1 w-full min-w-0">{children}</main>
    </div>
  );
}
