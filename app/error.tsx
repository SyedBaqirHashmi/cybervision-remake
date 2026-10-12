'use client';

export default function ErrorPage({
  reset
}: {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}) {
  return <main id="main" className="shell grid min-h-screen place-content-center gap-6 py-24">
  <p className="eyebrow">Something went wrong</p>
  <h1 className="section-title">Let’s try that again.</h1>
  <p className="body-copy">The page could not finish loading. You can retry or contact info@cybervision.com.pk.</p>
  <button className="btn-primary justify-self-start" onClick={reset}>Reload this section</button>
  </main>;
}
