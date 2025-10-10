-- Add images column to properties table
-- Run this in Supabase SQL Editor

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS images TEXT[];

-- Update existing properties to have empty array if null
UPDATE properties 
SET images = ARRAY[]::TEXT[] 
WHERE images IS NULL;
