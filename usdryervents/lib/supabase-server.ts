import { createClient } from '@supabase/supabase-js'

// Fallback for build time if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder_signature'

// Ensure we don't crash the build if vars are missing, but warn in dev
if (!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NODE_ENV !== 'production') {
    console.warn('Missing Supabase Server environment variables, using placeholders')
}

// Create a single supabase client for interacting with your database
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        persistSession: false,
    }
})
