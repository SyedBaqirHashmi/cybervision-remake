import fs from 'node:fs';
const catalog = JSON.parse(fs.readFileSync('data/catalog.json', 'utf8'));
const coverage = JSON.parse(fs.readFileSync('docs/detailed-crawl-coverage.json', 'utf8'));
const inventory = JSON.parse(fs.readFileSync('docs/crawl-2026-10-13.json', 'utf8'));
const lines = [
  '# CyberVision detailed content migration map',
  '',
  'Checked 13 October 2026. This document maps the discovered source pages to the implemented remake. Adapted copy is in `data/catalog.json`; original prose is not reproduced verbatim.',
  '',
  '## Crawl scope and evidence',
  '',
  '- 28 discovered content routes: the original 27 plus the subsequently recovered SEO page.',
  '- All 4,253 reader text lines across the 30-, 34- and 160-page PDFs were traversed. Image-only content and visual reading order are not fully captured by the text reader.',
  '- The latest sequential HTML pass returned complete reader text for 27 routes. Training returned an intermittent timeout; its earlier 204-line successful snapshot supplies the training facts.',
  '- Homepage search content is available, but a direct homepage request still times out.',
  '- Robots, sitemap and WordPress API enumeration failed. Unlinked pages may remain undiscovered.',
  '- This is not a loss-free raw website archive. Reader titles are not verified HTML title tags; meta descriptions, canonicals, CSS media and active navigation styles remain unknown.',
  '- The site uses adapted factual copy, preserves the discovered routes and links original documents. No invented project-detail paths, metrics or client testimonials were added.',
  '',
  '## Global navigation migration',
  '',
  '| Source group | Rebuild destination |',
  '| --- | --- |',
  '| Services | /software-development-services |',
  '| Products | /products |',
  '| Trainings | /training |',
  '| Company | /company |',
  '| Consulting | /business-consulting, linked from startup hub |',
  '| Portfolio | /case-studies and /clients |',
  '| Contact | /contactus |',
  '| Startup content | /startup-innovation |',
  '| Three PDF links | /resources and /case-studies |',
  '',
  '## Source-specific decisions',
  '',
  '- Retained original service/product/training slugs to avoid discarding the existing URL structure.',
  '- Removed duplicate carousel/navigation text from adapted pages.',
  '- Excluded the Revolution Slider dummy PNG from imagery. Selected real source images are lazy loaded without cropping and link to their originals.',
  '- Training metrics remain distinct from enterprise project metrics. They are attributed to the company rather than represented as independently audited.',
  '- Source counters that show zero in the reader are animation initial states, not replacement statistics.',
  '- Huawei intake dates are not inferred. Visitors are directed to the verified NAVTTC registration destination.',
  '- KPITB proposals are identified as requirements dated 18 May 2021, not verified completed features.',
  '- Historical PDF economic figures are not presented as current company performance.',
  '- The contact page and footer differ on Plot 18 versus Plot 18–19. The remake follows the contact page.',
  '- The original legal disclaimer is linked; the remake does not silently substitute newly drafted corporate legal terms.',
  ''
];
for (const page of catalog.pages) {
  const source = inventory.pages.find(item=>item.url===page.source);
  const retrieval = coverage.html.find(item=>item.url===page.source);
  lines.push(`## ${page.title} — /${page.slug}`, '', `- Source: ${page.source}`, `- Reader title: ${source?.title_from_reader ?? page.title}`, '- Original SEO meta description / canonical: not exposed by the reader; not inferred.', `- Retrieval: ${retrieval?.success ? `${retrieval.returnedLines}/${retrieval.readerTotalLines} reader lines` : 'Earlier successful snapshot; latest request intermittent'}.`, `- Rebuild hero: ${page.headline}`, `- Page purpose: ${page.summary}`, '- Adapted section structure:');
  for (const section of page.sections) lines.push(`  - ${section.title}${section.items.length ? `: ${section.items.join('; ')}` : ''}`);
  lines.push(`- Related local routes: ${page.related.map(slug=>'/'+slug).join(', ') || 'None'}.`, `- Primary action: ${page.slug==='contactus'?'Validated consultation form and direct contact channels':page.slug==='disclaimer'?'Original disclaimer and remake privacy links':'Consultation link to /contactus#contact'}.`);
  if (page.image) lines.push(`- Selected image: ${page.image}`, `- Rebuild image description: ${page.imageAlt}. Original alt attribute is unverified.`);
  lines.push('');
}
lines.push('## PDF resource map','');
for (const resource of catalog.resources) {
  lines.push(`### ${resource.title}`, '', `- URL: ${resource.url}`, `- Length: ${resource.pages} pages.`, `- Date/context: ${resource.date}.`, `- Overview: ${resource.description}`, `- Topic map: ${resource.chapters.join('; ')}.`, `- Publication treatment: ${resource.note}`, '- UI: labelled PDF links; no automatic embedded viewer or preloading of the full document.', '');
}
lines.push('## Selected media inventory','');
for (const asset of inventory.assets) lines.push(`- ${asset.url}${asset.url.includes('dummy.png')?' — excluded placeholder':' — source link retained'}`);
lines.push('', '## Verification boundaries', '', 'Complete available reader text does not establish complete DOM or media capture. Original source availability is intermittent. Sitemap/WordPress discovery, raw HTML SEO metadata, exhaustive outbound URLs, video/background media and a visual/OCR pass over all PDF pages remain unresolved. Full source prose is not republished in this map.', '', 'Source data: `crawl-2026-10-13.json`, `detailed-crawl-coverage.json`. Implementation: `data/catalog.json`, `lib/catalog.ts`, `app/[slug]/page.tsx`.', '');
fs.writeFileSync('docs/detailed-content-map.md', lines.join('\n'));
