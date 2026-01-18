import Link from 'next/link'
import { headers } from 'next/headers'
import { supabaseServer as supabase } from '@/lib/supabase-server'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/RelatedServices'
import Breadcrumb from '@/components/Breadcrumb'
import { NavbarCallBtn } from '@/components/CallBtn'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 3600

interface StatePageProps {
    params: Promise<{
        state: string
    }>
}

// Fetch cities for a state
async function getStateData(stateCode: string) {
    const { data, error } = await supabase
        .from('usa city name')
        .select('city, state_name, state_id, zips')
        .ilike('state_id', stateCode)
        .order('city', { ascending: true })

    if (error) {
        console.error('Error fetching state cities:', error)
        return null
    }
    return data
}

export async function generateMetadata(props: StatePageProps): Promise<Metadata> {
    const params = await props.params
    const stateCode = params.state.toUpperCase()

    const headersList = await headers()
    const host = headersList.get('host') || siteConfig.domain
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const baseDomain = host.includes('localhost') ? 'localhost:3000' : siteConfig.domain

    const { data: cityData } = await supabase
        .from('usa city name')
        .select('state_name')
        .ilike('state_id', stateCode)
        .limit(1)
        .single()

    const stateName = cityData?.state_name || stateCode
    const subdomain = stateCode.toLowerCase()
    const canonicalUrl = `${protocol}://${subdomain}.${baseDomain}/`

    return {
        title: `Dryer Vent Cleaning Near Me in ${stateName} | Local Pros`,
        description: `Find dryer vent cleaning near me in ${stateName}. Connect with licensed local technicians for cleaning, repair, and bird guard installation. Prevent fires & save energy!`,
        keywords: `dryer vent cleaning near me ${stateName}, dryer vent repair near me ${stateName}, dryer vent installation ${stateName}, bird guard installation ${stateName}`,
        alternates: {
            canonical: canonicalUrl
        },
        openGraph: {
            title: `Find Dryer Vent Cleaning Near Me in ${stateName}`,
            description: `Connect with top-rated dryer vent pros near you in ${stateName}. Cleaning, repair, and installation with safety guarantee. Free quotes!`,
            url: canonicalUrl,
            type: 'website'
        }
    }
}

export default async function StatePage(props: StatePageProps) {
    const params = await props.params
    const stateCode = params.state

    const cities = await getStateData(stateCode)

    if (!cities || cities.length === 0) {
        return notFound()
    }

    const stateName = cities[0].state_name

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white flex flex-col">
            {/* Header / Hero */}
            <header className="relative py-24 px-6 overflow-hidden bg-slate-900">
                <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
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
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-900 via-slate-900 to-black opacity-95"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-orange-400/30 bg-orange-500/10 backdrop-blur-sm text-orange-300 text-sm font-semibold uppercase tracking-wider">
                        Serving All of {stateName}
                    </div>
                    <h1 className="text-5xl md:text-[4rem] font-extrabold mb-6 tracking-tight">
                        Dryer Vent Services in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">{stateName}</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Find your local expert. We provide professional dryer vent cleaning, repair, and installation services across {cities.length} cities in {stateCode.toUpperCase()}.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <Link href="/" className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-sm font-medium">
                            &larr; View All States
                        </Link>
                    </div>
                </div>
            </header>

            <Breadcrumb items={[
                { label: stateName, href: `/${params.state.toLowerCase()}` }
            ]} />

            <RelatedServices state={stateName} />

            <main className="max-w-7xl mx-auto py-16 px-6 relative z-20 -mt-10 mb-auto">
                <section id="cities">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Select Your City</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Find top-rated dryer vent pros in {cities.length} {stateName} locations.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {cities.map((city, index) => {
                            const citySlug = city.city.trim().toLowerCase().replace(/\s+/g, '-')
                            const primaryZip = city.zips ? city.zips.split(' ')[0] : ''

                            return (
                                <Link
                                    key={index}
                                    href={`/${city.state_id.toLowerCase()}/${citySlug}`}
                                    className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="flex flex-col text-left">
                                        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">{primaryZip}</span>
                                        <span className="font-semibold text-slate-700 group-hover:text-slate-900 text-sm md:text-base line-clamp-1" title={city.city}>
                                            {city.city}
                                        </span>
                                    </div>
                                    <div className="text-slate-300 group-hover:text-orange-500 transition-colors">
                                        &rarr;
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="mt-20 text-center max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Why Choose {siteConfig.siteName} in {stateName}?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <div className="text-4xl mb-4">🛡️</div>
                            <h3 className="font-bold text-lg mb-2">Local Experts</h3>
                            <p className="text-slate-600 text-sm">Our teams are based right here in {stateName}, ensuring fast service.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="font-bold text-lg mb-2">Prevent Fires</h3>
                            <p className="text-slate-600 text-sm">Professional cleaning drastically reduces dryer fire risks.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                            <div className="text-4xl mb-4">⭐</div>
                            <h3 className="font-bold text-lg mb-2">Top Rated</h3>
                            <p className="text-slate-600 text-sm">Consistently rated 5-stars by homeowners across the state.</p>
                        </div>
                    </div>
                </section>
            </main>

            <div className="max-w-3xl mx-auto mt-20 text-center text-slate-500 text-sm">
                <p className="mb-4">
                    Listing {cities.length} cities in {cities[0].state_name}
                </p>
            </div>


            <Footer />
        </div >
    )
}
