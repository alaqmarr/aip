import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FolderOpen,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  getAllCategories,
  getAllProducts,
  getSiteSettings,
} from "@/lib/data";
import {
  SITE_NAME,
  SITE_URL,
  COMPANY_GSTIN,
  COMPANY_HOURS,
  COMPANY_LANDLINE,
  COMPANY_PARTNER,
  VERIFIED_PROFILES,
  absoluteUrl,
  buildWhatsAppLink,
} from "@/lib/site";
import HeroSearchForm from "@/components/home/HeroSearchForm";
import ProductCard from "@/components/ui/ProductCard";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export const revalidate = 3600;

export const metadata: Metadata = {
  title:
    "Pneumatics, Brass & SS Fittings, Industrial Valves & Hydraulic Products in Secunderabad",
  description:
    "Alfa Industrial Products in Ranigunj, Secunderabad supplies pneumatic cylinders, F.R.L. combinations, PU connectors, brass & stainless steel fittings, industrial valves, and hydraulic couplers.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: `${SITE_NAME} | House of Pneumatics, Brass & SS Fittings`,
    description:
      "Wholesale trader, distributor, and supplier of pneumatic products, brass & SS fittings, valves, and hydraulic hardware in Ranigunj, Secunderabad.",
    url: absoluteUrl("/"),
    images: [{ url: "/hero-industrial.jpg", width: 1200, height: 630 }],
  },
};

export default async function HomePage() {
  const [categories, products, settings] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getSiteSettings(),
  ]);

  const featuredCategories = categories.slice(0, 8);
  const featuredProducts = products.slice(0, 8);

  const whatsappGeneralUrl = buildWhatsAppLink(
    settings.whatsapp,
    "Hello Alfa Industrial Products, I would like to check availability and pricing for your industrial products."
  );

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo.jpeg"),
    image: absoluteUrl("/hero-industrial.jpg"),
    taxID: COMPANY_GSTIN,
    founder: {
      "@type": "Person",
      name: COMPANY_PARTNER,
    },
    telephone: settings.phone,
    email: settings.email,
    openingHours: "Mo-Sa 10:00-18:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Secunderabad",
      addressRegion: "Telangana",
      postalCode: "500003",
      addressCountry: "IN",
    },
    sameAs: VERIFIED_PROFILES.map((p) => p.url),
    description:
      "Wholesale trader, distributor, and supplier of pneumatic cylinders, F.R.L. units, PU connectors, brass & SS fittings, industrial valves, and hydraulic hardware in Ranigunj, Secunderabad.",
  };

  return (
    <div className="w-full flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* 1. FULL-WIDTH HONEYCOMB HERO (NO BADGE, 8PT MACRO RHYTHM) */}
      <section className="w-full bg-brand-navy bg-honeycomb-navy border-b border-brand-line-dark text-white">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left 7 Columns: Headline, Verified Copy, Search & CTAs */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-bold tracking-tight text-white leading-[1.08] mb-6">
                House of Pneumatics, Brass &amp; SS Fittings, Valves &amp; Hydraulic Products.
              </h1>

              <p className="text-base sm:text-lg text-blue-100/85 leading-relaxed max-w-2xl mb-8">
                Based in Ranigunj, Secunderabad, Alfa Industrial Products is a
                wholesale trader, distributor, and supplier of pneumatic
                cylinders, F.R.L. combinations, PU connectors, brass and
                stainless steel pipe fittings, control valves, and hydraulic
                hardware.
              </p>

              {/* Direct Product Search with Inline Loader */}
              <div className="mb-8">
                <HeroSearchForm />
              </div>

              {/* Direct CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="h-13 px-7 rounded-xl bg-brand-sun hover:bg-brand-sun-light text-brand-navy font-display font-bold text-sm uppercase tracking-wider inline-flex items-center gap-3 transition-colors"
                >
                  <span>Browse All Products</span>
                  <span className="font-mono text-xs bg-brand-navy/15 px-2.5 py-0.5 rounded-md">
                    {products.length}
                  </span>
                  <ArrowRight size={17} />
                </Link>

                <a
                  href={whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-13 px-7 rounded-xl bg-whatsapp hover:bg-whatsapp-dark text-white font-display font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2.5 transition-colors"
                >
                  <WhatsAppIcon size={19} />
                  <span>WhatsApp Sales</span>
                </a>
              </div>

              {/* Direct Phone Strip */}
              <div className="mt-10 pt-8 border-t border-brand-line-dark flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono text-blue-200/80">
                <span>Ranigunj Store Desk:</span>
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  className="text-brand-sun hover:underline inline-flex items-center gap-2 font-medium"
                >
                  <Phone size={14} />
                  <span>{settings.phone}</span>
                </a>
                <a
                  href={`tel:${COMPANY_LANDLINE.replace(/[^0-9+]/g, "")}`}
                  className="text-blue-100 hover:text-brand-sun transition-colors"
                >
                  {COMPANY_LANDLINE}
                </a>
                <Link
                  href="/contact"
                  className="text-white hover:text-brand-sun transition-colors underline underline-offset-4"
                >
                  Send Product List Online
                </Link>
              </div>
            </div>

            {/* Right 5 Columns: Visual + Verified Store Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border border-brand-line-dark shadow-2xl aspect-[16/11] bg-brand-navy-mid">
                <img
                  src="/hero-industrial.jpg"
                  alt="Pneumatic valves, pressure gauges, and pipe fittings"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-xl bg-brand-navy/90 backdrop-blur-xs border border-brand-line-dark px-5 py-4">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-brand-sun">
                      Ranigunj, Secunderabad (500003)
                    </div>
                    <div className="font-display text-sm sm:text-base font-semibold text-white mt-1">
                      Shyam Market, Hill Street, Near City Light Hotel
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Verified Fact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-brand-navy-mid/90 border border-brand-line-dark p-5">
                  <div className="font-mono text-xs uppercase tracking-wider text-brand-sun">
                    Business Type
                  </div>
                  <div className="font-display text-lg font-bold text-white mt-1">
                    Wholesale &amp; Retail
                  </div>
                  <div className="font-sans text-xs text-blue-100/75 mt-1 leading-snug">
                    Trader, distributor &amp; supplier
                  </div>
                </div>
                <div className="rounded-xl bg-brand-navy-mid/90 border border-brand-line-dark p-5">
                  <div className="font-mono text-xs uppercase tracking-wider text-brand-sun">
                    GST Registered
                  </div>
                  <div className="font-mono text-sm font-semibold text-white mt-1.5 break-all">
                    {COMPANY_GSTIN}
                  </div>
                  <div className="font-sans text-xs text-blue-100/75 mt-1 leading-snug">
                    Telangana Partnership Firm
                  </div>
                </div>
                <div className="rounded-xl bg-brand-navy-mid/90 border border-brand-line-dark p-5">
                  <div className="font-mono text-xs uppercase tracking-wider text-brand-sun">
                    Store Hours
                  </div>
                  <div className="font-display text-lg font-bold text-white mt-1">
                    10 AM to 6 PM
                  </div>
                  <div className="font-sans text-xs text-blue-100/75 mt-1 leading-snug">
                    Monday to Saturday
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY PRODUCT CATEGORY (GENEROUS SECTION PADDING & CARD GUTTERS) */}
      <section className="w-full bg-brand-surface bg-honeycomb-light py-20 sm:py-24 lg:py-28 border-b border-brand-line">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-2">
                01 / Product Categories
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy">
                Shop by Product Category
              </h2>
              <p className="text-base text-brand-muted mt-3 max-w-2xl leading-relaxed">
                Explore our stocked range of pneumatic cylinders, valves, F.R.L.
                combinations, PU connectors, brass &amp; SS fittings, and
                hydraulic accessories.
              </p>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-brand-navy hover:text-brand-sun-dark shrink-0"
            >
              <span>View All {categories.length} Categories</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {featuredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {featuredCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-brand-line bg-white overflow-hidden shadow-[0_2px_10px_rgba(7,25,54,0.04)] hover:shadow-[0_14px_32px_rgba(7,25,54,0.10)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full bg-brand-surface-alt bg-honeycomb-light border-b border-brand-line overflow-hidden">
                      {cat.previewImage ? (
                        <img
                          src={cat.previewImage}
                          alt={cat.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-brand-steel/50 gap-2 p-6">
                          <FolderOpen size={38} strokeWidth={1.4} />
                          <span className="font-mono text-xs uppercase tracking-wider">
                            {cat.name}
                          </span>
                        </div>
                      )}
                      <span className="absolute top-3 right-3 rounded-md bg-brand-navy/85 backdrop-blur-xs text-white font-mono text-xs px-2.5 py-1">
                        {cat.productCount}{" "}
                        {cat.productCount === 1 ? "product" : "products"}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-brand-navy group-hover:text-brand-navy-light mb-2">
                        {cat.name}
                      </h3>
                      {cat.description ? (
                        <p className="text-sm text-brand-muted line-clamp-2 leading-relaxed">
                          {cat.description}
                        </p>
                      ) : cat.sampleProducts.length > 0 ? (
                        <p className="text-sm text-brand-muted line-clamp-2 leading-relaxed">
                          Includes{" "}
                          {cat.sampleProducts.map((p) => p.name).join(", ")}.
                        </p>
                      ) : (
                        <p className="text-sm text-brand-muted leading-relaxed">
                          View stocked products and specifications in this
                          category.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-brand-line/80 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors">
                    <span>Explore Category</span>
                    <ArrowUpRight size={15} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white border border-brand-line p-10 text-brand-muted">
              Product categories are being updated. Contact our Ranigunj counter
              directly with your requirement.
            </div>
          )}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS CATALOG (WHITE SURFACE + 24PX-32PX GUTTERS) */}
      <section className="w-full bg-white py-20 sm:py-24 lg:py-28 border-b border-brand-line">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-2">
                02 / Stocked Products
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy">
                Products Ready for Immediate Inquiry
              </h2>
              <p className="text-base text-brand-muted mt-3 max-w-2xl leading-relaxed">
                Check photos and specifications below, or click Quote on any
                product to message our Secunderabad sales counter directly on
                WhatsApp.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-navy hover:bg-brand-navy-light text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 transition-colors shrink-0"
            >
              <span>View All Products</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  whatsappNumber={settings.whatsapp}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-brand-surface border border-brand-line p-10">
              <p className="text-brand-muted mb-5">
                Our online catalog is currently being updated with product
                photos.
              </p>
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg bg-whatsapp hover:bg-whatsapp-dark text-white font-display font-bold text-sm px-6 py-3.5 transition-colors"
              >
                <WhatsAppIcon size={18} />
                <span>Ask for Current Stock on WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* 4. WHAT WE STOCK & SUPPLY (100% VERIFIED BUSINESS PROFILE) */}
      <section className="w-full bg-brand-navy bg-honeycomb-navy text-white py-20 sm:py-24 lg:py-28 border-b border-brand-line-dark">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 5 Columns: Real Store & Brand Range */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-brand-sun">
                03 / About Alfa Industrial Products
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
                Trusted Wholesale &amp; Retail Counter in Ranigunj, Secunderabad.
              </h2>
              <p className="text-blue-100/85 text-base leading-relaxed">
                Managed by Partner {COMPANY_PARTNER}, Alfa Industrial Products
                operates from Shyam Market on Hill Street in Ranigunj,
                Secunderabad. We supply workshops, factories, maintenance
                contractors, and equipment builders across Hyderabad and
                Telangana with ready-stock pneumatic, fitting, valve, and
                hydraulic products.
              </p>

              <div className="rounded-xl border border-brand-line-dark overflow-hidden">
                <img
                  src="/hero-bg.jpg"
                  alt="Industrial pneumatic and pipe fitting supplies"
                  loading="lazy"
                  className="w-full h-60 object-cover"
                />
              </div>

              <div className="space-y-3 pt-2 text-sm">
                <div className="font-mono text-xs uppercase tracking-wider text-brand-sun">
                  Brands &amp; Series Handled
                </div>
                <div className="flex items-center gap-3 text-blue-100/90">
                  <CheckCircle2 size={18} className="text-brand-sun shrink-0" />
                  <span>
                    Festo, Janatics, Jelpc, SMB, and Techno pneumatic products
                  </span>
                </div>
                <div className="flex items-center gap-3 text-blue-100/90">
                  <CheckCircle2 size={18} className="text-brand-sun shrink-0" />
                  <span>
                    Festo-type ADVU &amp; SDA cylinders, MAL cylinders &amp;
                    mountings
                  </span>
                </div>
                <div className="flex items-center gap-3 text-blue-100/90">
                  <CheckCircle2 size={18} className="text-brand-sun shrink-0" />
                  <span>
                    AC, Shavo-type &amp; Airtech-type F.R.L. units and auto
                    drain valves
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: 4 Verified Product & Service Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              <div className="rounded-xl bg-brand-navy-mid/90 border border-brand-line-dark p-7 lg:p-8">
                <div className="font-mono text-xs text-brand-sun font-semibold mb-3">
                  01 / PNEUMATICS &amp; AIR PREP
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  Cylinders, Valves &amp; F.R.L. Units
                </h3>
                <p className="text-sm text-blue-100/80 leading-relaxed">
                  Stocking compact ADVU and SDA cylinders, MAL series cylinders,
                  direct-acting and pilot valves, pneumatic control valves,
                  F.R.L. combinations, and auto drain valves.
                </p>
              </div>

              <div className="rounded-xl bg-brand-navy-mid/90 border border-brand-line-dark p-7 lg:p-8">
                <div className="font-mono text-xs text-brand-sun font-semibold mb-3">
                  02 / BRASS, SS &amp; PU FITTINGS
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  Connectors &amp; Pipe Hardware
                </h3>
                <p className="text-sm text-blue-100/80 leading-relaxed">
                  Complete range of pneumatic PU push-in connectors, brass
                  fittings, stainless steel (SS) fittings, carbon steel pipe
                  fittings, and industrial plumbing connectors.
                </p>
              </div>

              <div className="rounded-xl bg-brand-navy-mid/90 border border-brand-line-dark p-7 lg:p-8">
                <div className="font-mono text-xs text-brand-sun font-semibold mb-3">
                  03 / HYDRAULICS &amp; VALVES
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  Couplers, Gauges &amp; Ball Valves
                </h3>
                <p className="text-sm text-blue-100/80 leading-relaxed">
                  Supplying hydraulic quick-release couplers, pressure gauges,
                  hydraulic tubes and filters, ball valves, sight glass valves,
                  rubber diaphragms, and cable lugs.
                </p>
              </div>

              <div className="rounded-xl bg-brand-navy-mid/90 border border-brand-line-dark p-7 lg:p-8">
                <div className="font-mono text-xs text-brand-sun font-semibold mb-3">
                  04 / WHOLESALE &amp; COUNTER PICKUP
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  Walk-In Counter or Dispatch
                </h3>
                <p className="text-sm text-blue-100/80 leading-relaxed">
                  Pick up urgent replacement items directly at our Ranigunj
                  store ({COMPANY_HOURS}) or send your purchase list on WhatsApp
                  for GST billing and dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW ORDERING WORKS + DIRECT CONTACT CALLOUT */}
      <section className="w-full bg-brand-surface bg-honeycomb-light py-20 sm:py-24 lg:py-28">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 space-y-16">
          <div>
            <div className="mb-10 lg:mb-12">
              <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-2">
                04 / Ordering &amp; Pickup
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy">
                How Ordering Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="rounded-xl bg-white border border-brand-line p-7 lg:p-8 shadow-[0_2px_10px_rgba(7,25,54,0.04)]">
                <div className="font-mono text-xs font-semibold text-brand-sun-dark mb-2">
                  STEP 01
                </div>
                <h3 className="font-display font-bold text-xl text-brand-navy mb-2.5">
                  Send Your Product List or Sample Photo
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Share product names, thread sizes, cylinder bore/stroke, or a
                  photo on WhatsApp, by email, or via our online quote form.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-brand-line p-7 lg:p-8 shadow-[0_2px_10px_rgba(7,25,54,0.04)]">
                <div className="font-mono text-xs font-semibold text-brand-sun-dark mb-2">
                  STEP 02
                </div>
                <h3 className="font-display font-bold text-xl text-brand-navy mb-2.5">
                  Check Ready Stock &amp; GST Quote
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Our Ranigunj counter confirms stock availability across
                  branded or compatible series along with wholesale or retail
                  rates.
                </p>
              </div>

              <div className="rounded-xl bg-white border border-brand-line p-7 lg:p-8 shadow-[0_2px_10px_rgba(7,25,54,0.04)]">
                <div className="font-mono text-xs font-semibold text-brand-sun-dark mb-2">
                  STEP 03
                </div>
                <h3 className="font-display font-bold text-xl text-brand-navy mb-2.5">
                  Store Pickup or Transport Dispatch
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Collect directly from Shyam Market in Ranigunj, Secunderabad,
                  or arrange local delivery and outstation transport dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Contact Card */}
          <div className="rounded-2xl bg-brand-navy bg-honeycomb-navy border border-brand-line-dark p-8 sm:p-12 lg:p-14 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold leading-tight">
                Need pricing on pneumatics, fittings, or valves?
              </h2>
              <p className="text-base text-blue-100/85 max-w-2xl leading-relaxed">
                Reach our Ranigunj, Secunderabad store directly by phone,
                WhatsApp, or email during working hours ({COMPANY_HOURS}).
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm font-mono text-blue-100">
                <span className="inline-flex items-center gap-2">
                  <Phone size={15} className="text-brand-sun" />
                  {settings.phone} / {COMPANY_LANDLINE}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Mail size={15} className="text-brand-sun" />
                  {settings.email}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={15} className="text-brand-sun" />
                  {settings.address}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-4">
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-dark text-white font-display font-bold text-sm uppercase tracking-wider px-7 py-4 transition-colors"
              >
                <WhatsAppIcon size={19} />
                <span>WhatsApp Quote</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-sun hover:bg-brand-sun-light text-brand-navy font-display font-bold text-sm uppercase tracking-wider px-7 py-4 transition-colors"
              >
                <span>Contact Page</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
