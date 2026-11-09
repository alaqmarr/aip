import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page or industrial product could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-brand-navy bg-honeycomb-navy text-white flex flex-col justify-between">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-6 border-b border-brand-line-dark flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold text-lg tracking-tight"
        >
          ALFA INDUSTRIAL PRODUCTS
        </Link>
        <span className="font-mono text-xs text-brand-sun uppercase tracking-wider">
          HTTP 404
        </span>
      </div>

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-20">
        <div className="font-mono text-xs uppercase tracking-widest text-brand-sun mb-3">
          Missing Route or Product URL
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight mb-5">
          We could not find that page.
        </h1>
        <p className="text-base sm:text-lg text-blue-100/85 max-w-xl mb-9 leading-relaxed">
          The link may have changed or the product listing may have moved to a
          new category. Use the links below to browse all stocked products.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/products"
            className="bg-brand-sun hover:bg-brand-sun-light text-brand-navy font-display font-bold text-sm uppercase tracking-wider px-7 py-4 rounded-xl inline-flex items-center gap-2 transition-colors"
          >
            <span>Browse All Products</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/"
            className="border border-brand-line-dark bg-brand-navy-mid hover:bg-brand-navy-light text-white font-display font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded-xl transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>

      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-5 border-t border-brand-line-dark font-mono text-xs text-blue-200/65">
        Alfa Industrial Products, Ranigunj, Secunderabad, Telangana 500003
      </div>
    </div>
  );
}
