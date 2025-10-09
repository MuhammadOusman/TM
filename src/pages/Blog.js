import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip, Button, TextField, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SEO from '../components/SEO';
import HeroBanner from '../components/HeroBanner';
import LoadingSpinner from '../components/LoadingSpinner';
import { BlogPageSkeleton } from '../components/LoadingSkeleton';
import { breadcrumbSchema } from '../seo/structuredData';
import { blogAPI } from '../services/api';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch blog posts with React Query
  const { data: fetchedPosts, isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: blogAPI.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fallback mock data
  const mockBlogPosts = [
    {
      id: 1,
      title: 'Top 10 Neighborhoods in Dubai for Holiday Homes in 2025',
      excerpt: 'Discover the most sought-after areas in Dubai for short-term rentals. From Downtown Dubai to Palm Jumeirah, we explore the best locations for your investment.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
      category: 'Investment',
      author: 'Talha Musharraf',
      date: 'October 5, 2025',
      readTime: '8 min read',
      featured: true,
    },
    {
      id: 2,
      title: 'Maximizing ROI: A Complete Guide to Property Management',
      excerpt: 'Learn proven strategies to increase your property returns through effective management, smart pricing, and excellent guest experiences.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      category: 'Property Management',
      author: 'Hamza Awais',
      date: 'October 1, 2025',
      readTime: '10 min read',
      featured: true,
    },
    {
      id: 3,
      title: 'Dubai Real Estate Market Trends: What to Expect in 2025',
      excerpt: 'An in-depth analysis of the current market conditions, emerging opportunities, and expert predictions for Dubai\'s real estate sector.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      category: 'Market Insights',
      author: 'Mohammed Al Rashid',
      date: 'September 28, 2025',
      readTime: '12 min read',
      featured: false,
    },
    {
      id: 4,
      title: 'The Ultimate Guest Experience: Tips for Holiday Home Hosts',
      excerpt: 'Create unforgettable stays for your guests with these hospitality best practices and amenities that guests love.',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      category: 'Hosting Tips',
      author: 'Aisha Khan',
      date: 'September 25, 2025',
      readTime: '6 min read',
      featured: false,
    },
    {
      id: 5,
      title: 'Legal Requirements for Short-Term Rentals in Dubai',
      excerpt: 'Everything you need to know about permits, regulations, and compliance when operating a holiday home in Dubai.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      category: 'Legal & Compliance',
      author: 'Talha Musharraf',
      date: 'September 20, 2025',
      readTime: '9 min read',
      featured: false,
    },
    {
      id: 6,
      title: 'Smart Home Technology for Modern Holiday Rentals',
      excerpt: 'Explore the latest smart home innovations that can enhance guest experiences and streamline property management.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      category: 'Technology',
      author: 'Omar Hassan',
      date: 'September 15, 2025',
      readTime: '7 min read',
      featured: false,
    },
    {
      id: 7,
      title: 'Seasonal Pricing Strategies for Maximum Occupancy',
      excerpt: 'Master the art of dynamic pricing to optimize your revenue throughout the year in Dubai\'s seasonal market.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
      category: 'Revenue Management',
      author: 'Sarah Ahmed',
      date: 'September 10, 2025',
      readTime: '8 min read',
      featured: false,
    },
    {
      id: 8,
      title: 'Investing in Off-Plan Properties: Risks and Rewards',
      excerpt: 'A comprehensive guide to off-plan investments in Dubai, including market analysis, developer selection, and risk mitigation.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      category: 'Investment',
      author: 'Mohammed Al Rashid',
      date: 'September 5, 2025',
      readTime: '11 min read',
      featured: false,
    },
    {
      id: 9,
      title: 'Creating Instagram-Worthy Spaces: Interior Design Tips',
      excerpt: 'Transform your property into a photogenic paradise that guests will love to share on social media.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      category: 'Design',
      author: 'Aisha Khan',
      date: 'August 30, 2025',
      readTime: '6 min read',
      featured: false,
    },
  ];

  // Use fetched data if available, otherwise use mock data
  const blogPosts = fetchedPosts && fetchedPosts.length > 0 ? fetchedPosts : mockBlogPosts;

  const categories = ['All', 'Investment', 'Property Management', 'Market Insights', 'Hosting Tips', 'Legal & Compliance', 'Technology', 'Revenue Management', 'Design'];

  // Show loading skeleton
  if (isLoading) {
    return (
      <Box>
        <SEO
          title="Blog & Insights - Loading..."
          description="Loading expert insights on Dubai real estate..."
        />
        <HeroBanner
          chip="Blog & Insights"
          title="Real Estate Insights & Tips"
          subtitle="Expert advice, market trends, and success stories from Dubai's real estate industry"
          image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80"
          minHeight="50vh"
        />
        <BlogPageSkeleton />
      </Box>
    );
  }

  return (
    <Box>
      <SEO
        title="Blog & Insights"
        description="Read expert insights on Dubai real estate, property management, investment strategies, hosting tips, and market trends."
        structuredData={breadcrumbSchema([
          { name: 'Home', item: 'https://www.daralbarakah.com/' },
          { name: 'Blog', item: 'https://www.daralbarakah.com/blog' },
        ])}
      />
      <HeroBanner
        chip="Blog & Insights"
        title="Real Estate Insights & Tips"
        subtitle="Expert advice, market trends, and success stories from Dubai's real estate industry"
        image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80"
        minHeight="50vh"
      />

      {/* Search & Filter */}
      <Box
        sx={{
          py: 4,
          bgcolor: 'white',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search articles..."
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
                    '&:hover fieldset': {
                      borderColor: '#a58654',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#a58654',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => {}}
                    sx={{
                      bgcolor: category === 'All' ? '#a58654' : 'rgba(165, 134, 84, 0.1)',
                      color: category === 'All' ? 'white' : '#a58654',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: category === 'All' ? '#8b6f47' : 'rgba(165, 134, 84, 0.2)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Posts */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <TrendingUpIcon sx={{ fontSize: '2rem', color: '#a58654' }} />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                }}
              >
                Featured Articles
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {blogPosts.filter(post => post.featured).map((post, index) => (
              <Grid item xs={12} md={6} key={post.id}>
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
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 48px rgba(165, 134, 84, 0.2)',
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="350"
                        image={post.image}
                        alt={post.title}
                      />
                      <Chip
                        label={post.category}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          bgcolor: '#a58654',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonIcon sx={{ fontSize: '1rem', color: '#6fa8a0' }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {post.author}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarTodayIcon sx={{ fontSize: '1rem', color: '#6fa8a0' }} />
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {post.date}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: '#a58654', fontWeight: 600 }}>
                          {post.readTime}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: 'primary.main',
                          mb: 2,
                          minHeight: 70,
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 3,
                          lineHeight: 1.8,
                        }}
                      >
                        {post.excerpt}
                      </Typography>

                      <Button
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          color: '#a58654',
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: 'rgba(165, 134, 84, 0.1)',
                          },
                        }}
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* All Posts */}
      <Box sx={{ py: 8, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              mb: 6,
            }}
          >
            Latest Articles
          </Typography>

          <Grid container spacing={4}>
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <Grid item xs={12} sm={6} lg={4} key={post.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    component={motion.div}
                    whileHover={{ y: -10, boxShadow: '0 20px 60px rgba(212, 175, 55, 0.25)' }}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      border: '1px solid rgba(212, 175, 55, 0.15)',
                      boxShadow: '0 6px 24px rgba(0,0,0,0.08)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: '#D4AF37',
                        '& img': {
                          transform: 'scale(1.1)',
                        },
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 240 }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={post.image}
                        alt={post.title}
                        sx={{ transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                      />
                      <Chip
                        label={post.category}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          bgcolor: '#D4AF37',
                          color: '#1A2027',
                          fontWeight: 700,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 12,
                          right: 12,
                          bgcolor: 'rgba(212, 175, 55, 0.95)',
                          color: '#1A2027',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        {post.readTime}
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {post.author}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#D4AF37' }}>
                          •
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {post.date}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: 'primary.main',
                          mb: 2,
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 3,
                          lineHeight: 1.7,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.excerpt}
                      </Typography>

                      <Button
                        component={Link}
                        to={`/blog/${post.id}`}
                        endIcon={<ArrowForwardIcon />}
                        fullWidth
                        sx={{
                          color: '#D4AF37',
                          borderTop: '2px solid rgba(212, 175, 55, 0.15)',
                          borderRadius: 0,
                          fontWeight: 600,
                          py: 1.5,
                          '&:hover': {
                            bgcolor: 'rgba(212, 175, 55, 0.08)',
                          },
                        }}
                      >
                        Read Article
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Newsletter CTA */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  mb: 2,
                }}
              >
                Stay Updated
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  mb: 4,
                  fontSize: '1.1rem',
                }}
              >
                Subscribe to our newsletter for the latest insights, market trends, and expert tips
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, maxWidth: 500, mx: 'auto' }}>
                <TextField
                  fullWidth
                  placeholder="Your email address"
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#a58654',
                    px: 4,
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      bgcolor: '#8b6f47',
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Blog;
