"use client";

import React, { Suspense, useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle2 } from "lucide-react";
import { submitContactInquiry, type InquiryActionState } from "./actions";
import SubmitButton from "@/components/ui/SubmitButton";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

function UrlProductPrefill({
  onProduct,
}: {
  onProduct: (val: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const product = (searchParams.get("product") || "").trim();
    if (product) {
      onProduct(product);
    }
  }, [searchParams, onProduct]);

  return null;
}

const initialState: InquiryActionState = {
  status: "idle",
};

export default function ContactInquiryForm() {
  const [state, formAction] = useActionState(
    submitContactInquiry,
    initialState
  );
  const [productNeeded, setProductNeeded] = useState("");

  const handlePrefill = React.useCallback((val: string) => {
    setProductNeeded(val);
  }, []);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-brand-line bg-brand-surface p-7 sm:p-9 space-y-5">
        <div className="flex items-start gap-3.5">
          <CheckCircle2
            size={24}
            className="text-brand-sun-dark shrink-0 mt-0.5"
          />
          <div>
            <h3 className="text-xl font-display font-bold text-brand-navy">
              Inquiry Prepared &amp; Recorded
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed mt-1.5">
              {state.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
          {state.whatsappUrl && (
            <a
              href={state.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-whatsapp hover:bg-whatsapp-dark text-white font-display font-bold text-xs uppercase tracking-wider py-4 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
            >
              <WhatsAppIcon size={17} />
              <span>Send Instant WhatsApp</span>
            </a>
          )}
          {state.mailtoUrl && (
            <a
              href={state.mailtoUrl}
              className="flex-1 bg-brand-navy hover:bg-brand-navy-light text-white font-display font-bold text-xs uppercase tracking-wider py-4 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Mail size={16} />
              <span>Send via Email App</span>
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <Suspense fallback={null}>
        <UrlProductPrefill onProduct={handlePrefill} />
      </Suspense>

      {state.status === "error" && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3.5 text-sm text-red-800">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="inq-name"
            className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2"
          >
            Your Name *
          </label>
          <input
            id="inq-name"
            name="name"
            type="text"
            required
            placeholder="e.g. Rajesh Kumar"
            className="w-full h-12 px-4 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="inq-company"
            className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2"
          >
            Workshop / Company Name
          </label>
          <input
            id="inq-company"
            name="company"
            type="text"
            placeholder="e.g. Sri Sai Engineering Works"
            className="w-full h-12 px-4 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="inq-phone"
            className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2"
          >
            Phone / WhatsApp Number *
          </label>
          <input
            id="inq-phone"
            name="phone"
            type="tel"
            required
            placeholder="+91 98493 23057"
            className="w-full h-12 px-4 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="inq-email"
            className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2"
          >
            Email Address
          </label>
          <input
            id="inq-email"
            name="email"
            type="email"
            placeholder="purchase@company.com"
            className="w-full h-12 px-4 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="inq-product"
          className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2"
        >
          Product Name or Category
        </label>
        <input
          id="inq-product"
          name="productNeeded"
          type="text"
          value={productNeeded}
          onChange={(e) => setProductNeeded(e.target.value)}
          placeholder="e.g. ADVU Cylinder, F.R.L. Combination, PU Connector, Brass Ball Valve..."
          className="w-full h-12 px-4 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="inq-message"
          className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2"
        >
          Required Sizes, Quantities &amp; Notes *
        </label>
        <textarea
          id="inq-message"
          name="message"
          rows={5}
          required
          placeholder="Tell us the thread size, quantity needed, pressure rating, or delivery city..."
          className="w-full p-4 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-navy focus:bg-white resize-y transition-colors"
        />
      </div>

      <SubmitButton
        pendingLabel="Submitting inquiry..."
        loaderTone="light"
        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-display font-bold text-sm uppercase tracking-wider"
      >
        Submit Quote Request
      </SubmitButton>
    </form>
  );
}
