import { Metadata } from "next"
import PageHeader from "@/components/ui/PageHeader"

export const metadata: Metadata = {
  title: "About Us | Alfa Industrial Products",
  description: "Learn about our decade of expertise and commitment to industrial quality in Telangana.",
}

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-[80vh] pb-24">
      <PageHeader 
        badge="Company Overview"
        title="About Us."
        description="Emphasizing a decade of expertise and an unwavering commitment to industrial quality."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="space-y-12">
          {/* Established Legacy */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-40 h-40 clip-honeycomb bg-brand-navy-light flex items-center justify-center text-white text-3xl font-bold border-4 border-brand-sun">
                2014
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-brand-navy mb-3">Established Legacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Registered in 2014, Alfa Industrial Products has become a leading supplier of industrial components in Telangana. With years of experience, we have consistently provided top-tier products to meet the rigorous demands of the industrial sector.
              </p>
            </div>
          </div>

          {/* Core Mission */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-40 h-40 clip-honeycomb bg-brand-sun flex items-center justify-center text-brand-navy text-xl text-center font-bold px-4 border-4 border-brand-navy">
                Mission Driven
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-brand-navy mb-3">Core Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Our business philosophy centers on the belief that customer satisfaction is as vital as the products themselves. This strategy has allowed us to build a vast and continuously growing customer base built on trust and reliability.
              </p>
            </div>
          </div>

          {/* Operational Excellence */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
             <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-40 h-40 clip-honeycomb bg-brand-navy flex items-center justify-center text-white text-center font-bold px-4 border-4 border-brand-sun">
                Operations
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-brand-navy mb-3">Operational Excellence</h2>
              <p className="text-gray-600 leading-relaxed">
                Led by CEO Abbasali, our organization operates with a highly dedicated team in a 1,000-square-foot urban facility. This modern workspace is equipped with in-house quality testing units, ensuring that every component leaving our facility meets strict quality standards.
              </p>
            </div>
          </div>

          {/* Key Competitive Strengths */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-40 h-40 clip-honeycomb bg-brand-navy-light flex items-center justify-center text-brand-sun text-center font-bold px-4 border-4 border-brand-navy">
                Strengths
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold text-brand-navy mb-3">Key Competitive Strengths</h2>
              <p className="text-gray-600 leading-relaxed">
                We leverage an experienced R&D department, a massive product line, and high production capacity. This robust infrastructure allows us to effectively serve diverse industries, including the automotive, engineering, and manufacturing sectors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
