import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * SEO component centralizes meta tags for each page.
 * Usage: <SEO title="Home" description="Luxury holiday homes in Dubai" />
 */
const SEO = ({ title, description, image, keywords = [], structuredData, children }) => {
  const fullTitle = title ? `${title} | Dar Al Barakah Holiday Homes` : 'Dar Al Barakah Holiday Homes';
  const metaDescription = description || 'Dar Al Barakah Holiday Homes LLC – Premium short-term rentals, property management, and investment advisory in Dubai.';
  const metaImage = image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {structuredData && Array.isArray(structuredData) && structuredData.map((sd, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(sd)}</script>
      ))}
      {structuredData && !Array.isArray(structuredData) && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
      {children}
    </Helmet>
  );
};

export default SEO;
