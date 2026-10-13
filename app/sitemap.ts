import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/site';
import { pages } from '@/lib/catalog';
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  return ['',...pages.map(page=>page.slug),'resources','privacy'].map(slug=>({url:slug?`${origin}/${slug}`:origin,changeFrequency:'monthly',priority:slug ? 0.6 : 1}));
}
