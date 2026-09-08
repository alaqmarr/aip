import { Metadata } from "next"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Factory, ArrowRight } from "lucide-react"
import HoneycombGrid from "@/components/ui/HoneycombGrid"
import PageHeader from "@/components/ui/PageHeader"

export const metadata: Metadata = {
  title: "Categories | Alfa Industrial Products",
  description: "Browse our extensive range of industrial components by category.",
}

export const revalidate = 3600

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { products: { take: 1, select: { images: true } } }
  })

  const items = categories.map(c => {
    // 1. Prefer the category's own image
    let previewImage = c.image || null
    // 2. Fall back to the first product's image
    if (!previewImage && c.products.length > 0 && c.products[0].images) {
      try {
        const parsed = JSON.parse(c.products[0].images)
        previewImage = parsed.length > 0 ? parsed[0] : null
      } catch (e) {
        // ignore
      }
    }
    return {
      id: c.id,
      title: c.name,
      href: `/categories/${c.slug}`,
      image: previewImage
    }
  })

  return (
    <div className="bg-white min-h-[80vh] relative overflow-hidden">
      <PageHeader 
        badge="Product Catalog"
        title="Product Categories."
        description="Browse our complete catalog of industrial components, meticulously engineered for your critical infrastructure needs."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-24">
        
        {items.length > 0 ? (
          <HoneycombGrid items={items} />
        ) : (
          <div className="text-center text-gray-500 py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            No categories found.
          </div>
        )}
      </div>
    </div>
  )
}
