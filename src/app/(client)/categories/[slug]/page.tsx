import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getAllCategories,
  getCategoryBySlug,
  getSiteSettings,
} from "@/lib/data";
import { SITE_NAME, absoluteUrl, buildWhatsAppLink } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export const revalidate = 3600;

interface CategoryDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
      robots: { index: false, follow: false },
    };
  }

  const desc =
    category.description ||
    `Browse stocked ${category.name} products from Alfa Industrial Products in Ranigunj, Secunderabad. Available for wholesale and retail orders.`;

  const ogImg = category.image || "/hero-industrial.jpg";

  return {
    title: `${category.name} Products & Hardware`,
    description: desc.slice(0, 160),
    alternates: {
      canonical: absoluteUrl(`/categories/${category.slug}`),
    },
    openGraph: {
      title: `${category.name} Products | ${SITE_NAME}`,
      description: desc.slice(0, 160),
      url: absoluteUrl(`/categories/${category.slug}`),
      images: [{ url: ogImg, alt: category.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} Products | ${SITE_NAME}`,
      description: desc.slice(0, 160),
      images: [ogImg],
    },
  };
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailProps) {
  const { slug } = await params;
  const [category, allCategories, settings] = await Promise.all([
    getCategoryBySlug(slug),
    getAllCategories(),
    getSiteSettings(),
  ]);

  if (!category) notFound();

  const whatsappUrl = buildWhatsAppLink(
    settings.whatsapp,
    `Hello Alfa Industrial Products, I am looking for products in your ${category.name} category.`
  );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: absoluteUrl("/categories"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: absoluteUrl(`/categories/${category.slug}`),
      },
    ],
  };

  return (
    <div className="w-full bg-brand-surface bg-honeycomb-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
        title={category.name}
        description={
          category.description ||
          `Showing all stocked ${category.name.toLowerCase()} products available for counter pickup or wholesale orders in Secunderabad.`
        }
        metaRight={
          <div className="rounded-xl border border-brand-line-dark bg-brand-navy-mid px-6 py-5 text-left">
            <div className="font-mono text-[11px] uppercase tracking-wider text-brand-sun">
              In This Category
            </div>
            <div className="font-display text-2xl font-bold text-white mt-1">
              {category.products.length}{" "}
              {category.products.length === 1 ? "Product" : "Products"}
            </div>
            <Link
              href={`/products?category=${encodeURIComponent(category.slug)}`}
              className="font-mono text-xs text-brand-sun hover:underline mt-1.5 inline-flex items-center gap-1"
            >
              <span>Filter &amp; search within category</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        }
      />

      {/* Horizontal Category Switcher Bar */}
      <div className="w-full bg-white border-b border-brand-line px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-4 flex items-center gap-2.5 overflow-x-auto">
        <span className="font-mono text-xs text-brand-muted uppercase tracking-wider mr-2 shrink-0">
          Switch Category:
        </span>
        {allCategories.map((c) => {
          const isCurrent = c.slug === category.slug;
          return (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              className={`px-4 py-2 rounded-lg text-xs font-display font-semibold shrink-0 border transition-colors ${
                isCurrent
                  ? "bg-brand-navy text-white border-brand-navy"
                  : "bg-brand-surface text-brand-navy border-brand-line hover:border-brand-navy"
              }`}
            >
              {c.name} ({c.productCount})
            </Link>
          );
        })}
      </div>

      {/* Spacious Full-Width Product Grid */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-14 sm:py-16 lg:py-20">
        {category.products.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {category.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={settings.whatsapp}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white border border-brand-line p-8 sm:p-12 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-navy mb-3">
              Online photos for {category.name} are being added
            </h2>
            <p className="text-base text-brand-muted leading-relaxed mb-7">
              We carry {category.name.toLowerCase()} in physical inventory at
              our Ranigunj, Secunderabad store. Message us your required size or
              product code for an immediate stock check.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-whatsapp hover:bg-whatsapp-dark text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <WhatsAppIcon size={16} />
                <span>Ask for {category.name} Stock</span>
              </a>
              <Link
                href="/categories"
                className="bg-brand-navy hover:bg-brand-navy-light text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg transition-colors"
              >
                Back to All Categories
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
