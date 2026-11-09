import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { deleteCategory } from "./actions";
import SubmitButton from "@/components/ui/SubmitButton";

export const metadata: Metadata = {
  title: "Manage Categories",
};

export default async function CategoriesAdminPage() {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div className="w-full">
      <div className="w-full bg-white border-b border-brand-line px-6 sm:px-10 py-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-1">
            Catalog Structure
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-navy">
            Product Categories
          </h1>
        </div>
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-brand-sun hover:bg-brand-sun-light text-brand-navy font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 inline-flex items-center gap-2 transition-colors"
        >
          <Plus size={16} />
          <span>New Category</span>
        </Link>
      </div>

      <div className="w-full p-6 sm:p-10">
        <div className="w-full rounded-xl bg-white border border-brand-line overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface border-b border-brand-line font-mono text-xs text-brand-steel uppercase tracking-wider">
                <th className="p-4 sm:p-5">Name</th>
                <th className="p-4 sm:p-5">URL Slug</th>
                <th className="p-4 sm:p-5">Products Count</th>
                <th className="p-4 sm:p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-line text-sm">
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-brand-surface/50 transition-colors"
                >
                  <td className="p-4 sm:p-5 font-display font-bold text-brand-navy">
                    {category.name}
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs text-brand-muted">
                    /categories/{category.slug}
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs text-brand-navy">
                    {category._count.products} products
                  </td>
                  <td className="p-4 sm:p-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/categories/${category.id}`}
                        className="rounded-md border border-brand-line hover:border-brand-navy bg-white text-brand-navy p-2 transition-colors"
                        title="Edit category"
                      >
                        <Edit size={16} />
                      </Link>
                      <form
                        action={deleteCategory.bind(null, category.id) as any}
                      >
                        <SubmitButton
                          pendingLabel="..."
                          loaderTone="navy"
                          className="rounded-md border border-brand-line hover:border-red-500 bg-white text-brand-muted hover:text-red-600 p-2"
                          title="Delete category"
                        >
                          <Trash2 size={16} />
                        </SubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-12 text-center text-brand-muted text-sm"
                  >
                    No categories created yet. Click New Category to add your
                    first product category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
