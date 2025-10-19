import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Menu,
  MenuItem,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { blogAPI } from '../../services/api';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import AdminLayout from '../../components/AdminLayout';

const AdminBlog = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch blog posts
  const { data: postsData, isLoading, error } = useQuery({
    queryKey: ['adminBlogPosts'],
    queryFn: blogAPI.getAllAdmin,
  });
  const posts = postsData?.data || [];

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: blogAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminBlogPosts']);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    },
  });

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      blogAPI.update(id, { status: status === 'published' ? 'draft' : 'published' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminBlogPosts']);
      handleMenuClose();
    },
  });

    // Toggle featured mutation
    const toggleFeaturedMutation = useMutation({
      mutationFn: ({ id, featured }) =>
        blogAPI.update(id, { featured: !featured }),
      onSuccess: () => {
        queryClient.invalidateQueries(['adminBlogPosts']);
        handleMenuClose();
      },
    });

  // Filter posts
  const filteredPosts = posts?.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
      const matchesFeatured = featuredFilter === 'all' || 
                              (featuredFilter === 'featured' && post.featured) ||
                              (featuredFilter === 'notfeatured' && !post.featured);
    
      return matchesSearch && matchesStatus && matchesFeatured;
  }) || [];

  // Paginated posts
  const paginatedPosts = filteredPosts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event, post) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  const handleDeleteClick = () => {
    setPostToDelete(selectedPost);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      deleteMutation.mutate(postToDelete.id);
    }
  };

  const handleToggleStatus = () => {
    if (selectedPost) {
      toggleStatusMutation.mutate({ id: selectedPost.id, status: selectedPost.status });
    }
  };

    const handleToggleFeatured = () => {
      if (selectedPost) {
        toggleFeaturedMutation.mutate({ id: selectedPost.id, featured: selectedPost.featured });
      }
    };

  if (isLoading) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                Blog Posts
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Manage your blog content
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/blog/new')}
              sx={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #E0C66F 100%)',
                color: '#1A2027',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #E0C66F 0%, #D4AF37 100%)',
                },
              }}
            >
              New Post
            </Button>
          </Box>
        </Box>

        {/* Filters */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
            border: '1px solid rgba(212, 175, 55, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flexGrow: 1, minWidth: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label="All"
                onClick={() => setStatusFilter('all')}
                color={statusFilter === 'all' ? 'primary' : 'default'}
                sx={{ cursor: 'pointer' }}
              />
              <Chip
                label="Published"
                onClick={() => setStatusFilter('published')}
                color={statusFilter === 'published' ? 'primary' : 'default'}
                sx={{ cursor: 'pointer' }}
              />
              <Chip
                label="Draft"
                onClick={() => setStatusFilter('draft')}
                color={statusFilter === 'draft' ? 'primary' : 'default'}
                sx={{ cursor: 'pointer' }}
              />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, borderLeft: '1px solid rgba(212, 175, 55, 0.2)', pl: 2 }}>
                <Chip
                  label="All Posts"
                  onClick={() => setFeaturedFilter('all')}
                  color={featuredFilter === 'all' ? 'primary' : 'default'}
                  sx={{ cursor: 'pointer' }}
                />
                <Chip
                  icon={<StarIcon />}
                  label="Featured"
                  onClick={() => setFeaturedFilter('featured')}
                  color={featuredFilter === 'featured' ? 'primary' : 'default'}
                  sx={{ 
                    cursor: 'pointer',
                    ...(featuredFilter === 'featured' && {
                      bgcolor: 'rgba(212, 175, 55, 0.15)',
                      color: '#D4AF37',
                      borderColor: '#D4AF37',
                    })
                  }}
                />
                <Chip
                  label="Not Featured"
                  onClick={() => setFeaturedFilter('notfeatured')}
                  color={featuredFilter === 'notfeatured' ? 'primary' : 'default'}
                  sx={{ cursor: 'pointer' }}
                />
            </Box>
          </Box>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Failed to load blog posts. Please try again.
          </Alert>
        )}

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper
            sx={{
              background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Title</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Category</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Author</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="center">
                      Views
                    </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="center">
                        Featured
                      </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="center">
                      Status
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedPosts.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                        No blog posts found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedPosts.map((post) => (
                      <TableRow key={post.id} hover>
                        <TableCell sx={{ color: 'text.primary' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {post.image && (
                              <Box
                                component="img"
                                src={post.image}
                                alt={post.title}
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 1,
                                  objectFit: 'cover',
                                }}
                              />
                            )}
                              <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography sx={{ fontWeight: 500 }}>{post.title}</Typography>
                                  {post.featured && (
                                    <StarIcon sx={{ fontSize: '1rem', color: '#D4AF37' }} />
                                  )}
                                </Box>
                              </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: 'text.primary' }}>{post.category}</TableCell>
                        <TableCell sx={{ color: 'text.primary' }}>{post.author}</TableCell>
                        <TableCell sx={{ color: 'text.primary' }}>
                          {format(new Date(post.created_at), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            <VisibilityIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                            <Typography variant="body2">{post.views || 0}</Typography>
                          </Box>
                        </TableCell>
                          <TableCell align="center">
                            {post.featured ? (
                              <Chip
                                icon={<StarIcon sx={{ fontSize: '1rem !important' }} />}
                                label="Featured"
                                size="small"
                                sx={{
                                  bgcolor: 'rgba(212, 175, 55, 0.15)',
                                  color: '#D4AF37',
                                  fontWeight: 600,
                                  border: '1px solid rgba(212, 175, 55, 0.3)',
                                }}
                              />
                            ) : (
                              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                                -
                              </Typography>
                            )}
                          </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={post.status}
                            size="small"
                            color={post.status === 'published' ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, post)}
                            sx={{ color: 'text.secondary' }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredPosts.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ color: 'text.secondary', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}
            />
          </Paper>
        </motion.div>

        {/* Action Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => navigate(`/admin/blog/edit/${selectedPost?.id}`)}>
            <EditIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            Edit
          </MenuItem>
            <MenuItem onClick={handleToggleFeatured}>
              {selectedPost?.featured ? (
                <StarBorderIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#D4AF37' }} />
              ) : (
                <StarIcon sx={{ mr: 1, fontSize: '1.2rem', color: '#D4AF37' }} />
              )}
              {selectedPost?.featured ? 'Remove Featured' : 'Mark as Featured'}
            </MenuItem>
          <MenuItem onClick={handleToggleStatus}>
            <VisibilityIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            {selectedPost?.status === 'published' ? 'Unpublish' : 'Publish'}
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
            Delete
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          PaperProps={{
            sx: {
              bgcolor: '#273444',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            },
          }}
        >
          <DialogTitle sx={{ color: 'text.primary' }}>Delete Blog Post</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: 'text.secondary' }}>
              Are you sure you want to delete "{postToDelete?.title}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: 'text.secondary' }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? <CircularProgress size={24} /> : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AdminBlog;
