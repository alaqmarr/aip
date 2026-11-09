"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { saveCategory } from "./actions";
import FileUpload from "@/components/ui/FileUpload";
import SubmitButton from "@/components/ui/SubmitButton";

interface CategoryFormProps {
  category?: {
    id: string;
    name: string;
    description?: string | null;
    image?: string | null;
  };
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const [image, setImage] = useState(category?.image || "");

  const handleSubmit = async (formData: FormData) => {
    const res = await saveCategory(formData);
    if (res?.error) toast.error(res.error);
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {category && <input type="hidden" name="id" value={category.id} />}
      <input type="hidden" name="image" value={image} />

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-1.5">
          Category Name *
        </label>
        <input
          name="name"
          defaultValue={category?.name}
          required
          placeholder="e.g. Ball Valves, Pneumatic Fittings..."
          className="w-full h-11 px-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-1.5">
          Plain Description
        </label>
        <textarea
          name="description"
          defaultValue={category?.description || ""}
          rows={3}
          placeholder="Briefly describe what types of products belong in this category..."
          className="w-full p-3.5 bg-brand-surface border border-brand-line text-sm text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white resize-y"
        />
      </div>

      <div>
        <label className="block font-mono text-xs uppercase tracking-wider text-brand-navy mb-1.5">
          Category Cover Image
        </label>
        <FileUpload
          onUploadSuccess={(url) => setImage(url)}
          currentImage={image}
        />
      </div>

      <div className="pt-2">
        <SubmitButton
          pendingLabel={category ? "Updating category..." : "Creating category..."}
          loaderTone="light"
          className="bg-brand-navy hover:bg-brand-navy-light text-white font-display font-bold text-xs uppercase tracking-wider px-7 py-3.5"
        >
          {category ? "Update Category" : "Create Category"}
        </SubmitButton>
      </div>
    </form>
  );
}
