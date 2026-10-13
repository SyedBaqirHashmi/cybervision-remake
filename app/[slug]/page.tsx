import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCatalogEntry, getCatalogSlugs } from '@/lib/catalog';
import { siteOrigin } from '@/lib/site';
import { CatalogPage } from '@/components/catalog-page';

export function generateStaticParams() {
  return getCatalogSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCatalogEntry(slug);
  if (!entry) return {};
  const origin = siteOrigin();
  return {
    title: entry.heroHeading,
    description: entry.purpose,
    ...(origin ? { alternates: { canonical: `${origin}/${entry.slug}` } } : {})
  };
}

export default async function CatalogRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCatalogEntry(slug);
  if (!entry) notFound();
  return <CatalogPage entry={entry} />;
}
