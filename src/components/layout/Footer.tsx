import Link from "next/link"
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-gray-300 py-16 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-sun/5 clip-honeycomb -mt-32 -mr-32 pointer-events-none blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-navy-light/40 clip-honeycomb -mb-40 -ml-40 pointer-events-none blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-white/10 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <span className="text-brand-navy font-black text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none text-white">Alfa Industrial</span>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] mt-1 text-brand-sun">Products</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 pr-4 text-gray-400 font-medium">
              Registered in 2014, Alfa Industrial Products has established a formidable legacy as a premium supplier of industrial components. Excellence engineered into every part.
            </p>
          </div>
          

          {/* Links Column */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-brand-sun transition-colors text-sm font-medium flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> About Us</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-brand-sun transition-colors text-sm font-medium flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Categories</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-brand-sun transition-colors text-sm font-medium flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> All Products</Link></li>
              <li><Link href="/admin/login" className="text-gray-400 hover:text-brand-sun transition-colors text-sm font-medium flex items-center gap-2 group"><ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Partner Login</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-sun/10 transition-colors">
                  <MapPin className="text-brand-sun" size={16} />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed mt-1 font-medium">Plot No 123, Phase 1, IDA Jeedimetla, Hyderabad, Telangana 500055</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-sun/10 transition-colors">
                  <Phone className="text-brand-sun" size={16} />
                </div>
                <span className="text-gray-400 text-sm font-medium">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-sun/10 transition-colors">
                  <Mail className="text-brand-sun" size={16} />
                </div>
                <span className="text-gray-400 text-sm font-medium">sales@alfaindustrial.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4 font-medium">Subscribe to our newsletter for product updates and industry news.</p>
            <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:border-brand-sun/50 transition-colors bg-white/5 backdrop-blur-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none text-white px-4 py-3.5 focus:outline-none w-full text-sm placeholder:text-gray-500"
              />
              <button className="bg-brand-sun hover:bg-brand-sun-light text-brand-navy px-5 transition-colors font-bold flex items-center justify-center shrink-0">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Alfa Industrial Products. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm font-medium text-gray-500">
            <Link href="#" className="hover:text-brand-sun hover:bg-brand-sun/10 px-3 py-1 rounded-full transition-all">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-sun hover:bg-brand-sun/10 px-3 py-1 rounded-full transition-all">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
