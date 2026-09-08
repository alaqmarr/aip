import { Metadata } from "next"
import prisma from "@/lib/prisma"
import { MapPin, Phone, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Alfa Industrial Products",
  description: "Get in touch with Alfa Industrial Products for your industrial component needs.",
}

// Ensure this page is dynamically rendered since it fetches from DB settings
export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const settings = await prisma.setting.findMany({
    where: {
      key: {
        in: ['CONTACT_PHONE', 'CONTACT_EMAIL', 'ADDRESS', 'WHATSAPP_NUMBER']
      }
    }
  })

  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as Record<string, string>)

  const phone = settingsMap['CONTACT_PHONE'] || '+91 98765 43210'
  const email = settingsMap['CONTACT_EMAIL'] || 'info@alfaindustrialproducts.com'
  const address = settingsMap['ADDRESS'] || '1,000-square-foot urban facility in Telangana, India.'
  const whatsapp = settingsMap['WHATSAPP_NUMBER'] || '+919876543210'

  return (
    <div className="bg-gray-50 py-16 min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-brand-sun mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our products or need a custom quote? Our team is ready to help you find the perfect industrial solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-brand-sun/20 p-4 rounded-full text-brand-sun shrink-0">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Our Location</h3>
                <p className="text-gray-600 leading-relaxed">{address}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-brand-sun/20 p-4 rounded-full text-brand-sun shrink-0">
                <Phone size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Phone</h3>
                <p className="text-gray-600 mb-2">{phone}</p>
                <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-brand-sun hover:text-brand-sun-dark font-medium inline-flex items-center gap-1">
                  Chat on WhatsApp &rarr;
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="bg-brand-sun/20 p-4 rounded-full text-brand-sun shrink-0">
                <Mail size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Email</h3>
                <a href={`mailto:${email}`} className="text-gray-600 hover:text-brand-navy transition-colors">{email}</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-brand-navy mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-sun focus:border-brand-sun outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-sun focus:border-brand-sun outline-none transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-sun focus:border-brand-sun outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="w-full bg-brand-navy hover:bg-brand-navy-light text-white font-bold py-4 px-8 rounded-lg transition-colors shadow-md">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
