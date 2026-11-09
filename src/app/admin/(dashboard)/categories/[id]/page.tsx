import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import CategoryForm from "../CategoryForm";

export const metadata: Metadata = {
  title: "Edit Category",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) notFound();

  return (
    <div className="w-full">
      <div className="w-full bg-white border-b border-brand-line px-6 sm:px-10 py-8">
        <Link
          href="/admin/categories"
          className="font-mono text-xs uppercase tracking-wider text-brand-sun-dark hover:underline inline-block mb-2"
        >
          &larr; Back to Categories
        </Link>
        <h1 className="text-3xl font-display font-bold text-brand-navy">
          Edit Category: {category.name}
        </h1>
      </div>

      <div className="w-full p-6 sm:p-10">
        <div className="w-full bg-white border border-brand-line p-6 sm:p-8">
          <CategoryForm category={category} />
        </div>
      </div>
    </div>
  );
}
