"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function createAdminUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  if (!email || !password) {
    return { error: "Email and password are required." }
  }

  // Double check no user exists
  const count = await prisma.user.count()
  if (count > 0) {
    return { error: "An admin user already exists." }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })
  } catch (error) {
    return { error: "Failed to create user." }
  }

  redirect("/admin/login")
}
