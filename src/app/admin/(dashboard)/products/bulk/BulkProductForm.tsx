"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { bulkAddProducts, updateProductImage } from "./actions";
import FileUpload from "@/components/ui/FileUpload";
import InlineLoader from "@/components/ui/InlineLoader";

export default function BulkProductForm() {
  const [csvData, setCsvData] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [products, setProducts] = useState<
    { id: string; name: string; uploadedImages?: string[] }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("csvData", csvData);

    const res = await bulkAddProducts(formData);

    if (res?.error) {
      toast.error(res.error);
    } else if (res?.success) {
      toast.success(res.success);
      if (res.products && res.products.length > 0) {
        setProducts(res.products.map((p) => ({ ...p, uploadedImages: [] })));
        setStep(2);
      } else {
        setCsvData("");
      }
    }

    setLoading(false);
  };

  const handleImageUpload = async (productId: string, url: string) => {
    const res = await updateProductImage(productId, url);
    if (res?.error) {
      toast.error(res.error);
    } else {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === productId
            ? {
                ...item,
                uploadedImages: [...(item.uploadedImages || []), url],
              }
            : item
        )
      );
      toast.success("Photo attached to product");
    }
  };

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl bg-white border border-brand-line p-6 sm:p-8 shadow-xs">
          <div className="font-mono text-xs uppercase tracking-widest text-brand-sun-dark mb-1">
            Step 2 of 2
          </div>
          <h2 className="text-2xl font-display font-bold text-brand-navy mb-2">
            Attach Photos to Imported Products
          </h2>
          <p className="text-sm text-brand-muted mb-6">
            Your products are now saved in the catalog. Upload one or more
            photos for each product below, or finish anytime.
          </p>

          <div className="rounded-xl divide-y divide-brand-line border border-brand-line overflow-hidden">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-5 sm:p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white"
              >
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-brand-navy">
                    {p.name}
                  </h3>
                  <p className="font-mono text-xs text-brand-muted">
                    ID: {p.id}
                  </p>
                  {p.uploadedImages && p.uploadedImages.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {p.uploadedImages.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={p.name}
                          className="w-16 h-16 rounded-lg object-cover border border-brand-line bg-brand-surface"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full md:w-72 shrink-0">
                  <FileUpload
                    onUploadSuccess={(url) => handleImageUpload(p.id, url)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            href="/admin/products"
            className="rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-display font-bold text-xs uppercase tracking-wider px-8 py-4 transition-colors"
          >
            Finish &amp; View Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl bg-white border border-brand-line p-6 sm:p-8 shadow-xs">
        <div className="font-mono text-xs uppercase tracking-widest text-brand-steel mb-1">
          Step 1 of 2
        </div>
        <h2 className="text-xl font-display font-bold text-brand-navy mb-2">
          Paste CSV Product Lines
        </h2>
        <p className="text-sm text-brand-muted mb-4">
          Enter one product per line using:{" "}
          <code className="font-mono text-xs bg-brand-surface px-2 py-0.5 rounded border border-brand-line text-brand-navy">
            Product Name, Category Name, Description
          </code>
        </p>

        <textarea
          name="csvData"
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          rows={10}
          className="w-full p-4 rounded-lg border border-brand-line bg-brand-surface text-brand-navy font-mono text-sm focus:outline-none focus:border-brand-navy focus:bg-white"
          placeholder={
            "Brass Ball Valve 2 Inch, Valves, Heavy-duty water and air shutoff valve\nStainless Hex Nipple, Pipe Fittings, 316 stainless threaded pipe connector"
          }
          required
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link
          href="/admin/products"
          className="px-6 py-3.5 rounded-lg border border-brand-line bg-white hover:bg-brand-surface font-display font-bold text-xs uppercase tracking-wider text-brand-navy transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-navy hover:bg-brand-navy-light text-white px-8 py-3.5 font-display font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors disabled:opacity-65"
        >
          {loading ? (
            <InlineLoader label="Importing products..." tone="light" size="sm" />
          ) : (
            <span>Import Products &amp; Upload Photos</span>
          )}
        </button>
      </div>
    </form>
  );
}
