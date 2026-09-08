"use client"
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface FileUploadProps {
  onUploadSuccess: (url: string) => void
  currentImage?: string
}

export default function FileUpload({ onUploadSuccess, currentImage }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const data = await res.json()
      
      if (res.ok) {
        onUploadSuccess(data.url)
        toast.success("Image uploaded successfully!")
      } else {
        toast.error(data.error || "Failed to upload image")
      }
    } catch (err) {
      toast.error("Network error during upload")
    } finally {
      setUploading(false)
    }
  }, [onUploadSuccess])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  })

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragActive ? 'border-brand-sun bg-brand-sun/5' : 'border-gray-300 hover:border-brand-navy'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center text-gray-500">
            <Loader2 className="animate-spin mb-2" size={32} />
            <span>Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <UploadCloud size={32} className="mb-2" />
            <span className="text-sm font-medium">
              {isDragActive ? "Drop image here" : "Click or drag image to upload"}
            </span>
          </div>
        )}
      </div>
      {currentImage && (
        <div className="mt-4 relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
          <img src={currentImage} alt="Current upload" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  )
}
