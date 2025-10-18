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
  console.log('🔍 Checking existing properties...\n');

  // Check existing properties
  const { data: existingProps, error: fetchError } = await supabase
    .from('properties')
    .select('*');

  if (fetchError) {
    console.error('❌ Error fetching properties:', fetchError);
    return;
  }

  console.log(`📊 Found ${existingProps?.length || 0} existing properties`);

  // Check featured properties
  const featuredProps = existingProps?.filter(p => p.featured) || [];
  console.log(`⭐ Featured properties: ${featuredProps.length}\n`);

  if (featuredProps.length === 0) {
    console.log('➕ Adding sample featured properties...\n');

    for (const property of sampleProperties) {
      const { data, error } = await supabase
        .from('properties')
        .insert([property])
        .select();

      if (error) {
        console.error(`❌ Error adding "${property.title}":`, error.message);
      } else {
        console.log(`✅ Added: ${property.title}`);
      }
    }

    console.log('\n🎉 Sample properties added successfully!');
    console.log('🌐 Refresh your website to see featured properties.');
  } else {
    console.log('✅ Featured properties already exist:');
    featuredProps.forEach((prop, i) => {
      console.log(`   ${i + 1}. ${prop.title} (${prop.location})`);
    });
  }

  console.log('\n📝 You can also add properties via Admin Panel:');
  console.log('   🔗 https://your-site.netlify.app/admin/properties');
}

checkAndAddProperties()
  .then(() => {
    console.log('\n✨ Done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Unexpected error:', err);
    process.exit(1);
  });
