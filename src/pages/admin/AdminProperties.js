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
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { propertiesAPI } from '../../services/api';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/AdminLayout';

const AdminProperties = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [showUnavailable, setShowUnavailable] = useState(true);

  // Fetch properties
  const { data: propertiesData, isLoading, error } = useQuery({
    queryKey: ['adminProperties'],
    queryFn: propertiesAPI.getAllAdmin,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
  const properties = propertiesData?.data || [];

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: propertiesAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminProperties']);
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    },
  });

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      propertiesAPI.update(id, { status: status === 'available' ? 'rented' : 'available' }),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminProperties']);
      queryClient.invalidateQueries(['properties']);
      queryClient.invalidateQueries(['featured-properties']);
    },
  });

  // Toggle featured mutation
  const toggleFeaturedMutation = useMutation({
    mutationFn: ({ id, featured }) =>
      propertiesAPI.update(id, { featured: !featured }),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminProperties']);
      queryClient.invalidateQueries(['properties']);
      queryClient.invalidateQueries(['featured-properties']);
    },
  });

  // Filter properties
  const filteredProperties = properties?.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = showUnavailable || property.status === 'available';
    
    return matchesSearch && matchesStatus;
  }) || [];

  // Paginated properties
  const paginatedProperties = filteredProperties.slice(
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

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (propertyToDelete) {
      deleteMutation.mutate(propertyToDelete.id);
    }
  };

  const handleToggleStatus = (property) => {
    toggleStatusMutation.mutate({ id: property.id, status: property.status });
  };

  const handleToggleFeatured = (property) => {
    toggleFeaturedMutation.mutate({ id: property.id, featured: property.featured });
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
                Properties
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Manage your property listings
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/properties/new')}
              sx={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #E0C66F 100%)',
                color: '#1A2027',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #E0C66F 0%, #D4AF37 100%)',
                },
              }}
            >
              Add Property
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
              placeholder="Search properties..."
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
            <FormControlLabel
              control={
                <Switch
                  checked={showUnavailable}
                  onChange={(e) => setShowUnavailable(e.target.checked)}
                  color="primary"
                />
              }
              label="Show Unavailable"
            />
          </Box>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Failed to load properties. Please try again.
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
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Location</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="right">
                      Price
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="center">
                      Bedrooms
                    </TableCell>
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
                  {paginatedProperties.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                        No properties found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedProperties.map((property) => (
                      <TableRow key={property.id} hover>
                        <TableCell sx={{ color: 'text.primary' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {property.images?.[0] && (
                              <Box
                                component="img"
                                src={property.images[0]}
                                alt={property.title}
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 1,
                                  objectFit: 'cover',
                                }}
                              />
                            )}
                            <Typography sx={{ fontWeight: 500 }}>{property.title}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ color: 'text.primary' }}>{property.location}</TableCell>
                        <TableCell sx={{ color: 'text.primary' }}>{property.type}</TableCell>
                        <TableCell sx={{ color: 'text.primary' }} align="right">
                          AED {property.price.toLocaleString()}/month
                        </TableCell>
                        <TableCell sx={{ color: 'text.primary' }} align="center">
                          {property.bedrooms}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            <VisibilityIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                            <Typography variant="body2">{property.views || 0}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Switch
                            checked={property.featured || false}
                            onChange={() => handleToggleFeatured(property)}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#D4AF37',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#D4AF37',
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={property.status}
                            size="small"
                            color={property.status === 'available' ? 'success' : 'default'}
                            onClick={() => handleToggleStatus(property)}
                            sx={{ cursor: 'pointer' }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                            sx={{ color: 'primary.main', mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(property)}
                            sx={{ color: 'error.main' }}
                          >
                            <DeleteIcon />
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
              count={filteredProperties.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ color: 'text.secondary', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}
            />
          </Paper>
        </motion.div>

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
          <DialogTitle sx={{ color: 'text.primary' }}>Delete Property</DialogTitle>
          <DialogContent>
            <Typography sx={{ color: 'text.secondary' }}>
              Are you sure you want to delete "{propertyToDelete?.title}"? This action cannot be undone.
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

export default AdminProperties;
