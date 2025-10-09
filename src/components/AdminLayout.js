import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ArticleIcon from '@mui/icons-material/Article';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';

const drawerWidth = 260;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Properties', icon: <HomeWorkIcon />, path: '/admin/properties' },
    { text: 'Blog', icon: <ArticleIcon />, path: '/admin/blog' },
    { text: 'Inquiries', icon: <MailIcon />, path: '/admin/inquiries' },
    { text: 'Agents', icon: <PeopleIcon />, path: '/admin/agents' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo/Brand */}
      <Box
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, #D4AF37 0%, #a58654 100%)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#1A2027',
            fontFamily: '"Space Grotesk", sans-serif',
          }}
        >
          Dar Al Barakah
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(26, 32, 39, 0.8)', fontWeight: 600 }}>
          Admin Panel
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.2)' }} />

      {/* User Info */}
      <Box sx={{ p: 2, bgcolor: 'rgba(212, 175, 55, 0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              bgcolor: '#D4AF37',
              color: '#1A2027',
              width: 40,
              height: 40,
              fontWeight: 700,
            }}
          >
            A
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Admin
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {user?.email || 'admin@darAlbarakah.com'}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.2)' }} />

      {/* Navigation Menu */}
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  bgcolor: isActive ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                  color: isActive ? '#D4AF37' : 'text.secondary',
                  '&:hover': {
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    color: '#D4AF37',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#D4AF37' : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.2)' }} />

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderColor: 'rgba(212, 175, 55, 0.3)',
            color: 'text.secondary',
            '&:hover': {
              borderColor: '#D4AF37',
              bgcolor: 'rgba(212, 175, 55, 0.1)',
              color: '#D4AF37',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#1A2027' }}>
      {/* AppBar for mobile */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: { xs: 'block', sm: 'none' },
          bgcolor: '#273444',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
            Dar Al Barakah Admin
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#273444',
              borderRight: '1px solid rgba(212, 175, 55, 0.2)',
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              bgcolor: '#273444',
              borderRight: '1px solid rgba(212, 175, 55, 0.2)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: '#1A2027',
        }}
      >
        <Toolbar sx={{ display: { xs: 'block', sm: 'none' } }} />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
