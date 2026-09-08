import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import CategoryForm from "../CategoryForm"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params
  const category = await prisma.category.findUnique({ where: { id } })
  
  if (!category) notFound()

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <Link href="/admin/categories" className="text-brand-sun hover:text-brand-sun-dark font-medium mb-2 inline-block">&larr; Back to Categories</Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Category: {category.name}</h1>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl">
        <CategoryForm category={category} />
      </div>
    </div>
  )
}
