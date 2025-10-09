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
  Chip,
  OutlinedInput,
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
import { propertiesAPI, storageAPI } from '../../services/api';

const AMENITIES = [
  'WiFi',
  'Air Conditioning',
  'Parking',
  'Swimming Pool',
  'Gym',
  'Security',
  'Balcony',
  'Kitchen',
  'Laundry',
  'Pet Friendly',
  'Furnished',
  'Garden',
];

const LOCATIONS = [
  'Dubai Marina',
  'Downtown Dubai',
  'Palm Jumeirah',
  'Business Bay',
  'JBR',
  'Dubai Hills',
  'Arabian Ranches',
  'JVC',
  'JLT',
];

const AdminPropertyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'apartment',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    amenities: [],
    status: 'available',
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Fetch property data if editing
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesAPI.getById(id),
    enabled: isEditing,
  });

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        description: property.description || '',
        type: property.type || 'apartment',
        location: property.location || '',
        price: property.price || '',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        area: property.area || '',
        amenities: property.amenities || [],
        status: property.status || 'available',
      });
      setExistingImages(property.images || []);
    }
  }, [property]);

  // Create/Update mutation
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      // Upload new images
      let imageUrls = [...existingImages];
      
      if (images.length > 0) {
        setUploading(true);
        for (const image of images) {
          const url = await storageAPI.uploadImage(image, 'properties');
          imageUrls.push(url);
        }
        setUploading(false);
      }

      const propertyData = {
        ...data,
        images: imageUrls,
        price: parseFloat(data.price),
        bedrooms: parseInt(data.bedrooms),
        bathrooms: parseInt(data.bathrooms),
        area: parseFloat(data.area),
      };

      if (isEditing) {
        return propertiesAPI.update(id, propertyData);
      } else {
        return propertiesAPI.create(propertyData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminProperties']);
      navigate('/admin/properties');
    },
    onError: (err) => {
      setError(err.message || 'Failed to save property');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenitiesChange = (event) => {
    setFormData((prev) => ({ ...prev, amenities: event.target.value }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.title || !formData.location || !formData.price || !formData.bedrooms) {
      setError('Please fill in all required fields');
      return;
    }

    if (existingImages.length === 0 && images.length === 0) {
      setError('Please add at least one image');
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
            onClick={() => navigate('/admin/properties')}
            sx={{ mb: 2, color: 'text.secondary' }}
          >
            Back to Properties
          </Button>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
            {isEditing ? 'Edit Property' : 'Add New Property'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {isEditing ? 'Update property details' : 'Create a new property listing'}
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
                label="Property Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            {/* Type and Location */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select name="type" value={formData.type} onChange={handleChange} label="Property Type">
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="villa">Villa</MenuItem>
                  <MenuItem value="townhouse">Townhouse</MenuItem>
                  <MenuItem value="penthouse">Penthouse</MenuItem>
                  <MenuItem value="studio">Studio</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Location</InputLabel>
                <Select name="location" value={formData.location} onChange={handleChange} label="Location">
                  {LOCATIONS.map((loc) => (
                    <MenuItem key={loc} value={loc}>
                      {loc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price and Area */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price (AED per month)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Area (sq ft)"
                name="area"
                type="number"
                value={formData.area}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Bedrooms and Bathrooms */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Amenities */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Amenities</InputLabel>
                <Select
                  multiple
                  value={formData.amenities}
                  onChange={handleAmenitiesChange}
                  input={<OutlinedInput label="Amenities" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {AMENITIES.map((amenity) => (
                    <MenuItem key={amenity} value={amenity}>
                      {amenity}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select name="status" value={formData.status} onChange={handleChange} label="Status">
                  <MenuItem value="available">Available</MenuItem>
                  <MenuItem value="rented">Rented</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Images */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                Property Images
              </Typography>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                    Current Images
                  </Typography>
                  <Grid container spacing={2}>
                    {existingImages.map((image, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Box sx={{ position: 'relative' }}>
                          <Box
                            component="img"
                            src={image}
                            alt={`Property ${index + 1}`}
                            sx={{
                              width: '100%',
                              height: 150,
                              objectFit: 'cover',
                              borderRadius: 1,
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveExistingImage(index)}
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              bgcolor: 'rgba(0, 0, 0, 0.7)',
                              color: 'white',
                              '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.9)' },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* New Images Preview */}
              {images.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                    New Images (to be uploaded)
                  </Typography>
                  <Grid container spacing={2}>
                    {images.map((image, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Box sx={{ position: 'relative' }}>
                          <Box
                            component="img"
                            src={URL.createObjectURL(image)}
                            alt={`New ${index + 1}`}
                            sx={{
                              width: '100%',
                              height: 150,
                              objectFit: 'cover',
                              borderRadius: 1,
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveNewImage(index)}
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              bgcolor: 'rgba(0, 0, 0, 0.7)',
                              color: 'white',
                              '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.9)' },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Upload Button */}
              <Button
                variant="outlined"
                component="label"
                startIcon={<AddPhotoAlternateIcon />}
                sx={{ borderColor: 'primary.main', color: 'primary.main' }}
              >
                Add Images
                <input type="file" hidden multiple accept="image/*" onChange={handleImageSelect} />
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={() => navigate('/admin/properties')}>
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
                    'Update Property'
                  ) : (
                    'Create Property'
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

export default AdminPropertyForm;
