'use client';
import { useEffect, useRef, useState } from 'react';
export function SourceImage({ src, alt }: { src: string; alt: string }) {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: '240px' });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return <figure ref={root} className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
    <div className="flex aspect-[4/3] items-center justify-center p-4">
      {ready && !failed ? <img src={src} alt={alt} width={800} height={600} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="h-full w-full object-contain" /> : <span className="px-6 text-center text-sm text-slate-400">{failed ? 'Image is currently unavailable.' : 'Project image'}</span>}
    </div>
    <figcaption className="border-t border-slate-800 px-5 py-4 text-xs leading-6 text-slate-400">{alt}. <a href={src} target="_blank" rel="noopener noreferrer" className="text-champagne-200 underline underline-offset-4">Open original image<span className="sr-only"> in a new tab</span></a></figcaption>
  </figure>;
}
