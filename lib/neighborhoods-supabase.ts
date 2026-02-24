import { createClient } from '@supabase/supabase-js'

// Separate Supabase client for neighborhoods data
const neighborhoodsSupabaseUrl = process.env.LEADS_SUPABASE_URL || 'https://placeholder.supabase.co'
const neighborhoodsSupabaseKey = process.env.LEADS_SUPABASE_SERVICE_ROLE_KEY || 'placeholder'

export const neighborhoodsSupabase = createClient(neighborhoodsSupabaseUrl, neighborhoodsSupabaseKey)

export interface NeighborhoodData {
    city: string
    state: string
    neighborhoods: string[]
    famous_buildings: string[]
    description: string
}

export async function getNeighborhoodData(city: string, state: string): Promise<NeighborhoodData | null> {
    if (!process.env.LEADS_SUPABASE_URL || process.env.LEADS_SUPABASE_URL === 'https://placeholder.supabase.co') {
        return null
    }

    try {
        const { data, error } = await neighborhoodsSupabase
            .from('neighborhoods')
            .select('*')
            .ilike('city', city)
            .ilike('state', state)
            .limit(1)
            .single()

        if (error || !data) {
            return null
        }

        return {
            city: data.city,
            state: data.state,
            neighborhoods: data.neighborhoods || [],
            famous_buildings: data.famous_buildings || [],
            description: data.description || ''
        }
    } catch {
        return null
    }
}
