import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import {
  SITE_NAME,
  COMPANY_GSTIN,
  COMPANY_HOURS,
  COMPANY_LANDLINE,
  COMPANY_PARTNER,
  COMPANY_REGISTERED_OFFICE,
  VERIFIED_PROFILES,
  absoluteUrl,
  buildWhatsAppLink,
} from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import ContactInquiryForm from "./ContactInquiryForm";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: "Contact Ranigunj Store & Request a Product Quote",
    description: `Call ${settings.phone} (${COMPANY_LANDLINE}), email ${settings.email}, or visit Alfa Industrial Products in Ranigunj, Secunderabad for pneumatic, fitting, and valve quotes.`,
    alternates: {
      canonical: absoluteUrl("/contact"),
    },
    openGraph: {
      title: `Contact Store & Request a Quote | ${SITE_NAME}`,
      description: `Reach Alfa Industrial Products in Ranigunj, Secunderabad at ${settings.phone} or send your product list online.`,
      url: absoluteUrl("/contact"),
      images: [{ url: "/hero-industrial.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function ContactPage() {
  const settings = await getSiteSettings();

  const whatsappUrl = buildWhatsAppLink(
    settings.whatsapp,
    "Hello Alfa Industrial Products, I would like to request a quote for industrial products."
  );

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE_NAME}`,
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "HardwareStore",
      name: SITE_NAME,
      taxID: COMPANY_GSTIN,
      telephone: settings.phone,
      email: settings.email,
      openingHours: "Mo-Sa 10:00-18:00",
      address: {
        "@type": "PostalAddress",
        streetAddress: settings.address,
        addressLocality: "Secunderabad",
        addressRegion: "Telangana",
        postalCode: "500003",
        addressCountry: "IN",
      },
      sameAs: VERIFIED_PROFILES.map((p) => p.url),
    },
  };

  return (
    <div className="w-full bg-brand-surface bg-honeycomb-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        title="Contact Our Ranigunj Store"
        description="Need wholesale rates, retail counter pickup, or help matching a pneumatic cylinder, F.R.L. unit, valve, or pipe fitting? Reach our Secunderabad counter directly below."
        metaRight={
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-whatsapp hover:bg-whatsapp-dark text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition-colors"
          >
            <WhatsAppIcon size={18} />
            <span>Open WhatsApp Chat</span>
          </a>
        }
      />

      {/* Spacious Full-Width 12-Column Contact Split */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-16 sm:py-20 lg:py-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 5 Columns: Database-Controlled Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl bg-white border border-brand-line p-7 sm:p-8 shadow-xs">
              <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-2">
                Mobile, Landline &amp; WhatsApp
              </div>
              <a
                href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="block text-2xl sm:text-3xl font-display font-bold text-brand-navy hover:text-brand-navy-light mb-1.5"
              >
                {settings.phone}
              </a>
              <div className="font-mono text-xs text-brand-steel mb-3 space-y-1">
                <div>
                  Landline:{" "}
                  <a
                    href={`tel:${COMPANY_LANDLINE.replace(/[^0-9+]/g, "")}`}
                    className="text-brand-navy hover:text-brand-sun-dark font-medium"
                  >
                    {COMPANY_LANDLINE}
                  </a>
                </div>
                <div className="inline-flex items-center gap-1.5">
                  <Clock size={13} className="text-brand-sun-dark" />
                  <span>{COMPANY_HOURS} (Sunday Closed)</span>
                </div>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed mb-5">
                Contact {COMPANY_PARTNER} or our counter staff during store
                hours, or message us on WhatsApp with product photos and sizes.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-colors"
                >
                  <Phone size={14} />
                  <span>Call Mobile</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white font-display text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-colors"
                >
                  <WhatsAppIcon size={15} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-brand-line p-7 sm:p-8 shadow-xs">
              <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-2">
                Email for Product Lists &amp; GST Quotes
              </div>
              <a
                href={`mailto:${settings.email}`}
                className="block text-lg sm:text-xl font-display font-bold text-brand-navy hover:text-brand-sun-dark break-all mb-2.5"
              >
                {settings.email}
              </a>
              <p className="text-sm text-brand-muted inline-flex items-center gap-2">
                <Mail size={15} className="text-brand-sun-dark shrink-0" />
                <span>Send purchase lists, thread sizes, or RFQ sheets.</span>
              </p>
            </div>

            <div className="rounded-xl bg-white border border-brand-line p-7 sm:p-8 shadow-xs space-y-5">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-2.5">
                  Ranigunj Store &amp; Counter Address
                </div>
                <div className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="text-brand-sun-dark shrink-0 mt-1"
                  />
                  <p className="text-base text-brand-navy font-medium leading-relaxed">
                    {settings.address}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-line text-xs font-mono text-brand-muted space-y-1.5">
                <div>
                  <strong className="text-brand-navy">Registered Office:</strong>{" "}
                  {COMPANY_REGISTERED_OFFICE}
                </div>
                <div>
                  <strong className="text-brand-navy">GSTIN:</strong>{" "}
                  {COMPANY_GSTIN}
                </div>
              </div>

              <div className="pt-4 border-t border-brand-line">
                <div className="font-mono text-[11px] uppercase tracking-wider text-brand-steel mb-2.5">
                  Verified Business Listings
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {VERIFIED_PROFILES.map((profile) => (
                    <a
                      key={profile.label}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-brand-line bg-brand-surface hover:border-brand-navy px-3 py-1.5 text-xs font-mono text-brand-navy transition-colors"
                    >
                      <span>{profile.label}</span>
                      <ArrowUpRight size={12} className="text-brand-sun-dark" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Server-Action Quote Request Form Card */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-brand-line p-7 sm:p-10 lg:p-12 shadow-xs">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-2">
              Online Quote Form
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-navy mb-2.5">
              Send Your Product Requirement
            </h2>
            <p className="text-sm sm:text-base text-brand-muted mb-8 max-w-2xl leading-relaxed">
              Fill out the details below. You can enter a single replacement
              product or paste a full wholesale list of cylinders, F.R.L. units,
              fittings, and valves.
            </p>

            <ContactInquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
