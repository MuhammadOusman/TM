import React, { useState } from 'react';
import { Box, Container, Typography, Button, Grid, Card, Chip, IconButton } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VillaIcon from '@mui/icons-material/Villa';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SEO from '../components/SEO';
import { organizationSchema, websiteSchema } from '../seo/structuredData';
import CountUp from 'react-countup';
import LazyImage from '../components/LazyImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Home = () => {
  const heroSlides = [
    {
      title: 'Discover Your Perfect Holiday Home in Dubai',
      subtitle: 'Premium short-term rentals in Dubai\'s most sought-after locations',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80',
    },
    {
      title: 'Luxury Living Made Simple',
      subtitle: 'Experience world-class hospitality and comfort',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80',
    },
    {
      title: 'Investment Excellence in Dubai Real Estate',
      subtitle: 'Maximize your returns with expert property management',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80',
    },
  ];

  const stats = [
    { end: 150, suffix: '+', label: 'Properties Managed', icon: <VillaIcon /> },
    { end: 24, suffix: '', label: 'Buildings Operated', icon: <HomeWorkIcon /> },
    { end: 4.5, suffix: '+', decimals: 1, label: 'Years Experience', icon: <StarIcon /> },
    { end: 100, suffix: '%', label: 'Client Satisfaction', icon: <VerifiedIcon /> },
  ];

  const features = [
    {
      icon: <VillaIcon />,
      title: 'Premium Properties',
      description: 'Fully furnished apartments & villas in Downtown, JVC, Business Bay, Marina and beyond.',
    },
    {
      icon: <TrendingUpIcon />,
      title: 'Maximum Returns',
      description: 'Above-market returns with consistent high occupancy rates for property owners.',
    },
    {
      icon: <SupportAgentIcon />,
      title: '24/7 Support',
      description: 'Round-the-clock hospitality support ensuring seamless experiences for all guests.',
    },
    {
      icon: <VerifiedIcon />,
      title: 'Trusted Management',
      description: 'Transparent operations and proven real-estate expertise you can rely on.',
    },
  ];

  const communities = [
    { name: 'Downtown Dubai', properties: 32, image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=80' },
    { name: 'Dubai Marina', properties: 28, image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80' },
    { name: 'Business Bay', properties: 24, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
    { name: 'JVC', properties: 45, image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?w=800&q=80' },
  ];

  return (
    <Box>
      <SEO
        title="Luxury Holiday Homes & Property Management"
        description="Discover premium holiday rentals, expert property management, and investment advisory in Dubai with Dar Al Barakah Holiday Homes."
        keywords={["Dubai holiday homes","property management Dubai","real estate investment"]}
        structuredData={[organizationSchema, websiteSchema]}
      />
      {/* Hero Section with Slider */}
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          '& .swiper': {
            height: '100%',
          },
          '& .swiper-pagination-bullet': {
            bgcolor: 'white',
            opacity: 0.5,
            width: 12,
            height: 12,
          },
          '& .swiper-pagination-bullet-active': {
            opacity: 1,
            bgcolor: '#a58654',
          },
        }}
      >
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          speed={1500}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  width: '100%',
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(44, 62, 80, 0.85) 0%, rgba(26, 37, 47, 0.75) 100%)',
                  },
                }}
              >
                <Container
                  maxWidth="lg"
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <Box sx={{ maxWidth: '800px' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <Chip
                        label="🕌 Dubai's Trusted Holiday Home Partner"
                        sx={{
                          bgcolor: 'rgba(165, 134, 84, 0.2)',
                          color: '#a58654',
                          border: '1px solid #a58654',
                          fontWeight: 600,
                          mb: 3,
                          fontSize: '0.9rem',
                          px: 1,
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Typography
                        variant="h1"
                        sx={{
                          color: 'white',
                          fontWeight: 800,
                          fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                          lineHeight: 1.2,
                          mb: 3,
                          textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        {slide.title}
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'rgba(255,255,255,0.9)',
                          mb: 5,
                          fontSize: { xs: '1rem', md: '1.25rem' },
                          fontWeight: 400,
                          lineHeight: 1.6,
                        }}
                      >
                        {slide.subtitle}
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                          component={Link}
                          to="/properties"
                          variant="contained"
                          size="large"
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            bgcolor: '#D4AF37',
                            color: '#1A2027',
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            borderRadius: 2,
                            boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
                            '&:hover': {
                              bgcolor: '#E0C66F',
                              transform: 'translateY(-3px) scale(1.02)',
                              boxShadow: '0 12px 32px rgba(212, 175, 55, 0.6)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        >
                          Explore Properties
                        </Button>
                        <Button
                          component={Link}
                          to="/about"
                          variant="outlined"
                          size="large"
                          sx={{
                            borderColor: 'white',
                            color: 'white',
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            borderRadius: 2,
                            borderWidth: 2,
                            '&:hover': {
                              borderColor: '#D4AF37',
                              bgcolor: 'rgba(212, 175, 55, 0.15)',
                              borderWidth: 2,
                              transform: 'translateY(-3px) scale(1.02)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        >
                          Learn More
                        </Button>
                      </Box>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, y: [0, 10, 0] }}
                      transition={{ 
                        opacity: { delay: 1.2, duration: 0.8 },
                        y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                      }}
                    >
                      <IconButton
                        sx={{
                          position: 'absolute',
                          bottom: 40,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          color: 'white',
                          bgcolor: 'rgba(212, 175, 55, 0.2)',
                          border: '2px solid rgba(212, 175, 55, 0.5)',
                          '&:hover': {
                            bgcolor: 'rgba(212, 175, 55, 0.3)',
                          },
                        }}
                        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                      >
                        <KeyboardArrowDownIcon />
                      </IconButton>
                    </motion.div>
                  </Box>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          py: 6,
          background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      color: 'white',
                    }}
                  >
                    <Box
                      sx={{
                        color: '#a58654',
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        '& svg': {
                          fontSize: { xs: '2.5rem', md: '3rem' },
                        },
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#a58654', mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
                      <CountUp end={stat.end} duration={2} suffix={stat.suffix} decimals={stat.decimals || 0} />
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Preview */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                  }}
                >
                  <LazyImage
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
                    alt="Dar Al Barakah"
                    aspectRatio="4/3"
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      bgcolor: '#a58654',
                      color: 'white',
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                  >
                    Since 2020
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Chip
                  label="About Us"
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
                  Welcome to Dar Al Barakah Holiday Homes LLC
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  The word <strong>"Barakah"</strong> means blessing — and that's exactly what we strive 
                  to deliver in every stay and every partnership. Founded by <strong>Talha Musharraf</strong> and{' '}
                  <strong>Hamza Awais</strong>, we are Dubai's trusted name in short-term rentals, 
                  holiday home management, and property investment services.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  What began as a small vision to redefine property management in Dubai has grown into 
                  a thriving company managing a diverse portfolio of luxury apartments, villas, and 
                  serviced accommodations across the city's most sought-after communities.
                </Typography>
                <Button
                  component={Link}
                  to="/about"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: '#a58654',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: '#8b6f47',
                    },
                  }}
                >
                  Discover Our Story
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
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
                label="Why Choose Us"
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
                Excellence in Every Detail
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  maxWidth: '700px',
                  mx: 'auto',
                }}
              >
                We don't just manage properties — we create value, experiences, and lifelong relationships
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    component={motion.div}
                    whileHover={{ scale: 1.03 }}
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 4,
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'rgba(212, 175, 55, 0.2)',
                      background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 100%)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 16px 48px rgba(212, 175, 55, 0.25)',
                        borderColor: '#D4AF37',
                        background: 'linear-gradient(135deg, #ffffff 0%, rgba(212, 175, 55, 0.05) 100%)',
                        '& .icon-wrapper': {
                          transform: 'rotate(10deg) scale(1.1)',
                          boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
                        },
                      },
                    }}
                  >
                    <Box
                      className="icon-wrapper"
                      sx={{
                        width: 90,
                        height: 90,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #D4AF37 0%, #E0C66F 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        color: '#1A2027',
                        boxShadow: '0 6px 20px rgba(212, 175, 55, 0.3)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '& svg': {
                          fontSize: '2.8rem',
                        },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Communities Section */}
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
                label="Prime Locations"
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
                Featured Communities
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={3}>
            {communities.map((community, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    component={motion.div}
                    whileHover={{ y: -8 }}
                    sx={{
                      position: 'relative',
                      borderRadius: 4,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: '0 16px 48px rgba(212, 175, 55, 0.3)',
                        '& img': {
                          transform: 'scale(1.15)',
                          filter: 'brightness(1.1)',
                        },
                        '& .overlay': {
                          background: 'linear-gradient(to top, rgba(212, 175, 55, 0.8) 0%, transparent 100%)',
                        },
                        '& .property-count': {
                          transform: 'translateY(-4px)',
                          color: '#fff',
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: 320,
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={community.image}
                        alt={community.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                      <Box
                        className="overlay"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(26, 32, 39, 0.9) 0%, transparent 100%)',
                          p: 3,
                          transition: 'background 0.4s ease',
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            mb: 1,
                            textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                          }}
                        >
                          {community.name}
                        </Typography>
                        <Typography
                          className="property-count"
                          variant="body2"
                          sx={{
                            color: '#D4AF37',
                            fontWeight: 600,
                            display: 'inline-block',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {community.properties} Properties Available
                        </Typography>
                      </Box>

                      {/* Decorative corner accent */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: 'rgba(212, 175, 55, 0.9)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#1A2027',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        }}
                      >
                        {community.properties}
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
                  fontSize: { xs: '2rem', md: '3.5rem' },
                }}
              >
                Ready to Find Your Perfect Holiday Home?
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
                Whether you're a guest discovering Dubai or an investor expanding your portfolio, 
                you'll always find Barakah with us.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/properties"
                  variant="contained"
                  size="large"
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
                  Browse Properties
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: '#a58654',
                      bgcolor: 'rgba(165, 134, 84, 0.1)',
                      borderWidth: 2,
                    },
                  }}
                >
                  Get in Touch
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
