import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('page exposes semantic navigation and stays within narrow viewports', async ({
  page
}) => {
  await page.setViewportSize({
    width: 320,
    height: 800
  });
  await page.goto('/');
  await expect(page.getByRole('heading', {
    level: 1
  })).toContainText('Intelligent');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', {
    name: 'Open navigation'
  }).click();
  await page.getByRole('navigation', {
    name: 'Mobile navigation'
  }).getByRole('link', {
    name: 'Products',
    exact: true
  }).click();
  await expect(page.getByRole('button', {
    name: 'Open navigation'
  })).toHaveAttribute('aria-expanded', 'false');
});
test('project tabs support keyboard navigation', async ({
  page
}) => {
  await page.goto('/');
  const tab = page.getByRole('tab', {
    name: 'FAO',
    exact: true
  });
  await tab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', {
    name: 'LUMS',
    exact: true
  })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('One institution.');
});
test('reel closes with Escape and restores focus', async ({
  page
}) => {
  await page.goto('/');
  const trigger = page.getByRole('button', {
    name: 'Watch innovation reel'
  });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test('consultation validates, reviews, handles delivery failure and retries', async ({
  page
}) => {
  await page.goto('/');
  const form = page.getByRole('form', {
    name: 'Consultation enquiry'
  });
  await form.getByRole('button', {
    name: 'Continue'
  }).click();
  await expect(form.getByText('Choose an area of interest.')).toBeVisible();
  await form.getByText('AI & automation', {
    exact: true
  }).click();
  await form.getByLabel('Your project or challenge').fill('We need an accessible operational platform for a distributed team.');
  await form.getByRole('button', {
    name: 'Continue'
  }).click();
  await form.getByLabel('Full name').fill('Ayesha Khan');
  await form.getByLabel('Email address', {
    exact: false
  }).fill('ayesha@example.com');
  await form.getByRole('button', {
    name: 'Continue'
  }).click();
  await form.getByRole('checkbox').check();
  await page.route('**/api/inquiries', route => route.fulfill({
    status: 503,
    json: {
      error: 'Delivery is unavailable. Please retry.'
    }
  }));
  await form.getByRole('button', {
    name: 'Send enquiry'
  }).click();
  await expect(form.getByRole('alert')).toContainText('Delivery is unavailable');
  await expect(page.getByText('A good conversation starts here.')).toHaveCount(0);
  await page.unroute('**/api/inquiries');
  await page.route('**/api/inquiries', route => route.fulfill({
    json: {
      ok: true,
      message: 'Your enquiry is on its way.'
    }
  }));
  await form.getByRole('button', {
    name: 'Send enquiry'
  }).click();
  await expect(page.getByRole('heading', {
    name: 'A good conversation starts here.'
  })).toBeVisible();
});
test('page passes automated WCAG AA checks', async ({
  page
}) => {
  await page.goto('/');
  const results = await new AxeBuilder({
    page
  }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(results.violations).toEqual([]);
});

// Migration checks exercise real rendered routes, not just the shared template.
import catalog from '../../data/catalog.json';
test('all migrated pages return distinct content and their own canonical URL', async ({ request }) => {
  for (const entry of catalog.pages) {
    const response = await request.get(`/${entry.slug}`);
    expect(response.status(), entry.slug).toBe(200);
    const html = await response.text();
    expect(html).toContain(entry.headline.replaceAll('&', '&amp;').replaceAll("'", '&#x27;'));
    expect(html).toContain(`rel="canonical" href="http://127.0.0.1:3000/${entry.slug}"`);
    expect((html.match(/<h1[ >]/g) ?? []).length).toBe(1);
  }
  expect((await request.get('/not-a-real-capability')).status()).toBe(404);
});
test('directory search provides results, empty state and reset', async ({ page }) => {
  await page.goto('/products');
  const directory = page.getByRole('region', { name: 'Explore the capabilities' });
  await directory.getByRole('searchbox').fill('warehouse');
  await expect(directory.getByRole('link', { name: 'Warehouse management', exact: true })).toBeVisible();
  await directory.getByRole('searchbox').fill('no-such-product');
  await expect(directory.getByText('No pages match this search.')).toBeVisible();
  await directory.getByRole('button', { name: 'Clear filters' }).click();
  await expect(directory.getByRole('status')).toHaveText('6 pages');
});
test('resources expose three original PDFs without loading an embedded viewer', async ({ page }) => {
  await page.goto('/resources');
  const pdfs = page.locator('a[href$=".pdf"]');
  await expect(pdfs).toHaveCount(3);
  await expect(page.locator('iframe, object, embed')).toHaveCount(0);
});
test('source images keep space reserved and recover from a failed request', async ({ page }) => {
  await page.route('https://cybervision.com.pk/wp-content/**', route => route.abort());
  await page.goto('/case-studies');
  const figure = page.locator('figure').first();
  await figure.scrollIntoViewIfNeeded();
  await expect(figure.getByText('Image is currently unavailable.')).toBeVisible();
  await expect(figure.getByRole('link', { name: /Open original image/ })).toHaveAttribute('href', /LUMS/);
});
for (const path of ['/training','/products','/case-studies','/resources','/contactus']) {
  test(`${path} is accessible and fits a 320px viewport`, async ({ page }) => {
    await page.route('https://cybervision.com.pk/wp-content/**', route => route.abort());
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect((await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
  });
}

test('capture representative layouts for review', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.screenshot({ path: 'review/home-desktop.png' });
  await page.goto('/products');
  await page.screenshot({ path: 'review/products-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/resources');
  await page.screenshot({ path: 'review/resources-mobile.png', fullPage: true });
});
