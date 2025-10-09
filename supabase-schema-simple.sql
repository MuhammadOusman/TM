-- SIMPLIFIED SCHEMA - Copy this entire file and paste in SQL Editor
-- Go to: https://supabase.com/dashboard/project/zmklauljzmdirdpzpadb/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  amenities TEXT[],
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property Images Table
CREATE TABLE IF NOT EXISTS property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agents Table (create before blog_posts since it's referenced)
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  bio TEXT,
  experience TEXT,
  portfolio TEXT,
  specialties TEXT[],
  image_url TEXT,
  rating DECIMAL(2, 1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  author_id UUID REFERENCES agents(id),
  featured_image TEXT,
  featured BOOLEAN DEFAULT false,
  read_time TEXT,
  status TEXT DEFAULT 'draft',
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  features TEXT[],
  status TEXT DEFAULT 'active',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  page_path TEXT,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  blog_post_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Settings Table
CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Public Read Access)
CREATE POLICY "Public can view active properties" ON properties FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view property images" ON property_images FOR SELECT USING (true);
CREATE POLICY "Public can view published blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view active agents" ON agents FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view active services" ON services FOR SELECT USING (status = 'active');
CREATE POLICY "Public can create inquiries" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create analytics" ON analytics_events FOR INSERT WITH CHECK (true);

-- RLS Policies (Authenticated Full Access)
CREATE POLICY "Authenticated full access properties" ON properties FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access images" ON property_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access blog" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access agents" ON agents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access inquiries" ON contact_inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access analytics" ON analytics_events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated full access settings" ON admin_settings FOR ALL USING (auth.role() = 'authenticated');

-- SUCCESS MESSAGE
DO $$
BEGIN
  RAISE NOTICE '✅ Database setup complete! 8 tables created with RLS policies.';
END $$;
