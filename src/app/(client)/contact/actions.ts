"use server";

import { getSiteSettings } from "@/lib/data";
import { buildWhatsAppLink } from "@/lib/site";

export interface InquiryActionState {
  status: "idle" | "success" | "error";
  message?: string;
  whatsappUrl?: string;
  mailtoUrl?: string;
}

export async function submitContactInquiry(
  _prevState: InquiryActionState,
  formData: FormData
): Promise<InquiryActionState> {
  const name = ((formData.get("name") as string) || "").trim();
  const company = ((formData.get("company") as string) || "").trim();
  const phone = ((formData.get("phone") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").trim();
  const productNeeded = ((formData.get("productNeeded") as string) || "").trim();
  const message = ((formData.get("message") as string) || "").trim();

  if (!name || (!phone && !email) || !message) {
    return {
      status: "error",
      message:
        "Please enter your name, a phone number or email address, and the products you need.",
    };
  }

  const settings = await getSiteSettings();

  const summaryLines = [
    `Hello Alfa Industrial Products, here is my quote request:`,
    `Name: ${name}`,
    company ? `Company: ${company}` : null,
    phone ? `Phone: ${phone}` : null,
    email ? `Email: ${email}` : null,
    productNeeded ? `Product / Category: ${productNeeded}` : null,
    `Details: ${message}`,
  ].filter(Boolean);

  const whatsappUrl = buildWhatsAppLink(
    settings.whatsapp,
    summaryLines.join("\n")
  );

  const subject = productNeeded
    ? `Product Quote Request: ${productNeeded} (${name})`
    : `Industrial Products Inquiry from ${name}`;

  const mailtoUrl = `mailto:${settings.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(summaryLines.join("\n"))}`;

  console.info("[AIP Inquiry]", {
    timestamp: new Date().toISOString(),
    name,
    company,
    phone,
    email,
    productNeeded,
    message,
  });

  return {
    status: "success",
    message:
      "Your inquiry details are ready and logged. For the fastest reply from our Ranigunj, Secunderabad counter, you can also open this exact request directly in WhatsApp or your email app below.",
    whatsappUrl,
    mailtoUrl,
  };
}
