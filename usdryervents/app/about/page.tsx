import Link from 'next/link'
import Footer from '@/components/Footer'
import { NavbarCallBtn } from '@/components/CallBtn'
import TrustBadges from '@/components/TrustBadges'

export const metadata = {
    title: 'About US Dryer Vents | America\'s Trusted Vent Cleaning Experts',
    description: 'Learn about US Dryer Vents - the leading provider of dryer vent cleaning and repair services in 31,000+ cities. Prevent fires and improve efficiency with our licensed professionals.',
}

export default function AboutPage() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "name": "US Dryer Vents",
        "alternateName": "USDV",
        "url": "https://usdryervents.com",
        "logo": "https://usdryervents.com/logo.png",
        "foundingDate": "2015",
        "description": "America's leading dryer vent cleaning and repair network, connecting homeowners with licensed, insured professionals in over 31,000 cities across all 50 states.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "2233 Road Druid",
            "addressLocality": "Clearwater",
            "addressRegion": "FL",
            "postalCode": "33765",
            "addressCountry": "US"
        },
        "telephone": "+1-877-660-4756",
        "email": "contact@usdryervents.com",
        "sameAs": [
            "https://www.facebook.com/usdryervents",
            "https://www.instagram.com/usdryervents"
        ],
        "areaServed": {
            "@type": "Country",
            "name": "United States"
        },
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "minValue": 500,
            "maxValue": 1000
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "10547",
            "bestRating": "5",
            "worstRating": "1"
        },
        "hasCredential": [
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Professional Certification",
                "name": "CSIA Certified Dryer Exhaust Technician"
            },
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Business Accreditation",
                "name": "BBB A+ Rating"
            }
        ]
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-500">
                        US Dryer Vents
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="hidden md:block text-sm font-medium text-slate-600 hover:text-orange-600">
                            Back to Home
                        </Link>
                        <NavbarCallBtn />
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 mb-4 rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-sm font-semibold">
                            Established 2015 • 50,000+ Vents Cleaned
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">About US Dryer Vents</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            America's most trusted dryer vent safety network, protecting homes from fire hazards since 2015.
                        </p>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 bg-slate-900 rounded-2xl text-white text-center">
                        <div>
                            <div className="text-3xl font-bold text-orange-400">31,000+</div>
                            <div className="text-sm text-slate-300">Cities Served</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-400">50,000+</div>
                            <div className="text-sm text-slate-300">Safe Homes</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-400">4.9/5</div>
                            <div className="text-sm text-slate-300">Customer Rating</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-400">9 Years</div>
                            <div className="text-sm text-slate-300">Industry Experience</div>
                        </div>
                    </div>

                    <div className="space-y-10 text-lg text-slate-600 leading-relaxed">
                        {/* Our Story */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-orange-600">📖</span> Our Story
                            </h2>
                            <p>
                                US Dryer Vents was founded in <strong>2015</strong> with a singular mission: to reduce the risk of home fires across America. We realized that thousands of house fires every year are caused by something as simple and preventable as a clogged dryer vent.
                            </p>
                            <p className="mt-4">
                                Starting as a local safety initiative, we have grown into <strong>America's largest network of dryer vent professionals</strong>. We connect homeowners with certified technicians who specialize in airflow efficiency and fire prevention, ensuring peace of mind for families in every state.
                            </p>
                        </section>

                        {/* Our Expertise */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-orange-600">🎓</span> Our Expertise
                            </h2>
                            <p>
                                Reliable service is our hallmark. Every technician in our network adheres to strict safety protocols:
                            </p>
                            <ul className="list-none space-y-3 mt-4">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <span><strong>Certified Technicians</strong> trained in proper airflow dynamics and blockage removal</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <span><strong>Fully Insured</strong> for your protection and peace of mind</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <span><strong>Specialized Equipment</strong> utilizing rotary brushes and HEPA vacuums for deep cleaning</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <span><strong>Code Compliance Checks</strong> to ensure your ductwork meets current building safety standards</span>
                                </li>
                            </ul>
                        </section>

                        {/* Our Certifications */}
                        <section className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-orange-600">🏆</span> Certifications & Accreditation
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-orange-100">
                                    <div className="font-bold text-slate-900">BBB A+ Rating</div>
                                    <div className="text-sm text-slate-600">Better Business Bureau Accredited</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-orange-100">
                                    <div className="font-bold text-slate-900">Fire Safety Compliant</div>
                                    <div className="text-sm text-slate-600">Adheres to NFPA 211 Safety Standards</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-orange-100">
                                    <div className="font-bold text-slate-900">Bird & Pest Guard Pro</div>
                                    <div className="text-sm text-slate-600">Humane exclusion techniques</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-orange-100">
                                    <div className="font-bold text-slate-900">Home Advisor Elite</div>
                                    <div className="text-sm text-slate-600">Top-rated service professional status</div>
                                </div>
                            </div>
                        </section>

                        {/* Contact Info */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-orange-600">📍</span> Corporate Headquarters
                            </h2>
                            <address className="not-italic text-slate-700">
                                <strong>US Dryer Vents, LLC</strong><br />
                                2233 Road Druid<br />
                                Clearwater, FL 33765<br />
                                United States<br /><br />
                                <strong>Phone:</strong> <a href="tel:+18776604756" className="text-orange-600 hover:underline">+1 (877) 660-4756</a><br />
                                <strong>Email:</strong> <a href="mailto:contact@usdryervents.com" className="text-orange-600 hover:underline">contact@usdryervents.com</a>
                            </address>
                        </section>
                    </div>
                </div>
            </main>

            <TrustBadges />
            <Footer />
        </div>
    )
}
