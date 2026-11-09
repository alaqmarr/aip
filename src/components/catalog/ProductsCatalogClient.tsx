"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { CategoryWithMeta, ProductWithCategory } from "@/lib/data";
import { buildWhatsAppLink } from "@/lib/site";
import PageHeader from "@/components/ui/PageHeader";
import ProductCard from "@/components/ui/ProductCard";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

interface UrlQuerySyncProps {
  onSync: (params: { q: string; category: string; sort: string }) => void;
}

function UrlQuerySync({ onSync }: UrlQuerySyncProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = (searchParams.get("q") || "").trim();
    const category = (searchParams.get("category") || "").trim();
    const sort = (searchParams.get("sort") || "newest").trim();
    onSync({ q, category, sort });
  }, [searchParams, onSync]);

  return null;
}

interface ProductsCatalogClientProps {
  allProducts: ProductWithCategory[];
  categories: CategoryWithMeta[];
  whatsappNumber: string;
}

export default function ProductsCatalogClient({
  allProducts,
  categories,
  whatsappNumber,
}: ProductsCatalogClientProps) {
  const pathname = usePathname();
  const [queryInput, setQueryInput] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState("newest");

  const handleUrlSync = React.useCallback(
    ({ q, category, sort: nextSort }: { q: string; category: string; sort: string }) => {
      setQueryInput(q);
      setAppliedQuery(q);
      setSelectedCategory(category);
      setSort(nextSort || "newest");
    },
    []
  );

  const syncBrowserUrl = (next: {
    q: string;
    category: string;
    sort: string;
  }) => {
    const params = new URLSearchParams();
    if (next.q) params.set("q", next.q);
    if (next.category) params.set("category", next.category);
    if (next.sort && next.sort !== "newest") params.set("sort", next.sort);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  };

  const applyFilterState = (next: {
    q: string;
    category: string;
    sort: string;
  }) => {
    setQueryInput(next.q);
    setAppliedQuery(next.q);
    setSelectedCategory(next.category);
    setSort(next.sort);
    syncBrowserUrl(next);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilterState({
      q: queryInput.trim(),
      category: selectedCategory,
      sort,
    });
  };

  const clearFilters = () => {
    applyFilterState({ q: "", category: "", sort: "newest" });
  };

  const filtered = useMemo(() => {
    let result = allProducts;

    if (selectedCategory) {
      result = result.filter((p) => p.category.slug === selectedCategory);
    }

    if (appliedQuery) {
      const qLower = appliedQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(qLower) ||
          p.description.toLowerCase().includes(qLower) ||
          p.category.name.toLowerCase().includes(qLower) ||
          p.features.some((f) => f.toLowerCase().includes(qLower))
      );
    }

    if (sort === "name-asc") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [allProducts, selectedCategory, appliedQuery, sort]);

  const activeCategoryObj = categories.find(
    (c) => c.slug === selectedCategory
  );

  const hasFilters = Boolean(
    appliedQuery || selectedCategory || (sort && sort !== "newest")
  );

  const whatsappCustomUrl = buildWhatsAppLink(
    whatsappNumber,
    appliedQuery
      ? `Hello Alfa Industrial Products, I am searching for "${appliedQuery}" and would like to check stock and price.`
      : "Hello Alfa Industrial Products, I need help finding a specific industrial product size."
  );

  return (
    <>
      <Suspense fallback={null}>
        <UrlQuerySync onSync={handleUrlSync} />
      </Suspense>

      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "All Products" },
        ]}
        title={
          activeCategoryObj
            ? `${activeCategoryObj.name} Products`
            : "All Industrial Products"
        }
        description={
          activeCategoryObj?.description ||
          "Search stocked pneumatic cylinders, F.R.L. combinations, PU connectors, brass & SS fittings, industrial valves, and hydraulic hardware. Select any item for details or instant WhatsApp pricing."
        }
        metaRight={
          <div className="rounded-xl border border-brand-line-dark bg-brand-navy-mid px-6 py-5 text-left">
            <div className="font-mono text-[11px] uppercase tracking-wider text-brand-sun">
              Catalog Status
            </div>
            <div className="font-display text-2xl font-bold text-white mt-1">
              {allProducts.length} Products Listed
            </div>
            <div className="font-mono text-xs text-blue-200/75 mt-1">
              Across {categories.length} product categories
            </div>
          </div>
        }
      />

      {/* Filter & Sort Toolbar */}
      <div className="w-full bg-white border-b border-brand-line px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 flex-1">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center border border-brand-line rounded-lg overflow-hidden bg-brand-surface flex-1 max-w-xl"
            >
              <Search size={16} className="ml-4 text-brand-muted shrink-0" />
              <input
                type="search"
                value={queryInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setQueryInput(val);
                  setAppliedQuery(val.trim());
                  syncBrowserUrl({
                    q: val.trim(),
                    category: selectedCategory,
                    sort,
                  });
                }}
                placeholder="Filter by product name, feature, or keyword..."
                aria-label="Filter catalog products"
                className="w-full h-11 px-3.5 bg-transparent text-sm text-brand-navy placeholder:text-brand-muted focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 px-5 bg-brand-navy hover:bg-brand-navy-light text-white font-display text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors"
              >
                Filter
              </button>
            </form>

            {/* Mobile / Tablet Category Dropdown */}
            <select
              aria-label="Select category"
              value={selectedCategory}
              onChange={(e) =>
                applyFilterState({
                  q: appliedQuery,
                  category: e.target.value,
                  sort,
                })
              }
              className="lg:hidden h-11 px-3.5 rounded-lg border border-brand-line bg-white text-sm text-brand-navy font-medium focus:outline-none focus:border-brand-navy"
            >
              <option value="">All Categories ({allProducts.length})</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.productCount})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4">
            <span className="font-mono text-xs text-brand-muted">
              Showing{" "}
              <strong className="text-brand-navy">{filtered.length}</strong> of{" "}
              {allProducts.length} products
            </span>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-xs font-mono text-brand-sun-dark hover:text-brand-navy px-2.5 py-1.5 rounded-md bg-brand-surface border border-brand-line transition-colors"
              >
                <X size={13} />
                <span>Reset</span>
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <label
                htmlFor="catalog-sort"
                className="font-mono text-xs text-brand-muted"
              >
                Sort:
              </label>
              <select
                id="catalog-sort"
                value={sort}
                onChange={(e) =>
                  applyFilterState({
                    q: appliedQuery,
                    category: selectedCategory,
                    sort: e.target.value,
                  })
                }
                className="h-11 px-3.5 rounded-lg border border-brand-line bg-white text-xs font-mono text-brand-navy focus:outline-none focus:border-brand-navy"
              >
                <option value="newest">Newest First</option>
                <option value="name-asc">Name (A to Z)</option>
                <option value="name-desc">Name (Z to A)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Spacious Full-Width Split Catalog Body */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24 py-12 sm:py-16 lg:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Desktop Category Index Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-xl bg-white border border-brand-line p-6 shadow-xs">
                <h2 className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-4">
                  Product Categories
                </h2>
                <ul className="space-y-1.5 text-sm">
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        applyFilterState({
                          q: appliedQuery,
                          category: "",
                          sort,
                        })
                      }
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors text-left ${
                        !selectedCategory
                          ? "bg-brand-navy text-white font-semibold"
                          : "bg-brand-surface/60 text-brand-navy hover:bg-brand-surface"
                      }`}
                    >
                      <span>All Categories</span>
                      <span className="font-mono text-xs opacity-80">
                        {allProducts.length}
                      </span>
                    </button>
                  </li>
                  {categories.map((cat) => {
                    const active = selectedCategory === cat.slug;
                    return (
                      <li key={cat.id}>
                        <button
                          type="button"
                          onClick={() =>
                            applyFilterState({
                              q: appliedQuery,
                              category: cat.slug,
                              sort,
                            })
                          }
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors gap-2 text-left ${
                            active
                              ? "bg-brand-navy text-white font-semibold"
                              : "bg-white text-brand-navy hover:bg-brand-surface"
                          }`}
                        >
                          <span className="truncate">{cat.name}</span>
                          <span className="font-mono text-xs opacity-75 shrink-0">
                            {cat.productCount}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Custom Size / Unlisted Product Box */}
              <div className="rounded-xl bg-brand-navy bg-honeycomb-navy text-white p-6 border border-brand-line-dark">
                <div className="font-mono text-[11px] uppercase tracking-wider text-brand-sun mb-2">
                  Unlisted Size?
                </div>
                <p className="text-sm text-blue-100/85 leading-relaxed mb-5">
                  Not every thread size or custom batch is shown online. Send us
                  your product requirement directly on WhatsApp.
                </p>
                <a
                  href={whatsappCustomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white font-display font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg transition-colors"
                >
                  <WhatsAppIcon size={16} />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Main Full-Width Product Grid */}
          <div className="lg:col-span-9">
            {filtered.length > 0 ? (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    whatsappNumber={whatsappNumber}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full rounded-xl bg-white border border-brand-line p-8 sm:p-12 lg:p-16">
                <div className="max-w-xl">
                  <div className="font-mono text-xs uppercase tracking-wider text-brand-sun-dark mb-2">
                    No Exact Match Found
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-navy mb-3">
                    {appliedQuery
                      ? `No online listing matched "${appliedQuery}"`
                      : "No products listed in this filter yet"}
                  </h2>
                  <p className="text-base text-brand-muted leading-relaxed mb-8">
                    We stock many additional sizes and fittings at our Ranigunj,
                    Secunderabad store. Send the product name or photo on
                    WhatsApp and our counter team will check physical stock
                    right away.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="bg-brand-navy hover:bg-brand-navy-light text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg transition-colors"
                    >
                      Show All Products
                    </button>
                    <a
                      href={whatsappCustomUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-whatsapp hover:bg-whatsapp-dark text-white font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-lg inline-flex items-center gap-2 transition-colors"
                    >
                      <WhatsAppIcon size={16} />
                      <span>Check Stock on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
