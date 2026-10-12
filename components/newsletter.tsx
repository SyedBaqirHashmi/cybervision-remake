'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import { emptyInquiry, validateInquiry } from '@/lib/inquiry';
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const id = useRef('');
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    id.current = crypto.randomUUID();
    return () => controller.current?.abort();
  }, []);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (status === 'loading') return;
    const result = validateInquiry({
      ...emptyInquiry,
      kind: 'newsletter',
      email,
      consent,
      requestId: id.current
    });
    if (!result.data) {
      setStatus('error');
      setMessage(result.errors.email || result.errors.consent || 'Please refresh and try again.');
      return;
    }
    setStatus('loading');
    setMessage('');
    controller.current = new AbortController();
    const timeout = window.setTimeout(() => controller.current?.abort(), 20000);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result.data),
        signal: controller.current.signal
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };
      if (!response.ok || !data.ok) throw new Error(data.error || 'Please try again.');
      setStatus('success');
      setMessage(data.message || 'Your request is on its way.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error && error.name !== 'AbortError' ? error.message : 'Delivery could not be confirmed. Please try again.');
    } finally {
      window.clearTimeout(timeout);
    }
  }
  return <form onSubmit={submit} aria-label="Newsletter subscription request" aria-busy={status === 'loading'} noValidate className="max-w-sm">
  <label htmlFor="newsletter-email" className="mb-3 block text-sm font-medium">Stay curious. Stay connected.</label>
  <p className="mb-4 text-xs leading-6 text-slate-400">Request company news and updates. Our team will confirm your subscription by email.</p>
  {status !== 'success' && <>
    <div className="flex items-center rounded-lg border border-slate-600 bg-slate-950 focus-within:border-cyan-300">
      <input id="newsletter-email" name="email" type="email" required autoComplete="email" maxLength={254} value={email} onChange={event => setEmail(event.target.value)} aria-describedby="newsletter-status" className="min-w-0 flex-1 rounded-l-lg bg-transparent px-3 py-3 text-sm outline-none" placeholder="Your email address" />
      <button type="submit" disabled={status === 'loading'} className="m-1 grid size-11 shrink-0 place-items-center rounded-md bg-cyan-200 text-slate-950 hover:bg-cyan-100" aria-label="Request newsletter subscription">
        {status === 'loading' ? <LoaderCircle size={18} className="animate-spin" /> : <ArrowRight size={18} />}
      </button>
    </div>
    <label className="mt-3 flex items-start gap-2 text-[10px] leading-5 text-slate-400">
      <input type="checkbox" required checked={consent} onChange={event => setConsent(event.target.checked)} className="mt-1 size-4 shrink-0 accent-cyan-300" />
      <span>I agree to be contacted to confirm this newsletter request.</span>
    </label>
  </>}
  <p id="newsletter-status" role={status === 'error' ? 'alert' : 'status'} className={`mt-3 text-xs leading-6 ${status === 'error' ? 'text-rose-200' : 'text-cyan-100'}`}>
    {status === 'success' && <CheckCircle2 size={17} className="mb-2" />}
    {message}
  </p>
  </form>;
}
