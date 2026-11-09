"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import InlineLoader from "@/components/ui/InlineLoader";

export default function HeroSearchForm() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    startTransition(() => {
      router.push(
        trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products"
      );
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex flex-col sm:flex-row gap-3"
    >
      <div className="relative flex-1 flex items-center rounded-xl border border-brand-line-dark bg-brand-navy-mid/95 focus-within:border-brand-sun transition-colors">
        <Search
          size={18}
          className="ml-4 text-blue-200/65 shrink-0 pointer-events-none"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cylinders, F.R.L. units, PU connectors, brass fittings, valves..."
          aria-label="Search industrial products"
          className="w-full h-13 px-3.5 bg-transparent text-white placeholder:text-blue-200/55 text-sm focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="h-13 px-7 rounded-xl bg-brand-sun hover:bg-brand-sun-light text-brand-navy font-display font-bold text-sm uppercase tracking-wider shrink-0 inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-75"
      >
        {isPending ? (
          <InlineLoader label="Searching..." tone="navy" size="sm" />
        ) : (
          <span>Search Products</span>
        )}
      </button>
    </form>
  );
}
