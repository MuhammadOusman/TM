const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing environment variables!');
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runSQL() {
  try {
    const schemaPath = path.join(__dirname, '..', 'supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      try {
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
          successCount++;
        } else {
          const error = await response.text();
          if (error.includes('already exists')) {
            successCount++;
          } else {
            errorCount++;
          }
        }
      } catch (err) {
        errorCount++;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const { data: properties } = await supabase.from('properties').select('count').limit(1);
    const { data: blog } = await supabase.from('blog_posts').select('count').limit(1);
    const { data: agents } = await supabase.from('agents').select('count').limit(1);
    const { data: inquiries } = await supabase.from('contact_inquiries').select('count').limit(1);
    
  } catch (error) {
    throw error;
  }
}

runSQL();
