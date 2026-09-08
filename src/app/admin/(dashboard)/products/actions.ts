"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

export async function saveProduct(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const categoryId = formData.get("categoryId") as string
  
  // Collect images and features from the form
  // We expect arrays of strings, but FormData handles them differently if we don't have multiple inputs with same name.
  // Instead of complex form parsing, we can just assume the client sends JSON strings for arrays, or we take raw strings and parse them.
  const imagesRaw = formData.get("images") as string
  const featuresRaw = formData.get("features") as string

  if (!name || !categoryId) return { error: "Name and Category are required" }

  const slug = slugify(name)

  if (id) {
    await prisma.product.update({
      where: { id },
      data: { name, slug, description, categoryId, images: imagesRaw || '[]', features: featuresRaw || '[]' }
    })
  } else {
    const existing = await prisma.product.findUnique({ where: { slug } })
    if (existing) return { error: "Product with similar name already exists" }

    await prisma.product.create({
      data: { name, slug, description, categoryId, images: imagesRaw || '[]', features: featuresRaw || '[]' }
    })
  }

  revalidatePath("/admin/products")
  revalidatePath("/products")
  revalidatePath(`/products/${slug}`)
  revalidatePath(`/categories`)
  redirect("/admin/products")
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } })
  revalidatePath("/admin/products")
  revalidatePath("/products")
}
