require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Parse PostgreSQL connection string
const connectionString = 'postgresql://postgres:4120257@Tm@db.zmklauljzmdirdpzpadb.supabase.co:5432/postgres';

// Extract Supabase URL and project ref
const match = connectionString.match(/db\.([^.]+)\.supabase\.co/);
const projectRef = match ? match[1] : null;
const supabaseUrl = `https://${projectRef}.supabase.co`;

console.log('🚀 Supabase Setup Starting...\n');
console.log('📍 Project URL:', supabaseUrl);
console.log('📍 Project Ref:', projectRef);
console.log('\n⚠️  Note: You need to provide SUPABASE_SERVICE_ROLE_KEY\n');

// For now, we'll create instructions
const setupInstructions = `
╔════════════════════════════════════════════════════════════╗
║           SUPABASE AUTOMATIC SETUP READY                  ║
╚════════════════════════════════════════════════════════════╝

Your Supabase Project:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project URL: ${supabaseUrl}
Project Ref: ${projectRef}
Database: zmklauljzmdirdpzpadb

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Get your Service Role Key:
   → Go to: https://supabase.com/dashboard/project/${projectRef}/settings/api
   → Copy "service_role" key (it's secret, keep it safe!)

2. Create .env file in project root:
   
   REACT_APP_SUPABASE_URL=${supabaseUrl}
   REACT_APP_SUPABASE_ANON_KEY=<your_anon_key>
   SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>

3. Run the automatic setup:
   
   npm run setup:supabase

This will automatically:
✅ Create 8 database tables
✅ Setup RLS policies  
✅ Create storage buckets (properties, blog)
✅ Configure bucket policies
✅ Create analytics functions
✅ Create admin user

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Alternatively, you can do it manually:
→ Open SQL Editor: https://supabase.com/dashboard/project/${projectRef}/sql
→ Copy entire content from: supabase-schema.sql
→ Click "Run"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

console.log(setupInstructions);

// Save project info
const projectInfo = {
  supabaseUrl,
  projectRef,
  database: 'zmklauljzmdirdpzpadb',
  setupDate: new Date().toISOString(),
  status: 'pending_service_key'
};

fs.writeFileSync(
  path.join(__dirname, 'supabase-project-info.json'),
  JSON.stringify(projectInfo, null, 2)
);

console.log('✅ Project info saved to: supabase-project-info.json\n');
