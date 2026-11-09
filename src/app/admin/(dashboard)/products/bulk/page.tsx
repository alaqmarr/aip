import type { Metadata } from "next";
import Link from "next/link";
import BulkProductForm from "./BulkProductForm";

export const metadata: Metadata = {
  title: "Bulk Import Products",
};

export default function BulkAddProductsPage() {
  return (
    <div className="w-full">
      <div className="w-full bg-white border-b border-brand-line px-6 sm:px-10 py-8">
        <Link
          href="/admin/products"
          className="font-mono text-xs uppercase tracking-wider text-brand-sun-dark hover:underline inline-block mb-2"
        >
          &larr; Back to Products
        </Link>
        <h1 className="text-3xl font-display font-bold text-brand-navy">
          Bulk Import Products
        </h1>
        <p className="text-sm text-brand-muted mt-1.5">
          Paste multiple product listings in CSV format, then attach photos
          right after import.
        </p>
      </div>

      <div className="w-full p-6 sm:p-10">
        <BulkProductForm />
      </div>
    </div>
  );
}
