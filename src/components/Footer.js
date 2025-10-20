import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import { motion } from 'framer-motion';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Properties', path: '/properties' },
    { name: 'Services', path: '/services' },
  ];

  const services = [
    { name: 'Property Management', path: '/services' },
    { name: 'Vacation Rentals', path: '/services' },
    { name: 'Property Sales', path: '/services' },
    { name: 'Consultation', path: '/services' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)',
        color: 'white',
        pt: 8,
        pb: 3,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #a58654 0%, #6fa8a0 50%, #a58654 100%)',
        },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: 'Playfair Display',
                    fontWeight: 700,
                    color: '#a58654',
                    mb: 1,
                  }}
                >
                  DAR ALBARAKAH
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#6fa8a0',
                    fontWeight: 500,
                    letterSpacing: 1,
                    mb: 2,
                  }}
                >
                  Holiday Home LLC
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.8,
                    mb: 3,
                  }}
                >
                  Your trusted partner in finding the perfect holiday home. We specialize in
                  premium properties that create unforgettable vacation experiences.
                </Typography>

                {/* Social Media */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[
                    { icon: <FacebookIcon />, link: '#' },
                    { icon: <InstagramIcon />, link: '#' },
                    { icon: <TwitterIcon />, link: '#' },
                    { icon: <LinkedInIcon />, link: '#' },
                  ].map((social, index) => (
                    <IconButton
                      key={index}
                      component="a"
                      href={social.link}
                      target="_blank"
                      sx={{
                        bgcolor: 'rgba(165, 134, 84, 0.1)',
                        color: '#a58654',
                        border: '1px solid rgba(165, 134, 84, 0.3)',
                        '&:hover': {
                          bgcolor: '#a58654',
                          color: 'white',
                          transform: 'translateY(-3px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: '#a58654',
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {quickLinks.map((link) => (
                  <MuiLink
                    key={link.name}
                    component={Link}
                    to={link.path}
                    underline="none"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#a58654',
                        transform: 'translateX(5px)',
                      },
                      display: 'inline-block',
                    }}
                  >
                    {link.name}
                  </MuiLink>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: '#a58654',
                }}
              >
                Our Services
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {services.map((service) => (
                  <MuiLink
                    key={service.name}
                    component={Link}
                    to={service.path}
                    underline="none"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#a58654',
                        transform: 'translateX(5px)',
                      },
                      display: 'inline-block',
                    }}
                  >
                    {service.name}
                  </MuiLink>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact & Newsletter */}
          <Grid item xs={12} md={3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: '#a58654',
                }}
              >
                Contact Info
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <PhoneIcon sx={{ color: '#6fa8a0', mt: 0.5 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    +971 55 769 6095
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <EmailIcon sx={{ color: '#6fa8a0', mt: 0.5 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    info@dabgroup.ae
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <LocationOnIcon sx={{ color: '#6fa8a0', mt: 0.5 }} />
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Dubai, United Arab Emirates
                  </Typography>
                </Box>
              </Box>

              {/* Newsletter */}
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: '#a58654',
                }}
              >
                Newsletter
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Your email"
                  variant="outlined"
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: '#a58654',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#a58654',
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: 'rgba(255,255,255,0.5)',
                    },
                  }}
                />
                <IconButton
                  sx={{
                    bgcolor: '#a58654',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#8b6f47',
                    },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.5)',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            © {new Date().getFullYear()} Dar-al-Barakah Holiday Homes LLC. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <MuiLink
              href="#"
              underline="none"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#a58654',
                },
              }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              href="#"
              underline="none"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#a58654',
                },
              }}
            >
              Terms of Service
            </MuiLink>
            <MuiLink
              href="#"
              underline="none"
              sx={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.875rem',
                '&:hover': {
                  color: '#a58654',
                },
              }}
            >
              Cookie Policy
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
