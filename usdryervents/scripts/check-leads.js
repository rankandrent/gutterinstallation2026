
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Data sample:', data);
        if (data.length > 0) {
            console.log('Keys:', Object.keys(data[0]));
        } else {
            console.log('Table is empty, cannot infer keys easily without introspection (which assumes permissions).');
        }
    }
}

checkSchema();
