export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const staggerContainer = (stagger = 0.1) => ({
  animate: { transition: { staggerChildren: stagger } },
});

export const scaleWhileHover = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
};
