import CategoryForm from "../CategoryForm"
import Link from "next/link"

export default function NewCategoryPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/categories" className="text-brand-sun hover:text-brand-sun-dark font-medium mb-2 inline-block">&larr; Back to Categories</Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl">
        <CategoryForm />
      </div>
    </div>
  )
}
