import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  getSiteSettings,
} from "@/lib/data";
import {
  SITE_NAME,
  COMPANY_GSTIN,
  COMPANY_HOURS,
  absoluteUrl,
  buildWhatsAppLink,
} from "@/lib/site";
import ProductImageGallery from "@/components/catalog/ProductImageGallery";
import ProductCard from "@/components/ui/ProductCard";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export const revalidate = 3600;

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const ogImage = product.primaryImage || "/hero-industrial.jpg";
  const plainDesc =
    product.description ||
    `Buy ${product.name} in the ${product.category.name} range from Alfa Industrial Products in Ranigunj, Secunderabad. Available for wholesale and retail orders.`;

  return {
    title: `${product.name} (${product.category.name})`,
    description: plainDesc.slice(0, 160),
    alternates: {
      canonical: absoluteUrl(`/products/${product.slug}`),
    },
    openGraph: {
      title: `${product.name} | ${SITE_NAME}`,
      description: plainDesc.slice(0, 160),
      url: absoluteUrl(`/products/${product.slug}`),
      images: [{ url: ogImage, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${SITE_NAME}`,
      description: plainDesc.slice(0, 160),
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(
    product.categoryId,
    product.id,
    4
  );

  const refCode = `AIP-${product.id.slice(-5).toUpperCase()}`;
  const whatsappUrl = buildWhatsAppLink(
    settings.whatsapp,
    `Hello Alfa Industrial Products, I need pricing and stock details for ${product.name} (Product Code: ${refCode}).`
  );

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: refCode,
    category: product.category.name,
    description: product.description,
    image:
      product.images.length > 0
        ? product.images
        : [absoluteUrl("/hero-industrial.jpg")],
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };

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
        name: "All Products",
        item: absoluteUrl("/products"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category.name,
        item: absoluteUrl(`/categories/${product.category.slug}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: absoluteUrl(`/products/${product.slug}`),
      },
    ],
  };

  return (
    <div className="w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Top Full-Width Breadcrumb & Product Code Bar */}
      <div className="w-full bg-brand-navy bg-honeycomb-navy text-blue-100/85 border-b border-brand-line-dark px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-brand-sun transition-colors">
            Home
          </Link>
          <span className="text-brand-sun/60">/</span>
          <Link
            href="/products"
            className="hover:text-brand-sun transition-colors"
          >
            All Products
          </Link>
          <span className="text-brand-sun/60">/</span>
          <Link
            href={`/categories/${product.category.slug}`}
            className="hover:text-brand-sun transition-colors"
          >
            {product.category.name}
          </Link>
          <span className="text-brand-sun/60">/</span>
          <span className="text-brand-sun font-medium">{product.name}</span>
        </nav>

        <span className="text-blue-200/80 uppercase tracking-wider">
          Product Code: {refCode}
        </span>
      </div>

      {/* Main Full-Width Spacious 12-Column Product Detail Section */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-12 sm:py-16 lg:py-20 border-b border-brand-line">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left 6 Columns: Full-Fill Gallery + Quality Card */}
          <div className="lg:col-span-6 space-y-6">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
            />

            {/* Store & Dispatch Info Underneath Image */}
            <div className="rounded-xl border border-brand-line bg-brand-surface p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-brand-steel">
                  Ranigunj Store Supply
                </div>
                <p className="text-sm text-brand-muted mt-1">
                  Available for counter pickup in Secunderabad or transport
                  dispatch ({COMPANY_HOURS}).
                </p>
              </div>
              <Link
                href={`/categories/${product.category.slug}`}
                className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-sun-dark shrink-0 inline-flex items-center gap-1.5"
              >
                <span>More in {product.category.name}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right 6 Columns: Product Information, Specs Table & Direct Quote Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-brand-steel mb-3">
                <Link
                  href={`/categories/${product.category.slug}`}
                  className="text-brand-sun-dark hover:underline font-semibold"
                >
                  {product.category.name}
                </Link>
                <span>|</span>
                <span>Product Code: {refCode}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-display font-bold text-brand-navy leading-[1.12] mb-5">
                {product.name}
              </h1>

              <p className="text-base sm:text-lg text-brand-muted leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Key Features List (if present) */}
              {product.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-3.5">
                    Product Specifications &amp; Highlights
                  </h2>
                  <ul className="rounded-xl border border-brand-line divide-y divide-brand-line bg-brand-surface/60 overflow-hidden">
                    {product.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="px-5 py-3.5 flex items-start gap-3 text-sm text-brand-navy"
                      >
                        <CheckCircle2
                          size={17}
                          className="text-brand-sun-dark shrink-0 mt-0.5"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Standard Supply Information HTML Table */}
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-3.5">
                  Supply &amp; Ordering Details
                </h2>
                <div className="rounded-xl border border-brand-line overflow-hidden">
                  <table className="w-full text-sm text-left border-collapse">
                    <tbody className="divide-y divide-brand-line">
                      <tr>
                        <th className="w-2/5 bg-brand-surface px-5 py-3.5 font-mono text-xs uppercase text-brand-steel font-medium">
                          Product Code
                        </th>
                        <td className="px-5 py-3.5 font-mono text-brand-navy">
                          {refCode}
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-brand-surface px-5 py-3.5 font-mono text-xs uppercase text-brand-steel font-medium">
                          Category
                        </th>
                        <td className="px-5 py-3.5 text-brand-navy font-medium">
                          <Link
                            href={`/categories/${product.category.slug}`}
                            className="hover:text-brand-sun-dark underline underline-offset-2"
                          >
                            {product.category.name}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-brand-surface px-5 py-3.5 font-mono text-xs uppercase text-brand-steel font-medium">
                          Supply Type
                        </th>
                        <td className="px-5 py-3.5 text-brand-navy">
                          Wholesale &amp; retail supply (GSTIN: {COMPANY_GSTIN})
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-brand-surface px-5 py-3.5 font-mono text-xs uppercase text-brand-steel font-medium">
                          Store Timings
                        </th>
                        <td className="px-5 py-3.5 text-brand-navy">
                          {COMPANY_HOURS}
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-brand-surface px-5 py-3.5 font-mono text-xs uppercase text-brand-steel font-medium">
                          Store Location
                        </th>
                        <td className="px-5 py-3.5 text-brand-navy">
                          Ranigunj, Secunderabad, Telangana 500003
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Direct Purchase / Quote Action Box */}
            <div className="rounded-2xl bg-brand-navy bg-honeycomb-navy text-white p-6 sm:p-8 border border-brand-line-dark">
              <div className="font-mono text-xs uppercase tracking-wider text-brand-sun mb-2">
                Wholesale &amp; Counter Pricing
              </div>
              <p className="text-sm sm:text-base text-blue-100/85 leading-relaxed mb-6">
                Share your required quantity or size to get current stock
                availability and pricing from our Ranigunj counter.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 mb-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-whatsapp hover:bg-whatsapp-dark text-white font-display font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-xl inline-flex items-center justify-center gap-2.5 transition-colors"
                >
                  <WhatsAppIcon size={19} />
                  <span>Ask Price on WhatsApp</span>
                </a>

                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="flex-1 border border-brand-line-dark bg-brand-navy-mid hover:bg-brand-navy-light text-white font-display font-semibold text-sm uppercase tracking-wider py-4 px-6 rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Request Written Quote</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="pt-5 border-t border-brand-line-dark flex flex-wrap items-center gap-6 text-xs font-mono text-blue-200/85">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  className="hover:text-brand-sun inline-flex items-center gap-1.5"
                >
                  <Phone size={13} className="text-brand-sun" />
                  <span>{settings.phone}</span>
                </a>
                <a
                  href={`mailto:${settings.email}?subject=${encodeURIComponent(`Quote Request: ${product.name}`)}`}
                  className="hover:text-brand-sun inline-flex items-center gap-1.5"
                >
                  <Mail size={13} className="text-brand-sun" />
                  <span>{settings.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section (Full-Width, Spacious Rhythm) */}
      {relatedProducts.length > 0 && (
        <section className="w-full bg-brand-surface bg-honeycomb-light px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-12">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-2">
                More Products to Compare
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-navy">
                Other Stocked Industrial Products
              </h2>
            </div>
            <Link
              href="/products"
              className="font-display text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-sun-dark inline-flex items-center gap-1.5"
            >
              <span>All Products</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                whatsappNumber={settings.whatsapp}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
