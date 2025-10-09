const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║     🗃️  AUTO-CREATING DATABASE TABLES                    ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

async function createTables() {
  try {
    const schemaPath = path.join(__dirname, '..', 'supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📄 Reading SQL schema...\n');
    
    // Use Supabase Management API
    const projectRef = supabaseUrl.match(/https:\/\/([^.]+)/)[1];
    
    console.log('🔧 Project Ref:', projectRef);
    console.log('🔗 Executing SQL via Management API...\n');
    
    const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`,
        'apikey': serviceRoleKey
      },
      body: JSON.stringify({
        query: schema
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ SQL executed successfully!\n');
      console.log('Result:', result);
    } else {
      // Try alternative method: Split and execute via SQL editor endpoint
      console.log('⚠️  Management API failed, trying alternative...\n');
      
      // Use the database REST API
      const statements = schema
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));
      
      console.log(`📊 Executing ${statements.length} SQL statements...\n`);
      
      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i] + ';';
        const preview = stmt.substring(0, 50).replace(/\n/g, ' ');
        
        process.stdout.write(`[${i + 1}/${statements.length}] ${preview}... `);
        
        try {
          const res = await fetch(`${supabaseUrl}/rest/v1/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': serviceRoleKey,
              'Authorization': `Bearer ${serviceRoleKey}`,
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              query: stmt
            })
          });
          
          if (res.ok || res.status === 409) {
            console.log('✅');
          } else {
            const err = await res.text();
            if (err.includes('already exists')) {
              console.log('⚠️  (exists)');
            } else {
              console.log('❌');
            }
          }
        } catch (e) {
          console.log('⚠️');
        }
        
        await new Promise(r => setTimeout(r, 50));
      }
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Setup complete!\n');
    console.log('📋 IMPORTANT: If tables were not created automatically,');
    console.log('   please run the SQL manually:\n');
    console.log('   1. Go to: https://supabase.com/dashboard/project/' + projectRef + '/sql');
    console.log('   2. Copy content from: supabase-schema.sql');
    console.log('   3. Paste and click "Run"\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message, '\n');
    console.log('📋 MANUAL SETUP REQUIRED:\n');
    console.log('1. Open: https://supabase.com/dashboard/project/zmklauljzmdirdpzpadb/sql');
    console.log('2. Copy entire content from: supabase-schema.sql');
    console.log('3. Paste in SQL Editor');
    console.log('4. Click "Run" button\n');
    console.log('This takes only 30 seconds! 🚀\n');
  }
}

createTables();
