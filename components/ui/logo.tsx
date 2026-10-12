export function Logo() {
  return <a href="/#home" aria-label="CyberVision International home" className="inline-flex shrink-0 items-center gap-2.5">
  <svg width="34" height="38" viewBox="0 0 34 38" fill="none" aria-hidden="true">
    <path d="M16 3 3 10.5v16L16 34l13-7.5v-8l-12 7-6-3.5v-7L23 8" stroke="#67e8f9" strokeWidth="3" strokeLinejoin="round" />
    <path d="m21 2 10 6v7" stroke="#a5b4fc" strokeWidth="3" />
  </svg>
  <span className="text-lg font-bold tracking-[-.04em] sm:text-xl">cyber<span className="font-normal text-slate-300">vision</span><span className="mt-0.5 block text-[7px] font-medium uppercase tracking-[.38em] text-slate-400">International</span></span>
  </a>;
}
