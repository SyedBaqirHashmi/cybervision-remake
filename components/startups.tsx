'use client';

import { useState } from 'react';
import { ChevronDown, Compass, Network, Rocket } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from './ui/reveal';
const pillars = [{
  icon: Compass,
  title: 'Expertise for the journey',
  summary: 'Mentorship & guidance',
  detail: 'Explore business strategy, technology planning and product development with experienced mentors. Turn a promising concept into a practical next step.'
}, {
  icon: Network,
  title: 'Connections that matter',
  summary: 'Investor readiness & networks',
  detail: 'Get support in understanding investor expectations, refining your business story and exploring connections across the startup ecosystem.'
}, {
  icon: Rocket,
  title: 'Room to think bigger',
  summary: 'Incubation & ecosystem support',
  detail: 'CyberVision’s work with the National Incubation Centre Faisalabad supports entrepreneurs with training, workspace and the resources to develop their ventures.'
}];
export function Startups() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return <section id="startups" aria-labelledby="startups-title" className="section shell">
  <Reveal className="mb-12 text-center">
    <p className="eyebrow justify-center">04 / Built for what’s next</p>
    <h2 id="startups-title" className="section-title">Big futures start<br />with <span className="gradient-text">bold ideas.</span></h2>
    <p className="body-copy mx-auto mt-5 max-w-xl">From founder ambition to a growing venture. Connect with an ecosystem designed to help ideas take shape.</p>
  </Reveal>
  <div className="grid items-start gap-4 md:grid-cols-3">
    {pillars.map(({
        icon: Icon,
        ...pillar
      }, index) => <article key={pillar.title} className={`rounded-2xl border p-6 transition sm:p-7 ${expanded === index ? 'border-bronze-400/50 bg-bronze-950/25' : 'border-slate-800 bg-slate-900/30'}`}>
      <Icon size={29} strokeWidth={1.3} className="mb-8 text-bronze-200" aria-hidden="true" />
      <p className="mb-3 text-[10px] text-slate-400">
        {pillar.summary}
      </p>
      <h3>
        <button id={`startup-trigger-${index}`} className="flex min-h-12 w-full items-center justify-between gap-3 text-left text-lg font-medium tracking-tight" aria-expanded={expanded === index} aria-controls={`startup-panel-${index}`} onClick={() => setExpanded(expanded === index ? null : index)}>
          {pillar.title}
          <ChevronDown size={17} className={`shrink-0 transition ${expanded === index ? 'rotate-180' : ''}`} />
        </button>
      </h3>
        <motion.div id={`startup-panel-${index}`} role="region" aria-labelledby={`startup-trigger-${index}`} aria-hidden={expanded !== index} inert={expanded !== index} initial={false} animate={{
            height: expanded === index ? 'auto' : 0,
            opacity: expanded === index ? 1 : 0
          }} transition={{
            duration: reduced ? 0 : .25
          }} className="overflow-hidden">
          <p className="pt-4 text-sm leading-7 text-slate-400">
            {pillar.detail}
          </p>
          <a className="mt-5 inline-flex min-h-11 items-center text-xs text-champagne-200 underline underline-offset-4" href="#contact">Discuss your startup →</a>
        </motion.div>
    </article>)}
  </div>
  <p className="mt-7 text-center text-xs text-slate-400">
    <a className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-champagne-200" href="https://cybervision.com.pk/business-consulting/" target="_blank" rel="noopener noreferrer">Explore CyberVision’s startup and business consulting</a>
  </p>
  </section>;
}
