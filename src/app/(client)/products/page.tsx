import { Metadata } from "next"
import prisma from "@/lib/prisma"
import HoneycombGrid from "@/components/ui/HoneycombGrid"
import PageHeader from "@/components/ui/PageHeader"

export const metadata: Metadata = {
  title: "Products | Alfa Industrial Products",
  description: "Explore our comprehensive range of industrial valves, pneumatic components, and hydraulic equipment.",
}

export const revalidate = 3600

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  })

  const items = products.map(p => {
    let previewImage = null
    if (p.images) {
      try {
        const parsed = JSON.parse(p.images)
        previewImage = parsed.length > 0 ? parsed[0] : null
      } catch (e) {
        // ignore
      }
    }
    return {
      id: p.id,
      title: p.name,
      href: `/products/${p.slug}`,
      image: previewImage
    }
  })

  return (
    <div className="bg-white min-h-[80vh] relative overflow-hidden">
      <PageHeader 
        badge="All Products"
        title="Our Products."
        description="Explore our comprehensive range of industrial valves, pneumatic components, and hydraulic equipment."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-24">
        {items.length > 0 ? (
          <HoneycombGrid items={items} />
        ) : (
          <div className="text-center text-gray-500 py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            No products available yet. Please check back later.
          </div>
        )}
      </div>
    </div>
  )
}
