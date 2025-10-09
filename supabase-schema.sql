-- Dar Al Barakah Holiday Homes - Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROPERTIES TABLE
-- =============================================
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Apartment', 'Villa', 'Townhouse', etc.
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area INTEGER NOT NULL, -- in sqft
  price DECIMAL(10, 2) NOT NULL, -- per night
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active', -- 'active', 'inactive', 'maintenance'
  amenities TEXT[], -- Array of amenities
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PROPERTY IMAGES TABLE
-- =============================================
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- BLOG POSTS TABLE
-- =============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  author_id UUID REFERENCES agents(id),
  featured_image TEXT,
  featured BOOLEAN DEFAULT false,
  read_time TEXT, -- e.g., "8 min read"
  status TEXT DEFAULT 'draft', -- 'draft', 'published'
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- =============================================
-- AGENTS/TEAM TABLE
-- =============================================
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  bio TEXT,
  experience TEXT,
  portfolio TEXT,
  specialties TEXT[], -- Array of specialties
  image_url TEXT,
  rating DECIMAL(2, 1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- 'active', 'inactive'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- CONTACT INQUIRIES TABLE
-- =============================================
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'responded', 'closed'
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SERVICES TABLE
-- =============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT, -- Icon name or SVG
  features TEXT[], -- Array of features
  category TEXT, -- 'main', 'additional'
  display_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ANALYTICS EVENTS TABLE (for tracking)
-- =============================================
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL, -- 'property_view', 'blog_view', 'contact_form', 'inquiry'
  entity_type TEXT, -- 'property', 'blog_post', 'page'
  entity_id UUID,
  user_session TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  metadata JSONB, -- Additional data
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ADMIN SETTINGS TABLE
-- =============================================
CREATE TABLE admin_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES for Performance
-- =============================================
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_featured ON properties(featured);
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);

-- =============================================
-- FUNCTIONS for Analytics
-- =============================================

-- Function to increment property views
CREATE OR REPLACE FUNCTION increment_property_views(property_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE properties 
  SET views_count = views_count + 1 
  WHERE id = property_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to increment blog views
CREATE OR REPLACE FUNCTION increment_blog_views(blog_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts 
  SET views_count = views_count + 1 
  WHERE id = blog_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to get dashboard analytics
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE(
  total_properties BIGINT,
  active_properties BIGINT,
  total_blog_posts BIGINT,
  published_posts BIGINT,
  total_inquiries BIGINT,
  new_inquiries BIGINT,
  total_agents BIGINT,
  total_views BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM properties) as total_properties,
    (SELECT COUNT(*) FROM properties WHERE status = 'active') as active_properties,
    (SELECT COUNT(*) FROM blog_posts) as total_blog_posts,
    (SELECT COUNT(*) FROM blog_posts WHERE status = 'published') as published_posts,
    (SELECT COUNT(*) FROM contact_inquiries) as total_inquiries,
    (SELECT COUNT(*) FROM contact_inquiries WHERE status = 'new') as new_inquiries,
    (SELECT COUNT(*) FROM agents WHERE status = 'active') as total_agents,
    (SELECT COALESCE(SUM(views_count), 0) FROM properties) as total_views;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for active/published content
CREATE POLICY "Public can view active properties"
  ON properties FOR SELECT
  USING (status = 'active');

CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view active agents"
  ON agents FOR SELECT
  USING (status = 'active');

CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  USING (status = 'active');

CREATE POLICY "Public can view property images"
  ON property_images FOR SELECT
  USING (true);

-- Public can insert contact inquiries and analytics
CREATE POLICY "Public can submit contact inquiries"
  ON contact_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can create analytics events"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

-- Admin full access (you'll need to create admin role in Supabase Auth)
CREATE POLICY "Admins have full access to properties"
  ON properties FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to blog posts"
  ON blog_posts FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to contact inquiries"
  ON contact_inquiries FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- =============================================
-- SAMPLE DATA (Optional - for testing)
-- =============================================

-- Insert sample agents
INSERT INTO agents (name, role, email, phone, bio, experience, portfolio, specialties, image_url, rating, reviews_count) VALUES
('Talha Musharraf', 'Founder & Director', 'talha@daralbarakah.com', '+971000000000', 'Expert in sales, off-plan investments, and residential portfolio management with proven track record.', '4.5+ Years', '150+ Units', ARRAY['Sales Expert', 'Off-Plan Investments', 'Portfolio Management', 'Strategic Leadership'], 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', 5.0, 127),
('Hamza Awais', 'Co-Founder & Director', 'hamza@daralbarakah.com', '+971000000000', 'Specialist in building sales, residential & commercial leasing, and institutional investments.', '4 Years', '24 Buildings, 32 Villas, 29 Labor Camps', ARRAY['Property Management', 'Commercial Leasing', 'Building Sales', 'Operational Excellence'], 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80', 5.0, 98);

-- Insert sample services
INSERT INTO services (title, description, features, category, display_order) VALUES
('Luxury Holiday Home Rentals', 'Curated collection of premium furnished residences across Dubai''s most desirable districts', ARRAY['High-yield strategy', 'Professional photography', 'Dynamic pricing', 'Global OTA distribution', 'Guest screening', 'Concierge services'], 'main', 1),
('Full Property Management', 'End-to-end operational, financial, and technical management', ARRAY['24/7 operations', 'Preventive maintenance', 'Compliance & documentation', 'Owner reporting dashboard', 'Vendor management', 'CapEx planning'], 'main', 2);

-- Set up admin settings
INSERT INTO admin_settings (key, value) VALUES
('site_name', '"Dar Al Barakah Holiday Homes"'),
('contact_email', '"info@daralbarakah.com"'),
('contact_phone', '"+971 XX XXX XXXX"');
