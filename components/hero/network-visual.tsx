'use client';
import { useEffect, useRef, useState } from 'react';
import { Tilt } from '../ui/tilt';
export function NetworkVisual() {
  const root = useRef<HTMLDivElement>(null);
  const [draw, setDraw] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setDraw(true); observer.disconnect(); }
    }, { threshold: .2 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={root} className="relative mx-auto w-full max-w-[620px] py-10" aria-hidden="true">
    <Tilt className={`architecture-panel ${draw ? 'is-visible' : ''}`}>
      <div className="mb-8 flex justify-between font-mono text-[9px] uppercase tracking-[.2em] text-slate-400"><span>Systems / Designed to connect</span><span>CV.01</span></div>
      <svg viewBox="0 0 520 460" fill="none" className="w-full">
        <g stroke="#413d38" strokeWidth=".7">{Array.from({length:9},(_,i)=><path key={i} d={`M${20+i*60} 40V420 M20 ${40+i*45}H500`} />)}</g>
        <g stroke="#dfc596" strokeWidth="1.4" strokeLinejoin="round" className="architecture-lines">
          {[0,1,2].map(i=><path key={i} pathLength="1" d={`M90 ${190+i*52} 260 ${92+i*52} 430 ${190+i*52} 260 ${288+i*52}Z`} />)}
          <path pathLength="1" d="M90 190v104l170 98 170-98V190M260 92v300M175 141v208M345 141v208M90 242l170-98 170 98M175 245l85-49 85 49-85 49Z" />
        </g>
        <g fill="#c39b79">{[[90,190],[260,92],[430,190],[260,288],[175,245],[345,245],[260,392]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="4" />)}</g>
        <g fill="#b4aea5" fontFamily="monospace" fontSize="9" letterSpacing="2"><text x="22" y="150">STRATEGY</text><text x="351" y="340">ENGINEERING</text><text x="220" y="438">HUMAN IMPACT</text></g>
      </svg>
      <div className="flex justify-between gap-4 border-t border-slate-700 pt-5 text-xs text-slate-300"><span>Every connection has a purpose.</span><span className="text-champagne-200">Since 2004 ↗</span></div>
    </Tilt>
  </div>;
}
