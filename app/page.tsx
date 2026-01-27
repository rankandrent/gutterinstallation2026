import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/RelatedServices'
import TrustBadges from '@/components/TrustBadges'
import { Metadata } from 'next'

export const revalidate = 86400 // Revalidate daily

export const metadata: Metadata = {
  title: 'Gutter Installation Near Me | Seamless Gutters, Guards & Repair Services',
  description: 'Looking for gutter installation near me? Find licensed gutter contractors in 31,000+ cities. Seamless gutter installation, gutter guards, gutter cleaning, soffit & fascia repair. Free quotes in 24 hours!',
  keywords: 'gutter installation near me, seamless gutters near me, gutter repair near me, gutter guards near me, gutter cleaning near me, gutter companies near me, leaf guard gutters near me, soffit repair near me, fascia repair near me, downspout installation near me',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Find Gutter Installation Near Me | America\'s #1 Gutter Service Directory',
    description: 'Connect with top-rated gutter installers near you. Seamless gutters, gutter guards, cleaning & repair with lifetime warranty. Free estimates!',
    url: 'https://usgutterinstallation.com',
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">
      {/* Hero Section - Optimized for "Near Me" */}
      <header className="relative py-32 px-6 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-slate-900 to-black opacity-95"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-48 -left-24 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-blue-300 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Find Gutter Services Near You
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight leading-tight">
            Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Gutter Installation</span><br />Near Me
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-12 leading-relaxed">
            Searching for <span className="text-white font-semibold">gutter contractors near me</span>? Connect with licensed, insured gutter installers in over <span className="text-white font-semibold">31,000+ cities</span> across all 50 states. Get same-day quotes for seamless gutters, gutter guards, repairs & more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#states" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl shadow-blue-600/20 transition-all transform hover:scale-105">
              Find Gutter Installers Near Me
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
              <div className="text-slate-500 text-sm font-medium">Cities with Local Gutter Pros</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">50</div>
              <div className="text-slate-500 text-sm font-medium">States Covered Near You</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">4.9/5</div>
              <div className="text-slate-500 text-sm font-medium">Average Customer Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-slate-900 mb-1">24h</div>
              <div className="text-slate-500 text-sm font-medium">Fast Local Quotes</div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: What We Offer Section - Semantic Content */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Gutter Services Near Me</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Find professional seamless gutter installation, gutter guards, cleaning, and repair services. All our contractors are licensed, insured, and background-checked.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Seamless Gutter Installation", desc: "Custom-fabricated 5\" and 6\" K-style aluminum gutters made on-site. No seams means no leaks. Lifetime warranty.", icon: "🔧" },
              { title: "Gutter Guards & Leaf Protection", desc: "Micro-mesh gutter guards block leaves, pine needles, and debris. Stop cleaning gutters forever.", icon: "🛡️" },
              { title: "Gutter Cleaning & Maintenance", desc: "Professional debris removal, downspout flushing, and full system inspection. Same-day service available.", icon: "🧹" },
              { title: "Downspout Installation", desc: "Properly sized 2x3\" and 3x4\" downspouts with underground extensions to protect your foundation.", icon: "💧" },
              { title: "Soffit & Fascia Repair", desc: "Replace rotted wood fascia and repair ventilated soffit panels. Color matching included.", icon: "🏠" },
              { title: "Emergency Gutter Repair", desc: "Fast response for sagging gutters, leaks, and storm damage. 7-day availability.", icon: "🚨" }
            ].map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all">
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Find Gutter Installation Near Me by State</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Select your state to find trusted local gutter contractors. Each location has verified installers offering seamless gutter installation, gutter guards, and repair services near you.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {uniqueStates.map((state) => (
              <Link
                key={state.state_id}
                href={`/${state.state_id.toLowerCase()}`}
                className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{state.state_id}</span>
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900">{state.state_name}</span>
                </div>
                <div className="text-slate-300 group-hover:text-blue-500 transition-colors">
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

        {/* NEW: Common Gutter Problems Section - LSI Keywords */}
        <section className="mb-32 bg-white rounded-3xl p-8 md:p-12 border border-slate-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Common Gutter Problems We Fix</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">When you search for gutter repair near me, these are the most common issues our local contractors solve daily.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { problem: "Sagging Gutters", solution: "Reinforcing hangers and re-pitching for proper drainage", icon: "�" },
              { problem: "Leaking Seams", solution: "Sealing joints or replacing with seamless gutters", icon: "�" },
              { problem: "Clogged Gutters", solution: "Professional cleaning and gutter guard installation", icon: "🍂" },
              { problem: "Overflowing Water", solution: "Proper sizing and additional downspout installation", icon: "🌊" },
              { problem: "Rotted Fascia", solution: "Wood replacement and aluminum fascia wrap installation", icon: "🪵" },
              { problem: "Ice Dams", solution: "Heat cable installation and improved attic ventilation", icon: "❄️" },
              { problem: "Improper Pitch", solution: "Re-sloping gutters for optimal water flow", icon: "📐" },
              { problem: "Rust & Corrosion", solution: "Replacement with aluminum or copper gutter systems", icon: "🔧" }
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Find Gutter Installers Near Me</h2>
              <p className="text-slate-400 mb-12 max-w-2xl mx-auto">Connect with local gutter contractors in 3 easy steps</p>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 rotate-3">1</div>
                  <h3 className="text-xl font-bold mb-4">Select Your Location</h3>
                  <p className="text-slate-400 leading-relaxed">Browse our directory to find gutter installation services near you. We cover every zip code in all 50 states.</p>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 -rotate-3">2</div>
                  <h3 className="text-xl font-bold mb-4">Describe Your Issue</h3>
                  <p className="text-slate-400 leading-relaxed">Select from seamless gutter installation, gutter guards, cleaning, or soffit & fascia repair needs.</p>
                </div>
                <div className="relative">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 rotate-3">3</div>
                  <h3 className="text-xl font-bold mb-4">Get Free Local Quote</h3>
                  <p className="text-slate-400 leading-relaxed">Request a free estimate from verified local contractors. Fast response times for storm damage and emergency repairs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: Why Local Matters Section */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Search for &quot;Gutter Installation Near Me&quot;?</h2>
              <div className="space-y-4 text-slate-600">
                <p>When you search for <strong>gutter installation near me</strong>, you&apos;re looking for contractors who understand your local rainfall patterns, roof types, and climate conditions.</p>
                <p>Local gutter companies offer faster response times—crucial during storms—and know exactly which gutter size and material works best for homes in your neighborhood.</p>
                <p>Our network of <strong>gutter contractors near me</strong> includes only licensed, insured professionals who have been vetted for quality workmanship and reliability.</p>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Licensed & insured gutter contractors",
                  "Emergency storm damage response",
                  "Knowledge of local rainfall patterns",
                  "Proper gutter sizing for your roof",
                  "No travel fees or long wait times",
                  "Lifetime warranty on materials, 10 years labor"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl">
              <h3 className="font-bold text-xl text-slate-900 mb-4">Popular &quot;Near Me&quot; Searches</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "seamless gutter installation near me",
                  "gutter repair near me",
                  "gutter guards near me",
                  "gutter cleaning near me",
                  "soffit and fascia repair near me",
                  "downspout installation near me",
                  "copper gutters near me",
                  "leaf guard gutters near me",
                  "gutter companies near me",
                  "emergency gutter repair",
                  "gutter replacement near me"
                ].map((term, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white text-slate-600 text-sm rounded-full border border-slate-200">{term}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Enhanced with Near Me Keywords */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do I find gutter installation near me?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply select your state from our directory, then choose your city. You'll find verified local gutter contractors with ratings, services offered, and contact information. Request a free quote online or call directly."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does gutter installation near me cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Seamless aluminum gutter installation typically costs $6-12 per linear foot. A standard 150-200 linear foot home averages $1,200-$2,400. Copper gutters range from $25-40 per linear foot. Gutter guards add $7-15 per linear foot."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need gutter guards?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we highly recommend them. Gutter guards eliminate the need for regular cleaning, prevent clogs, and protect your foundation from overflow. They're especially valuable if you have trees near your home."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long do gutters last?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Aluminum gutters last 20-30 years with proper maintenance. Copper gutters can last 50-75+ years. If your gutters are sagging, leaking, or rusting, we recommend replacement before water damage occurs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can you fix sagging gutters?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Sagging gutters often indicate loose hangers, improper pitch, or water weight from clogs. Our local pros can reinforce hangers, re-pitch for proper drainage, and fix the underlying issue quickly."
                  }
                }
              ]
            })
          }}
        />
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Frequently Asked Questions About Gutters</h2>
          <p className="text-slate-600 text-center mb-10">Common questions from homeowners searching for gutter installation and repair services.</p>
          <div className="space-y-4">
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>How do I find gutter installation near me?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Simply select your state from our directory, then choose your city. You&apos;ll find verified local gutter contractors with ratings, services offered, and contact information. Request a free quote online or call directly.
              </p>
            </details>
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>How much does gutter installation cost?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Seamless aluminum gutter installation typically costs $6-12 per linear foot. A standard 150-200 linear foot home averages $1,200-$2,400. Copper gutters range from $25-40 per linear foot. Gutter guards add $7-15 per linear foot.
              </p>
            </details>
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>Do I really need gutter guards?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Yes, we highly recommend them. Gutter guards eliminate the need for regular cleaning, prevent clogs, and protect your foundation from overflow. They&apos;re especially valuable if you have trees near your home.
              </p>
            </details>
            <details className="group bg-white p-6 rounded-2xl border border-slate-200 open:border-blue-200 open:ring-1 open:ring-blue-200 transition-all">
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                <span>How long do gutters last?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-slate-600 mt-4 leading-relaxed group-open:animate-fadeIn">
                Aluminum gutters last 20-30 years with proper maintenance. Copper gutters can last 50-75+ years. If your gutters are sagging, leaking, or rusting, we recommend replacement before water damage occurs.
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
