'use client';

import { ArrowUpRight, BrainCircuit, Code2, GraduationCap, Radio, Database, Cpu, Workflow } from 'lucide-react';
import { Reveal } from './ui/reveal';
const services = [{
  icon: BrainCircuit,
  number: '01',
  title: 'AI & business automation',
  text: 'Create smarter workflows. Connect your business processes, applications and enterprise systems around the way your team works.',
  tags: ['Intelligent workflows', 'Enterprise systems'],
  className: 'md:col-span-7',
  href: '#contact'
}, {
  icon: Code2,
  number: '02',
  title: 'Software & cloud engineering',
  text: 'From a first product to an enterprise platform, build dependable web and mobile experiences around your goals.',
  tags: ['Web platforms', 'Mobile applications'],
  className: 'md:col-span-5',
  href: 'https://cybervision.com.pk/web-development/'
}, {
  icon: Radio,
  number: '03',
  title: 'Internet of Things',
  text: 'Bring the physical and digital together through connected devices, agricultural technology and operational intelligence.',
  tags: ['Connected systems', 'Smart agriculture'],
  className: 'md:col-span-5',
  href: 'https://cybervision.com.pk/internet-of-things/'
}, {
  icon: GraduationCap,
  number: '04',
  title: 'EdTech & digital training',
  text: 'Build the capabilities that move people forward. Engaging learning content and digital experiences designed for real understanding.',
  tags: ['Digital content', 'Skills development'],
  className: 'md:col-span-7',
  href: '#trainings'
}];
export function BentoServices() {
  return <section id="services" className="section shell" aria-labelledby="services-title">
  <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
    <div>
      <p className="eyebrow"><span className="h-px w-5 bg-cyan-400" /> 01 / What we do</p>
      <h2 id="services-title" className="section-title">Complex challenges.<br /><span className="text-slate-400">Intelligent solutions.</span></h2>
    </div>
    <p className="body-copy max-w-sm">The right expertise, connected.<br />From your first idea to your next chapter of growth.</p>
  </Reveal>
  <div className="grid gap-4 md:grid-cols-12">
    {services.map(({
        icon: Icon,
        ...service
      }, index) => <Reveal key={service.number} className={service.className}>
      <article onPointerMove={event => {
          if (event.pointerType !== 'mouse') return;
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
          event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
        }} className="glow-card group flex h-full min-h-[305px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/35 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/35 sm:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="icon-box">
            <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <span className="font-mono text-[10px] text-slate-400">{service.number} /</span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
          <a href={service.href} className="after:absolute after:inset-0 after:rounded-2xl">
            {service.title}
            <span className="sr-only"> — explore this capability</span>
          </a>
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">
          {service.text}
        </p>
        {index === 0 && <div className="mt-6 flex items-center gap-2 overflow-hidden text-[10px] text-slate-300" aria-hidden="true">
          {[Database, BrainCircuit, Workflow].map((Node, i) => <div key={i} className="contents">
            <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/60 p-3">
              <Node size={16} className="text-cyan-200" />
              <span className="hidden sm:inline">
                {['DATA', 'INTELLIGENCE', 'ACTION'][i]}
              </span>
            </div>
            {i < 2 && <span className="h-px min-w-4 flex-1 bg-gradient-to-r from-cyan-600 to-indigo-500" />}
          </div>)}
        </div>}
        {index === 3 && <div className="mt-6 flex items-center gap-3" aria-hidden="true">
          <Cpu className="text-indigo-300" size={17} />
          <span className="font-mono text-[10px] text-indigo-200">KNOWLEDGE → CAPABILITY → OPPORTUNITY</span>
        </div>}
        <div className="mt-auto flex items-center justify-between gap-2 pt-6">
          <div className="flex flex-wrap gap-2">
            {service.tags.map(tag => <span key={tag} className="rounded-full border border-slate-700/80 px-2.5 py-1 text-[9px] text-slate-300">
              {tag}
            </span>)}
          </div>
          <ArrowUpRight size={19} className="shrink-0 text-slate-400 transition group-hover:text-cyan-200" aria-hidden="true" />
        </div>
      </article>
    </Reveal>)}
  </div>
  </section>;
}
