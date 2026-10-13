'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, DrawSVGPlugin } from '@/lib/gsap';

/**
 * Abstract systems-architecture line art: a small network of nodes and
 * connecting paths that draws itself in as it scrolls into view, echoing
 * CyberVision's "connected systems" positioning (IoT, automation, data).
 */
export function ArchitectureDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll<SVGPathElement>('.draw-path');
    const nodes = svgRef.current.querySelectorAll<SVGCircleElement>('.draw-node');

    gsap.set(nodes, { scale: 0, transformOrigin: '50% 50%' });
    gsap.set(paths, { drawSVG: '0%' });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top 80%',
        once: true
      }
    });

    timeline
      .to(paths, { drawSVG: '100%', duration: 1.4, ease: 'power2.inOut', stagger: 0.12 })
      .to(nodes, { scale: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.08 }, '-=0.9');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: svgRef });

  return <svg
    ref={svgRef}
    viewBox="0 0 400 260"
    fill="none"
    className="h-auto w-full max-w-md text-gold-300"
    aria-hidden="true"
  >
    <path className="draw-path" d="M40 200 L40 120 L120 80" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.7" />
    <path className="draw-path" d="M120 80 L220 50 L320 90" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.7" />
    <path className="draw-path" d="M220 50 L220 130 L140 170" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.7" />
    <path className="draw-path" d="M320 90 L320 180 L240 220" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.7" />
    <path className="draw-path" d="M140 170 L240 220 L40 200" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.4" />

    <circle className="draw-node" cx="40" cy="200" r="5" fill="currentColor" />
    <circle className="draw-node" cx="120" cy="80" r="5" fill="currentColor" />
    <circle className="draw-node" cx="220" cy="50" r="5" fill="currentColor" />
    <circle className="draw-node" cx="320" cy="90" r="5" fill="currentColor" />
    <circle className="draw-node text-bronze-300" cx="220" cy="130" r="4" fill="currentColor" />
    <circle className="draw-node" cx="140" cy="170" r="5" fill="currentColor" />
    <circle className="draw-node text-bronze-300" cx="320" cy="180" r="4" fill="currentColor" />
    <circle className="draw-node" cx="240" cy="220" r="5" fill="currentColor" />
  </svg>;
}
