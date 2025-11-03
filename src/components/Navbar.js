import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo_cutout.png';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Agents', path: '/agents' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
        height: '100%',
        color: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="img"
            src={logo}
            alt="DAB Group Logo"
            sx={{
              height: 45,
              width: 'auto',
              objectFit: 'contain',
            }}
          />
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#D4AF37',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: 2,
              }}
            >
              DAB <Box component="span" sx={{ fontWeight: 300, ml: 0.5 }}>GROUP</Box>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 300,
                letterSpacing: 2,
                fontSize: '0.55rem',
                display: 'block',
                mt: 0.3,
              }}
            >
              WHERE LUXURY MEETS LEGACY
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.name}
            component={Link}
            to={item.path}
            sx={{
              textAlign: 'center',
              py: 2,
              '&:hover': {
                backgroundColor: 'rgba(165, 134, 84, 0.1)',
              },
            }}
          >
            <ListItemText
              primary={item.name}
              sx={{
                color: location.pathname === item.path ? '#a58654' : 'white',
                '& .MuiListItemText-primary': {
                  fontWeight: location.pathname === item.path ? 600 : 400,
                },
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 3 }}>
        <Button
          component={Link}
          to="/contact"
          variant="contained"
          fullWidth
          startIcon={<PhoneIcon />}
          sx={{
            bgcolor: '#a58654',
            '&:hover': {
              bgcolor: '#8b6f47',
            },
            py: 1.5,
            borderRadius: 2,
          }}
        >
          Contact Us
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: scrolled ? 'rgba(44, 62, 80, 0.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            transition: 'all 0.3s ease-in-out',
            borderBottom: scrolled ? '1px solid rgba(165, 134, 84, 0.2)' : 'none',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                justifyContent: 'space-between',
                py: 1,
              }}
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  component={Link}
                  to="/"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    gap: 1.5,
                  }}
                >
                  <Box
                    component="img"
                    src={logo}
                    alt="DAB Group Logo"
                    sx={{
                      height: 50,
                      width: 50,
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
                    }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        letterSpacing: 4,
                        fontSize: '1.25rem',
                      }}
                    >
                      DAB <Box component="span" sx={{ fontWeight: 300, letterSpacing: 4 }}>GROUP</Box>
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.75)',
                        fontWeight: 300,
                        letterSpacing: 2,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                        fontSize: '0.55rem',
                        mt: 0.2,
                      }}
                    >
                      WHERE LUXURY MEETS LEGACY
                    </Typography>
                  </Box>
                </Box>
              </motion.div>

              {/* Desktop Menu */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Button
                      component={Link}
                      to={item.path}
                      sx={{
                        color: 'white',
                        fontWeight: location.pathname === item.path ? 600 : 400,
                        position: 'relative',
                        px: 2,
                        textShadow: scrolled ? 'none' : '1px 1px 2px rgba(0,0,0,0.3)',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: location.pathname === item.path ? '80%' : '0%',
                          height: '2px',
                          backgroundColor: '#a58654',
                          transition: 'width 0.3s ease',
                        },
                        '&:hover::after': {
                          width: '80%',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(165, 134, 84, 0.1)',
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  </motion.div>
                ))}
              </Box>

              {/* CTA Button */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    startIcon={<PhoneIcon />}
                    sx={{
                      bgcolor: '#a58654',
                      color: 'white',
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      boxShadow: '0 4px 15px rgba(165, 134, 84, 0.3)',
                      '&:hover': {
                        bgcolor: '#8b6f47',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(165, 134, 84, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Contact Us
                  </Button>
                </motion.div>
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;
