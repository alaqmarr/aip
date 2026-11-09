"use server";

import prisma from "@/lib/prisma";
import { revalidatePath, updateTag } from "next/cache";

export async function saveSettings(formData: FormData) {
  const keys = [
    "WHATSAPP_NUMBER",
    "CONTACT_PHONE",
    "CONTACT_EMAIL",
    "ADDRESS",
  ];

  for (const key of keys) {
    const value = formData.get(key) as string;
    if (value !== null && value !== undefined) {
      await prisma.setting.upsert({
        where: { key },
        update: { value: value.trim() },
        create: { key, value: value.trim() },
      });
    }
  }

  updateTag("settings");
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  revalidatePath("/contact");
  revalidatePath("/about");
  return { success: true };
}
