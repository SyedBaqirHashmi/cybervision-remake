'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, LoaderCircle, Send } from 'lucide-react';
import { emptyInquiry, interests, stepErrors, validateInquiry, type FieldErrors, type Inquiry } from '@/lib/inquiry';
const labels = ['Your vision', 'Your details', 'Review & send'];
export function ContactForm() {
  const [data, setData] = useState<Inquiry>({
    ...emptyInquiry
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [notice, setNotice] = useState('');
  const reduced = useReducedMotion();
  const form = useRef<HTMLFormElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const requestId = useRef('');
  const controller = useRef<AbortController | null>(null);
  useEffect(() => {
    requestId.current = crypto.randomUUID();
    return () => controller.current?.abort();
  }, []);
  function update<K extends keyof Inquiry>(key: K, value: Inquiry[K]) {
    const next = {
      ...data,
      [key]: value
    };
    setData(next);
    if (errors[key]) setErrors(old => ({
      ...old,
      [key]: validateInquiry({
        ...next,
        requestId: requestId.current
      }).errors[key]
    }));
  }
  function blur(key: keyof Inquiry) {
    const error = validateInquiry({
      ...data,
      requestId: requestId.current
    }).errors[key];
    setErrors(old => ({
      ...old,
      [key]: error
    }));
  }
  function focusError(next: FieldErrors) {
    requestAnimationFrame(() => {
      const key = Object.keys(next)[0];
      form.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
    });
  }
  function move(next: number) {
    if (next > step) {
      const found = stepErrors(data, step);
      setErrors(found);
      if (Object.keys(found).length) {
        focusError(found);
        return;
      }
    }
    setStep(next);
    setNotice('');
    setStatus('idle');
    requestAnimationFrame(() => heading.current?.focus());
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (status === 'loading') return;
    if (step < 2) {
      move(step + 1);
      return;
    }
    const parsed = validateInquiry({
      ...data,
      requestId: requestId.current
    });
    if (!parsed.data) {
      setErrors(parsed.errors);
      if (parsed.errors.interest || parsed.errors.message) setStep(0);else if (parsed.errors.name || parsed.errors.email || parsed.errors.company) setStep(1);
      focusError(parsed.errors);
      return;
    }
    setStatus('loading');
    setNotice('');
    controller.current = new AbortController();
    const timeout = window.setTimeout(() => controller.current?.abort(), 20000);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsed.data),
        signal: controller.current.signal
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
        errors?: FieldErrors;
      };
      if (!response.ok || !result.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.error || 'Your enquiry could not be sent. Please try again.');
      }
      setStatus('success');
      setNotice(result.message || 'Your enquiry is on its way.');
      requestAnimationFrame(() => heading.current?.focus());
    } catch (error) {
      setStatus('error');
      setNotice(error instanceof Error && error.name === 'AbortError' ? 'Delivery could not be confirmed. Try again; duplicate requests are handled safely.' : error instanceof Error ? error.message : 'Please contact info@cybervision.com.pk directly.');
    } finally {
      window.clearTimeout(timeout);
    }
  }
  if (status === 'success') return <div className="rounded-2xl border border-cyan-300/30 bg-slate-900/60 p-8 sm:p-10">
  <motion.div initial={reduced ? false : {
      scale: .8
    }} animate={{
      scale: 1
    }} className="icon-box mb-7 !size-14">
    <CheckCircle2 size={27} />
  </motion.div>
  <h3 ref={heading} tabIndex={-1} className="text-2xl font-semibold">A good conversation starts here.</h3>
  <p role="status" className="mt-5 text-sm leading-7 text-slate-300">
    {notice}
  </p>
  <button className="btn-secondary mt-8" onClick={() => {
      setData({
        ...emptyInquiry
      });
      setErrors({});
      setStatus('idle');
      setStep(0);
      requestId.current = crypto.randomUUID();
    }}>Send another enquiry</button>
  </div>;
  return <form ref={form} onSubmit={submit} noValidate aria-label="Consultation enquiry" aria-busy={status === 'loading'} className="min-w-0 rounded-2xl border border-slate-700 bg-slate-900/60 p-6 shadow-glow-indigo sm:p-8">
  <ol aria-label="Enquiry progress" className="mb-8 grid grid-cols-3 gap-3">
    {labels.map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} className={`border-t-2 pt-3 ${step >= index ? 'border-cyan-300' : 'border-slate-700'}`}>
      <span className="flex items-center gap-1.5 text-[10px] text-slate-300">
        <span className="font-mono text-cyan-200">
          {step > index ? <Check size={11} /> : String(index + 1).padStart(2, '0')}
        </span>
        {label}
      </span>
    </li>)}
  </ol>
  <h3 ref={heading} tabIndex={-1} className="mb-2 text-2xl font-semibold tracking-tight">
    {step === 0 ? 'What can we build together?' : step === 1 ? 'Let’s get to know you.' : 'Your next chapter starts here.'}
  </h3>
  <p className="mb-7 text-xs leading-6 text-slate-400">
    {step === 0 ? 'Tell us a little about your ambition.' : step === 1 ? 'We’ll use these details to respond to your enquiry.' : 'Review your details before sending to our team.'}
  </p>
  <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
    <label htmlFor="website">Leave this field empty</label>
    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={e => update('website', e.target.value)} />
  </div>
  {step === 0 && <div className="space-y-5">
    <fieldset aria-describedby={errors.interest ? 'interest-error' : undefined}>
      <legend className="mb-3 text-xs text-slate-300">I’m interested in <span aria-hidden="true">*</span></legend>
      <div className="flex flex-wrap gap-2">
        {interests.map(interest => <label key={interest} className={`relative cursor-pointer rounded-full border px-3 py-2.5 text-[11px] transition focus-within:ring-2 focus-within:ring-cyan-300 focus-within:ring-offset-2 focus-within:ring-offset-slate-950 ${data.interest === interest ? 'border-cyan-300 bg-cyan-300/10 text-cyan-100' : 'border-slate-600 text-slate-300 hover:border-slate-400'}`}>
          <input className="sr-only" type="radio" name="interest" value={interest} checked={data.interest === interest} onChange={() => update('interest', interest)} required aria-invalid={!!errors.interest} />
          {interest}
        </label>)}
      </div>
      {errors.interest && <p id="interest-error" className="field-error">
        {errors.interest}
      </p>}
    </fieldset>
    <div>
      <div className="relative">
        <textarea id="message" name="message" required minLength={20} maxLength={3000} rows={5} value={data.message} onChange={e => update('message', e.target.value)} onBlur={() => blur('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : 'message-hint'} className="field resize-y" />
        <label htmlFor="message" className="field-label">Your project or challenge *</label>
      </div>
      <p id="message-hint" className="mt-2 text-[10px] text-slate-400">20–3,000 characters · Goals, timelines, or what you’d like to improve.</p>
      {errors.message && <p id="message-error" className="field-error">
        {errors.message}
      </p>}
    </div>
  </div>}
  {step === 1 && <div className="space-y-5">
    {([{
        key: 'name',
        label: 'Full name *',
        type: 'text',
        autocomplete: 'name',
        max: 100
      }, {
        key: 'email',
        label: 'Email address *',
        type: 'email',
        autocomplete: 'email',
        max: 254
      }, {
        key: 'company',
        label: 'Company / organisation (optional)',
        type: 'text',
        autocomplete: 'organization',
        max: 150
      }] as const).map(field => <div key={field.key}>
      <div className="relative">
        <input id={field.key} name={field.key} type={field.type} autoComplete={field.autocomplete} maxLength={field.max} required={field.key !== 'company'} value={data[field.key]} onChange={e => update(field.key, e.target.value)} onBlur={() => blur(field.key)} aria-invalid={!!errors[field.key]} aria-describedby={errors[field.key] ? `${field.key}-error` : undefined} className="field" />
        <label htmlFor={field.key} className="field-label">
          {field.label}
        </label>
      </div>
      {errors[field.key] && <p id={`${field.key}-error`} className="field-error">
        {errors[field.key]}
      </p>}
    </div>)}
  </div>}
  {step === 2 && <div className="space-y-6">
    <dl className="space-y-4 rounded-xl border border-slate-700 bg-slate-950/50 p-5 text-sm">
      {[['Area of interest', data.interest], ['Name', data.name], ['Email', data.email], ['Organisation', data.company || 'Not supplied'], ['Project', data.message]].map(([key, value]) => <div key={key}>
        <dt className="mb-1 text-[10px] uppercase tracking-wide text-slate-400">
          {key}
        </dt>
        <dd className="whitespace-pre-wrap break-words leading-6 text-slate-200">
          {value}
        </dd>
      </div>)}
    </dl>
    <div>
      <label className="flex items-start gap-3 text-xs leading-6 text-slate-300">
        <input type="checkbox" name="consent" checked={data.consent} onChange={e => update('consent', e.target.checked)} required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} className="mt-1 size-5 shrink-0 accent-cyan-300" />
        <span>I agree to CyberVision using these details to respond to my enquiry. Read our <Link href="/privacy" target="_blank" className="text-cyan-200 underline underline-offset-4">privacy notice</Link>.</span>
      </label>
      {errors.consent && <p id="consent-error" className="field-error">
        {errors.consent}
      </p>}
    </div>
  </div>}
  {notice && <p role="alert" className="mt-5 rounded-lg border border-rose-300/25 bg-rose-950/20 p-4 text-sm leading-6 text-rose-100">
    {notice}
  </p>}
  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700 pt-6">
    {step > 0 ? <button type="button" className="btn-secondary !px-4" onClick={() => move(step - 1)} disabled={status === 'loading'}><ArrowLeft size={15} /> Back</button> : <span className="text-[10px] text-slate-400">All fields marked * are required.</span>}
    <button type="submit" className="btn-primary !px-5" disabled={status === 'loading'}>
      {status === 'loading' ? <><LoaderCircle className="animate-spin" size={16} aria-hidden="true" /> Sending…</> : step === 2 ? <>Send enquiry <Send size={15} aria-hidden="true" /></> : <>Continue <ArrowRight size={15} aria-hidden="true" /></>}
    </button>
  </div>
  </form>;
}
