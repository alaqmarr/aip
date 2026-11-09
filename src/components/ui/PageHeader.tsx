import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description: string;
  metaRight?: React.ReactNode;
}

export default function PageHeader({
  breadcrumbs,
  title,
  description,
  metaRight,
}: PageHeaderProps) {
  return (
    <header className="w-full bg-brand-navy bg-honeycomb-navy border-b border-brand-line-dark text-white">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-16 sm:py-20 lg:py-24">
        {/* Breadcrumb Row */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-blue-200/80 mb-6"
        >
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-brand-sun/70">/</span>}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-brand-sun transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-brand-sun font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Main Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold tracking-tight text-white leading-[1.1]">
              {title}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-blue-100/85 max-w-3xl leading-relaxed">
              {description}
            </p>
          </div>

          {metaRight && (
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              {metaRight}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
