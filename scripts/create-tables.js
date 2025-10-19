const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function createTables() {
  try {
    const schemaPath = path.join(__dirname, '..', 'supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    const projectRef = supabaseUrl.match(/https:\/\/([^.]+)/)[1];
    
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
    } else {
      const statements = schema
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));
      
      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i] + ';';
        
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
          
        } catch (e) {
        }
        
        await new Promise(r => setTimeout(r, 50));
      }
    }
    
  } catch (error) {
    throw error;
  }
}

createTables();
