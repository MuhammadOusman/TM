import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Container, Typography, Chip, CircularProgress, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SEO from '../components/SEO';
import { blogAPI } from '../services/api';

const BlogDetail = () => {
  const { slug } = useParams();

  const { data: resp, isLoading, error } = useQuery({
    queryKey: ['blog-detail', slug],
    queryFn: () => blogAPI.getBySlug(slug),
    enabled: !!slug,
  });

  const post = resp?.data;

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" sx={{ color: 'text.secondary', mb: 2 }}>Article not found</Typography>
        <Button component={Link} to="/blog" startIcon={<ArrowBackIcon />} sx={{ color: 'primary.main' }}>
          Back to Blog
        </Button>
      </Container>
    );
  }

  const created = post.created_at ? new Date(post.created_at) : null;
  const dateStr = created ? created.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
  const authorName = post.author || post.agents?.name || '—';
  const imageUrl = post.image || post.featured_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80';

  return (
    <Box>
      <SEO 
        title={`${post.title} - Blog`}
        description={post.excerpt || post.title}
      />

      <Box sx={{ position: 'relative', height: { xs: 260, md: 420 }, overflow: 'hidden' }}>
        <Box
          component="img"
          src={imageUrl}
          alt={post.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
        />
        <Container sx={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pb: 4 }}>
          <Chip label={post.category} sx={{ bgcolor: '#D4AF37', color: '#1A2027', fontWeight: 700, mb: 2, alignSelf: 'flex-start' }} />
          <Typography variant="h2" sx={{ fontWeight: 800 }}>{post.title}</Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
            {authorName} • {dateStr} • {post.read_time || ''}
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        {post.excerpt && (
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 3 }}>
            {post.excerpt}
          </Typography>
        )}
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.9 }}>
          {post.content}
        </Typography>
        <Box sx={{ mt: 6 }}>
          <Button component={Link} to="/blog" startIcon={<ArrowBackIcon />} sx={{ color: 'primary.main' }}>
            Back to Blog
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogDetail;
