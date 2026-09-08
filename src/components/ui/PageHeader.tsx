import React from "react"

interface PageHeaderProps {
  badge?: string;
  title: React.ReactNode;
  description?: string;
}

export default function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <div className="relative pt-40 pb-16 overflow-hidden bg-white">
      {/* Large subtle background honeycombs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-sun/5 clip-honeycomb blur-3xl -mt-32 -mr-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-navy/5 clip-honeycomb blur-3xl -mb-32 -ml-32 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl text-center mx-auto">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sun/10 text-brand-sun text-xs font-bold tracking-wider uppercase mb-4 border border-brand-sun/20">
              {badge}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-navy mb-6 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
