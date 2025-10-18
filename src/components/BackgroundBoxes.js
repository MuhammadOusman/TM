import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

export const BackgroundBeams = React.memo(() => {
  // Generate 50 unique curved beam paths
  const paths = React.useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const endX = Math.random() * 100;
      const endY = Math.random() * 100;
      const cx1 = Math.random() * 100;
      const cy1 = Math.random() * 100;
      const cx2 = Math.random() * 100;
      const cy2 = Math.random() * 100;
      const duration = 10 + Math.random() * 10; // 10-20 seconds

      return {
        id: i,
        d: `M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`,
        duration,
      };
    });
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {paths.map((path) => (
            <linearGradient
              key={`gradient-${path.id}`}
              id={`gradient-${path.id}`}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="50%" stopColor="#6344F5" stopOpacity="1" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={`url(#gradient-${path.id})`}
            strokeWidth="0.2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </Box>
  );
});

BackgroundBeams.displayName = 'BackgroundBeams';
