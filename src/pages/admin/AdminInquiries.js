import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  MenuItem,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { inquiriesAPI } from '../../services/api';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import AdminLayout from '../../components/AdminLayout';

const AdminInquiries = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Fetch inquiries
  const { data: inquiriesData, isLoading, error } = useQuery({
    queryKey: ['adminInquiries'],
    queryFn: inquiriesAPI.getAll,
  });
  const inquiries = inquiriesData?.data || [];

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, notes }) => inquiriesAPI.updateStatus(id, status, notes),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminInquiries']);
      setDetailsDialogOpen(false);
    },
  });

  // Filter inquiries
  const filteredInquiries = inquiries?.filter((inquiry) => {
    return statusFilter === 'all' || inquiry.status === statusFilter;
  }) || [];

  // Paginated inquiries
  const paginatedInquiries = filteredInquiries.slice(
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

  const handleViewDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setDetailsDialogOpen(true);
  };

  const handleStatusChange = (status) => {
    if (selectedInquiry) {
      updateStatusMutation.mutate({
        id: selectedInquiry.id,
        status,
        notes: selectedInquiry.admin_notes || '',
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'responded':
        return 'success';
      default:
        return 'default';
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
                Inquiries
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Manage customer inquiries and requests
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Status Filters */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
            border: '1px solid rgba(212, 175, 55, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={`All (${inquiries?.length || 0})`}
              onClick={() => setStatusFilter('all')}
              color={statusFilter === 'all' ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label={`New (${inquiries?.filter((i) => i.status === 'new').length || 0})`}
              onClick={() => setStatusFilter('new')}
              color={statusFilter === 'new' ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label={`In Progress (${inquiries?.filter((i) => i.status === 'in_progress').length || 0})`}
              onClick={() => setStatusFilter('in_progress')}
              color={statusFilter === 'in_progress' ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label={`Responded (${inquiries?.filter((i) => i.status === 'responded').length || 0})`}
              onClick={() => setStatusFilter('responded')}
              color={statusFilter === 'responded' ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        </Paper>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Failed to load inquiries. Please try again.
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
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Phone</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Subject</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="center">
                      Status
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedInquiries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                        No inquiries found
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedInquiries.map((inquiry) => (
                      <TableRow key={inquiry.id} hover>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 500 }}>
                          {inquiry.name}
                        </TableCell>
                        <TableCell sx={{ color: 'text.primary' }}>{inquiry.email}</TableCell>
                        <TableCell sx={{ color: 'text.primary' }}>{inquiry.phone || 'N/A'}</TableCell>
                        <TableCell sx={{ color: 'text.primary' }}>{inquiry.subject}</TableCell>
                        <TableCell sx={{ color: 'text.primary' }}>
                          {format(new Date(inquiry.created_at), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={inquiry.status.replace('_', ' ')}
                            size="small"
                            color={getStatusColor(inquiry.status)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(inquiry)}
                            sx={{ color: 'primary.main' }}
                          >
                            <VisibilityIcon />
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
              count={filteredInquiries.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ color: 'text.secondary', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}
            />
          </Paper>
        </motion.div>

        {/* Inquiry Details Dialog */}
        <Dialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: '#273444',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            },
          }}
        >
          <DialogTitle sx={{ color: 'text.primary', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
            Inquiry Details
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            {selectedInquiry && (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Name
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                      {selectedInquiry.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                      {selectedInquiry.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Phone
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                      {selectedInquiry.phone || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Date
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                      {format(new Date(selectedInquiry.created_at), 'MMM dd, yyyy - hh:mm a')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Subject
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                      {selectedInquiry.subject}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Message
                    </Typography>
                    <Paper sx={{ p: 2, bgcolor: '#1A2027', mt: 1 }}>
                      <Typography variant="body2" sx={{ color: 'text.primary', whiteSpace: 'pre-wrap' }}>
                        {selectedInquiry.message}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      select
                      label="Status"
                      value={selectedInquiry.status}
                      onChange={(e) =>
                        setSelectedInquiry({ ...selectedInquiry, status: e.target.value })
                      }
                    >
                      <MenuItem value="new">New</MenuItem>
                      <MenuItem value="in_progress">In Progress</MenuItem>
                      <MenuItem value="responded">Responded</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ borderTop: '1px solid rgba(212, 175, 55, 0.1)', p: 2 }}>
            <Button onClick={() => setDetailsDialogOpen(false)} sx={{ color: 'text.secondary' }}>
              Close
            </Button>
            <Button
              onClick={() => handleStatusChange(selectedInquiry?.status)}
              variant="contained"
              disabled={updateStatusMutation.isPending}
              sx={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #E0C66F 100%)',
                color: '#1A2027',
                fontWeight: 600,
              }}
            >
              {updateStatusMutation.isPending ? <CircularProgress size={24} /> : 'Update Status'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminInquiries;
