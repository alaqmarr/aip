"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false
    return pathname?.startsWith(path)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center pt-4 sm:pt-6 px-4 ${
        scrolled ? "pt-2 sm:pt-4" : ""
      }`}>
        <div className={`w-full max-w-7xl transition-all duration-500 rounded-2xl sm:rounded-full bg-white/85 backdrop-blur-2xl border border-gray-200/50 flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white/95" : "shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        }`}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-brand-navy shadow-sm flex items-center justify-center border border-brand-navy-light group-hover:shadow-md group-hover:scale-105 transition-all">
              <span className="text-brand-sun font-black text-xl">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight leading-none text-brand-navy">Alfa Industrial</span>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] mt-1 text-brand-sun-dark">Products</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-gray-50/80 border border-gray-100 rounded-full px-1.5 py-1.5 shadow-inner gap-1">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  isActive(link.href) 
                    ? "bg-white text-brand-navy shadow-[0_2px_10px_rgba(0,0,0,0.05)]" 
                    : "text-gray-500 hover:text-brand-navy hover:bg-gray-100/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:flex items-center shrink-0">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold rounded-full transition-all gap-2 bg-brand-navy text-white hover:bg-brand-sun hover:text-brand-navy shadow-[0_4px_15px_rgba(11,34,65,0.15)] hover:shadow-[0_4px_20px_rgba(249,168,38,0.3)] hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-brand-navy bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden fixed top-[80px] left-4 right-4 bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-3xl shadow-2xl transition-all duration-300 origin-top ${
          isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"
        }`}>
          <div className="p-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-4 rounded-2xl text-base font-bold transition-colors ${
                  isActive(link.href)
                    ? "bg-brand-sun/10 text-brand-sun-dark"
                    : "text-gray-600 hover:bg-gray-50 hover:text-brand-navy"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center px-4 py-4 rounded-2xl text-white bg-brand-navy hover:bg-brand-sun hover:text-brand-navy font-bold shadow-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
