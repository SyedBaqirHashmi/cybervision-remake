import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { MotionProvider } from '@/components/ui/motion-provider';
import { siteOrigin } from '@/lib/site';
import './globals.css';
const origin = siteOrigin();
export const metadata: Metadata = {
  ...(origin ? {
    metadataBase: new URL(origin)
  } : {}),
  title: {
    default: 'CyberVision International — Architecting the Intelligent Enterprise',
    template: '%s | CyberVision International'
  },
  description: 'Software engineering, enterprise automation, IoT and digital training. CyberVision International connects ambition with technology, from Islamabad to the world.',
  openGraph: {
    title: 'Architecting the Intelligent Enterprise',
    description: 'Software. Automation. Connected systems. Human potential.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'CyberVision International'
  },
  twitter: {
    card: 'summary_large_image'
  },
  robots: {
    index: true,
    follow: true
  },
  ...(origin ? {
    alternates: {
      canonical: origin
    }
  } : {})
};
export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return <html lang="en">
  <body>
    <a href="#main" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-gold-200 px-5 py-3 font-semibold text-stone-950 focus:translate-y-0">Skip to content</a>
    <MotionProvider>
      {children}
    </MotionProvider>
  </body>
  </html>;
}
