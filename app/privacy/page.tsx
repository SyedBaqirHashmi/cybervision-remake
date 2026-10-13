import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { siteOrigin } from '@/lib/site';
export const metadata: Metadata = {
  title: 'Privacy notice',
  ...(siteOrigin() ? { alternates: { canonical: `${siteOrigin()}/privacy` } } : {})
};
export default function Privacy() {
  return <>
  <header className="shell py-8">
    <Logo />
  </header>
  <main id="main" className="shell max-w-3xl py-16">
    <p className="eyebrow">Your information</p>
    <h1 className="section-title">Website privacy notice</h1>
    <p className="body-copy mt-8">This notice explains the data handled by this CyberVision website implementation.</p>
    <div className="mt-10 space-y-8 text-sm leading-7 text-slate-300">
      <section>
        <h2 className="mb-3 text-xl font-semibold text-white">When you contact us</h2>
        <p>The consultation form sends your name, email address, optional organisation, selected area of interest, project description and consent to CyberVision’s configured contact inbox. The newsletter form sends your email address and consent as a subscription request for the team to confirm. These details are used to respond to the request you make.</p>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold text-white">How delivery works</h2>
        <p>When configured, Resend processes email delivery. The website does not save enquiries in a website database. Your request may be retained in the recipient mailbox and by the email delivery provider according to their configured policies. Upstash stores a salted hash of your network address with a request count for up to 15 minutes to limit abuse. The network address itself is not stored by this application’s rate limiter.</p>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold text-white">Cookies and external links</h2>
        <p>This implementation does not set marketing or analytics cookies and does not embed third-party trackers. Fonts and visual assets are served locally. Following an external map or company link takes you to that provider’s website, where its own privacy practices apply. Your hosting provider may maintain infrastructure access logs.</p>
      </section>
      <section>
        <h2 className="mb-3 text-xl font-semibold text-white">Your choices</h2>
        <p>Sending a form is optional. Please avoid including passwords, payment data, or confidential project material. You can contact <a className="text-champagne-200 underline" href="mailto:info@cybervision.com.pk">info@cybervision.com.pk</a> to ask about your enquiry, request correction or deletion, or withdraw a newsletter request. No newsletter subscription is completed automatically by this website.</p>
      </section>
    </div>
    <Link href="/" className="btn-secondary mt-12">Return to the website</Link>
  </main>
  </>;
}
