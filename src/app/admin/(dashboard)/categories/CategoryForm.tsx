"use client"
import { useState } from "react"
import { saveCategory } from "./actions"
import FileUpload from "@/components/ui/FileUpload"

import toast from "react-hot-toast"

interface CategoryFormProps {
  category?: {
    id: string
    name: string
    description?: string | null
    image?: string | null
  }
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const [image, setImage] = useState(category?.image || "")

  const handleSubmit = async (formData: FormData) => {
    const res = await saveCategory(formData)
    if (res?.error) toast.error(res.error)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {category && <input type="hidden" name="id" value={category.id} />}
      <input type="hidden" name="image" value={image} />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input 
          name="name" 
          defaultValue={category?.name} 
          required 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-sun focus:border-brand-sun outline-none" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea 
          name="description" 
          defaultValue={category?.description || ""} 
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-sun focus:border-brand-sun outline-none resize-none" 
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
        <FileUpload onUploadSuccess={(url) => setImage(url)} currentImage={image} />
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="bg-brand-navy hover:bg-brand-navy-light text-white px-6 py-2 rounded-md font-medium transition-colors">
          {category ? "Update Category" : "Create Category"}
        </button>
      </div>
    </form>
  )
}
