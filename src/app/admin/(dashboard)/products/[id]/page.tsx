import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import ProductForm from "../ProductForm";

export const metadata: Metadata = {
  title: "Edit Product",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) notFound();

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
          Edit Product: {product.name}
        </h1>
      </div>

      <div className="w-full p-6 sm:p-10">
        <div className="w-full bg-white border border-brand-line p-6 sm:p-8">
          <ProductForm product={product} categories={categories} />
        </div>
      </div>
    </div>
  );
}
