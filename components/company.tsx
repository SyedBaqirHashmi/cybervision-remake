import { ArrowUpRight, Globe2 } from 'lucide-react';
import { Reveal } from './ui/reveal';
import { ArchitectureDiagram } from './ui/architecture-diagram';
export function Company() {
  return <section id="company" aria-labelledby="company-title" className="border-y border-stone-800 bg-stone-900/20">
  <div className="shell grid gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:items-center">
    <Reveal>
      <p className="eyebrow"><Globe2 size={14} /> 05 / From Islamabad. For the world.</p>
      <h2 id="company-title" className="section-title">Technology is our craft.<br /><span className="text-stone-400">Partnership is our foundation.</span></h2>
      <p className="body-copy mt-6 max-w-lg">Since 2004, CyberVision International has brought business understanding and technical expertise together for national and international organisations. We connect software, digital experiences and skills development to help organisations move forward.</p>
      <a href="https://cybervision.com.pk/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-3 self-start text-sm text-gold-200">Explore our company <ArrowUpRight size={15} /></a>
    </Reveal>
    <Reveal className="flex items-center justify-center">
      <ArchitectureDiagram />
    </Reveal>
  </div>
  </section>;
}
