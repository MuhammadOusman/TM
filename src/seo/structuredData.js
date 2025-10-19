const BASE_URL = 'https://www.daralbarakah.com';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dar Al Barakah Holiday Homes LLC',
  url: BASE_URL + '/',
  logo: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
  sameAs: [
    'https://www.facebook.com/',
    'https://www.instagram.com/',
    'https://www.linkedin.com/'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+971000000000',
      contactType: 'customer service',
      areaServed: 'AE',
      availableLanguage: ['en', 'ar']
    }
  ]
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: BASE_URL + '/',
  name: 'Dar Al Barakah Holiday Homes',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/properties?search={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
};

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.item
  }))
});

export const serviceSchema = (name, description, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: {
    '@type': 'Organization',
    name: 'Dar Al Barakah Holiday Homes LLC'
  },
  url
});
