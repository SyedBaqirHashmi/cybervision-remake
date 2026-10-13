import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Contact } from '@/components/contact';
import { Directory } from '@/components/catalog/directory';
import { ResourceLibrary } from '@/components/catalog/resources';
import { Portfolio } from '@/components/catalog/portfolio';
import { SourceImage } from '@/components/catalog/source-image';
import { pages, pageBySlug, trainingMetrics, clients } from '@/lib/catalog';
import { siteOrigin } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return [...pages.map(({ slug }) => ({ slug })), { slug: 'resources' }]; }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pageBySlug(slug);
  const title = slug === 'resources' ? 'Research & resources' : page?.title;
  const description = slug === 'resources' ? 'Explore CyberVision’s published textile, tourism and one-window platform documents.' : page?.summary;
  const origin = siteOrigin();
  return { title, description, alternates: { canonical: origin ? `${origin}/${slug}` : undefined }, openGraph: { title, description, url: origin ? `${origin}/${slug}` : undefined } };
}
export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const page = pageBySlug(slug);
  if (!page && slug !== 'resources') notFound();
  const related = page?.related.flatMap(item => { const target = pageBySlug(item); return target ? [target] : []; }) ?? [];
  return <><Header /><main id="main">
    <section id="home" className="detail-hero border-b border-slate-800">
      <div className="shell py-14 sm:py-20">
        <Link href="/" className="mb-12 inline-flex min-h-11 items-center gap-3 text-xs text-slate-400 hover:text-champagne-200"><ArrowLeft size={15} aria-hidden="true" /> Home</Link>
        <p className="eyebrow">{page?.category ?? 'Knowledge library'} / {page?.title ?? 'Resources'}</p>
        <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,5.8rem)] font-medium leading-[1.08] tracking-[-.055em]">{page?.headline ?? 'A closer look at the work.'}</h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300">{page?.summary ?? 'Industry perspectives and project documentation, available to explore in their original published form.'}</p>
        {page && !['contactus','disclaimer'].includes(slug) && <Link href="/contactus#contact" className="btn-primary mt-8">Discuss your project <ArrowUpRight size={16} aria-hidden="true" /></Link>}
      </div>
    </section>
    {page && <div className="shell grid gap-12 py-16 lg:grid-cols-[1fr_2fr]">
      <aside><p className="eyebrow">In focus</p><nav aria-label="On this page" className="flex flex-col items-start gap-2">{page.sections.map((section, index) => <a key={section.title} href={`#section-${index}`} className="inline-flex min-h-11 items-center text-sm text-slate-300 hover:text-champagne-200">{section.title}</a>)}</nav></aside>
      <div className="min-w-0 space-y-12">{page.sections.map((section, index) => <section id={`section-${index}`} key={section.title} aria-labelledby={`heading-${index}`} className="scroll-mt-28 border-t border-slate-700 pt-8"><span className="font-mono text-xs text-champagne-300">0{index + 1}</span><h2 id={`heading-${index}`} className="mt-5 text-2xl font-medium tracking-tight sm:text-3xl">{section.title}</h2>{section.text && <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400">{section.text}</p>}{!!section.items?.length && <ul className="mt-6 grid gap-3 sm:grid-cols-2">{section.items.map(item => <li key={item} className="rounded-lg border border-slate-800 px-4 py-4 text-sm leading-6 text-slate-300"><span className="mr-3 text-champagne-300" aria-hidden="true">↗</span>{item}</li>)}</ul>}</section>)}{page.image && <SourceImage src={page.image} alt={page.imageAlt ?? page.title} />}</div>
    </div>}
    {slug === 'training' && <section className="shell pb-16" aria-labelledby="impact-title"><h2 id="impact-title" className="section-title mb-8">Learning at scale.</h2><dl className="grid gap-px overflow-hidden rounded-xl border border-slate-700 bg-slate-700 sm:grid-cols-2 lg:grid-cols-3">{trainingMetrics.map(([value, label]) => <div key={label} className="bg-slate-950 p-7"><dt className="text-sm leading-6 text-slate-400">{label}</dt><dd className="mt-4 text-4xl tracking-tight text-champagne-200">{value}</dd></div>)}</dl><p className="mt-5 text-xs text-slate-400">Figures reported on CyberVision’s published training page.</p></section>}
    {slug === 'clients' && <section className="shell pb-16" aria-label="Selected client organisations"><div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-700 bg-slate-700 md:grid-cols-4">{clients.map(name => <div key={name} className="flex min-h-28 items-center justify-center bg-slate-950 px-5 text-center text-lg font-medium text-slate-300">{name}</div>)}</div><div className="mx-auto mt-10 max-w-md"><SourceImage src="https://cybervision.com.pk/wp-content/uploads/2020/11/1-1-e1606980703354.png" alt="Client logo image linked from CyberVision’s source site" /></div></section>}
    {slug === 'case-studies' && <Portfolio />}
    {['resources','case-studies'].includes(slug) && <ResourceLibrary immersive={slug === 'resources'} />}
    {slug.startsWith('free-huawei-') && <section className="shell pb-16"><a href="https://nsis.navttc.gov.pk/" target="_blank" rel="noopener noreferrer" className="btn-primary">Check application availability <ArrowUpRight size={16} /><span className="sr-only"> on NAVTTC, opens in a new tab</span></a></section>}
    {slug === 'disclaimer' && <section className="shell flex flex-wrap gap-4 pb-16"><a className="btn-secondary" href="https://cybervision.com.pk/disclaimer/">Read company disclaimer <ArrowUpRight size={16} /></a><Link className="btn-secondary" href="/privacy">Read remake privacy notice</Link></section>}
    {related.length > 0 && <Directory pages={related} title={['products','software-development-services','digital-services'].includes(slug) ? 'Explore the capabilities' : 'Continue exploring'} />}
    {slug === 'contactus' && <Contact />}
    {page && <div className="shell pb-10 text-xs text-slate-400"><a href={page.source} className="underline underline-offset-4 hover:text-champagne-200">Original company information ↗</a></div>}
  </main><Footer /></>;
}
