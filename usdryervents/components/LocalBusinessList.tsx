import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

interface Lead {
    id: number
    company_name: string
    address: string
    city: string
    state: string
    service: string
    maps_url: string | null
    phone?: string // Optional for now
}

interface LocalBusinessListProps {
    leads: Lead[]
    city: string
    state: string
    service?: string
}

export default function LocalBusinessList({ leads, city, state, service }: LocalBusinessListProps) {
    if (!leads || leads.length === 0) {
        return null
    }

    // Default service name if not provided
    const serviceName = service || 'Dryer Vent Services'

    return (
        <section className="py-16 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Top {leads.length} Best {serviceName} in {city}, {state}
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Connect with top-rated local companies near you. Verified for quality and reliability.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="p-4 font-semibold text-slate-700">Company Name</th>
                                <th className="p-4 font-semibold text-slate-700">Address</th>
                                <th className="p-4 font-semibold text-slate-700">Service</th>
                                <th className="p-4 font-semibold text-slate-700 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {leads.map((lead, index) => {
                                const actionLabels = ["Call Now", "Request Quote", "Get Estimate", "Speak to Pro"];
                                const actionLabel = actionLabels[index % actionLabels.length];

                                // Import PHONE_HREF from CallBtn if not already imported, or just use hardcoded if easier, but best practice is import.
                                // Since I can't easily add the import at the top within this Replace, I'll use the value or try to add import in a separate step if needed. 
                                // Actually, I'll just check if I can add the import. I'll assume PHONE_HREF is available or I'll copy the value "tel:+13213420091" to be safe and avoiding import errors if not present.
                                // Wait, I can just use the tool capability to replace the whole file or a larger chunk including imports? 
                                // To be safe and clean, I will replace the component body.

                                return (
                                    <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-medium text-slate-900 border-b border-slate-100">
                                            {lead.company_name}
                                        </td>
                                        <td className="p-4 text-slate-600 border-b border-slate-100 max-w-xs truncate">
                                            {lead.address}
                                        </td>
                                        <td className="p-4 text-slate-600 border-b border-slate-100 capitalize">
                                            {lead.service || serviceName}
                                        </td>
                                        <td className="p-4 text-right border-b border-slate-100">
                                            <a
                                                href={`tel:${siteConfig.phone}`}
                                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm cursor-pointer min-w-[140px]"
                                            >
                                                {actionLabel}
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>Are you a local business? <Link href="/contact" className="text-blue-600 hover:underline">List your company here</Link></p>
                </div>
            </div>
        </section>
    )
}
