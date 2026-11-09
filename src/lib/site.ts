export const SITE_NAME = "Alfa Industrial Products";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://alfahyd.com"
).replace(/\/$/, "");

export const DEFAULT_DESCRIPTION =
  "Wholesale trader, distributor, and supplier of pneumatic cylinders, F.R.L. combinations, PU connectors, brass & stainless steel fittings, industrial valves, and hydraulic products in Ranigunj, Secunderabad, Telangana.";

export const COMPANY_GSTIN = "36AAOFA4103E1ZV";
export const COMPANY_PARTNER = "Mr. C. Y. Abbas";
export const COMPANY_LEGAL_STATUS = "Partnership Firm";
export const COMPANY_NATURE = "Wholesale Trader, Distributor & Supplier";
export const COMPANY_HOURS = "Mon - Sat: 10:00 AM - 6:00 PM";
export const COMPANY_LANDLINE = "040-27713052";
export const COMPANY_REGISTERED_OFFICE =
  "5-5-156, Shop No. 2, Lala Temple Street, Ranigunj, Secunderabad, Telangana 500003";

export const VERIFIED_PROFILES = [
  {
    label: "IndiaMART",
    url: "https://www.indiamart.com/alfaindustrialproducts/",
  },
  {
    label: "TradeIndia",
    url: "https://www.tradeindia.com/alfa-industrial-products-7615392/",
  },
  {
    label: "JustDial",
    url: "https://www.justdial.com/Secunderabad/Alfa-Industrial-Products-Near-City-Light-Hotel-Ranigunj-Secunderabad/040PJDYPHD26042_BZDET",
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/alfahyderabad/",
  },
] as const;

export function absoluteUrl(path: string = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function parseJsonStringArray(raw?: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0
      );
    }
    return [];
  } catch {
    return [];
  }
}
