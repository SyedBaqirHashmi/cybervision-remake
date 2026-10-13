'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation } from '@/lib/content';
import { Logo } from './ui/logo';
export function Header() {
  const [open,setOpen] = useState(false);
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const resize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize',resize);
    return () => window.removeEventListener('resize',resize);
  }, []);
  return <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md" onKeyDown={event => {
    if(event.key === 'Escape' && open) { setOpen(false); button.current?.focus(); }
  }}>
    <div className="shell flex h-20 items-center justify-between gap-3">
      <Logo />
      <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:flex">{navigation.map(([label,href])=><Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} className={`inline-flex min-h-11 items-center text-xs transition hover:text-champagne-200 ${pathname===href?'text-champagne-200':'text-slate-300'}`}>{label}</Link>)}</nav>
      <Link href="/contactus#contact" className="btn-secondary hidden !min-h-10 !px-4 !py-2 !text-xs sm:inline-flex">Book consultation <ArrowUpRight size={14} aria-hidden="true" /></Link>
      <button ref={button} className="grid size-11 place-items-center rounded-lg border border-slate-600 lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?'Close navigation':'Open navigation'} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
    </div>
    <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className="shell max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-slate-800 bg-slate-950 py-5 lg:hidden">{navigation.map(([label,href])=><Link key={href} href={href} aria-current={pathname===href?'page':undefined} onClick={()=>setOpen(false)} className="block rounded-lg px-3 py-3 text-sm hover:bg-slate-900">{label}</Link>)}<Link href="/contactus#contact" className="btn-primary mt-3 w-full" onClick={()=>setOpen(false)}>Book consultation <ArrowUpRight size={16}/></Link></nav>
  </header>;
}
