import { metrics } from '@/lib/content';
import { AnimatedNumber } from './ui/animated-number';
export function Metrics() {
  return <section aria-label="CyberVision impact" className="border-y border-stone-800 bg-stone-900/25">
  <div className="shell grid grid-cols-2 gap-y-8 py-12 lg:grid-cols-4">
    {metrics.map(metric => <div key={metric.label} className="min-w-0 border-l border-stone-700 px-3 sm:px-7">
      <p className="text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        <AnimatedNumber value={metric.value} suffix={metric.suffix} />
      </p>
      <h2 className="mt-3 text-xs font-medium text-stone-200 sm:text-sm">
        {metric.label}
      </h2>
      <p className="mt-1 text-[10px] text-stone-400 sm:text-xs">
        {metric.detail}
      </p>
    </div>)}
  </div>
  <p className="shell pb-5 text-[10px] leading-5 text-stone-400">Company-reported achievements · <a href="https://cybervision.com.pk/software-development-services/" className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">Source: CyberVision International</a></p>
  </section>;
}
