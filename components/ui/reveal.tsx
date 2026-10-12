'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
export function Reveal({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? {} : {
    y: [12, 0],
    opacity: [.8, 1]
  }} viewport={{
    once: true,
    amount: .15
  }} transition={{
    duration: .55,
    ease: [.22, 1, .36, 1]
  }}>
  {children}
  </motion.div>;
}
