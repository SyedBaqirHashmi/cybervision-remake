'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { projects } from '@/lib/content';
import { Reveal } from './ui/reveal';
export function Showcase() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + projects.length) % projects.length;
    setSelected(next);
    buttons.current[next]?.focus();
  }
  return <section className="section shell" id="products" aria-labelledby="products-title">
  <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
    <div>
      <p className="eyebrow">02 / Built for real-world impact</p>
      <h2 id="products-title" className="section-title">Beyond ideas.<br /><span className="text-stone-400">Into the world.</span></h2>
    </div>
    <a href="https://cybervision.com.pk/products/" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 text-sm text-gold-200 underline-offset-4 hover:underline">Explore all products <ArrowUpRight size={15} aria-hidden="true" /></a>
  </Reveal>
  <div role="tablist" aria-label="Featured projects and products" className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-stone-800 bg-stone-900/30 p-2 sm:grid-cols-4">
    {projects.map((project, index) => <button key={project.id} ref={el => {
        buttons.current[index] = el;
      }} id={`tab-${project.id}`} role="tab" aria-selected={selected === index} aria-controls={`project-${project.id}`} tabIndex={selected === index ? 0 : -1} onKeyDown={e => navigate(e, index)} onClick={() => setSelected(index)} className={`min-h-12 rounded-lg px-3 py-3 text-xs transition sm:text-sm ${selected === index ? 'bg-stone-800 text-gold-100 shadow-inner ring-1 ring-stone-600' : 'text-stone-400 hover:bg-stone-800/50 hover:text-white'}`}>
      {project.client}
    </button>)}
  </div>
  {projects.map((project, index) => <div key={project.id} id={`project-${project.id}`} role="tabpanel" aria-labelledby={`tab-${project.id}`} tabIndex={0} hidden={selected !== index} className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/35">
    {selected === index && <motion.div initial={reduced ? false : {
        opacity: .5
      }} animate={{
        opacity: 1
      }} transition={{
        duration: .25
      }} className="grid lg:grid-cols-[.85fr_1.15fr]">
      <div className="flex flex-col p-6 sm:p-10">
        <p className="eyebrow text-[9px]">
          {project.tag}
        </p>
        <p className="mb-4 text-xs text-stone-400">
          {project.category}
        </p>
        <h3 className="max-w-sm text-3xl font-semibold leading-tight tracking-tight">
          {project.title}
        </h3>
        <p className="mt-5 text-sm leading-7 text-stone-400">
          {project.description}
        </p>
        <ul className="mt-7 space-y-3">
          {project.capabilities.map(item => <li key={item} className="flex items-center gap-2 text-xs text-stone-300">
            <Check size={14} className="text-gold-200" aria-hidden="true" />
            {item}
          </li>)}
        </ul>
        <a href={project.source} target="_blank" rel="noopener noreferrer" className="mt-8 flex min-h-11 items-center gap-3 self-start text-sm font-medium text-gold-200">Read about the project <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <div className="relative flex items-center bg-[radial-gradient(ellipse_at_center,rgba(163,103,58,.16),transparent_75%)] p-4 sm:p-8">
        <Image src={project.image} alt={project.alt} width={720} height={560} sizes="(max-width: 1024px) 90vw, 660px" className="h-auto w-full rounded-xl" />
        <span className="absolute bottom-3 right-5 font-mono text-[8px] uppercase tracking-wide text-stone-400">Illustrative project visual</span>
      </div>
    </motion.div>}
  </div>)}
  </section>;
}
