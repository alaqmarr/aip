import prisma from "@/lib/prisma"
import Link from "next/link"
import { Users, Layers, Package, Settings, Plus, Hexagon } from "lucide-react"

export default async function AdminDashboardPage() {
  const categoriesCount = await prisma.category.count()
  const productsCount = await prisma.product.count()
  const usersCount = await prisma.user.count()

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-brand-navy tracking-tight">Dashboard.</h1>
          <p className="text-gray-500 mt-2 font-medium">Welcome to the Alfa Industrial Products administration panel.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Categories Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 flex flex-col relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-brand-sun/10 clip-honeycomb group-hover:scale-110 transition-transform duration-500"></div>
          <div className="w-14 h-14 bg-brand-sun text-brand-navy rounded-2xl flex items-center justify-center shrink-0 mb-6 shadow-md relative z-10">
            <Layers size={28} />
          </div>
          <div className="relative z-10">
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Categories</p>
            <h3 className="text-5xl font-black text-brand-navy">{categoriesCount}</h3>
          </div>
        </div>
        
        {/* Products Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 flex flex-col relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-brand-navy/5 clip-honeycomb group-hover:scale-110 transition-transform duration-500"></div>
          <div className="w-14 h-14 bg-brand-navy text-white rounded-2xl flex items-center justify-center shrink-0 mb-6 shadow-md relative z-10">
            <Package size={28} />
          </div>
          <div className="relative z-10">
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Products</p>
            <h3 className="text-5xl font-black text-brand-navy">{productsCount}</h3>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 flex flex-col relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-500/5 clip-honeycomb group-hover:scale-110 transition-transform duration-500"></div>
          <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center shrink-0 mb-6 shadow-md relative z-10">
            <Users size={28} />
          </div>
          <div className="relative z-10">
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Admin Users</p>
            <h3 className="text-5xl font-black text-brand-navy">{usersCount}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 relative overflow-hidden">
          <h3 className="text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
            <Hexagon className="text-brand-sun" size={20} /> Quick Actions
          </h3>
          <div className="space-y-4">
            <Link href="/admin/products/new" className="flex items-center justify-between w-full px-6 py-4 bg-gray-50 hover:bg-brand-sun/10 border border-gray-100 hover:border-brand-sun/30 rounded-2xl font-bold text-brand-navy transition-all group">
              <span className="flex items-center gap-3"><Plus size={20} className="text-gray-400 group-hover:text-brand-sun transition-colors" /> Add New Product</span>
            </Link>
            <Link href="/admin/categories/new" className="flex items-center justify-between w-full px-6 py-4 bg-gray-50 hover:bg-brand-sun/10 border border-gray-100 hover:border-brand-sun/30 rounded-2xl font-bold text-brand-navy transition-all group">
              <span className="flex items-center gap-3"><Plus size={20} className="text-gray-400 group-hover:text-brand-sun transition-colors" /> Add New Category</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center justify-between w-full px-6 py-4 bg-gray-50 hover:bg-brand-sun/10 border border-gray-100 hover:border-brand-sun/30 rounded-2xl font-bold text-brand-navy transition-all group">
              <span className="flex items-center gap-3"><Settings size={20} className="text-gray-400 group-hover:text-brand-sun transition-colors" /> Update Site Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
