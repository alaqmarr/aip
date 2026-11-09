"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, Phone, ArrowUpRight } from "lucide-react";
import InlineLoader from "@/components/ui/InlineLoader";

interface NavbarClientProps {
  phone: string;
  email: string;
  address: string;
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavbarClient({
  phone,
  email,
  address,
}: NavbarClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    startTransition(() => {
      router.push(
        trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products"
      );
      setMobileOpen(false);
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-brand-line">
      {/* Top Utility Strip */}
      <div className="w-full bg-brand-navy text-blue-100/85 border-b border-brand-line-dark">
        <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 h-10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-6 truncate">
            <span className="truncate hidden sm:inline">
              Store: {address}
            </span>
            <span className="sm:hidden truncate">Ranigunj, Secunderabad</span>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="hover:text-brand-sun transition-colors inline-flex items-center gap-2"
            >
              <Phone size={13} className="text-brand-sun" />
              <span>{phone}</span>
            </a>
            <span className="hidden md:inline text-brand-line-dark">|</span>
            <a
              href={`mailto:${email}`}
              className="hidden md:inline hover:text-brand-sun transition-colors"
            >
              {email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Full-Width Navigation Row */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 h-20 flex items-center justify-between gap-8">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
          <div className="h-12 w-12 rounded-lg bg-white border border-brand-line p-1 flex items-center justify-center overflow-hidden">
            <img
              src="/logo.jpeg"
              alt="Alfa Industrial Products logo"
              width={44}
              height={44}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-brand-navy leading-none">
              ALFA INDUSTRIAL
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-steel mt-1">
              Products &amp; Supply
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-2 h-full"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`h-full inline-flex items-center px-4 text-sm font-display font-semibold tracking-tight border-b-2 transition-colors ${
                  active
                    ? "border-brand-sun text-brand-navy"
                    : "border-transparent text-brand-steel hover:text-brand-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick Product Search + Quote CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <form onSubmit={handleQuickSearch} className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cylinders, fittings, valves..."
              aria-label="Search catalog products"
              className="w-56 xl:w-72 h-11 pl-4 pr-10 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy placeholder:text-brand-muted focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
            />
            <button
              type="submit"
              aria-label="Run product search"
              className="absolute right-0 top-0 h-11 w-10 flex items-center justify-center text-brand-steel hover:text-brand-navy"
            >
              {isPending ? (
                <InlineLoader size="xs" tone="navy" />
              ) : (
                <Search size={16} />
              )}
            </button>
          </form>

          <Link
            href="/contact"
            className="h-11 px-5 rounded-lg bg-brand-sun hover:bg-brand-sun-light text-brand-navy font-display font-bold text-sm inline-flex items-center gap-2 transition-colors"
          >
            <span>Request Quote</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          className="lg:hidden h-11 w-11 rounded-lg border border-brand-line bg-brand-surface flex items-center justify-center text-brand-navy"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden w-full bg-white border-t border-brand-line px-6 py-6 space-y-5">
          <form onSubmit={handleQuickSearch} className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cylinders, fittings, valves..."
              className="w-full h-11 pl-4 pr-10 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy placeholder:text-brand-muted focus:outline-none focus:border-brand-navy"
            />
            <button
              type="submit"
              aria-label="Search products"
              className="absolute right-0 top-0 h-11 w-10 flex items-center justify-center text-brand-navy"
            >
              {isPending ? (
                <InlineLoader size="xs" tone="navy" />
              ) : (
                <Search size={16} />
              )}
            </button>
          </form>

          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3.5 rounded-lg text-sm font-display font-semibold flex items-center justify-between ${
                  isActive(item.href)
                    ? "bg-brand-navy text-white"
                    : "bg-brand-surface text-brand-navy hover:bg-brand-surface-alt"
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="w-full h-12 rounded-lg bg-brand-sun text-brand-navy font-display font-bold text-sm flex items-center justify-center gap-2"
          >
            <span>Send Product List for Quote</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </header>
  );
}
