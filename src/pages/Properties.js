import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import SEO from '../components/SEO';
import HeroBanner from '../components/HeroBanner';
import { PropertiesPageSkeleton } from '../components/LoadingSkeleton';
import { breadcrumbSchema } from '../seo/structuredData';
import { propertiesAPI } from '../services/api';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: '',
    propertyType: 'all',
    location: 'all',
    minPrice: '',
    maxPrice: '',
  });

  // Fetch properties with React Query
  const { data: fetchedProperties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const result = await propertiesAPI.getAll();
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Use database data as primary source
  const properties = (fetchedProperties?.data && fetchedProperties.data.length > 0) ? fetchedProperties.data : [
    {
      id: 1,
      title: 'Luxury Penthouse in Downtown Dubai',
      location: 'Downtown Dubai',
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 3,
      area: 2500,
      price: 1500,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      featured: true,
      amenities: ['Pool', 'Gym', 'Parking'],
    },
    {
      id: 2,
      title: 'Modern Villa with Private Pool',
      location: 'Dubai Marina',
      type: 'Villa',
      bedrooms: 5,
      bathrooms: 6,
      area: 4500,
      price: 3500,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      featured: true,
      amenities: ['Private Pool', 'Garden', 'Maid Room'],
    },
    {
      id: 3,
      title: 'Elegant Apartment in Business Bay',
      location: 'Business Bay',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      price: 1200,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      featured: false,
      amenities: ['Gym', 'Parking', 'Concierge'],
    },
    {
      id: 4,
      title: 'Spacious Townhouse in JVC',
      location: 'JVC',
      type: 'Townhouse',
      bedrooms: 4,
      bathrooms: 4,
      area: 3200,
      price: 2200,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      featured: false,
      amenities: ['Garden', 'Garage', 'Community Pool'],
    },
    {
      id: 5,
      title: 'Studio Apartment in Marina',
      location: 'Dubai Marina',
      type: 'Apartment',
      bedrooms: 1,
      bathrooms: 1,
      area: 850,
      price: 800,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      featured: false,
      amenities: ['Gym', 'Pool', 'Security'],
    },
    {
      id: 6,
      title: 'Premium 2BR in Palm Jumeirah',
      location: 'Palm Jumeirah',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1600,
      price: 1800,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      featured: true,
      amenities: ['Beach Access', 'Pool', 'Parking'],
    },
    {
      id: 7,
      title: 'Cozy 1BR Near City Walk',
      location: 'City Walk',
      type: 'Apartment',
      bedrooms: 1,
      bathrooms: 1,
      area: 950,
      price: 950,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      featured: false,
      amenities: ['Gym', 'Parking', 'Balcony'],
    },
    {
      id: 8,
      title: 'Executive Suite in DIFC',
      location: 'DIFC',
      type: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 1400,
      price: 1600,
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      featured: false,
      amenities: ['Concierge', 'Gym', 'Pool'],
    },
    {
      id: 9,
      title: 'Family Villa in Arabian Ranches',
      location: 'Arabian Ranches',
      type: 'Villa',
      bedrooms: 4,
      bathrooms: 5,
      area: 3800,
      price: 2800,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      featured: true,
      amenities: ['Private Pool', 'Garden', 'Golf Course View'],
    },
  ];

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    // Search term filter (search in title and location)
    const searchLower = appliedFilters.searchTerm.toLowerCase();
    const matchesSearch = !appliedFilters.searchTerm || 
      property.title?.toLowerCase().includes(searchLower) || 
      property.location?.toLowerCase().includes(searchLower);

    // Property type filter
    const matchesType = appliedFilters.propertyType === 'all' || property.type === appliedFilters.propertyType;

    // Location filter
    const matchesLocation = appliedFilters.location === 'all' || property.location === appliedFilters.location;

    // Price range filter
    let matchesPrice = true;
    if (appliedFilters.minPrice || appliedFilters.maxPrice) {
      const price = parseFloat(property.price);
      const min = appliedFilters.minPrice ? parseFloat(appliedFilters.minPrice) : 0;
      const max = appliedFilters.maxPrice ? parseFloat(appliedFilters.maxPrice) : Infinity;
      matchesPrice = price >= min && price <= max;
    }

    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  // Extract unique locations and types from actual properties
  const uniqueLocations = ['all', ...new Set(properties.map(p => p.location).filter(Boolean))];
  const uniquePropertyTypes = ['all', ...new Set(properties.map(p => p.type).filter(Boolean))];

  // Show loading skeleton
  if (isLoading) {
    return (
      <Box>
        <SEO
          title="Properties - Loading..."
          description="Loading premium Dubai holiday homes..."
        />
        <HeroBanner
          chip="Find Your Dream Home"
          title="Discover Premium Properties"
          subtitle="Browse our exclusive collection of holiday homes across Dubai"
          image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80"
          minHeight="50vh"
        />
        <PropertiesPageSkeleton />
      </Box>
    );
  }

  return (
    <Box>
      <SEO
        title="Properties"
        description="Browse premium Dubai holiday homes: villas, apartments, penthouses and more managed by Dar Al Barakah Holiday Homes."
        structuredData={breadcrumbSchema([
          { name: 'Home', item: 'https://www.daralbarakah.com/' },
          { name: 'Properties', item: 'https://www.daralbarakah.com/properties' },
        ])}
      />
      <HeroBanner
        chip="Find Your Dream Home"
        title="Discover Premium Properties"
        subtitle="Browse our exclusive collection of holiday homes across Dubai"
        image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80"
        minHeight="50vh"
      />

      {/* Search & Filter Section */}
      <Box
        sx={{
          py: 3,
          bgcolor: '#1A2027',
          borderBottom: '1px solid rgba(165, 134, 84, 0.2)',
          position: 'sticky',
          top: 64,
          zIndex: 100,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={2}>
              <TextField
                fullWidth
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#a58654' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: appliedFilters.searchTerm ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    '& fieldset': {
                      borderColor: appliedFilters.searchTerm ? '#D4AF37' : 'rgba(165, 134, 84, 0.3)',
                      borderWidth: appliedFilters.searchTerm ? 2 : 1,
                    },
                    '&:hover fieldset': {
                      borderColor: '#a58654',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#a58654',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <FormControl fullWidth sx={{ minWidth: 180, mr: 2 }}>
                <InputLabel shrink sx={{ color: 'white', '&.Mui-focused': { color: '#a58654' } }} htmlFor="property-type-select">
                  Property Type
                </InputLabel>
                <Select
                  id="property-type-select"
                  value={appliedFilters.propertyType}
                  label="Property Type"
                  onChange={(e) => setPropertyType(e.target.value)}
                  labelId="property-type-label"
                  fullWidth
                  displayEmpty
                  inputProps={{ 'aria-label': 'Property Type' }}
                  sx={{
                    minHeight: 56,
                    bgcolor: appliedFilters.propertyType !== 'all' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: appliedFilters.propertyType !== 'all' ? '#D4AF37' : 'rgba(165, 134, 84, 0.3)',
                      borderWidth: appliedFilters.propertyType !== 'all' ? 2 : 1,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a58654',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a58654',
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#a58654',
                    },
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 32,
                      pt: 2,
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#2c3e50',
                        minWidth: 220,
                        '& .MuiMenuItem-root': {
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(165, 134, 84, 0.1)',
                          },
                          '&.Mui-selected': {
                            bgcolor: 'rgba(165, 134, 84, 0.2)',
                            '&:hover': {
                              bgcolor: 'rgba(165, 134, 84, 0.3)',
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  {uniquePropertyTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <FormControl fullWidth sx={{ minWidth: 180, mr: 2 }}>
                <InputLabel shrink sx={{ color: 'white', '&.Mui-focused': { color: '#a58654' } }} htmlFor="location-select">
                  Location
                </InputLabel>
                <Select
                  id="location-select"
                  value={appliedFilters.location}
                  label="Location"
                  onChange={(e) => setLocation(e.target.value)}
                  labelId="location-label"
                  fullWidth
                  displayEmpty
                  inputProps={{ 'aria-label': 'Location' }}
                  sx={{
                    minHeight: 56,
                    bgcolor: appliedFilters.location !== 'all' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: appliedFilters.location !== 'all' ? '#D4AF37' : 'rgba(165, 134, 84, 0.3)',
                      borderWidth: appliedFilters.location !== 'all' ? 2 : 1,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a58654',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#a58654',
                    },
                    '& .MuiSvgIcon-root': {
                      color: '#a58654',
                    },
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 32,
                      pt: 2,
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#2c3e50',
                        minWidth: 220,
                        '& .MuiMenuItem-root': {
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(165, 134, 84, 0.1)',
                          },
                          '&.Mui-selected': {
                            bgcolor: 'rgba(165, 134, 84, 0.2)',
                            '&:hover': {
                              bgcolor: 'rgba(165, 134, 84, 0.3)',
                            },
                          },
                        },
                      },
                    },
                  }}
                >
                  {uniqueLocations.map((loc) => (
                    <MenuItem key={loc} value={loc}>
                      {loc.charAt(0).toUpperCase() + loc.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  type="number"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: appliedFilters.minPrice ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      '& fieldset': {
                        borderColor: appliedFilters.minPrice ? '#D4AF37' : 'rgba(165, 134, 84, 0.3)',
                        borderWidth: appliedFilters.minPrice ? 2 : 1,
                      },
                      '&:hover fieldset': {
                        borderColor: '#a58654',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#a58654',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  type="number"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: appliedFilters.maxPrice ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      color: 'white',
                      '& fieldset': {
                        borderColor: appliedFilters.maxPrice ? '#D4AF37' : 'rgba(165, 134, 84, 0.3)',
                        borderWidth: appliedFilters.maxPrice ? 2 : 1,
                      },
                      '&:hover fieldset': {
                        borderColor: '#a58654',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#a58654',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                <Button
                  variant="contained"
                  onClick={() => setAppliedFilters({
                    searchTerm,
                    propertyType,
                    location,
                    minPrice,
                    maxPrice,
                  })}
                  sx={{
                    bgcolor: '#D4AF37',
                    color: '#1A2027',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
                    '&:hover': {
                      bgcolor: '#E0C66F',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 16px rgba(212, 175, 55, 0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Apply Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Properties Grid */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              Showing {filteredProperties.length} properties
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {filteredProperties.map((property, index) => (
              <Grid item xs={12} sm={6} lg={4} key={property.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    component={motion.div}
                    whileHover={{ y: -12 }}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'rgba(212, 175, 55, 0.15)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: '0 20px 60px rgba(212, 175, 55, 0.25)',
                        borderColor: '#D4AF37',
                        '& .property-image': {
                          transform: 'scale(1.1)',
                        },
                        '& .view-details-btn': {
                          transform: 'translateY(0)',
                          opacity: 1,
                        },
                        '& .price-tag': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 20px rgba(212, 175, 55, 0.4)',
                        },
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 280 }}>
                      <CardMedia
                        className="property-image"
                        component="img"
                        height="280"
                        image={property.images?.[0] || property.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'}
                        alt={property.title}
                        sx={{
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                      
                      {/* Gradient overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '50%',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                          pointerEvents: 'none',
                        }}
                      />

                      {property.featured && (
                        <Chip
                          label="✨ Featured"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            bgcolor: '#D4AF37',
                            color: '#1A2027',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                          }}
                        />
                      )}
                      <IconButton
                        component={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: 'rgba(255,255,255,0.95)',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          '&:hover': {
                            bgcolor: '#D4AF37',
                            color: '#1A2027',
                          },
                        }}
                      >
                        <FavoriteBorderIcon />
                      </IconButton>

                      {/* Price Tag */}
                      <Box
                        className="price-tag"
                        sx={{
                          position: 'absolute',
                          bottom: 16,
                          right: 16,
                          bgcolor: '#D4AF37',
                          color: '#1A2027',
                          px: 2.5,
                          py: 1,
                          borderRadius: 3,
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        AED {property.price.toLocaleString()}
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <LocationOnIcon sx={{ fontSize: '1.1rem', color: '#D4AF37' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {property.location}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: 'primary.main',
                          mb: 2,
                          minHeight: 60,
                        }}
                      >
                        {property.title}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          gap: 3,
                          mb: 2,
                          pb: 2,
                          borderBottom: '1px solid rgba(0,0,0,0.1)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <BedIcon sx={{ fontSize: '1.2rem', color: '#6fa8a0' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {property.bedrooms}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <BathtubIcon sx={{ fontSize: '1.2rem', color: '#6fa8a0' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {property.bathrooms}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <SquareFootIcon sx={{ fontSize: '1.2rem', color: '#6fa8a0' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {property.area} sqft
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button
                          className="view-details-btn"
                          component={Link}
                          to={`/properties/${property.id}`}
                          variant="contained"
                          sx={{
                            bgcolor: '#D4AF37',
                            color: '#1A2027',
                            fontWeight: 600,
                            px: 3,
                            py: 1.2,
                            borderRadius: 2,
                            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
                            '&:hover': {
                              bgcolor: '#E0C66F',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 6px 16px rgba(212, 175, 55, 0.4)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          View Details →
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Properties;
