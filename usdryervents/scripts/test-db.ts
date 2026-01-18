import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load .env.local manually since we are running this script directly
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('Testing Supabase Connection...')
console.log('URL:', supabaseUrl)
console.log('Key Present:', !!supabaseServiceKey)

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testFetch() {
    console.log('Fetching from "usa city name"...')
    const { data, error } = await supabase
        .from('usa city name')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error fetching cities:', error)
    } else {
        console.log('Success! Found city:', data?.[0])
    }
}

testFetch()
