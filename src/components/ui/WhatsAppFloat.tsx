"use client";

import { useState, useEffect } from "react";
import { buildWhatsAppLink } from "@/lib/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

interface WhatsAppFloatProps {
  phoneNumber: string;
  productName?: string;
}

export default function WhatsAppFloat({
  phoneNumber,
  productName,
}: WhatsAppFloatProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 220);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const message = productName
    ? `Hello Alfa Industrial Products, I want to check price and stock for ${productName}.`
    : "Hello Alfa Industrial Products, I need a quote for industrial products.";

  const whatsappUrl = buildWhatsAppLink(phoneNumber, message);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          productName
            ? `WhatsApp inquiry for ${productName}`
            : "Chat with sales on WhatsApp"
        }
        className="inline-flex items-center gap-3 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white pl-4 pr-5 py-3.5 shadow-[0_10px_28px_rgba(31,168,85,0.35)] hover:-translate-y-0.5 transition-all duration-200"
      >
        <WhatsAppIcon size={22} />
        <span className="font-display text-sm font-semibold tracking-tight max-w-[190px] truncate">
          {productName ? `Ask about ${productName}` : "WhatsApp Sales"}
        </span>
      </a>
    </div>
  );
}
