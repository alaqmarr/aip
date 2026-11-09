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

export async function saveCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = ((formData.get("name") as string) || "").trim();
  const description = ((formData.get("description") as string) || "").trim();
  const image = ((formData.get("image") as string) || "").trim();

  if (!name) return { error: "Category name is required" };

  const slug = slugify(name);

  if (id) {
    await prisma.category.update({
      where: { id },
      data: { name, slug, description, image },
    });
  } else {
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return { error: "A category with a similar name already exists" };
    }

    await prisma.category.create({
      data: { name, slug, description, image },
    });
  }

  updateTag("categories");
  updateTag("products");
  revalidatePath("/", "layout");
  revalidatePath("/admin/categories");
  revalidatePath("/categories");
  revalidatePath(`/categories/${slug}`);
  revalidatePath("/sitemap.xml");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    updateTag("categories");
    updateTag("products");
    revalidatePath("/", "layout");
    revalidatePath("/admin/categories");
    revalidatePath("/categories");
    revalidatePath("/sitemap.xml");
  } catch {
    return { error: "Move or delete products in this category before removing it" };
  }
}
