import Link from 'next/link'
import Footer from '@/components/Footer'
import { NavbarCallBtn } from '@/components/CallBtn'
import TrustBadges from '@/components/TrustBadges'

export const metadata = {
    title: 'About US Gutter Installation | America\'s Trusted Gutter Experts',
    description: 'Learn about US Gutter Installation - a BBB A+ rated company serving communities nationwide. Our licensed, insured professionals specialize in seamless gutter installation, gutter guards, and repairs.',
}

export default function AboutPage() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "name": "US Gutter Installation",
        "alternateName": "US Gutter Services",
        "url": "https://usgutterinstallation.com",
        "logo": "https://usgutterinstallation.com/logo.png",
        "foundingDate": "2015",
        "description": "America's leading gutter installation service provider, protecting homes from water damage with licensed, insured professionals nationwide.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Gutter Lane",
            "addressLocality": "San Diego",
            "addressRegion": "CA",
            "postalCode": "92101",
            "addressCountry": "US"
        },
        "telephone": "+18588985338",
        "email": "support@usgutterinstallation.com",
        "sameAs": [
            "https://www.facebook.com/usgutterinstallation",
            "https://www.instagram.com/usgutterinstallation"
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
            "reviewCount": "12547",
            "bestRating": "5",
            "worstRating": "1"
        },
        "hasCredential": [
            {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Professional Certification",
                "name": "Licensed Contractor Network"
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
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                        US Gutter Installation
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="hidden md:block text-sm font-medium text-slate-600 hover:text-blue-600">
                            Back to Home
                        </Link>
                        <NavbarCallBtn />
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 mb-4 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-sm font-semibold">
                            Established 2015 • 1M+ Linear Feet Installed
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">About US Gutter Installation</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            America's most trusted seamless gutter & leaf protection network, connecting homeowners with licensed experts since 2015.
                        </p>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 p-6 bg-slate-900 rounded-2xl text-white text-center">
                        <div>
                            <div className="text-3xl font-bold text-cyan-400">31,000+</div>
                            <div className="text-sm text-slate-300">Cities Served</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-cyan-400">50,000+</div>
                            <div className="text-sm text-slate-300">Happy Homes</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-cyan-400">4.9/5</div>
                            <div className="text-sm text-slate-300">Customer Rating</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-cyan-400">9 Years</div>
                            <div className="text-sm text-slate-300">Industry Experience</div>
                        </div>
                    </div>

                    <div className="space-y-10 text-lg text-slate-600 leading-relaxed">
                        {/* Our Story */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">📖</span> Our Story
                            </h2>
                            <p>
                                US Gutter Installation was founded in <strong>2015</strong> with a single mission: to protect homes from water damage. We realized that many homeowners underestimate the importance of a properly functioning gutter system until they see water damage on their siding or foundation.
                            </p>
                            <p className="mt-4">
                                What started as a local gutter crew has grown into <strong>America's largest specialty gutter network</strong>. We focus exclusively on seamless gutters, gutter guards, and downspout systems, ensuring every installation is done right the first time.
                            </p>
                        </section>

                        {/* Our Expertise */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">🎓</span> Our Expertise
                            </h2>
                            <p>
                                Every technician in our network must meet rigorous standards:
                            </p>
                            <ul className="list-none space-y-3 mt-4">
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <span><strong>Licensed Contractors</strong> with specialized training in drainage systems</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <span><strong>Fully insured</strong> with $1M+ liability coverage and workers' compensation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <span><strong>Certified Installers</strong> for leading material brands</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">✓</span>
                                    <span><strong>Background-checked</strong> for homeowner safety and peace of mind</span>
                                </li>
                            </ul>
                        </section>

                        {/* Our Certifications */}
                        <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">🏆</span> Certifications & Accreditations
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-blue-100">
                                    <div className="font-bold text-slate-900">BBB A+ Rating</div>
                                    <div className="text-sm text-slate-600">Better Business Bureau Accredited since 2017</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-blue-100">
                                    <div className="font-bold text-slate-900">Licensed Contractors</div>
                                    <div className="text-sm text-slate-600">Network of state-licensed professionals</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-blue-100">
                                    <div className="font-bold text-slate-900">EPA Lead-Safe Certified</div>
                                    <div className="text-sm text-slate-600">Commitment to safe renovation practices</div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-blue-100">
                                    <div className="font-bold text-slate-900">Home Advisor Elite</div>
                                    <div className="text-sm text-slate-600">Top-rated service professional status</div>
                                </div>
                            </div>
                        </section>

                        {/* Contact Info */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-blue-600">📍</span> Corporate Headquarters
                            </h2>
                            <address className="not-italic text-slate-700">
                                <strong>US Gutter Installation, LLC</strong><br />
                                123 Gutter Lane<br />
                                San Diego, CA 92101<br />
                                United States<br /><br />
                                <strong>Phone:</strong> <a href="tel:+18588985338" className="text-blue-600 hover:underline">+1 (858) 898-5338</a><br />
                                <strong>Email:</strong> <a href="mailto:support@usgutterinstallation.com" className="text-blue-600 hover:underline">support@usgutterinstallation.com</a>
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
