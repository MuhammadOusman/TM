import React, { useState, useEffect } from 'react';
import { Box, Fade } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const SplashScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide splash screen after 2.5 seconds
    const timer = setTimeout(() => {
      setShow(false);
      // Call onComplete after fade animation finishes
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1A2027 0%, #2c3e50 50%, #273444 100%)',
          }}
        >
          <Box
            sx={{
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Animated background glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />

            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Custom easing
              }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <Box
                component="img"
                src={logo}
                alt="Dar Al Barakah"
                sx={{
                  width: { xs: 350, sm: 500, md: 600 },
                  height: 'auto',
                  filter: 'drop-shadow(0 15px 40px rgba(212, 175, 55, 0.6))',
                }}
              />
            </motion.div>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
