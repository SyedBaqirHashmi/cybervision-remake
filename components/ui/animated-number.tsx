'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function AnimatedNumber({
  value,
  suffix = '',
  duration = 1.25,
  className
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) return;
    const animation = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: n => setDisplay(Math.round(n))
    });
    return () => animation.stop();
  }, [inView, reduced, value, duration]);

  return <span className={className}>
    <span aria-hidden="true" ref={ref} className="tabular-nums">
      {display.toLocaleString('en-US')}{suffix}
    </span>
    <span className="sr-only">{value.toLocaleString('en-US')}{suffix}</span>
  </span>;
}
