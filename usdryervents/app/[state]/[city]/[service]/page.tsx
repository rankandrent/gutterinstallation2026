import { getCityData, getRelatedCities } from '@/lib/data-fetching'
import { headers } from 'next/headers'
import { servicesData } from '@/lib/services-data'
import ServiceSpecificPage from '@/components/ServiceSpecificPage'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'

// Generic Revalidation (ISR)
export const revalidate = 3600
export const dynamicParams = true

interface StartServicePageProps {
    params: Promise<{
        state: string
        city: string
        service: string
    }>
}

export async function generateMetadata(props: StartServicePageProps): Promise<Metadata> {
    const params = await props.params
    const { state, city, service } = params

    // Determine the root domain and protocol
    const headersList = await headers()
    const host = headersList.get('host') || siteConfig.domain
    const protocol = host.includes('localhost') ? 'http' : 'https'
    const baseDomain = host.includes('localhost') ? 'localhost:3000' : siteConfig.domain

    // Validate Service
    const serviceInfo = servicesData[service]
    if (!serviceInfo) return {}

    // Format City/State
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.toUpperCase()

    // Construct Canonical URL (City-State Subdomain + Service Path)
    const citySlug = city.toLowerCase()
    const stateShort = state.toLowerCase()
    const subdomain = `${citySlug}-${stateShort}`
    // Canonical format: https://city-state.domain.com/service
    const canonicalUrl = `${protocol}://${subdomain}.${baseDomain}/${service}`

    return {
        title: `${serviceInfo.title} ${formattedCity}, ${formattedState} | ${siteConfig.siteName}`,
        description: serviceInfo.description(formattedCity, formattedState),
        alternates: {
            canonical: canonicalUrl
        }
    }
}

export default async function Page(props: StartServicePageProps) {
    const params = await props.params
    const { state, city, service } = params

    // Validate Service
    const serviceInfo = servicesData[service]
    if (!serviceInfo) {
        return notFound()
    }

    // Fetch City Data
    const cityData = await getCityData(state, city)

    const cityName = cityData?.city || city
    const stateName = cityData?.state_name || state
    const stateCodeProper = cityData?.state_id || state

    // Fetch related cities
    const relatedCities = await getRelatedCities(stateCodeProper, cityName)

    return <ServiceSpecificPage
        city={cityName}
        state={stateName}
        stateCode={stateCodeProper}
        service={serviceInfo}
        relatedCities={relatedCities}
    />
}
