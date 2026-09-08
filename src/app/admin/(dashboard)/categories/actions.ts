"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

export async function saveCategory(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  
  if (!name) return { error: "Name is required" }

  const slug = slugify(name)

  if (id) {
    await prisma.category.update({
      where: { id },
      data: { name, slug, description, image }
    })
  } else {
    // check if slug exists
    const existing = await prisma.category.findUnique({ where: { slug } })
    if (existing) return { error: "Category with similar name already exists" }

    await prisma.category.create({
      data: { name, slug, description, image }
    })
  }

  revalidatePath("/admin/categories")
  revalidatePath("/categories")
  revalidatePath("/")
  redirect("/admin/categories")
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } })
    revalidatePath("/admin/categories")
    revalidatePath("/categories")
    revalidatePath("/")
  } catch (error) {
    return { error: "Cannot delete category with associated products" }
  }
}
