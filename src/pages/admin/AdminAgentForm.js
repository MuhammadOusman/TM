import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { agentsAPI, storageAPI } from '../../services/api';
import AdminLayout from '../../components/AdminLayout';

const AdminAgentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    bio: '',
    experience: '',
    portfolio: '',
    specialties: [],
    image_url: '',
    rating: 5.0,
    status: 'active',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  // Fetch agent data if editing
  const { data: agentData } = useQuery({
    queryKey: ['agent', id],
    queryFn: () => agentsAPI.getById(id),
    enabled: isEdit,
  });

  useEffect(() => {
    if (agentData?.data) {
      const agent = agentData.data;
      setFormData({
        name: agent.name || '',
        role: agent.role || '',
        email: agent.email || '',
        phone: agent.phone || '',
        bio: agent.bio || '',
        experience: agent.experience || '',
        portfolio: agent.portfolio || '',
        specialties: agent.specialties || [],
        image_url: agent.image_url || '',
        rating: agent.rating || 5.0,
        status: agent.status || 'active',
      });
      setImagePreview(agent.image_url || '');
    }
  }, [agentData]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: agentsAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['agents']);
      navigate('/admin/agents');
    },
    onError: (error) => {
      setError(error.message || 'Failed to create agent');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => agentsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['agents']);
      navigate('/admin/agents');
    },
    onError: (error) => {
      setError(error.message || 'Failed to update agent');
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecialtiesChange = (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      specialties: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image_url;

    setUploadingImage(true);
    try {
      const { data, error } = await storageAPI.uploadImage(imageFile, 'agents');
      if (error) throw error;
      return data;
    } catch (err) {
      setError('Failed to upload image: ' + err.message);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.role || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }

    // Upload image if new one selected
    let imageUrl = formData.image_url;
    if (imageFile) {
      imageUrl = await uploadImage();
      if (!imageUrl) return;
    }

    const agentData = {
      ...formData,
      image_url: imageUrl,
      rating: parseFloat(formData.rating),
    };

    if (isEdit) {
      updateMutation.mutate({ id, data: agentData });
    } else {
      createMutation.mutate(agentData);
    }
  };

  const specialtyOptions = [
    'Luxury Villas',
    'Downtown Properties',
    'Beachfront Properties',
    'Investment Properties',
    'Commercial Real Estate',
    'Property Management',
    'Short-term Rentals',
    'Vacation Homes',
  ];

  const isLoading = createMutation.isPending || updateMutation.isPending || uploadingImage;

  return (
    <AdminLayout>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/admin/agents')}
              sx={{ mb: 2, color: 'text.secondary' }}
            >
              Back to Agents
            </Button>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #D4AF37 0%, #F0F2F5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              {isEdit ? 'Edit Agent' : 'Add New Agent'}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {isEdit ? 'Update agent information' : 'Add a new team member'}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            <Grid container spacing={3}>
              {/* Image Upload */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                  Profile Photo
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  {imagePreview && (
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Preview"
                      sx={{
                        width: 150,
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: 2,
                        border: '2px solid rgba(212, 175, 55, 0.3)',
                      }}
                    />
                  )}
                  <Box>
                    <Button variant="outlined" component="label" sx={{ mb: 1 }}>
                      {imagePreview ? 'Change Photo' : 'Upload Photo'}
                      <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                    </Button>
                    <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>
                      Recommended: 400x400px, Max 5MB
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Basic Info */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
                  Basic Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Talha Musharraf"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Role/Position"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Property Consultant"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="agent@darAlbarakah.com"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+971 50 123 4567"
                />
              </Grid>

              {/* Bio */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Brief description about the agent..."
                />
              </Grid>

              {/* Experience & Portfolio */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g., 5 years"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Portfolio URL"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </Grid>

              {/* Specialties */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Specialties</InputLabel>
                  <Select
                    multiple
                    value={formData.specialties}
                    onChange={handleSpecialtiesChange}
                    input={<OutlinedInput label="Specialties" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {specialtyOptions.map((specialty) => (
                      <MenuItem key={specialty} value={specialty}>
                        {specialty}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Rating & Status */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Rating"
                  name="rating"
                  type="number"
                  inputProps={{ min: 0, max: 5, step: 0.1 }}
                  value={formData.rating}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Grid>

              {/* Submit Buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/admin/agents')}
                    disabled={isLoading}
                    sx={{ borderColor: 'text.secondary', color: 'text.secondary' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
                    disabled={isLoading}
                    sx={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #E0C66F 100%)',
                      color: '#1A2027',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #E0C66F 0%, #D4AF37 100%)',
                      },
                    }}
                  >
                    {isLoading ? 'Saving...' : isEdit ? 'Update Agent' : 'Add Agent'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AdminAgentForm;
