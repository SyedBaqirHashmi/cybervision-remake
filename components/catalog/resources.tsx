import { ArrowUpRight, FileText } from 'lucide-react';
import { resources } from '@/lib/catalog';

export function ResourceLibrary({ immersive = false }: { immersive?: boolean }) {
  return <section className="section shell" aria-labelledby="resources-title">
    <p className="eyebrow">Research & documentation</p><h2 id="resources-title" className="section-title mb-5">Explore the thinking behind the work.</h2>
    <p className="body-copy mb-10 max-w-2xl">Three published documents, available in their original format. Each opens on CyberVision’s source website.</p>
    <div className={immersive ? 'gallery-rooms' : 'grid gap-5 lg:grid-cols-3'} tabIndex={immersive ? 0 : undefined} role={immersive ? 'region' : undefined} aria-label={immersive ? 'Report gallery; scroll to explore three documents' : undefined}>
      {resources.map((resource, index) => <article key={resource.id} id={resource.id} className="resource-room rounded-2xl border border-slate-700 bg-slate-900/50 p-6 sm:p-9">
        <div className="mb-8 flex justify-between text-champagne-200"><FileText size={30} strokeWidth={1} aria-hidden="true" /><span className="font-mono text-xs">0{index + 1} / PDF · {resource.pages} pages</span></div>
        <p className="mb-3 text-xs text-slate-400">{resource.date}</p><h3 className="text-2xl font-medium tracking-tight">{resource.title}</h3>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{resource.description}</p>
        <ul className="mt-5 grid gap-2 text-xs text-slate-400">{resource.chapters.map(chapter => <li key={chapter}>— {chapter}</li>)}</ul>
        <p className="mt-6 max-w-xl text-xs leading-6 text-slate-400">{resource.note}</p>
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-7">Read {resource.title} <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> — {resource.pages}-page PDF, opens in a new tab</span></a>
      </article>)}
    </div>
  </section>;
}
