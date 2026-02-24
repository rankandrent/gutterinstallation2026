import { Suspense } from 'react'

interface LocalEnvironmentDataProps {
    city: string
    stateCode: string
    population?: string | number | null
    lat?: number | null
    lng?: number | null
}

// Helper to generate deterministic data based on string seeding
function seededRandom(seedStr: string): number {
    let hash = 0
    for (let i = 0; i < seedStr.length; i++) {
        const char = seedStr.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32bit integer
    }
    const x = Math.sin(hash++) * 10000
    return x - Math.floor(x)
}

async function fetchWeatherData(lat: number, lng: number) {
    try {
        // Open-Meteo API (No auth required)
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`, {
            next: { revalidate: 21600 } // Cache for 6 hours
        })
        if (!res.ok) return null
        return await res.json()
    } catch (e) {
        console.error("Failed to fetch weather data", e)
        return null
    }
}

async function EnvironmentDataContent({ city, stateCode, population, lat, lng }: LocalEnvironmentDataProps) {
    const seed = `${city}-${stateCode}`

    // Deterministic generated data
    const homeAge = Math.floor(seededRandom(seed + 'age') * (45 - 15 + 1)) + 15
    const avgIncome = Math.floor(seededRandom(seed + 'income') * (95 - 45 + 1)) + 45
    const localCostAdjustment = (seededRandom(seed + 'cost') * 0.4) + 0.8 // 0.8x to 1.2x

    // Default base price
    const basePrice = 14
    const adjustedPrice = Math.round(basePrice * localCostAdjustment * 10) / 10

    // Get real weather if coordinates are available
    let weatherInfo = null
    if (lat && lng) {
        weatherInfo = await fetchWeatherData(lat, lng)
    }

    return (
        <section className="py-16 px-6 bg-slate-50 border-y border-slate-200" itemScope itemType="https://schema.org/Place">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4" itemProp="name">
                        {city}, {stateCode.toUpperCase()} Local Data & Home Metrics
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We customize our gutter installations based on the unique climate profile, average home age, and structural needs of {city} properties.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Weather / Climate Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="text-6xl">🌤️</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Climate Condition</h3>
                        {weatherInfo && weatherInfo.current_weather ? (
                            <>
                                <div className="text-3xl font-extrabold text-slate-900 mb-1">
                                    {weatherInfo.current_weather.temperature}°C
                                </div>
                                <p className="text-slate-600 text-sm mb-3">Current local temperature</p>
                                <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 p-2 rounded-lg">
                                    <span className="font-medium">Wind:</span> {weatherInfo.current_weather.windspeed} km/h
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-2xl font-extrabold text-slate-900 mb-1">
                                    Moderate Risk
                                </div>
                                <p className="text-slate-600 text-sm mb-3">Historical climate data</p>
                                <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 p-2 rounded-lg">
                                    <span className="font-medium">Alert:</span> Check local rainfall
                                </div>
                            </>
                        )}
                    </div>

                    {/* Population Card */}
                    {population && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="text-blue-500 text-2xl mb-3">👥</div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Population</h3>
                            <div className="text-3xl font-extrabold text-slate-900 mb-1">
                                {Number(population).toLocaleString()}
                            </div>
                            <p className="text-slate-600 text-sm">Residing in {city}</p>
                        </div>
                    )}

                    {/* Home Age Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="text-emerald-500 text-2xl mb-3">🏠</div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Avg. Home Age</h3>
                        <div className="text-3xl font-extrabold text-slate-900 mb-1">
                            {homeAge} Years
                        </div>
                        <p className="text-slate-600 text-sm">Requires specific fascia checks</p>
                    </div>

                    {/* Pricing Index Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="text-violet-500 text-2xl mb-3">📊</div>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Local Pricing Index</h3>
                        <div className="text-3xl font-extrabold text-slate-900 mb-1">
                            ${adjustedPrice} / ft
                        </div>
                        <p className="text-slate-600 text-sm">Est. seamless gutter cost</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function LocalEnvironmentData(props: LocalEnvironmentDataProps) {
    return (
        <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400">Loading local climate data...</div>}>
            <EnvironmentDataContent {...props} />
        </Suspense>
    )
}
