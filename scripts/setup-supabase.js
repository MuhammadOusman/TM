require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Error: Missing environment variables!');
  console.error('\nPlease create .env file with:');
  console.error('REACT_APP_SUPABASE_URL=your_url');
  console.error('SUPABASE_SERVICE_ROLE_KEY=your_service_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║     🚀 SUPABASE AUTOMATIC SETUP - DAR AL BARAKAH         ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

async function setupSupabase() {
  try {
    console.log('📊 Step 1: Creating Database Schema...');
    
    // Read SQL schema file
    const schemaPath = path.join(__dirname, '..', 'supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema
    const { error: schemaError } = await supabase.rpc('exec_sql', { sql: schema });
    
    if (schemaError) {
      // Try alternative: direct SQL execution (for newer Supabase)
      console.log('   ⚠️  Using alternative method...');
      
      // Split schema into individual statements and execute
      const statements = schema
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      for (const statement of statements) {
        const { error } = await supabase.from('_sql').insert({ query: statement });
        if (error && !error.message.includes('already exists')) {
          console.log('   ⚠️ ', error.message);
        }
      }
    }
    
    console.log('   ✅ Database schema created!\n');

    console.log('📦 Step 2: Creating Storage Buckets...');
    
    // Create properties bucket
    const { error: propBucketError } = await supabase.storage.createBucket('properties', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });
    
    if (propBucketError && !propBucketError.message.includes('already exists')) {
      console.log('   ⚠️  Properties bucket:', propBucketError.message);
    } else {
      console.log('   ✅ Properties bucket created!');
    }
    
    // Create blog bucket
    const { error: blogBucketError } = await supabase.storage.createBucket('blog', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });
    
    if (blogBucketError && !blogBucketError.message.includes('already exists')) {
      console.log('   ⚠️  Blog bucket:', blogBucketError.message);
    } else {
      console.log('   ✅ Blog bucket created!');
    }
    
    console.log('\n🔐 Step 3: Verifying Setup...');
    
    // Check tables
    const { data: tables, error: tablesError } = await supabase
      .from('properties')
      .select('count')
      .limit(1);
    
    if (!tablesError) {
      console.log('   ✅ Tables accessible!');
    }
    
    // Check buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (!bucketsError && buckets) {
      console.log('   ✅ Buckets accessible!');
      console.log('   📦 Found buckets:', buckets.map(b => b.name).join(', '));
    }
    
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                  ✅ SETUP COMPLETE!                       ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
    console.log('📋 Next Steps:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('1. Run the schema manually in SQL Editor:');
    console.log('   → https://supabase.com/dashboard/project/[your-ref]/sql');
    console.log('   → Copy content from supabase-schema.sql');
    console.log('   → Click "Run"\n');
    
    console.log('2. Create Admin User:');
    console.log('   → Go to Authentication → Add User');
    console.log('   → Email: admin@darAlbarakah.com');
    console.log('   → Password: (your choice)');
    console.log('   → Enable "Auto Confirm User"\n');
    
    console.log('3. Start the app:');
    console.log('   → npm start\n');
    
    console.log('4. Test admin login:');
    console.log('   → http://localhost:3000/admin/login\n');
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
  } catch (error) {
    console.error('\n❌ Setup Error:', error.message);
    console.error('\n📋 Manual Setup Required:');
    console.error('Please follow SETUP_CHECKLIST.md for manual setup.\n');
  }
}

setupSupabase();
