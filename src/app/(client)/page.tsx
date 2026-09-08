import Link from "next/link"
import { ArrowRight, ShieldCheck, Factory, Award, ArrowUpRight } from "lucide-react"
import HoneycombGrid from "@/components/ui/HoneycombGrid"
import prisma from "@/lib/prisma"

export const revalidate = 3600

export default async function Home() {
  const dbCategories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6,
    include: { products: { take: 1, select: { images: true } } }
  })

  const categories = dbCategories.map(c => {
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
    <div className="flex flex-col w-full bg-white">

      {/* ═══════════════════════════════════════════════════
          HERO — Full-bleed dark with cinematic background
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] w-full flex items-center overflow-hidden bg-brand-navy">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-industrial.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/70" />
        </div>

        {/* Decorative honeycomb accents */}
        <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] clip-honeycomb bg-brand-sun/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-[20%] right-[15%] w-[200px] h-[200px] clip-honeycomb bg-brand-sun/10 blur-xl pointer-events-none animate-float" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold tracking-wide uppercase mb-8 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sun opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-sun"></span>
              </span>
              Since 2014 — Telangana, India
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.0] text-white tracking-tighter">
              Industrial<br />
              Components,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sun via-brand-sun-light to-brand-sun">
                Engineered Right.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-300 mb-12 leading-relaxed max-w-xl font-medium">
              Premium valves, pneumatics, and hydraulic equipment — trusted by manufacturers across India for over a decade.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link 
                href="/products" 
                className="bg-brand-sun hover:bg-brand-sun-light text-brand-navy px-10 py-5 rounded-2xl font-black text-lg transition-all duration-300 shadow-[0_0_40px_rgba(249,168,38,0.3)] hover:shadow-[0_0_60px_rgba(249,168,38,0.5)] flex items-center gap-3 group"
              >
                Explore Catalog 
                <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:border-brand-sun/50"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Floating stats on the right (desktop only) */}
          <div className="hidden lg:flex flex-col gap-5 absolute right-8 top-1/2 -translate-y-1/2">
            {[
              { value: "10+", label: "Years", icon: Award },
              { value: "50k+", label: "Products", icon: Factory },
              { value: "100%", label: "Quality", icon: ShieldCheck },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-5 text-center min-w-[130px] hover:bg-white/15 hover:border-brand-sun/30 transition-all duration-500 group"
              >
                <stat.icon className="text-brand-sun mx-auto mb-2 group-hover:scale-110 transition-transform" size={24} />
                <div className="text-3xl font-black text-white mb-0.5">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Mobile Stats (shown below hero on small screens) ═══ */}
      <section className="lg:hidden bg-white relative z-20 -mt-16 mx-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "10+", label: "Years", icon: Award },
            { value: "50k+", label: "Products", icon: Factory },
            { value: "100%", label: "Quality", icon: ShieldCheck },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 text-center">
              <stat.icon className="text-brand-sun mx-auto mb-2" size={22} />
              <div className="text-2xl font-black text-brand-navy">{stat.value}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="pt-10 pb-24 bg-white relative overflow-hidden">
        {/* Large subtle background honeycombs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-sun/5 clip-honeycomb blur-3xl -mt-32 -mr-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-navy/5 clip-honeycomb blur-3xl -mb-32 -ml-32 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sun/10 text-brand-sun text-xs font-bold tracking-wider uppercase mb-4 border border-brand-sun/20">
                Browse Collection
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight">Industrial Categories.</h2>
              <p className="text-gray-500 mt-4 text-lg">Explore our most popular industrial component ranges.</p>
            </div>
          </div>
          
          <HoneycombGrid items={categories} />

          <div className="mt-16 text-center">
            <Link href="/categories" className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-sun text-white hover:text-brand-navy px-8 py-4 rounded-xl font-bold text-lg transition-all group shadow-[0_0_20px_rgba(249,168,38,0.2)]">
              View All Categories <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  )
}
