"use client"
import { MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface WhatsAppFloatProps {
  phoneNumber: string
  productName?: string
}

export default function WhatsAppFloat({ phoneNumber, productName }: WhatsAppFloatProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show after scrolling down a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const defaultMessage = productName 
    ? `Hello Alfa Industrial Products, I am interested in inquiring about ${productName}. Could you provide more details?`
    : `Hello Alfa Industrial Products, I have an inquiry.`
    
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          {productName && (
            <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 text-sm font-medium text-gray-700 max-w-[200px] truncate">
              Inquire about {productName}
            </div>
          )}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#20bd5a] hover:scale-110 transition-all flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            <MessageCircle size={32} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
