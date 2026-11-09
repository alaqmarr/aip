"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, updateTag } from "next/cache";

export async function bulkAddProducts(formData: FormData) {
  const csvData = formData.get("csvData") as string;

  if (!csvData || !csvData.trim()) {
    return { error: "Please paste CSV lines before importing." };
  }

  const lines = csvData.trim().split("\n");

  let successCount = 0;
  let errorCount = 0;
  const createdProducts: { id: string; name: string }[] = [];

  for (const line of lines) {
    const columns = line.split(",").map((s) => s.trim());
    if (columns.length < 2) {
      errorCount++;
      continue;
    }

    const [name, categoryName, ...descColumns] = columns;
    const description = descColumns.join(", ");
    const slug =
      name.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
      "-" +
      Date.now().toString().slice(-4) +
      Math.floor(Math.random() * 100);

    try {
      let category = await prisma.category.findFirst({
        where: { name: categoryName },
      });

      if (!category) {
        const catSlug =
          categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
          "-" +
          Date.now().toString().slice(-4);
        category = await prisma.category.create({
          data: {
            name: categoryName,
            slug: catSlug,
            description: "",
          },
        });
      }

      const prod = await prisma.product.create({
        data: {
          name,
          slug,
          description,
          categoryId: category.id,
          images: "[]",
        },
      });
      createdProducts.push({ id: prod.id, name: prod.name });
      successCount++;
    } catch (err) {
      console.error(err);
      errorCount++;
    }
  }

  updateTag("products");
  updateTag("categories");
  revalidatePath("/", "layout");
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/categories");
  revalidatePath("/sitemap.xml");

  return {
    success: `Imported ${successCount} products. Skipped lines: ${errorCount}`,
    products: createdProducts,
  };
}

export async function updateProductImage(productId: string, imageUrl: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return { error: "Product not found" };

  let images: string[] = [];
  try {
    images = JSON.parse(product.images || "[]");
  } catch {
    images = [];
  }

  images.push(imageUrl);

  await prisma.product.update({
    where: { id: productId },
    data: { images: JSON.stringify(images) },
  });

  updateTag("products");
  updateTag("categories");
  revalidatePath("/", "layout");
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
  return { success: true };
}
