import Link from 'next/link';
import { Linkedin, Mail, Phone } from 'lucide-react';
import { company } from '@/lib/content';
import { Logo } from './ui/logo';
import { Newsletter } from './newsletter';
const columns = [{
  title: 'Expertise',
  links: [['Business automation', '/business-process-automation'], ['Software engineering', '/web-development'], ['Internet of Things', '/internet-of-things'], ['Digital training', '/training']]
}, {
  title: 'Explore',
  links: [['Enterprise products', '/products'], ['Selected work', '/case-studies'], ['Startup ecosystem', '/startup-innovation'], ['Company', '/company'], ['Resources', '/resources'], ['Contact', '/contactus']]
}];
export function Footer() {
  return <footer className="border-t border-slate-800 bg-slate-950">
  <div className="shell">
    <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.25fr_.75fr_.75fr_1.25fr]">
      <div>
        <Logo />
        <p className="mt-5 max-w-xs text-xs leading-6 text-slate-400">Engineering intelligent solutions.<br />Creating possibilities for people.</p>
        <address className="mt-5 max-w-xs text-[11px] not-italic leading-6 text-slate-400">
          {company.address}
        </address>
        <div className="mt-5 flex gap-3">
          <a href={`mailto:${company.email}`} aria-label="Email CyberVision" className="grid size-11 place-items-center rounded-full border border-slate-700 text-slate-300 hover:border-champagne-300 hover:text-champagne-200">
            <Mail size={17} />
          </a>
          <a href={company.phoneHref} aria-label="Call CyberVision" className="grid size-11 place-items-center rounded-full border border-slate-700 text-slate-300 hover:border-champagne-300 hover:text-champagne-200">
            <Phone size={17} />
          </a>
          <a href="https://www.linkedin.com/company/cybervision-international" target="_blank" rel="noopener noreferrer" aria-label="CyberVision International on LinkedIn" className="grid size-11 place-items-center rounded-full border border-slate-700 text-slate-300 hover:border-champagne-300 hover:text-champagne-200">
            <Linkedin size={17} />
          </a>
        </div>
      </div>
      {columns.map(column => <nav key={column.title} aria-label={`${column.title} footer links`}>
        <h2 className="mb-5 text-sm font-medium">
          {column.title}
        </h2>
        <ul className="space-y-1">
          {column.links.map(([label, href]) => <li key={label}>
            <a href={href} className="inline-flex min-h-10 items-center text-xs text-slate-400 hover:text-champagne-200">
              {label}
            </a>
          </li>)}
        </ul>
      </nav>)}
      <Newsletter />
    </div>
    <div className="flex flex-col justify-between gap-5 border-t border-slate-800 py-6 text-[10px] text-slate-400 sm:flex-row">
      <p>© {new Date().getFullYear()} CyberVision International.</p>
      <div className="flex flex-wrap gap-x-5 gap-y-4">
        <Link href="/privacy" className="hover:text-champagne-200">Privacy notice</Link>
        <a href="/disclaimer" className="hover:text-champagne-200">Company disclaimer</a>
        <a href="#main" className="hover:text-champagne-200">Back to top ↑</a>
      </div>
    </div>
  </div>
  </footer>;
}
