import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Settings, Package, LayoutGrid, LogOut, ExternalLink, Hexagon } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-navy text-white flex flex-col h-screen sticky top-0 shadow-2xl relative overflow-hidden z-20">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sun/5 clip-honeycomb blur-2xl -mt-32 -mr-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 clip-honeycomb blur-2xl -mb-32 -ml-32 pointer-events-none"></div>

        <div className="p-8 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-brand-sun text-brand-navy flex items-center justify-center rounded-xl shadow-lg border border-brand-sun/50">
              <Hexagon size={24} className="fill-brand-navy text-brand-navy" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-white">AIP <span className="text-brand-sun">ADMIN</span></h2>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-medium pl-13">Welcome back, {session.user?.name}</p>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 relative z-10 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3.5 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 group font-medium">
            <LayoutGrid size={20} className="group-hover:text-brand-sun transition-colors" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3.5 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 group font-medium">
            <LayoutGrid size={20} className="group-hover:text-brand-sun transition-colors" />
            <span>Categories</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3.5 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 group font-medium">
            <Package size={20} className="group-hover:text-brand-sun transition-colors" />
            <span>Products</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3.5 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 group font-medium">
            <Settings size={20} className="group-hover:text-brand-sun transition-colors" />
            <span>Site Settings</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-white/10 space-y-2 relative z-10">
          <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 group font-medium">
            <ExternalLink size={18} className="group-hover:text-brand-sun transition-colors" />
            <span>View Public Site</span>
          </Link>
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 font-medium">
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        {/* Subtle grid pattern for the dashboard background */}
        <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  )
}
