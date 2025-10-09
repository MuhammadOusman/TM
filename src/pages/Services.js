import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import VillaIcon from '@mui/icons-material/Villa';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SecurityIcon from '@mui/icons-material/Security';
import CampaignIcon from '@mui/icons-material/Campaign';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SEO from '../components/SEO';
import HeroBanner from '../components/HeroBanner';

const Services = () => {
  // Primary services with detailed feature sets
  const mainServices = [
    {
      title: 'Luxury Holiday Home Rentals',
      icon: <VillaIcon />,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80',
      color: '#a58654',
      description:
        'Curated collection of premium furnished residences across Dubai\'s most desirable districts, optimized for short-term luxury stays.',
      features: [
        'High-yield strategy optimization',
        'Professional photography & staging',
        'Dynamic pricing management',
        'Global OTA distribution',
        'Guest screening & verification',
        'Concierge-grade guest services',
      ],
    },
    {
      title: 'Full Property Management',
      icon: <ManageAccountsIcon />,
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
      color: '#6b5b3d',
      description:
        'End-to-end operational, financial, and technical management ensuring asset preservation and superior guest & resident experience.',
      features: [
        '24/7 operations oversight',
        'Preventive maintenance cycles',
        'Compliance & documentation',
        'Owner reporting dashboard',
        'Vendor & contractor orchestration',
        'CapEx planning support',
      ],
    },
    {
      title: 'Investment Advisory',
      icon: <TrendingUpIcon />,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      color: '#8c7347',
      description:
        'Strategic acquisition guidance, rental yield modeling, and portfolio optimization driven by real-time market intelligence.',
      features: [
        'Yield & absorption analysis',
        'District performance insights',
        'Holding strategy modeling',
        'Refurb ROI evaluation',
        'Regulatory guidance',
        'Exit timing strategies',
      ],
    },
    {
      title: 'Corporate Housing Solutions',
      icon: <BusinessCenterIcon />,
      image: 'https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=1200&q=80',
      color: '#7a6646',
      description:
        'Tailored mid-to-long stay residences for executive relocations, crew rotations, and enterprise housing needs.',
      features: [
        'Flexible leasing structures',
        'Bulk unit deployment',
        'Furnished & serviced models',
        'Centralized billing',
        'SLA-backed service delivery',
        'Guest experience protocols',
      ],
    },
    {
      title: 'Building / Multi-Unit Programs',
      icon: <HomeWorkIcon />,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118f?w=1200&q=80',
      color: '#5e4d35',
      description:
        'Performance-focused management for entire buildings & multi-unit portfolios with unified branding and yield maximization.',
      features: [
        'Centralized operations model',
        'Uniform brand standards',
        'Energy efficiency oversight',
        'Occupancy & ADR modeling',
        'Tech stack integration',
        'Central maintenance desk',
      ],
    },
  ];

  // Complementary operational & enhancement services
  const additionalServices = [
    {
      icon: <ManageAccountsIcon />,
      title: 'Building Management',
      description: 'Complete operational management for residential and commercial buildings.',
    },
    {
      icon: <SupportAgentIcon />,
      title: '24/7 Guest Support',
      description: 'Round-the-clock assistance for all guest inquiries and needs.',
    },
    {
      icon: <CleaningServicesIcon />,
      title: 'Professional Cleaning',
      description: 'Regular housekeeping and deep cleaning services.',
    },
    {
      icon: <SecurityIcon />,
      title: 'Security & Access',
      description: 'Advanced security systems and controlled access management.',
    },
    {
      icon: <CampaignIcon />,
      title: 'Marketing & Listing',
      description: 'Professional photography and multi-platform property marketing.',
    },
    {
      icon: <AssessmentIcon />,
      title: 'Performance Analytics',
      description: 'Detailed reporting on occupancy rates and revenue performance.',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We discuss your needs, property goals, and investment expectations.',
    },
    {
      step: '02',
      title: 'Property Assessment',
      description: 'Thorough evaluation of your property and market positioning.',
    },
    {
      step: '03',
      title: 'Strategy Development',
      description: 'Custom management plan tailored to maximize your returns.',
    },
    {
      step: '04',
      title: 'Implementation',
      description: 'Professional setup, listing, and marketing of your property.',
    },
    {
      step: '05',
      title: 'Ongoing Management',
      description: 'Continuous optimization and transparent performance reporting.',
    },
  ];

  return (
    <Box>
      <SEO
        title="Our Services"
        description="Explore our comprehensive services: holiday home rentals, property management, investment advisory, corporate housing, and more in Dubai."
      />
      <HeroBanner
        chip="Our Services"
        title="Comprehensive Real Estate Solutions"
        subtitle="From holiday rentals to full property management and investment advisory"
        image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        minHeight="60vh"
      />

      {/* Main Services */}
      <Box sx={{ py: 12, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Chip
                label="Core Services"
                sx={{
                  bgcolor: 'rgba(165, 134, 84, 0.1)',
                  color: '#a58654',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                What We Offer
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={6}>
            {mainServices.map((service, index) => (
              <Grid item xs={12} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} md={5}>
                        <Box
                          sx={{
                            height: '100%',
                            minHeight: 400,
                            backgroundImage: `url(${service.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: `linear-gradient(135deg, ${service.color}dd 0%, ${service.color}99 100%)`,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              position: 'relative',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                            }}
                          >
                            <Box sx={{ textAlign: 'center', p: 4 }}>
                              <Box
                                sx={{
                                  '& svg': {
                                    fontSize: '5rem',
                                  },
                                  mb: 2,
                                }}
                              >
                                {service.icon}
                              </Box>
                              <Typography
                                variant="h4"
                                sx={{
                                  fontWeight: 700,
                                }}
                              >
                                {service.title}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={7}>
                        <CardContent sx={{ p: 5 }}>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: 'primary.main',
                              mb: 2,
                            }}
                          >
                            {service.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: 'text.secondary',
                              mb: 3,
                              lineHeight: 1.8,
                            }}
                          >
                            {service.description}
                          </Typography>

                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: 'primary.main',
                              mb: 2,
                            }}
                          >
                            Key Features:
                          </Typography>

                          <Grid container spacing={2}>
                            {service.features.map((feature, idx) => (
                              <Grid item xs={12} sm={6} key={idx}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <CheckCircleIcon sx={{ color: service.color, fontSize: '1.2rem' }} />
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: 'text.secondary',
                                      fontWeight: 500,
                                    }}
                                  >
                                    {feature}
                                  </Typography>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Additional Services */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Chip
                label="Additional Services"
                sx={{
                  bgcolor: 'rgba(165, 134, 84, 0.1)',
                  color: '#a58654',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Complete Property Support
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            {additionalServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      p: 3,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'rgba(165, 134, 84, 0.2)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        borderColor: '#a58654',
                        boxShadow: '0 12px 40px rgba(165, 134, 84, 0.2)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #a58654 0%, #c5a673 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        color: 'white',
                        '& svg': {
                          fontSize: '2rem',
                        },
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 1.5,
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                      }}
                    >
                      {service.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Process Timeline */}
      <Box sx={{ py: 12, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Chip
                label="Our Process"
                sx={{
                  bgcolor: 'rgba(165, 134, 84, 0.1)',
                  color: '#a58654',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                How We Work
              </Typography>
            </motion.div>
          </Box>

          <Box sx={{ position: 'relative' }}>
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 6,
                    flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                    gap: 4,
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      textAlign: { xs: 'center', md: index % 2 === 0 ? 'right' : 'left' },
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: 'rgba(165, 134, 84, 0.2)',
                        fontSize: '3rem',
                        mb: 1,
                      }}
                    >
                      {item.step}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 1,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #a58654 0%, #c5a673 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '2rem',
                      boxShadow: '0 8px 24px rgba(165, 134, 84, 0.3)',
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </Box>

                  <Box sx={{ flex: 1 }}></Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Ready to Get Started?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  mb: 5,
                  maxWidth: '700px',
                  mx: 'auto',
                }}
              >
                Let's discuss how we can help you maximize your property's potential
              </Typography>
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: '#a58654',
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: '#8b6f47',
                  },
                }}
              >
                Contact Us Today
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Services;
