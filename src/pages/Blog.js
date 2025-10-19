import React, { useMemo, useState } from 'react';
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
import { BlogPageSkeleton } from '../components/LoadingSkeleton';
import { breadcrumbSchema } from '../seo/structuredData';
import { blogAPI } from '../services/api';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch blog posts with React Query
  const { data: postsResponse, isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: blogAPI.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Transform Supabase response to UI-friendly shape
  const blogPosts = React.useMemo(() => {
    const rows = postsResponse?.data || [];
    return rows.map((p) => {
      const created = p.created_at ? new Date(p.created_at) : null;
      const dateStr = created ? created.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
      const readTime = p.read_time || (p.content ? `${Math.max(1, Math.round(p.content.split(/\s+/).length / 200))} min read` : '');
      const authorName = p.author || p.agents?.name || '—';
      return {
        id: p.id,
        title: p.title,
        excerpt: p.excerpt || '',
        image: p.image || p.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80',
        category: p.category || 'General',
        author: authorName,
        date: dateStr,
        readTime,
        featured: !!p.featured,
        slug: p.slug,
      };
    });
  }, [postsResponse]);

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
          bgcolor: '#232a32',
          borderBottom: '1px solid rgba(212, 175, 55, 0.08)',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems="center">
          </Grid>
        </Container>
      </Box>

      {/* Featured Posts */}
  <Box sx={{ py: 8, bgcolor: '#232a32' }}>
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
                        component={Link}
                        to={post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`}
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
  <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
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
                        to={post.slug ? `/blog/${post.slug}` : `/blog/${post.id}`}
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
