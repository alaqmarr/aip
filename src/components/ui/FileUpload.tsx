"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import InlineLoader from "@/components/ui/InlineLoader";

interface FileUploadProps {
  onUploadSuccess: (url: string) => void;
  currentImage?: string;
}

export default function FileUpload({
  onUploadSuccess,
  currentImage,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          onUploadSuccess(data.url);
          toast.success("Image uploaded");
        } else {
          toast.error(data.error || "Could not upload image");
        }
      } catch {
        toast.error("Network error while uploading image");
      } finally {
        setUploading(false);
      }
    },
    [onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border border-dashed p-5 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-brand-sun bg-brand-sun/10"
            : "border-brand-line bg-brand-surface hover:border-brand-navy"
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="py-2">
            <InlineLoader label="Uploading file..." tone="navy" size="sm" />
          </div>
        ) : (
          <div className="flex flex-col items-center text-brand-steel text-center">
            <UploadCloud size={26} className="mb-1.5 text-brand-navy" />
            <span className="text-xs font-medium text-brand-navy">
              {isDragActive ? "Drop image file here" : "Click or drag image to upload"}
            </span>
            <span className="font-mono text-[11px] text-brand-muted mt-0.5">
              PNG, JPG, WEBP up to 50MB
            </span>
          </div>
        )}
      </div>

      {currentImage && (
        <div className="mt-3 relative w-28 h-28 overflow-hidden border border-brand-line bg-white">
          <img
            src={currentImage}
            alt="Uploaded preview"
            className="w-full h-full object-contain p-1.5"
          />
        </div>
      )}
    </div>
  );
}
