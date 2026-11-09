import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";
import type { ProductWithCategory } from "@/lib/data";
import { buildWhatsAppLink } from "@/lib/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

interface ProductCardProps {
  product: ProductWithCategory;
  whatsappNumber: string;
}

export default function ProductCard({
  product,
  whatsappNumber,
}: ProductCardProps) {
  const refCode = `AIP-${product.id.slice(-5).toUpperCase()}`;
  const whatsappUrl = buildWhatsAppLink(
    whatsappNumber,
    `Hello Alfa Industrial Products, I need pricing and availability for ${product.name} (Code: ${refCode}).`
  );

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-brand-line bg-white overflow-hidden shadow-[0_2px_10px_rgba(7,25,54,0.04)] hover:shadow-[0_14px_32px_rgba(7,25,54,0.10)] hover:-translate-y-1 transition-all duration-300">
      {/* Full-bleed edge-to-edge media region */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-[4/3] w-full bg-brand-surface-alt bg-honeycomb-light overflow-hidden border-b border-brand-line"
      >
        {product.primaryImage ? (
          <img
            src={product.primaryImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-brand-steel/50 gap-2.5 p-6">
            <Package size={40} strokeWidth={1.4} />
            <span className="font-mono text-xs uppercase tracking-wider">
              Image Coming Soon
            </span>
          </div>
        )}

        {product.images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-md bg-brand-navy/85 backdrop-blur-xs text-white font-mono text-[11px] px-2.5 py-1">
            +{product.images.length - 1} photos
          </span>
        )}
      </Link>

      {/* Card Content Body (8pt vertical rhythm) */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
          <Link
            href={`/categories/${product.category.slug}`}
            className="text-brand-steel hover:text-brand-sun-dark font-medium uppercase tracking-wider truncate"
          >
            {product.category.name}
          </Link>
          <span className="text-brand-muted shrink-0">{refCode}</span>
        </div>

        <Link href={`/products/${product.slug}`} className="block mb-3">
          <h3 className="text-lg lg:text-xl font-display font-bold text-brand-navy group-hover:text-brand-navy-light leading-snug line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-brand-muted leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>

        {product.features.length > 0 && (
          <ul className="mt-auto pt-4 border-t border-brand-line/80 space-y-2">
            {product.features.slice(0, 2).map((feat, idx) => (
              <li
                key={idx}
                className="text-xs text-brand-steel flex items-start gap-2"
              >
                <span className="text-brand-sun-dark font-mono font-bold leading-4">
                  +
                </span>
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Aligned Action Footer */}
      <div className="px-6 pb-6 pt-2 flex items-center gap-3 mt-auto">
        <Link
          href={`/products/${product.slug}`}
          className="flex-1 h-11 px-4 rounded-lg bg-brand-navy hover:bg-brand-navy-light text-white font-display text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>View Product</span>
          <ArrowUpRight size={15} />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Inquire on WhatsApp about ${product.name}`}
          className="h-11 px-4 rounded-lg bg-whatsapp hover:bg-whatsapp-dark text-white font-display text-xs font-semibold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors shrink-0"
        >
          <WhatsAppIcon size={16} />
          <span>Quote</span>
        </a>
      </div>
    </article>
  );
}
