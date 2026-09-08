import prisma from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit, Trash2, Package } from "lucide-react"
import { deleteProduct } from "./actions"

export default async function ProductsAdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  })

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-brand-navy tracking-tight">Products.</h1>
          <p className="text-gray-500 mt-2 font-medium flex items-center gap-2">
            <Package size={18} className="text-brand-sun" /> Manage all industrial products.
          </p>
        </div>
        <Link href="/admin/products/new" className="bg-gradient-to-r from-brand-navy to-brand-navy-light hover:from-brand-sun hover:to-brand-sun-light text-white hover:text-brand-navy px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <Plus size={20} /> Add Product
        </Link>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-bold text-gray-500 uppercase tracking-wider">
              <th className="p-6">Name</th>
              <th className="p-6">Category</th>
              <th className="p-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-brand-sun/5 transition-colors group">
                <td className="p-6 font-bold text-brand-navy text-base">{product.name}</td>
                <td className="p-6 text-brand-navy font-semibold">
                  <span className="bg-gray-100 text-brand-navy px-3 py-1 rounded-full text-xs group-hover:bg-brand-sun group-hover:text-white transition-colors">{product.category.name}</span>
                </td>
                <td className="p-6 flex gap-4">
                  <Link href={`/admin/products/${product.id}`} className="text-gray-400 hover:text-brand-navy transition-colors bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:border-brand-navy">
                    <Edit size={18} />
                  </Link>
                  <form action={deleteProduct.bind(null, product.id) as any}>
                    <button type="submit" className="text-gray-400 hover:text-red-500 transition-colors bg-white p-2 rounded-lg shadow-sm border border-gray-100 hover:border-red-200">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={3} className="p-12 text-center text-gray-400 font-medium">
                  No products found. Start by adding one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
