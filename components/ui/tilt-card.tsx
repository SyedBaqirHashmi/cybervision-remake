'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { TiltOptions } from 'vanilla-tilt';

const DEFAULT_OPTIONS: TiltOptions = {
  max: 8,
  speed: 400,
  glare: true,
  'max-glare': 0.15,
  scale: 1.02,
  gyroscope: false
};

export function TiltCard({
  children,
  className,
  options
}: {
  children: ReactNode;
  className?: string;
  options?: TiltOptions;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let instance: import('vanilla-tilt').default | undefined;
    import('vanilla-tilt').then(({ default: VanillaTilt }) => {
      if (!ref.current) return;
      VanillaTilt.init(ref.current, { ...DEFAULT_OPTIONS, ...options });
      instance = (ref.current as unknown as { vanillaTilt: import('vanilla-tilt').default }).vanillaTilt;
    });
    return () => instance?.destroy();
  }, [options]);

  return <div ref={ref} className={className}>
    {children}
  </div>;
}
