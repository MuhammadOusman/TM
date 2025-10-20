import React from 'react';
import { Box, Container, Typography, Grid, Card, Chip, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SEO from '../components/SEO';

import founder1 from '../assets/founder1.jpg';
import founder2 from '../assets/founder 2.jpg';
import HeroBanner from '../components/HeroBanner';
import { organizationSchema, breadcrumbSchema } from '../seo/structuredData';

const About = () => {
  const founders = [
    {
      name: 'Talha Musharraf',
      role: 'Founder & Director',
      experience: '4.5+ Years',
      portfolio: '150+ Units',
      image: founder1,
      email: 'Talha@dabgroup.ae',
      bio: 'With over 4.5 years of experience in Dubai\'s real-estate market, Talha started from zero and became a recognized expert in sales, off-plan investments, and residential portfolio management.',
      expertise: 'He personally oversees a portfolio of more than 150 units, helping clients secure top-performing properties with consistent ROI. His strategic mindset and leadership are the driving forces behind Dar Al Barakah\'s rapid growth and client success.',
      specialties: ['Sales Expert', 'Off-Plan Investments', 'Portfolio Management', 'Strategic Leadership'],
    },
    {
      name: 'Hamza Awais',
      role: 'Co-Founder & Director',
      experience: '4 Years',
      portfolio: '24 Buildings, 32 Villas, 29 Labor Camps',
      image: founder2,
      email: 'Hamza@dabgroup.ae',
      bio: 'A real-estate professional with four years of extensive field experience, Hamza specializes in building sales, residential & commercial leasing, and institutional investments.',
      expertise: 'He currently manages 24 buildings, 32 villas, and 29 labor camps, ensuring operational efficiency, tenant satisfaction, and long-term sustainability. His expertise strengthens the foundation of Dar Al Barakah\'s property-management operations.',
      specialties: ['Building Sales', 'Property Management', 'Commercial Leasing', 'Operational Excellence'],
    },
  ];


  const values = [
    {
      icon: <VerifiedUserIcon />,
      title: 'Integrity',
      description: 'Transparent operations and honest communication in every interaction.',
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Excellence',
      description: 'Delivering premium service that exceeds expectations consistently.',
    },
    {
      icon: <HandshakeIcon />,
      title: 'Partnership',
      description: 'Building lasting relationships based on trust and mutual success.',
    },
    {
      icon: <BusinessCenterIcon />,
      title: 'Innovation',
      description: 'Embracing modern solutions for better property management.',
    },
  ];

  const reasons = [
    'Trusted team with proven real-estate experience',
    'Hands-on management for every property and every guest',
    'Transparent reporting and guaranteed peace of mind',
    'Consistent high occupancy and above-market returns',
    'Comprehensive 24/7 hospitality support',
    'Expert guidance for property investors',
  ];

  return (
    <Box>
      <SEO
        title="About Us"
        description="Learn about Dar Al Barakah Holiday Homes – our mission, vision, founders, and commitment to premium property management and holiday rentals in Dubai."
        structuredData={[
          organizationSchema,
          breadcrumbSchema([
            { name: 'Home', item: 'https://www.daralbarakah.com/' },
            { name: 'About Us', item: 'https://www.daralbarakah.com/about' },
          ]),
        ]}
      />

      <HeroBanner
        chip="🕌 About Dar Al Barakah"
        title="Building Blessings, Creating Experiences"
        subtitle="Dubai's trusted name in short-term rentals, holiday home management, and property investment services"
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
        minHeight="60vh"
      />

      {/* Our Story */}
      <Box sx={{ py: 12, bgcolor: '#1A2027' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: { xs: 6, md: 8 },
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Chip
                  label="Our Story"
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
                    mb: 3,
                    fontSize: { xs: '2rem', md: '3rem' },
                  }}
                >
                  The Meaning Behind Barakah
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 2,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  The word <strong style={{ color: '#a58654' }}>
                    "Barakah"
                  </strong> means blessing — 
                  and that's exactly what we strive to deliver in every stay and every partnership.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 2,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  What began as a small vision to redefine property management in Dubai has grown 
                  into a thriving company that manages a diverse portfolio of luxury apartments, 
                  villas, and serviced accommodations across the city's most sought-after communities.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  Our commitment is simple: to provide exceptional comfort for guests and maximum 
                  returns for property owners. Through innovative marketing, transparent operations, 
                  and 24/7 hospitality support, we make Dubai living effortless and profitable.
                </Typography>
              </motion.div>
            </Box>

          </Box>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                    color: 'white',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      bgcolor: 'rgba(165, 134, 84, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <TrackChangesIcon sx={{ fontSize: '2.5rem', color: '#a58654' }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: '#a58654',
                    }}
                  >
                    Our Mission
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    To deliver premium short-term rental experiences that blend comfort, luxury, 
                    and convenience — while empowering property owners with transparent management, 
                    steady income, and long-term asset growth.
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #6fa8a0 0%, #5a8a84 100%)',
                    color: 'white',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <VisibilityIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    Our Vision
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      color: 'rgba(255,255,255,0.95)',
                    }}
                  >
                    To become Dubai's leading holiday-home and property-management company, 
                    known for innovation, integrity, and service excellence.
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Founders Section */}
      <Box sx={{ py: 12, bgcolor: '#1A2027' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Chip
                label="Leadership Team"
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
                Meet the Founders
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  maxWidth: '700px',
                  mx: 'auto',
                }}
              >
                Visionary leaders with proven expertise in Dubai's real estate market
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={6}>
            {founders.map((founder, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 16px 48px rgba(165, 134, 84, 0.2)',
                      },
                      p: { xs: 3, md: 4 },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'center', sm: 'flex-start' },
                        gap: { xs: 3, sm: 4 },
                      }}
                    >
                      <Box
                        sx={{
                          flexShrink: 0,
                          width: { xs: 220, sm: 300, md: 340 },
                          height: { xs: 220, sm: 300, md: 340 },
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: '6px solid #a58654',
                          boxShadow: '0 8px 40px rgba(165,134,84,0.18)',
                          background: '#222',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mt: { xs: 0, sm: 0, md: 0 },
                          mb: { xs: 2, sm: 0 },
                          alignSelf: 'center',
                        }}
                      >
                        <img
                          src={founder.image}
                          alt={founder.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                            display: 'block',
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Chip
                          label={founder.experience}
                          size="small"
                          sx={{
                            bgcolor: '#a58654',
                            color: 'white',
                            fontWeight: 600,
                            mb: 1,
                          }}
                        />
                        <Typography
                          variant="h4"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            mb: 0.5,
                          }}
                        >
                          {founder.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: '#6fa8a0',
                            fontWeight: 600,
                            mb: 1,
                          }}
                        >
                          {founder.role}
                        </Typography>
                        {founder.email && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#a58654',
                              fontWeight: 500,
                              mb: 2,
                              fontSize: '0.9rem',
                            }}
                          >
                            📧 {founder.email}
                          </Typography>
                        )}
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            mb: 2,
                            lineHeight: 1.7,
                          }}
                        >
                          {founder.bio}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            mb: 3,
                            lineHeight: 1.7,
                          }}
                        >
                          {founder.expertise}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {founder.specialties.map((specialty, idx) => (
                            <Chip
                              key={idx}
                              label={specialty}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(165, 134, 84, 0.1)',
                                color: '#a58654',
                                fontWeight: 600,
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Core Values */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Chip
                label="Our Values"
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
                What Drives Us
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                <Card
                  sx={{
                    height: '100%',
                    minHeight: 180,
                    textAlign: 'center',
                    p: { xs: 2, sm: 3 },
                    borderRadius: 4,
                    border: '1.5px solid',
                    borderColor: 'rgba(165, 134, 84, 0.18)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.03)',
                      borderColor: '#a58654',
                      boxShadow: '0 12px 40px rgba(165, 134, 84, 0.13)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #a58654 0%, #c5a673 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'white',
                      '& svg': {
                        fontSize: '2.2rem',
                      },
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 1.2,
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.7,
                      maxWidth: 320,
                    }}
                  >
                    {value.description}
                  </Typography>
                </Card>
              </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ py: 12, bgcolor: '#1A2027' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Why Choose Dar Al Barakah
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: 5,
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '2px solid',
                borderColor: 'rgba(165, 134, 84, 0.2)',
              }}
            >
              <List>
                {reasons.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ListItem sx={{ py: 2 }}>
                      <ListItemIcon>
                        <CheckCircleIcon sx={{ color: '#a58654', fontSize: '2rem' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={reason}
                        primaryTypographyProps={{
                          fontSize: '1.1rem',
                          fontWeight: 500,
                          color: 'text.primary',
                        }}
                      />
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
