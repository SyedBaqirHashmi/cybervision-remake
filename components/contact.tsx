import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { company } from '@/lib/content';
import { ContactForm } from './contact-form';
import { Reveal } from './ui/reveal';
export function Contact() {
  return <section id="contact" className="section relative overflow-hidden" aria-labelledby="contact-title">
  <div className="pointer-events-none absolute -right-32 top-0 size-96 rounded-full bg-bronze-600/10 blur-[120px]" aria-hidden="true" />
  <div className="shell relative grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr]">
    <Reveal>
      <p className="eyebrow">06 / Your next move</p>
      <h2 id="contact-title" className="section-title">Bring your vision.<br /><span className="gradient-text">We’ll bring the expertise.</span></h2>
      <p className="body-copy mt-6 max-w-sm">A challenge to solve. An idea to explore. A team to empower. Let’s start with a conversation.</p>
      <address className="mt-8 space-y-4 text-sm not-italic">
        <a href={`mailto:${company.email}`} className="flex min-h-11 items-center gap-3 text-stone-200 hover:text-gold-200">
          <Mail size={17} className="shrink-0 text-gold-200" />
          {company.email}
        </a>
        <a href={company.phoneHref} className="flex min-h-11 items-center gap-3 text-stone-200 hover:text-gold-200">
          <Phone size={17} className="shrink-0 text-gold-200" />
          {company.phone}
        </a>
        <p className="flex items-start gap-3 text-xs leading-6 text-stone-400">
          <MapPin size={18} className="mt-1 shrink-0 text-gold-200" />
          <span className="max-w-xs">
            {company.address}
          </span>
        </p>
      </address>
      <a href={company.mapUrl} target="_blank" rel="noopener noreferrer" className="group relative mt-8 block overflow-hidden rounded-xl border border-stone-700 bg-stone-900">
        <Image src="/images/islamabad-map.svg" alt="Stylised location illustration for the CyberVision office in Islamabad’s E-11/2 sector; open the map for directions." width={600} height={300} sizes="(max-width:1024px) 90vw, 450px" className="w-full opacity-80 transition group-hover:opacity-100" />
        <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-stone-700 bg-stone-950/95 p-3 text-xs">Find our Islamabad office <ArrowUpRight size={15} className="text-gold-200" /></span>
      </a>
    </Reveal>
    <ContactForm />
  </div>
  </section>;
}
