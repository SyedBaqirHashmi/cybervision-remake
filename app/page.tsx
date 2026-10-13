import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { CapabilityRooms } from '@/components/capability-rooms';
import { BentoServices } from '@/components/bento-services';
import { Metrics } from '@/components/metrics';
import { Showcase } from '@/components/showcase';
import { Training } from '@/components/training';
import { Startups } from '@/components/startups';
import { Company } from '@/components/company';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { company } from '@/lib/content';
import { siteOrigin } from '@/lib/site';
export default function Page() {
  const origin = siteOrigin();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    ...(origin ? {
      url: origin
    } : {}),
    email: company.email,
    telephone: company.phone,
    foundingDate: '2004',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot 18–19, 1st Floor, Paradise Plaza, SCHS E-11/2',
      addressLocality: 'Islamabad',
      addressCountry: 'PK'
    }
  };
  return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
    }} />
  <Header />
  <main id="main">
    <Hero />
    <div className="border-b border-stone-800">
      <div className="shell flex flex-wrap items-center justify-between gap-x-7 gap-y-6 py-9">
        <p className="w-full text-center text-[10px] leading-5 text-stone-400 sm:w-auto sm:text-left">Selected organisations<br /><span className="text-stone-300">we’ve worked with</span></p>
        {['LUMS', 'UNICEF', 'UNDP', 'Karandaaz', 'FAO'].map(name => <span key={name} className="font-sans text-base font-semibold tracking-tight text-stone-400 sm:text-xl">
          {name}
        </span>)}
      </div>
    </div>
    <CapabilityRooms />
    <BentoServices />
    <Metrics />
    <Showcase />
    <Training />
    <Startups />
    <Company />
    <Contact />
  </main>
  <Footer />
  </>;
}
