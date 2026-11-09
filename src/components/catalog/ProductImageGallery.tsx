"use client";

import React, { useState } from "react";
import { Package } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || null;

  return (
    <div className="w-full flex flex-col">
      {/* Main Full-Fill Inspection Frame */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-brand-line bg-brand-surface-alt bg-honeycomb-light">
        {activeImage ? (
          <img
            src={activeImage}
            alt={`${productName} photo ${activeIndex + 1}`}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-brand-steel/50 gap-3 p-8">
            <Package size={64} strokeWidth={1.3} />
            <span className="font-mono text-xs uppercase tracking-wider">
              Product Photo Pending
            </span>
          </div>
        )}

        {images.length > 0 && (
          <div className="absolute bottom-4 right-4 bg-brand-navy/90 text-white font-mono text-xs px-3 py-1.5 rounded-md backdrop-blur-xs">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </div>
        )}
      </div>

      {/* Spaced Multi-Image Thumbnail Strip */}
      {images.length > 1 && (
        <div className="w-full mt-4 grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((img, idx) => {
            const selected = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View photo ${idx + 1} of ${productName}`}
                className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                  selected
                    ? "border-brand-sun ring-2 ring-brand-sun/40"
                    : "border-brand-line hover:border-brand-navy/40 opacity-85 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
