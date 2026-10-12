import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { NetworkVisual } from './network-visual';
import { InnovationReel } from './innovation-reel';
import { MagneticLink } from '../ui/magnetic-link';
import { Reveal } from '../ui/reveal';
export function Hero() {
  return <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-slate-800 pt-28 sm:pt-36">
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgba(67,56,202,.12),transparent_60%)]" />
  <div className="shell relative">
    <div className="grid items-center gap-2 lg:grid-cols-[1.12fr_1fr] lg:gap-6">
      <Reveal className="relative z-10 py-8 lg:py-14">
        <div className="mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-[9px] font-medium tracking-wide text-cyan-100 sm:px-4 sm:text-[11px]"><Sparkles size={13} className="shrink-0" aria-hidden="true" /> Next-Gen AI & Digital Transformation Partner</div>
        <h1 id="hero-title" className="text-display font-semibold">Architecting<br />the <span className="gradient-text">Intelligent</span><br />Enterprise<span className="text-cyan-200">.</span></h1>
        <p className="mt-7 max-w-[440px] text-sm leading-7 text-slate-400 sm:text-base">Delivering bespoke software engineering, enterprise automation, IoT systems, and world-class digital training.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <MagneticLink href="#services">Explore solutions <ArrowUpRight size={16} aria-hidden="true" /></MagneticLink>
          <InnovationReel />
        </div>
        <div className="mt-9 flex items-center gap-3 text-xs text-slate-400"><span className="h-px w-7 bg-slate-600" /> Built in Pakistan. Engineering for the world.</div>
      </Reveal>
      <NetworkVisual />
    </div>
    <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-slate-800 py-6 font-mono text-[9px] uppercase tracking-[.14em] text-slate-400">
      <span>Strategy → Engineering → Impact</span>
      <a href="#services" className="flex min-h-8 items-center gap-3 hover:text-cyan-200">Scroll to discover <ArrowDown size={13} /></a>
      <span className="hidden sm:inline">Islamabad · Since 2004</span>
    </div>
  </div>
  </section>;
}
