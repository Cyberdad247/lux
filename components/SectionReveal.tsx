'use client';

import { motion } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function SectionReveal({ children, delay = 0, className }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
