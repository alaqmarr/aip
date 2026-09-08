"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ArrowRight } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      toast.error("Invalid credentials")
      setLoading(false)
    } else {
      toast.success("Login successful")
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-brand-navy mb-1.5">Email address</label>
        <div className="mt-1">
          <input 
            id="email" 
            name="email" 
            type="email" 
            autoComplete="email" 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="appearance-none block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:border-brand-sun transition-all sm:text-sm font-medium" 
            placeholder="admin@alfaindustrial.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-bold text-brand-navy mb-1.5">Password</label>
        <div className="mt-1">
          <input 
            id="password" 
            name="password" 
            type="password" 
            autoComplete="current-password" 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="appearance-none block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-sun focus:border-brand-sun transition-all sm:text-sm font-medium" 
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="pt-2">
        <button 
          type="submit" 
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-brand-navy to-brand-navy-light hover:from-brand-sun hover:to-brand-sun-light hover:text-brand-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-sun disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 group"
        >
          {loading ? "Authenticating..." : (
            <>
              Secure Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
