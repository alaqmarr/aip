import ProductForm from "../ProductForm"
import Link from "next/link"
import prisma from "@/lib/prisma"

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/products" className="text-brand-sun hover:text-brand-sun-dark font-medium mb-2 inline-block">&larr; Back to Products</Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-3xl">
        <ProductForm categories={categories} />
      </div>
    </div>
  )
}
