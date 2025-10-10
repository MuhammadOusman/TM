import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ArticleIcon from '@mui/icons-material/Article';
import MailIcon from '@mui/icons-material/Mail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { analyticsAPI } from '../../services/api';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dateRange] = useState(30); // Last 30 days

  // Fetch dashboard stats
  const { data: statsData } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: analyticsAPI.getDashboardStats,
  });
  const stats = statsData?.data || {
    totalProperties: 0,
    totalBlogPosts: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalViews: 0
  };

  // Fetch chart data
  const { data: chartDataResponse, isLoading: chartLoading } = useQuery({
    queryKey: ['chartData', dateRange],
    queryFn: () => analyticsAPI.getChartData(dateRange),
  });
  const chartData = chartDataResponse?.data || [];

  // Fetch top properties
  const { data: topPropertiesData, isLoading: propertiesLoading } = useQuery({
    queryKey: ['topProperties'],
    queryFn: analyticsAPI.getTopProperties,
  });
  const topProperties = topPropertiesData?.data || [];

  // Fetch top blog posts
  const { data: topBlogPostsData, isLoading: blogLoading } = useQuery({
    queryKey: ['topBlogPosts'],
    queryFn: analyticsAPI.getTopBlogPosts,
  });
  const topBlogPosts = topBlogPostsData?.data || [];

  const statCards = [
    {
      title: 'Total Properties',
      value: stats?.totalProperties || 0,
      icon: <HomeWorkIcon sx={{ fontSize: '2.5rem' }} />,
      color: '#3B82F6',
      change: '+12%',
    },
    {
      title: 'Blog Posts',
      value: stats?.totalBlogPosts || 0,
      icon: <ArticleIcon sx={{ fontSize: '2.5rem' }} />,
      color: '#10B981',
      change: '+8%',
    },
    {
      title: 'Inquiries',
      value: stats?.totalInquiries || 0,
      icon: <MailIcon sx={{ fontSize: '2.5rem' }} />,
      color: '#F59E0B',
      change: '+24%',
    },
    {
      title: 'Total Views',
      value: stats?.totalViews || 0,
      icon: <VisibilityIcon sx={{ fontSize: '2.5rem' }} />,
      color: '#8B5CF6',
      change: '+15%',
    },
  ];

  return (
    <AdminLayout>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
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
              Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Welcome back, admin!
            </Typography>
          </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: `${stat.color}20`,
                          color: stat.color,
                          mr: 2,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {stat.title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {stat.value.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon sx={{ fontSize: '1rem', color: '#10B981', mr: 0.5 }} />
                      <Typography variant="caption" sx={{ color: '#10B981' }}>
                        {stat.change} from last month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Traffic Over Time */}
          <Grid item xs={12} lg={8}>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                Traffic Overview
              </Typography>
              {chartLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(188, 204, 220, 0.1)" />
                    <XAxis
                      dataKey="date"
                      stroke="#BCCCDC"
                      tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                    />
                    <YAxis stroke="#BCCCDC" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#273444', border: '1px solid #D4AF37' }}
                      labelStyle={{ color: '#F0F2F5' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="propertyViews" stroke="#3B82F6" strokeWidth={2} name="Property Views" />
                    <Line type="monotone" dataKey="blogViews" stroke="#10B981" strokeWidth={2} name="Blog Views" />
                    <Line type="monotone" dataKey="inquiries" stroke="#F59E0B" strokeWidth={2} name="Inquiries" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>

          {/* Inquiries by Status */}
          <Grid item xs={12} lg={4}>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                Inquiry Status
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={[
                    { status: 'New', count: stats?.newInquiries || 0 },
                    { status: 'In Progress', count: stats?.inProgressInquiries || 0 },
                    { status: 'Responded', count: stats?.respondedInquiries || 0 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(188, 204, 220, 0.1)" />
                  <XAxis dataKey="status" stroke="#BCCCDC" />
                  <YAxis stroke="#BCCCDC" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#273444', border: '1px solid #D4AF37' }}
                  />
                  <Bar dataKey="count" fill="#D4AF37" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Tables */}
        <Grid container spacing={3}>
          {/* Top Properties */}
          <Grid item xs={12} lg={6}>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Top Properties
                </Typography>
                <Button
                  size="small"
                  onClick={() => navigate('/admin/properties')}
                  sx={{ color: 'primary.main' }}
                >
                  View All
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Title</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="right">
                        Views
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="right">
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {propertiesLoading ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <CircularProgress size={24} />
                        </TableCell>
                      </TableRow>
                    ) : (
                      topProperties?.map((property) => (
                        <TableRow key={property.id} hover>
                          <TableCell sx={{ color: 'text.primary' }}>{property.title}</TableCell>
                          <TableCell sx={{ color: 'text.primary' }} align="right">
                            {property.views?.toLocaleString() || 0}
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={property.status}
                              size="small"
                              color={property.status === 'available' ? 'success' : 'default'}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Top Blog Posts */}
          <Grid item xs={12} lg={6}>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #273444 0%, #1A2027 100%)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Top Blog Posts
                </Typography>
                <Button size="small" onClick={() => navigate('/admin/blog')} sx={{ color: 'primary.main' }}>
                  View All
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Title</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="right">
                        Views
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }} align="right">
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blogLoading ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <CircularProgress size={24} />
                        </TableCell>
                      </TableRow>
                    ) : (
                      topBlogPosts?.map((post) => (
                        <TableRow key={post.id} hover>
                          <TableCell sx={{ color: 'text.primary' }}>{post.title}</TableCell>
                          <TableCell sx={{ color: 'text.primary' }} align="right">
                            {post.views?.toLocaleString() || 0}
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={post.status}
                              size="small"
                              color={post.status === 'published' ? 'success' : 'default'}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
        </Container>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
