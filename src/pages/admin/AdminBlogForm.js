import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { blogAPI, storageAPI } from '../../services/api';

const CATEGORIES = [
  'Dubai Real Estate',
  'Investment Tips',
  'Luxury Living',
  'Community Guides',
  'Market Updates',
  'Home Maintenance',
  'Legal Advice',
];

const AdminBlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    status: 'draft',
  });

  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Fetch blog post data if editing
  const { data: post, isLoading } = useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => blogAPI.getById(id),
    enabled: isEditing,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        category: post.category || '',
        author: post.author || '',
        status: post.status || 'draft',
      });
      setExistingImage(post.image || '');
    }
  }, [post]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, isEditing]);

  // Create/Update mutation
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      let imageUrl = existingImage;
      
      // Upload new image if selected
      if (image) {
        setUploading(true);
        imageUrl = await storageAPI.uploadImage(image, 'blog');
        setUploading(false);
      }

      const blogData = {
        ...data,
        image: imageUrl,
      };

      if (isEditing) {
        return blogAPI.update(id, blogData);
      } else {
        return blogAPI.create(blogData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminBlogPosts']);
      navigate('/admin/blog');
    },
    onError: (err) => {
      setError(err.message || 'Failed to save blog post');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setExistingImage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.title || !formData.content || !formData.category || !formData.author) {
      setError('Please fill in all required fields');
      return;
    }

    if (!existingImage && !image) {
      setError('Please add a featured image');
      return;
    }

    saveMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#1A2027', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin/blog')}
            sx={{ mb: 2, color: 'text.secondary' }}
          >
            Back to Blog Posts
          </Button>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
            {isEditing ? 'Edit Blog Post' : 'Create New Post'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {isEditing ? 'Update blog post content' : 'Write a new blog post'}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
            border: '1px solid rgba(212, 175, 55, 0.1)',
          }}
        >
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Post Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Slug */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL Slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                helperText="Auto-generated from title (editable)"
                required
              />
            </Grid>

            {/* Category and Author */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select name="category" value={formData.category} onChange={handleChange} label="Category">
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Excerpt */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                multiline
                rows={2}
                helperText="A short summary (optional)"
              />
            </Grid>

            {/* Content */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                multiline
                rows={12}
                required
                helperText="Full blog post content"
              />
            </Grid>

            {/* Featured Image */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                Featured Image
              </Typography>

              {/* Existing or Preview Image */}
              {(existingImage || image) && (
                <Box sx={{ mb: 2, position: 'relative', display: 'inline-block' }}>
                  <Box
                    component="img"
                    src={image ? URL.createObjectURL(image) : existingImage}
                    alt="Featured"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: 400,
                      borderRadius: 2,
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={handleRemoveImage}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.9)' },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}

              {/* Upload Button */}
              {!existingImage && !image && (
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AddPhotoAlternateIcon />}
                  sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                >
                  Upload Featured Image
                  <input type="file" hidden accept="image/*" onChange={handleImageSelect} />
                </Button>
              )}
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={formData.status} onChange={handleChange} label="Status">
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Submit Buttons */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={() => navigate('/admin/blog')}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  disabled={saveMutation.isPending || uploading}
                  sx={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #E0C66F 100%)',
                    color: '#1A2027',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #E0C66F 0%, #D4AF37 100%)',
                    },
                  }}
                >
                  {saveMutation.isPending || uploading ? (
                    <CircularProgress size={24} sx={{ color: '#1A2027' }} />
                  ) : isEditing ? (
                    'Update Post'
                  ) : (
                    'Publish Post'
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminBlogForm;
