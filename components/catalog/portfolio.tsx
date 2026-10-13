import Link from 'next/link';
import { caseStudies } from '@/lib/catalog';
import { SourceImage } from './source-image';

const images = [
  ['LUMS', 'https://cybervision.com.pk/wp-content/uploads/2020/11/LUMS_490x366.jpeg'],
  ['FAO', 'https://cybervision.com.pk/wp-content/uploads/2020/12/FAO.jpg'],
  ['PSDF', 'https://cybervision.com.pk/wp-content/uploads/2020/12/PSDF.jpg']
];
export function Portfolio() {
  return <section className="section shell" aria-labelledby="portfolio-title">
    <h2 id="portfolio-title" className="section-title mb-10">A portfolio of practical impact.</h2>
    <div className="mb-14 grid gap-5 md:grid-cols-3">{images.map(([label, src]) => <SourceImage key={label} src={src} alt={`${label} project image published by CyberVision`} />)}</div>
    <div className="grid border-t border-slate-700 md:grid-cols-2">{caseStudies.map(([name, description, slug], index) => <article key={name} className="flex gap-4 border-b border-slate-800 py-6 md:pr-8">
      <span className="pt-1 font-mono text-xs text-champagne-300">{String(index + 1).padStart(2, '0')}</span><div><h3 className="text-lg font-medium">{name}</h3><p className="mt-2 text-sm text-slate-400">{description}</p>{slug && <Link href={`/${slug}`} className="mt-2 inline-flex min-h-11 items-center text-xs text-champagne-200 underline underline-offset-4">Explore related {slug === 'resources' ? 'documents' : 'capability'} →</Link>}</div>
    </article>)}</div>
    <p className="mt-6 text-xs text-slate-400">Project descriptions are adapted from the published portfolio. <a href="https://cybervision.com.pk/case-studies/" className="text-champagne-200 underline underline-offset-4">View the original portfolio</a>.</p>
  </section>;
}
