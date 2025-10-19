import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Chip, IconButton, Button, CircularProgress, Alert } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { agentsAPI } from '../services/api';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import SEO from '../components/SEO';
import HeroBanner from '../components/HeroBanner';
import { breadcrumbSchema } from '../seo/structuredData';

const Agents = () => {
  const { data: agentsData, isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: agentsAPI.getAll,
  });
  const agents = agentsData?.data || [];

  return (
    <Box>
      <SEO
        title="Our Team"
        description="Meet the experienced Dar Al Barakah Holiday Homes team: property consultants, investment advisors, and guest support specialists."
        structuredData={breadcrumbSchema([
          { name: 'Home', item: 'https://www.daralbarakah.com/' },
          { name: 'Our Team', item: 'https://www.daralbarakah.com/agents' },
        ])}
      />
      <HeroBanner
        chip="Our Team"
        title="Meet Our Expert Team"
        subtitle="Dedicated professionals committed to your real estate success"
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        minHeight="60vh"
      />

  {/* Agents Grid */}
      <Box sx={{ py: 12, bgcolor: '#1A2027' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Chip
                label="Expert Professionals"
                sx={{
                  bgcolor: 'rgba(165, 134, 84, 0.1)',
                  color: '#a58654',
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Your Trusted Partners
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  maxWidth: '700px',
                  mx: 'auto',
                }}
              >
                Experienced professionals ready to help you find your perfect property
              </Typography>
            </motion.div>
          </Box>

          {/* Loading and error states */}
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">Failed to load agents.</Alert>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {agents.map((agent, index) => (
                <Grid item xs={12} sm={8} md={6} lg={4} key={agent.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        minWidth: 380,
                        maxWidth: 440,
                        margin: '0 auto',
                        height: '100%',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          boxShadow: '0 16px 48px rgba(165, 134, 84, 0.2)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          height: 320,
                          backgroundImage: `url(${typeof agent.image_url === 'object' ? agent.image_url.url : agent.image_url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '50%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 20,
                            left: 20,
                            right: 20,
                            zIndex: 1,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Chip
                              icon={<StarIcon sx={{ fontSize: '1rem' }} />}
                              label={`${agent.rating || 5.0} (${agent.reviews_count || 0} reviews)`}
                              size="small"
                              sx={{
                                bgcolor: '#a58654',
                                color: 'white',
                                fontWeight: 600,
                              }}
                            />
                            <VerifiedIcon sx={{ color: '#6fa8a0', fontSize: '1.2rem' }} />
                          </Box>
                          <Typography
                            variant="h5"
                            sx={{
                              color: 'white',
                              fontWeight: 700,
                            }}
                          >
                            {agent.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#a58654',
                              fontWeight: 600,
                            }}
                          >
                            {agent.role}
                          </Typography>
                        </Box>
                      </Box>

                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Experience
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {agent.experience}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              Portfolio
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {agent.portfolio}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            mb: 2,
                            lineHeight: 1.7,
                            minHeight: 60,
                          }}
                        >
                          {agent.bio}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                          {(agent.specialties || []).map((specialty, idx) => (
                            <Chip
                              key={idx}
                              label={specialty}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(165, 134, 84, 0.1)',
                                color: '#a58654',
                                fontSize: '0.75rem',
                              }}
                            />
                          ))}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: 'rgba(165, 134, 84, 0.1)',
                              color: '#a58654',
                              '&:hover': {
                                bgcolor: '#a58654',
                                color: 'white',
                              },
                            }}
                          >
                            <PhoneIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: 'rgba(165, 134, 84, 0.1)',
                              color: '#a58654',
                              '&:hover': {
                                bgcolor: '#a58654',
                                color: 'white',
                              },
                            }}
                          >
                            <EmailIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: 'rgba(165, 134, 84, 0.1)',
                              color: '#a58654',
                              '&:hover': {
                                bgcolor: '#a58654',
                                color: 'white',
                              },
                            }}
                          >
                            <LinkedInIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            bgcolor: '#a58654',
                            '&:hover': {
                              bgcolor: '#8b6f47',
                            },
                          }}
                        >
                          Contact Agent
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                }}
              >
                Contact Our Team
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  mb: 5,
                  maxWidth: '700px',
                  mx: 'auto',
                }}
              >
                We're always ready to help you. Reach out to our team for any inquiries or collaboration.
              </Typography>
              <Button
                variant="contained"
                size="large"
                href="/contact"
                sx={{
                  bgcolor: '#a58654',
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: '#8b6f47',
                  },
                }}
              >
                Contact
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Agents;
