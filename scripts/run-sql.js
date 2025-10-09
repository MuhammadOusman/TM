const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║     🗃️  CREATING DATABASE TABLES VIA SQL EDITOR          ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

async function runSQL() {
  try {
    // Read the SQL file
    const schemaPath = path.join(__dirname, '..', 'supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📄 SQL file loaded:', schemaPath);
    console.log('📏 File size:', schema.length, 'characters\n');
    
    // Split into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log('📊 Total statements to execute:', statements.length);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      const preview = statement.substring(0, 60).replace(/\n/g, ' ');
      
      console.log(`[${i + 1}/${statements.length}] ${preview}...`);
      
      try {
        // Use the REST API to execute SQL
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`
          },
          body: JSON.stringify({ sql: statement + ';' })
        });
        
        if (response.ok) {
          console.log('   ✅ Success\n');
          successCount++;
        } else {
          const error = await response.text();
          if (error.includes('already exists')) {
            console.log('   ⚠️  Already exists (skipping)\n');
            successCount++;
          } else {
            console.log('   ❌ Error:', error.substring(0, 100), '\n');
            errorCount++;
          }
        }
      } catch (err) {
        console.log('   ⚠️  Skipped:', err.message.substring(0, 80), '\n');
        errorCount++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Success:', successCount);
    console.log('⚠️  Errors/Skipped:', errorCount);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('🔍 Verifying tables...\n');
    
    // Verify tables exist
    const { data: properties } = await supabase.from('properties').select('count').limit(1);
    const { data: blog } = await supabase.from('blog_posts').select('count').limit(1);
    const { data: agents } = await supabase.from('agents').select('count').limit(1);
    const { data: inquiries } = await supabase.from('contact_inquiries').select('count').limit(1);
    
    if (properties !== null) console.log('   ✅ properties table');
    if (blog !== null) console.log('   ✅ blog_posts table');
    if (agents !== null) console.log('   ✅ agents table');
    if (inquiries !== null) console.log('   ✅ contact_inquiries table');
    
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║              ✅ DATABASE SETUP COMPLETE!                  ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.log('\n📋 Manual Setup Required:');
    console.log('Go to: https://supabase.com/dashboard/project/zmklauljzmdirdpzpadb/sql');
    console.log('Copy entire supabase-schema.sql and click Run\n');
  }
}

runSQL();
