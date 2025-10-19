import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Card, Paper, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SEO from '../components/SEO';
import HeroBanner from '../components/HeroBanner';
import { breadcrumbSchema } from '../seo/structuredData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      details: ['+971 XX XXX XXXX', '+971 XX XXX XXXX'],
      color: '#a58654',
    },
    {
      icon: <EmailIcon />,
      title: 'Email',
      details: ['info@daralbarakah.com', 'support@daralbarakah.com'],
      color: '#6fa8a0',
    },
    {
      icon: <LocationOnIcon />,
      title: 'Office Address',
      details: ['Dubai, United Arab Emirates', 'Visit by appointment'],
      color: '#2c3e50',
    },
    {
      icon: <AccessTimeIcon />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat - Sun: 10:00 AM - 4:00 PM'],
      color: '#5a8a84',
    },
  ];

  const subjects = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking', label: 'Booking Question' },
    { value: 'property', label: 'Property Management' },
    { value: 'investment', label: 'Investment Opportunity' },
    { value: 'support', label: 'Technical Support' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <Box>
      <SEO
        title="Contact Us"
        description="Get in touch with Dar Al Barakah Holiday Homes for bookings, property management, and investment inquiries in Dubai."
        structuredData={breadcrumbSchema([
          { name: 'Home', item: 'https://www.daralbarakah.com/' },
          { name: 'Contact', item: 'https://www.daralbarakah.com/contact' },
        ])}
      />
      <HeroBanner
        chip="Get In Touch"
        title="Let's Start a Conversation"
        subtitle="We're here to help you find your perfect property or answer any questions"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
        minHeight="50vh"
      />

      {/* Contact Info Cards */}
      <Box sx={{ py: 8, bgcolor: 'white', mt: -8, position: 'relative', zIndex: 10 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      p: 3,
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: `0 12px 40px ${info.color}30`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        bgcolor: `${info.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        color: info.color,
                        '& svg': {
                          fontSize: '2rem',
                        },
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 2,
                      }}
                    >
                      {info.title}
                    </Typography>
                    {info.details.map((detail, idx) => (
                      <Typography
                        key={idx}
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 0.5,
                        }}
                      >
                        {detail}
                      </Typography>
                    ))}
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Form & Map */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    borderRadius: 4,
                    border: '2px solid',
                    borderColor: 'rgba(165, 134, 84, 0.2)',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 2,
                    }}
                  >
                    Send Us a Message
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      mb: 4,
                    }}
                  >
                    Fill out the form below and we'll get back to you within 24 hours
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: '#a58654',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#a58654',
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#a58654',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: '#a58654',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#a58654',
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#a58654',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: '#a58654',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#a58654',
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#a58654',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          select
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: '#a58654',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#a58654',
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#a58654',
                            },
                          }}
                        >
                          {subjects.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={6}
                          label="Your Message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                borderColor: '#a58654',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#a58654',
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#a58654',
                            },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          endIcon={<SendIcon />}
                          sx={{
                            bgcolor: '#a58654',
                            py: 1.5,
                            fontSize: '1.1rem',
                            '&:hover': {
                              bgcolor: '#8b6f47',
                            },
                          }}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Additional Info */}
            <Grid item xs={12} lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Map Placeholder */}
                <Paper
                  sx={{
                    height: 400,
                    borderRadius: 4,
                    overflow: 'hidden',
                    mb: 4,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(44, 62, 80, 0.7)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textAlign: 'center',
                        p: 4,
                      }}
                    >
                      <Box>
                        <LocationOnIcon sx={{ fontSize: '4rem', mb: 2, color: '#a58654' }} />
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          Visit Our Office
                        </Typography>
                        <Typography variant="body1">
                          Dubai, United Arab Emirates
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>

                {/* Quick Contact Cards */}
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        bgcolor: 'primary.main',
                        color: 'white',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        Need Immediate Assistance?
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                        Our team is available 24/7 for urgent inquiries
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<PhoneIcon />}
                          sx={{
                            bgcolor: '#a58654',
                            '&:hover': {
                              bgcolor: '#8b6f47',
                            },
                          }}
                        >
                          Call Now
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<WhatsAppIcon />}
                          sx={{
                            borderColor: 'white',
                            color: 'white',
                            '&:hover': {
                              borderColor: '#a58654',
                              bgcolor: 'rgba(165, 134, 84, 0.2)',
                            },
                          }}
                        >
                          WhatsApp
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #6fa8a0 0%, #5a8a84 100%)',
                        color: 'white',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        Schedule a Meeting
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 3, opacity: 0.95 }}>
                        Book a consultation with our property experts
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: 'white',
                          color: '#6fa8a0',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.9)',
                          },
                        }}
                      >
                        Book Appointment
                      </Button>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;
