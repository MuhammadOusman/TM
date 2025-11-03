const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing environment variables!');
  console.log('REACT_APP_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? 'Set' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupViewFunctions() {
  console.log('🔧 Setting up view increment functions...\n');

  // Check if views_count columns exist
  console.log('1. Checking if views_count columns exist...');
  const { data: properties, error: propError } = await supabase
    .from('properties')
    .select('id, views_count')
    .limit(1);

  if (propError) {
    console.error('❌ Error checking properties table:', propError.message);
    if (propError.message.includes('views_count')) {
      console.log('\n📝 Adding views_count column to properties...');
      // Would need raw SQL execution here
      console.log('⚠️  Please run this SQL in Supabase SQL Editor:');
      console.log('ALTER TABLE properties ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;');
    }
  } else {
    console.log('✅ Properties table has views_count column');
  }

  const { data: blogs, error: blogError } = await supabase
    .from('blog_posts')
    .select('id, views_count')
    .limit(1);

  if (blogError) {
    console.error('❌ Error checking blog_posts table:', blogError.message);
    if (blogError.message.includes('views_count')) {
      console.log('\n📝 Adding views_count column to blog_posts...');
      console.log('⚠️  Please run this SQL in Supabase SQL Editor:');
      console.log('ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;');
    }
  } else {
    console.log('✅ Blog_posts table has views_count column');
  }

  // Test increment functions
  console.log('\n2. Testing increment_property_views function...');
  if (properties && properties.length > 0) {
    const testPropertyId = properties[0].id;
    const { error: rpcError1 } = await supabase.rpc('increment_property_views', { 
      property_uuid: testPropertyId 
    });
    
    if (rpcError1) {
      console.error('❌ Error calling increment_property_views:', rpcError1.message);
      console.log('\n⚠️  Please run this SQL in Supabase SQL Editor:');
      console.log(`
CREATE OR REPLACE FUNCTION increment_property_views(property_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE properties 
  SET views_count = views_count + 1 
  WHERE id = property_uuid;
END;
$$ LANGUAGE plpgsql;
      `);
    } else {
      console.log('✅ increment_property_views function works!');
    }
  } else {
    console.log('⚠️  No properties found to test with');
  }

  console.log('\n3. Testing increment_blog_views function...');
  if (blogs && blogs.length > 0) {
    const testBlogId = blogs[0].id;
    const { error: rpcError2 } = await supabase.rpc('increment_blog_views', { 
      blog_uuid: testBlogId 
    });
    
    if (rpcError2) {
      console.error('❌ Error calling increment_blog_views:', rpcError2.message);
      console.log('\n⚠️  Please run this SQL in Supabase SQL Editor:');
      console.log(`
CREATE OR REPLACE FUNCTION increment_blog_views(blog_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts 
  SET views_count = views_count + 1 
  WHERE id = blog_uuid;
END;
$$ LANGUAGE plpgsql;
      `);
    } else {
      console.log('✅ increment_blog_views function works!');
    }
  } else {
    console.log('⚠️  No blog posts found to test with');
  }

  console.log('\n✅ Setup complete! Check for any errors above.');
}

setupViewFunctions().catch(console.error);
