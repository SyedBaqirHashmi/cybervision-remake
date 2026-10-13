'use client';
import { useEffect, useRef, type ReactNode } from 'react';
type TiltElement = HTMLDivElement & { vanillaTilt?: { destroy: () => void } };
export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const root = useRef<TiltElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)');
    let visible = false;
    let disposed = false;
    let generation = 0;
    const update = async () => {
      const current = ++generation;
      element.vanillaTilt?.destroy();
      if (!visible || !preference.matches || document.hidden) return;
      try {
        const { default: VanillaTilt } = await import('vanilla-tilt');
        if (disposed || current !== generation) return;
        VanillaTilt.init(element, { max: 3, speed: 700, scale: 1, perspective: 1400, glare: false, gyroscope: false });
      } catch { /* Optional motion must never prevent access to the content. */ }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; void update(); }, { threshold: .05 });
    observer.observe(element);
    const refresh = () => { void update(); };
    preference.addEventListener('change', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      disposed = true; generation++;
      observer.disconnect();
      preference.removeEventListener('change', refresh);
      document.removeEventListener('visibilitychange', refresh);
      element.vanillaTilt?.destroy();
    };
  }, []);
  return <div ref={root} className={className}>{children}</div>;
}
