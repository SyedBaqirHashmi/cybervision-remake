import Link from 'next/link';
export default function NotFound() {
  return <main id="main" className="shell grid min-h-screen place-content-center gap-6">
  <p className="eyebrow">404 / Page not found</p>
  <h1 className="section-title">A different path forward.</h1>
  <Link href="/" className="btn-primary justify-self-start">Back to CyberVision</Link>
  </main>;
}
