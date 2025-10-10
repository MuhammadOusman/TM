import React, { useState } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import PolicyIcon from '@mui/icons-material/Policy';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SEO from '../components/SEO';
import HeroBanner from '../components/HeroBanner';
import { breadcrumbSchema } from '../seo/structuredData';

const FAQ = () => {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqCategories = [
    {
      category: 'Booking & Reservations',
      icon: <HomeIcon />,
      color: '#a58654',
      faqs: [
        {
          question: 'How do I book a property?',
          answer: 'Booking is simple! Browse our properties, select your desired dates, and click "Book Now". You can complete the booking online or contact our team for assistance. We accept various payment methods and provide instant confirmation.',
        },
        {
          question: 'What is your cancellation policy?',
          answer: 'Our cancellation policy varies by property. Generally, free cancellation is available up to 48 hours before check-in. For specific details, please refer to the property listing or contact our team.',
        },
        {
          question: 'Can I modify my booking after confirmation?',
          answer: 'Yes, modifications are possible subject to availability. Contact our team at least 24 hours before check-in to request changes to your booking dates or property.',
        },
        {
          question: 'Is there a minimum stay requirement?',
          answer: 'Minimum stay requirements vary by property and season. Most properties require a minimum of 3 nights, while some may have weekly minimum stays during peak seasons.',
        },
      ],
    },
    {
      category: 'Payment & Pricing',
      icon: <PaymentIcon />,
      color: '#6fa8a0',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), bank transfers, and select digital payment platforms. Full payment details are provided during booking.',
        },
        {
          question: 'Are there any additional fees?',
          answer: 'Prices include basic utilities and amenities. Additional fees may apply for services like airport transfers, extra cleaning, or late check-out. All fees are clearly stated before confirmation.',
        },
        {
          question: 'Do you require a security deposit?',
          answer: 'Yes, most properties require a refundable security deposit, typically held on your credit card. The amount varies by property and is fully refunded if there\'s no damage.',
        },
        {
          question: 'Are your prices negotiable for long-term stays?',
          answer: 'Absolutely! We offer attractive discounts for extended stays (monthly or longer). Contact our team for customized pricing on long-term rentals.',
        },
      ],
    },
    {
      category: 'Property Management',
      icon: <PolicyIcon />,
      color: '#2c3e50',
      faqs: [
        {
          question: 'How can I list my property with Dar Al Barakah?',
          answer: 'We\'d love to manage your property! Contact us for a free consultation. We\'ll assess your property, discuss management strategies, and create a customized plan to maximize your returns.',
        },
        {
          question: 'What services are included in property management?',
          answer: 'Our comprehensive management includes professional listing and photography, guest screening, 24/7 support, regular maintenance, cleaning, financial reporting, and legal compliance.',
        },
        {
          question: 'How often will I receive income reports?',
          answer: 'Property owners receive detailed monthly reports including occupancy rates, revenue breakdown, expenses, and net income. Real-time access to your dashboard is also available.',
        },
        {
          question: 'What is your commission structure?',
          answer: 'Our management fees are competitive and transparent. We offer tiered pricing based on your property portfolio size and services required. Contact us for a detailed quote.',
        },
      ],
    },
    {
      category: 'Guest Support',
      icon: <SupportAgentIcon />,
      color: '#5a8a84',
      faqs: [
        {
          question: 'Is 24/7 support really available?',
          answer: 'Yes! Our dedicated support team is available round-the-clock to assist with any questions or issues during your stay. Multiple contact options are provided upon booking.',
        },
        {
          question: 'What amenities are included in the properties?',
          answer: 'All properties are fully furnished with essential amenities including WiFi, kitchen appliances, linens, toiletries, and more. Specific amenities vary by property and are listed in detail.',
        },
        {
          question: 'Do you provide airport transfer services?',
          answer: 'Yes, we can arrange airport transfers for an additional fee. This service must be booked in advance through our team.',
        },
        {
          question: 'What if something breaks during my stay?',
          answer: 'Report any issues immediately to our support team. We have emergency maintenance services available 24/7 to resolve problems quickly and ensure your comfort.',
        },
      ],
    },
  ];

  return (
    <Box>
      <SEO
        title="FAQ"
        description="Find answers about bookings, payments, property management, guest support, and more at Dar Al Barakah Holiday Homes."
        structuredData={breadcrumbSchema([
          { name: 'Home', item: 'https://www.daralbarakah.com/' },
          { name: 'FAQ', item: 'https://www.daralbarakah.com/faq' },
        ])}
      />
      <HeroBanner
        chip="Frequently Asked Questions"
        title="How Can We Help You?"
        subtitle="Find answers to common questions about our services, bookings, and properties"
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80"
        minHeight="50vh"
      />

      {/* FAQ Content */}
      <Box sx={{ py: 12, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          {faqCategories.map((category, catIndex) => (
            <Box key={catIndex} sx={{ mb: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: `${category.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: category.color,
                      '& svg': {
                        fontSize: '2rem',
                      },
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                    }}
                  >
                    {category.category}
                  </Typography>
                </Box>

                {category.faqs.map((faq, faqIndex) => (
                  <Accordion
                    key={faqIndex}
                    expanded={expanded === `panel${catIndex}${faqIndex}`}
                    onChange={handleChange(`panel${catIndex}${faqIndex}`)}
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      '&:before': {
                        display: 'none',
                      },
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      '&.Mui-expanded': {
                        boxShadow: `0 4px 16px ${category.color}30`,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: category.color }} />}
                      sx={{
                        '& .MuiAccordionSummary-content': {
                          my: 2,
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: expanded === `panel${catIndex}${faqIndex}` ? category.color : 'text.primary',
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.8,
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </motion.div>
            </Box>
          ))}
        </Container>
      </Box>

      {/* Still Have Questions CTA */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card
              sx={{
                p: 6,
                borderRadius: 4,
                textAlign: 'center',
                background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
                color: 'white',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                Still Have Questions?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                Our team is here to help! Contact us for personalized assistance.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/contact"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: '#a58654',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: '#8b6f47',
                    },
                  }}
                >
                  Contact Us
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#a58654',
                      bgcolor: 'rgba(165, 134, 84, 0.1)',
                      borderWidth: 2,
                    },
                  }}
                >
                  Call: +971 XX XXX XXXX
                </Button>
              </Box>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default FAQ;
