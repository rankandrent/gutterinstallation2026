import { supabaseServer as supabase } from '@/lib/supabase-server'
import { headers } from 'next/headers'
import ServicePage from '@/components/ServicePage'
import { Metadata } from 'next'
import { getCityData, getRelatedCities, getCityLeads } from '@/lib/data-fetching'
import { siteConfig } from '@/lib/site-config'

// Allow ISR
export const revalidate = 3600
export const dynamicParams = true

interface PageProps {
    params: Promise<{
        state: string
        city: string
    }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params
    const { state, city } = params

    // Determine the root domain and protocol
    const headersList = await headers()
    const host = headersList.get('host') || siteConfig.domain
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const baseDomain = host.includes('localhost') ? 'localhost:3000' : siteConfig.domain

    // Fetch data for accurate State Name
    const cityData = await getCityData(state, city)

    // Format City/State for display
    const formattedCity = cityData?.city || city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const stateCode = cityData?.state_id || state.toUpperCase()

    // Construct Canonical URL (City-State Subdomain)
    const citySlug = city.toLowerCase()
    const stateShort = state.toLowerCase()
    const subdomain = `${citySlug}-${stateShort}`
    const canonicalUrl = `${protocol}://${subdomain}.${baseDomain}/`

    return {
        title: `Dryer Vent Cleaning Near Me in ${formattedCity}, ${stateCode} | Local Pros`,
        description: `Looking for dryer vent cleaning near me in ${formattedCity}, ${stateCode}? Find licensed local technicians for cleaning, repair, and bird guard installation. Get a free quote in 24 hours!`,
        keywords: `dryer vent cleaning near me ${formattedCity}, dryer vent repair near me ${formattedCity} ${stateCode}, bird guard installation ${formattedCity}, dryer vent installation ${formattedCity}, commercial dryer vent cleaning ${formattedCity}`,
        alternates: {
            canonical: canonicalUrl
        },
        openGraph: {
            title: `Find Dryer Vent Cleaning Near Me in ${formattedCity}, ${stateCode}`,
            description: `Connect with the #1 rated dryer vent technicians near you in ${formattedCity}. Cleaning, repair, and installation services. Safety guaranteed. Free quotes!`,
            url: canonicalUrl,
        }
    }
}

export default async function Page(props: PageProps) {
    const params = await props.params
    const { state, city } = params

    const cityData = await getCityData(state, city)

    const cityName = cityData?.city || city
    const stateName = cityData?.state_name || state
    const stateCodeProper = cityData?.state_id || state

    // Parse zip codes from space-separated string
    const zipCodes = cityData?.zips ? cityData.zips.split(' ').filter(Boolean) : []

    // Fetch related cities
    const relatedCities = await getRelatedCities(stateCodeProper, cityName)

    // Fetch local leads
    const localLeads = await getCityLeads(stateCodeProper, cityName)

    return (
        <>
            <ServicePage
                city={cityName}
                state={stateName}
                stateCode={stateCodeProper}
                zipCodes={zipCodes}
                relatedCities={relatedCities}
                latitude={cityData?.lat}
                longitude={cityData?.lng}
                leads={localLeads}
            />
        </>
    )
}
