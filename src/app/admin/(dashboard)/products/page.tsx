import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Edit, Trash2, FileSpreadsheet } from "lucide-react";
import prisma from "@/lib/prisma";
import { deleteProduct } from "./actions";
import SubmitButton from "@/components/ui/SubmitButton";

export const metadata: Metadata = {
  title: "Manage Products",
};

export default async function ProductsAdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="w-full">
      <div className="w-full bg-white border-b border-brand-line px-6 sm:px-10 py-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-1">
            Stocked Items
          </div>
          <h1 className="text-3xl font-display font-bold text-brand-navy">
            All Listed Products
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/products/bulk"
            className="rounded-lg border border-brand-navy text-brand-navy hover:bg-brand-surface font-display text-xs font-bold uppercase tracking-wider px-5 py-3.5 inline-flex items-center gap-2 transition-colors"
          >
            <FileSpreadsheet size={15} />
            <span>Bulk Import</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="rounded-lg bg-brand-sun hover:bg-brand-sun-light text-brand-navy font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 inline-flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      <div className="w-full p-6 sm:p-10">
        <div className="w-full rounded-xl bg-white border border-brand-line overflow-x-auto shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-surface border-b border-brand-line font-mono text-xs text-brand-steel uppercase tracking-wider">
                <th className="p-4 sm:p-5">Product Name</th>
                <th className="p-4 sm:p-5">Category</th>
                <th className="p-4 sm:p-5">URL</th>
                <th className="p-4 sm:p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-line text-sm">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-brand-surface/50 transition-colors"
                >
                  <td className="p-4 sm:p-5 font-display font-bold text-brand-navy">
                    {product.name}
                  </td>
                  <td className="p-4 sm:p-5">
                    <span className="rounded-md bg-brand-surface-alt border border-brand-line text-brand-navy px-2.5 py-1 font-mono text-xs">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs text-brand-muted">
                    /products/{product.slug}
                  </td>
                  <td className="p-4 sm:p-5">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="rounded-md border border-brand-line hover:border-brand-navy bg-white text-brand-navy p-2 transition-colors"
                        title="Edit product"
                      >
                        <Edit size={16} />
                      </Link>
                      <form
                        action={deleteProduct.bind(null, product.id) as any}
                      >
                        <SubmitButton
                          pendingLabel="..."
                          loaderTone="navy"
                          className="rounded-md border border-brand-line hover:border-red-500 bg-white text-brand-muted hover:text-red-600 p-2"
                          title="Delete product"
                        >
                          <Trash2 size={16} />
                        </SubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-12 text-center text-brand-muted text-sm"
                  >
                    No products found yet. Click Add Product or Bulk Import to
                    start listing stock.
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
