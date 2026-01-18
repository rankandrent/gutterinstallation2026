import Link from 'next/link'
import { supabaseServer as supabase } from '@/lib/supabase-server'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/RelatedServices'
import TrustBadges from '@/components/TrustBadges'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
  title: 'Dryer Vent Cleaning Near Me | US Dryer Vents',
  description: 'Looking for dryer vent cleaning near me? Find licensed technicians in 31,000+ cities. Prevent fires and improve efficiency with our professional cleaning & repair services.',
  keywords: 'dryer vent cleaning near me, dryer vent repair near me, dryer vent installation near me, dryer duct cleaning, bird guard installation, commercial dryer vent cleaning',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Find Dryer Vent Cleaning Near Me | US Dryer Vents',
    description: 'Connect with top-rated dryer vent pros near you. Cleaning, repair, and installation with safety guarantee. Free estimates!',
    url: `https://${siteConfig.domain}`,
  }
}


export default async function Home() {
  const { data, error } = await supabase
    .from('usa city name')
    .select('state_name, state_id')

  if (error) {
    console.error('Error fetching states:', error)
  }

  // Deduplicate states
  const uniqueStates = Array.from(new Map(data?.map(item => [item.state_id, item])).values())
    .sort((a, b) => a.state_name.localeCompare(b.state_name))

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* Hero Section - Optimized for "Near Me" */}
      <header className="relative py-32 px-6 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-900 via-slate-900 to-black opacity-95"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-48 -left-24 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-orange-300 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Prevent Dryer Fires & Save Energy
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight leading-tight">
            Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Dryer Vent Cleaning</span><br />Near Me
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-12 leading-relaxed">
            Searching for <span className="text-white font-semibold">dryer vent cleaners near me</span>? Connect with licensed, insured technicians in over <span className="text-white font-semibold">31,000+ cities</span> across all 50 states. Get same-day service for cleaning, repair, and bird guard installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#states" className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl shadow-orange-600/20 transition-all transform hover:scale-105">
              Find Dryer Vent Pros Near Me
            </a>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-white border-b border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">31k+</div>
              <div className="text-slate-500 text-sm font-medium">Cities Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">50</div>
              <div className="text-slate-500 text-sm font-medium">States Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">4.9/5</div>
              <div className="text-slate-500 text-sm font-medium">Customer Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">100%</div>
              <div className="text-slate-500 text-sm font-medium">Lint Removal Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: What We Offer Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Dryer Vent Services Near Me</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Full-service dryer exhaust solutions. From routine cleaning to emergency clog removal and duct repair.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Dryer Vent Cleaning", desc: "Remove lint buildup, improve efficiency, and prevent fires with our rotary brush cleaning system.", icon: "🧹" },
              { title: "Dryer Vent Repair", desc: "Fix disconnected, crushed, or damaged ducts to restore proper airflow and safety.", icon: "🔧" },
              { title: "Bird Guard Installation", desc: "Install durable steel cages to stop birds and pests from nesting in your vent.", icon: "🐦" },
              { title: "Dryer Duct Installation", desc: "Replace unsafe vinyl hoses with code-compliant rigid metal ductwork.", icon: "🏗️" },
              { title: "Commercial Services", desc: "High-volume vent cleaning for laundromats, apartments, and hotels.", icon: "🏢" },
              { title: "Clog Removal", desc: "Emergency service for dryers that are overheating or not drying clothes.", icon: "🚨" }
            ].map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices />

      <main className="max-w-7xl mx-auto py-24 px-6">

        {/* State Grid */}
        <section id="states" className="mb-32 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Find Dryer Vent Cleaning Near Me by State</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Select your state to find trusted local technicians. We provide coverage in every zip code across America.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uniqueStates.map((state) => (
              <Link
                key={state.state_id}
                href={`/${state.state_id.toLowerCase()}`}
                className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">{state.state_id}</span>
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900">{state.state_name}</span>
                </div>
                <div className="text-slate-300 group-hover:text-orange-500 transition-colors">
                  &rarr;
                </div>
              </Link>
            ))}
          </div>

          {!data && (
            <div className="text-center text-red-500 mt-8">
              Failed to load states. Please check database connection.
            </div>
          )}
        </section>

        {/* NEW: Signs You Need Cleaning */}
        <section className="mb-32 bg-white rounded-3xl p-8 md:p-12 border border-slate-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Signs You Need Dryer Vent Cleaning</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Don't ignore these warning signs. Clogged dryer vents are the #1 cause of appliance fires.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { problem: "Clothes Taking Too Long", solution: "If it takes more than one cycle to dry, your vent is likely clogged.", icon: "⏱️" },
              { problem: "Dryer is Hot to Touch", solution: "Restricted airflow causes the appliance to overheat dangerously.", icon: "🔥" },
              { problem: "Burning Smell", solution: "Lint is flammable. A burning smell indicates imminent fire risk.", icon: "👃" },
              { problem: "Vent Flap Won't Open", solution: "Accumulated lint blockages prevent the exterior flap from opening.", icon: "🚪" },
              { problem: "Humid Laundry Room", solution: "Moist air cannot escape, leading to mold and mildew issues.", icon: "💧" },
              { problem: "Lint Code Error", solution: "Modern dryers will warn you (D80, D90, AF codes) when airflow is low.", icon: "⚠️" },
              { problem: "Bird/Pest Sounds", solution: "Scratching sounds mean pests have entered your ductwork.", icon: "🐿️" },
              { problem: "Excess Lint", solution: "Lint behind the dryer means the exhaust system is failing.", icon: "☁️" }
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-1">{item.problem}</h3>
                <p className="text-sm text-slate-600">{item.solution}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-32">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Find Dryer Vent Cleaners Near Me</h2>
              <p className="text-slate-400 mb-12 max-w-2xl mx-auto">Get your dryer running safely in 3 easy steps</p>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="relative">
                  <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 rotate-3">1</div>
                  <h3 className="text-xl font-bold mb-4">Select Your Location</h3>
                  <p className="text-slate-400 leading-relaxed">Choose your state and city from our directory to view local expert technicians.</p>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 -rotate-3">2</div>
                  <h3 className="text-xl font-bold mb-4">Choose Your Service</h3>
                  <p className="text-slate-400 leading-relaxed">Select from cleaning, repair, installation, or bird guard services.</p>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 rotate-3">3</div>
                  <h3 className="text-xl font-bold mb-4">Get Fast Service</h3>
                  <p className="text-slate-400 leading-relaxed">Connect directly with a pro to schedule your service, often available same-day.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Why Safety Matters Section */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Search for &quot;Dryer Vent Cleaning Near Me&quot;?</h2>
              <div className="space-y-4 text-slate-600">
                <p>Did you know that <strong>dryer fires</strong> are a leading cause of home damage? When you search for <strong>dryer vent cleaning near me</strong>, you are taking the most important step in home fire prevention.</p>
                <p>Professional cleaning removes the highly flammable lint that accumulates deep in your ducts, where your lint trap can't reach. It also boosts your dryer's efficiency, creating lower energy bills.</p>
                <p>Our network of <strong>dryer vent pros near me</strong> adheres to strict safety standards to ensure your home is compliant and safe.</p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Prevents 92% of dryer fires",
                  "Reduces drying time by 50%",
                  "Lowers electric/gas bills",
                  "Extends appliance lifespan",
                  "Prevents carbon monoxide backups",
                  "Complies with insurance requirements"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl">
              <h3 className="font-bold text-xl text-slate-900 mb-4">Popular &quot;Near Me&quot; Searches</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "dryer vent cleaning near me",
                  "dryer duct cleaning near me",
                  "vent repair near me",
                  "dryer vent installation near me",
                  "bird guard installation",
                  "dryer cleaner near me",
                  "clogged dryer vent help",
                  "dryer vent rerouting",
                  "commercial dryer vent cleaning",
                  "dryer exhaust cleaning"
                ].map((term, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white text-slate-600 text-sm rounded-full border border-slate-200">{term}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How often should I clean my dryer vent?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Experts recommend professional dryer vent cleaning at least once a year. Larger families or those with pets should clean it every 6-9 months."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does dryer vent cleaning near me cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The average cost for dryer vent cleaning is between $129 and $199. Rooftop vents or heavily clogged systems may cost slightly more."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why is my dryer taking so long to dry?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Long drying times are the #1 sign of a clogged vent. Moist air cannot escape, leaving clothes damp. Cleaning the vent usually solves this immediately."
                  }
                }
              ]
            })
          }}
        />
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-center mb-10">Common questions from homeowners searching for dryer vent services.</p>
          <div className="space-y-4">
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-orange-200 open:ring-1 open:ring-orange-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>How often should I clean my dryer vent?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Experts recommend professional dryer vent cleaning at least once a year. Larger families or those with pets should clean it every 6-9 months to prevent fire hazards.
              </p>
            </details>
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-orange-200 open:ring-1 open:ring-orange-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>How do I know if my dryer vent is clogged?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Major signs include: clothes taking more than one cycle to dry, the dryer being hot to the touch, a burning smell, or the outside vent flap not opening when the dryer is running.
              </p>
            </details>
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-orange-200 open:ring-1 open:ring-orange-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>Does cleaning the vent help save energy?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Yes! A clogged vent restricts airflow, forcing the dryer to work harder and run longer. Cleaning it restores efficiency, often reducing drying time by 50% and significantly lowering your utility bills.
              </p>
            </details>
          </div>
        </section>

      </main>

      <TrustBadges />
      <Footer />
    </div>
  )
}
