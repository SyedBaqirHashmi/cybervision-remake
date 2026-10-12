'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation } from '@/lib/content';
import { Logo } from './ui/logo';
import { MagneticLink } from './ui/magnetic-link';
export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive('#' + entry.target.id);
    }, {
      rootMargin: '-15% 0px -65% 0px'
    });
    navigation.forEach(([, href]) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });
    const resize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener('resize', resize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md" onKeyDown={event => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      button.current?.focus();
    }
  }}>
  <div className="shell flex h-20 items-center justify-between gap-3">
    <Logo />
    <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
      {navigation.map(([label, href]) => <a key={href} href={href} aria-current={active === href ? 'location' : undefined} className={`text-xs transition hover:text-cyan-200 ${active === href ? 'text-cyan-200' : 'text-slate-300'}`}>
        {label}
      </a>)}
    </nav>
    <div className="hidden sm:block">
      <MagneticLink href="#contact" className="btn-secondary !min-h-10 !px-4 !py-2 !text-xs">Book consultation <ArrowUpRight size={14} aria-hidden="true" /></MagneticLink>
    </div>
    <button ref={button} className="grid size-11 place-items-center rounded-lg border border-slate-700 lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>
      {open ? <X size={20} /> : <Menu size={20} />}
    </button>
  </div>
  <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className="shell border-t border-slate-800 bg-slate-950 py-5 lg:hidden">
    {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm hover:bg-slate-900">
      {label}
    </a>)}
    <a href="#contact" className="btn-primary mt-3 w-full" onClick={() => setOpen(false)}>Book consultation <ArrowUpRight size={16} /></a>
  </nav>
  </header>;
}
