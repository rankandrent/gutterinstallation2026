import Link from 'next/link'
import type { NeighborhoodData } from '@/lib/neighborhoods-supabase'

interface NeighborhoodsSectionProps {
    data: NeighborhoodData
    city: string
    state: string
    stateCode: string
    serviceName: string
    serviceSlug: string
}

export default function NeighborhoodsSection({
    data,
    city,
    state,
    stateCode,
    serviceName,
    serviceSlug
}: NeighborhoodsSectionProps) {
    if (!data || (!data.neighborhoods?.length && !data.famous_buildings?.length)) {
        return null
    }

    const hasLandmarks = data.famous_buildings && data.famous_buildings.length > 0
    const hasNeighborhoods = data.neighborhoods && data.neighborhoods.length > 0

    // Generate schema markup for areaServed and landmarks
    const areaServedSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${serviceName} in ${city}, ${stateCode}`,
        "areaServed": [
            {
                "@type": "City",
                "name": city,
                "containedInPlace": {
                    "@type": "State",
                    "name": state
                }
            },
            ...(data.neighborhoods?.slice(0, 15).map(neighborhood => ({
                "@type": "Place",
                "name": neighborhood,
                "containedInPlace": {
                    "@type": "City",
                    "name": city
                }
            })) || [])
        ],
        ...(hasLandmarks && {
            "serviceArea": {
                "@type": "GeoCircle",
                "description": `${serviceName} service area covering ${city} and surrounding neighborhoods`
            }
        })
    }

    // Landmarks/Places schema
    const landmarksSchema = hasLandmarks ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Local Landmarks Near ${city}`,
        "itemListElement": data.famous_buildings.slice(0, 10).map((landmark, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Place",
                "name": landmark,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": city,
                    "addressRegion": stateCode
                }
            }
        }))
    } : null

    return (
        <section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
            {/* Schema Markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(areaServedSchema) }}
            />
            {landmarksSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(landmarksSchema) }}
                />
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header Badge */}
                <div className="flex justify-start mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        LOCAL SERVICE AREA
                    </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Side - Description & Landmarks */}
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Serving Every Corner of<br />{city}, {stateCode}
                        </h2>

                        {data.description && (
                            <div className="border-l-4 border-blue-500 pl-6 mb-8">
                                <p className="text-slate-600 leading-relaxed italic">
                                    {data.description}
                                </p>
                            </div>
                        )}

                        {/* Local Landmarks */}
                        {hasLandmarks && (
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="text-xl">🏛️</span>
                                    Local Landmarks We Serve Near
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.famous_buildings.slice(0, 8).map((landmark, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200"
                                        >
                                            {landmark}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Side - Neighborhoods List */}
                    {hasNeighborhoods && (
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Serviceable Neighborhoods
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                {data.neighborhoods.map((neighborhood, i) => (
                                    <div key={i} className="flex items-start gap-2 text-slate-700">
                                        <span className="text-blue-500 mt-1">•</span>
                                        <span className="text-sm leading-relaxed">{neighborhood}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Callout */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-center">
                    <p className="text-white text-sm md:text-base">
                        Don&apos;t see your neighborhood? We serve <strong>all zip codes</strong> in {city} and the surrounding metropolitan area!
                    </p>
                </div>
            </div>
        </section>
    )
}
