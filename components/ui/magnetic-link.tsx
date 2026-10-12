'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import type { ReactNode, PointerEvent } from 'react';
export function MagneticLink({
  href,
  children,
  className = 'btn-primary'
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, {
    stiffness: 180,
    damping: 20
  });
  const sy = useSpring(y, {
    stiffness: 180,
    damping: 20
  });
  const reduced = useReducedMotion();
  function move(e: PointerEvent<HTMLAnchorElement>) {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * .08);
    y.set((e.clientY - r.top - r.height / 2) * .08);
  }
  return <motion.a href={href} className={className} style={{
    x: sx,
    y: sy
  }} onPointerMove={move} onPointerLeave={() => {
    x.set(0);
    y.set(0);
  }}>
  {children}
  </motion.a>;
}
