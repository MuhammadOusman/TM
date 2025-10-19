import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, Chip, IconButton, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
import { propertiesAPI } from '../services/api';
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

  // Fetch featured properties
  const { data: propertiesData, isLoading: propertiesLoading } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: () => propertiesAPI.getAll(),
  });

  // Filter only featured properties and limit to 4
  const featuredProperties = propertiesData?.data
    ?.filter(property => property.featured === true)
    ?.slice(0, 4) || [];

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
          py: 8,
          background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
          width: '100%',
          m: 0,
          p: 0,
        }}
      >
        <Box sx={{ py: 8, px: { xs: 3, sm: 4, md: 6, lg: 8, xl: 12 } }}>
          <Grid 
            container 
            spacing={{ xs: 3, sm: 4, md: 6 }} 
            justifyContent="space-evenly"
            alignItems="center"
          >
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
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
                          fontSize: { xs: '2.5rem', md: '3.5rem' },
                        },
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#a58654', mb: 1, fontSize: { xs: '2rem', md: '3.5rem' } }}>
                      <CountUp end={stat.end} duration={2} suffix={stat.suffix} decimals={stat.decimals || 0} />
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        fontWeight: 500,
                        fontSize: { xs: '0.9rem', md: '1rem' },
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* About Preview */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Box sx={{ width: '100%', px: { xs: 0, md: 4 } }}>
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
  </Box>
      </Box>

      {/* Features Section */}
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

          <Grid container spacing={4} sx={{ px: { xs: 2, sm: 0 } }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: index * 0.15,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Card
                    component={motion.div}
                    whileHover={{ 
                      y: -16,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      p: { xs: 3, md: 4 },
                      borderRadius: 5,
                      border: '1px solid',
                      borderColor: 'rgba(212, 175, 55, 0.15)',
                      background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(252,252,252,1) 100%)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #D4AF37 0%, #E0C66F 100%)',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      },
                      '&:hover': {
                        boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2), 0 0 0 1px rgba(212, 175, 55, 0.3)',
                        borderColor: 'rgba(212, 175, 55, 0.4)',
                        background: 'linear-gradient(135deg, #ffffff 0%, rgba(212, 175, 55, 0.03) 100%)',
                        '&::before': {
                          transform: 'scaleX(1)',
                        },
                        '& .icon-wrapper': {
                          transform: 'scale(1.15) rotate(5deg)',
                          boxShadow: '0 12px 32px rgba(212, 175, 55, 0.5)',
                        },
                        '& .feature-title': {
                          color: '#B18F2A',
                        },
                      },
                    }}
                  >
                    <Box
                      className="icon-wrapper"
                      sx={{
                        width: { xs: 80, md: 90 },
                        height: { xs: 80, md: 90 },
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #D4AF37 0%, #E0C66F 50%, #D4AF37 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        color: '#1A2027',
                        boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)',
                        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: -3,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(224, 198, 111, 0.1))',
                          zIndex: -1,
                          opacity: 0,
                          transition: 'opacity 0.3s',
                        },
                        '&:hover::after': {
                          opacity: 1,
                        },
                        '& svg': {
                          fontSize: { xs: '2.5rem', md: '2.8rem' },
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                        },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      className="feature-title"
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 2,
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        transition: 'color 0.3s',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.8,
                        fontSize: { xs: '0.9rem', md: '0.95rem' },
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
                label="Discover Excellence"
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
                Featured Properties
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                Explore our handpicked selection of premium properties
              </Typography>
            </motion.div>
          </Box>

          {propertiesLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress sx={{ color: '#D4AF37' }} />
            </Box>
          ) : featuredProperties.length > 0 ? (
            <Box
              sx={{
                '& .swiper': {
                  pb: 6,
                },
                '& .swiper-pagination-bullet': {
                  bgcolor: 'rgba(212, 175, 55, 0.3)',
                  width: 12,
                  height: 12,
                },
                '& .swiper-pagination-bullet-active': {
                  bgcolor: '#D4AF37',
                  width: 32,
                  borderRadius: 6,
                },
              }}
            >
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={32}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ 
                  delay: 3500, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true 
                }}
                loop={featuredProperties.length > 1}
                speed={800}
                breakpoints={{
                  640: { slidesPerView: 1.5, spaceBetween: 24 },
                  900: { slidesPerView: 2, spaceBetween: 28 },
                  1200: { slidesPerView: 2.5, spaceBetween: 32 },
                }}
              >
                {featuredProperties.map((property, index) => (
                  <SwiperSlide key={property.id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card
                        component={Link}
                        to={`/properties/${property.id}`}
                        sx={{
                          textDecoration: 'none',
                          position: 'relative',
                          borderRadius: 5,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          background: 'linear-gradient(145deg, #273444 0%, #1e2936 100%)',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(212, 175, 55, 0.1)',
                          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: 5,
                            padding: '2px',
                            background: 'linear-gradient(145deg, rgba(212, 175, 55, 0.3), transparent, rgba(212, 175, 55, 0.1))',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            maskComposite: 'exclude',
                            opacity: 0,
                            transition: 'opacity 0.6s ease',
                          },
                          '&:hover': {
                            transform: 'translateY(-20px) scale(1.04) rotateY(2deg)',
                            boxShadow: '0 35px 90px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.3), 0 0 0 3px rgba(212, 175, 55, 0.7)',
                            '&::before': {
                              opacity: 1,
                            },
                            '& img': {
                              transform: 'scale(1.18) rotate(2deg)',
                              filter: 'brightness(1.25) contrast(1.15) saturate(1.1)',
                            },
                            '& .overlay': {
                              background: 'linear-gradient(to top, rgba(26, 32, 39, 0.98) 0%, rgba(26, 32, 39, 0.75) 35%, transparent 100%)',
                              backdropFilter: 'blur(20px) saturate(150%)',
                              borderTop: '1px solid rgba(212, 175, 55, 0.2)',
                            },
                            '& .price-tag': {
                              transform: 'scale(1.08) translateY(-3px)',
                              background: 'rgba(212, 175, 55, 0.25)',
                              backdropFilter: 'blur(25px) saturate(200%)',
                              border: '2px solid rgba(212, 175, 55, 0.8)',
                              boxShadow: '0 6px 25px rgba(212, 175, 55, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            },
                            '& .status-badge': {
                              transform: 'translateY(-6px) scale(1.1) rotate(-2deg)',
                              boxShadow: '0 10px 30px rgba(212, 175, 55, 0.6)',
                            },
                            '& .location-indicator': {
                              animation: 'pulse 1.5s ease-in-out infinite',
                            },
                          },
                          '@keyframes pulse': {
                            '0%, 100%': {
                              transform: 'scale(1)',
                              opacity: 1,
                            },
                            '50%': {
                              transform: 'scale(1.3)',
                              opacity: 0.7,
                            },
                          },
                        }}
                      >
                      <Box
                        sx={{
                          position: 'relative',
                          height: 420,
                          overflow: 'hidden',
                          borderRadius: 5,
                        }}
                      >
                        <LazyImage
                          src={property.image_url || property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'}
                          alt={property.title}
                          aspectRatio="4/3"
                          style={{ 
                            borderRadius: '20px',
                            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }}
                        />
                        <Box
                          className="overlay"
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(to top, rgba(26, 32, 39, 0.95) 0%, rgba(26, 32, 39, 0.6) 40%, transparent 100%)',
                            backdropFilter: 'blur(16px) saturate(120%)',
                            WebkitBackdropFilter: 'blur(16px) saturate(120%)',
                            p: 4,
                            transition: 'all 0.6s ease',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              color: 'white',
                              fontWeight: 700,
                              mb: 1.5,
                              textShadow: '0 2px 12px rgba(0,0,0,0.7)',
                              fontSize: { xs: '1.35rem', md: '1.6rem' },
                              letterSpacing: '-0.3px',
                              lineHeight: 1.3,
                              fontFamily: '"Poppins", "Roboto", sans-serif',
                            }}
                          >
                            {property.title}
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mb: 2.5,
                            }}
                          >
                            <Box
                              className="location-indicator"
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: '#D4AF37',
                                boxShadow: '0 0 12px rgba(212, 175, 55, 0.8)',
                                transition: 'all 0.3s ease',
                              }}
                            />
                            <Typography
                              variant="body1"
                              sx={{
                                color: 'rgba(255,255,255,0.85)',
                                fontWeight: 500,
                                fontSize: '0.95rem',
                                textShadow: '0 1px 6px rgba(0,0,0,0.5)',
                                fontFamily: '"Poppins", "Roboto", sans-serif',
                              }}
                            >
                              {property.location}
                            </Typography>
                          </Box>
                          <Box
                            className="price-tag"
                            sx={{
                              display: 'inline-block',
                              background: 'rgba(26, 32, 39, 0.65)',
                              backdropFilter: 'blur(20px) saturate(180%)',
                              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                              border: '1.5px solid rgba(212, 175, 55, 0.4)',
                              borderRadius: 2,
                              px: 3,
                              py: 1.2,
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                color: '#D4AF37',
                                fontWeight: 700,
                                fontSize: { xs: '1.4rem', md: '1.7rem' },
                                textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                                letterSpacing: '0.5px',
                                fontFamily: '"Poppins", "Roboto", sans-serif',
                              }}
                            >
                              AED {property.price?.toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Status badge */}
                        {property.status && (
                          <Chip
                            label={property.status}
                            className="status-badge"
                            size="medium"
                            sx={{
                              position: 'absolute',
                              top: 20,
                              right: 20,
                              background: property.status === 'available' 
                                ? 'linear-gradient(135deg, #66BB6A 0%, #43A047 100%)'
                                : 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                              color: 'white',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                              backdropFilter: 'blur(10px)',
                              border: '2px solid rgba(255, 255, 255, 0.3)',
                              borderRadius: 25,
                              px: 2,
                              py: 2.5,
                              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            }}
                          />
                        )}
                      </Box>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
              </Swiper>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                No featured properties available at the moment.
              </Typography>
            </Box>
          )}
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
