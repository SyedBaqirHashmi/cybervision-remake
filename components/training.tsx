import { ArrowUpRight, BookOpen, GraduationCap, PlayCircle } from 'lucide-react';
import { Reveal } from './ui/reveal';
export function Training() {
  return <section id="trainings" aria-labelledby="training-title" className="section border-y border-slate-800 bg-slate-900/25">
  <div className="shell grid items-center gap-12 lg:grid-cols-2">
    <Reveal className="relative overflow-hidden rounded-2xl border border-bronze-400/20 bg-gradient-to-br from-bronze-950/60 to-slate-950 p-6 sm:p-10">
      <div className="mb-12 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-widest text-bronze-200">CYBERVISION / LEARNING</span>
        <GraduationCap className="text-bronze-300" size={25} />
      </div>
      <div className="grid-surface relative rounded-xl border border-bronze-300/20 bg-slate-950/60 p-6">
        <BookOpen className="mb-7 text-champagne-200" size={32} strokeWidth={1.25} />
        <h3 className="text-2xl font-medium leading-tight">Knowledge becomes<br /><span className="text-champagne-200">opportunity.</span></h3>
        <div className="mt-7 space-y-3">
          {['Engaging digital content', 'Practical learning journeys', 'Skills for entrepreneurship'].map((text, index) => <div key={text} className="flex items-center gap-3 border-t border-slate-800 pt-3 text-xs text-slate-300">
            <span className="font-mono text-[10px] text-bronze-300">0{index + 1}</span>
            {text}
            <PlayCircle size={14} className="ml-auto text-slate-400" aria-hidden="true" />
          </div>)}
        </div>
      </div>
      <p className="mt-6 text-[10px] text-slate-400">Learning experience illustration</p>
    </Reveal>
    <Reveal>
      <p className="eyebrow">03 / Investing in human potential</p>
      <h2 id="training-title" className="section-title">The next generation<br />is <span className="gradient-text">already here.</span></h2>
      <p className="body-copy mt-6">Technology moves forward when people do. CyberVision creates digital learning content that helps learners understand, practise and apply new skills.</p>
      <p className="body-copy mt-4">Our work includes entrepreneurial training material for PSDF, using video, voice-over and animation to support learning and business development.</p>
      <div className="my-8 flex items-center gap-5 border-y border-slate-700 py-6">
        <span className="text-4xl font-semibold tracking-tight text-bronze-200">40k+</span>
        <p className="text-xs leading-6 text-slate-300">Youth trained.<br />Potential put into motion.</p>
      </div>
      <a href="/training" className="inline-flex min-h-11 items-center gap-3 text-sm text-champagne-200">Explore training programmes <ArrowUpRight size={16} /></a>
    </Reveal>
  </div>
  </section>;
}
