import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import { getSiteSettings, getAllCategories, getAllProducts } from "@/lib/data";
import {
  SITE_NAME,
  COMPANY_GSTIN,
  COMPANY_HOURS,
  COMPANY_LANDLINE,
  COMPANY_LEGAL_STATUS,
  COMPANY_NATURE,
  COMPANY_PARTNER,
  COMPANY_REGISTERED_OFFICE,
  VERIFIED_PROFILES,
  absoluteUrl,
  buildWhatsAppLink,
} from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Alfa Industrial Products in Ranigunj, Secunderabad",
  description:
    "Alfa Industrial Products (GSTIN: 36AAOFA4103E1ZV) is a partnership firm in Ranigunj, Secunderabad led by Mr. C. Y. Abbas, supplying pneumatics, brass & SS fittings, valves, and hydraulic hardware.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: `About Us | ${SITE_NAME}, Ranigunj, Secunderabad`,
    description:
      "Wholesale trader, distributor, and supplier of pneumatic cylinders, F.R.L. units, PU connectors, brass & SS fittings, and industrial valves in Secunderabad, Telangana.",
    url: absoluteUrl("/about"),
    images: [{ url: "/hero-industrial.jpg", width: 1200, height: 630 }],
  },
};

export default async function AboutPage() {
  const [settings, categories, products] = await Promise.all([
    getSiteSettings(),
    getAllCategories(),
    getAllProducts(),
  ]);

  const whatsappUrl = buildWhatsAppLink(
    settings.whatsapp,
    "Hello Alfa Industrial Products, I would like to inquire about wholesale or regular industrial product supply."
  );

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${SITE_NAME}`,
    url: absoluteUrl("/about"),
    mainEntity: {
      "@type": "HardwareStore",
      name: SITE_NAME,
      taxID: COMPANY_GSTIN,
      founder: {
        "@type": "Person",
        name: COMPANY_PARTNER,
      },
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
    <div className="w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
        title="House of Pneumatics, Brass & SS Fittings in Secunderabad."
        description="Alfa Industrial Products is a registered wholesale trader, distributor, and supplier located in Ranigunj, Secunderabad, serving workshops, factories, and industrial buyers across Telangana."
        metaRight={
          <div className="rounded-xl border border-brand-line-dark bg-brand-navy-mid px-6 py-5 text-left">
            <div className="font-mono text-[11px] uppercase tracking-wider text-brand-sun">
              GST Registration
            </div>
            <div className="font-mono text-lg font-bold text-white mt-1">
              {COMPANY_GSTIN}
            </div>
            <div className="font-mono text-xs text-blue-200/75 mt-1">
              Ranigunj, Secunderabad 500003
            </div>
          </div>
        }
      />

      {/* Section 1: Verified Business Profile Cards */}
      <section className="w-full bg-brand-surface bg-honeycomb-light border-b border-brand-line px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-14 sm:py-16 lg:py-20">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="rounded-xl bg-white border border-brand-line p-6 sm:p-7 shadow-xs">
            <div className="font-mono text-xs uppercase tracking-wider text-brand-steel">
              Nature of Business
            </div>
            <div className="font-display text-2xl font-bold text-brand-navy mt-2">
              Trader &amp; Distributor
            </div>
            <p className="text-sm text-brand-muted mt-2">
              {COMPANY_NATURE}
            </p>
          </div>

          <div className="rounded-xl bg-white border border-brand-line p-6 sm:p-7 shadow-xs">
            <div className="font-mono text-xs uppercase tracking-wider text-brand-steel">
              Legal Status &amp; Partner
            </div>
            <div className="font-display text-2xl font-bold text-brand-navy mt-2">
              {COMPANY_PARTNER}
            </div>
            <p className="text-sm text-brand-muted mt-2">
              {COMPANY_LEGAL_STATUS} (GSTIN: {COMPANY_GSTIN})
            </p>
          </div>

          <div className="rounded-xl bg-white border border-brand-line p-6 sm:p-7 shadow-xs">
            <div className="font-mono text-xs uppercase tracking-wider text-brand-steel">
              Online Catalog
            </div>
            <div className="font-display text-2xl font-bold text-brand-navy mt-2">
              {categories.length} Categories
            </div>
            <p className="text-sm text-brand-muted mt-2">
              {products.length} listed products plus counter stock in Ranigunj
            </p>
          </div>

          <div className="rounded-xl bg-white border border-brand-line p-6 sm:p-7 shadow-xs">
            <div className="font-mono text-xs uppercase tracking-wider text-brand-steel">
              Working Hours
            </div>
            <div className="font-display text-2xl font-bold text-brand-navy mt-2">
              10 AM to 6 PM
            </div>
            <p className="text-sm text-brand-muted mt-2">
              Monday to Saturday (Sunday Closed)
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Company Overview & Ranigunj Store Details */}
      <section className="w-full bg-white border-b border-brand-line px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-16 sm:py-20 lg:py-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-steel">
              01 / Who We Are
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-brand-navy leading-tight">
              Your Ranigunj Counter for Pneumatic, Valve &amp; Fitting Supplies.
            </h2>
            <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
              Located in Secunderabad&apos;s main industrial hardware hub at
              Ranigunj (Near City Light Hotel, Shyam Market, Hill Street), Alfa
              Industrial Products is a partnership firm led by{" "}
              {COMPANY_PARTNER}. We operate as a wholesale trader, distributor,
              and supplier of pneumatic automation products, industrial valves,
              pipe fittings, and hydraulic accessories.
            </p>
            <p className="text-base text-brand-muted leading-relaxed">
              Known locally as a house of pneumatics, brass, and stainless steel
              fittings, we deal in prominent industry brands including Festo,
              Janatics, Jelpc, SMB, and Techno, alongside Festo-type, Shavo-type,
              and Airtech-type compatible series.
            </p>
            <p className="text-base text-brand-muted leading-relaxed">
              Whether a maintenance technician needs a single replacement PU
              connector or a factory purchase team needs bulk quantities of
              cylinders, F.R.L. combinations, ball valves, and brass fittings
              with proper GST invoicing, our counter provides clear pricing and
              prompt service.
            </p>

            {/* Verified Public Listings */}
            <div className="pt-4">
              <div className="font-mono text-xs uppercase tracking-wider text-brand-steel mb-3">
                Official Business Profiles
              </div>
              <div className="flex flex-wrap gap-3">
                {VERIFIED_PROFILES.map((profile) => (
                  <a
                    key={profile.label}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-line bg-brand-surface hover:border-brand-navy px-4 py-2.5 text-xs font-mono font-medium text-brand-navy transition-colors"
                  >
                    <span>{profile.label}</span>
                    <ArrowUpRight size={13} className="text-brand-sun-dark" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden bg-brand-navy bg-honeycomb-navy text-white border border-brand-line-dark shadow-lg">
              <div className="aspect-[16/10] w-full overflow-hidden border-b border-brand-line-dark">
                <img
                  src="/hero-industrial.jpg"
                  alt="Pneumatic valves, gauges, and industrial fittings"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-7 sm:p-8 space-y-5">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-brand-sun mb-1.5">
                    Primary Market Store
                  </div>
                  <p className="text-sm sm:text-base text-blue-100 leading-relaxed flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="text-brand-sun shrink-0 mt-1"
                    />
                    <span>{settings.address}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-line-dark">
                  <div className="font-mono text-xs uppercase tracking-wider text-brand-sun mb-1.5">
                    Registered Office (Ranigunj)
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
                    {COMPANY_REGISTERED_OFFICE}
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-line-dark flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-blue-200/85">
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                    className="hover:text-brand-sun inline-flex items-center gap-1.5"
                  >
                    <Phone size={13} className="text-brand-sun" />
                    <span>{settings.phone}</span>
                  </a>
                  <a
                    href={`tel:${COMPANY_LANDLINE.replace(/[^0-9+]/g, "")}`}
                    className="hover:text-brand-sun inline-flex items-center gap-1.5"
                  >
                    <Phone size={13} className="text-brand-sun" />
                    <span>{COMPANY_LANDLINE}</span>
                  </a>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} className="text-brand-sun" />
                    <span>{COMPANY_HOURS}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Core Product Lines Stocked (3 Spaced Cards) */}
      <section className="w-full bg-brand-surface bg-honeycomb-light border-b border-brand-line px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-16 sm:py-20 lg:py-24">
        <div className="mb-12 lg:mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-2">
            02 / Core Product Range
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-navy">
            What We Stock &amp; Supply
          </h2>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="rounded-xl bg-white border border-brand-line p-7 sm:p-9 shadow-xs">
            <div className="font-mono text-xs font-semibold text-brand-sun-dark mb-3">
              RANGE 01
            </div>
            <h3 className="text-xl font-display font-bold text-brand-navy mb-3">
              Pneumatics &amp; F.R.L. Series
            </h3>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Festo-type series valves, Festo-equivalent ADVU &amp; SDA
              cylinders, MAL cylinders, cylinder mountings, AC / Shavo-type /
              Airtech-type F.R.L. combinations, and auto drain valves.
            </p>
          </div>

          <div className="rounded-xl bg-white border border-brand-line p-7 sm:p-9 shadow-xs">
            <div className="font-mono text-xs font-semibold text-brand-sun-dark mb-3">
              RANGE 02
            </div>
            <h3 className="text-xl font-display font-bold text-brand-navy mb-3">
              Brass, SS &amp; Pipe Fittings
            </h3>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Pneumatic PU connectors, brass fittings, stainless steel (SS)
              fittings, carbon steel pipe fittings, and plumbing connectors in
              standard industrial thread sizes.
            </p>
          </div>

          <div className="rounded-xl bg-white border border-brand-line p-7 sm:p-9 shadow-xs">
            <div className="font-mono text-xs font-semibold text-brand-sun-dark mb-3">
              RANGE 03
            </div>
            <h3 className="text-xl font-display font-bold text-brand-navy mb-3">
              Valves, Hydraulics &amp; Hardware
            </h3>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Direct-acting and pilot valves, ball valves, sight glass valves,
              hydraulic quick-release couplers, pressure gauges, rubber
              diaphragms, cable terminals, lugs, and sockets.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Brands & Buyers + Direct CTA */}
      <section className="w-full bg-white px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-16 sm:py-20 lg:py-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-2">
              03 / Brands &amp; Industrial Supply
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-navy mb-8">
              Key Brands &amp; Product Lines Handled
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                "Festo & Festo-equivalent pneumatic series",
                "Janatics pneumatic valves & air preparation units",
                "Jelpc, SMB & Techno pneumatic components",
                "Shavo-type & Airtech-type F.R.L. combinations",
                "Brass, stainless steel (SS) & carbon steel fittings",
                "Hydraulic quick-release couplers & industrial valves",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-brand-surface border border-brand-line p-5 flex items-start gap-3 text-sm text-brand-navy font-medium"
                >
                  <CheckCircle2
                    size={18}
                    className="text-brand-sun-dark shrink-0 mt-0.5"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-brand-navy bg-honeycomb-navy text-white p-8 sm:p-10 border border-brand-line-dark">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                Looking for ready stock or wholesale pricing?
              </h3>
              <p className="text-sm sm:text-base text-blue-100/85 leading-relaxed mb-7">
                Browse our online products catalog or contact our Ranigunj,
                Secunderabad counter directly on WhatsApp.
              </p>
              <div className="flex flex-wrap gap-3.5">
                <Link
                  href="/products"
                  className="bg-brand-sun hover:bg-brand-sun-light text-brand-navy font-display text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-xl inline-flex items-center gap-2 transition-colors"
                >
                  <span>Browse Products Catalog</span>
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-whatsapp hover:bg-whatsapp-dark text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-xl inline-flex items-center gap-2 transition-colors"
                >
                  <WhatsAppIcon size={16} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
