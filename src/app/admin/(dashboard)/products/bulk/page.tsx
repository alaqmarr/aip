import BulkProductForm from "./BulkProductForm"

export default function BulkAddProductsPage() {
  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-brand-navy tracking-tight">Bulk Add Products</h1>
        <p className="text-gray-500 mt-2 font-medium">
          Import multiple products at once using CSV format.
        </p>
      </div>

      <BulkProductForm />
    </div>
  )
}
