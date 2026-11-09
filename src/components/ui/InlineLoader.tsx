import React from "react";

interface InlineLoaderProps {
  label?: string;
  size?: "xs" | "sm" | "md";
  tone?: "navy" | "light" | "amber";
  className?: string;
}

export default function InlineLoader({
  label,
  size = "sm",
  tone = "navy",
  className = "",
}: InlineLoaderProps) {
  const dims =
    size === "xs"
      ? "h-3.5 w-3.5 border-[1.75px]"
      : size === "md"
      ? "h-5 w-5 border-2"
      : "h-4 w-4 border-2";

  const ringTone =
    tone === "light"
      ? "border-white/30 border-t-brand-sun"
      : tone === "amber"
      ? "border-brand-sun/30 border-t-brand-sun"
      : "border-brand-navy/25 border-t-brand-navy";

  const textTone =
    tone === "light"
      ? "text-white/90"
      : tone === "amber"
      ? "text-brand-sun-dark"
      : "text-brand-navy";

  return (
    <span
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-2 font-mono text-xs font-medium tracking-wide ${textTone} ${className}`}
    >
      <span
        className={`inline-block rounded-full animate-spin shrink-0 ${dims} ${ringTone}`}
        aria-hidden="true"
      />
      {label ? <span>{label}</span> : <span className="sr-only">Loading</span>}
    </span>
  );
}
