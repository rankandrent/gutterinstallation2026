import { supabase } from '@/lib/supabase'

export async function getCityData(stateCode: string, citySlug: string) {
    // Convert slug back to potential search term (e.g. 'new-york' -> 'New York')
    // We use ilike to be safe.
    const citySearchTerm = citySlug.replace(/-/g, ' ')

    const { data, error } = await supabase
        .from('usa city name') // Table name from screenshot
        .select('*')
        .ilike('state_id', stateCode) // Column 'state_id' (e.g. 'PA')
        .ilike('city', citySearchTerm) // Column 'city' (e.g. 'Abbottstown')
        // We limit to 1. Note: There might be duplicate city names in same state (rare but possible with counties), 
        // strictly we might want to just take the first one found.
        .limit(1)
        .maybeSingle()

    if (error || !data) {
        if (error) {
            console.error('Error fetching city:', error)
        }
        return null
    }
    return data
}

export async function getRelatedCities(stateCode: string, currentCity: string, lat?: number, lng?: number) {
    const limit = (lat && lng) ? 150 : 10;

    const { data } = await supabase
        .from('usa city name')
        .select('city, state_id, lat, lng')
        .eq('state_id', stateCode)
        .neq('city', currentCity)
        .order('population', { ascending: false })
        .limit(limit)

    if (!data) return [];

    if (lat && lng) {
        // Calculate distance and sort by closest geographic proximity
        const withDistance = data.map(city => {
            if (!city.lat || !city.lng) return { ...city, dist: Infinity };
            // Simple Euclidean distance approximation for relative sorting within a state
            const dist = Math.sqrt(Math.pow(Number(city.lat) - lat, 2) + Math.pow(Number(city.lng) - lng, 2));
            return { ...city, dist };
        });

        withDistance.sort((a, b) => a.dist - b.dist);
        return withDistance.slice(0, 10);
    }

    return data;
}
