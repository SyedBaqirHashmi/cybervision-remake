'use client';

import { BrainCircuit, Code2, Radio, GraduationCap, ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { capabilities } from '@/lib/content';
const icons = [BrainCircuit, Code2, Radio, GraduationCap];

/**
 * A museum-grade scroll-snap walkthrough of the four core capability pillars.
 * Scoped to its own scrollable region (not the whole document) so the rest
 * of the page — forms, footer — keeps ordinary scroll behaviour.
 */
export function CapabilityRooms() {
  const reduced = useReducedMotion();
  return <section aria-label="Capability walkthrough" className="relative border-y border-stone-800">
  <div className={reduced ? 'divide-y divide-stone-800' : 'snap-gallery h-[85svh] divide-y divide-stone-800'}>
    {capabilities.map((capability, index) => {
      const Icon = icons[index];
      return <div key={capability.number} className={reduced ? 'flex min-h-[70svh] flex-col items-center justify-center bg-stone-900/20 px-6 text-center' : 'snap-room flex flex-col items-center justify-center bg-stone-900/20 px-6 text-center'} style={{ minHeight: reduced ? undefined : '85svh' }}>
        <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={reduced ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mx-auto max-w-xl">
          <p className="font-mono text-xs tracking-[.3em] text-bronze-300">{capability.number} / {capabilities.length}</p>
          <Icon size={48} strokeWidth={1} className="mx-auto my-8 text-gold-200" aria-hidden="true" />
          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{capability.title}</h3>
          <p className="body-copy mt-5">{capability.text}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {capability.tags.map(tag => <span key={tag} className="rounded-full border border-stone-700/80 px-3 py-1 text-[10px] text-stone-300">{tag}</span>)}
          </div>
        </motion.div>
        {index < capabilities.length - 1 && !reduced && <ChevronDown size={20} className="mt-10 animate-float text-stone-500" aria-hidden="true" />}
      </div>;
    })}
  </div>
  </section>;
}
