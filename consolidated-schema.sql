CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL,
  author_id UUID REFERENCES agents(id),
  author TEXT,
  featured_image TEXT,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  read_time TEXT,
  status TEXT DEFAULT 'draft',
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

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

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  features TEXT[],
  category TEXT,
  display_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  user_session TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);

CREATE OR REPLACE FUNCTION increment_property_views(property_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE properties 
  SET views_count = views_count + 1 
  WHERE id = property_uuid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_blog_views(blog_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts 
  SET views_count = views_count + 1 
  WHERE id = blog_uuid;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Public can view active properties"
  ON properties FOR SELECT USING (status = 'active');

CREATE POLICY IF NOT EXISTS "Public can view published blog posts"
  ON blog_posts FOR SELECT USING (status = 'published');

CREATE POLICY IF NOT EXISTS "Public can view active agents"
  ON agents FOR SELECT USING (status = 'active');

CREATE POLICY IF NOT EXISTS "Public can view active services"
  ON services FOR SELECT USING (status = 'active');

CREATE POLICY IF NOT EXISTS "Public can view property images"
  ON property_images FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Public can submit contact inquiries"
  ON contact_inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Public can create analytics events"
  ON analytics_events FOR INSERT WITH CHECK (true);

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE blog_posts ALTER COLUMN author_id DROP NOT NULL;
UPDATE blog_posts SET image = featured_image WHERE featured_image IS NOT NULL AND image IS NULL;

ALTER TABLE properties ADD COLUMN IF NOT EXISTS images TEXT[];
UPDATE properties SET images = ARRAY[]::TEXT[] WHERE images IS NULL;
