import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { getSEOContent } from '@/lib/seo-content'
import RelatedServices from '@/components/RelatedServices'
import TrustBadges from '@/components/TrustBadges'
import { CallBtn, FloatingCallBtn, NavbarCallBtn } from '@/components/CallBtn'
import CoverageStats from '@/components/CoverageStats'
import Breadcrumb from '@/components/Breadcrumb'
import CityMap from '@/components/CityMap'
import InternalLinks from '@/components/InternalLinks'
import LocalBusinessList from '@/components/LocalBusinessList'
import { siteConfig } from '@/lib/site-config'

interface ServicePageProps {
    city: string
    leads?: any[]
    state: string
    stateCode: string
    zipCodes?: string[]
    relatedCities?: {
        city: string
        state_id: string
    }[]
    latitude?: number
    longitude?: number
}

export default function ServicePage({ city, state, stateCode, zipCodes, relatedCities, latitude, longitude, leads }: ServicePageProps & { leads?: any[] }) {
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    // Generate Dynamic SEO Content
    const content = getSEOContent(formattedCity, formattedState, stateCode)

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">

            {/* Navigation */}
            <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-500">
                        {siteConfig.siteName}
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                            <Link href="/" className="hover:text-orange-600 transition-colors">Locations</Link>
                            <Link href="/about" className="hover:text-orange-600 transition-colors">About</Link>
                            <Link href="/contact" className="hover:text-orange-600 transition-colors">Contact</Link>
                        </div>
                        <NavbarCallBtn />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-900 via-slate-900 to-black opacity-95"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-48 -left-24 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text */}
                    <div className="text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-orange-400/30 bg-orange-500/10 backdrop-blur-sm text-orange-300 text-sm font-semibold uppercase tracking-wider">
                            #1 Rated in {stateCode.toUpperCase()}
                        </div>
                        <h1 className="text-5xl md:text-[4rem] font-extrabold text-white mb-8 leading-tight tracking-tight">
                            Dryer Vent Cleaning, Repair & Installation in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">{formattedCity}, {stateCode.toUpperCase()}</span>
                        </h1>
                        <div className="text-xl md:text-2xl text-slate-300 mb-10 font-light space-y-4">
                            <p dangerouslySetInnerHTML={{ __html: content.intro.replace(/\*\*(.*?)\*\*/g, '<span class="text-white font-medium">$1</span>') }} />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            <CallBtn className="py-4 px-10 text-lg w-full sm:w-auto transform hover:scale-105 bg-orange-600 hover:bg-orange-700 shadow-orange-500/30" label="Call Now" showNumber={true} />
                            <Link href="#cities" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-10 rounded-full text-lg transition-all w-full sm:w-auto text-center">
                                View Locations
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Image Placeholder */}
                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
                            <div className="absolute inset-0 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                            {/* Placeholder for Hero Image - User can replace later */}
                            <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
                                <div className="text-6xl mb-4">💨</div>
                                <div className="text-2xl font-bold text-white">Professional Dryer Vent Services</div>
                                <div className="text-slate-300">Lint Removal • Duct Repair • Bird Guards</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Breadcrumb items={[
                { label: state, href: `/${stateCode}` },
                { label: formattedCity, href: `/${stateCode}/${city}` }
            ]} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "HomeAndConstructionBusiness",
                        "name": `${siteConfig.siteName} ${formattedCity}`,
                        "image": `https://${siteConfig.domain}/og-image.jpg`,
                        "url": `https://${siteConfig.domain}/${stateCode}/${city}`,
                        "telephone": siteConfig.phone,
                        "address": {
                            "@type": "PostalAddress",
                            "addressLocality": formattedCity,
                            "addressRegion": stateCode,
                            "addressCountry": "US"
                        },
                        "geo": {
                            "@type": "GeoCircle",
                            "geoMidpoint": {
                                "@type": "GeoCoordinates",
                                "latitude": latitude || "37.0902",
                                "longitude": longitude || "-95.7129"
                            },
                            "geoRadius": "50000"
                        },
                        "priceRange": "$$",
                        "openingHoursSpecification": [
                            {
                                "@type": "OpeningHoursSpecification",
                                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                                "opens": "08:00",
                                "closes": "18:00"
                            }
                        ]
                    })
                }}
            />

            <CoverageStats />

            <RelatedServices city={formattedCity} state={stateCode} />

            {/* Features Grid */}
            <section className="py-24 px-6 bg-white relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 -mt-32">
                        {[
                            { title: "Fire Prevention", desc: "Thorough lint removal reducing dryer fire risks significantly.", icon: "🔥" },
                            { title: "Energy Savings", desc: "Clean vents reduce drying time and lower your utility bills.", icon: "⚡" },
                            { title: "Code Compliance", desc: "Installations meeting all local building and safety codes.", icon: "✅" }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-orange-100 transition-all hover:-translate-y-1">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3 text-slate-800">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Content Section */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                            Why {formattedCity} Homeowners Trust Us
                        </h2>
                        <div className="text-lg text-slate-600 mb-6 leading-relaxed space-y-4">
                            <p dangerouslySetInnerHTML={{ __html: content.whyChoose.replace(/\*\*(.*?)\*\*/g, '<span class="text-slate-900 font-semibold">$1</span>') }} />
                            <p dangerouslySetInnerHTML={{ __html: content.materials.replace(/\*\*(.*?)\*\*/g, '<span class="text-slate-900 font-semibold">$1</span>') }} />
                        </div>

                        {/* Technical Specs Box */}
                        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 mb-4">
                            <p className="text-sm text-slate-700 font-semibold mb-1">📐 Technical Specifications</p>
                            <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: content.technicalSpecs.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>

                        {/* Climate Considerations */}
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mb-6">
                            <p className="text-sm text-orange-800 font-semibold mb-1">🌤️ {stateCode.toUpperCase()} Weather Impact</p>
                            <p className="text-sm text-orange-700">{content.climateConsiderations}</p>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {['Certified Technicians in ' + stateCode.toUpperCase(), '100% Satisfaction Guarantee', 'Mess-Free Service'].map((item, i) => (
                                <li key={i} className="flex items-center text-slate-700 font-medium">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mt-4">
                            <p className="text-sm text-blue-800 font-semibold mb-1">Service Area Coverage</p>
                            <div className="text-blue-600">
                                We cover all neighborhoods in <span className="underline">{formattedCity}</span> and surrounding {stateCode.toUpperCase()} counties.
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Placeholder for Local Image */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-red-400 rounded-3xl transform rotate-3 opacity-20"></div>
                        <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                            <div className="aspect-[4/3] bg-slate-200 rounded-2xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-5xl mb-2">🏠</div>
                                    <div className="font-bold text-slate-500">Serving {formattedCity}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Zip Codes */}
            {zipCodes && zipCodes.length > 0 && (
                <section className="py-16 px-6 bg-white border-y border-slate-100">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                            Serving Homes in {formattedCity} Zip Codes
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {zipCodes.map((zip, i) => (
                                <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:border-orange-300 hover:text-orange-600 transition-colors cursor-default">
                                    {zip}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Cities */}
            {relatedCities && relatedCities.length > 0 && (
                <section className="py-16 px-6 bg-slate-50 border-b border-slate-200">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                            Dryer Vent Services Near Other {stateCode.toUpperCase()} Cities
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {relatedCities.map((cityData, i) => (
                                <Link
                                    key={i}
                                    href={`/${cityData.state_id.toLowerCase()}/${cityData.city.toLowerCase().replace(/ /g, '-')}`}
                                    className="block p-3 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all text-center text-slate-700 font-medium hover:text-orange-600"
                                >
                                    <span className="block text-xs text-slate-400 mb-1">Dryer Vent Cleaning</span>
                                    {cityData.city}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Services Detailed Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                            Complete Dryer Vent Solutions in {formattedCity}
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            {content.serviceDesc.replace(/\*\*(.*?)\*\*/g, '$1')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Dryer Vent Cleaning",
                                desc: "Comprehensive lint removal using rotary brushes and HEPA vacuums. We clean from endpoint to appliance.",
                                bg: "bg-blue-50", text: "text-blue-600", icon: "🧹"
                            },
                            {
                                title: "Vent Repair & Rerouting",
                                desc: "Fixing crushed hoses, disconnected ducts, and inefficient long runs. We install rigid metal ductwork.",
                                bg: "bg-orange-50", text: "text-orange-600", icon: "🔧"
                            },
                            {
                                title: "Bird Guard Installation",
                                desc: "Prevent birds and squirrels from nesting in your vent with high-quality steel cages and covers.",
                                bg: "bg-green-50", text: "text-green-600", icon: "🐦"
                            },
                            {
                                title: "Commercial Services",
                                desc: "Service for apartments, condos, and laundromats. We handle high-volume systems efficiently.",
                                bg: "bg-purple-50", text: "text-purple-600", icon: "🏢"
                            }
                        ].map((service, i) => (
                            <div key={i} className="flex gap-6 p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl transition-shadow group">
                                <div className={`w-16 h-16 rounded-xl ${service.bg} ${service.text} flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform`}>
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                            Our Cleaning Process
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            {content.processIntro}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 hidden md:block"></div>
                        {[
                            { step: "01", title: "Inspection", desc: "We check airflow velocity and inspect the external vent cap for damage or blockages." },
                            { step: "02", title: "Rotary Cleaning", desc: "Our brush system scrubs the entire duct length while the vacuum captures all lint." },
                            { step: "03", title: "Verification", desc: "We measure airflow again to ensure your dryer is operating at peak efficiency." }
                        ].map((step, i) => (
                            <div key={i} className="bg-white p-8 pt-0 text-center">
                                <div className="w-20 h-20 mx-auto bg-orange-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-orange-200 mb-8 relative z-10">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                <p className="text-slate-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Business List */}
            {leads && leads.length > 0 && (
                <LocalBusinessList
                    leads={leads}
                    city={formattedCity}
                    state={stateCode}
                    service="Dryer Vent Services"
                />
            )}

            {/* Testimonials */}
            <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-12 text-center">
                        What Neighbors in {formattedCity} Are Saying
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Jennifer M.", role: "Homeowner", text: "My dryer was taking 3 cycles to dry towels. After they cleaned it, it's done in 45 minutes! Worth every penny.", stars: 5 },
                            { name: "Robert T.", role: "Local Resident", text: "They found a bird's nest completely blocking my vent. Installed a guard so it won't happen again. Great service.", stars: 5 },
                            { name: "Lisa K.", role: "business Owner", text: "Professional, on time, and very clean. No lint dust left behind anywhere.", stars: 5 }
                        ].map((review, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(review.stars)].map((_, i) => <span key={i}>★</span>)}
                                </div>
                                <p className="text-slate-600 mb-6 italic">"{review.text}"</p>
                                <div>
                                    <div className="font-bold text-slate-900">{review.name}</div>
                                    <div className="text-sm text-slate-500">{review.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Is your dryer safe?
                    </h2>
                    <p className="text-orange-200 text-xl mb-10 max-w-2xl mx-auto">
                        Don't risk a fire. Schedule your professional dryer vent cleaning in {formattedCity} today.
                    </p>
                    <CallBtn className="py-4 px-12 text-xl bg-orange-600 hover:bg-orange-700" label={`Call Now in ${formattedCity}`} />
                </div>
            </section>

            <InternalLinks
                currentCity={formattedCity}
                stateCode={stateCode}
                relatedCities={relatedCities}
            />

            <TrustBadges />
            <Footer />
        </div>
    )
}
