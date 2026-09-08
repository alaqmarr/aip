import { Metadata } from "next"
import LoginForm from "./LoginForm"

export const metadata: Metadata = {
  title: "Admin Login | Alfa Industrial Products",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-sun/10 clip-honeycomb blur-3xl -mt-64 -mr-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-navy/5 clip-honeycomb blur-3xl -mb-32 -ml-32 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-brand-navy rounded-2xl flex items-center justify-center text-brand-sun font-black text-3xl shadow-xl border border-brand-sun/20">
            AIP
          </div>
        </div>
        <h2 className="mt-6 text-center text-4xl font-black text-brand-navy tracking-tight">
          Admin Dashboard
        </h2>
        <p className="mt-3 text-center text-sm font-medium text-gray-500">
          Secure access to manage products, categories, and settings.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] sm:rounded-3xl sm:px-10 border border-white">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
