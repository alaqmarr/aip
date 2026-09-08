"use client"
import { useState } from "react"
import { saveProduct } from "./actions"
import FileUpload from "@/components/ui/FileUpload"
import { X } from "lucide-react"

import toast from "react-hot-toast"

interface ProductFormProps {
  categories: { id: string, name: string }[]
  product?: {
    id: string
    name: string
    description: string
    categoryId: string
    images: string
    features?: string | null
  }
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const [images, setImages] = useState<string[]>(product ? JSON.parse(product.images) : [])
  const [features, setFeatures] = useState<string[]>(product?.features ? JSON.parse(product.features) : [])
  const [featureInput, setFeatureInput] = useState("")

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()])
      setFeatureInput("")
    }
  }

  const handleSubmit = async (formData: FormData) => {
    const res = await saveProduct(formData)
    if (res?.error) toast.error(res.error)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="features" value={JSON.stringify(features)} />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input 
          name="name" 
          defaultValue={product?.name} 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-sun focus:border-brand-sun outline-none" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
        <select 
          name="categoryId" 
          defaultValue={product?.categoryId} 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-sun focus:border-brand-sun outline-none"
        >
          <option value="">Select a category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea 
          name="description" 
          defaultValue={product?.description}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-sun focus:border-brand-sun outline-none resize-none" 
          rows={5}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
        <div className="flex gap-2 mb-2">
          <input 
            value={featureInput}
            onChange={e => setFeatureInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-sun focus:border-brand-sun outline-none" 
            placeholder="Add a key feature"
          />
          <button type="button" onClick={addFeature} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md font-medium text-gray-700">Add</button>
        </div>
        <ul className="space-y-2">
          {features.map((f, i) => (
             <li key={i} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded border border-gray-100">
               <span className="text-sm">{f}</span>
               <button type="button" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700"><X size={16}/></button>
             </li>
          ))}
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
        <div className="mb-4 flex flex-wrap gap-4">
           {images.map((img, i) => (
             <div key={i} className="relative w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
               <img src={img} alt="Product" className="w-full h-full object-cover" />
               <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm text-red-500"><X size={14} /></button>
             </div>
           ))}
        </div>
        <FileUpload onUploadSuccess={(url) => setImages([...images, url])} />
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-brand-navy hover:bg-brand-navy-light text-white px-6 py-2 rounded-md font-medium transition-colors">
          {product ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  )
}
