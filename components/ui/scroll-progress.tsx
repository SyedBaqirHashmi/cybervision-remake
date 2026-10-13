'use client';

import { motion, useReducedMotion, useScroll } from 'framer-motion';

/** Adapted from Skiper UI's skiper19 technique (a stroke whose length follows
 * scroll progress) — applied here as a genuine reading-progress indicator
 * rather than its original decorative demo artwork. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  if (reduced) return null;
  return <motion.div
    aria-hidden="true"
    className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-gold-400 to-bronze-400"
    style={{ scaleX: scrollYProgress }}
  />;
}
