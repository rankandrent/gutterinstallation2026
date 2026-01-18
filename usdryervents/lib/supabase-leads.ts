import { createClient } from '@supabase/supabase-js'

// Fallback for build time if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_LEADS || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY_LEADS || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder_signature'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL_LEADS || !process.env.SUPABASE_SERVICE_ROLE_KEY_LEADS) {
    if (process.env.NODE_ENV !== 'production') {
        console.warn('Missing Supabase Leads environment variables, using placeholders')
    }
}

export const supabaseLeads = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        persistSession: false,
    }
})
