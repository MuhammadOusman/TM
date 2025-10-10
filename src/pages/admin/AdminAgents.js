import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Avatar,
  Chip,
  Rating,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { agentsAPI } from '../../services/api';
import { motion } from 'framer-motion';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const AdminAgents = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [agentToDelete, setAgentToDelete] = React.useState(null);

  // Fetch agents
  const { data: agentsData, isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: agentsAPI.getAll,
  });
  const agents = agentsData?.data || [];

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: agentsAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['agents']);
      setDeleteDialogOpen(false);
      setAgentToDelete(null);
    },
  });

  const handleDeleteClick = (agent) => {
    setAgentToDelete(agent);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (agentToDelete) {
      deleteMutation.mutate(agentToDelete.id);
    }
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
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin/dashboard')}
            sx={{ mb: 2, color: 'text.secondary' }}
          >
            Back to Dashboard
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                Our Team
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Meet our professional real estate agents
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/admin/agents/new')}
              sx={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #E0C66F 100%)',
                color: '#1A2027',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #E0C66F 0%, #D4AF37 100%)',
                },
              }}
            >
              Add Agent
            </Button>
          </Box>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Failed to load agents. Please try again.
          </Alert>
        )}

        {/* Agent Cards Grid */}
        <Grid container spacing={4}>
          {agents?.map((agent, index) => (
            <Grid item xs={12} sm={6} md={4} key={agent.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  {/* Agent Image */}
                  {agent.image ? (
                    <CardMedia
                      component="img"
                      height="300"
                      image={agent.image}
                      alt={agent.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 300,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#1A2027',
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 120,
                          height: 120,
                          bgcolor: 'primary.main',
                          fontSize: '3rem',
                        }}
                      >
                        {agent.name.charAt(0)}
                      </Avatar>
                    </Box>
                  )}

                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Name and Role */}
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}
                    >
                      {agent.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'primary.main', mb: 2, fontWeight: 500 }}
                    >
                      {agent.role}
                    </Typography>

                    {/* Rating */}
                    {agent.rating && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={agent.rating} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                          ({agent.rating})
                        </Typography>
                      </Box>
                    )}

                    {/* Bio */}
                    {agent.bio && (
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        {agent.bio.length > 120 ? `${agent.bio.slice(0, 120)}...` : agent.bio}
                      </Typography>
                    )}

                    {/* Specialties */}
                    {agent.specialties && agent.specialties.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {agent.specialties.slice(0, 3).map((specialty, idx) => (
                          <Chip
                            key={idx}
                            label={specialty}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(212, 175, 55, 0.1)',
                              color: 'primary.main',
                              border: '1px solid rgba(212, 175, 55, 0.3)',
                            }}
                          />
                        ))}
                      </Box>
                    )}

                    {/* Contact Info */}
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EmailIcon sx={{ fontSize: '1rem', color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {agent.email}
                        </Typography>
                      </Box>
                      {agent.phone && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon sx={{ fontSize: '1rem', color: 'text.secondary', mr: 1 }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {agent.phone}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                    <IconButton
                      onClick={() => navigate(`/admin/agents/${agent.id}`)}
                      sx={{
                        color: '#D4AF37',
                        '&:hover': {
                          bgcolor: 'rgba(212, 175, 55, 0.1)',
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(agent)}
                      sx={{
                        color: '#f44336',
                        '&:hover': {
                          bgcolor: 'rgba(244, 67, 54, 0.1)',
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      fullWidth
                      variant="outlined"
                      href={`mailto:${agent.email}`}
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: 'rgba(212, 175, 55, 0.1)',
                        },
                      }}
                    >
                      Contact Agent
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {agents?.length === 0 && (
          <Paper
            sx={{
              p: 8,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
              border: '1px solid rgba(212, 175, 55, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              No agents found
            </Typography>
          </Paper>
        )}
      </Container>

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
        <DialogTitle sx={{ color: '#D4AF37' }}>Delete Agent?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#F0F2F5' }}>
            Are you sure you want to delete{' '}
            <strong>{agentToDelete?.name}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              color: '#F0F2F5',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            disabled={deleteMutation.isPending}
            sx={{
              bgcolor: '#f44336',
              color: 'white',
              '&:hover': {
                bgcolor: '#d32f2f',
              },
              '&:disabled': {
                bgcolor: 'rgba(244, 67, 54, 0.3)',
              },
            }}
          >
            {deleteMutation.isPending ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Delete'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminAgents;
