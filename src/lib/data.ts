import { cache } from "react";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { parseJsonStringArray } from "@/lib/site";

export interface SiteSettings {
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
}

export interface CategoryWithMeta {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  previewImage: string | null;
  productCount: number;
  sampleProducts: { id: string; name: string; slug: string }[];
  updatedAt: string;
}

export interface ProductWithCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  primaryImage: string | null;
  features: string[];
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  address:
    "Central Bank Building, H. No. 4-3-140, Shyam Market, Hill Street, Near City Light Hotel, Ranigunj, Secunderabad, Telangana 500003",
  phone: "+91 98493 23057",
  email: "abbasalfa@yahoo.com",
  whatsapp: "+919849323057",
};

function isDummySeedValue(val?: string): boolean {
  if (!val) return true;
  const v = val.toLowerCase();
  return (
    v.includes("jeedimetla") ||
    v.includes("9876543210") ||
    v.includes("98765 43210") ||
    v.includes("alfaindustrialproducts.com")
  );
}

const fetchSettingsCached = unstable_cache(
  async (): Promise<SiteSettings> => {
    const records = await prisma.setting.findMany({
      where: {
        key: {
          in: ["ADDRESS", "CONTACT_PHONE", "CONTACT_EMAIL", "WHATSAPP_NUMBER"],
        },
      },
    });

    const map = records.reduce((acc, row) => {
      if (row.value && row.value.trim().length > 0 && !isDummySeedValue(row.value)) {
        acc[row.key] = row.value.trim();
      }
      return acc;
    }, {} as Record<string, string>);

    return {
      address: map["ADDRESS"] || DEFAULT_SETTINGS.address,
      phone: map["CONTACT_PHONE"] || DEFAULT_SETTINGS.phone,
      email: map["CONTACT_EMAIL"] || DEFAULT_SETTINGS.email,
      whatsapp:
        map["WHATSAPP_NUMBER"] ||
        map["CONTACT_PHONE"] ||
        DEFAULT_SETTINGS.whatsapp,
    };
  },
  ["site-settings"],
  { tags: ["settings"], revalidate: 3600 }
);

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  return fetchSettingsCached();
});

const fetchAllCategoriesCached = unstable_cache(
  async (): Promise<CategoryWithMeta[]> => {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: true } },
        products: {
          take: 4,
          orderBy: { createdAt: "desc" },
          select: { id: true, name: true, slug: true, images: true },
        },
      },
    });

    return categories.map((cat) => {
      let previewImage = cat.image || null;
      if (!previewImage) {
        for (const p of cat.products) {
          const imgs = parseJsonStringArray(p.images);
          if (imgs.length > 0) {
            previewImage = imgs[0];
            break;
          }
        }
      }

      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        previewImage,
        productCount: cat._count.products,
        sampleProducts: cat.products.slice(0, 3).map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
        })),
        updatedAt: cat.updatedAt.toISOString(),
      };
    });
  },
  ["all-categories"],
  { tags: ["categories", "products"], revalidate: 3600 }
);

export const getAllCategories = cache(async (): Promise<CategoryWithMeta[]> => {
  return fetchAllCategoriesCached();
});

const fetchCategoryBySlugCached = unstable_cache(
  async (slug: string) => {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!category) return null;

    const formattedProducts: ProductWithCategory[] = category.products.map(
      (p) => {
        const imgs = parseJsonStringArray(p.images);
        const feats = parseJsonStringArray(p.features);
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          images: imgs,
          primaryImage: imgs[0] || null,
          features: feats,
          categoryId: p.categoryId,
          category: {
            id: category.id,
            name: category.name,
            slug: category.slug,
          },
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        };
      }
    );

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image || formattedProducts[0]?.primaryImage || null,
      updatedAt: category.updatedAt.toISOString(),
      products: formattedProducts,
    };
  },
  ["category-by-slug"],
  { tags: ["categories", "products"], revalidate: 3600 }
);

export const getCategoryBySlug = cache(async (slug: string) => {
  return fetchCategoryBySlugCached(slug);
});

const fetchAllProductsCached = unstable_cache(
  async (): Promise<ProductWithCategory[]> => {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return products.map((p) => {
      const imgs = parseJsonStringArray(p.images);
      const feats = parseJsonStringArray(p.features);
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        images: imgs,
        primaryImage: imgs[0] || null,
        features: feats,
        categoryId: p.categoryId,
        category: p.category,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      };
    });
  },
  ["all-products"],
  { tags: ["products", "categories"], revalidate: 3600 }
);

export const getAllProducts = cache(
  async (): Promise<ProductWithCategory[]> => {
    return fetchAllProductsCached();
  }
);

const fetchProductBySlugCached = unstable_cache(
  async (slug: string): Promise<ProductWithCategory | null> => {
    const p = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    if (!p) return null;

    const imgs = parseJsonStringArray(p.images);
    const feats = parseJsonStringArray(p.features);

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      images: imgs,
      primaryImage: imgs[0] || null,
      features: feats,
      categoryId: p.categoryId,
      category: p.category,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    };
  },
  ["product-by-slug"],
  { tags: ["products", "categories"], revalidate: 3600 }
);

export const getProductBySlug = cache(
  async (slug: string): Promise<ProductWithCategory | null> => {
    return fetchProductBySlugCached(slug);
  }
);

export const getRelatedProducts = cache(
  async (
    categoryId: string,
    excludeProductId: string,
    limit = 4
  ): Promise<ProductWithCategory[]> => {
    const all = await getAllProducts();
    const sameCategory = all.filter(
      (p) => p.categoryId === categoryId && p.id !== excludeProductId
    );
    if (sameCategory.length >= limit) {
      return sameCategory.slice(0, limit);
    }
    const others = all.filter(
      (p) => p.categoryId !== categoryId && p.id !== excludeProductId
    );
    return [...sameCategory, ...others].slice(0, limit);
  }
);
