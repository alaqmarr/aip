"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function bulkAddProducts(formData: FormData) {
  const csvData = formData.get("csvData") as string
  if (!csvData || csvData.trim() === '') {
    return { error: "Please provide CSV data." }
  }

  const lines = csvData.split('\n').map(line => line.trim()).filter(line => line !== '')
  
  let successCount = 0
  let errorCount = 0
  const createdProducts: { id: string, name: string }[] = []

  for (const line of lines) {
    // Basic CSV parsing (comma separated, doesn't handle quotes yet)
    // Format expected: Product Name, Category Name, Description
    const parts = line.split(',').map(p => p.trim())
    if (parts.length < 2) {
      errorCount++
      continue
    }

    const [name, categoryName, ...descParts] = parts
    const description = descParts.join(',') || ""
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4)

    try {
      // Find or create category
      let category = await prisma.category.findFirst({
        where: { name: categoryName }
      })

      if (!category) {
        const catSlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4)
        category = await prisma.category.create({
          data: {
            name: categoryName,
            slug: catSlug,
            description: ""
          }
        })
      }

      // Create product
      const prod = await prisma.product.create({
        data: {
          name,
          slug,
          description,
          categoryId: category.id,
          images: "[]"
        }
      })
      createdProducts.push({ id: prod.id, name: prod.name })
      successCount++
    } catch (err) {
      console.error(err)
      errorCount++
    }
  }

  revalidatePath('/admin/products')
  return { 
    success: `Successfully added ${successCount} products. Errors: ${errorCount}`,
    products: createdProducts 
  }
}

export async function updateProductImage(productId: string, imageUrl: string) {
  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) return { error: "Product not found" }
  
  let images = []
  try {
    images = JSON.parse(product.images || "[]")
  } catch (e) {}
  
  images.push(imageUrl)
  
  await prisma.product.update({
    where: { id: productId },
    data: { images: JSON.stringify(images) }
  })
  
  revalidatePath('/admin/products')
  return { success: true }
}
