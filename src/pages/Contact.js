import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Card, Paper, MenuItem, Alert, Snackbar, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SEO from '../components/SEO';
import HeroBanner from '../components/HeroBanner';
import { breadcrumbSchema } from '../seo/structuredData';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{7,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form',
        severity: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      // Prepare email template parameters
      const emailParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        from_phone: formData.phone.trim() || 'Not provided',
        subject: formData.subject,
        message: formData.message.trim(),
        to_email: 'info@dabgroup.ae', // Your business email
      };

      // Submit to Supabase (Database)
      const { data: dbData, error: dbError } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || null,
            subject: formData.subject,
            message: formData.message.trim(),
            status: 'new',
          }
        ])
        .select();

      if (dbError) {
        console.error('Supabase error:', dbError);
        throw new Error(`Database Error: ${dbError.message}`);
      }

      console.log('Database submission successful:', dbData);

      // Send Email via EmailJS
      const emailjsServiceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_demo';
      const emailjsTemplateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_demo';
      const emailjsPublicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'demo_key';

      try {
        const emailResult = await emailjs.send(
          emailjsServiceId,
          emailjsTemplateId,
          emailParams,
          emailjsPublicKey
        );

        console.log('Email sent successfully:', emailResult);

        // Success - Both database and email successful
        setSnackbar({
          open: true,
          message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
          severity: 'success',
        });

      } catch (emailError) {
        console.error('EmailJS error:', emailError);

        // Database successful but email failed
        setSnackbar({
          open: true,
          message: 'Message saved successfully! We\'ll contact you soon (email notification failed).',
          severity: 'warning',
        });
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      });

    } catch (error) {
      console.error('Error submitting form:', error);

      // Check if it's a database error or email error
      if (error.message.includes('Database Error')) {
        setSnackbar({
          open: true,
          message: 'Failed to save message to database. Please try again or contact us directly.',
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to send message. Please try again or contact us directly.',
          severity: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneCall = () => {
    const phoneNumber = '+971557696095';
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleWhatsApp = () => {
    const phoneNumber = '+971557696095';
    const message = encodeURIComponent('Hello! I would like to inquire about your services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      details: ['+971 55 769 6095'],
      color: '#a58654',
    },
    {
      icon: <EmailIcon />,
      title: 'Email',
      details: ['info@dabgroup.ae'],
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
                          error={!!errors.name}
                          helperText={errors.name}
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
                          error={!!errors.email}
                          helperText={errors.email}
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
                          error={!!errors.phone}
                          helperText={errors.phone}
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
                          endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                          disabled={loading}
                          sx={{
                            bgcolor: loading ? '#ccc' : '#a58654',
                            py: 1.5,
                            fontSize: '1.1rem',
                            '&:hover': {
                              bgcolor: loading ? '#ccc' : '#8b6f47',
                            },
                          }}
                        >
                          {loading ? 'Sending...' : 'Send Message'}
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
                          onClick={handlePhoneCall}
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
                          onClick={handleWhatsApp}
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

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
