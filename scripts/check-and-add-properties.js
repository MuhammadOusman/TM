const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sampleProperties = [
  {
    title: 'Luxury Penthouse in Downtown Dubai',
    description: 'Experience ultimate luxury in this stunning 3-bedroom penthouse with panoramic city views. Features include a private pool, gym access, and world-class amenities.',
    location: 'Downtown Dubai',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 2500,
    price: 1500,
    featured: true,
    status: 'available',
    amenities: ['Pool', 'Gym', 'Parking', 'Balcony', 'Security'],
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80']
  },
  {
    title: 'Modern Villa with Private Pool',
    description: 'Spacious 5-bedroom villa featuring contemporary design, private garden, and swimming pool. Perfect for families seeking luxury and comfort.',
    location: 'Dubai Marina',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    area: 4500,
    price: 3500,
    featured: true,
    status: 'available',
    amenities: ['Private Pool', 'Garden', 'Maid Room', 'Garage', 'BBQ Area'],
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80']
  },
  {
    title: 'Premium 2BR in Palm Jumeirah',
    description: 'Exclusive beachfront apartment with stunning sea views. Enjoy resort-style living with direct beach access and premium facilities.',
    location: 'Palm Jumeirah',
    type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1600,
    price: 1800,
    featured: true,
    status: 'available',
    amenities: ['Beach Access', 'Pool', 'Parking', 'Gym', 'Concierge'],
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80']
  }
];

async function checkAndAddProperties() {
  const { data: existingProps, error: fetchError } = await supabase
    .from('properties')
    .select('*');

  if (fetchError) {
    throw fetchError;
  }

  const featuredProps = existingProps?.filter(p => p.featured) || [];

  if (featuredProps.length === 0) {
    for (const property of sampleProperties) {
      const { data, error } = await supabase
        .from('properties')
        .insert([property])
        .select();

      if (error) {
        throw error;
      }
    }
  }
}

checkAndAddProperties()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    process.exit(1);
  });
