"use client"

import { useState } from "react"
import { bulkAddProducts, updateProductImage } from "./actions"
import toast from "react-hot-toast"
import FileUpload from "@/components/ui/FileUpload"
import Link from "next/link"

export default function BulkProductForm() {
  const [csvData, setCsvData] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [products, setProducts] = useState<{ id: string; name: string }[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData()
    formData.append("csvData", csvData)

    const res = await bulkAddProducts(formData)
    
    if (res?.error) {
      toast.error(res.error)
    } else if (res?.success) {
      toast.success(res.success)
      if (res.products && res.products.length > 0) {
        setProducts(res.products)
        setStep(2)
      } else {
        setCsvData("")
      }
    }
    
    setLoading(false)
  }

  const handleImageUpload = async (productId: string, url: string) => {
    const res = await updateProductImage(productId, url)
    if (res?.error) toast.error(res.error)
    else toast.success("Image added successfully!")
  }

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-brand-navy mb-2">Upload Images</h2>
          <p className="text-gray-500 mb-6">Your products have been created! You can now optionally upload images for them directly below.</p>
          
          <div className="space-y-6">
            {products.map(p => (
              <div key={p.id} className="border border-gray-100 p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start md:items-center bg-gray-50/50">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-brand-navy">{p.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">ID: {p.id}</p>
                </div>
                <div className="w-full md:w-64 shrink-0">
                  <FileUpload 
                    onUploadSuccess={(url) => handleImageUpload(p.id, url)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/products"
            className="bg-brand-navy hover:bg-brand-navy-light text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md"
          >
            Finish & Return to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-brand-navy mb-4">Paste CSV Data</h2>
        <p className="text-sm text-gray-500 mb-4">
          Format: <code>Product Name, Category Name, Description</code> (one per line)
        </p>
        <textarea
          name="csvData"
          value={csvData}
          onChange={(e) => setCsvData(e.target.value)}
          rows={10}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-sun focus:border-brand-sun outline-none transition-all font-mono text-sm"
          placeholder="Industrial Valve, Valves, High quality industrial valve&#10;Steel Pipe, Pipes, Heavy duty steel pipe"
          required
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-navy hover:bg-brand-navy-light text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {loading ? "Processing..." : "Import Products"}
        </button>
      </div>
    </form>
  )
}
