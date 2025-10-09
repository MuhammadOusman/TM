import React from 'react';
import { Box, Container, Typography, Grid, Button, Chip, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { PropertyDetailSkeleton } from '../components/LoadingSkeleton';
import { propertiesAPI } from '../services/api';

const PropertyDetail = () => {
  const { id } = useParams();

  // Fetch property with React Query
  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesAPI.getById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mock property data as fallback
  const mockProperty = {
    id: 1,
    title: 'Luxury Penthouse in Downtown Dubai',
    location: 'Downtown Dubai',
    type: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 2500,
    price: 1500,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
    description: 'Experience luxury living at its finest in this stunning penthouse located in the heart of Downtown Dubai. This exceptional property offers breathtaking views of the Burj Khalifa and combines modern elegance with superior comfort. Perfect for those seeking an unforgettable Dubai experience.',
    amenities: [
      'High-speed WiFi',
      'Fully equipped kitchen',
      'Smart TV with streaming',
      'Air conditioning',
      'Washing machine & dryer',
      'Private balcony',
      'Swimming pool access',
      'Gym & fitness center',
      'Parking space',
      '24/7 security',
      'Concierge service',
      'Housekeeping available',
    ],
    nearby: [
      { name: 'Burj Khalifa', distance: '500m' },
      { name: 'Dubai Mall', distance: '800m' },
      { name: 'Dubai Metro', distance: '300m' },
      { name: 'Dubai Fountain', distance: '600m' },
    ],
  };

  // Use fetched property if available, otherwise use mock
  const displayProperty = property || mockProperty;

  // Show loading skeleton
  if (isLoading) {
    return <PropertyDetailSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <Box sx={{ pt: 8, pb: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" color="error" gutterBottom>
              Property Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              The property you're looking for doesn't exist or has been removed.
            </Typography>
            <Button variant="contained" href="/properties" sx={{ bgcolor: '#D4AF37' }}>
              Back to Properties
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: 3, pb: 12, bgcolor: 'background.paper' }}>
      <Container maxWidth="xl">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              mb: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              '& .swiper-button-next, & .swiper-button-prev': {
                color: '#a58654',
                '&::after': {
                  fontSize: '2rem',
                },
              },
              '& .swiper-pagination-bullet': {
                bgcolor: 'white',
                opacity: 0.5,
              },
              '& .swiper-pagination-bullet-active': {
                bgcolor: '#a58654',
                opacity: 1,
              },
            }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000 }}
              loop
              style={{ height: '600px' }}
            >
              {displayProperty.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      height: '100%',
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <LocationOnIcon sx={{ color: '#a58654' }} />
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {displayProperty.location}
                  </Typography>
                  <Chip label={displayProperty.type} size="small" sx={{ ml: 1, bgcolor: 'rgba(165, 134, 84, 0.1)', color: '#a58654' }} />
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: 'primary.main',
                    mb: 3,
                  }}
                >
                  {displayProperty.title}
                </Typography>

                <Box sx={{ display: 'flex', gap: 4, mb: 4, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: 'rgba(111, 168, 160, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BedIcon sx={{ fontSize: '1.5rem', color: '#6fa8a0' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {displayProperty.bedrooms}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Bedrooms
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: 'rgba(111, 168, 160, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <BathtubIcon sx={{ fontSize: '1.5rem', color: '#6fa8a0' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {displayProperty.bathrooms}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Bathrooms
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: 'rgba(111, 168, 160, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SquareFootIcon sx={{ fontSize: '1.5rem', color: '#6fa8a0' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {displayProperty.area}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Square Feet
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                  About This Property
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    mb: 4,
                  }}
                >
                  {displayProperty.description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
                  Amenities & Features
                </Typography>
                <Grid container spacing={2}>
                  {displayProperty.amenities.map((amenity, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleIcon sx={{ color: '#a58654', fontSize: '1.2rem' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {amenity}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
                  Nearby Attractions
                </Typography>
                <Grid container spacing={2}>
                  {displayProperty.nearby.map((place, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'background.paper',
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {place.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {place.distance} away
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          {/* Booking Sidebar */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  position: 'sticky',
                  top: 100,
                  border: '2px solid',
                  borderColor: 'rgba(165, 134, 84, 0.3)',
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#a58654', mb: 1 }}>
                    ${displayProperty.price}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    per night
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<CalendarMonthIcon />}
                  sx={{
                    bgcolor: '#a58654',
                    py: 1.5,
                    mb: 2,
                    '&:hover': {
                      bgcolor: '#8b6f47',
                    },
                  }}
                >
                  Book Now
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={<PhoneIcon />}
                  sx={{
                    borderColor: '#a58654',
                    color: '#a58654',
                    py: 1.5,
                    mb: 3,
                    '&:hover': {
                      borderColor: '#8b6f47',
                      bgcolor: 'rgba(165, 134, 84, 0.05)',
                    },
                  }}
                >
                  Contact Agent
                </Button>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Contact Information
                </Typography>

                <List>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <PhoneIcon sx={{ color: '#6fa8a0' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="+971 XX XXX XXXX"
                      secondary="Call us anytime"
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <EmailIcon sx={{ color: '#6fa8a0' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="info@daralbarakah.com"
                      secondary="Send us an email"
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                </List>

                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'rgba(165, 134, 84, 0.05)',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Need help? Our team is available 24/7
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#a58654', fontWeight: 600 }}>
                    Fast response guaranteed
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PropertyDetail;
