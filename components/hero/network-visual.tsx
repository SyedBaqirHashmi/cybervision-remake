'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { VisualBoundary } from '../ui/error-boundary';
const NeuralScene = dynamic(() => import('./neural-scene'), {
  ssr: false,
  loading: () => <Fallback />
});
function Fallback() {
  return <Image src="/images/neural-network.svg" alt="" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-contain" priority />;
}
export function NetworkVisual() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: .05
    });
    if (root.current) observer.observe(root.current);
    const visibility = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  useEffect(() => {
    if (reduced || !visible) return;
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
      };
    }).connection;
    if (connection?.saveData) return;
    const timer = window.setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2');
        if (gl) {
          gl.getExtension('WEBGL_lose_context')?.loseContext();
          setEnabled(true);
        }
      } catch {
        setEnabled(false);
      }
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [reduced, visible]);
  return <div ref={root} className="relative mx-auto aspect-square w-full max-w-[620px]">
  <div className="absolute inset-[15%] rounded-full bg-indigo-600/15 blur-[70px]" aria-hidden="true" />
  <div className="absolute inset-0" aria-hidden="true">
    <VisualBoundary fallback={<Fallback />}>
      {enabled && !reduced ? <NeuralScene active={visible && documentVisible && !paused} /> : <Fallback />}
    </VisualBoundary>
  </div>
  <div className="glass absolute left-0 top-[17%] max-w-[205px] rounded-xl p-3 sm:left-4 sm:p-4">
    <div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-slate-300"><span className="size-1.5 rounded-full bg-cyan-300" /> Connected intelligence</div>
    <div className="flex items-center gap-3 text-xs">
      <span className="text-xl text-cyan-200">⌘</span>
      <span>From complexity<br /><strong className="font-medium text-cyan-100">to possibility.</strong></span>
    </div>
  </div>
  <div className="glass absolute bottom-[13%] right-0 rounded-xl p-4 sm:right-2">
    <p className="mb-3 font-mono text-[9px] uppercase tracking-wider text-slate-400">Human ambition × technology</p>
    <div className="flex items-center gap-2">
      <span className="rounded-md border border-indigo-400/30 bg-indigo-400/10 px-2 py-1 text-[10px] text-indigo-200">IMAGINE</span>
      <span className="text-slate-400">→</span>
      <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-[10px] text-cyan-200">ENGINEER</span>
    </div>
  </div>
  {enabled && !reduced && <button className="absolute bottom-0 right-0 flex min-h-11 items-center gap-2 rounded-full border border-slate-700 bg-slate-950/90 px-3 text-[10px] text-slate-300" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play neural network animation' : 'Pause neural network animation'}>
    {paused ? <Play size={12} /> : <Pause size={12} />}
    {paused ? 'Play motion' : 'Pause motion'}
  </button>}
  </div>;
}
