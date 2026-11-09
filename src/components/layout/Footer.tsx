import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { getSiteSettings, getAllCategories } from "@/lib/data";
import {
  buildWhatsAppLink,
  COMPANY_GSTIN,
  COMPANY_HOURS,
  COMPANY_LANDLINE,
  VERIFIED_PROFILES,
} from "@/lib/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default async function Footer() {
  const [settings, categories] = await Promise.all([
    getSiteSettings(),
    getAllCategories(),
  ]);

  const whatsappUrl = buildWhatsAppLink(
    settings.whatsapp,
    "Hello Alfa Industrial Products, I have an inquiry regarding your pneumatic, fitting, or valve products."
  );

  return (
    <footer className="w-full bg-brand-navy bg-honeycomb-navy text-blue-100 border-t border-brand-line-dark">
      {/* Main Footer Grid with 8pt Macro Padding & Gutters */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Verified Company Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <img
                  src="/logo.jpeg"
                  alt="Alfa Industrial Products"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white leading-none">
                  ALFA INDUSTRIAL
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-sun mt-1">
                  Products &amp; Supply
                </div>
              </div>
            </Link>

            <p className="text-sm text-blue-100/85 leading-relaxed max-w-md">
              Wholesale trader, distributor, and supplier of pneumatic cylinders,
              F.R.L. combinations, PU connectors, brass &amp; stainless steel
              fittings, industrial valves, and hydraulic hardware in Ranigunj,
              Secunderabad.
            </p>

            <div className="font-mono text-xs text-blue-200/80 space-y-1">
              <div>GSTIN: {COMPANY_GSTIN}</div>
              <div className="inline-flex items-center gap-2">
                <Clock size={13} className="text-brand-sun" />
                <span>{COMPANY_HOURS}</span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg bg-whatsapp hover:bg-whatsapp-dark text-white font-display font-bold text-xs uppercase tracking-wider px-5 py-3.5 transition-colors"
            >
              <WhatsAppIcon size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2">
            <h2 className="font-mono text-xs uppercase tracking-widest text-brand-sun mb-6">
              Navigation
            </h2>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-blue-100/80 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-blue-100/80 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-blue-100/80 hover:text-white transition-colors"
                >
                  Product Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-blue-100/80 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-blue-100/80 hover:text-white transition-colors"
                >
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="text-blue-200/60 hover:text-brand-sun transition-colors text-xs font-mono"
                >
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Dynamic Categories from DB */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-brand-sun mb-6">
              Product Categories
            </h2>
            {categories.length > 0 ? (
              <ul className="space-y-3.5 text-sm">
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="text-blue-100/80 hover:text-white transition-colors inline-flex items-center justify-between w-full gap-3"
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="font-mono text-xs text-blue-300/65 shrink-0">
                        ({cat.productCount})
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-blue-200/65 leading-relaxed">
                Browse our full catalog on the products page for current stock.
              </p>
            )}
          </div>

          {/* Column 4: Database-Controlled Contact Details */}
          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-brand-sun mb-6">
              Ranigunj Store Contact
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-sun shrink-0 mt-0.5" />
                <span className="text-blue-100/85 leading-relaxed">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-sun shrink-0" />
                <div className="font-mono text-blue-100/90 space-x-2">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                    className="hover:text-brand-sun transition-colors"
                  >
                    {settings.phone}
                  </a>
                  <span className="text-blue-300/50">/</span>
                  <a
                    href={`tel:${COMPANY_LANDLINE.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-brand-sun transition-colors"
                  >
                    {COMPANY_LANDLINE}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-sun shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-blue-100/90 hover:text-brand-sun transition-colors break-all"
                >
                  {settings.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-brand-line-dark">
              <div className="font-mono text-[11px] uppercase tracking-wider text-blue-200/70 mb-2.5">
                Verified Directory Listings
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono">
                {VERIFIED_PROFILES.map((profile) => (
                  <a
                    key={profile.label}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-sun hover:text-brand-sun-light inline-flex items-center gap-1"
                  >
                    <span>{profile.label}</span>
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Sitemap Strip */}
      <div className="w-full border-t border-brand-line-dark px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/65 font-mono">
        <p>
          &copy; {new Date().getFullYear()} Alfa Industrial Products. Ranigunj,
          Secunderabad, Telangana 500003.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/sitemap.xml"
            className="hover:text-brand-sun transition-colors"
          >
            Sitemap
          </Link>
          <Link
            href="/contact"
            className="hover:text-brand-sun transition-colors"
          >
            Contact Store
          </Link>
        </div>
      </div>
    </footer>
  );
}
