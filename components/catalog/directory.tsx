'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import type { ContentPage } from '@/lib/catalog';
import { Tilt } from '../ui/tilt';

export function Directory({ pages, title = 'Explore CyberVision' }: { pages: ContentPage[]; title?: string }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(pages.map(page => page.category))];
  const results = useMemo(() => pages.filter(page => (category === 'All' || page.category === category) && `${page.title} ${page.summary}`.toLowerCase().includes(query.trim().toLowerCase())), [pages, query, category]);
  return <section className="section shell" aria-label={title}>
    <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div><p className="eyebrow">Find your next step</p><h2 className="section-title">{title}</h2></div>
      <label className="relative block w-full md:max-w-sm"><span className="mb-2 block text-xs text-slate-300">Search pages</span><Search size={17} className="absolute bottom-4 left-4 text-slate-400" aria-hidden="true" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try IoT, learning or enterprise" className="min-h-12 w-full rounded-lg border border-slate-600 bg-slate-900 py-3 pl-11 pr-4 text-sm" /></label>
    </div>
    {categories.length > 2 && <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`min-h-11 rounded-full border px-4 text-xs ${category === item ? 'border-champagne-300 bg-champagne-200 text-slate-950' : 'border-slate-700 text-slate-300 hover:border-champagne-300'}`}>{item}</button>)}</div>}
    <p role="status" aria-live="polite" className="mb-5 text-xs text-slate-400">{results.length} {results.length === 1 ? 'page' : 'pages'}</p>
    {results.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{results.map((page, index) => <Tilt key={page.slug} className="h-full"><article className="catalog-card group h-full">
      <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-champagne-200"><span>{page.category}</span><span className="text-slate-400">{String(index + 1).padStart(2, '0')}</span></div>
      <h3 className="text-xl font-medium tracking-tight"><Link href={`/${page.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">{page.title}</Link></h3><p className="mt-4 text-sm leading-7 text-slate-400">{page.summary}</p>
      <ArrowUpRight className="mt-8 text-champagne-200 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={20} aria-hidden="true" />
    </article></Tilt>)}</div> : <div className="rounded-xl border border-slate-700 p-10 text-center"><p className="text-slate-300">No pages match this search.</p><button className="btn-secondary mt-5" onClick={() => { setQuery(''); setCategory('All'); }}>Clear filters</button></div>}
  </section>;
}
