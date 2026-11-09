"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import InlineLoader from "@/components/ui/InlineLoader";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pendingLabel?: string;
  loaderTone?: "navy" | "light" | "amber";
  children: React.ReactNode;
}

export default function SubmitButton({
  pendingLabel = "Saving...",
  loaderTone = "light",
  children,
  className = "",
  disabled,
  ...rest
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={`inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-65 disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {pending ? <InlineLoader label={pendingLabel} tone={loaderTone} size="sm" /> : children}
    </button>
  );
}
