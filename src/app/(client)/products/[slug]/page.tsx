import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import WhatsAppFloat from "@/components/ui/WhatsAppFloat"
import { CheckCircle2, Package, Tag } from "lucide-react"

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await prisma.product.findUnique({ where: { slug } })
  if (!product) return { title: "Not Found" }
  
  return {
    title: `${product.name} | Alfa Industrial Products`,
    description: product.description,
  }
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } })
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  })

  if (!product) notFound()

  // Fetch settings for whatsapp number
  const setting = await prisma.setting.findUnique({ where: { key: 'WHATSAPP_NUMBER' } })
  const whatsappNumber = setting?.value || '+919876543210'

  const images = product.images ? JSON.parse(product.images) : []
  const primaryImage = images.length > 0 ? images[0] : null
  const features = product.features ? JSON.parse(product.features) : []

  return (
    <div className="bg-gray-50 min-h-[70vh] py-16">
      {/* Dynamic WhatsApp float that only appears when scrolling */}
      <WhatsAppFloat phoneNumber={whatsappNumber} productName={product.name} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-brand-sun">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-brand-sun">Products</Link>
            <span className="mx-2">/</span>
            <Link href={`/categories/${product.category.slug}`} className="hover:text-brand-sun">{product.category.name}</Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="bg-gray-100 p-8 flex items-center justify-center min-h-[400px]">
              {primaryImage ? (
                <div className="w-full max-w-md aspect-square relative">
                   <img src={primaryImage} alt={product.name} className="w-full h-full object-contain rounded-xl shadow-lg border-4 border-white clip-honeycomb" />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                  <Package size={64} className="mb-4 opacity-50" />
                  <span>No Image Available</span>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sun/10 text-brand-sun-dark text-sm font-bold tracking-wide uppercase mb-6">
                <Tag size={14} /> {product.category.name}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="w-16 h-1 bg-brand-sun rounded-full mb-8"></div>
              
              <div className="prose prose-lg text-gray-600 mb-10">
                <p className="leading-relaxed">{product.description}</p>
              </div>

              {features.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-brand-navy mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600">
                        <CheckCircle2 className="text-brand-sun shrink-0 mt-0.5" size={20} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Static enquiry button always visible */}
              <a 
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Alfa Industrial Products, I am interested in inquiring about ${product.name}. Could you provide more details?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-brand-navy hover:bg-brand-navy-light text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-brand-navy/30 gap-2 text-lg"
              >
                Inquire via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
