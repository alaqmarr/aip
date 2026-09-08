import Link from "next/link"
import { ArrowUpRight, Factory } from "lucide-react"

export interface HoneycombItem {
  id: string
  title: string
  image?: string | null
  href: string
}

/**
 * True interlocking honeycomb grid.
 * 
 * Uses pointy-topped hexagons (clip-honeycomb).
 * Even rows: 3 items. Odd rows: 2 items, centered between the row above.
 * The centering happens automatically via justify-center because
 * the 2-item row is exactly 1 hex narrower, shifting it half a hex to the right.
 * Negative margin-top creates vertical interlock (bottom points nestle into top valleys).
 */
export default function HoneycombGrid({ items }: { items: HoneycombItem[] }) {
  const ITEMS_PER_ROW = 3

  // Split into honeycomb rows: 3, 2, 3, 2, ...
  const rows: { item: HoneycombItem | null; id: string }[][] = []
  let idx = 0
  let isFullRow = true
  
  while (idx < items.length) {
    const count = isFullRow ? ITEMS_PER_ROW : ITEMS_PER_ROW - 1
    const take = Math.min(count, items.length - idx)
    
    const rowItems = items.slice(idx, idx + take).map(item => ({ item, id: item.id }))
    
    // Pad the rest of the row with null items so flex justify-center 
    // keeps the real items in the correct honeycomb offset positions
    for (let i = take; i < count; i++) {
      rowItems.push({ item: null, id: `dummy-${idx}-${i}` })
    }
    
    rows.push(rowItems)
    idx += take
    isFullRow = !isFullRow
  }

  return (
    <div className="w-full py-12 px-4">
      {/* ── Mobile: simple vertical stack ── */}
      <div className="flex flex-col items-center gap-4 sm:hidden">
        {items.map((item) => (
          <HexCard key={item.id} item={item} size="mobile" />
        ))}
      </div>

      {/* ── Desktop: true honeycomb ── */}
      <div className="hidden sm:flex flex-col items-center">
        {rows.map((rowItems, rIdx) => (
          <div
            key={rIdx}
            className="flex justify-center"
            style={{
              gap: '10px',
              // 25% overlap for pointy-topped hexagons minus a tiny gap
              marginTop: rIdx > 0 ? '-76px' : '0',
            }}
          >
            {rowItems.map(({ item, id }) => (
              item ? (
                <HexCard key={id} item={item} size="desktop" />
              ) : (
                <div key={id} className="w-[260px] lg:w-[300px] shrink-0 invisible pointer-events-none" />
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function HexCard({ item, size }: { item: HoneycombItem; size: 'mobile' | 'desktop' }) {
  const widthClass = size === 'mobile' ? 'w-[220px]' : 'w-[260px] lg:w-[300px]'

  return (
    <Link href={item.href} className={`group block ${widthClass} shrink-0`}>
      {/* Outer shell = the "border". Clipped to hex, shows through as border color. */}
      <div className="relative w-full aspect-[1/1.15] clip-honeycomb bg-white/10 group-hover:bg-brand-sun transition-colors duration-500 shadow-2xl p-[4px]">
        {/* Inner fill = the card. Also clipped, slightly inset by the padding above. */}
        <div className="relative w-full h-full clip-honeycomb bg-brand-navy overflow-hidden">
          {/* Image */}
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-[#0a1128] flex items-center justify-center">
              <Factory className="text-white/5" size={size === 'mobile' ? 60 : 80} />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent group-hover:via-brand-navy/30 transition-all duration-500" />

          {/* Text content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-[18%] px-4 text-center">
            <h4 className="text-white text-lg sm:text-xl lg:text-2xl font-black tracking-tight mb-1.5 group-hover:text-brand-sun transition-colors duration-300 drop-shadow-md">
              {item.title}
            </h4>
            <div className="flex items-center justify-center gap-1.5 text-brand-sun text-xs font-bold uppercase tracking-widest opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span>Explore</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
