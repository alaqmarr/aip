import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await prisma.category.findUnique({ where: { slug } })
  if (!category) return { title: "Not Found" }
  
  return {
    title: `${category.name} | Alfa Industrial Products`,
    description: category.description || `Browse our selection of ${category.name}.`,
  }
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany({ select: { slug: true } })
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { products: true }
  })

  if (!category) notFound()

  return (
    <div className="bg-gray-50 min-h-[70vh] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link href="/categories" className="text-brand-sun hover:text-brand-sun-dark font-medium mb-4 inline-block">&larr; Back to Categories</Link>
          <h1 className="text-4xl font-extrabold text-brand-navy mb-4">{category.name}</h1>
          <div className="w-16 h-1 bg-brand-sun rounded-full mb-6"></div>
          {category.description && (
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">{category.description}</p>
          )}
        </div>

        {category.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.products.map(product => {
              const images = product.images ? JSON.parse(product.images) : []
              const primaryImage = images.length > 0 ? images[0] : null
              
              return (
                <Link key={product.id} href={`/products/${product.slug}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                  <div className="h-64 bg-gray-100 relative overflow-hidden">
                    {primaryImage ? (
                      <img src={primaryImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 bg-brand-navy/5">No Image</div>
                    )}
                    <div className="absolute top-4 left-4 bg-brand-sun text-brand-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {category.name}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-sun transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
                    <div className="flex items-center text-brand-navy font-semibold group-hover:text-brand-sun transition-colors">
                      View Details <ArrowRight size={16} className="ml-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 shadow-sm text-gray-500">
            No products available in this category yet.
          </div>
        )}
      </div>
    </div>
  )
}
