import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FolderOpen } from "lucide-react";
import { getAllCategories, getSiteSettings } from "@/lib/data";
import { SITE_NAME, absoluteUrl, buildWhatsAppLink } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Industrial Product Categories",
  description:
    "Browse Alfa Industrial Products by product category: pneumatic cylinders, F.R.L. combinations, PU connectors, brass & SS fittings, industrial valves, and hydraulic hardware.",
  alternates: {
    canonical: absoluteUrl("/categories"),
  },
  openGraph: {
    title: `Industrial Product Categories | ${SITE_NAME}`,
    description:
      "Browse all stocked industrial product categories from Alfa Industrial Products in Ranigunj, Secunderabad.",
    url: absoluteUrl("/categories"),
    images: [{ url: "/hero-industrial.jpg", width: 1200, height: 630 }],
  },
};

export default async function CategoriesPage() {
  const [categories, settings] = await Promise.all([
    getAllCategories(),
    getSiteSettings(),
  ]);

  const totalProducts = categories.reduce((acc, c) => acc + c.productCount, 0);
  const whatsappUrl = buildWhatsAppLink(
    settings.whatsapp,
    "Hello Alfa Industrial Products, I need help selecting the right product category for my requirement."
  );

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Industrial Product Categories | ${SITE_NAME}`,
    url: absoluteUrl("/categories"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categories.length,
      itemListElement: categories.map((cat, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: absoluteUrl(`/categories/${cat.slug}`),
        name: cat.name,
      })),
    },
  };

  return (
    <div className="w-full bg-brand-surface bg-honeycomb-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories" },
        ]}
        title="Industrial Product Categories"
        description="Every product we stock is organized into clear categories below so maintenance teams and buyers can jump straight to the right section."
        metaRight={
          <div className="rounded-xl border border-brand-line-dark bg-brand-navy-mid px-6 py-5 text-left">
            <div className="font-mono text-[11px] uppercase tracking-wider text-brand-sun">
              Directory Summary
            </div>
            <div className="font-display text-2xl font-bold text-white mt-1">
              {categories.length} Categories
            </div>
            <div className="font-mono text-xs text-blue-200/75 mt-1">
              {totalProducts} total products listed
            </div>
          </div>
        }
      />

      {categories.length > 0 ? (
        <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-16 sm:py-20 lg:py-24">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                className="group flex flex-col justify-between rounded-xl overflow-hidden bg-white border border-brand-line shadow-xs hover:shadow-md hover:border-brand-navy/30 transition-all duration-300"
              >
                <div>
                  {/* Full-Bleed Preview Frame */}
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="relative block aspect-[16/10] w-full bg-brand-surface-alt bg-honeycomb-light overflow-hidden border-b border-brand-line/80"
                  >
                    {cat.previewImage ? (
                      <img
                        src={cat.previewImage}
                        alt={cat.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-brand-steel/45 gap-2 p-6">
                        <FolderOpen size={42} strokeWidth={1.3} />
                        <span className="font-mono text-xs uppercase tracking-wider">
                          {cat.name}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3.5 left-3.5 bg-brand-navy/90 text-white font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs">
                      Category {String(idx + 1).padStart(2, "0")}
                    </div>
                  </Link>

                  {/* Category Text + Sample Product Links */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs text-brand-steel">
                      <span>Stocked Range</span>
                      <span className="font-semibold text-brand-navy">
                        {cat.productCount}{" "}
                        {cat.productCount === 1 ? "product" : "products"}
                      </span>
                    </div>

                    <Link href={`/categories/${cat.slug}`}>
                      <h2 className="text-2xl font-display font-bold text-brand-navy group-hover:text-brand-navy-light mb-2.5">
                        {cat.name}
                      </h2>
                    </Link>
                    <p className="text-sm text-brand-muted leading-relaxed mb-5">
                      {cat.description ||
                        `View stocked ${cat.name.toLowerCase()} models, specifications, and direct quote options.`}
                    </p>

                    {cat.sampleProducts.length > 0 && (
                      <div className="pt-4 border-t border-brand-line/75">
                        <div className="font-mono text-[11px] uppercase tracking-wider text-brand-steel mb-2.5">
                          Sample Products Inside:
                        </div>
                        <ul className="space-y-2">
                          {cat.sampleProducts.map((sample) => (
                            <li key={sample.id}>
                              <Link
                                href={`/products/${sample.slug}`}
                                className="text-xs text-brand-navy hover:text-brand-sun-dark inline-flex items-center gap-1.5 font-medium"
                              >
                                <ArrowRight
                                  size={12}
                                  className="text-brand-sun-dark shrink-0"
                                />
                                <span className="truncate">{sample.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href={`/categories/${cat.slug}`}
                  className="px-6 py-4 border-t border-brand-line bg-brand-surface/50 flex items-center justify-between text-xs font-display font-bold uppercase tracking-wider text-brand-navy group-hover:bg-brand-navy group-hover:text-white transition-colors"
                >
                  <span>Open {cat.name}</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-20">
          <div className="rounded-xl bg-white border border-brand-line p-8 sm:p-12 max-w-2xl">
            <h2 className="text-2xl font-display font-bold text-brand-navy mb-3">
              Categories are being added
            </h2>
            <p className="text-base text-brand-muted mb-7">
              Reach out to our Ranigunj, Secunderabad counter on WhatsApp to ask
              for our current product stock list.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-whatsapp hover:bg-whatsapp-dark text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-lg transition-colors"
            >
              <WhatsAppIcon size={17} />
              <span>Message Sales Desk</span>
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
