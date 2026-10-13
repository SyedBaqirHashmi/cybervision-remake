import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/site';
import { getCatalogSlugs } from '@/lib/catalog';
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  return [{
    url: origin,
    changeFrequency: 'monthly',
    priority: 1
  }, ...getCatalogSlugs().map(slug => ({
    url: `${origin}/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: .6
  })), {
    url: `${origin}/privacy`,
    changeFrequency: 'yearly',
    priority: .2
  }];
}
