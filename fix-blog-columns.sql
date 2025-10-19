-- Fix blog_posts table to match the application code
-- Run this in Supabase SQL Editor

-- Add 'author' column as TEXT (since the form sends author as a string, not author_id)
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author TEXT;

-- Add 'image' column (since the form sends 'image', not 'featured_image')
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image TEXT;

-- Make author_id nullable since we're using author as text instead
ALTER TABLE blog_posts ALTER COLUMN author_id DROP NOT NULL;

-- Optional: Copy data from featured_image to image if any exists
UPDATE blog_posts SET image = featured_image WHERE featured_image IS NOT NULL AND image IS NULL;

-- Optional: You can drop featured_image column if you're not using it anymore
-- ALTER TABLE blog_posts DROP COLUMN IF EXISTS featured_image;

-- SUCCESS
DO $$
BEGIN
  RAISE NOTICE '✅ Blog posts table updated successfully! Added author and image columns.';
END $$;
