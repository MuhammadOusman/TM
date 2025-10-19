require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing environment variables!');
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupSupabase() {
  try {
    const schemaPath = path.join(__dirname, '..', 'supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    const { error: schemaError } = await supabase.rpc('exec_sql', { sql: schema });
    
    if (schemaError) {
      const statements = schema
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      for (const statement of statements) {
        const { error } = await supabase.from('_sql').insert({ query: statement });
        if (error && !error.message.includes('already exists')) {
          throw error;
        }
      }
    }

    const { error: propBucketError } = await supabase.storage.createBucket('properties', {
      public: true,
      fileSizeLimit: 5242880,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });
    
    if (propBucketError && !propBucketError.message.includes('already exists')) {
      throw propBucketError;
    }
    
    const { error: blogBucketError } = await supabase.storage.createBucket('blog', {
      public: true,
      fileSizeLimit: 5242880,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });
    
    if (blogBucketError && !blogBucketError.message.includes('already exists')) {
      throw blogBucketError;
    }
    
    const { data: tables, error: tablesError } = await supabase
      .from('properties')
      .select('count')
      .limit(1);
    
    if (tablesError) {
      throw tablesError;
    }
    
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      throw bucketsError;
    }
    
  } catch (error) {
    throw error;
  }
}

setupSupabase();
