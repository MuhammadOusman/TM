import React from 'react';
import { Box, Container, Chip, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * HeroBanner - standardized hero section with background image + overlay.
 * Props: chip, title, subtitle, height (default 50/60vh), image, align ('center'|'left'), children (optional extra nodes).
 */
const HeroBanner = ({
  chip,
  title,
  subtitle,
  image,
  minHeight = '50vh',
  align = 'left',
  overlay = 'linear-gradient(135deg, rgba(26, 32, 39, 0.95) 0%, rgba(39, 52, 68, 0.8) 100%)',
  children,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight,
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
            bottom: 0,
          background: overlay,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {chip && (
            <Chip
              label={chip}
              sx={{
                bgcolor: 'rgba(212, 175, 55, 0.1)',
                color: 'primary.main',
                border: '1px solid',
                borderColor: 'primary.main',
                fontWeight: 600,
                mb: 3,
                fontSize: '0.9rem',
              }}
            />
          )}
          {title && (
            <Typography
              variant="h1"
              sx={{
                color: 'text.primary',
                fontWeight: 800,
                fontSize: { xs: '2.3rem', md: '3.8rem' },
                lineHeight: 1.15,
                mb: subtitle ? 3 : 0,
                maxWidth: '1000px',
                textAlign: { xs: 'left', md: align },
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                maxWidth: '780px',
                lineHeight: 1.7,
                fontSize: { xs: '1rem', md: '1.2rem' },
                textAlign: { xs: 'left', md: align },
              }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroBanner;
