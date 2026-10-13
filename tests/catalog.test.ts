import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const catalog = JSON.parse(readFileSync(new URL('../data/catalog.json', import.meta.url), 'utf8'));
const inventory = JSON.parse(readFileSync(new URL('../docs/crawl-2026-10-13.json', import.meta.url), 'utf8'));

test('every discovered content page has a unique migration route', () => {
  const slugs = new Set(catalog.pages.map((page: {slug: string}) => page.slug));
  assert.equal(slugs.size, catalog.pages.length);
  assert.equal(slugs.size, 28);
  for (const page of inventory.pages) {
    if (!page.retrieval.startsWith('Reader')) continue;
    assert.ok(slugs.has(new URL(page.url).pathname.replace(/^\/+|\/+$/g, '')), page.url);
  }
});
test('related content never points to a missing local page', () => {
  const slugs = new Set([...catalog.pages.map((page: {slug: string}) => page.slug), 'resources']);
  for (const page of catalog.pages) for (const related of page.related) assert.ok(slugs.has(related), `${page.slug} → ${related}`);
  for (const [, , related] of catalog.caseStudies) if (related) assert.ok(slugs.has(related));
});
test('the report library preserves all three original PDF destinations', () => {
  assert.equal(catalog.resources.length, 3);
  assert.equal(catalog.resources.reduce((sum: number, resource: {pages: number}) => sum + resource.pages, 0), 224);
  const originals = new Set(inventory.pages.filter((page: {pdf_pages?: number}) => page.pdf_pages).map((page: {url: string}) => page.url));
  for (const resource of catalog.resources) assert.ok(originals.has(resource.url));
});
