"use client";

import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { saveProduct } from "./actions";
import FileUpload from "@/components/ui/FileUpload";
import SubmitButton from "@/components/ui/SubmitButton";

interface ProductFormProps {
  categories: { id: string; name: string }[];
  product?: {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    images: string;
    features?: string | null;
  };
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const [images, setImages] = useState<string[]>(
    product ? JSON.parse(product.images || "[]") : []
  );
  const [features, setFeatures] = useState<string[]>(
    product?.features ? JSON.parse(product.features) : []
  );
  const [featureInput, setFeatureInput] = useState("");

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleSubmit = async (formData: FormData) => {
    const res = await saveProduct(formData);
    if (res?.error) toast.error(res.error);
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="features" value={JSON.stringify(features)} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2">
            Product Name *
          </label>
          <input
            name="name"
            defaultValue={product?.name}
            required
            placeholder="e.g. 2-Way Brass Solenoid Valve"
            className="w-full h-11 px-4 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2">
            Category *
          </label>
          <select
            name="categoryId"
            defaultValue={product?.categoryId}
            required
            className="w-full h-11 px-4 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2">
          Product Description *
        </label>
        <textarea
          name="description"
          defaultValue={product?.description}
          required
          rows={5}
          placeholder="Explain what this product is used for, materials, pressure rating, or sizes available..."
          className="w-full p-4 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white resize-y"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2">
          Specifications &amp; Highlights
        </label>
        <div className="flex gap-2.5 mb-3">
          <input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            }}
            className="flex-1 h-11 px-4 rounded-lg bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white"
            placeholder="e.g. Working Pressure: Up to 16 Bar"
          />
          <button
            type="button"
            onClick={addFeature}
            className="rounded-lg bg-brand-surface-alt hover:bg-brand-line border border-brand-line px-5 h-11 font-display font-bold text-xs uppercase tracking-wider text-brand-navy transition-colors"
          >
            Add Line
          </button>
        </div>
        {features.length > 0 && (
          <ul className="rounded-lg divide-y divide-brand-line border border-brand-line bg-brand-surface/50 overflow-hidden">
            {features.map((f, i) => (
              <li
                key={i}
                className="flex justify-between items-center px-4 py-2.5 text-sm text-brand-navy"
              >
                <span>{f}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFeatures(features.filter((_, idx) => idx !== i))
                  }
                  className="text-brand-muted hover:text-red-600 p-1"
                >
                  <X size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-2">
          Product Photos
        </label>
        {images.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative w-24 h-24 rounded-lg border border-brand-line bg-white overflow-hidden"
              >
                <img
                  src={img}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, idx) => idx !== i))
                  }
                  className="absolute top-1 right-1 rounded bg-brand-navy text-white p-1 hover:bg-red-600 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <FileUpload onUploadSuccess={(url) => setImages([...images, url])} />
      </div>

      <div className="pt-2">
        <SubmitButton
          pendingLabel={product ? "Updating product..." : "Saving product..."}
          loaderTone="light"
          className="rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-display font-bold text-xs uppercase tracking-wider px-8 py-4"
        >
          {product ? "Update Product" : "Save Product"}
        </SubmitButton>
      </div>
    </form>
  );
}
