import { ArrowUpRight, Check, FileText } from 'lucide-react';
import { Header } from './header';
import { Footer } from './footer';
import { Contact } from './contact';
import { Reveal } from './ui/reveal';
import { TiltCard } from './ui/tilt-card';
import { AnimatedNumber } from './ui/animated-number';
import type { CatalogEntry } from '@/lib/catalog';
import { caseStudies, clients, companyTechStack, getCatalogEntry, trainingStats } from '@/lib/catalog';

function RelatedRoutes({ slugs }: { slugs: string[] }) {
  if (!slugs.length) return null;
  return <nav aria-label="Related pages" className="mt-16 border-t border-stone-800 pt-10">
  <p className="eyebrow">Related</p>
  <ul className="flex flex-wrap gap-3">
    {slugs.map(slug => {
      const related = getCatalogEntry(slug);
      if (!related) return null;
      return <li key={slug}>
        <a href={`/${slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-stone-700 px-4 py-2 text-xs text-stone-300 transition hover:border-gold-400/50 hover:text-gold-200">
          {related.heroHeading}
          <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </li>;
    })}
  </ul>
  </nav>;
}

function PrimaryAction({ entry }: { entry: CatalogEntry }) {
  const action = entry.primaryAction ?? { label: 'Start a conversation', href: '/contactus#contact' };
  const external = action.href.startsWith('http');
  return <a href={action.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="btn-primary mt-8">
    {action.label} <ArrowUpRight size={16} aria-hidden="true" />
  </a>;
}

export function CatalogPage({ entry }: { entry: CatalogEntry }) {
  return <>
  <Header />
  <main id="main" className="pt-20">
    <section className="section shell max-w-4xl">
      <Reveal>
        {entry.sourceUrl && <p className="eyebrow">
          Adapted from <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-gold-200">the original page</a>
        </p>}
        <h1 className="section-title">{entry.heroHeading}</h1>
        <p className="body-copy mt-6 max-w-2xl text-base">{entry.purpose}</p>
        {entry.variant !== 'contact' && <PrimaryAction entry={entry} />}
      </Reveal>
    </section>

    {entry.image && <section className="shell max-w-4xl pb-16">
      <Reveal>
        <a href={entry.image.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-stone-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={entry.image.src} alt="" loading="lazy" className="h-auto w-full" style={{ objectFit: 'contain' }} />
        </a>
        <p className="mt-2 text-[10px] text-stone-500">{entry.image.caption}</p>
      </Reveal>
    </section>}

    {entry.sections.filter(section => section.items.length > 0).map(section => <section key={section.heading} className="shell max-w-4xl pb-16">
      <Reveal>
        <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {section.items.map(item => <TiltCard key={item} options={{ max: 4, glare: false }}>
            <div className="flex h-full items-center gap-3 rounded-xl border border-stone-800 bg-stone-900/30 px-4 py-4 text-sm text-stone-200">
              <Check size={15} className="shrink-0 text-gold-200" aria-hidden="true" />
              {item}
            </div>
          </TiltCard>)}
        </div>
      </Reveal>
    </section>)}

    {entry.variant === 'training' && <section className="shell max-w-4xl pb-16">
      <Reveal>
        <h2 className="text-xl font-semibold tracking-tight">Training impact</h2>
        <p className="mt-2 text-xs text-stone-500">Company-published figures; not independently audited, and distinct from enterprise project metrics elsewhere on this site.</p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {trainingStats.map(stat => <div key={stat.label} className="rounded-xl border border-stone-800 bg-stone-900/30 p-5">
            <p className="text-2xl font-semibold text-gold-200"><AnimatedNumber value={stat.value} suffix={stat.suffix} /></p>
            <p className="mt-1 text-xs text-stone-400">{stat.label}</p>
          </div>)}
        </div>
      </Reveal>
    </section>}

    {entry.variant === 'company' && <section className="shell max-w-4xl pb-16">
      <Reveal>
        <h2 className="text-xl font-semibold tracking-tight">Technology expertise</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {Object.entries(companyTechStack).map(([title, stack]) => <div key={title}>
            <p className="text-sm font-medium text-stone-200">{title}</p>
            <ul className="mt-3 space-y-1.5 text-xs text-stone-400">
              {stack.map(tech => <li key={tech}>{tech}</li>)}
            </ul>
          </div>)}
        </div>
      </Reveal>
    </section>}

    {entry.variant === 'clients' && <section className="shell max-w-4xl pb-16">
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {clients.map(name => <span key={name} className="rounded-full border border-stone-700/80 px-3 py-1.5 text-xs text-stone-300">{name}</span>)}
        </div>
      </Reveal>
    </section>}

    {entry.variant === 'case-studies' && <section className="shell max-w-4xl pb-16">
      <Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {caseStudies.map(study => <div key={study.title} className="rounded-xl border border-stone-800 bg-stone-900/30 p-5">
            <h3 className="text-sm font-semibold text-stone-100">{study.title}</h3>
            <p className="mt-2 text-xs leading-6 text-stone-400">{study.summary}</p>
            {study.pdfUrl && <a href={study.pdfUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-9 items-center gap-2 text-xs text-gold-200 underline underline-offset-4">
              <FileText size={13} aria-hidden="true" /> Read the original PDF
            </a>}
          </div>)}
        </div>
      </Reveal>
    </section>}

    {entry.variant === 'resources' && <section className="shell max-w-4xl pb-16">
      <Reveal>
        <div className="space-y-4">
          {caseStudies.filter(study => study.pdfUrl).map(study => <a key={study.title} href={study.pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-xl border border-stone-800 bg-stone-900/30 p-5 transition hover:border-gold-500/35">
            <FileText size={20} className="mt-0.5 shrink-0 text-gold-200" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-semibold text-stone-100">{study.title}</h3>
              <p className="mt-1 text-xs leading-6 text-stone-400">{study.summary}</p>
            </div>
          </a>)}
        </div>
      </Reveal>
    </section>}

    {entry.variant === 'disclaimer' && <section className="shell max-w-4xl pb-16">
      <Reveal>
        <div className="space-y-4 text-sm leading-7 text-stone-300">
          <p>This website is an independent, unofficial remake of CyberVision International's public site, built for demonstration purposes. It adapts publicly available copy rather than republishing it verbatim, and does not represent CyberVision International or speak on its behalf.</p>
          <p>The company's own, original legal disclaimer governs its official website and is linked below rather than substituted here with newly drafted terms:</p>
          <a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-gold-200 underline underline-offset-4">
            Read CyberVision International's original disclaimer <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>}

    {entry.variant !== 'contact' && <div className="shell max-w-4xl">
      <RelatedRoutes slugs={entry.relatedRoutes} />
    </div>}
  </main>
  {entry.variant === 'contact' ? <Contact /> : null}
  <Footer />
  </>;
}
