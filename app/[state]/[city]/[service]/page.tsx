import { getCityData, getRelatedCities } from '@/lib/data-fetching'
import { servicesData } from '@/lib/services-data'
import ServiceSpecificPage from '@/components/ServiceSpecificPage'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

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

    // Validate Service
    const serviceInfo = servicesData[service]
    if (!serviceInfo) return {}

    // Format City/State
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.toUpperCase()

    // SEO-optimized meta titles for specific services
    const metaTitles: Record<string, string> = {
        'ice-dam-removal': `Ice Dam Removal Near Me ${formattedCity}, ${formattedState} | Steam Removal`,
        'ice-dam-prevention': `Ice Dam Prevention ${formattedCity}, ${formattedState} | Stop Ice Dams`,
        'roof-snow-removal': `Roof Snow Removal Near Me ${formattedCity}, ${formattedState} | Safe Snow Clearing`,
        'gutter-heat-cables': `Gutter Heat Cables ${formattedCity}, ${formattedState} | Heat Cable Installation`,
        'seamless-gutter-installation': `Seamless Gutter Installation Near Me ${formattedCity}, ${formattedState}`,
        'gutter-guards-leaf-protection': `Gutter Guards Near Me ${formattedCity}, ${formattedState} | Leaf Protection`,
        'gutter-cleaning-maintenance': `Gutter Cleaning Near Me ${formattedCity}, ${formattedState} | Same-Day Service`,
    }

    const metaTitle = metaTitles[service] || `${serviceInfo.title} ${formattedCity}, ${formattedState} | US Gutter Installation`

    return {
        title: metaTitle,
        description: serviceInfo.description(formattedCity, formattedState),
        alternates: {
            canonical: `/${state.toLowerCase()}/${city.toLowerCase()}/${service}`
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

    // If city not found, fallback to URL params but it's risky. 
    // Ideally we should 404 if city data is invalid too.
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
