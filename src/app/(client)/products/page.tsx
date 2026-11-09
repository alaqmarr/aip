import type { Metadata } from "next";
import {
  getAllProducts,
  getAllCategories,
  getSiteSettings,
} from "@/lib/data";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import ProductsCatalogClient from "@/components/catalog/ProductsCatalogClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Industrial Products & Hardware Catalog",
  description:
    "Browse stocked pneumatic cylinders, F.R.L. combinations, PU connectors, brass & SS fittings, industrial valves, and hydraulic hardware from Alfa Industrial Products in Ranigunj, Secunderabad.",
  alternates: {
    canonical: absoluteUrl("/products"),
  },
  openGraph: {
    title: `All Industrial Products & Hardware Catalog | ${SITE_NAME}`,
    description:
      "Search and filter pneumatic products, brass & SS fittings, industrial valves, and hydraulic hardware in Secunderabad.",
    url: absoluteUrl("/products"),
    images: [{ url: "/hero-industrial.jpg", width: 1200, height: 630 }],
  },
};

export default async function ProductsPage() {
  const [allProducts, categories, settings] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getSiteSettings(),
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industrial Products Catalog | Alfa Industrial Products",
    url: absoluteUrl("/products"),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allProducts.length,
      itemListElement: allProducts.slice(0, 30).map((prod, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: absoluteUrl(`/products/${prod.slug}`),
        name: prod.name,
      })),
    },
  };

  return (
    <div className="w-full bg-brand-surface bg-honeycomb-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      <ProductsCatalogClient
        allProducts={allProducts}
        categories={categories}
        whatsappNumber={settings.whatsapp}
      />
    </div>
  );
}
