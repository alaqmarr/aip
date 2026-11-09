"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function saveProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const name = ((formData.get("name") as string) || "").trim();
  const description = ((formData.get("description") as string) || "").trim();
  const categoryId = formData.get("categoryId") as string;
  const imagesRaw = formData.get("images") as string;
  const featuresRaw = formData.get("features") as string;

  if (!name || !categoryId) {
    return { error: "Product name and category are required" };
  }

  const slug = slugify(name);

  if (id) {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        categoryId,
        images: imagesRaw || "[]",
        features: featuresRaw || "[]",
      },
    });
  } else {
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return { error: "A product with a similar name already exists" };
    }

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        categoryId,
        images: imagesRaw || "[]",
        features: featuresRaw || "[]",
      },
    });
  }

  updateTag("products");
  updateTag("categories");
  revalidatePath("/", "layout");
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/categories");
  revalidatePath("/sitemap.xml");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  updateTag("products");
  updateTag("categories");
  revalidatePath("/", "layout");
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/categories");
  revalidatePath("/sitemap.xml");
}
