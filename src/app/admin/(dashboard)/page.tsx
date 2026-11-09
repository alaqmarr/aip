import type { Metadata } from "next";
import Link from "next/link";
import {
  Plus,
  Layers,
  Package,
  Settings,
  Users,
  ArrowUpRight,
  FileSpreadsheet,
} from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Dashboard Overview",
};

export default async function AdminDashboardPage() {
  const [categoriesCount, productsCount, usersCount] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
    prisma.user.count(),
  ]);

  return (
    <div className="w-full">
      {/* Header Bar */}
      <div className="w-full bg-white border-b border-brand-line px-6 sm:px-10 py-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-1">
            Inventory Console
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-navy">
            Catalog Overview
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/bulk"
            className="rounded-lg border border-brand-navy text-brand-navy hover:bg-brand-surface font-display text-xs font-bold uppercase tracking-wider px-5 py-3 inline-flex items-center gap-2 transition-colors"
          >
            <FileSpreadsheet size={15} />
            <span>Bulk Add Products</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="rounded-lg bg-brand-sun hover:bg-brand-sun-light text-brand-navy font-display text-xs font-bold uppercase tracking-wider px-5 py-3 inline-flex items-center gap-2 transition-colors"
          >
            <Plus size={15} />
            <span>Add Single Product</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards & Quick Shortcuts */}
      <div className="w-full p-6 sm:p-10 space-y-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl bg-white border border-brand-line p-6 sm:p-8 flex items-start justify-between shadow-xs">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-brand-muted">
                Listed Products
              </div>
              <div className="font-display text-4xl font-bold text-brand-navy mt-2">
                {productsCount}
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-brand-navy text-brand-sun flex items-center justify-center">
              <Package size={22} />
            </div>
          </div>

          <div className="rounded-xl bg-white border border-brand-line p-6 sm:p-8 flex items-start justify-between shadow-xs">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-brand-muted">
                Product Categories
              </div>
              <div className="font-display text-4xl font-bold text-brand-navy mt-2">
                {categoriesCount}
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-brand-sun text-brand-navy flex items-center justify-center">
              <Layers size={22} />
            </div>
          </div>

          <div className="rounded-xl bg-white border border-brand-line p-6 sm:p-8 flex items-start justify-between shadow-xs">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-brand-muted">
                Staff Accounts
              </div>
              <div className="font-display text-4xl font-bold text-brand-navy mt-2">
                {usersCount}
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-brand-surface-alt text-brand-navy border border-brand-line flex items-center justify-center">
              <Users size={22} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-5">
            Common Tasks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <Link
              href="/admin/products/new"
              className="rounded-xl bg-white border border-brand-line hover:border-brand-navy p-6 flex flex-col justify-between gap-4 transition-colors shadow-xs"
            >
              <div className="font-display font-bold text-lg text-brand-navy">
                Add a New Product
              </div>
              <div className="text-xs text-brand-muted flex items-center justify-between">
                <span>Upload photos &amp; features</span>
                <ArrowUpRight size={15} className="text-brand-navy" />
              </div>
            </Link>

            <Link
              href="/admin/products/bulk"
              className="rounded-xl bg-white border border-brand-line hover:border-brand-navy p-6 flex flex-col justify-between gap-4 transition-colors shadow-xs"
            >
              <div className="font-display font-bold text-lg text-brand-navy">
                Bulk CSV Import
              </div>
              <div className="text-xs text-brand-muted flex items-center justify-between">
                <span>Paste list &amp; attach photos</span>
                <ArrowUpRight size={15} className="text-brand-navy" />
              </div>
            </Link>

            <Link
              href="/admin/categories/new"
              className="rounded-xl bg-white border border-brand-line hover:border-brand-navy p-6 flex flex-col justify-between gap-4 transition-colors shadow-xs"
            >
              <div className="font-display font-bold text-lg text-brand-navy">
                Create Category
              </div>
              <div className="text-xs text-brand-muted flex items-center justify-between">
                <span>Add a new product category</span>
                <ArrowUpRight size={15} className="text-brand-navy" />
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="rounded-xl bg-white border border-brand-line hover:border-brand-navy p-6 flex flex-col justify-between gap-4 transition-colors shadow-xs"
            >
              <div className="font-display font-bold text-lg text-brand-navy flex items-center gap-2">
                <Settings size={18} className="text-brand-sun-dark" />
                <span>Site Contact Details</span>
              </div>
              <div className="text-xs text-brand-muted flex items-center justify-between">
                <span>Phone, WhatsApp, email &amp; address</span>
                <ArrowUpRight size={15} className="text-brand-navy" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
