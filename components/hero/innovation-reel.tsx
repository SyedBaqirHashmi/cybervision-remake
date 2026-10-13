'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BrainCircuit, GraduationCap, Network, Pause, Play, Rocket, X } from 'lucide-react';
const scenes = [{
  icon: BrainCircuit,
  title: 'Imagine the possibilities.',
  caption: 'Software and automation that connect ambition to practical outcomes.',
  label: '01 / INTELLIGENT ENTERPRISE'
}, {
  icon: Network,
  title: 'Connect the physical and digital.',
  caption: 'IoT and information systems bring operations into focus.',
  label: '02 / CONNECTED SYSTEMS'
}, {
  icon: GraduationCap,
  title: 'Build human potential.',
  caption: 'Digital training turns knowledge into capability.',
  label: '03 / SKILLS FOR THE FUTURE'
}, {
  icon: Rocket,
  title: 'Make the next idea possible.',
  caption: 'Mentorship, technology and startup support create room to grow.',
  label: '04 / INNOVATION ECOSYSTEMS'
}];
export function InnovationReel() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open]);
  useEffect(() => {
    if (!open || !playing || reduced) return;
    const timer = window.setInterval(() => setIndex(value => {
      if (value === scenes.length - 1) {
        setPlaying(false);
        return value;
      }
      return value + 1;
    }), 5000);
    return () => window.clearInterval(timer);
  }, [open, playing, reduced]);
  const scene = scenes[index];
  const Icon = scene.icon;
  return <>
  <button className="btn-secondary" onClick={() => {
      setIndex(0);
      setPlaying(!reduced);
      setOpen(true);
    }}><Play size={15} aria-hidden="true" /> Watch innovation reel</button>
  {open && <dialog ref={ref} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} aria-labelledby="reel-title" aria-describedby="reel-description" className="m-auto w-[min(90vw,850px)] overflow-hidden rounded-2xl border border-stone-700 bg-stone-950 p-0 text-white">
    <div className="flex items-center justify-between gap-4 border-b border-stone-800 px-5 py-3">
      <div>
        <h2 id="reel-title" className="text-sm font-semibold">CyberVision / Innovation reel</h2>
        <p id="reel-description" className="mt-1 text-xs text-stone-400">An original animated capability overview. No audio.</p>
      </div>
      <button className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-stone-800" onClick={() => setOpen(false)} aria-label="Close innovation reel">
        <X size={20} />
      </button>
    </div>
    <div className="grid-surface relative grid min-h-[350px] place-items-center overflow-hidden p-6 text-center sm:min-h-[440px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,103,58,.2),transparent_70%)]" />
      <AnimatePresence mode="wait">
        <motion.div key={index} initial={reduced ? false : {
            opacity: 0,
            y: 12
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0
          }} transition={{
            duration: reduced ? 0 : .35
          }} className="relative max-w-lg">
          <Icon className="mx-auto mb-8 size-16 text-gold-200" strokeWidth={1} aria-hidden="true" />
          <p className="mb-4 font-mono text-[10px] tracking-widest text-bronze-200">
            {scene.label}
          </p>
          <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {scene.title}
          </h3>
          <p className="mt-5 text-sm leading-7 text-stone-300">
            {scene.caption}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-800 p-4">
      <div className="flex gap-2">
        <button className="grid size-11 place-items-center rounded-full border border-stone-700 disabled:opacity-40" disabled={index === 0} aria-label="Previous reel scene" onClick={() => {
            setPlaying(false);
            setIndex(index - 1);
          }}>
          <ArrowLeft size={18} />
        </button>
        <button className="grid size-11 place-items-center rounded-full border border-stone-700" aria-label={playing ? 'Pause reel' : 'Play reel'} disabled={!!reduced} onClick={() => {
            if (index === 3) setIndex(0);
            setPlaying(!playing);
          }}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button className="grid size-11 place-items-center rounded-full border border-stone-700 disabled:opacity-40" disabled={index === 3} aria-label="Next reel scene" onClick={() => {
            setPlaying(false);
            setIndex(index + 1);
          }}>
          <ArrowRight size={18} />
        </button>
      </div>
      <p className="text-xs text-stone-300" aria-live={playing ? 'off' : 'polite'}>{reduced ? 'Manual playback · ' : ''}Scene {index + 1} of {scenes.length}</p>
      <a className="text-xs text-gold-200 underline underline-offset-4" href="#contact" onClick={() => setOpen(false)}>Start a conversation ↗</a>
    </div>
  </dialog>}
  </>;
}
