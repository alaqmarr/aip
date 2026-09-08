import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import ProductForm from "../ProductForm"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id } })
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  })
  
  if (!product) notFound()

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <Link href="/admin/products" className="text-brand-sun hover:text-brand-sun-dark font-medium mb-2 inline-block">&larr; Back to Products</Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product: {product.name}</h1>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-3xl">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  )
}
