import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = 'Loading...', fullScreen = false }) => {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        ...(fullScreen && {
          minHeight: '60vh',
        }),
        py: fullScreen ? 0 : 8,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: '#D4AF37',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>
      </motion.div>
    </Box>
  );

  return content;
};

export default LoadingSpinner;
