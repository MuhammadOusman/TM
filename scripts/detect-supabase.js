require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://postgres:4120257@Tm@db.zmklauljzmdirdpzpadb.supabase.co:5432/postgres';

const match = connectionString.match(/db\.([^.]+)\.supabase\.co/);
const projectRef = match ? match[1] : null;
const supabaseUrl = `https://${projectRef}.supabase.co`;

const setupInstructions = `
Project URL: ${supabaseUrl}
Project Ref: ${projectRef}

NEXT STEPS:

1. Get your Service Role Key from: https://supabase.com/dashboard/project/${projectRef}/settings/api

2. Create .env file:
   REACT_APP_SUPABASE_URL=${supabaseUrl}
   REACT_APP_SUPABASE_ANON_KEY=<your_anon_key>
   SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>

3. Run: npm run setup:supabase
`;

console.log(setupInstructions);

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
