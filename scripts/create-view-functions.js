const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createViewFunctions() {
  console.log('🚀 Creating view increment functions in Supabase...\n');

  const sql = `
    CREATE OR REPLACE FUNCTION increment_property_views(property_uuid UUID)
    RETURNS VOID AS $$
    BEGIN
      UPDATE properties 
      SET views_count = COALESCE(views_count, 0) + 1 
      WHERE id = property_uuid;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;

    CREATE OR REPLACE FUNCTION increment_blog_views(blog_uuid UUID)
    RETURNS VOID AS $$
    BEGIN
      UPDATE blog_posts 
      SET views_count = COALESCE(views_count, 0) + 1 
      WHERE id = blog_uuid;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;

  try {
    // Split into individual statements
    const statements = sql.split(/;\s*(?=CREATE)/);
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing SQL statement...');
        
        // Using Supabase's query method for raw SQL
        const { error } = await supabase.rpc('exec_sql', { sql_query: statement.trim() + ';' });
        
        if (error) {
          // This is expected if the method doesn't exist, we'll use alternative
          console.log('⚠️  Direct SQL execution not available through RPC.');
          console.log('📋 Please copy and run this SQL in your Supabase SQL Editor:\n');
          console.log(sql);
          console.log('\n📍 Go to: https://app.supabase.com/project/_/sql/new');
          break;
        }
      }
    }
  } catch (error) {
    console.log('⚠️  Could not execute SQL automatically.');
    console.log('\n📋 Please copy and run this SQL in your Supabase SQL Editor:\n');
    console.log(sql);
    console.log('\n📍 Go to: https://app.supabase.com/project/_/sql/new');
  }
}

createViewFunctions();
