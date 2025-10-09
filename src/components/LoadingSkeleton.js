import React from 'react';
import { Box, Card, CardContent, Skeleton, Grid, Container } from '@mui/material';

// Property Card Skeleton
export const PropertyCardSkeleton = () => (
  <Card
    sx={{
      borderRadius: 3,
      overflow: 'hidden',
      bgcolor: 'background.paper',
    }}
  >
    <Skeleton variant="rectangular" height={250} animation="wave" />
    <CardContent>
      <Skeleton variant="text" width="80%" height={32} animation="wave" />
      <Skeleton variant="text" width="60%" height={24} sx={{ mt: 1 }} animation="wave" />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Skeleton variant="rectangular" width={80} height={24} animation="wave" />
        <Skeleton variant="rectangular" width={80} height={24} animation="wave" />
        <Skeleton variant="rectangular" width={80} height={24} animation="wave" />
      </Box>
      <Skeleton variant="text" width="40%" height={36} sx={{ mt: 2 }} animation="wave" />
    </CardContent>
  </Card>
);

// Blog Card Skeleton
export const BlogCardSkeleton = () => (
  <Card
    sx={{
      borderRadius: 3,
      overflow: 'hidden',
      bgcolor: 'background.paper',
    }}
  >
    <Skeleton variant="rectangular" height={280} animation="wave" />
    <CardContent>
      <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 2, mb: 2 }} animation="wave" />
      <Skeleton variant="text" width="90%" height={32} animation="wave" />
      <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} animation="wave" />
      <Skeleton variant="text" width="100%" height={20} animation="wave" />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Skeleton variant="circular" width={32} height={32} animation="wave" />
        <Skeleton variant="text" width={120} height={24} animation="wave" />
      </Box>
    </CardContent>
  </Card>
);

// Properties Page Skeleton
export const PropertiesPageSkeleton = () => (
  <Container maxWidth="xl" sx={{ py: 8 }}>
    <Grid container spacing={4}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} sm={6} lg={4} key={item}>
          <PropertyCardSkeleton />
        </Grid>
      ))}
    </Grid>
  </Container>
);

// Blog Page Skeleton
export const BlogPageSkeleton = () => (
  <Container maxWidth="xl" sx={{ py: 8 }}>
    <Grid container spacing={4}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} md={6} lg={4} key={item}>
          <BlogCardSkeleton />
        </Grid>
      ))}
    </Grid>
  </Container>
);

// Property Detail Skeleton
export const PropertyDetailSkeleton = () => (
  <Container maxWidth="xl" sx={{ py: 8 }}>
    <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 4, mb: 4 }} animation="wave" />
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Skeleton variant="text" width="70%" height={48} animation="wave" />
        <Skeleton variant="text" width="40%" height={32} sx={{ mt: 2 }} animation="wave" />
        <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
          <Skeleton variant="rectangular" width={120} height={80} sx={{ borderRadius: 2 }} animation="wave" />
          <Skeleton variant="rectangular" width={120} height={80} sx={{ borderRadius: 2 }} animation="wave" />
          <Skeleton variant="rectangular" width={120} height={80} sx={{ borderRadius: 2 }} animation="wave" />
        </Box>
        <Skeleton variant="text" width="100%" height={24} sx={{ mt: 4 }} animation="wave" />
        <Skeleton variant="text" width="100%" height={24} animation="wave" />
        <Skeleton variant="text" width="80%" height={24} animation="wave" />
      </Grid>
      <Grid item xs={12} md={4}>
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} animation="wave" />
      </Grid>
    </Grid>
  </Container>
);

export default {
  PropertyCardSkeleton,
  BlogCardSkeleton,
  PropertiesPageSkeleton,
  BlogPageSkeleton,
  PropertyDetailSkeleton,
};
